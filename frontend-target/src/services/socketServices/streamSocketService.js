import { setOnChatMessage } from '../../components/ChatPreview/ChatPreview';
import { onChatMessage } from './chatSocketService';
import { getSocket, getUserSession } from './socketService';
import kurentoUtils from 'kurento-utils';

let webRtcPeer = null;
let stompClient = null;
let video = null;

let isSDPExchange = false;
let candidateQueues = [];

let liveSession = null;

export const getLiveSession = () => {
    return liveSession;
}


const onLiveMessage = (destination) => {
    if (stompClient && stompClient.connected) {
        stompClient.subscribe(destination, (response) => {
            const message = JSON.parse(response.body);
            switch (message.action) {
                case 'PEER_PRESENTER':
                    createPeerPresenter(message);
                    break;
                case 'PEER_VIEWER':
                    createPeerViewer(message);
                    break;
                case 'SDP_ANSWER':
                    processAnswer(message);
                    break;
                case 'ICE_CANDIDATE':
                    processCandidate(message);
                    break;
                case 'PEER_CANCEL':
                    releasePeer(message);
                    break;
                default:
                    console.error('Unrecognized message', message);
            }
        });
    }
}

export const present = (videoRef) => {
    video = videoRef;
    stompClient = getSocket();
    onLiveMessage('/queue/' + getUserSession());
    if (stompClient && stompClient.connected) {
        var message = {
            username: getUserSession(),
            title: 'First livestream',
            game: 'Dota 2',
            tags: ['funny', 'fighting'],
            pp: 'https://i.pravatar.cc/',
            liveScreen: './images/games/game-chees.jpg',
            viewers: 1000,
        };
        sendMessage(message, '/app/stream/create');
    }
}

export const createPeerPresenter = (message) => {
    console.log('Live session has bean created with id: ' + message.liveSessionId);
    liveSession = message.liveSessionId;
    onLiveMessage('/topic/' + message.liveSessionId);
    setOnChatMessage(message.liveSessionId);
    if (!webRtcPeer) {
        var options = {
            localVideo: video.current,
            onicecandidate: (candidate) => onIceCandidate(candidate, message.liveSessionId),
        };
        webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
            if (error) {
                return console.error('Occur error while creating webRtcPeer', error);
            }
            console.log('Start generate SDP offer');
            webRtcPeer.generateOffer((error, sdpOffer) => onOfferPresenter(error, sdpOffer, message.liveSessionId));
        });
    }
};

const onOfferPresenter = (error, sdpOffer, liveSessionId) => {
    if (error) {
        return console.error('Occur error while generate the SDP offer', error);
    }
    var message = {
        action: 'OFFER_PRESENTER',
        username: getUserSession(),
        liveSessionId: liveSessionId,
        offer: sdpOffer
    }
    console.log('Sending SDP Offer to server');
    sendMessage(message, '/app/stream/exchange');
};

const onIceCandidate = (candidate, liveSessionId) => {
    if (isSDPExchange) {
        var mess = {
            action: 'ICE_CANDIDATE',
            username: getUserSession(),
            liveSessionId: liveSessionId,
            candidate: candidate
        };        
        console.log('Detect a ICE candidate from event listener and send to server');
        sendMessage(mess, '/app/stream/exchange');
    } else {
        candidateQueues.push(candidate);
        console.info('Push ICE into queue cause SDP has not exchange yet');
    }
}

export const processAnswer = (message) => {
    console.log('Receive SDP answer from server');
    webRtcPeer.processAnswer(message.answer, (error) => {
        if (error)
            return console.error('Occur error while process sdpAnswer', error);
        isSDPExchange = true;
    });

    // Send all iceCandidate in queue to server
    console.log('Send all iceCandidates in queue to server');

    candidateQueues.forEach(candidate => {
        var mess = {
            action: 'ICE_CANDIDATE',
            username: getUserSession(),
            liveSessionId: message.liveSessionId,
            candidate: candidate
        };
        
        sendMessage(mess, '/app/stream/exchange');
    });
    candidateQueues = [];
}

export const processCandidate = (message) => {
    webRtcPeer.addIceCandidate(message.candidate, function (error) {
        if (error) return console.error('Occur error while add IceCandidate' + error);
    });
    console.log('Starting connect between RTC Peer Client and RTC Endpoint');
}


export const view = (liveSessionId, videoRef) => {
    video = videoRef;
    stompClient = getSocket();
    onLiveMessage('/queue/' + getUserSession());
    if (stompClient && stompClient.connected) {
        var message = {
            liveSessionId: liveSessionId,
            username: getUserSession(),
        };
        sendMessage(message, '/app/stream/join');
    }
}

export const createPeerViewer = (message) => {
    liveSession = message.liveSessionId;
    onLiveMessage('/topic/' + message.liveSessionId);
    if (!webRtcPeer) {
        var options = {
            remoteVideo: video.current,
            onicecandidate: (candidate) => onIceCandidate(candidate, message.liveSessionId),
        };
        webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
            if (error) {
                return console.error('Occur error while creating webRtcPeer', error);
            }
            console.log('Start generate SDP offer');
            this.generateOffer((error, sdpOffer) => onOfferViewer(error, sdpOffer, message.liveSessionId));

            // Kiểm tra trạng thái ICE
            this.peerConnection.addEventListener('iceconnectionstatechange', () => {
                console.log('ICE connection state:', this.peerConnection.iceConnectionState);
                if (this.peerConnection.iceConnectionState === 'connected') {
                    console.log('WebRTC connection established.');
                }
            });

            // Kiểm tra sự kiện stream
            this.peerConnection.addEventListener('track', (event) => {
                console.log('Track event:', event);
                if (event.track.kind === 'video') {
                    console.log('Receiving video track');
                }
            });
        });
    }
}

const onOfferViewer = (error, sdpOffer, liveSessionId) => {
    if (error) {
        return console.error('Occur error while generate the SDP offer', error);
    }
    var message = {
        action: 'OFFER_VIEWER',
        username: getUserSession(),
        liveSessionId: liveSessionId,
        offer: sdpOffer
    }
    console.log('Sending SDP Offer to server');
    sendMessage(message, '/app/stream/exchange');
}

export const releasePeer = () => {
    webRtcPeer.dispose();
    webRtcPeer = null;
    video = null;
}

export const stopPresent = () => {
    if (webRtcPeer) {
        // send stop message to server
        var message = {
            username: getUserSession(),
            liveSessionId: liveSession,
        }
        sendMessage(message, '/app/stream/end');
    }
}

export const stopView = (liveSessionId) => {
    if (webRtcPeer) {
        // send stop message to server
        var message = {
            username: getUserSession(),
            liveSessionId: liveSessionId,
        }
        sendMessage(message, '/app/stream/leave');
    }
}

export const sendMessage = (message, destination) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: destination,
            body: JSON.stringify(message),
        });
    }
}

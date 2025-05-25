// import { setOnChatMessage } from '../../components/ChatPreview/ChatPreview';
// import { onChatMessage } from './chatSocketService';
import { setOnChatMessage } from '../../components/features/schat/ChatPreview';
import { getSocket, getUserSession } from './socketService';
import kurentoUtils from 'kurento-utils';

let webRtcPeer = null;
let stompClient = null;
let video = null;

let isSDPExchange = false;
let candidateQueues = [];

let streamId = null;

export const getStreamId = () => {
    return streamId;
}

// Đăng ký topic để nhận sự kiện
const onLiveMessage = (destination) => {
    if (stompClient && stompClient.connected) {
        stompClient.subscribe(destination, (response) => {
            const message = JSON.parse(response.body);
            console.log('[MESSAGE] Receive message from server with stream topic with action ', message.action);
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
                case 'ERROR':
                    handleErrorMessage(message);
                default:
                    console.error('Unrecognized message', message);
            }
        });
        console.log("Subscribed stream topic for receive message from server ", destination);
    }
}

export const present = (videoRef) => {
    video = videoRef;
    stompClient = getSocket();
    onLiveMessage('/queue/' + getUserSession());
}

export const createPeerPresenter = (message) => {
    console.log('StreamId has bean created with id: ' + message.streamId);
    streamId = message.streamId;
    onLiveMessage('/topic/' + message.streamId);
    setOnChatMessage(message.streamId);
    if (!webRtcPeer) {
        var options = {
            localVideo: video.current,
            onicecandidate: (candidate) => onIceCandidate(candidate, message.streamId),
        };
        webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
            if (error) {
                return console.error('Occur error while creating webRtcPeer', error);
            }
            console.log('Start generate SDP offer');
            webRtcPeer.generateOffer((error, sdpOffer) => onOfferPresenter(error, sdpOffer, message.streamId));
        });
    }
};

const onOfferPresenter = (error, sdpOffer, streamId) => {
    if (error) {
        return console.error('Occur error while generate the SDP offer', error);
    }
    var message = {
        action: 'OFFER_PRESENTER',
        userSessionId: getUserSession(),
        streamId: streamId,
        offer: sdpOffer
    }
    console.log('Sending SDP Offer to server');
    sendMessage(message, '/app/stream/exchange');
};

const onIceCandidate = (candidate, streamId) => {
    if (isSDPExchange) {
        var mess = {
            action: 'ICE_CANDIDATE',
            userSessionId: getUserSession(),
            streamId: streamId,
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
            userSessionId: getUserSession(),
            streamId: message.streamId,
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


export const view = (streamId, videoRef) => {
    return new Promise((resolve, reject) => {
        video = videoRef;
        stompClient = getSocket();
        onLiveMessage('/queue/' + getUserSession());
        if (stompClient && stompClient.connected) {
            var message = {
                streamId: streamId,
                userSessionId: getUserSession(),
            };
            sendMessage(message, '/app/stream/join');
            resolve(); // Resolve khi message được gửi
        } else {
            reject(new Error('STOMP client not connected'));
        }
    });
}

export const createPeerViewer = (message) => {
    streamId = message.streamId;
    onLiveMessage('/topic/' + message.streamId);
    if (!webRtcPeer) {
        var options = {
            remoteVideo: video.current,
            onicecandidate: (candidate) => onIceCandidate(candidate, message.streamId),
        };
        webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
            if (error) {
                return console.error('Occur error while creating webRtcPeer', error);
            }
            console.log('Start generate SDP offer');
            this.generateOffer((error, sdpOffer) => onOfferViewer(error, sdpOffer, message.streamId));

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

const onOfferViewer = (error, sdpOffer, streamId) => {
    if (error) {
        return console.error('Occur error while generate the SDP offer', error);
    }
    var message = {
        action: 'OFFER_VIEWER',
        userSessionId: getUserSession(),
        streamId: streamId,
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
            userSessionId: getUserSession(),
            streamId: streamId,
        }
        sendMessage(message, '/app/stream/end');
    }
}

export const stopView = (streamId) => {
    if (webRtcPeer) {
        // send stop message to server
        var message = {
            userSessionId: getUserSession(),
            streamId: streamId,
        }
        sendMessage(message, '/app/stream/leave');
    }
}

export const sendMessage = (message, destination) => {
    if (stompClient && stompClient.connected) {

        console.log("Sending stream message to server ", message);
        stompClient.publish({
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            destination: destination,
            body: JSON.stringify(message),
        });
    }
}

export const handleErrorMessage = (message) => {
    console.error("error message ", message);
}

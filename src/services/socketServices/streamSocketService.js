import { getSocket, getUserSession } from './socketService';
import kurentoUtils from 'kurento-utils';

let webRtcPeer = null;
let stompClient = null;
let video = null;

let isSDPExchange = false;
let candidateQueues = [];


const onMessage = (privateQueue) => {
    if (stompClient && stompClient.connected) {
        stompClient.subscribe(privateQueue, (response) => {
            const message = JSON.parse(response.body);
            switch (message.id) {
                case 'createPeerPresenter':
                    createPeerPresenter(message);
                    break;
                case 'createPeerViewer':
                    createPeerViewer(message);
                    break;
                case 'processAnswer':
                    processAnswer(message);
                    break;
                case 'processCandidate':
                    processCandidate(message);
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
    onMessage('/queue/' + getUserSession());

    if (stompClient && stompClient.connected) {
        var message = {
            id: 'registryPresenter',
            userSession: getUserSession(),
        };
        sendMessage(message, '/app/stream/registry');
    }
}

export const createPeerPresenter = (message) => {
    console.log('Live session has bean created with id: ' + message.liveSession);
    if (!webRtcPeer) {
        var options = {
            localVideo: video.current,
            onicecandidate: (candidate) => onIceCandidate(candidate, message.liveSession),
        };
        webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
            if (error) {
                return console.error('Occur error while creating webRtcPeer', error);
            }
            console.log('Start generate SDP offer');
            webRtcPeer.generateOffer((error, sdpOffer) => onOfferPresenter(error, sdpOffer, message.liveSession));
        });
    }
};

const onOfferPresenter = (error, sdpOffer, liveSession) => {
    if (error) {
        return console.error('Occur error while generate the SDP offer', error);
    }
    var message = {
        id: 'exchangeOfferPresenter',
        userSession: getUserSession(),
        liveSession: liveSession,
        data: {
            sdpOffer: sdpOffer,
        },
    }
    console.log('Sending SDP Offer to server');
    sendMessage(message, '/app/stream/exchange');
};

const onIceCandidate = (candidate, liveSession) => {
    if (isSDPExchange) {
        var message = {
            id: 'exchangeCandidate',
            userSession: getUserSession(),
            liveSession: liveSession,
            data: {
                candidate: candidate,
            },
        };
        console.log('Detect a ICE candidate from event listener and send to server');
        sendMessage(message, '/app/stream/exchange');
    } else {
        candidateQueues.push(candidate);
        console.info('Push ICE into queue cause SDP has not exchange yet');
    }
}

export const processAnswer = (message) => {
    console.log('Receive SDP answer from server');
    webRtcPeer.processAnswer(message.data.sdpAnswer, (error) => {
        if (error)
            return console.error('Occur error while process sdpAnswer', error);
        isSDPExchange = true;
    });

    // Send all iceCandidate in queue to server
    console.log('Send all iceCandidates in queue to server');

    candidateQueues.forEach(candidate => {
        var mess = {
            id: 'exchangeCandidate',
            userSession: getUserSession(),
            liveSession: message.liveSession,
            data: {
                candidate: candidate,
            },
        };
        sendMessage(mess, '/app/stream/exchange');
    });
    candidateQueues = [];
}

export const processCandidate = (message) => {
    webRtcPeer.addIceCandidate(message.data.candidate, function (error) {
        if (error) return console.error('Occur error while add IceCandidate' + error);
    });
    console.log('Starting connect between RTC Peer Client and RTC Endpoint');
}


export const view = (liveSession, videoRef) => {
    video = videoRef;
    stompClient = getSocket();
    onMessage('/queue/' + getUserSession());
    if (stompClient && stompClient.connected) {
        var message = {
            id: 'registryViewer',
            liveSession: liveSession,
            userSession: getUserSession(),
        };
        sendMessage(message, '/app/stream/registry');
    }
}

export const createPeerViewer = (message) => {
    if (!webRtcPeer) {
        var options = {
            remoteVideo: video.current,
            onicecandidate: (candidate) => onIceCandidate(candidate, message.liveSession),
        };
        webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
            if (error) {
                return console.error('Occur error while creating webRtcPeer', error);
            }
            console.log('Start generate SDP offer');
            this.generateOffer((error, sdpOffer) => onOfferViewer(error, sdpOffer, message.liveSession));

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

const onOfferViewer = (error, sdpOffer, liveSession) => {
    if (error) {
        return console.error('Occur error while generate the SDP offer', error);
    }
    var message = {
        id: 'exchangeOfferViewer',
        userSession: getUserSession(),
        liveSession: liveSession,
        data: {
            sdpOffer: sdpOffer,
        }
    }
    console.log('Sending SDP Offer to server');
    sendMessage(message, '/app/stream/exchange');
}

export const sendMessage = (message, destination) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: destination,
            body: JSON.stringify(message),
        });
    }
}

export const stopStream = () => {
    if (webRtcPeer) {
        // send stop message to server
        webRtcPeer.dispose();
        webRtcPeer = null;
    }
}
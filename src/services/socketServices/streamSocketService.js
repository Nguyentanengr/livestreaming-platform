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
                    processAnswerPresenter(message);
                case 'processCandidate':
                    processCandidatePresenter(message);
                case 'sdpViewer':
                    onAnswerViewer(message);
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

    if (stompClient || stompClient.connected) {
        var message = {
            id: 'registryPresenter',
            userSession: getUserSession(),
        };
        sendMessage(message, 'app/stream/registry');
    }
}

export const createPeerPresenter = (message) => {
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
        id: 'exchangeOffer',
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

export const processAnswerPresenter = (message) => {
    console.log('Receive SDP answer from server');
    webRtcPeer.processAnswer(message.data.sdpAnswer, (error) => {
        if (error)
            return console.error('Occur error while process sdpAnswer', error);
        isSDPExchange = true;
    });

    // Send all iceCandidate in queue to server
    console.log('Send all iceCandidates in queue to server');
    candidateQueues.forEach(candidate => {
        var message = {
            id: 'exchangeCandidate',
            userSession: getUserSession(),
            liveSession: message.liveSession,
            data: {
                candidate: candidate,
            },
        };
        sendMessage(message, '/app/stream/exchange');
    })
}

export const processCandidatePresenter = (message) => {
    webRtcPeer.addIceCandidate(message.data.onIceCandidate, function (error) {
        if (error) return console.error('Occur error while add IceCandidate' + error);
    });
    console.log('Starting connect between RTC Peer Client and RTC Endpoint');
}


export const view = (liveSessionId, videoRef) => {
    video = videoRef;
    stompClient = getSocket();
    onMessage('/queue/' + getUserSession());

    if (stompClient || stompClient.connected) {
        var message = {
            id: 'registryViewer',
            liveSessionId: liveSessionId,
            userSession: getUserSession(),
        };
        sendMessage(message, 'app/stream/registry');
    }
}

export const createPeerViewer = (message) => {
    if (!webRtcPeer) {
        var options = {
            localVideo: video.current,
            onicecandidate: (candidate) => onIceCandidate(candidate, message.liveSession),
        };
        webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
            if (error) {
                return console.error('Occur error while creating webRtcPeer', error);
            }
            console.log('Start generate SDP offer');
            this.generateOffer((error, sdpOffer) => onOfferViewer(error, sdpOffer, message.liveSession));
        });
    }
}



const onOfferViewer = (error, sdpOffer, liveSessionId) => {
    if (error) {
        return console.error('Occur error while generate the SDP offer', error);
    }
    var message = {
        wsId: getUserSession(),
        type: 'sdpViewer',
        data: {
            liveSessionId: liveSessionId,
            sdpOffer: sdpOffer,
        }
    }
    console.log('Sending SDP Offer to server');
    sendMessage(message, '/app/stream');
}



const onAnswerPresenter = (response) => {
    if (response.result === 'accepted') {
        console.log('Receive SDP answer from server');
        webRtcPeer.processAnswer(response.sdpAnswer, (error) => {
            if (error)
                return console.error('Occur error while process sdpAnswer', error);
        });
        // Send all iceCandidate in queue to server
        console.log('Send all iceCandidates in queue to server');
        candidateQueues.forEach(candidate => {
            var message = {
                wsId: getUserSession(),
                type: 'iceCandidate',
                data: {
                    candidate: candidate,
                },
            };
            sendMessage(message, '/app/stream');
        })
    } else {
        console.error('Can not accepted sdpOffer in server side', response.message);
        stopStream();
    }
}

const onAnswerViewer = (response) => {
    if (response.result === 'accepted') {
        console.log('Receive SDP answer from server');
        webRtcPeer.processAnswer(response.sdpAnswer, (error) => {
            if (error)
                return console.error('Occur error while process sdpAnswer', error);
        });
        // Send all iceCandidate in queue to server
        console.log('Send all iceCandidates in queue to server');
        candidateQueues.forEach(candidate => {
            var message = {
                wsId: getUserSession(),
                type: 'iceCandidate',
                data: {
                    candidate: candidate,
                },
            };
            sendMessage(message, '/app/stream');
        })
    } else {
        console.error('Can not accepted sdpOffer in server side', response.message);
        stopStream();
    }
}


export const onIceResponse = (response) => {
    if (stompClient && stompClient.connected) {
        webRtcPeer.addIceCandidate(response.onIceCandidate, function (error) {
            if (error) return console.error('Occur error while add IceCandidate' + error);
        });
        console.log('Starting connect between RTC Peer Client and RTC Endpoint');
    }
};

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
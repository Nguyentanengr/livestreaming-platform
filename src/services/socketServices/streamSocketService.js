import { getSocket } from "./socketService"

import kurentoUtils from 'kurento-utils'

let webRtcPeer = null;
let stompClient = null;

let isSDPExchange = false;
let candidateQueues = [];

export const present = (videoRef) => {
    stompClient = getSocket();
    onSdpResponse("/topic/sdp");
    onIceResponse("/topic/ice");

    if (stompClient || stompClient.connected) {
        if (!webRtcPeer) {
            var options = {
                localVideo: videoRef.current,
                onicecandidate: onIceCandidate,
            };
            webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
                if (error) {
                    console.error("[Error] Occur error while connecting with media.")
                    return console.error(error);
                }
                console.log("[Info] Start generate SDP offer.");
                webRtcPeer.generateOffer(onSdpOffer);
            });
            console.log("[Info] Connected with kurento media server.");
        }
    }
};


export const view = (liveId, videoRef) => {
    stompClient = getSocket();
    onSdpResponse("/topic/sdp");
    onIceResponse("/topic/ice");

    if (stompClient || stompClient.connected) {
        if (!webRtcPeer) {
            var options = {
                localVideo: videoRef.current,
                onicecandidate: onIceCandidate,
            };
            webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
                if (error) {
                    console.error("[Error] Occur error while connecting with media.")
                    return console.error(error);
                }
                console.log("[Info] Start generate SDP offer.");
                this.generateOffer((error, offerSdp) => onSdpOfferViewer(error, offerSdp, liveId));
            });
            console.log("[Info] Connected with kurento media server.");
        }
    }
}

const onSdpOffer = (error, sdpOffer, liveId) => {
    if (error) {
        stopStream();
        return console.error("[Error] Occur error while generate the SDP offer.");
    }
    var message = {
        id: "sdp-presenter",
        data: sdpOffer,
    }
    console.info("[Info] Sending SDP Offer to server.");
    sendMessage(message, "/app/stream");
};

const onSdpOfferViewer = (error, offerSdp) => {
    if (error) {
        return console.error('[Error] Error generating the offer'); 
    }
    var message = {
        id: "sdp-viewer",
        sessionId: liveId,
        data: offerSdp,
    }
    sendMessage(message, "/app/stream");
}

const onIceCandidate = (candidate) => {
    if (isSDPExchange) {
        var message = {
            id: "ice",
            data: candidate,
        };
        console.info("[Info] Detect a ICE candidate from event listener and send to server");
        sendMessage(message, "/app/stream");
    } else {
        candidateQueues.push(candidate);
        console.info("[Info] Add ICE into queue cause SDP has not exchange yet");
    }
}

const onSdpResponse = (destination) => {
    if (stompClient || stompClient.connected) {
        stompClient.subscribe(destination, (message) => {
            const response = JSON.parse(message.body);
            if (response.response === "accepted") {
                console.info("[Info] Receive SDP answer and process it");
                webRtcPeer.processAnswer(response.data, (error) => {
                    if (error) {
                        stopStream();
                        return console.error("[Error] " + error);
                    }
                });
                // Send all ice in queue to server
                console.info("[Info] Send all ices in queue to server");
                candidateQueues.forEach(candidate => {
                    var message = {
                        id: "ice",
                        data: candidate,
                    };
                    sendMessage(message, "/app/stream");
                })
            } else {
                stopStream();
                return console.error("[Error] " + response.data);
            }
        })
    }
}
export const onIceResponse = (destination) => {
    if (stompClient && stompClient.connected) {
        stompClient.subscribe(destination, (message) => {
            const response = JSON.parse(message.body);
            webRtcPeer.addIceCandidate(response.data, function (error) {
                if (error) return console.error("[Error] " + error);
            });
            console.log("[Info] Starting connect between RTC Peer Client and RTC Endpoint.");
        });
    }
};

export const sendMessage = (message, destination) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: destination,
            headers: {
                username: "abcxyz"
            },
            body: JSON.stringify(message),
        });
    }
}

export const stopStream = () => {
    if (webRtcPeer) {
        webRtcPeer.dispose();
        webRtcPeer = null;
    }
}
import { getSocket } from "./socketService"

import kurentoUtils from 'kurento-utils'

let webRtcPeer = null

export const present = (videoRef) => {
    const stompClient = getSocket();
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
                webRtcPeer.generateOffer(onOfferPresenter);
            });
            console.log("[Info] Connected with kurento media server.");
        }
    }
};

const onIceCandidate = (candidate) => {
    var message = {
        candidate: candidate,
    };
    sendMessage(message, "app/connect/candidate");
}


const onOfferPresenter = (error, sdpOffer) => {
    if (error) {
        return console.error("[Error] Occur error while generate the SDP offer.");
    }
    sendMessage(sdpOffer, "app/connect/offer/presenter");
};

export const sendMessage = (message, destination) => {
    const stompClient = getSocket();
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: destination,
            body: JSON.stringify(message),
        });
    }
}

export const receiveMessage = (destination) => {
    const stompClient = getSocket();
    if (stompClient && stompClient.connected) {
        stompClient.subscribe(destination, (message) => {
            switch (destination) {
                case "topic/presenter":
                    handleOfferAnswerPresenter(message);
                    break;
                case "topic/connect":
                    handleIceCandidate(message);
                    break;
            }
        });
    }
};


const handleOfferAnswerPresenter = (message) => {
    const data = JSON.parse(message.body);
    if (data.response === "accepted") {
        webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
            if (error) return console.error(error);
        });
    } else {
        const error = message.message ? message.message : "unknow error";
        console.error("[Error]: Can not accept connection cause by " + error);
        stopStream();
    }
}

const handleIceCandidate = (message) => {
    const data = JSON.parse(message.body);
    webRtcPeer.addIceCandidate(data.candidate, function (error) {
        if (error) return console.error(error);
    });
}

const stopStream = () => {
    if (webRtcPeer) {
        webRtcPeer.dispose();
        webRtcPeer = null;
    }
}
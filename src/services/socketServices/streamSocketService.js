import { getSocket } from "./socketService"

import kurentoUtils from 'kurento-utils'

let webRtcPeer = null;
let isSdpExchangeComplete = false;
let pendingIceCandidates = [];

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

const onOfferPresenter = async (error, sdpOffer) => {
    if (error) {
        return console.error("[Error] Occur error while generate the SDP offer.");
    }

    // var message = {
    //     id: "presenter",
    //     data: sdpOffer,
    // }

    // console.info("[Info] Sending SDP Offer to server.");
    // sendMessage(message, "/app/stream");
    try {
        var message = {
            id: "presenter",
            data: sdpOffer,
        }

        console.info("[Info] Sending SDP Offer to server.");
        sendMessage(message, "/app/stream");

        // Wait SDP answer from server
        const response = await waitForAnswer("/topic/sdp-answer");
        if (response.response === "accepted") {
            
        }
    } catch (error) {

    }
};

const waitForAnswer = (destination) => {
    return new Promise((resolve, reject) => {
        const stompClient = getSocket();
        if (!stompClient || !stompClient.connected) {
            return reject("Socket not connected");
        }

        stompClient.subscribe(destination, (message) => {
            const response = JSON.parse(message.body);
            resolve(response);
        })

        // If there is no response after 5 seconds.
        setTimeout(() => {
            reject("Timeout waiting for SDP answer")
        }, 5000);
    })
}

const onIceCandidate = (candidate) => {
    if (!isSdpExchangeComplete) {
        console.log("[Info] SDP not complete, save ICE candidate temp.");
        pendingIceCandidates.push(candidate);
    } else {
        var message = {
            id: "connect",
            data: candidate,
        };

        console.info("[Info] Detect a ICE candidate from event listener and send to server");
        sendMessage(message, "/app/stream");
    }
}

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
            handleStreamConnection(message);
        }
        );
    }
};



const handleStreamConnection = (message) => {
    const response = JSON.parse(message.body);
    switch (response.id) {
        case "presenter":
            if (response.response === "accepted") {
                webRtcPeer.processAnswer(response.data, function (error) {
                    if (error) return console.error(error);
                    isSdpExchangeComplete = true;

                    while (pendingIceCandidates.length > 0) {
                        const candidate = pendingIceCandidates.shift();
                        const message = {
                            id: "connect",
                            data: candidate,
                        };
                        console.log("[Info] Sended all pend ices");
                        sendMessage(message, "/app/stream");
                    }
                });
                console.log(result);
                console.log("[Info] Receive SDP answer from server.");
            } else {
                console.log("[Info] Receive Error Message from server while processing SDP Offer: " + response.data);
                stopStream();
            }
            break;

        case "connect":
            console.info("[Info] -----------------------------------------");
            webRtcPeer.addIceCandidate(response.data, function (error) {
                if (error) return console.error(error);
            });

            console.log("[Info] Starting connect between RTC Peer Client and RTC Endpoint.");
            break;
    }
}


export const stopStream = () => {
    if (webRtcPeer) {
        webRtcPeer.dispose();
        webRtcPeer = null;
    }
}
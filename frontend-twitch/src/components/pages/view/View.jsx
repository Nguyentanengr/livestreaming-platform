import { ViewContainer } from "./View.styled";
import ViewScreen from "../../features/vscreen/ViewScreen";
import ViewChat from "../../features/vchat/ViewChat";
import ViewLive from "../../features/vlive/ViewLive";
import { useEffect } from "react";

const View = () => {

    useEffect(() => {
        // disable scroll in this page
        document.body.classList.add("no-scroll");

        // able scroll in this page
        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, []);

    return (
        <ViewContainer>
            <div className="live-container">
                <div className="view-screen" >
                    <ViewScreen />
                </div>
                <div className="about-live">
                    <ViewLive />
                </div>
            </div>
            <div className="chat-container">
                <ViewChat />
            </div>
        </ViewContainer>
    );
};

export default View;
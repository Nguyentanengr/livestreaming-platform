import { useEffect } from "react";
import Screen from "../../commons/Screen";
import { ViewScreenContainer } from "./ViewScreen.styled"
import video from "/videos/streamvideo11.mp4";
import { useRef } from "react";


const ViewScreen = () => {

    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current.src = video;
    }, []);

    return (
        <ViewScreenContainer>
            <div className="screen-box">
                <Screen videoRef={videoRef} size="auto" />
            </div>
        </ViewScreenContainer>
    );
};

export default ViewScreen;
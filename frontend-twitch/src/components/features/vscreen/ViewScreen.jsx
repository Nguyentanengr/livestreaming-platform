import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Screen from "../../commons/Screen";
import { ViewScreenContainer } from "./ViewScreen.styled";

const ViewScreen = () => {
    const videoRef = useRef(null);
    const { selectedStream } = useSelector((state) => state.stream);

    useEffect(() => {
        if (selectedStream && videoRef.current) {
            if (selectedStream.endedAt) {
                // Ended stream: play video
                videoRef.current.src = selectedStream.video || "";
                videoRef.current.autoplay = true;
            } else {
                // Live stream: show thumbnail
                videoRef.current.poster = selectedStream.thumbnail || "";
                videoRef.current.autoplay = false;
            }
        }
    }, [selectedStream]);

    return (
        <ViewScreenContainer>
            <div className="screen-box">
                <Screen videoRef={videoRef} size="auto" isPlay={selectedStream?.endedAt} />
            </div>
        </ViewScreenContainer>
    );
};

export default ViewScreen;
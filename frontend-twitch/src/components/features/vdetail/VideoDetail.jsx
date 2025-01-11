import { VideoDetailContainer } from "./VideoDetail.styled";
import { convertDuration } from "../../../utils/convert";

const VideoDetail = () => {
    return (
        <VideoDetailContainer>
            <div className="title">Video Analytics</div>
            <div className="detail-container">
                <div className="file-name">
                    <div className="t-f-name">
                        File name
                    </div>
                    <div className="f-name">
                        my-video.mp4
                    </div>
                </div>
                <div className="file-size">
                    <div className="t-f-size">
                        Video size
                    </div>
                    <div className="f-size">
                        238MB
                    </div>
                </div>
                <div className="video-duration">
                    <div className="f-v-duration">
                        Video Duration
                    </div>
                    <div className="v-duration">
                        {convertDuration(2434)} s
                    </div>
                </div>
                <div className="aspect-ratio">
                    <div className="f-a-ratio">
                        Aspect Ratio
                    </div>
                    <div className="a-ratio">
                        16:9
                    </div>
                </div>
                <div className="bitrate">
                    <div className="f-b">
                        Bitrate
                    </div>
                    <div className="b">
                        8Mbps
                    </div>
                </div>
                <div className="resolution">
                    <div className="f-r">
                        Resolution
                    </div>
                    <div className="r">
                        1920x1080
                    </div>
                </div>
            </div>

        </VideoDetailContainer>
    );
};

export default VideoDetail;
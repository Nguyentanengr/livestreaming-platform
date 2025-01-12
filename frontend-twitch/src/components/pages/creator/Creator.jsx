import { CreatorContainer } from "./Creator.styled"
import UploadDashboard from "../../features/upload/UploadDashboard";
import VideoDescrip from "../../features/vdescrip/VideoDescrip";
import VideoDetail from "../../features/vdetail/VideoDetail";


const Creator = () => {
    return (
        <CreatorContainer>
            <div className="up-video-container">
                <div className="v-upload">
                    <UploadDashboard />
                </div>
                <div className="v-detail">
                    <VideoDetail />
                </div>
            </div>
            <div className="video-description">
                <div className="v-descrip">
                    <VideoDescrip />
                </div>
            </div>
        </CreatorContainer>
    );

};

export default Creator;

import { CreatorContainer } from "./Creator.styled"
import UploadDashboard from "../../features/cupload/UploadDashboard";
import VideoDescrip from "../../features/cdescrip/VideoDescrip";
import VideoDetail from "../../features/cdetail/VideoDetail";


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

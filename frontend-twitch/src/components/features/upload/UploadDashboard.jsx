import { UploadDashboardContainer } from "./UploadDashboard.styled";
import image from "/images/commons/creator.svg";
import Button from "../../commons/Button";
import { Theme } from "../../../assets/styles/Theme";

const UploadDashboard = () => {
    return (
        <UploadDashboardContainer>
            <div className="title-image">
                <img src={image} alt="creator" />
            </div>
            <div className="lorem">
                Want to see metrics on your recent video? <br />
                Upload and publish a video to get started.
            </div>
            <div className="upload-button">
                Upload Videos
            </div>
        </UploadDashboardContainer>
    );
};

export default UploadDashboard;
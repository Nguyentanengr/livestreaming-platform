import { VideoActionContainer } from "./VideoAction.styled"
import { convertView } from "../../utils/convert";

const VideoAction = ({ count, icon, onclick }) => {
    return (
        <VideoActionContainer>
            <div className="action-icon" onClick={onclick}>{icon}</div>
            <div className="action-count">{convertView(count)}</div>
        </VideoActionContainer>
    );
};

export default VideoAction;
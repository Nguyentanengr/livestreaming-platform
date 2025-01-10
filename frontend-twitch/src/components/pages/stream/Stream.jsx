import { StreamContainer } from "./Stream.styled"
import StreamPreview from "../../features/stream/StreamPreview";
import ChatPreview from "../../features/chat/ChatPreview";
import ActivityFeed from "../../features/activity/ActivityFeed";
import EditBar from "../../features/edit/EditBar";


const Stream = () => {
    return (
        <StreamContainer>
            <div className="col1">
                <StreamPreview />
                <ActivityFeed />
            </div>
            <div className="col2">
                <ChatPreview />
            </div>
            <div className="col3">
                <EditBar />
            </div>
        </StreamContainer>
    );
};

export default Stream;
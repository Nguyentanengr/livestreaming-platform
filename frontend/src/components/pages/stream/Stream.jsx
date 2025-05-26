import { StreamContainer } from "./Stream.styled"
import StreamPreview from "../../features/sstream/StreamPreview";
import ChatPreview from "../../features/schat/ChatPreview";
import ActivityFeed from "../../features/sactivity/ActivityFeed";
import EditBar from "../../features/sedit/EditBar";


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
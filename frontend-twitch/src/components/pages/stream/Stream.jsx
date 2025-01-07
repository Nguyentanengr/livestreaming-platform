import { StreamContainer } from "./Stream.styled"
import StreamPreview from "../../features/stream/StreamPreview";
import ChatPreview from "../../features/chat/ChatPreview";
import ActivityFeed from "../../features/activity/ActivityFeed";
import EditBar from "../../features/edit/EditBar";


const Stream = () => {
    return (
        <StreamContainer>
            <StreamPreview />
            <ActivityFeed />
            <ChatPreview />
            <EditBar />
            
        </StreamContainer>
    );
};

export default Stream;
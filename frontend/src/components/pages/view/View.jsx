import { ViewContainer } from "./View.styled";
import ViewScreen from "../../features/vscreen/ViewScreen";
import ViewChat from "../../features/vchat/ViewChat";
import ViewLive from "../../features/vlive/ViewLive";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { getStreamById } from "../../../service/api/streamApi";
import { getUserProfile } from "../../../service/api/userApi";
import { view } from "../../../service/websocket/streamSocketService";

const View = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const streamId = searchParams.get("streamId") || useParams().id; // Ưu tiên streamId từ query, nếu không dùng từ path
  const { loading, error, selectedStream } = useSelector((state) => state.stream);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    if (streamId) {
      dispatch(getStreamById({ streamId }));
    }
    if (username) {
      dispatch(getUserProfile({ username }));
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [dispatch, streamId, username]);

  if (loading) {
    return <ViewContainer>Loading...</ViewContainer>;
  }

  if (error) {
    return <ViewContainer>Error: {error.message}</ViewContainer>;
  }

  if (!selectedStream) {
    return <ViewContainer>Stream not found</ViewContainer>;
  }

  return (
    <ViewContainer>
      <div className="live-container">
        <div className="view-screen">
          <ViewScreen />
        </div>
        <div className="about-live">
          <ViewLive />
        </div>
      </div>
      <div className="chat-container">
        <ViewChat />
      </div>
    </ViewContainer>
  );
};

export default View;
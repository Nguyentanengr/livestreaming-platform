import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Screen from "../../commons/Screen";
import { ViewScreenContainer } from "./ViewScreen.styled";
import { view, stopView } from "../../../service/websocket/streamSocketService";
import { useParams } from "react-router-dom";

const ViewScreen = () => {
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const { streamId } = useParams();
  const { selectedStream, loading, error } = useSelector((state) => state.stream);
  const [isWebRTCReady, setIsWebRTCReady] = useState(false);

  useEffect(() => {
    if (selectedStream && videoRef.current && !selectedStream.endedAt) {
      console.log('[DEBUG] Starting WebRTC view setup for streamId:', selectedStream.id);
      view(selectedStream.id, videoRef)
        .then(() => {
          console.log('[DEBUG] WebRTC view setup completed');
          setIsWebRTCReady(true);
        })
        .catch((err) => {
          console.error('[ERROR] Error setting up WebRTC:', err);
        });
    }
    return () => {
      if (selectedStream && !selectedStream.endedAt) {
        console.log('[DEBUG] Stopping WebRTC view for streamId:', selectedStream.id);
        stopView(selectedStream.id);
      }
      setIsWebRTCReady(false);
    };
  }, [selectedStream]);

  useEffect(() => {
    if (videoRef.current && selectedStream) {
      if (selectedStream.endedAt) {
        // Stream đã kết thúc: phát video từ nguồn
        console.log('[DEBUG] Stream ended, setting video.src:', selectedStream.video);
        videoRef.current.src = selectedStream.video || "";
        videoRef.current.poster = "";
        videoRef.current.play().catch(err => {
          console.error('[ERROR] Failed to play recorded video:', err);
        });
      } else if (isWebRTCReady) {
        // Stream đang live: xóa poster khi WebRTC sẵn sàng
        console.log('[DEBUG] Stream is live, clearing poster');
        videoRef.current.poster = "";
      } else {
        // Chưa sẵn sàng WebRTC: hiển thị thumbnail
        console.log('[DEBUG] WebRTC not ready, setting thumbnail:', selectedStream.thumbnail);
        videoRef.current.poster = selectedStream.thumbnail || "";
      }
    }
  }, [selectedStream, isWebRTCReady]);

  if (loading) return <ViewScreenContainer>Loading...</ViewScreenContainer>;
  if (error) return <ViewScreenContainer>Error: {error.message}</ViewScreenContainer>;
  if (!selectedStream) return <ViewScreenContainer>Stream not found</ViewScreenContainer>;

  return (
    <ViewScreenContainer>
      <div className="screen-box">
        <Screen
          videoRef={videoRef}
          size="auto"
          isLive={!selectedStream.endedAt}
        />
      </div>
    </ViewScreenContainer>
  );
};

export default ViewScreen;
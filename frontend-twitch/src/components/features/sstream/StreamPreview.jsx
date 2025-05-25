import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleBar from '../../commons/TitleBar';
import Screen from '../../commons/Screen';
import { Icons } from '../../../assets/icons/Icon';
import Counter from './Counter';
import ErrorAlert from '../../commons/ErrorAlert';
import { StreamPreviewContainer } from './StreamPreview.styled';
import { setIsLive, setIsVideoLoaded } from '../../../stores/slices/editStreamSlice';
import { present, stopPresent } from '../../../service/websocket/streamSocketService';
import { createStream } from '../../../service/api/streamApi';
import { getUserSession } from '../../../service/websocket/socketService';

let webcamStream = null;

const StreamPreview = () => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    titleInput,
    notificationInput,
    categorySelect,
    tagSelects,
    thumbnail,
    thumbnailFile, // Thêm để lấy file gốc
    commentSelect,
    visibilitySelect,
    isVideoLoaded,
    isLive,
    visibilityInput,
    viewersCount,
  } = useSelector((state) => state.editStream);

  const handleOnWebcam = async () => {
    try {
      if (!webcamStream) {
        webcamStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      }
      if (videoRef.current) {
        videoRef.current.srcObject = webcamStream;
        dispatch(setIsVideoLoaded(true));
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
      setErrorMessage('Failed to access webcam. Please ensure it is enabled.');
    }
  };

  const handleOffWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop());
      webcamStream = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    dispatch(setIsVideoLoaded(false));
  };

  const handlePresentClick = (e) => {
    e.preventDefault();
    if (isLive) {
      console.log("Stop stream");
      try {
        dispatch(setIsLive(false));
        if (webcamStream) {
          webcamStream.getTracks().forEach((track) => track.stop());
          webcamStream = null;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        dispatch(setIsVideoLoaded(false));
        setErrorMessage(null);

        stopPresent();
      } catch (error) {
        console.error('Error stopping stream:', error);
        setErrorMessage('Failed to stop stream. Please try again.');
      }
      return;
    }

    // Validation checks
    if (!titleInput || titleInput.trim() === '') {
      setErrorMessage('Please enter a title for your stream.');
      return;
    }
    if (!categorySelect) {
      setErrorMessage('Please select a category for your stream.');
      return;
    }
    if (tagSelects.length === 0) {
      setErrorMessage('Please add at least one tag for your stream.');
      return;
    }
    if (!thumbnailFile) { // Kiểm tra thumbnailFile
      setErrorMessage('Please upload a thumbnail for your stream.');
      return;
    }
    if (!commentSelect || !['ON', 'OFF'].includes(commentSelect)) {
      setErrorMessage('Please select a valid comment setting (ON or OFF).');
      return;
    }
    if (
      !visibilitySelect ||
      !['All everyone', 'Who are following me', 'Only me'].includes(visibilitySelect)
    ) {
      setErrorMessage('Please select a valid visibility option.');
      return;
    }
    if (!isVideoLoaded) {
      setErrorMessage('Please enable your webcam to start streaming.');
      return;
    }

    // Start streaming
    try {
      const data = {
        userSessionId: getUserSession(),
        title: titleInput,
        liveNotification: notificationInput,
        categoryId: categorySelect.id,
        tagNames: tagSelects,
        commentEnabled: commentSelect === 'ON' ? true : false,
        visibility: visibilitySelect === visibilityInput[0] ? 'PUBLIC' : visibilitySelect === visibilityInput[1] ? 'FOLLOWERS' : 'PRIVATE',
      };
      dispatch(setIsLive(true));
      setErrorMessage(null);
      console.log("Started Stream");

      present(videoRef, data);

      dispatch(createStream({ streamData: data, thumbnailFile })); // Sử dụng thumbnailFile
    } catch (error) {
      console.error('Error starting stream:', error);
      setErrorMessage('Failed to start stream. Please try again.');
    }
  };

  useEffect(() => {
    if (webcamStream && videoRef.current && isVideoLoaded) {
      videoRef.current.srcObject = webcamStream;
    }
    return () => {};
  }, [isVideoLoaded]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3300);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);


  return (
    <StreamPreviewContainer>
      <TitleBar title="Stream Preview" />
      <div className="screen-stream">
        <Screen videoRef={videoRef} isPlay={isLive} size="auto" />
        <div className="webcam-overlay">
          {!isVideoLoaded && (
            <div className="webcam-preview">
              <div className="description">Use your webcam in preview mode</div>
              <div className="webcam-controls">
                <div className="on-webcam-btn" onClick={handleOnWebcam}>
                  On Webcam
                </div>
              </div>
            </div>
          )}
          {isVideoLoaded && (
            <div className="webcam-controls">
              <div className="off-webcam-btn" onClick={handleOffWebcam}>
                Off Webcam
              </div>
            </div>
          )}
        </div>
        {isLive && (
          <div className="live-span">
            <Icons.Live className="live-icon" /> Live
          </div>
        )}
      </div>
      <div className="control">
        <div className="counter-container">
          <Counter title="Session" counts={0} />
          <Counter title="Viewers" counts={viewersCount} />
          <Counter title="Follows" counts={0} />
        </div>
        <div className={`present-btn ${isLive ? 'highlight' : ''}`} onClick={handlePresentClick}>
          {isLive ? 'Stop Streaming' : 'Start Streaming'}
        </div>
      </div>
      {errorMessage && <ErrorAlert type="error" message={errorMessage} />}
    </StreamPreviewContainer>
  );
};

export default StreamPreview;
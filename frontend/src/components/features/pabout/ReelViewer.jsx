import { useLocation, useNavigate } from 'react-router-dom';
import { ReelViewerContainer } from './ReelViewer.styled';
import { Icons } from '../../../assets/icons/Icon';

const ReelViewer = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const videoUrl = queryParams.get("videoUrl");

    const handleClose = () => {
        navigate(-1); // Quay lại trang trước
    };

    if (!videoUrl) {
        return <ReelViewerContainer>Video not found</ReelViewerContainer>;
    }

    return (
        <ReelViewerContainer>
            <div className="video-container">
                <video controls autoPlay>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button className="close-button" onClick={handleClose}>
                    <Icons.Close />
                </button>
            </div>
        </ReelViewerContainer>
    );
};

export default ReelViewer;
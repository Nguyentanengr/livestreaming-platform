import { UploadDashboardContainer } from './UploadDashboard.styled';
import image from '/images/commons/creator.svg';
import { Theme } from '../../../assets/styles/Theme';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setVideoFile } from '../../../stores/slices/createReelSlice';

const UploadDashboard = () => {
    const [video, setVideo] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleFileChange = (file) => {
        if (file && file.type.startsWith('video/')) {
            setIsLoading(true);
            const reader = new FileReader();
            reader.onload = (e) => {
                setTimeout(() => {
                    setVideo(e.target.result);
                    dispatch(setVideoFile(file)); // Store the raw file in Redux
                    setIsLoading(false);
                }, 500);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileChange(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        handleFileChange(file);
    };

    const handleRemoveVideo = () => {
        setVideo(null);
        dispatch(setVideoFile(null)); // Clear the file in Redux
    };

    return (
        <UploadDashboardContainer>
            <div
                className={`upload-area ${isDragging ? 'dragging' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById('videoInput').click()}
            >
                {isLoading ? (
                    <div className='loading'>
                        <div className='spinner'></div>
                        <div className='text'>Uploading...</div>
                    </div>
                ) : video ? (
                    <div className='video-preview'>
                        <video controls src={video} />
                        <div
                            className='remove-icon'
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveVideo();
                            }}
                        >
                            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                <path d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='title-image'>
                            <img src={image} alt='creator' />
                        </div>
                        <div className='lorem'>
                            Want to see metrics on your recent video? <br />
                            Upload and publish a video to get started.
                        </div>
                        <div className='upload-button'>Upload Reels</div>
                    </>
                )}
                <input
                    type='file'
                    id='videoInput'
                    accept='video/*'
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                />
            </div>
        </UploadDashboardContainer>
    );
};

export default UploadDashboard;
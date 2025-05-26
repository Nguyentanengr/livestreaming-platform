import { VideoDetailContainer } from './VideoDetail.styled';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip'; // Import react-tooltip

const VideoDetail = () => {
    const [videoMetadata, setVideoMetadata] = useState({
        fileName: 'N/A',
        fileSize: 'N/A',
        duration: 'N/A',
        aspectRatio: 'N/A',
        bitrate: 'N/A',
        resolution: 'N/A',
    });

    const videoRef = useRef(null);
    const { videoFile } = useSelector((state) => state.createReel); // Access videoFile from Redux

    useEffect(() => {
        const fetchVideoMetadata = async () => {
            if (!videoFile) {
                setVideoMetadata({
                    fileName: 'N/A',
                    fileSize: 'N/A',
                    duration: 'N/A',
                    aspectRatio: 'N/A',
                    bitrate: 'N/A',
                    resolution: 'N/A',
                });
                return;
            }

            try {
                const fileSizeMB = (videoFile.size / (1024 * 1024)).toFixed(2);

                const video = videoRef.current;
                video.src = URL.createObjectURL(videoFile);

                video.onloadedmetadata = () => {
                    const durationSeconds = Math.floor(video.duration);
                    const minutes = Math.floor(durationSeconds / 60);
                    const seconds = durationSeconds % 60;
                    const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

                    const resolution = `${video.videoWidth}x${video.videoHeight}`;

                    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
                    const divisor = gcd(video.videoWidth, video.videoHeight);
                    const aspectRatio = `${video.videoWidth / divisor}:${video.videoHeight / divisor}`;

                    const bitrateMbps = ((videoFile.size * 8) / durationSeconds / (1024 * 1024)).toFixed(1);

                    setVideoMetadata({
                        fileName: videoFile.name,
                        fileSize: `${fileSizeMB} MB`,
                        duration: `${formattedDuration} s`,
                        aspectRatio,
                        bitrate: `${bitrateMbps} Mbps`,
                        resolution,
                    });

                    URL.revokeObjectURL(video.src);
                };

                video.onerror = () => {
                    console.error('Error loading video metadata');
                    setVideoMetadata({
                        fileName: videoFile.name,
                        fileSize: `${fileSizeMB} MB`,
                        duration: 'N/A',
                        aspectRatio: 'N/A',
                        bitrate: 'N/A',
                        resolution: 'N/A',
                    });
                    URL.revokeObjectURL(video.src);
                };
            } catch (error) {
                console.error('Error processing video metadata:', error);
                setVideoMetadata({
                    fileName: videoFile.name,
                    fileSize: `${fileSizeMB} MB`,
                    duration: 'N/A',
                    aspectRatio: 'N/A',
                    bitrate: 'N/A',
                    resolution: 'N/A',
                });
            }
        };

        fetchVideoMetadata();

        return () => {
            if (videoRef.current && videoRef.current.src) {
                URL.revokeObjectURL(videoRef.current.src);
            }
        };
    }, [videoFile]);

    return (
        <VideoDetailContainer>
            <div className='title'>Video Analytics</div>
            <div className='detail-container'>
                <div className='file-name'>
                    <div className='t-f-name'>File name</div>
                    <div
                        className='f-name'
                        data-tooltip-id={`tooltip-file-name`}
                        data-tooltip-content={videoMetadata.fileName}
                    >
                        {videoMetadata.fileName}
                    </div>
                </div>
                <div className='file-size'>
                    <div className='t-f-size'>Video size</div>
                    <div
                        className='f-size'
                        data-tooltip-id={`tooltip-file-size`}
                        data-tooltip-content={videoMetadata.fileSize}
                    >
                        {videoMetadata.fileSize}
                    </div>
                </div>
                <div className='video-duration'>
                    <div className='f-v-duration'>Video Duration</div>
                    <div
                        className='v-duration'
                        data-tooltip-id={`tooltip-duration`}
                        data-tooltip-content={videoMetadata.duration}
                    >
                        {videoMetadata.duration}
                    </div>
                </div>
                <div className='aspect-ratio'>
                    <div className='f-a-ratio'>Aspect Ratio</div>
                    <div
                        className='a-ratio'
                        data-tooltip-id={`tooltip-aspect-ratio`}
                        data-tooltip-content={videoMetadata.aspectRatio}
                    >
                        {videoMetadata.aspectRatio}
                    </div>
                </div>
                <div className='bitrate'>
                    <div className='f-b'>Bitrate</div>
                    <div
                        className='b'
                        data-tooltip-id={`tooltip-bitrate`}
                        data-tooltip-content={videoMetadata.bitrate}
                    >
                        {videoMetadata.bitrate}
                    </div>
                </div>
                <div className='resolution'>
                    <div className='f-r'>Resolution</div>
                    <div
                        className='r'
                        data-tooltip-id={`tooltip-resolution`}
                        data-tooltip-content={videoMetadata.resolution}
                    >
                        {videoMetadata.resolution}
                    </div>
                </div>
            </div>
            <video ref={videoRef} style={{ display: 'none' }} />
            <Tooltip id='tooltip-file-name' />
            <Tooltip id='tooltip-file-size' />
            <Tooltip id='tooltip-duration' />
            <Tooltip id='tooltip-aspect-ratio' />
            <Tooltip id='tooltip-bitrate' />
            <Tooltip id='tooltip-resolution' />
        </VideoDetailContainer>
    );
};

export default VideoDetail;
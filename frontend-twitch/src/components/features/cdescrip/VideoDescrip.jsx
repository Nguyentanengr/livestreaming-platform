import { VideoDescripContainer } from './VideoDescrip.styled';
import { useState, useEffect } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import { Theme } from '../../../assets/styles/Theme';
import EditTextArea from '../../commons/EditTextArea';
import EditSelect from '../../commons/EditSelect';
import Button from '../../commons/Button';
import CheckBox from '../../commons/CheckBox';
import EditLabel from '../../commons/EditLabel';
import EditInput from '../../commons/EditInput';
import { useDispatch, useSelector } from 'react-redux';
import { setThumbnailFile, resetCreateReelState } from '../../../stores/slices/createReelSlice';
import { createReel } from '../../../service/api/reelApi';
import CircleSpinner from '../../commons/CircleSpinner';
import ErrorAlert from '../../commons/ErrorAlert';

const VideoDescrip = () => {
    const [descripInput, setDescripInput] = useState('First-video');
    const [tagInput, setTagInput] = useState('');
    const [tagSelects, setTagSelects] = useState([]);
    const [options, setOptions] = useState(['All everyone', 'Who are following me', 'Only me']);
    const [thumbnail, setThumbnail] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState(options[0]);
    const [commentEnabled, setCommentEnabled] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const dispatch = useDispatch();
    const { videoFile, thumbnailFile, createReelLoading, createReelError } = useSelector((state) => state.createReel);

    const handleOnClickItem = (index) => {
        setSelected(options[index]);
    };

    const handleOnEnterTagInput = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value && !tagSelects.find((each) => each === e.target.value) && tagSelects.length < 3) {
                setTagSelects([...tagSelects, e.target.value]);
                setTagInput('');
            }
        }
    };

    const handleClickTagIcon = (index) => {
        if (tagSelects[index]) {
            setTagSelects(tagSelects.filter((tag, i) => i !== index));
        }
    };

    const handleFileChange = (file) => {
        if (file && file.type.startsWith('image/')) {
            setIsLoading(true);
            const reader = new FileReader();
            reader.onload = (e) => {
                setTimeout(() => {
                    setThumbnail(e.target.result);
                    dispatch(setThumbnailFile(file));
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

    const handleRemoveThumbnail = () => {
        setThumbnail(null);
        dispatch(setThumbnailFile(null));
    };

    const handlePost = () => {
        // Reset alert state at the start of a new post attempt
        setAlertMessage('');
        setAlertType('');

        setTimeout(() => {
            if (!videoFile || !thumbnailFile) {
                setAlertMessage('Please upload both a video and a thumbnail.');
                setAlertType('error');
                return;
            }

            const visibilityMap = {
                'All everyone': 'PUBLIC',
                'Who are following me': 'FOLLOWERS',
                'Only me': 'PRIVATE',
            };

            const reelData = {
                description: descripInput,
                tagNames: tagSelects,
                visibility: visibilityMap[selected],
                commentEnabled,
            };

            dispatch(createReel({ reelData, videoFile, thumbnailFile })).then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    setAlertMessage('Reel created successfully!');
                    setAlertType('success');
                    setDescripInput('');
                    setTagSelects([]);
                    setThumbnail(null);
                    setSelected(options[0]);
                    setCommentEnabled(false);
                    dispatch(resetCreateReelState());
                } else {
                    setAlertMessage(`Error: ${createReelError?.message || 'Failed to create reel'}`);
                    setAlertType('error');
                }
            });
        }, 100);
    };

    const handleAlertClose = () => {
        setAlertMessage('');
        setAlertType('');
    };

    useEffect(() => {
        console.log('Current Redux State:', { videoFile, thumbnailFile });
    }, [videoFile, thumbnailFile]);

    return (
        <VideoDescripContainer>
            <div className='title'>Video Description</div>
            <div className='box'>
                <div className='des-container'>
                    <div className='t-description'>Description</div>
                    <div className='description'>
                        <EditTextArea value={descripInput} onchange={(e) => setDescripInput(e.target.value)} />
                    </div>
                </div>
                <div className='tag-container'>
                    <div className='t-tag'>Tag</div>
                    <EditInput
                        className='tag-input'
                        ph='Use Enter after each tag'
                        value={tagInput}
                        onchange={(e) => setTagInput(e.target.value)}
                        onenter={(e) => handleOnEnterTagInput(e)}
                    />
                    <div className='select-container'>
                        {tagSelects.map((tag, index) => (
                            <div className='tag-select' key={index}>
                                <div className='text'>{tag}</div>
                                <Icons.Close className='tag-icon' onClick={() => handleClickTagIcon(index)} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='thumb-container'>
                    <div className='t-thumb'>Thumbnail</div>
                    <div
                        className={`thumb ${isDragging ? 'dragging' : ''}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => document.getElementById('thumbnailInput').click()}
                    >
                        {isLoading ? (
                            <div className='loading'>
                                <div className='spinner'></div>
                                <div className='text'>Uploading...</div>
                            </div>
                        ) : thumbnail ? (
                            <div className='thumbnail-preview'>
                                <img src={thumbnail} alt='Thumbnail' />
                                <div
                                    className='remove-icon'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveThumbnail();
                                    }}
                                >
                                    <Icons.Close />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className='icon'>
                                    <Icons.UploadImage />
                                </div>
                                <div className='text'>Upload thumbnail</div>
                            </>
                        )}
                        <input
                            type='file'
                            id='thumbnailInput'
                            accept='image/*'
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                    </div>
                </div>
                <div className='alow-container'>
                    <div className='t-alow'>Who can watch this video</div>
                    <div className='alow'>
                        <EditSelect options={options} selected={selected} onClickItem={handleOnClickItem} />
                    </div>
                </div>
                <div className='com-container'>
                    <CheckBox checked={commentEnabled} onChange={(e) => setCommentEnabled(e.target.checked)} />
                    <div className='t-com'>Allow users to comment</div>
                </div>
            </div>
            <div className='post-button'>
                <Button
                    color={Theme.highlight}
                    title={createReelLoading ? <CircleSpinner size={15} /> : 'Post'}
                    styles='medium'
                    onclick={handlePost}
                    disabled={createReelLoading}
                />
            </div>
            {alertMessage && <ErrorAlert message={alertMessage} type={alertType} onClose={handleAlertClose} />}
        </VideoDescripContainer>
    );
};

export default VideoDescrip;
import { useSelector, useDispatch } from 'react-redux';
import { ReelContainer } from './Reel.styled';
import { useEffect, useRef, useState } from 'react';
import ScrollReel from '../../features/rscroll/ScrollReel';
import ReelSlide from '../../features/rreel/ReelSlide';
import gsap from 'gsap';
import { resetActiveComment, resetReels } from '../../../stores/slices/recommendReelSlice';
import { getRcmReel } from '../../../service/api/reelApi';

const Reel = () => {
    const dispatch = useDispatch();
    const { reels, currentPage, hasMore, isLoading, error } = useSelector((state) => state.recommendReel);
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const [currentReelIndex, setCurrentReelIndex] = useState(0);

    const PAGE_SIZE = 5;

    // Map backend response to frontend reel format, keeping user object
    const normalizedReels = reels.map((reel) => ({
        id: reel.id,
        title: reel.description,
        videoUrl: reel.video,
        username: reel.user.username,
        tags: reel.tagNames.map((tagName) => ({ name: tagName })),
        thumbnail: reel.thumbnail,
        likesCount: reel.likesCount,
        commentsCount: reel.commentsCount,
        viewsCount: reel.viewsCount,
        createdAt: reel.createdAt,
        isLiked: reel.isLiked,
        user: {
            id: reel.user.id,
            username: reel.user.username,
            avatar: reel.user.avatar,
            isFollowing: reel.user.isFollowing,
        },
    }));

    useEffect(() => {
        dispatch(resetReels());
    }, [dispatch]);

    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, normalizedReels.length);
    }, [normalizedReels]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheelEvent = (e) => {
            const commentContainer = e.target.closest('.comment-list-container');
            if (commentContainer) {
                if (commentContainer.scrollHeight === commentContainer.clientHeight) {
                    e.preventDefault();
                }
                return;
            }

            e.preventDefault();
            if (e.deltaY > 0) {
                handleScrollDown(0);
            } else {
                handleScrollUp(0);
            }
        };

        container.addEventListener('wheel', handleWheelEvent, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheelEvent);
        };
    }, [normalizedReels]);

    useEffect(() => {
        if (currentReelIndex >= normalizedReels.length - 2 && hasMore && !isLoading) {
            dispatch(getRcmReel({ key: '', page: currentPage + 1, size: PAGE_SIZE }));
        }
    }, [currentReelIndex, normalizedReels.length, hasMore, isLoading, currentPage, dispatch]);

    const handleScrollDown = (offset = 0) => {
        setTimeout(() => {
            dispatch(resetActiveComment());
        }, 1000);
        const container = containerRef.current;
        const currentScroll = container.scrollTop + 1;

        for (let i = 0; i < itemRefs.current.length; i++) {
            
            const itemTop = itemRefs.current[i].offsetTop;
            if (itemTop > currentScroll) {
                const targetIndex = Math.min(i + offset, itemRefs.current.length - 1);
                gsap.to(container, {
                    scrollTop: itemRefs.current[targetIndex].offsetTop,
                    duration: 0.3,
                    ease: 'power1.inOut',
                    onComplete: () => {
                        setCurrentReelIndex(targetIndex);
                    },
                });
                break;
            }
        }
    };

    const handleScrollUp = (offset = 0) => {
        setTimeout(() => {
            dispatch(resetActiveComment());
        }, 1000);
        const container = containerRef.current;
        const currentScroll = container.scrollTop - 1;

        for (let i = itemRefs.current.length - 1; i >= 0; i--) {
            const itemTop = itemRefs.current[i].offsetTop;
            if (itemTop < currentScroll) {
                const targetIndex = Math.max(i - offset, 0);
                gsap.to(container, {
                    scrollTop: itemRefs.current[targetIndex].offsetTop,
                    duration: 0.3,
                    ease: 'power1.inOut',
                    onComplete: () => {
                        setCurrentReelIndex(targetIndex);
                    },
                });
                break;
            }
        }
    };

    return (
        <ReelContainer>
            {error && <div className="error-message">Error: {error.message}</div>}
            {isLoading && normalizedReels.length === 0 && <div>Loading...</div>}
            <ScrollReel scrollUp={handleScrollUp} scrollDown={handleScrollDown} />
            <ReelSlide reels={normalizedReels} itemRefs={itemRefs} containerRef={containerRef} />
            {isLoading && normalizedReels.length > 0 && <div>Loading more reels...</div>}
            {!hasMore && normalizedReels.length > 0 && <div>No more reels to load.</div>}
        </ReelContainer>
    );
};

export default Reel;
import { useSelector } from "react-redux";
import { ReelContainer } from "./Reel.styled";
import { useEffect, useRef } from "react";
import ScrollReel from "../../features/rscroll/ScrollReel";
import ReelSlide from "../../features/rreel/ReelSlide";

const Reel = () => {

    const reels = useSelector((state) => state.reel.reels);
    const containerRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => { // ensure itemRefs is the same length as reels
        itemRefs.current = itemRefs.current.slice(0, reels.length);
    }, [reels]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        container.addEventListener("wheel", handleWheel, { passive: false});

        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    }, []);

    const handleWheel = (e) => {

        const commentContainer = e.target.closest('.comment-list-container');

        if (commentContainer) { // the scroll event originated from the comments section
            if (commentContainer.scrollHeight == commentContainer.clientHeight) {
                e.preventDefault(); // disable scroll
            }
            return;
        } else {
            e.preventDefault();
            if (e.deltaY > 0) { // detect scroll down
                handleScrollDown(0);
            } else { // detect scroll up
                handleScrollUp(0);
            }
        }
    };

    const handleScrollDown = (offset = 0) => { // offset is the number (+1) of items to scroll down
        const container = containerRef.current;
        const currentScroll = container.scrollTop + 1;

        for (let i = 0; i < itemRefs.current.length; i++) {
            const itemTop = itemRefs.current[i].offsetTop;
            if (itemTop > currentScroll) {
                const targetIndex = Math.min(i + offset, itemRefs.current.length - 1);
                container.scrollTo({
                    top: itemRefs.current[targetIndex].offsetTop,
                    behavior: "smooth",
                });
                break;
            }
        }
    }

    const handleScrollUp = (offset = 0) => { // offset is the number (-1) of items to scroll up
        const container = containerRef.current;
        const currentScroll = container.scrollTop - 1;

        for (let i = itemRefs.current.length - 1; i >= 0; i--) {
            const itemTop = itemRefs.current[i].offsetTop;
            if (itemTop < currentScroll) {
                const targetIndex = Math.max(i - offset, 0);
                container.scrollTo({
                    top: itemRefs.current[targetIndex].offsetTop,
                    behavior: "smooth",
                });
                break;
            }
        }
    };

    return (
        <ReelContainer>
            <ScrollReel scrollUp={handleScrollUp} scrollDown={handleScrollDown} />
            <ReelSlide reels={reels} itemRefs={itemRefs} containerRef={containerRef}/>
        </ReelContainer>
    );
};

export default Reel;
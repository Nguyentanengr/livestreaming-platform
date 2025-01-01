import { useSelector } from "react-redux";
import { ReelContainer } from "./Reel.styled";
import { Icons } from "../../../assets/icons/Icon";
import { useEffect, useRef, useState } from "react";
import ReelItem from "./ReelItem";
import ScrollReel from "../../features/scroll/ScrollReel";

const Reel = () => {

    const reels = useSelector((state) => state.reel.reels);
    const containerRef = useRef(null);
    const itemRefs = useRef([]);



    useEffect(() => {
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
        e.preventDefault();
        if (e.deltaY > 0) {
            handleScrollDown(0);
        } else {
            handleScrollUp(0);
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
            <div className="control-container">
                <div className="control-up" onClick={() => handleScrollUp(0)}>
                    <Icons.ShowLess />
                </div>
                <div className="control-down" onClick={() => handleScrollDown(0)}>
                    <Icons.ShowMore />
                </div>
            </div>

            <div className="reel-container" ref={containerRef}>
                {reels.map((reel, index) => (
                    <div key={reel.id} ref={el => itemRefs.current[index] = el}>
                        <ReelItem reel={reel} />
                    </div>
                ))}
            </div>
        </ReelContainer>
    );
};

export default Reel;
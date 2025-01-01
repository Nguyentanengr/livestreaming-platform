
import ReelItem from "../../pages/reel/ReelItem";
import { ReelSlideContainer } from "./ReelSlide.styled";

const ReelSlide = ({ reels, itemRefs, containerRef}) => {
    return (
        <ReelSlideContainer>
            <div className="reel-container" ref={containerRef}>
                {reels.map((reel, index) => (
                    <div key={reel.id} ref={el => itemRefs.current[index] = el}>
                        <ReelItem reel={reel} />
                    </div>
                ))}
            </div>
        </ReelSlideContainer>
    )
}

export default ReelSlide;

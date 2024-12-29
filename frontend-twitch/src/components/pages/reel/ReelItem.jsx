import { ReelItemContainer } from "./ReelItem.styled";

const ReelItem = ( { reel } ) => {

    return (
        <ReelItemContainer>
            <div className="view-container">
                <video src={reel.videoUrl} loop muted />

            </div>
            <div className="interaction-container">
                <div className="tym">Tym</div>
                <div className="share">Share</div>
            </div>
        </ReelItemContainer>
    );
};

export default ReelItem;
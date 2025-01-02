import { ReelItemContainer } from "./ReelItem.styled";
import { useState } from "react";

import ReelComment from "./ReelComment";
import ReelBar from "./ReelBar";
import ReelView from "./ReelView";

const ReelItem = ({ reel }) => {

    const [expandState, setExpandState] = useState({
        isExComment: false,
        isExShare: false,
    });

    const toggleExState = (key) => {
        setExpandState((state) => ({
            ...state,
            [key]: !state[key],
        }));
    };

    return (
        <ReelItemContainer>
            <div className={`${expandState.isExComment ? "" : "gap"}`}></div>
            <ReelView reel={reel} />
            <ReelBar
                reel={reel}
                exComment={() => toggleExState('isExComment')}
                exShare={() => toggleExState('isExShare')}
            />
            {expandState.isExComment &&
                <ReelComment reel={reel} />}
        </ReelItemContainer>
    );
};

export default ReelItem;
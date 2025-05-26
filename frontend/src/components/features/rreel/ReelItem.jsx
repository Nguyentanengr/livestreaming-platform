import { ReelItemContainer } from "./ReelItem.styled";
import { useSelector, useDispatch } from "react-redux";
import ReelComment from "./ReelComment";
import ReelBar from "./ReelBar";
import ReelView from "./ReelView";
import { setActiveComment } from "../../../stores/slices/recommendReelSlice";
import { useState } from "react";

const ReelItem = ({ reel }) => {
    const dispatch = useDispatch();
    const activeCommentReelId = useSelector((state) => state.recommendReel.activeCommentReelId);
    const isExComment = activeCommentReelId === reel.id;
    const [expandState, setExpandState] = useState({
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
            <div className={`${isExComment ? "" : "gap"}`}></div>
            <ReelView reel={reel} />
            <ReelBar
                reel={reel}
                exComment={() => dispatch(setActiveComment(isExComment ? null : reel.id))}
                exShare={() => toggleExState('isExShare')}
            />
            {isExComment && <ReelComment reel={reel} />}
        </ReelItemContainer>
    );
};

export default ReelItem;
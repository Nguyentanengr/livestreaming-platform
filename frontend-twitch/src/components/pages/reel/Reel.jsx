
import { useSelector } from "react-redux";
import { ReelContainer } from "./Reel.styled";
import { Icons } from "../../../assets/icons/Icon";
import ReelItem from "./ReelItem";
import { useEffect } from "react";

const Reel = () => {

    const reels = useSelector((state) => state.reel.reels);

    useEffect(() => {
        
    }, [])
    
    return (
        <ReelContainer>
            <div className="control-container">
                <div className="control-up">
                    <Icons.ShowLess />
                </div>
                <div className="control-down">
                    <Icons.ShowMore />
                </div>

            </div>

            <div className="reel-container">
                {reels.map((reel) => {
                    return (<ReelItem key={reel.id} reel={reel} />);
                })}
            </div>
        </ReelContainer>
    );
};

export default Reel;

import { ScrollReelContainer } from "./ScrollReel.styled";
import { Icons } from "../../../assets/icons/Icon";

const ScrollReel = ({ scrollUp, scrollDown }) => {
    return (
        <ScrollReelContainer>
            <div className="control-container">
                <div className="control-up" onClick={() => scrollUp(0)}>
                    <Icons.ShowLess />
                </div>
                <div className="control-down" onClick={() => scrollDown(0)}>
                    <Icons.ShowMore />
                </div>
            </div>
        </ScrollReelContainer>
    )
}

export default ScrollReel;
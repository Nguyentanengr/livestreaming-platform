
import { ScreenContainer } from "./Screen.styled";
import { Icons } from "../../assets/icons/Icon";

const Screen = ({ videoRef, isPlay=true, size="medium" }) => {
    return (
        <ScreenContainer>
            <div className={`screen-container ${size}`}>
                <video ref={videoRef} className="video" autoPlay 
                loop/>
                {isPlay && <div className="play">
                    <Icons.Play />
                </div>}
                {isPlay && <div className="mute">
                    <Icons.Mute />
                </div>}
                <div className="expand">
                    <Icons.Expand />
                </div>
            </div>
        </ScreenContainer>
    );
};

export default Screen;
import { TitleBarContainer } from "./TitleBar.styled";
import { Icons } from "../../assets/icons/Icon";
import ActionButton from "./ActionButton";

const TitleBar = ({ title }) => {
    return (
        <TitleBarContainer>
            <div className="title">{title}</div>
            <div className="action">
                <ActionButton icon={<Icons.More />} onclick={() => {}} tooltip="More" />
            </div>
        </TitleBarContainer>
    );
};

export default TitleBar;
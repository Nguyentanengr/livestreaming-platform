import { TitleBarContainer } from "./TitleBar.styled";

import { FaEllipsisV } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";

const TitleBar = ({title}) => {
    return (
        <TitleBarContainer>
            <div className="label">{title}</div>
            <div className="collapse-icon"><BiChevronDown /></div>
            <div className="gap"></div>
            <div className="option-icon"><FaEllipsisV /></div>
        </TitleBarContainer>
    )
}

export default TitleBar;
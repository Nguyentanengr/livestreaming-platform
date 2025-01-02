

import { HeaderBoxContainer } from "./HeaderBox.styled";

const HeaderBox = ( {title} ) => {
    return (
        <HeaderBoxContainer>
            <div className="title">{title}</div>
        </HeaderBoxContainer>
    );
};

export default HeaderBox;

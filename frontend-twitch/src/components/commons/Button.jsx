import { Theme } from "../../assets/styles/Theme";
import { ButtonContainer } from "./Button.styled";
const Button = ({ color, styles, title, onclick, onMouseEnter, text}) => {
    return (
        <ButtonContainer color={color} text={text}>
            <div
                className={`btn ${styles}`}
                onClick={onclick}
                onMouseEnter={onMouseEnter}
            >
                {title}
            </div>
        </ButtonContainer>
    )
}

export default Button;

import { ButtonContainer } from "./Button.styled";
const Button = ({ color, styles, title, onclick, onMouseEnter }) => {
    return (
        <ButtonContainer color={color}>
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

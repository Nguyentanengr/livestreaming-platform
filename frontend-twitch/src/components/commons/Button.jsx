import { ButtonContainer } from "./Button.styled";
const Button = ({color, styles, title, onclick }) => {
    return (
        <ButtonContainer color={color}>
            <div className={`btn ${styles}`} onClick={onclick}>{title}</div>
        </ButtonContainer>
    )
}

export default Button;

import { CheckBoxContainer } from "./CheckBox.styled"


const CheckBox = () => {
    return (
        <CheckBoxContainer>
            <input type="checkbox" />
            <span class="checkmark"></span>
        </CheckBoxContainer>
    );
};

export default CheckBox;
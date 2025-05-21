import { CheckBoxContainer } from './CheckBox.styled';

const CheckBox = ({ checked, onChange }) => {
    return (
        <CheckBoxContainer>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className="checkmark"></span>
        </CheckBoxContainer>
    );
};

export default CheckBox;
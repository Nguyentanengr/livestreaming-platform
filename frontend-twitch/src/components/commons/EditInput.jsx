import { EditInputContainer } from "./EditInput.styled"

const EditInput = ({ name, ph, value, onchange, onenter, type="text", onBlur }) => {

    const handleOnKeyDown = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            onenter(e);
        }
    };

    return (
        <EditInputContainer>
            <input
                name={name}
                type={type}
                placeholder={ph}
                spellCheck={false}
                value={value}
                onChange={(e) => onchange(e)}
                onBlur={onBlur}
                onKeyDown={(e) => handleOnKeyDown(e)}
            />

        </EditInputContainer>
    );
};

export default EditInput;
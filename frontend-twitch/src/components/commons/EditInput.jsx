import { EditInputContainer } from "./EditInput.styled"

const EditInput = ({ ph, value, onchange, onenter }) => {

    const handleOnKeyDown = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            onenter(e);
        }
    };

    return (
        <EditInputContainer>
            <input
                type="text"
                placeholder={ph}
                spellCheck={false}
                value={value}
                onChange={onchange}
                onKeyDown={(e) => handleOnKeyDown(e)}
            />

        </EditInputContainer>
    );
};

export default EditInput;
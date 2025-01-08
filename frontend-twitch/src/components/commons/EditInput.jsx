import { EditInputContainer } from "./EditInput.styled"

const EditInput = ({ ph, onchange, onenter }) => {

    const handleOnKeyDown = (e) => {
        if (e.key == "Enter" && e.target.value !== "") {
            onenter(e);
        }
    };

    return (
        <EditInputContainer>
            <input
                type="text"
                placeholder={ph}
                spellCheck={false}
                onChange={e => {onchange(e)}}
                onKeyDown={e => { handleOnKeyDown(e) }}
            />

        </EditInputContainer>
    );
};

export default EditInput;
import { EditTextAreaContainer } from "./EditTextArea.styled"


const EditTextArea = ({ onchange }) => {
    return (
        <EditTextAreaContainer>
            <textarea
                aria-invalid="false"
                // value={"noti"}
                spellCheck={false}
                onChange={e => onchange(e)}>
            </textarea>

        </EditTextAreaContainer>
    );
};

export default EditTextArea;
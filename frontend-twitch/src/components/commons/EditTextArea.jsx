import { EditTextAreaContainer } from "./EditTextArea.styled"


const EditTextArea = ({ value, onchange=(e) => {} }) => {
    return (
        <EditTextAreaContainer>
            <textarea
                aria-invalid="false"
                value={value}
                spellCheck={false}
                onChange={e => onchange(e)}>
            </textarea>

        </EditTextAreaContainer>
    );
};

export default EditTextArea;
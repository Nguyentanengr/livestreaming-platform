import { EditLabelContainer } from "./EditLabel.styled"

const EditLabel = ({ title }) => {
    return (
        <EditLabelContainer>
            <div className="title">{title}</div>
        </EditLabelContainer>
    );
};

export default EditLabel;
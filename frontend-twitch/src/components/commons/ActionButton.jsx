import { ActionButtonContainer } from "./ActionButton.styled";
import Tooltip from "./Tooltip";

const ActionButton = ({ icon, onclick, tooltip }) => {
    return (
        <ActionButtonContainer>
            {tooltip && <Tooltip content={tooltip}>
                <div className="action-button" onClick={onclick}>{icon}</div>
            </Tooltip>}
            {!tooltip && <div className="action-button" onClick={onclick}>{icon}</div>}
        </ActionButtonContainer>
    )
}

export default ActionButton;

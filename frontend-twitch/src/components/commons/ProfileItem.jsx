
import { Link } from "react-router-dom";
import { ProfileItemContainer } from "./ProfileItem.styled";

const ProfileItem = ({ icon, title, onclick }) => {
    return (
        <ProfileItemContainer onClick={onclick}>
            <div className="icon">{icon}</div>
            <div className="title">{title}</div>
        </ProfileItemContainer>
    )
}

export default ProfileItem;

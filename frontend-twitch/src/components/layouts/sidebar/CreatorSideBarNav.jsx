import { CreatorSideBarNavContainer } from "./CreatorSideBarNav.styled";

const CreatorSideBarNav = ({ navigation, onclick, highlight=false }) => {

    return (
        <CreatorSideBarNavContainer className={`${highlight ? "hl" : ""}`} onClick={onclick}>
             <div className="nav-icon">{navigation.icon}</div>
             <div className="nav-title">{navigation.title}</div>
        </CreatorSideBarNavContainer>
    )
}

export default CreatorSideBarNav;
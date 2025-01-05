import { CreatorSideBarNavContainer } from "./CreatorSideBarNav.styled";

const CreatorSideBarNav = ({ navigation, onclick, highlight}) => {
    
    return (
        <CreatorSideBarNavContainer onClick={onclick}>
            <div>{navigation.nav}</div>
        </CreatorSideBarNavContainer>
    )
}

export default CreatorSideBarNav;
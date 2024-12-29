import { SideBarNavigationContainer } from "./SideBarNavigation.styled";

const SideBarNavigation = ({ title, icon, onclick, highlight}) => {
    
    return (
        <SideBarNavigationContainer onClick={onclick}>
            <div className={`icon ${highlight ? "highlight" : ""}`}>{icon}</div>
            <div className={`title ${highlight ? "highlight" : ""}`}>{title}</div>
        </SideBarNavigationContainer>
    )
}

export default SideBarNavigation;

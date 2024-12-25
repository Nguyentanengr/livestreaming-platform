import { SideBarNavigationContainer } from "./SideBarNavigation.styled";
import { useNavigate } from "react-router-dom";
const SideBarNavigation = ({ title, icon, nav}) => {
    const navigate = useNavigate();
    
    return (
        <SideBarNavigationContainer onClick={() => navigate(nav)}>
            <div className="icon">{icon}</div>
            <div className="title">{title}</div>
        </SideBarNavigationContainer>
    )
}

export default SideBarNavigation;

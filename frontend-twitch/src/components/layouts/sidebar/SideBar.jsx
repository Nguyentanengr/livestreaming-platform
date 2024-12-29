import { SideBarContainer } from "./SideBar.styled";
import { Icons } from "../../../assets/icons/Icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarNavigation from "./SideBarNavigation";

const SideBar = () => {
    
    const [option, setOption] = useState(1);
    const navigate = useNavigate();

    const navigations = [
        {
            id: 1,
            title: "Home",
            icon: <Icons.Home />,
            nav: "/"
        },
        {
            id: 2,
            title: "Reels",
            icon: <Icons.Reels />,
            nav: "/reels"
        },
        {
            id: 3,
            title: "Following",
            icon: <Icons.Following />,
            nav: "/following"
        },
        {
            id: 4,
            title: "You",
            icon: <Icons.You />,
            nav: "/you"
        },
        {
            id: 5,
            title: "Creator",
            icon: <Icons.Creator />,
            nav: "/creator"
        },
    ];


    const handleNavigationClick = (navigation) => {
        setOption(navigation.id);
        navigate(navigation.nav);    
    };

    return (
        <SideBarContainer>
            {navigations.map((navigation) => {
                return (<SideBarNavigation
                    key={navigation.id}
                    title={navigation.title}
                    icon={navigation.icon}
                    onclick={() => handleNavigationClick(navigation)}
                    highlight={option === navigation.id ? true : false}/>);
            })}
        </SideBarContainer>
    )
}

export default SideBar;

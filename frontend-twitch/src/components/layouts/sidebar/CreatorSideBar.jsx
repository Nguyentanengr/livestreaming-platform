import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Icons } from "../../../assets/icons/Icon";
import { CreatorSideBarContainer } from "./CreatorSideBar.styled";
import CreatorSideBarNav from "./CreatorSideBarNav";

const CreatorSideBar = () => {
    const [option, setOption] = useState(1);
    const navigate = useNavigate();

    const navigations = [
        {
            id: 1,
            title: "Streaming",
            icon: <Icons.Live />,
            nav: "/creator/stream"
        },
        {
            id: 2,
            title: "Content",
            icon: <Icons.Content />,
            nav: "/creator/content"
        },
        {
            id: 3,
            title: "Analytics",
            icon: <Icons.Analytics />,
            nav: "/creator/analytics"
        },
    ];


    const handleNavigationClick = (navigation) => {
        setOption(navigation.id);
        navigate(navigation.nav);
    };

    return (
        <CreatorSideBarContainer>
            <div className="title">
                Creator Dashboard
            </div>
            <div className="nav-container">
                {navigations.map((navigation) => {
                    return (<CreatorSideBarNav
                        className="nav-item"
                        key={navigation.id}
                        navigation={navigation}
                        onclick={() => handleNavigationClick(navigation)}
                        highlight={option === navigation.id ? true : false} />);
                })}
            </div>
        </CreatorSideBarContainer>
    )
}

export default CreatorSideBar;
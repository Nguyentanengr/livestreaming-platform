import { SideBarContainer } from "./SideBar.styled";
import { Icons } from "../../../assets/icons/Icon";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBarNavigation from "./SideBarNavigation";

const SideBar = ({ setModals }) => {
  const [option, setOption] = useState(1);
  const navigate = useNavigate();
  const url = useLocation().pathname;

  const navigations = [
    {
      id: 1,
      title: "Home",
      icon: <Icons.Home />,
      nav: "/",
      protected: false,
    },
    {
      id: 2,
      title: "Reels",
      icon: <Icons.Reels />,
      nav: "/reels",
      protected: false,
    },
    {
      id: 3,
      title: "Follow",
      icon: <Icons.Following />,
      nav: "/following",
      protected: true,
    },
    {
      id: 4,
      title: "You",
      icon: <Icons.You />,
      nav: "/you",
      protected: true,
    },
    {
      id: 5,
      title: "Creator",
      icon: <Icons.Creator />,
      nav: "/creator",
      protected: true,
    },
  ];

  const handleNavigationClick = (navigation) => {
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;

    if (navigation.protected && !user) {
      setModals((prev) => ({ ...prev, login: true }));
      localStorage.setItem('intendedRoute', navigation.nav); // Store intended route
      return; // Do not navigate, keep current URL
    }

    setOption(navigation.id);
    navigate(navigation.nav);
  };

  useEffect(() => {
    const currentNavigation = navigations.find((nav) => nav.nav === url);
    if (currentNavigation) {
      setOption(currentNavigation.id);
    }
  }, [url]);

  return (
    <SideBarContainer>
      {navigations.map((navigation) => (
        <SideBarNavigation
          key={navigation.id}
          title={navigation.title}
          icon={navigation.icon}
          onclick={() => handleNavigationClick(navigation)}
          highlight={option === navigation.id}
        />
      ))}
    </SideBarContainer>
  );
};

export default SideBar;
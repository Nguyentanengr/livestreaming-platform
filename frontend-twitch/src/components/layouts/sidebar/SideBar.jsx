import { SideBarContainer } from "./SideBar.styled";
import SideBarNavigation from "./SideBarNavigation";
import { Icons } from "../../../assets/icons/Icon";


const SideBar = () => {
    return (
        <SideBarContainer>
            <SideBarNavigation title="Home" icon={<Icons.Home />} nav="/home"/>
            <SideBarNavigation title="Reels" icon={<Icons.Reels/>} nav="/reels"/>
            <SideBarNavigation title="Following" icon={<Icons.Following />} nav="/following"/>
            <SideBarNavigation title="You" icon={<Icons.You />} nav="/you" />
            <SideBarNavigation title="Creator" icon={<Icons.Creator />} nav="/creator"/>
        </SideBarContainer>
    )
}

export default SideBar;

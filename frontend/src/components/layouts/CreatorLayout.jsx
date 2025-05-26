import { CreatorLayoutContainer } from "./CreatorLayout.styled";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import CreatorSideBar from "./sidebar/CreatorSideBar";
import CreatorContent from "./content/CreatorContent";

const CreatorLayout = () => {
    return (
        <CreatorLayoutContainer>
            <Header unvisibleSearch={true}/>
            <CreatorSideBar />
            <CreatorContent>
                <Outlet />
            </CreatorContent>
        </CreatorLayoutContainer>
    )
}

export default CreatorLayout;
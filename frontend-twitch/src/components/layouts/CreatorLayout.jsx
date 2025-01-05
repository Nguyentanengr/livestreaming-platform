import { CreatorLayoutContainer } from "./CreatorLayout.styled";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import CreatorSideBar from "./sidebar/CreatorSideBar";
import Content from "./content/Content";

const CreatorLayout = () => {
    return (
        <CreatorLayoutContainer>
            <Header unvisibleSearch={true}/>
            <CreatorSideBar />
            <Content>
                <Outlet />
            </Content>
        </CreatorLayoutContainer>
    )
}

export default CreatorLayout;

import { MainLayoutContainer } from "./MainLayout.styled";
import Header from "./header/Header";
import SideBar from "./sidebar/SideBar";
import Content from "./content/Content";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <MainLayoutContainer>
            <Header />
            <SideBar />
            <Content>
                <Outlet />
            </Content>
        </MainLayoutContainer>
    )
}

export default MainLayout;

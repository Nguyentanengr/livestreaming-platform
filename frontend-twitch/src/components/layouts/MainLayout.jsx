import { MainLayoutContainer } from "./MainLayout.styled";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import SideBar from "./sidebar/SideBar";
import Content from "./content/Content";

const MainLayout = ({ setModals }) => {
  return (
    <MainLayoutContainer>
      <Header />
      <SideBar setModals={setModals} />
      <Content>
        <Outlet />
      </Content>
    </MainLayoutContainer>
  );
};

export default MainLayout;
import GlobalStyles from "./assets/styles/Global";
import Header from "./components/layouts/header/Header"
import SideBar from "./components/layouts/sidebar/SideBar";
import Content from "./components/layouts/content/Content";
import { Routes, Route } from "react-router-dom";

const App = () => {

  return (
    <>
      <GlobalStyles />
      <div className="app">
        <Header />
        <SideBar />
        <Content>
          {/* <Routes> */}
            {/* <Route path="/" element={<Home />} />
            <Route path="/:id" element={<LiveRoom />} />
            <Route path="/:username/creator-dashboard" element={<PresentRoom />} /> */}
          {/* </Routes> */}
        </Content>
      </div>
    </>
  );
};

export default App;

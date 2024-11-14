import { ThemeProvider } from "styled-components";
import GlobalStyles from "./assets/styles/Global";
import Header from "./components/Header/Header"
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "./assets/styles/Theme";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import LiveStream from "./views/LiveStream/LiveStream";

const App = () => {
  const [mySize, setMySize] = useState(window.innerWidth);
  const { darkStatus, sideBarStatus } = useSelector((state) => state.site);

  useEffect(() => {
    const changeSize = () => {
      return setMySize(window.innerWidth);
    };
    window.addEventListener("resize", changeSize);
    return () => window.removeEventListener("resize", changeSize);
  }, [mySize]);

  return (
    <ThemeProvider theme={darkStatus ? darkTheme : lightTheme}>
      <GlobalStyles />
      <div className="app">
        <Header mySize={mySize} />
        <div className={`main ${sideBarStatus && mySize > 1199 ? "sidebar-open" : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:username" element={<LiveStream />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;

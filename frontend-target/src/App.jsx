// Styles
import GlobalStyles from "./assets/styles/Global";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./assets/styles/Theme";

// React
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Header from "./components/Header/Header";

// Views
import Home from "./views/Home";

const App = () => {
  const { darkStatus, sideBarStatus } = useSelector((state) => state.site);
  const [mySize, setMySize] = useState(window.innerWidth);
  let navigate = useNavigate();

  useEffect(() => {
    if (mySize < 768) {
      navigate("/");
    }
    const changeSideBar = () => {
      return setMySize(window.innerWidth);
    };
    window.addEventListener("resize", changeSideBar);
    return () => window.removeEventListener("resize", changeSideBar);
  }, [mySize]);

  return (
    
    <ThemeProvider theme={darkStatus ? darkTheme : lightTheme}>
      <GlobalStyles />
      <div className="app">
        <Header mySize={mySize} />
        <div
          className={`main ${
            sideBarStatus && mySize > 1199 ? "sidebar-open" : ""
          }`}
        >
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;

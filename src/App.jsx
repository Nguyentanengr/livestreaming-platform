import { ThemeProvider } from "styled-components";
import GlobalStyles from "./assets/styles/Global";
import Header from "./components/Header/Header"
import { connect, useSelector } from "react-redux";
import { lightTheme, darkTheme } from "./assets/styles/Theme";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import LiveRoom from "./views/LiveRoom/LiveRoom";
import PresentRoom from "./views/PresentRoom/PresentRoom";
import { connectSocket, disconnectSocket } from "./services/socketServices/socketService";

const App = () => {

  const [mySize, setMySize] = useState(window.innerWidth);
  const { darkStatus, sideBarStatus } = useSelector((state) => state.site);

  useEffect(() => {
    const socketUrl = "ws://localhost:8080/ws";
    connectSocket(socketUrl);
    return () => {
      disconnectSocket();
    }
  }, []);

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
            <Route path="/:username" element={<LiveRoom />} />
            <Route path="/:username/creator-dashboard" element={<PresentRoom />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;

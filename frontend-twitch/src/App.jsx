import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import GlobalStyles from "./assets/styles/Global";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./components/pages/home/Home";
import Reel from "./components/pages/reel/Reel";
import Profile from "./components/pages/profile/Profile";
import CreatorLayout from "./components/layouts/CreatorLayout";
import Stream from "./components/pages/stream/Stream";
import Creator from "./components/pages/creator/Creator";
import View from "./components/pages/view/View";
import Following from "./components/pages/following/Following";
import Categories from "./components/pages/categories/Categories";
import Category from "./components/pages/category/Category";
import LogIn from "./components/layouts/header/LogIn";
import SignUp from "./components/layouts/header/SignUp";
import ResetPassword from "./components/layouts/header/ResetPassword";

const WS_BASE_URL = (import.meta.env.VITE_WS_BASE_URL || 'wss://localhost:8080/ws');
console.log('WebSocket URL:', WS_BASE_URL);
const PrivateRoute = ({ children, setModals }) => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  if (!user) {
    setModals((prev) => ({ ...prev, login: true }));
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const [modals, setModals] = useState({
    login: false,
    signUp: false,
    resetPassword: false,
  });

  const toggleModal = (modalName) => {
    setModals((prev) => ({
      login: modalName === 'login' ? !prev.login : false,
      signUp: modalName === 'signUp' ? !prev.signUp : false,
      resetPassword: modalName === 'resetPassword' ? !prev.resetPassword : false,
    }));
  };

  return (
    <>
      <GlobalStyles />
      {modals.login && (
        <LogIn
          onclose={() => toggleModal('login')}
          onSignUp={() => toggleModal('signUp')}
          onResetPass={() => toggleModal('resetPassword')}
        />
      )}
      {modals.signUp && (
        <SignUp
          onclose={() => toggleModal('signUp')}
          onLogin={() => toggleModal('login')}
        />
      )}
      {modals.resetPassword && (
        <ResetPassword
          onclose={() => toggleModal('resetPassword')}
          onLogin={() => toggleModal('login')}
          onSignUp={() => toggleModal('signUp')}
        />
      )}
      <div className="app">
        <Routes>
          {/* Apply MainLayout */}
          <Route element={<MainLayout setModals={setModals} />}>
            <Route index element={<Home />} />
            <Route path="/reels" element={<Reel />} />
            <Route
              path="/you"
              element={
                <PrivateRoute setModals={setModals}>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:category" element={<Category />} />
            <Route
              path="/following"
              element={
                <PrivateRoute setModals={setModals}>
                  <Following />
                </PrivateRoute>
              }
            />
            <Route path="/live/:username" element={<View />} />
          </Route>
          <Route
            path="/creator"
            element={
              <PrivateRoute setModals={setModals}>
                <CreatorLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Stream />} />
            <Route path="stream" element={<Stream />} />
            <Route path="content" element={<Creator />} />
            <Route path="analytics" element={<Profile />} />
          </Route>
          {/* Not layout applied */}
          <Route path="*" element={<div>Page Error Not Found</div>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
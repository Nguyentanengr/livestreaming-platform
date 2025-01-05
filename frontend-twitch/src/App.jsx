import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./assets/styles/Global";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./components/pages/home/Home";
import Reel from "./components/pages/reel/Reel";
import Profile from "./components/pages/profile/Profile";
import CreatorLayout from "./components/layouts/CreatorLayout";

const App = () => {

  return (
    <>
      <GlobalStyles />
      <div className="app">
        <Routes>
          {/* Apply MainLayout */}
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/reels" element={<Reel />} />
            <Route path="/you" element={<Profile />} />
          </Route>
          <Route path="creator" element={<CreatorLayout />}>
            <Route index element={<Home />} />
            <Route path="content" element={<Reel />} />
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

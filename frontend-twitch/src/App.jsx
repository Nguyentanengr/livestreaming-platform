import { Routes, Route } from "react-router-dom";
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
            <Route path="following" element={<Following /> } />
            <Route path="/live/:username" element={<View />} />
          </Route>
          <Route path="creator" element={<CreatorLayout />}>
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

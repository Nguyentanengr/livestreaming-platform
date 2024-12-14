import { StyledHome } from "./Home.styled";

//React icons
import {
  IoGameControllerOutline,
  IoMusicalNotesOutline,
  IoTrophyOutline,
  IoMicOutline,
} from "react-icons/io5";

// Mobile Components
import BigChannels from "../components/Channels/ChannelsMobile/BigChannels";
import SmallCategories from "../components/Categories/CategoriesMobile/SmallCategories";

// Desktop Components
import Slide from "../components/Share/Slide";
import ChannelsDesktop from "../components/Channels/ChannelsDesktop/ChannelsDesktop";
import CategoriesDesktop from "../components/Categories/CategoriesDesktop/CategoriesDekstop";
import Tags from "../components/Share/Tags";
import ShowMore from "../components/Share/ShowMore";

const Home = () => {
  return (
    <>
      <StyledHome>
        
        <div className="home-desktop">
          <div className="home-box">
            <Slide />
            <ChannelsDesktop channelTitle="Live channels we think you’ll like" />
            <ShowMore title="Show more" />
            <CategoriesDesktop
              title="we think you’ll like"
              boldTitle="Categories"
            />
            <ShowMore />
            <Tags />
            <ChannelsDesktop channelTitle="Recommended smaller communities" />
            <ShowMore title="Show more" />
            <ChannelsDesktop channelTitle="All aboard the Hype Train!" />
            <ShowMore title="Show more" />
            <ChannelsDesktop channelTitle="Women's History Month" />
            <ShowMore title="Show more" />
            <ChannelsDesktop channelTitle="Recommended smaller communities" />
            <ShowMore title="Show more" />
            <ChannelsDesktop channelTitle="All aboard the Hype Train!" />
            <ShowMore title="Show more" />
            <ChannelsDesktop channelTitle="Women's History Month" />
          </div>
        </div>
      </StyledHome>
    </>
  );
};

export default Home;

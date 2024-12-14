import { StyledHome } from "./Home.styled";

// Desktop Components
import ChannelsDesktop from "../components/Channels/ChannelsDesktop/ChannelsDesktop";
import ShowMore from "../components/Share/ShowMore";

const Home = () => {
  return (
    <>
      <StyledHome>
        <div className="home-desktop">
          <div className="home-box">
            <ChannelsDesktop channelTitle="Live channels we think you’ll like" />
            <ShowMore title="Show more" />
          </div>
        </div>
      </StyledHome>
    </>
  );
};

export default Home;

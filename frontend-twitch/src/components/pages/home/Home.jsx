import { HomeContainer } from "./Home.styled";
import SlideScreen from "../../features/slide/SlideScreen";
import ChannelList from "../../features/channel/ChannelList";

const Home = () => {
    return (
        <HomeContainer>
            <SlideScreen />
            <ChannelList title="Recommended for you" type="recommended"/>
            <ChannelList title="Recent lives" type="recent"/>

            
            {/* <ChannelList title="Live channels we think you’ll like"/> */}
            {/* <Fields />
            <Categories /> */}
        </HomeContainer>
    );
};

export default Home;
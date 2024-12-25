import { HomeContainer } from "./Home.styled";
import SlideScreen from "../../features/slide/SlideScreen";

const Home = () => {
    return (
        <HomeContainer>
            <SlideScreen />
            {/* <ChannelList title="Live channels we think you’ll like"/> */}
            {/* <Fields />
            <Categories /> */}
        </HomeContainer>
    );
};

export default Home;
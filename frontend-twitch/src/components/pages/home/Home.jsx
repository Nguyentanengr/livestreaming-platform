import { HomeContainer } from "./Home.styled";
import SlideScreen from "../../features/hslide/SlideScreen";
import ChannelList from "../../features/hchannel/ChannelList";
import CategoryList from "../../features/hcategory/CategoryList";

const Home = () => {
    return (
        <HomeContainer>
            <SlideScreen />
            <ChannelList title="Recommended for you" type="recommended" itemToShow={8}/>
            <ChannelList title="Recent lives" type="recent" itemToShow={8}/>
            <CategoryList title="Favorite Categories" />

            
            {/* <ChannelList title="Live channels we think you’ll like"/> */}
            {/* <Fields />
            <Categories /> */}
        </HomeContainer>
    );
};

export default Home;
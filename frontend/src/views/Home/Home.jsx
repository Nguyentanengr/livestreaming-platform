import Chanels from "../../components/Chanel/ChanelList";
import { HomeContainer } from "./Home.styled";


const Home = () => {
    return (
        <HomeContainer>
            <div className="home-box">
                <Chanels title="Live chanels we think you'll like" />
            </div>
        </HomeContainer>
    );
}

export default Home;
import Chanels from "../../components/Chanel/Chanels";
import { StyledHome } from "./Home.styled";


const Home = () => {
    return (
        <StyledHome>
            <div className="home-box">
                <Chanels title="Live chanels we think you'll like" />
            </div>
        </StyledHome>
    );
}

export default Home;
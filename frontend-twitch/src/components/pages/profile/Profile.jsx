
import { ProfileContainer } from "./Profile.styled";
import { Theme } from "../../../assets/styles/Theme";
import StatusLive from "../../features/pstatus/StatusLive";
import AboutChannel from "../../features/pabout/AboutChannel";

const Profile = () => {

    const bgRandom = [Theme.blue, Theme.hotRed, Theme.highlight, Theme.pink, Theme.header, Theme.header, Theme.header, Theme.header, Theme.header, Theme.header, Theme.header];
    
    const r = Math.floor(Math.random() * bgRandom.length);

    return (
        <ProfileContainer bgColor={bgRandom[r]}>
            <StatusLive />
            <AboutChannel />
        </ProfileContainer>
    );
}

export default Profile;
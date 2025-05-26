
import { ProfileContainer } from "./Profile.styled";
import { Theme } from "../../../assets/styles/Theme";
import StatusLive from "../../features/pstatus/StatusLive";
import AboutChannel from "../../features/pabout/AboutChannel";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile, getMyReels, getMyStreams } from "../../../service/api/profileApi"

const Profile = () => {

    const bgRandom = [Theme.blue, Theme.hotRed, Theme.highlight, Theme.pink, Theme.header, Theme.header, Theme.header, Theme.header, Theme.header, Theme.header, Theme.header];
    
    const r = Math.floor(Math.random() * bgRandom.length);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyProfile());

        const streamRequest = {
            username: JSON.parse(localStorage.getItem("user"))?.username,
            page: 0,
            size: 20,
        }
        const reelRequest = {
            username: JSON.parse(localStorage.getItem("user"))?.username,
            page: 0,
            size: 18,
        }
        dispatch(getMyStreams(streamRequest));
        dispatch(getMyReels(reelRequest))
    });

    return (
        <ProfileContainer bgColor={bgRandom[r]}>
            <StatusLive />
            <AboutChannel />
        </ProfileContainer>
    );
}

export default Profile;
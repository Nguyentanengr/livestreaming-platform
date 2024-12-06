import { useDispatch, useSelector } from "react-redux";
import Chanel from "./Chanel";
import { ChanelListContainer } from "./ChanelList.styled";
import { useEffect } from "react";
import { setLiveSessions } from "../../store/liveSession";


const ChanelList = ({ title }) => {

    const dispatch = useDispatch();
    const { liveSessions } = useSelector((state) => state.liveSession)

    useEffect(() => {
        const fetchLiveSessions = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/liveSessions/recommended");
                const data = await response.json();
                console.log(data);
                dispatch(setLiveSessions(data));
            } catch (error) {
                console.error("Failed to fetch live sessions: ", error);
            }
        };

        fetchLiveSessions();
    }, [dispatch]);

    return (
        <ChanelListContainer>
            <div className="chanels-box">
                {title && <h1>{title}</h1>}
                <div className="list">
                    {liveSessions.map((liveSession, index) => {
                        if (index < 6)
                            return (
                                <Chanel liveSession={liveSession} key={index} />
                            );
                    })}
                </div>
            </div>
        </ChanelListContainer>
    )
}

export default ChanelList;
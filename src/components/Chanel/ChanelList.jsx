import { useSelector } from "react-redux";
import Chanel from "./Chanel";
import { ChanelListContainer } from "./ChanelList.styled";


const ChanelList = ({ title }) => {

    const { users } = useSelector((state) => state.user)

    return (
        <ChanelListContainer>
            <div className="chanels-box">
                {title && <h1>{title}</h1>}
                <div className="list">
                    {users.map((user, index) => {
                        if (index < 6)
                            return (
                                <Chanel user={user} key={index} />
                            );
                    })}
                </div>
            </div>
        </ChanelListContainer>
    )
}

export default ChanelList;
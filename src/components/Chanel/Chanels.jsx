import { useSelector } from "react-redux";
import Chanel from "./Chanel";
import { StyledChanels } from "./StyledChanels.styled";


const Chanels = ({ title }) => {

    const { users } = useSelector((state) => state.user)

    return (
        <StyledChanels>
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
        </StyledChanels>
    )
}

export default Chanels;
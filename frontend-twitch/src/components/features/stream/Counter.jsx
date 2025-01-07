

import { CounterContainer } from "./Counter.styled";

const Counter = ({ title, counts }) => {
    return (
        <CounterContainer>
            <div className="count">{counts != 0 ? counts : "_"}</div>
            <div className="title">{title ? title : "_"}</div>
        </CounterContainer>
    );
};

export default Counter;
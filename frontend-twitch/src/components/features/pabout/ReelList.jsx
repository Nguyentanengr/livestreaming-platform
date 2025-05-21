import { useSelector } from "react-redux";
import { useState } from "react";
import StreamItem from "./StreamItem";
import { ReelListContainer } from "./ReelList.styled";
import ReelItem from "./ReelItem";

const ReelList = ({ itemsToShow }) => {
    
    return (
        <ReelListContainer>
            <div className="recommend-live-container">
                {itemsToShow.map((item) => {
                    return (
                        <ReelItem key={item.id} item={item}/>
                    );
                })}
            </div>
        </ReelListContainer>
    );
};

export default ReelList;
import { useSelector } from "react-redux";
import { useState } from "react";
import StreamItem from "./StreamItem";
import { StreamListContainer } from "./StreamList.styled";

const StreamList = ({ itemsToShow }) => {

    
    return (
        <StreamListContainer>
            <div className="recommend-live-container">
                {itemsToShow?.map((item) => {
                    return (
                        <StreamItem key={item.id} item={item}/>
                    );
                })}
            </div>
        </StreamListContainer>
    );
};

export default StreamList;
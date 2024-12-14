import React from 'react'
import { LiveInfoContainer } from './LiveInfo.styled'

import { BiHeart } from "react-icons/bi";
import { FaEllipsisV } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BiUser } from "react-icons/bi";

const LiveInfo = () => {

    const tags = ["leansixsigma", "2024", "simplilearn"];
    
    return (
        <LiveInfoContainer>
            <div className='streamer'>
                <img src="https://i.pravatar.cc/" alt="" />
                <div className="name">frenzy_riz <BsFillCheckCircleFill className="check" /></div>
            </div>
            <div className="about-video">
                <div className="title">
                    Mark Selby vs Shaun Murphy Champion of Champions 2024 Round 1 Live Match HD 60 FPS
                </div>
                <div className="tags">
                    {tags.map((tag, index) => {
                        return <div className="tag" key={index}>{tag}</div>
                    })}
                </div>
                <div className="viewers"><BiUser className="user" />4,771</div>
            </div>
            <div className="about-chanel">
                <div className="follow">
                    <button><BiHeart className="icon-follow" />Follow</button>
                </div>
                <div className="report">
                    <FaEllipsisV className="icon-report" />
                </div>
            </div>
        </LiveInfoContainer>
    )
}

export default LiveInfo
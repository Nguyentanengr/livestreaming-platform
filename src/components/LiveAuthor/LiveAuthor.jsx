
import React from 'react'
import { LiveAuthorContainer } from './LiveAuthor.styled'

import { BsDiscord } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";

const LiveAuthor = () => {
    return (
        <LiveAuthorContainer>
            <h1>About frenzy_riz</h1>
            <div className="author-info">
                <div className="followers">
                    7.2M Followers
                </div>
                <p>
                    Hello Snooker Fans! Welcome to our community dedicated to live snooker matches. Whether you're a seasoned player or just love watching the game, you've found your new home.
                    Hello Snooker Fans! Welcome to our community dedicated to live snooker matches. Whether you're a seasoned player or just love watching the game, you've found your new home.
                </p>
                <hr />
                <div className="social-platform">
                    <div className="label">
                        <a href="https://discord.com/"><BsDiscord className="icon" />Discord Group</a>
                    </div>
                    <div className="label">
                        <a href="https://www.youtube.com/"><BsYoutube className="icon" />Youtube Channel</a>
                    </div>
                </div>
            </div>
        </LiveAuthorContainer>
    )
}

export default LiveAuthor;

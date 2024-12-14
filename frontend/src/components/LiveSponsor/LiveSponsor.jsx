
import React from 'react'
import { LiveSponsorContainer } from './LiveSponsor.styled'

const LiveSponsor = () => {

    const sponsors = [
        "https://cdn.mos.cms.futurecdn.net/3xshZ9ZSF7vvXKk6TQtJvd.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA4tdsIfUp6JK3VxhikF40-Y4_DWpaymVNZg&s",
        "https://res.cloudinary.com/sponsor-circle/image/upload/v1549901858/wfkuiof97qjwoagateam.png"
    ];

    return (
        <LiveSponsorContainer>
            {/* <h1>Sponsored by</h1> */}
            <div className="sponsor-box">
                {sponsors.map((sponsor, index) => (
                    <div className="sponsor" key={index}>
                        <img src={sponsor} alt="" />
                    </div>
                ))}
            </div>
        </LiveSponsorContainer>
    )
}

export default LiveSponsor
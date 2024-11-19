import LiveScreen from "../LiveScreen/LiveScreen";
import { PresentPreviewContainer } from "./PresentPreview.styled"
import TitleBar from "./TitleBar"

import { BiVideo } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import { useState } from "react";

import { BiPencil } from "react-icons/bi";
import { BiStar } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";

const PresentPreview = () => {

    const [liveStatus, setLiveStatus] = useState(false);
    const [session, setSession] = useState(0);
    const [viewers, setViewers] = useState(0);
    const [follows, setFollowers] = useState(0);

    const counterList = [
        {"name" : "Session", "value" : session},
        {"name" : "Viewers", "value" : viewers},
        {"name" : "Follows", "value" : follows},
    ]

    const handleGoLiveClick = () => {
        setLiveStatus(!liveStatus);
    };

    return (
        <PresentPreviewContainer>
            <TitleBar title={"Stream Preview"} />
            <div className="present-screen">
                <LiveScreen />
            </div>

            <div className="go-stream" >
                <div className="counters">
                    {counterList.map((counter, index) => {
                        return (
                            <div className="counter" key={index}>
                                <div className="value">{counter.value == 0 ? "_" : counter.value}</div>
                                <div className="name">{counter.name}</div>
                            </div>
                        )
                    })}
                </div>
                <div className={`go-live ${liveStatus ? "on" : ""}`} onClick={() => handleGoLiveClick()}>

                    <BsCircleFill className="live-icon" />
                    <div className={`live-text ${liveStatus ? "on" : ""}`}>{liveStatus ? "Stop" : "Go live"}</div>
                </div>
            </div>

            <div className="quick-actions">
                <TitleBar title={"Quick Actions"} />

                <div className="action-list">
                    <ul>
                        <li className="item">
                            <BiPencil className="icon" />
                            <div className="action-name">Edit Stream Info</div>
                        </li>
                        <li className="item">
                            <BiStar className="icon" />
                            <div className="action-name">Manage Goals</div>
                        </li>
                        <li className="item-blank">
                            <BiPlus className="icon" />
                        </li>
                    </ul>
                </div>


                {/* icons */}
            </div>
        </PresentPreviewContainer>
    )

}

export default PresentPreview;
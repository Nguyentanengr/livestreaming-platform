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

    const handleGoLiveClick = () => {
        setLiveStatus(!liveStatus);
    };

    return (
        <PresentPreviewContainer>
            <TitleBar title={"Stream Preview"} />
            <div className="present-screen">
                <LiveScreen />
            </div>

            <div className="go-stream" onClick={() => handleGoLiveClick()}>
                <div className="timer">
                    <BiVideo />
                    <div className="time">00:00:00</div>
                </div>
                <div className={`go-live ${liveStatus ? "on" : ""}`}>
                    <BsCircleFill className="live-icon" />
                    <div className={`live-text ${liveStatus ? "on" : ""}`}>{liveStatus ? "Stop" : "Go live"}</div>
                </div>
            </div>

            <div className="quick-actions">
                <TitleBar title={"Quick Actions"} />

                <div className="action-list">
                    <ul>
                        <li className="item">
                            <BiPencil className="icon"/>
                            <div className="action-name">Edit Stream Info</div>
                        </li>
                        <li className="item">
                            <BiStar className="icon" />
                            <div className="action-name">Manage Goals</div>
                        </li>
                        <li className="item-blank">
                            <BiPlus className="icon"/>
                        </li>
                    </ul>
                </div>


                {/* icons */}
            </div>
        </PresentPreviewContainer>
    )

}

export default PresentPreview;
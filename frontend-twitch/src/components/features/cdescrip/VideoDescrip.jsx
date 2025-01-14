import { VideoDescripContainer } from "./VideoDescrip.styled"
import { useState } from "react";
import { Icons } from "../../../assets/icons/Icon";
import { Theme } from "../../../assets/styles/Theme";
import EditTextArea from "../../commons/EditTextArea";
import EditSelect from "../../commons/EditSelect";
import Button from "../../commons/Button";
import CheckBox from "../../commons/CheckBox";

const VideoDescrip = () => {

    const [descripInput, setDescripInput] = useState("First-video");
    const [options, setOptions] = useState([
        "All everyone",
        "Who are following me",
        "Friendly (Follow along with)",
    ]);

    const [selected, setSelected] = useState(options[0]);

    const handleOnClickItem = (index) => {
        setSelected(options[index]);
    };

    return (
        <VideoDescripContainer>
            <div className="title">
                Video Description
            </div>
            <div className="box">
                <div className="des-container">
                    <div className="t-description">
                        Description
                    </div>
                    <div className="description">
                        <EditTextArea
                            value={descripInput}
                            onchange={(e) => { setDescripInput(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="thumb-container">
                    <div className="t-thumb">
                        Thumbnail
                    </div>
                    <div className="thumb">
                        <div className="icon">
                            <Icons.UploadImage />
                        </div>
                        <div className="text">
                            Upload thumbnail
                        </div>
                    </div>
                </div>
                <div className="alow-container">
                    <div className="t-alow">
                        Who can watch this video
                    </div>
                    <div className="alow">
                        <EditSelect options={options} selected={selected} onClickItem={handleOnClickItem} />
                    </div>
                </div>
                <div className="com-container">
                    <CheckBox />
                    <div className="t-com">
                        Allow users to comment
                    </div>
                </div>
            </div>
            <div className="post-button">
                <Button
                    color={Theme.highlight}
                    title="Post"
                    styles="large" o
                    nclick={() => { }}
                />
            </div>
        </VideoDescripContainer>
    );
};

export default VideoDescrip;
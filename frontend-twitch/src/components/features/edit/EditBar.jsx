import { EditBarContainer } from "./EditBar.styled";
import TitleBar from "../../commons/TitleBar";
import EditLabel from "../../commons/EditLabel";
import EditInput from "../../commons/EditInput";
import { useState } from "react";
import EditTextArea from "../../commons/EditTextArea";
import Button from "../../commons/Button";
import { Theme } from "../../../assets/styles/Theme";
import { Icons } from "../../../assets/icons/Icon";


const EditBar = () => {

    const [input, setInput] = useState("");

    const handleOnChange = (e) => {
        setInput(e.target.value);
    };

    return (
        <EditBarContainer>
            <TitleBar title="Edit" />
            <div className="edit-container">
                <div className="title-container">
                    <EditLabel title="Title" />
                    <EditInput
                        ph="Enter a title"
                        onchange={handleOnChange}
                    />
                </div>
                <div className="noti-container">
                    <EditLabel title="Live notifications" />
                    <EditTextArea onchange={handleOnChange} />
                </div>
                <div className="category-container">
                    <EditLabel title="Category" />
                    <EditInput
                        ph="Search for a category"
                        onchange={handleOnChange}
                    />
                </div>
                <div className="tag-container">
                    <EditLabel title="Tag" />
                    <EditInput
                        ph="Use Enter after each tag"
                        onchange={handleOnChange}
                    />
                    <Button color={Theme.highlight} title="Add Tag" />
                </div>
                <div className="thumbnail-container">
                    <EditLabel title="Thumbnail" />
                    <div className="add-area">
                        <div className="icon">
                            <Icons.UploadImage />
                        </div>
                        <div className="text">
                            Upload thumbnail
                        </div>
                    </div>
                </div>
                <div className="comment-container">
                    <EditLabel title="Comment Setting" />
                    <select id="on">
                        <option value="on">ON</option>
                        <option value="off">OFF</option>
                    </select>
                </div>
                <div className="visibility-container">
                    <EditLabel title="Visibility" />
                    <input type="checkbox" />
                    
                </div>


            </div>
        </EditBarContainer>
    );
};

export default EditBar;
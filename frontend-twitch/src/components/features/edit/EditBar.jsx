import { EditBarContainer } from "./EditBar.styled";
import TitleBar from "../../commons/TitleBar";
import EditLabel from "../../commons/EditLabel";
import EditInput from "../../commons/EditInput";
import { useState } from "react";
import EditTextArea from "../../commons/EditTextArea";
import Button from "../../commons/Button";
import { Theme } from "../../../assets/styles/Theme";
import { Icons } from "../../../assets/icons/Icon";
import EditSelect from "../../commons/EditSelect";
import CategoryScroll from "./CategoryScroll";


const EditBar = () => {

    const [input, setInput] = useState("");
    const commentOptions = ["ON", "OFF"];
    const visibilityOptions = [
        "All everyone",
        "Who are following me",
        "Friendly (Follow along with)"
    ];
    const [tags, setTags] = useState(
        ["highlight", "fighting", "funny"]
    );

    const handleOnChange = (e) => {
        setInput(e.target.value);
    };

    const handleClickTagIcon = (e) => {
        setTags(tags.filter((each, index) => index != e));
    };

    const handleEnterTagInput = (e) => {
        setTags([...tags, input]);
        setInput("");
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
                    {input && <div className="scroll-container">
                        <CategoryScroll />
                    </div>}
                </div>
                <div className="tag-container">
                    <EditLabel title="Tag" />
                    <EditInput
                        className="tag-input"
                        ph="Use Enter after each tag"
                        value={input}
                        onchange={handleOnChange}
                        onenter={handleEnterTagInput}
                    />
                    <div className="select-container">
                        {tags.map((tag, index) => {
                            return <div className="tag-select" key={index}>
                                <div className="text">{tag}</div>
                                <Icons.Close
                                    className="tag-icon"
                                    onClick={() => { handleClickTagIcon(index) }}
                                />
                            </div>
                        })}
                    </div>
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
                    <EditSelect options={commentOptions} />
                </div>
                <div className="visibility-container">
                    <EditLabel title="Visibility" />
                    <EditSelect options={visibilityOptions} />
                </div>
                <div className="save-button">
                    <Button color={Theme.highlight} title="Save" />
                </div>


            </div>
        </EditBarContainer>
    );
};

export default EditBar;
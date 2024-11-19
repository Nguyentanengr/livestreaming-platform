import { ActionPreviewContainer } from "./ActionPreview.styled"

import TitleBar from "../PresentPreview/TitleBar"
import { useState } from "react";

import { BiX } from "react-icons/bi";


const ActionPreview = () => {

    const category = "Talk show";
    const [tags, setTags] = useState(["attractive", "horrified"]);

    const [tagInput, setTagInput] = useState([]);
    const [title, setTitle] = useState("Enter a title");
    const [noti, setNoti] = useState("Welcoming!")

    const removeTag = (indexTag) => {
        setTags(tags.filter((_, index) => index !== indexTag));
    };

    const addTag = () => {
        if (tagInput.trim() !== "") {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    }

    return (
        <ActionPreviewContainer>
            <TitleBar title={"Action"} />
            <div className="actions">
                <div className="title">
                    <div className="text">Title</div>
                    <textarea aria-invalid="false" value={title} onChange={(e) => setTitle(e.target.value)}>
                    </textarea>
                </div>
                <div className="notification">
                    <div className="text">Go Live Notification</div>
                    <textarea aria-invalid="false" value={noti} onChange={(e) => setNoti(e.target.value)}>
                    </textarea>
                </div>
                <div className="category">
                    <div className="text">Category</div>
                    <div className="category-box">
                        <input type="text" placeholder="Search for a category" />
                        <div className="selected">
                            <img src="https://static.vecteezy.com/system/resources/previews/007/017/706/non_2x/talk-show-neon-signs-style-text-free-vector.jpg" alt="" />
                            <div className="name">{category}</div>
                            <div className="gap"></div>
                            <BiX className="icon" />
                        </div>
                    </div>
                </div>
                <div className="tags">
                    <div className="text">Tags</div>
                    <div className="tag-box">
                        <input
                            type="text"
                            placeholder="Use Enter after each tag"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    addTag();
                                }
                            }}
                        />
                        <div className="tag-list">
                            {tags.map((tag, index) => {
                                return (
                                    <div className="tag" key={index} onClick={() => removeTag(index)}>{tag} <BiX /></div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="add-button" onClick={() => addTag()}>Add tag</div>
                </div>
                <div className="branded-content">
                    <div className="text">Branded Content</div>
                    <div className="checkbox">
                        <input type="checkbox" />
                        Let viewers know if your stream features branded content. This includes paid product placement, endorsement, or other commercial relationships. To learn more, view our Help Center Article and our Terms of Service.
                    </div>
                </div>
                <div className="private">
                    <div className="text">Private Setting</div>
                    <div className="options">
                        <div className="checkbox">
                            <input type="checkbox" />
                            All everyone
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" />
                            Who was following me
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" />
                            Friendly (Follow along with)
                        </div>
                    </div>
                </div>

                <div className="save">
                    <div className="button-save">
                        Done
                    </div>
                </div>
            </div>
        </ActionPreviewContainer>
    )
}

export default ActionPreview;
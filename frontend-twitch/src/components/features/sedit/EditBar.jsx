import { EditBarContainer } from "./EditBar.styled";
import { useState } from "react";
import { Theme } from "../../../assets/styles/Theme";
import { Icons } from "../../../assets/icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import { addTag, removeTag, setInput } from "../../../stores/slices/editStreamSlice";
import { useEffect } from "react";
import { convertView } from "../../../utils/convert";
import EditLabel from "../../commons/EditLabel";
import EditInput from "../../commons/EditInput";
import TitleBar from "../../commons/TitleBar";
import EditSelect from "../../commons/EditSelect";
import CategoryScroll from "./CategoryScroll";
import Button from "../../commons/Button";
import EditTextArea from "../../commons/EditTextArea";


const EditBar = () => {

    const dispatch = useDispatch();
    const [cateSearchList, setCateSearchList] = useState([]);

    const {
        titleInput,
        notificationInput,
        categoryInput,
        tagInput,
        commentInput,
        visibilityInput,
        tagSelects,
        categorySelect,
        commentSelect,
        visibilitySelect,
        categories,
    } = useSelector((state) => state.editStream);

    const handleOnChangeInput = (key, value) => {
        dispatch(setInput({ key, value }));

        if (key === "categorySelect") {
            setCateSearchList([]);
            handleOnChangeInput("categoryInput", "");
        };
    };

    const handleOnEnterTagInput = (e) => {
        if (!tagSelects.find(each => each === e.target.value)
            && tagSelects.length < 3) {
            dispatch(addTag(e.target.value));
            handleOnChangeInput("tagInput", "");
        } else {
        }
    };

    const handleOnClickCateClose = () => {
        handleOnChangeInput("categorySelect", undefined);
    };

    const handleClickTagIcon = (index) => {
        dispatch(removeTag(index));
    };

    useEffect(() => {
        setCateSearchList(categories.filter(
            each => each.name.toLowerCase().includes(categoryInput.trim().toLowerCase())
        ));
    }, [categoryInput])

    return (
        <EditBarContainer>
            <TitleBar title="Edit" />
            <div className="edit-container">
                <div className="title-container">
                    <EditLabel title="Title" />
                    <EditInput
                        ph="Enter a title"
                        value={titleInput}
                        onchange={(e) => handleOnChangeInput("titleInput", e.target.value)}

                    />
                </div>
                <div className="noti-container">
                    <EditLabel title="Live notifications" />
                    <EditTextArea
                        value={notificationInput}
                        onchange={(e) => handleOnChangeInput("notificationInput", e.target.value)}
                    />
                </div>
                <div className="category-container">
                    <EditLabel title="Category" />
                    <EditInput
                        ph="Search for a category"
                        value={categoryInput}
                        onchange={(e) => handleOnChangeInput("categoryInput", e.target.value)}
                    />
                    {categoryInput && cateSearchList.length != 0
                        && <div className="scroll-container">
                            <CategoryScroll
                                searchList={cateSearchList}
                                selected={categorySelect}
                                onClickItem={(index) => handleOnChangeInput("categorySelect", cateSearchList[index])}
                            />
                        </div>}

                    {categorySelect && <div className="cate-select-container">
                        <div className="thumbnail">
                            <img src={categorySelect.thumbnail} alt={categorySelect.name} />
                        </div>
                        <div className="description">
                            <div className="name">
                                {categorySelect.name}
                            </div>
                            <div className="interested">
                                {convertView(categorySelect.interested)}
                                <div className="text">
                                    Interested
                                </div>
                            </div>
                        </div>
                        <Icons.Close className="close-icon" onClick={handleOnClickCateClose} />
                    </div>}

                </div>
                <div className="tag-container">
                    <EditLabel title="Tag" />
                    <EditInput
                        className="tag-input"
                        ph="Use Enter after each tag"
                        value={tagInput}
                        onchange={(e) => handleOnChangeInput("tagInput", e.target.value)}
                        onenter={(e) => handleOnEnterTagInput(e)}
                    />
                    <div className="select-container">
                        {tagSelects.map((tag, index) => {
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
                    <EditSelect
                        options={commentInput}
                        selected={commentSelect}
                        onClickItem={(index) => { handleOnChangeInput("commentSelect", commentInput[index]) }}
                    />
                </div>
                <div className="visibility-container">
                    <EditLabel title="Visibility" />
                    <EditSelect
                        options={visibilityInput}
                        selected={visibilitySelect}
                        onClickItem={(index) => { handleOnChangeInput("visibilitySelect", visibilityInput[index]) }}
                    />
                </div>
            </div>
            <div className="save-button">
                <Button color={Theme.highlight} title="Save" />
            </div>
        </EditBarContainer>
    );
};

export default EditBar;
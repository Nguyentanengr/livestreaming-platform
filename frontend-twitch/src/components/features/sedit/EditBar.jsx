import { EditBarContainer } from "./EditBar.styled";
import { useState, useRef, useEffect } from "react";
import { Theme } from "../../../assets/styles/Theme";
import { Icons } from "../../../assets/icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import { addTag, removeTag, setInput, setThumbnail, setThumbnailFile, resetThumbnail } from "../../../stores/slices/editStreamSlice";
import { getAllCategoryByKey } from "../../../service/api/categoryApi";
import { convertView } from "../../../utils/convert";
import EditLabel from "../../commons/EditLabel";
import EditInput from "../../commons/EditInput";
import TitleBar from "../../commons/TitleBar";
import EditSelect from "../../commons/EditSelect";
import CategoryScroll from "./CategoryScroll";
import Button from "../../commons/Button";
import EditTextArea from "../../commons/EditTextArea";
import ErrorAlert from "../../commons/ErrorAlert";

const EditBar = () => {
  const dispatch = useDispatch();
  const [cateSearchList, setCateSearchList] = useState([]);
  const [onSave, setOnSave] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [thumbnailVisible, setThumbnailVisible] = useState(false);
  const fileInputRef = useRef(null);

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
    thumbnail,
    loading,
    error,
  } = useSelector((state) => state.editStream);

  useEffect(() => {
    dispatch(getAllCategoryByKey({ key: "", page: 0, size: 100 }));
  }, [dispatch]);

  const handleOnChangeInput = (key, value) => {
    dispatch(setInput({ key, value }));
    if (key === "categorySelect") {
      setCateSearchList([]);
      handleOnChangeInput("categoryInput", "");
    }
  };

  const handleOnEnterTagInput = (e) => {
    if (!tagSelects.find(each => each === e.target.value) && tagSelects.length < 3) {
      dispatch(addTag(e.target.value));
      handleOnChangeInput("tagInput", "");
    }
  };

  const handleOnClickCateClose = () => {
    handleOnChangeInput("categorySelect", undefined);
  };

  const handleClickTagIcon = (index) => {
    dispatch(removeTag(index));
  };

  const handleClickSave = () => {
    setOnSave(true);
    setTimeout(() => {
      setOnSave(false);
    }, 3300);
  };

  const handleFileChange = (files) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        dispatch(setThumbnailFile(file)); // Lưu file gốc
        const reader = new FileReader();
        reader.onload = (e) => {
          dispatch(setThumbnail(e.target.result)); // Lưu base64 để hiển thị
          setThumbnailVisible(true);
        };
        reader.readAsDataURL(file);
      } else {
        console.log("Please upload an image file");
      }
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const handleRemoveThumbnail = (e) => {
    e.stopPropagation();
    setThumbnailVisible(false);
    setTimeout(() => {
      dispatch(resetThumbnail()); // Xóa cả base64 và file gốc
    }, 300);
  };

  useEffect(() => {
    setCateSearchList(
      categories.filter(each =>
        each.name.toLowerCase().includes(categoryInput.trim().toLowerCase())
      )
    );
  }, [categoryInput, categories]);

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
          {loading && (
            <div className="loading">Loading categories...</div>
          )}
          {error && (
            <div className="error">Error: {error}</div>
          )}
          {!loading && !error && categoryInput && cateSearchList.length !== 0 && (
            <div className="scroll-container">
              <CategoryScroll
                searchList={cateSearchList}
                selected={categorySelect}
                onClickItem={(index) => handleOnChangeInput("categorySelect", cateSearchList[index])}
              />
            </div>
          )}
          {categorySelect && (
            <div className="cate-select-container">
              <div className="thumbnail">
                <img src={categorySelect.thumbnail} alt={categorySelect.name} />
              </div>
              <div className="description">
                <div className="name">{categorySelect.name}</div>
                <div className="interested">
                  {convertView(categorySelect.interested)}
                  <div className="text">Interested</div>
                </div>
              </div>
              <Icons.Close className="close-icon" onClick={handleOnClickCateClose} />
            </div>
          )}
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
            {tagSelects.map((tag, index) => (
              <div className="tag-select" key={index}>
                <div className="text">{tag}</div>
                <Icons.Close
                  className="tag-icon"
                  onClick={() => handleClickTagIcon(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="thumbnail-container">
          <EditLabel title="Thumbnail" />
          <div
            className={`add-area ${dragActive ? 'drag-active' : ''}`}
            onClick={handleClickUpload}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files)}
            />
            {thumbnail ? (
              <div className={`thumbnail-preview ${thumbnailVisible ? 'visible' : ''}`}>
                <img src={thumbnail} alt="Thumbnail preview" />
                <Icons.Close
                  className="remove-thumbnail"
                  onClick={handleRemoveThumbnail}
                />
              </div>
            ) : (
              <>
                <div className="icon">
                  <Icons.UploadImage />
                </div>
                <div className="text">Upload thumbnail</div>
              </>
            )}
          </div>
        </div>
        <div className="comment-container">
          <EditLabel title="Comment Setting" />
          <EditSelect
            options={commentInput}
            selected={commentSelect}
            onClickItem={(index) => handleOnChangeInput("commentSelect", commentInput[index])}
          />
        </div>
        <div className="visibility-container">
          <EditLabel title="Visibility" />
          <EditSelect
            options={visibilityInput}
            selected={visibilitySelect}
            onClickItem={(index) => handleOnChangeInput("visibilitySelect", visibilityInput[index])}
          />
        </div>
      </div>
      <div className="save-button">
        <Button color={Theme.highlight} title="Save" onclick={handleClickSave} />
      </div>
      {onSave && <ErrorAlert type="success" message={"Your livestream information has been saved"} />}
    </EditBarContainer>
  );
};

export default EditBar;
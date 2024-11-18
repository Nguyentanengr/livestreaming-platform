import { ActionPreviewContainer } from "./ActionPreview.styled"

import TitleBar from "../PresentPreview/TitleBar"


const ActionPreview = () => {
    return (
        <ActionPreviewContainer>
            <TitleBar title={"Action"} />
            <div className="actions">
                <div className="title">
                    <div className="text">Title</div>
                    <textarea aria-invalid="false">
                        Enter a title
                    </textarea>
                </div>
                <div className="notification">
                    <div className="text">Go Live Notification</div>
                    <textarea aria-invalid="false">
                        Welcoming!
                    </textarea>
                </div>
                <div className="category">
                    <div className="text">Category</div>
                    <input type="text" placeholder="Search for a category" />
                </div>
                <div className="tags">
                    <div className="text">Tags</div>
                    <input type="text" placeholder="Use Enter after each tag" />
                    <div className="add-button">Add tag</div>
                </div>
                <div className="branded-content">
                    <div className="text">Branded Content</div>
                    <div className="check-box">
                        <input type="checkbox" />
                        <div>Let viewers know if your stream features branded content. This includes paid product placement, endorsement, or other commercial relationships. To learn more, view our Help Center Article and our Terms of Service.</div>
                    </div>
                </div>
                <div className="private">
                    <div className="text">Private Setting</div>
                    <div className="private">
                        <ul>
                            <li className="item">
                                <input type="checkbox" />
                                <div>All everyone</div>
                            </li>
                            <li className="item">
                                <input type="checkbox" />
                                <div>who was following me</div>
                            </li>
                            <li className="item">
                                <input type="checkbox" />
                                <div>Friendly (Follow along with)</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </ActionPreviewContainer>
    )
}

export default ActionPreview;
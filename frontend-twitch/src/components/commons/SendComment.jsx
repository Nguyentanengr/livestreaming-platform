
import { SendCommentContainer } from "./SendComment.styled";
import { Icons } from "../../assets/icons/Icon";
import { useState } from "react";
import { HiGif } from "react-icons/hi2";

const SendComment = ({ ph, onSendComment, highlight=false }) => {

    
    const [inputValue, setInputValue] = useState("");

    const handleSend = () => {
        onSendComment(inputValue);
        setInputValue("");
    };

    const handleKeyEnter = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <SendCommentContainer>
            <input
                className={highlight ? "highlight" : ""}
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => handleKeyEnter(e)}
                spellCheck={false}
                placeholder={ph}>
            </input>
            <div className="setting"><Icons.Setting /></div>
            <div className='send' onClick={handleSend}><Icons.Send /></div>
        </SendCommentContainer>
    );
};

export default SendComment;


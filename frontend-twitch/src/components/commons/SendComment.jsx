
import { SendCommentContainer } from "./SendComment.styled";
import { Icons } from "../../assets/icons/Icon";
import { useState } from "react";

const SendComment = () => {

    const [inputValue, setInputValue] = useState("");

    const handleSend = () => {
        console.log(inputValue);
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
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => handleKeyEnter(e)}
                placeholder='Add comment...'>
            </input>
            <div className="setting"><Icons.Setting /></div>
            <div className='send' onClick={handleSend}><Icons.Send /></div>
        </SendCommentContainer>
    );
};

export default SendComment;


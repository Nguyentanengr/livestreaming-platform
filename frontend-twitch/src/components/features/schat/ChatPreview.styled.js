
import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ChatPreviewContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: transparent;
   

    .chat-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    .send-chat {
        padding: 15px 5px;
    }
`
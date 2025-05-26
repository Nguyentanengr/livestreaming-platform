import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ViewChatContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: transparent;

    .title-chat {
        padding: 15px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 500;
        text-transform: uppercase;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .chat-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    .chat-send {
        padding: 20px 0;
    }

    .no-chat {
        padding: 20px;
        text-align: center;
        color: ${Theme.textSecondary};
        font-style: italic;
    }
`;
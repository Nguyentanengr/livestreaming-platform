import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ViewContainer = styled.div`
    width: 100%;
    height: calc(100vh - 65px);
    overflow-y: auto;

    ::-webkit-scrollbar {
        display: none;
    }
    
    .live-container {
        margin-right: 27vw;
        background-color: transparent;
        padding-bottom: 200px;
    }

    .chat-container {
        position: fixed;
        top: 55px;
        right: 0;
        bottom: 0;
        width: 27vw;
        background-color: ${Theme.header};
        border-left: 1px solid rgba(0, 0, 0, 0.1);
    }
    
`
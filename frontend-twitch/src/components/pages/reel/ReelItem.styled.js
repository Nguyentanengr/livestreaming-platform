import styled, { keyframes } from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ReelItemContainer = styled.div`
    background-color: ${Theme.soft};
    height: calc(100vh - 65px);

     .view-container {
        background-color: ${Theme.soft};
        width: 100%;
        height: 100%;
        video {
            height: 100%;
            width: 100%;
            display: block;
        }
     }

    .interaction-container {
        display: flex;
        flex-direction: column;
        justify-content: end;
        gap: 30px;
        padding: 0 30px;

        
    }
`
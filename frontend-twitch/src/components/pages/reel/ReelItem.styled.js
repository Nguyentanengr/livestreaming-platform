import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ReelItemContainer = styled.div`
    background-color: ${Theme.header};
    height: calc(100vh - 65px);
    padding: 50px 0;
    display: flex;
    align-items: end;

    .view-container {
        background-color: ${Theme.soft};
        height: 100%;
        width: 100%;
        video {
            height: 100%;
            width: 100%;
        }
    }

    .interaction-container {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 0 30px;

        
    }
`
import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ActivityFeedContainer = styled.div`
    grid-column: 1;
    grid-row: 2;
    border-right: 2px solid rgba(0, 0, 0, 0.1);

    .feed-container {
        display: flex;
        flex-direction: column;
        padding: 0px 25px;
        overflow-y: auto;
        height: 60%;

        hr {
            height: 1px;
            background-color: ${Theme.hover};
        }

        ::-webkit-scrollbar {
            color: transparent;
        }
    }
`
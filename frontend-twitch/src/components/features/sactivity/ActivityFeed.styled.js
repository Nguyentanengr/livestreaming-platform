import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ActivityFeedContainer = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    .feed-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0px 25px;
        overflow-y: auto;
        height: 100%;

        .line {
            height: 1px;
            background-color: ${Theme.hover};
        }

        ::-webkit-scrollbar {
            color: transparent;
        }

        ::-webkit-scrollbar {
            display: none;
        }
    }
`
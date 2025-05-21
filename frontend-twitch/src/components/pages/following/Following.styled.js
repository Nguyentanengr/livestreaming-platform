import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";


export const FollowingContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;

    .filter-cnt {
        display: flex;
        gap: 5px;
        margin: 10px 30px;
        padding: 5px 5px;
        font-weight: 500;
        border-radius: 5px;
        background-color: ${Theme.lightSoft};

        .filter-item {
            padding: 7px 15px;
            border-radius: 5px;
            cursor: pointer;
            &.selected {
                background-color: ${Theme.header};
            }
        }
    }

    .recomment-streamer {
        width: 100%;
    }
`
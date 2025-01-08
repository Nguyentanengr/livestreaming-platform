import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const EditBarContainer = styled.div`
    grid-column: 3;
    grid-row: 1;

    .tag-container {

        display: flex;
        flex-direction: column;
    }

    .thumbnail-container {
        display: flex;
        flex-direction: column;
        align-items: start;

        .add-area {
            background-color: ${Theme.header};
            padding: 30px 40px;
            border-radius: 5px;
            border: 1px dashed ${Theme.mediumSoft};
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            .text {
                font-size: 18px;
                color: ${Theme.soft};
            }

            .icon {
                font-size: 30px;
                opacity: 0.7;
            }

            &:hover {
                border: 1px dashed ${Theme.lightDark};
            }
        }
    }

    .comment-container {

        select {
            padding: 8px 88px;
            /* background-color: ${Theme.soft}; */
            font-size: 18px;
            border: 2px solid ${Theme.hover};
            border-radius: 5px;

            option {
                border-radius: 5px;
            }
        }
    }
`
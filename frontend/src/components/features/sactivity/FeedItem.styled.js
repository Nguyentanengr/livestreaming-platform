import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";


export const FeedItemContainer = styled.div`
    display: flex;
    gap: 10px;
    padding: 15px 0;

    .feed-icon {
        margin-top: 2px;
        font-size: 16px;
        color: ${Theme.violet};
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 5px;

        .username {
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }

        .description {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;

            .dot-icon {
                display: flex;
                align-items: center;
                font-size: 4px;
                color: ${Theme.soft}
            }

            .time {
                color: ${Theme.soft};
            }
        }
    }

    .more {

    }
`

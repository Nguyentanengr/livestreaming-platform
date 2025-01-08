import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";


export const FeedItemContainer = styled.div`
    display: flex;
    gap: 10px;
    padding: 15px 0;

    .feed-icon {
        font-size: 25px;
        color: ${Theme.pink};
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 5px;

        .username {
            font-size: 18px;
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
            font-size: 18px;

            .dot-icon {
                display: flex;
                align-items: center;
                font-size: 7px;
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

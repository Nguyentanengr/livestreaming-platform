import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const NotificationBoxContainer = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    gap: 5px;
    top: 40px;
    right: -20px;
    background-color: ${Theme.header};
    width: 500px;
    z-index: 100;
    border-radius: 5px;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
    animation: anim 0.1s;
    font-size: 18px;
    color: ${Theme.text};
    cursor: default;

    .header {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        background-color: ${Theme.header};
        padding: 15px 10px;

        .gap-container {
            grid-column: 1;
        }

        .title {
            grid-column: 2;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
        }

        .action-container {
            padding: 0 0;
            grid-column: 3;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 5px;
        }
    }

    .notification-container {
        display: flex;
        flex-direction: column;

        .notification-item {
            display: grid;
            grid-template-columns: 50px auto 30px;
            align-items: start;
            background-color: ${Theme.header};
            padding: 15px 15px 20px;
            gap: 10px;
            cursor: pointer;

            .description-container {
                text-align: left;
                display: flex;
                flex-direction: column;
                gap: 5px;
                .description {
                    font-size: 16px;
                }
                .time {
                    font-size: 14px;
                    color: ${Theme.softText};
                    opacity: 0.7;
                }
            }

            .delete-button {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            }

            &:hover {
                background-color: ${Theme.lightSoft};
            }
        }
        
    }
`
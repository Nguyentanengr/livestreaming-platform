import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";
export const RightHeaderContainer = styled.div`
    .action-container {
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 30px;
        padding: 0 20px;

        .notification-container {
            position: relative;

            .notification-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                cursor: pointer;
                background-color: ${Theme.header};
                padding: 6px;
                border-radius: 5px;
                transition: 0.2s;

                &:hover {
                    background-color: ${Theme.lightSoft};
                }

                .notification-count {
                    position: absolute;
                    top: 4px;
                    left: 17px;
                    font-size: 8px;
                    font-weight: 700;
                    color: ${Theme.header};
                    background-color: ${Theme.highlight};
                    padding: 1px 5px;
                    border-radius: 5px;
                }
            }
        }

        .profile-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            .profile-menu-container {
                display: flex;
                flex-direction: column;
                gap: 5px;
                position: absolute;
                top: 100%;
                right: -20px;
                background-color: ${Theme.header};
                width: 250px;
                z-index: 100;
                padding: 15px 15px;
                border-radius: 10px;
                box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
                animation: anim 0.3s;
                color: ${Theme.text};

                hr {
                    background-color: ${Theme.border};
                    height: 1px;
                    margin: 10px 0;
                }

                .avatar-container {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    
                    .profile-name {
                        font-size: 18px;
                        font-weight: 600;
                        line-height: 18px;
                    }
                }
            }
        }
    }
`;
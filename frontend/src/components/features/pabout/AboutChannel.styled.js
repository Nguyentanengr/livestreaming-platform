import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const AboutChannelContainer = styled.div`
    background-color: ${Theme.body};
    min-height: 800px;

    .short-info {
        display: flex;
        justify-content: space-between;
        padding: 30px 70px;

        .info {
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 20px;

            .username {
                font-size: 20px;
                font-weight: 700;
            }
        }

        .action {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;

            .follow-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                background-color: ${Theme.highlight};
                font-size: 16px;
                font-weight: 500;
                padding: 6px 15px;
                border-radius: 5px;
                color: ${Theme.header};
                cursor: pointer;

                .fol-icon {
                    font-size: 16px;
                    transition: 0.2s;
                }
            }
            .edit-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                background-color: ${Theme.header};
                border: 1px solid rgba(0, 0, 0, 0.1);
                font-size: 16px;
                font-weight: 500;
                padding: 6px 15px;
                border-radius: 5px;
                color: ${Theme.lightDark};
                cursor: pointer;

                .edit-icon {
                    font-size: 18px;
                    transition: 0.2s;
                }
            }
        }
    }

    .description-info {
        display: flex;
        flex-direction: column;
        margin: 0 70px;
        background-color: ${Theme.header};
        /* min-height: 200px; */
        border-radius: 5px;

        .description {
            padding: 30px 40px;
            display: flex;
            flex-direction: column;
            gap: 15px;

            .fol-vid {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 16px;
                font-weight: 700;

                .dot {
                    font-size: 10px;
                }
            }

            .des {
                font-size: 16px;
                color: ${Theme.dark};
            }

        }

        .links {
            padding: 0px 40px;
            display: flex;
            gap: 15px;
            margin-bottom: 30px;


            .link-item {
                display: flex;
                align-items: center;
                gap: 5px;
                font-size: 14px;
                font-weight: 500;
                opacity: 0.7;
                cursor: pointer;
                transition: 0.2s;

                .link-icon {
                    font-size: 20px;
                }

                &:hover {
                    opacity: 1;
                }

            }
        }
    }

    .store {
        display: flex;
        flex-direction: column;
        background-color: transparent;
        margin: 30px 70px;

        .navigations {
            display: flex;
            gap: 40px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;

            .navigation.highlight {
                color: ${Theme.highlight};

                .highlight {
                    margin-top: 7px;
                    width: 100%;
                    height: 3px;
                    background-color: ${Theme.highlight};
                }
            }
        }
    }
`
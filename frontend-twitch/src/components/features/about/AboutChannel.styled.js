import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const AboutChannelContainer = styled.div`
    background-color: ${Theme.body};
    min-height: 800px;
    margin-right: 65px;

    .short-info {
        display: flex;
        justify-content: space-between;
        padding: 50px 70px;

        .info {
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 20px;

            .username {
                font-size: 26px;
                font-weight: 600;
            }
        }

        .action {
            display: flex;
            align-items: center;
            justify-content: center;

            .follow-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                background-color: ${Theme.highlight};
                font-size: 22px;
                font-weight: 500;
                padding: 8px 15px;
                border-radius: 5px;
                color: ${Theme.header};
                cursor: pointer;

                .fol-icon {
                    font-size: 25px;
                    stroke-width: 1;
                    transition: 0.2s;
                }

                &:hover {
                    .fol-icon {
                        font-size: 25px;
                        stroke-width: 3;
                    }
                }
            }
        }
    }

    .description-info {
        display: flex;
        margin: 0 70px;
        background-color: ${Theme.header};
        min-height: 300px;
        border-radius: 5px;

        .description {
            padding: 30px 40px;
            display: flex;
            flex-direction: column;
            gap: 25px;

            .fol-vid {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 20px;
                font-weight: 500;

                .dot {
                    font-size: 10px;
                }
            }

            .des {
                font-size: 20px;
                color: ${Theme.dark};
            }

        }

        .links {
            padding: 50px 60px;
            display: flex;
            flex-direction: column;
            gap: 10px;


            .link-item {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 18px;
                font-weight: 500;
                opacity: 0.7;
                cursor: pointer;
                transition: 0.2s;
                
                .link-icon {
                    font-size: 26px;

                }

                &:hover {
                    opacity: 1;
                }

            }
        }
    }
`
import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";



export const ViewLiveContainer = styled.div`
    width: 100%;
    padding: 30px 30px;
    background-color: transparent;

    .about-live {
        width: 100%;
        display: flex;

        .thumb-title {
            flex: 1;
            display: flex;
            align-items: start;
            gap: 15px;

            .thumb-container {
                position: relative;
                .span-live {
                    position: absolute;
                    top: 70%;
                    right: 50%;
                    transform: translateX(50%);
                    font-size: 16px;
                    font-weight: 500;
                    color: ${Theme.header};
                    text-transform: uppercase;
                    background-color: ${Theme.hotRed};
                    padding: 1px 10px;
                    border-radius: 5px;
                }
            }

            .title-container {
                display: flex;
                flex-direction: column;
                gap: 10px;

                .title {
                    font-size: 16px;
                    font-weight: 500;

                }

                .username {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 16px;
                    font-weight: 700;
                    
                    .check-icon {
                        font-size: 16px;
                        background-color: ${Theme.highlight};
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 100px;
                        color: ${Theme.header};
                        
                    }
                }
            }
        }

        .follow-container {
            display: flex;
            flex-direction: column;
            align-items: end;
            gap: 20px;
            margin-left: 50px;
            

            .view-time {
                background-color: ${Theme.hover};
                padding: 2px 15px;
                border-radius: 2px;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 16px;
                font-weight: 500;

                .dot {
                    font-size: 8px;
                }
            }
        }

    }

    .about-user {
        padding: 30px 0;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: ${Theme.header};
        min-height: 200px;
        border-radius: 5px;
        gap: 30px;

        .description {
            padding: 0 30px;
            display: flex;
            flex-direction: column;
            gap: 25px;

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
            padding: 0 30px;
            display: flex;
            gap: 20px;


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
`
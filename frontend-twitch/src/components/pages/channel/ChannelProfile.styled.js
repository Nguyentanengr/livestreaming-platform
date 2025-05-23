import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ChannelProfileContainer = styled.div`
    background-color: ${props => props.bgColor};
    display: flex;
    flex-direction: column;
`;

export const StatusLiveContainer = styled.div`
    display: flex;
    gap: 25px;
    padding-top: 6vh;
    padding-left: 13vw;
    height: 45vh;
    width: 100%;
    background-image: linear-gradient(to right, ${Theme.highlight}, ${Theme.pink});

    .noti-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 27vw;
        height: calc(30vw * 9 / 16);
        background-color: ${Theme.lightSoft};

        .banner {
            height: 70%;
            display: flex;
            justify-content: center;
            align-items: start;
            padding-top: 35px;
            gap: 30px;
            padding-left: 40px;

            .text {
                display: flex;
                flex-direction: column;
                align-items: start;
                gap: 10px;

                .noti {
                    font-size: 26px;
                    font-weight: 600;
                    color: ${Theme.dark}
                }
            }
        }

        .turn-on {
            margin: 10px 0;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 18px;
            font-weight: 500;
            color: ${Theme.mediumSoft};
            cursor: pointer;
            transition: 0.2s;
            padding-left: 40px;

            .noti-icon {
                font-size: 26px;
            }

            &:hover {
                color: ${Theme.soft};
            }
        }
    }

    .live-screen {
        position: relative;

        .banner {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            font-size: 16px;
            text-transform: uppercase;
            font-weight: 500;
            color: ${Theme.lightSoft};

            .icon {
                font-size: 12px;
            }
        }
    }
`;

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
        }
    }

    .description-info {
        display: flex;
        flex-direction: column;
        margin: 0 70px;
        background-color: ${Theme.header};
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
`;
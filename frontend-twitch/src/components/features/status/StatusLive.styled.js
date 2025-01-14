import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const StatusLiveContainer = styled.div`
    display: flex;
    gap: 25px;
    padding-top: 12vh;
    padding-left: 13vw;
    height: 60vh;
    width: 100%;
    background-image: linear-gradient(to right, ${Theme.highlight}, ${Theme.pink});

    .noti-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 27vw;
        height: calc(35vw * 9 / 16);
        background-color: ${Theme.lightSoft};

        .banner {
            height: 70%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            padding-left: 40px;

            .text {
                display: flex;
                flex-direction: column;
                align-items: start;
                gap: 10px;

                .noti {
                    font-size: 30px;
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
            font-size: 18px;
            text-transform: uppercase;
            font-weight: 500;
            color: ${Theme.lightSoft};

            .icon {
                font-size: 12px;
            }
        }
    }

`
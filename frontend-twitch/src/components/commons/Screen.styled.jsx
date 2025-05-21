import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";

export const ScreenContainer = styled.div`

    .screen-container {
        position: relative;
        background-color: ${Theme.dark};
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        .video {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .play, .mute, .expand {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${Theme.header};
            font-size: 24px;
            padding: 5px;
            cursor: pointer;
            transition: 0.2s;
            border-radius: 3px;

            &:hover {
                background-color: ${Theme.lightHover};
            }
        }

        .play {
            bottom: 12px;
            left: 10px;
            font-size: 32px;
            padding: 0px;
        }

        .mute {
            bottom: 10px;
            left: 55px;
        }

        .expand {
            bottom: 10px;
            right: 10px;
        }

        &.small {
            width: 20vw;
            aspect-ratio: 16 / 9;
            .expand {
                font-size: 25px;
            }
        }

        &.medium {
            width: 30vw;
            aspect-ratio: 16 / 9;
            .expand {
                font-size: 25px;
            }
        }

        &.large {
            width: 60vw;
            aspect-ratio: 16 / 9;
        }

        &.auto {
            aspect-ratio: 16 / 9;
            .expand {
                font-size: 25px;
            }
        }
        
    } 

`
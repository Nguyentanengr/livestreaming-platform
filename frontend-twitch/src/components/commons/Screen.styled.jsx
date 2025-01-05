import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";

export const ScreenContainer = styled.div`

    .screen-container {
        position: relative;
        background-color: ${Theme.dark};
        display: flex;
        align-items: center;
        justify-content: center;

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
            font-size: 30px;
            padding: 5px;
            cursor: pointer;
            transition: 0.2s;
            border-radius: 3px;

            &:hover {
                background-color: ${Theme.soft};
            }
        }

        .play {
            bottom: 10px;
            left: 10px;
            font-size: 36px;
            padding: 2px;
        }

        .mute {
            bottom: 10px;
            left: 55px;
        }

        .expand {
            bottom: 10px;
            right: 10px;
        }
    } 

    .small {
        width: 20vw;
        aspect-ratio: 16 / 9;
    }

    .medium {
        width: 35vw;
        aspect-ratio: 16 / 9;
    }

    .large {
        width: 60vw;
        aspect-ratio: 16 / 9;
    }

`
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

        &.expanded {
            width: 100vw !important;
            height: 100vh !important;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
        }

        .video {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .play, .expand {
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
            bottom: 8px;
            left: 10px;
            font-size: 32px;
            padding: 0px;
        }

        .expand {
            bottom: 5px;
            right: 10px;
        }

        .progress-wrapper {
            position: absolute;
            bottom: 13px;
            left: 60px; /* Chừa khoảng trống cho nút Play/Pause */
            right: 60px; /* Chừa khoảng trống cho nút Expand */
            height: 20px; /* Tăng vùng ảnh hưởng */
            display: flex;
            align-items: center;
        }

        .progress-bar {
            width: 100%;
            height: 5px; /* Kích thước hiển thị không đổi */
            background-color: #333;
            cursor: pointer;

            .progress {
                height: 100%;
                background-color: ${Theme.highlight};
                transition: width 0.1s linear;
            }
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
`;
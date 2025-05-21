import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const StreamPreviewContainer = styled.div`
    display: flex;
    flex-direction: column;

    .screen-stream {
        position: relative;

        .webcam-preview {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            color: ${Theme.header};
            

            .description {
                font-size: 16px;
                font-weight: 500;
            }

            .on-webcam-btn {
                padding: 6px 20px;
                background-color: ${Theme.lightHover};
                border-radius: 3px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 600;
                transition: 0.1s;

                &:hover {
                    background-color: ${Theme.lightSoft};
                    color: ${Theme.dark};
                }
            }
        }

        .live-span {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 2px 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            text-transform: uppercase;
            color: ${Theme.header};
            font-size: 16px;
            font-weight: 600;

            .live-icon {
                font-size: 20px;
                color: ${Theme.hotRed};
                stroke-width: 1;
            }
        }
    }

    .control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 25px 20px;

        .counter-container {
            display: flex;
            gap: 15px;
            align-items: center;
        }

        .present-btn {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
            font-weight: 500;
            padding: 10px 10px;
            background-color: ${Theme.hover};
            color: ${Theme.dark};
            border-radius: 5px;
            cursor: pointer;

            &:hover {
                background-color: ${Theme.lightSoft};
            }

            &.highlight {
                background-color: ${Theme.highlight};
                color: ${Theme.header};
            }

        }
    }
`
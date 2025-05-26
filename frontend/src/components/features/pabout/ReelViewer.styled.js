import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ReelViewerContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .video-container {
        position: relative;
        max-width: 80%;
        max-height: 80%;
        width: 100%;
        height: 100%;
        aspect-ratio: 16 / 9;
        background-color: ${Theme.dark};
        border-radius: 30px;

        video {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 8px;
        }

        .close-button {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: -20px;
            right: 10px;
            background-color: ${Theme.lightDark};
            color: ${Theme.header};
            border: none;
            border-radius: 100px;
            cursor: pointer;
            padding: 10px;
            font-size: 22px;
            transition: 0.2s;

            &:hover {
                background-color: ${Theme.lightSoft};
                color: ${Theme.dark};
            }
        }
    }
`;

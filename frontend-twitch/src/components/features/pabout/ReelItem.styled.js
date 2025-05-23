import styled, { keyframes } from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const ReelItemContainer = styled.div`
    width: calc((100% - 60px) / 3);
    animation: ${fadeIn} 0.3s ease-out forwards;

    .thumbnail-container {
        position: relative;
        cursor: pointer;
        width: 100%;
        aspect-ratio: 16 / 9;
        background-color: ${Theme.lightSoft};
        transition: 0.2s;
        border-radius: 8px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.2s;
            display: block;
            border-radius: 8px;
        }

        &:hover {
            background-color: ${Theme.highlight};

            img {
                transform: translate(8px, -8px);
            }
        }
    }
`;
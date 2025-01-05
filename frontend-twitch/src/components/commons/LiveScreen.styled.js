import styled, { keyframes } from "styled-components";
import { Theme } from "../../assets/styles/Theme";

export const LiveScreenContainer = styled.div`
    width: 100%;
    aspect-ratio: 16 / 6;
    background-color: ${Theme.dark};

    video {
        object-fit: contain;
        width: 100%;
        height: 100%;
        display: block;
    }
`
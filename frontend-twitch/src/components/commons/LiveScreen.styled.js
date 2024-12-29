import styled, { keyframes } from "styled-components";


export const LiveScreenContainer = styled.div`
    width: 100%;
    aspect-ratio: 16 / 6;

    video {
        object-fit: contain;
        width: 100%;
        height: 100%;
        display: block;
    }
`
import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ReelListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 0px;

    .title-heading {
        font-size: 18px;
        font-weight: 700;
        color: ${Theme.dark};
    }

    .recommend-live-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: start;
        align-items: start;
        opacity: ${({ isVideoPlaying }) => (isVideoPlaying ? 0 : 1)};
        pointer-events: ${({ isVideoPlaying }) => (isVideoPlaying ? "none" : "auto")};
        transition: opacity 0.3s ease;
    }
`;
import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";

export const VideoActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    .action-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 52px;
        width: 52px;
        font-size: 30px;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.1s;
        background-color: ${Theme.hover};
    }

    .action-count {
        font-size: 18px;
        font-weight: 500;
    }
`;

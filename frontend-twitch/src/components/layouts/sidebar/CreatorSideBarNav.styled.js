import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const CreatorSideBarNavContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 18px;
    background-color: transparent;
    margin: 0 5px;
    padding: 12px 15px; 
    cursor: pointer;
    border-radius: 5px;

    .nav-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
    }

    .nav-title {
    }

    &:hover {
        background-color: ${Theme.hover};
    }

    &.hl {
        background-color: ${Theme.highlight};
        color: ${Theme.header};
    }
`
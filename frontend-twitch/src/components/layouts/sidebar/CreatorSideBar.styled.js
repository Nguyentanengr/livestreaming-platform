import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const CreatorSideBarContainer = styled.div`
    position: fixed;
    left: 0;
    top: 65px;
    bottom: 0;
    width: 270px;
    background-color: ${Theme.header};
    z-index: 15;
    border: 1px solid ${Theme.hover};

    .title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 5px;
        padding: 25px 15px 15px 12px;
        text-transform: uppercase;
    }

    .nav-container {
        display: flex;
        flex-direction: column;
    }

`
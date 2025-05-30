import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const StreamContainer = styled.div`
    position: fixed;
    top: 55px;
    left: 270px;
    bottom: 0;
    right: 0;
    background-color: ${Theme.header};
    display: flex;

    .col1 {
        width: 40%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: ${Theme.header};
        border-right: 2px solid rgba(0, 0, 0, 0.1);
    }

    .col2 {
        width: 28%;
        border-right: 2px solid rgba(0, 0, 0, 0.1);
    }

    .col3{
        width: 32%;
        border-right: 2px solid rgba(0, 0, 0, 0.1);
    }

`
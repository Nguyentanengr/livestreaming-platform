
import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";

export const ProfileItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 7px;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5px;
    transition: 0.2s;
    .icon {
        font-size: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title {
        font-size: 18px;
        color: ${Theme.text};
        opacity: 0.8;
    }

    &:hover {
        background-color: ${Theme.border};
    }

`

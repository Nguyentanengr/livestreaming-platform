import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";
export const ActionButtonContainer = styled.div`
    .action-button {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px 3px;
        font-size: 22px;
        background-color: transparent;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.2s;
        

        &:hover {
            background-color: ${Theme.hover};
        }
    }
`
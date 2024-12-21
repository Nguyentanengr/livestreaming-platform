import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";
export const ActionButtonContainer = styled.div`
    .action-button {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px 3px;
        font-size: 25px;
        background-color: ${Theme.header};
        border-radius: 5px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        

        &:hover {
            background-color: ${Theme.lightSoft};
        }
    }
`
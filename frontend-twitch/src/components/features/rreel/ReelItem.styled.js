import styled, { keyframes } from "styled-components";
import { Theme } from "../../../assets/styles/Theme";


const slideIn = keyframes`
    from {
        opacity: 0;
        width: 0%;
    }
    to {
        opacity: 1;
        width: 23%;
    }
`;

export const ReelItemContainer = styled.div`
    background-color: transparent;
    height: calc(100vh - 65px);
    padding: 120px 0px 120px 40px;
    display: flex;
    justify-content: center;

    .gap {
        width: 5%;
    }    
`
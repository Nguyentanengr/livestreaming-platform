

import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";


export const EditInputContainer = styled.div`

    input {
        height: 45px;
        width: 100%;
        font-size: 18px;
        background-color: transparent;
        border: 2px solid ${Theme.hover};
        border-radius: 5px;
        padding: 0 10px;
        font-size: sans-serif;
        font-weight: 400;

        

        &:focus {
            border: 4px solid ${Theme.highlight};
        }
    }
 
`
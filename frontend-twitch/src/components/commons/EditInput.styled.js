

import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";


export const EditInputContainer = styled.div`

    input {
        height: 45px;
        width: 100%;
        font-size: 18px;
        background-color: transparent;
        border: 1px solid ${Theme.mediumSoft};
        border-radius: 5px;
        padding: 0 10px;
        font-size: sans-serif;
        font-weight: 400;

        &:hover {
            border: 1px solid ${Theme.soft};
        }

        &:focus {
            border: 4px solid ${Theme.highlight};
        }
    }
 
`
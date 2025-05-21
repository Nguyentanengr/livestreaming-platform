import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";

export const EditTextAreaContainer = styled.div`
    textarea {
        height: 80px;
        width: 100%;
        border-radius: 5px;
        border: 1px solid ${Theme.mediumSoft};
        font-size: 14px;
        resize: none;
        padding: 10px 10px;
        font-family: sans-serif;
        font-weight: 400;
        
        &:hover {
            border: 1px solid ${Theme.soft};
        }
        &:focus {
            border: 4px solid ${Theme.highlight};
        }

        ::-webkit-scrollbar {
            width: 5px;
            
        }

        ::-webkit-scrollbar-thumb {
            background-color: ${Theme.hover}
        }
    }
`
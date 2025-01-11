import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";

export const SendCommentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    

    input {
        margin-right: 10px;
        font-size: 18px;
        height: 45px;
        flex-grow: 1;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        border: 1px solid ${Theme.hover};
        transition: 0.1s;

        &:focus {
            border:1px solid ${Theme.mediumSoft};
        }

        &.highlight {

            &:focus {
                border: 4px solid ${Theme.highlight};
            }
        }
    } 

    .setting {
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: 0.2s;
        font-size: 28px;
        border-radius: 5px;

        &:hover {
            background-color: ${Theme.hover};
        }
        
    }

    .send {
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        cursor: pointer;    
        transition: 0.2s;
        border-radius: 5px;

        &:hover {
            background-color: ${Theme.hover};
        }
    }
`
import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";

export const CheckBoxContainer = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    gap: 10px;

    input {
        display: none;

        &:checked + .checkmark {
            background-color: ${Theme.highlight}; 
            border-color: ${Theme.highlight}; 
        }

        &:checked + .checkmark::after {
            content: "";
            position: absolute;
            left: 5px;
            top: 1px;
            width: 6px;
            height: 12px;
            border: solid white;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg); 
        }
    }

    .checkmark {
        width: 20px;
        height: 20px;
        border: 2px solid #ccc; 
        border-radius: 4px; 
        background-color: transparent; 
        position: relative;
        transition: all 0.3s ease;

        &:hover {
            border-color: ${Theme.highlight};
        }
    }
`;

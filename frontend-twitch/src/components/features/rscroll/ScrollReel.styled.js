import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ScrollReelContainer = styled.div`
    .control-container {
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        top: 65px;
        right: 0;
        bottom: 0;
        width: 100px;

        .control-up {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2px;
            font-size: 50px;
            cursor: pointer;
            border-radius: 10px;
            background-color: ${Theme.hover};
            opacity: 0.5;
            transition: 0.2s;

            &:hover {
                opacity: 1;
            }
        }

        .control-down {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2px;
            font-size: 50px;
            cursor: pointer;
            border-radius: 10px;
            background-color: ${Theme.hover};
            opacity: 0.5;
            transition: 0.2s;
            
            &:hover {
                opacity: 1;
            }
        } 
    }
`
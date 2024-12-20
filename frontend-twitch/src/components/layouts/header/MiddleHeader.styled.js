import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";
export const MiddleHeaderContainer = styled.div`
    
    .search-container {
        display: flex;
        align-items: center;
        margin: 0 auto;
        max-width: 450px;
        width: 100%;
        height: 45px;
        border-radius: 8px;
        background-color: ${Theme.lightSoft};
        overflow: hidden;

        input {
            padding: 15px;
            width: 450px;
            height: 100%;
            background-color: ${Theme.header};
            font-size: 20px;
            color: ${Theme.text};
            border: 2px solid ${Theme.mediumSoft};
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            transition: 0.1s ease-in-out;

            &:hover {
                border: 2px solid ${Theme.soft};
            }

            &:focus {
                border: 5px solid ${Theme.highlight};
            }
        }

        .search-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 55px;
            height: 100%;
            font-size: 30px;
            background-color: ${Theme.border};
            cursor: pointer;
        }
    }
`;
import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";

export const ShowMoreContainer = styled.div`

    .show-more-container {
        display: flex;
        align-items: center;
        
        span  {
            display: flex;
            align-items: center;
            font-size: 14px;
            font-weight: 700;
            padding: 5px 15px;
            margin: 0 10px;
            background-color: transparent;
            color: ${Theme.highlight};
            cursor: pointer;
            border-radius: 5px;
            transition: all 0.1s;

            .show-more-icon {
                font-size: 27px;
            }

            &:hover {
                background-color: ${Theme.hover};
                color: ${Theme.dark};
            }
        }
    }

    .show-more-container::before,
    .show-more-container::after {
        content: "";
        height: 1px;
        flex: 1;
        background-color: ${Theme.hover};
    }
    
`

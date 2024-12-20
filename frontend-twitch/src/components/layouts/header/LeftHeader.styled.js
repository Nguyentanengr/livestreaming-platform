import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const LeftHeaderContainer = styled.div`
    .logo-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        transition: 0.3s;

        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 47px;
            color: ${Theme.highlight};
            fill: ${Theme.header};
            stroke: ${Theme.header};
            position: relative;
            overflow: hidden;
            transition: 0.3s ease-in-out;
            z-index: 10;

            .logo-bg {
                position: absolute;
                top: 1px;
                width: 19px;
                height: 20px;
                background-color: ${Theme.header};
                border-bottom-right-radius: 8px;
                z-index: -1;
            }

            &:hover {
                transform: translate(3px, -3px);
            }
        }

        .logo-text {
            font-size: 25px;
            font-weight: 800;
            color: ${Theme.highlight};
        }
    }
`;
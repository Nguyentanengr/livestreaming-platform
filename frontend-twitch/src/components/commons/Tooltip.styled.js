import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";

export const TooltipContainer = styled.div`
    .tooltip {
        position: relative;
        display: inline-block;

        .tooltip-content {
            position: absolute;
            transform: translateX(-50%);
            font-size: 16px;
            line-height: 16px;
            padding: 6px 10px;
            text-align: center;
            color: ${Theme.header};
            white-space: nowrap;
            border-radius: 3px;
            background-color: ${Theme.dark};
            z-index: 15;
        }

        .tooltip-content::before {
            content: "";
            position: absolute;
        }

        .tooltip-content.top {
            bottom: 100%;
            left: 50%;
            margin-bottom: 5px;
        }

        .tooltip-content.top::before {
            top: 100%;
            left: 50%;
            margin-left: -4px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid ${Theme.dark};
        }

        .tooltip-content.bottom {   
            top: 100%;
            left: 50%;
            margin-top: 5px;
        }

        .tooltip-content.bottom::before {
            top: -4px;
            left: 50%;
            margin-left: -4px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid ${Theme.dark};
        }
    }
`
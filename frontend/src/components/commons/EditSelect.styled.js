import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";



export const EditSelectContainer = styled.div`
    position: relative;

    .select {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 5px;
        border: 1px solid ${Theme.mediumSoft};
        padding: 5px 5px;
        cursor: pointer;

        .text {
            font-size: 14px;
            /* font-weight: 500; */
        }

        .dropdown-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 25px;
            border-radius: 5px;
            background-color: transparent;
        }

        &:hover {
            border: 1px solid ${Theme.soft};
        }
    }

    .select.highlight {
        border: 4px solid ${Theme.highlight};
    }

    .option-box {
        position: absolute;
        top: -5px;
        left: -5px;
        right: 0;
        background-color: ${Theme.header};
        padding: 10px 0px;
        font-size: 14px;
        /* font-weight: 500; */
        border-radius: 10px;
        box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
        z-index: 15;
        .option-item {
            padding: 5px 10px;
            background-color: transparent;
            cursor: pointer;

            &:hover {
                background-color: ${Theme.hover};
            }

        }
    }
`
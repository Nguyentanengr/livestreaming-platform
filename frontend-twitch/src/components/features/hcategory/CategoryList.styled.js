import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const CategoryListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px 30px;

    .title-heading {
        font-size: 18px;
        font-weight: 700;
        color: ${Theme.dark};
    }

    .header {
        display: flex;
        justify-content: space-between;

        .seeall-heading {
            background-color: transparent;
            font-size: 16px;
            font-weight: 600;
            color: ${Theme.highlight};
            margin-right: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0px;
            padding: 2px 5px 2px 8px;
            border-radius: 5px;
            cursor: pointer;
            transition: 0.2s;

            .icon {
                font-size: 22px;
            }

            &:hover {
                color: ${Theme.lightDark};
                background-color: ${Theme.hover};
            }

        }
    }

    .category-list-container {
        display: flex;
        gap: 20px;
        justify-content: start;
        align-items: start;
        flex-wrap: wrap;
    }
`
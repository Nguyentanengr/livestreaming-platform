import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const CategoryListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px 30px;

    .title-heading {
        font-size: 20px;
        font-weight: 700;
        color: ${Theme.dark};
    }

    .category-list-container {
        display: flex;
        gap: 20px;
        justify-content: space-between;
        align-items: start;
    }
`
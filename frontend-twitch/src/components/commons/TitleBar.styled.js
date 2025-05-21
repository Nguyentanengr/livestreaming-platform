import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";


export const TitleBarContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${Theme.lightSoft};
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    padding: 3px 15px;

    .title {
        font-size: 16px;
        font-weight: 600;
        color: ${Theme.dark};
    }

    .action {
        display: flex;
        align-items: center;
    }

`
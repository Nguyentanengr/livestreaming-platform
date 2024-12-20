import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";

export const ButtonContainer = styled.div`
    .btn {
        padding: 8px 25px;
        border-radius: 7px;
        font-size: 18px;
        font-weight: 600;
        line-height: 18px;
        background-color: ${props => props.color};
        color: ${props => props.color === Theme.highlight ? Theme.header : Theme.text};
        cursor: pointer;
    }

    .btn.large {
        padding: 9px 30px;
        font-size: 20px;
        font-weight: 700;
        line-height: 20px;
    }

    .btn.small {
        padding: 7px 15px;
        font-size: 16px;
        font-weight: 600;
        line-height: 16px;
    }

`

import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";


export const CounterContainer = styled.div`
    padding: 5px 20px;
    background-color: ${Theme.lightSoft};
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    font-size: 14px;
    .count {
        font-weight: 500;
    }

`
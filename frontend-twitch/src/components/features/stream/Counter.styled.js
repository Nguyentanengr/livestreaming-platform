import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";


export const CounterContainer = styled.div`
    padding: 7px 25px;
    background-color: ${Theme.lightSoft};
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    font-size: 18px;
    .count {
        font-weight: 500;
    }

`
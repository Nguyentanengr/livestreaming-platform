import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const StreamContainer = styled.div`
    position: fixed;
    top: 65px;
    left: 270px;
    bottom: 0;
    right: 0;
    background-color: ${Theme.header};
    display: grid;
    grid-template-columns: 4fr 2.7fr 3.3fr;
    grid-template-rows: auto 1fr;
`
import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const SideBarContainer = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    left: 0;
    top: 55px;
    bottom: 0;
    width: 60px;
    background-color: ${Theme.header};
    z-index: 15;
    padding-top: 40px;
`

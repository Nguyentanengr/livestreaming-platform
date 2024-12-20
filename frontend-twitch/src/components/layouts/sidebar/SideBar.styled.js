import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const SideBarContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 80px;
    background-color: ${Theme.sideBar};
    z-index: 15;
`

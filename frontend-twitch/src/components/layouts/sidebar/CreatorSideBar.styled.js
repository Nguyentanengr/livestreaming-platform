import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const CreatorSideBarContainer = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    left: 0;
    top: 65px;
    bottom: 0;
    width: 300px;
    background-color: ${Theme.sideBar};
    z-index: 15;
    padding-top: 40px;
`
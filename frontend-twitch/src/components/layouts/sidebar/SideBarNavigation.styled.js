import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";
export const SideBarNavigationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 70px;
    cursor: pointer;
    padding: 10px;

    &.box.highlight {
        border-left: 3px solid ${Theme.highlight};
        width: 60px;
    }

    .icon {
        font-size: 25px;
        transition: all 0.1s ease-in-out; 
        color: ${Theme.soft};
    }

    .icon.highlight {
        color: ${Theme.highlight};
    }

    .title {
        font-size: 14px;
        transition: all 0.1s ease-in-out;
        color: ${Theme.soft};
    }

    .title.highlight {
        color: ${Theme.highlight};
    }

    &:hover {
        .icon {
            color: ${Theme.highlight};
        }

        .title {
            color: ${Theme.highlight};
        }
    }
`
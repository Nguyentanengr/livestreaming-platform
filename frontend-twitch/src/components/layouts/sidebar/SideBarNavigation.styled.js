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
    border-radius: 8px;

    .icon {
        font-size: 30px;
        transition: all 0.3s ease-in-out;
        
    }

    .title {
        font-size: 16px;
        transition: all 0.3s;
    }

    &:hover {
        .icon {
            color: ${Theme.highlight};
            font-size: 35px;
        }

        .title {
            color: ${Theme.highlight};
        }
    }
`
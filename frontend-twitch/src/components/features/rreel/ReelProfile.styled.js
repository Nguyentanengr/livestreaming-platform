import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ReelProfileContainer = styled.div`
    .profile-container {
        position: relative;

        .follow-button {
            position: absolute;
            top: 70%;
            right: 50%;
            transform: translateX(50%);
            background-color: ${Theme.highlight};
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            .follow-icon {
                font-size: 20px;
                color: ${Theme.header};

            }

        }

        .follow-button.followed {
            background-color: ${Theme.header};
            border: 1px solid ${Theme.hover};

            .follow-icon {
                color: ${Theme.highlight};
            }
        }
    }
`
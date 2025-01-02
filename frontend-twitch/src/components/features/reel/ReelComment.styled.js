import styled, {keyframes} from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

const slideIn = keyframes`
    from {
        opacity: 0;
        width: 0%;
    }
    to {
        opacity: 1;
        width: 23%;
    }
`;
export const ReelCommentContainer = styled.div`
    width: 23%;
    background-color: ${Theme.header};
    animation: ${slideIn} 0.3s ease-in-out;
`
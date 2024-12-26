import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme"

export const ChannelListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 30px;

    .title-heading {
        font-size: 20px;
        font-weight: 700;
        color: ${Theme.dark};
       
    }

    .recommend-live-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: start;
        align-items: start;
    }
`;
import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";


export const CreatorContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${Theme.header};
    display: flex;

    .up-video-container {
        width: 45%;
        height: calc(100vh - 65px);
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 30px;

        .v-upload {
            height: 45%;
        }

        .v-detail {
            height: 55%;
        }
    }

    .video-description {
        flex: 1;
        height: calc(100vh - 65px);
        padding: 30px;

        .v-descrip {
            height: 100%;
        }
    }
`
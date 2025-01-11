import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const VideoDetailContainer = styled.div`
    height: 100%;
    border: 1px solid ${Theme.hover};
    border-radius: 15px;
    padding: 20px;

    .title {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 30px;
    }

    .detail-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;

        .file-name,
        .file-size,
        .video-duration,
        .aspect-ratio,
        .bitrate,
        .resolution {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .file-name {
            grid-column: 1;
            grid-row: 1;
        }

        .file-size {
            grid-column: 2;
            grid-row: 1;
        }

        .video-duration {
            grid-column: 1;
            grid-row: 2;
        }

        .aspect-ratio {
            grid-column: 2;
            grid-row: 2;
        }

        .bitrate {
            grid-column: 1;
            grid-row: 3;
        }

        .resolution {
            grid-column: 2;
            grid-row: 3;
        }
    }
`
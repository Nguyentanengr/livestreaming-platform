import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const VideoDetailContainer = styled.div`
    height: 100%;
    border: 1px solid ${Theme.hover};
    border-radius: 15px;
    padding: 20px;

    .title {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 15px;
    }

    .detail-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        column-gap: 50px;

        .file-name,
        .file-size,
        .video-duration,
        .aspect-ratio,
        .bitrate,
        .resolution {
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 20px 0px;
            font-size: 20px;
            font-weight: 500;
            
        }

        .f-name,
        .f-size, 
        .v-duration, 
        .a-ratio, 
        .b, 
        .r {
            flex: 1;
            font-weight: 400;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            padding: 8px 20px;
            cursor: not-allowed;
            color: ${Theme.lightDark}
        }

        .file-name {
            grid-column: 1;
            grid-row: 1;

            .f-name {
                
            }
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
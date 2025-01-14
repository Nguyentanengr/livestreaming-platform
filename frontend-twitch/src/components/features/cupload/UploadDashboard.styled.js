import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const UploadDashboardContainer = styled.div`
    height: 100%;
    border: 1px solid ${Theme.hover};
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title-image {

        img {
            height: 160px;
            object-fit: contain;
        }
    }
    .lorem {
        font-size: 16px;
        margin-bottom: 20px;
        color: ${Theme.soft};
    }

    .upload-button {
        padding: 8px 20px;
        background-color: ${Theme.dark};
        font-size: 18px;
        font-weight: 500;
        color: ${Theme.header};
        border-radius: 20px;
        cursor: pointer;

        &:hover {
            background-color: ${Theme.lightDark};
        }
    }

    
`
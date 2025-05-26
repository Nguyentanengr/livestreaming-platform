import styled, { keyframes } from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const UploadDashboardContainer = styled.div`
    height: 100%;
    border: 1px solid ${Theme.hover};
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .upload-area {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        background-color: ${Theme.header};
        transition: all 0.3s ease;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        padding: 0 20px;

        &.dragging {
            background-color: ${Theme.hover};
            border: 2px dashed ${Theme.lightDark};
            transform: scale(1.02);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        &:hover {
            background-color: ${Theme.hover};
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .title-image {
            margin-bottom: 10px;

            img {
                height: 120px;
                object-fit: contain;
            }
        }

        .lorem {
            font-size: 16px;
            margin-bottom: 10px;
            color: ${Theme.soft};
            text-align: center;
            line-height: 1.5;
        }

        .upload-button {
            padding: 6px 20px;
            background-color: ${Theme.dark};
            font-size: 16px;
            font-weight: 500;
            color: ${Theme.header};
            border-radius: 20px;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: ${Theme.lightDark};
            }
        }

        .loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;

            .spinner {
                border: 3px solid ${Theme.soft};
                border-top: 3px solid ${Theme.lightDark};
                border-radius: 50%;
                width: 24px;
                height: 24px;
                animation: ${spin} 1s linear infinite;
            }

            .text {
                font-size: 14px;
                color: ${Theme.lightDark};
            }
        }

        .video-preview {
            position: relative;
            width: 100%;
            max-height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: ${fadeIn} 0.3s ease;

            video {
                max-height: 250px;
                max-width: 100%;
                border-radius: 8px;
                object-fit: contain;
            }

            .remove-icon {
                position: absolute;
                top: 10px;
                right: 10px;
                cursor: pointer;
                color: ${Theme.dark};
                background-color: ${Theme.hover};
                border-radius: 50%;
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
                transition: all 0.2s ease;

                &:hover {
                    background-color: ${Theme.mediumSoft};
                    transform: scale(1.1);
                }
            }
        }
    }
`;
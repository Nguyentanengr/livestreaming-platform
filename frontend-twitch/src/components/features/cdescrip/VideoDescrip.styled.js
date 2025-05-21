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

export const VideoDescripContainer = styled.div`
    height: 100%;
    background-color: transparent;
    border: 1px solid ${Theme.hover};
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;

    .title {
        font-size: 18px;
        font-weight: 700;
    }

    .box {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 550px;
        overflow-y: scroll;

        ::-webkit-scrollbar {
            width: 0px;
        }

        .t-description,
        .t-thumb,
        .t-alow,
        .t-tag,
        .t-com {
            font-size: 16px;
            font-weight: 500;
            padding: 10px 0;
        }

        .select-container {
            margin-top: 5px;
            display: flex;
            gap: 10px;

            .tag-select {
                padding: 0 5px;
                background-color: ${Theme.hover};
                border-radius: 5px;
                display: flex;
                align-items: center;
                font-size: 14px;

                .text {
                    padding: 0 10px;
                }

                .tag-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 15px;
                    height: 30px;
                    cursor: pointer;
                    color: ${Theme.dark};
                    transition: 0.2s;

                    &:hover {
                        stroke-width: 3;
                    }
                }
            }
        }

        .thumb-container {
            display: flex;
            flex-direction: column;

            .thumb {
                background-color: ${Theme.header};
                padding: 20px 30px;
                border-radius: 8px;
                border: 2px dashed ${Theme.mediumSoft};
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                position: relative;
                transition: all 0.3s ease;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

                &.dragging {
                    background-color: ${Theme.hover};
                    border-color: ${Theme.lightDark};
                    transform: scale(1.02);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                &:hover {
                    border-color: ${Theme.lightDark};
                    background-color: ${Theme.hover};
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .text {
                    font-size: 14px;
                    color: ${Theme.soft};
                    margin-top: 8px;
                    transition: color 0.3s ease;
                }

                .icon {
                    font-size: 28px;
                    opacity: 0.7;
                    transition: opacity 0.3s ease;
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

                .thumbnail-preview {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    animation: ${fadeIn} 0.3s ease;

                    img {
                        max-height: 80px; 
                        max-width: 100%;
                        object-fit: contain;
                        border-radius: 4px;
                    }

                    .remove-icon {
                        position: absolute;
                        top: -8px;
                        right: -8px;
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
        }

        .com-container {
            display: flex;
            gap: 15px;
            align-items: center;
        }
    }

    .post-button {
        display: flex;
        justify-content: end;
    }
`;
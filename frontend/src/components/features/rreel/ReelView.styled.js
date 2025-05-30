import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ReelViewContainer = styled.div`
    background-color: ${Theme.dark};
    border-radius: 30px;
    aspect-ratio: 16/9;
    width: auto;
    position: relative;

    video {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        border-radius: 30px;
    }

    .mute-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 15px;
        left: 15px;
        cursor: pointer;
        padding: 10px;
        border-radius: 50%;
        
        .mute-icon {
            font-size: 24px;
            color: ${Theme.header};
            opacity: 0;
            transition: 0.2s;
        }

        .mute-icon.display {
            opacity: 1;
        }
    }

    .option-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
        padding: 10px;
        border-radius: 50%;

        .more-icon {
            font-size: 24px;
            color: ${Theme.header};
            opacity: 0;
            transition: 0.2s;
        }
    }

    .reel-info-container {
        position: absolute;
        bottom: 15px;
        left: 17px;
        display: flex;
        flex-direction: column;
        align-items: start;
        color: ${Theme.header};
        z-index: 10;

        .username {
            font-size:16px;
            font-weight: 500;
            margin-bottom: 10px;
            cursor: pointer;
            transition: 0.2s;

            &:hover {
                text-decoration: underline;
                transform: translate(0, -1px);
            }
        }

        .reel-title {
            font-size: 16px;
            font-weight: 400;
            max-width: 40vw;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        
        }

        .tags-container {
            display: flex;
            gap: 5px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            .tag {
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: 50px;
        transition: opacity 0.2s;
        z-index: 5;
    }

    &::after {
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        bottom: 0;
        height: 150px;
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    }

    &:hover {
        .mute-icon, .more-icon {
            opacity: 1;
        }
    }
`

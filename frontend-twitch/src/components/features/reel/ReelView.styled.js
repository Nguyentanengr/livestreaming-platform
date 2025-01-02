import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ReelViewContainer = styled.div`
    background-color: ${Theme.dark};
    border-radius: 30px;
    aspect-ratio: 16/9;
    width: 71%;
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
            font-size: 32px;
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
            font-size: 32px;
            color: ${Theme.header};
            opacity: 0;
            transition: 0.2s;
        }
    }

    .reel-info-container {
        position: absolute;
        bottom: 25px;
        left: 17px;
        display: flex;
        flex-direction: column;
        align-items: start;
        color: ${Theme.header};

        .username {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
            cursor: pointer;
            transition: 0.2s;

            &:hover {
                text-decoration: underline;
                transform: translate(0, -1px);
            }
        }

        .reel-title {
            font-size: 18px;
            font-weight: 400;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            overflow: hidden;
        
        }

        .tags-container {
            display: flex;
            gap: 5px;
            font-size: 18px;
            font-weight: 400;
            cursor: pointer;
            .tag {
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    &:hover {
        .mute-icon, .more-icon {
            opacity: 1;
        }
    }
`

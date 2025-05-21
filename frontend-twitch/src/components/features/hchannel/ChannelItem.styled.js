import styled, { keyframes } from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const ChannelItemContainer = styled.div`
    width: calc((100% - 60px) / 4);
    animation: ${fadeIn} 0.3s ease-out forwards;
    .thumbnail-container {
        position: relative;
        cursor: pointer;
        width: 100%;
        aspect-ratio: 16 / 9;
        background-color: ${Theme.lightSoft};
        transition: 0.2s;
        border-radius: 8px;
        

        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.2s;
            display: block;
            border-radius: 8px;
        }

        .live-status {
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 16px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 2px;
            background-color: ${Theme.hotRed};
            color: ${Theme.header};
            transition: 0.2s;
        }

        .viewers-count {
            position: absolute;
            bottom: 12px;
            left: 10px;
            font-size: 12px;
            font-weight: 500;
            color: ${Theme.header};
            border-radius: 1px;
            padding: 2px 8px;
            background-color: ${Theme.boldShadow};
            transition: 0.2s;
        }

        .duration {
            position: absolute;
            bottom: 12px;
            right: 10px;
            font-size: 16px;
            font-weight: 500;
            color: ${Theme.header};
            border-radius: 2px;
            padding: 2px 8px;
            background-color: ${Theme.boldShadow};
            transition: 0.2s;
        }

        &:hover {
            background-color: ${Theme.highlight};

            img,
            .live-status,
            .viewers-count,
            .duration {
                transform: translate(8px, -8px);
            }
        }
    }

    .description-container {
        display: flex;
        justify-content: space-between;
        padding: 15px 10px;
        gap: 10px;

        .info-container {
            display: flex;
            align-items: start;
            gap: 10px;
            .profile-info {
                display: flex;
                flex-direction: column;
                align-items: start;
                gap: 10px;

                .title {
                    font-size: 16px;
                    font-weight: 600;
                    color: ${Theme.dark};
                    display: -webkit-box; // cut text
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    cursor: pointer;
                }

                .username {
                    font-size: 14px;
                    font-weight: 400;
                    color: ${Theme.lightDark};
                    line-height: 16px;
                    cursor: pointer;
                    transition: all 0.2s;

                    &:hover {
                        color: ${Theme.dark};
                    }
                }

                .tags {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    .tag {
                        font-size: 14px;
                        line-height: 16px;
                        color: ${Theme.lightDark};
                        padding: 3px 10px;
                        border-radius: 5px;
                        background-color: ${Theme.hover};
                        cursor: pointer;
                        transition: 0.2s;

                        &:hover {
                            background-color: ${Theme.midsoft};
                        }
                    }

                }

                .view-time {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 16px;
                    font-weight: 400;
                    color: ${Theme.lightDark};

                    .icon {
                        font-size: 8px;
                    }
                }
            }
        }

        .option {

        }
    }
`;

import styled, { keyframes } from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ReelItemContainer = styled.div`
    background-color: transparent;
    height: calc(100vh - 65px);
    padding: 120px 120px 120px 280px;
    display: flex;

    .view-container {
        background-color: ${Theme.dark};
        border-radius: 30px;
        height: 100%;
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
                transition: 0.1s;
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
                transition: 0.1s;
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
    }

    .view-container::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20%;
        background: linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.6));
    }

    .interaction-container {
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: center;
        gap: 30px;
        padding: 0 30px;

        .profile-container {
            position: relative;

            .follow-button {
                position: absolute;
                top: 70%;
                right: 50%;
                transform: translateX(50%);
                background-color: ${Theme.highlight};
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                .follow-icon {
                    font-size: 26px;
                    color: ${Theme.header};

                }

            }

            .follow-button.followed {
                background-color: ${Theme.header};
                border: 1px solid ${Theme.hover};

                .follow-icon {
                    color: ${Theme.highlight};
                }
            }
        }

        .like-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;

            .like-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 52px;
                width: 52px;
                padding: 10px;
                border-radius: 50%;
                cursor: pointer;
                transition: 0.1s;
                background-color: ${Theme.hover};
            }

            .like-count {
                font-size: 18px;
                font-weight: 500;
            }
        }

        .like-container.able {
            
        }

        .comment-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;

            .comment-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 52px;
                width: 52px;
                padding: 10px;
                border-radius: 50%;
                cursor: pointer;
                transition: 0.1s;
                background-color: ${Theme.hover};
          
            }

            .comment-count {
                font-size: 18px;
                font-weight: 500;
            }
        }

        .share-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;

            .share-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 52px;
                width: 52px;
                padding: 10px;
                border-radius: 50%;
                cursor: pointer;
                transition: 0.1s;
                background-color: ${Theme.hover};
                
            }

            .share-count {
                font-size: 18px;
                font-weight: 500;
            }
        }   
    }
`
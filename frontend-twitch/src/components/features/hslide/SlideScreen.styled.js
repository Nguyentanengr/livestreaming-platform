import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const SlideScreenContainer = styled.div`
    margin: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    height: 60vh;
    /* align-items: center; */




    &:hover {
        .left-arrow-btn, .right-arrow-btn {
            opacity: 1;
        }
    }

    .live-channel-container {
        background-color: ${Theme.dark};
        flex: 1;
        height: 80%;
        border-radius: 15px;
        overflow: hidden;
        /* border-radius: 30px; */
        .views {
            display: flex;
            align-items: center;
            gap: 5px;
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 16px;
            font-weight: 700;
            color: ${Theme.header};
            padding: 2px 12px;
            background-color: ${Theme.hotRed};
            border-radius: 5px;

            .views-icon {
                font-size: 10px;
                color: ${Theme.header};
            }
        }

        .user-container {
            display: flex;
            opacity: 0;
            transition: opacity 0.5s ease-out;
            /* display: flex; */
            position: absolute;
            bottom: 20px;
            left: 15px;
            padding: 10px;
            align-items: start;
            gap: 20px;
            z-index: 15;

            .user-avatar-container {
                position: relative;
                cursor: pointer;
                .user-avartar {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .user-status {
                    position: absolute;
                    bottom: 10px;
                    right: 50%;
                    transform: translateX(50%);
                    font-size: 18px;
                    font-weight: 600;
                    color: ${Theme.header};
                    background-color: ${Theme.hotRed};
                    padding: 1px 10px;
                    border-radius: 5px;
                }
            }

            .description {
                display: flex;
                flex-direction: column;
                align-items: start;
                gap: 10px;

                .user-name {
                    font-size: 16px;
                    font-weight: 500;
                    color: ${Theme.header};
                    cursor: pointer;
                    transition: color 0.3s;
                    display: flex;
                    align-items: center;
                    gap: 5px;

                    .icon {
                        font-size: 8px;
                        padding-top: 3px;
                    }

                    &:hover {
                        color: ${Theme.highlight};
                        text-decoration: underline;
                    }
                }

                .title {
                    font-size: 18px;
                    font-weight: 500;
                    width: 100%;
                    color: ${Theme.header};
                    cursor: pointer;
                    transition: color 0.3s;
                    display: -webkit-box; // cut text
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    
                    &:hover {
                        color: ${Theme.highlight};
                    }
                }

            }
        }

        &::before, &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            height: 50px;
            opacity: 0;
            transition: opacity 0.2s;
        }

        &::before {
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
            top: 0;
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
        }

        &::after {
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;
            bottom: 0;
            height: 150px;
            background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
        }

        &:hover::before, &:hover::after {
            opacity: 1;
        }

        &:hover .views, &:hover .user-container {
            display: flex;
            opacity: 1;
        }
    }
`
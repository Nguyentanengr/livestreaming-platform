import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const SlideScreenContainer = styled.div`
    padding: 50px 30px;
    display: flex;
    /* align-items: center; */

    .left-arrow-btn {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 50px;
        cursor: pointer;
        opacity: 0.3;
        padding: 0 150px 0 50px;
        transition: 0.2s;
        
        &:hover {
            opacity: 1;
        }
    }

    .right-arrow-btn {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 50px;
        cursor: pointer;
        opacity: 0.3;
        padding: 0 50px 0 150px;
        transition: 0.2s;
        
        &:hover {
            opacity: 1;
        }
    }

    .live-channel-container {
        position: relative;
        background-color: ${Theme.dark};
        /* border-radius: 30px; */

        .banner {
            display: flex;
            align-items: center;
            gap: 5px;
            position: absolute;
            top: 10px;
            right: 15px;
            padding: 3px 15px;
            font-size: 18px;
            font-weight: 700;
            text-transform: uppercase;
            color: ${Theme.header};
            border-radius: 7px;

            .hot-live-icon {
                font-size: 13px;
                color: ${Theme.hotRed};
            }
        }
        .views {
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            /* display: flex; */
            align-items: center;
            gap: 5px;
            position: absolute;
            top: 10px;
            left: 15px;
            font-size: 18px;
            font-weight: 700;
            color: ${Theme.header};
            padding: 3px 15px;
            background-color: ${Theme.shadow};

            .views-icon {
                font-size: 20px;
                stroke-width: 2;
                color: ${Theme.hotRed};
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
                    font-size: 22px;
                    font-weight: 800;
                    color: ${Theme.header};
                    cursor: pointer;
                    transition: color 0.3s;

                    &:hover {
                        color: ${Theme.highlight};
                        text-decoration: underline;
                    }
                }

                .title {
                    font-size: 18px;
                    font-weight: 500;
                    width: 50%;
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
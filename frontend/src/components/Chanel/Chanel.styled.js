import styled from "styled-components";


export const ChanelContainer = styled.div`
    .channel-box {
        margin-top: 10px;
        flex: 1;
        
        .live-screen {
            cursor: pointer;
            position: relative;
            transition: 0.2s;
            
            img {
                transition: 0.2s;
            }

            .live {
                position: absolute;
                top: 7%;
                left: 5%;
                color: #fff;
                background-color: red;
                padding: 2px 4px;
                font-size: 13px;
                text-transform: uppercase;
                font-weight: 500;
                border-radius: 5px;
                transition: 0.2s;
            }

            .viewers {
                position: absolute;
                bottom: 7%;
                left: 5%;
                padding: 2px 3px;
                font-size: 13px;
                color: #fff;
                background-color: rgba(0, 0, 0, 0.7);
                border-radius: 5px;
                transition: 0.2s;
            }

            .invisible {
                display: none;
            }

            // .video{}

            &:hover {
                background-color: ${(props) => props.theme.color};

                img,
                .live,
                .viewers {
                    transform: translate(6px, -3px);
                }
            }
        }
        .channel-info {
            display: flex;
            justify-content: space-between;
            padding: 5px;

            .left {
                display: flex;

                .pp {
                    display: block;

                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 999px;
                        cursor: pointer;
                    }
                }

                .profile-info {
                    padding: 0 10px;
                    font-size: 14px;
                    color: ${(props) => props.theme.textColor};

                    .title {
                        font-weight: 500;
                    }

                    .username {
                        padding: 5px 0;
                    }
                    
                    .username,
                    .game {
                        cursor: pointer;
                        color: ${(props) => props.theme.soft};
                    }

                    .tags {
                        display: flex;
                        margin-top: 5px;
                        gap: 5px;
                        align-items: center;

                        .tag {
                            padding: 4px 8px;
                            background-color: ${(props) => props.theme.hover};
                            border-radius: 10px;
                            cursor: pointer;
                        }
                    }
                }
            }

            .right {
                cursor: pointer;
            }
        }
    }

    @media (max-width: 1679px) {
        &:nth-last-child(1) {
            display: none;
        }
    }

    @media (max-width: 1439px) {
        &:nth-last-child(2) {
            display: none;
        }
    }

    @media (max-width: 1279px) {
        &:nth-last-child(3) {
            display: none;
        }
    }

    @media (max-width: 1023px) {
        &:nth-last-child(4) {
            display: none;
        }
    }
`
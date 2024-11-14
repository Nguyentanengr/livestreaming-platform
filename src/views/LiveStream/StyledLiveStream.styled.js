import styled from "styled-components";



export const StyledLiveStream = styled.div`  
    .livestream-box {
        display: flex;
        gap: 20px;

        .live {
            display: block;
            .live-info {
                position: relative;
                max-width: 1380px;
                video {
                    width: 1380px;
                }

                .title {
                    padding-top: 5px;
                    font-size: 16px;
                    font-weight: 500;
                    color: ${(props) => props.theme.textColor};
                }

            }

            .profile-info {
                max-width: 1380px;
                margin-top: 20px;
                padding: 0 15px;
                display: flex;
                gap: 30px;
                .pp {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;

                    img {
                        height: 50px;
                        width: 50px;
                        border-radius: 999px;
                        cursor: pointer;
                    }

                    .name {
                        font-size: 14px;
                        font-weight: 700;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 5px;
                        cursor: pointer;

                        .check {
                            font-size: 18px;
                            stroke-width: 0.5;
                            color: ${(props) => props.theme.color};
                        }
                    }
                }

                .info-detail {
                    display: flex;
                    flex-direction: column;   
                    justify-content: center; 
                    gap: 8px;
                    .title {
                        font-size: 14px;
                        font-weight: 700;
                    }

                    .tags {
                        display: flex;
                        gap: 10px;
                        align-items: center;

                        .tag {
                            padding: 2px 8px;
                            background-color: ${(props) => props.theme.hover};
                            border-radius: 10px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                            opacity: 0.7;
                        }
                    }

                    .viewers {
                        color: red;
                        font-size: 14px;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        
                        .user {
                            stroke-width: 0.8;
                            font-size: 15px;
                        }
                    }
                }

                .about-chanel {
                    padding-top: 10px;
                    flex: 1;
                    display: flex;
                    justify-content: end;
                    gap: 20px;
                    .follow {
                        button {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            padding: 8px 15px;
                            font-size: 14px;
                            font-weight: 600;
                            color: #fff;
                            background-color: ${(props) => props.theme.color};
                            border-radius: 5px;
                            cursor: pointer;

                            .icon-follow {
                                stroke-width: 1;
                                font-size: 18px;
                                transition: 0.2s;
                            }

                            &:hover {
                                .icon-follow {
                                    font-size: 18px;
                                    stroke-width: 3;
                                }
                            }
                        }
                    }
                    .report {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 35px;
                        height: 35px;
                        transition: 0.2s;
                        border-radius: 5px;
                        cursor: pointer;

                        &:hover {
                            background-color: #ddd;
                        }
                    }
                }
            }

            .about-streamer {
                max-width: 1380px;
                margin-top: 50px;
                padding: 0 15px;

                h1 {
                    font-size: 16px;
                }
                .info-box {
                    margin-top: 10px;
                    padding: 15px 15px;
                    max-width: 1350px;
                    background-color: ${(props) => props.theme.header};
                    
                    .followers {
                        font-size: 14px;
                        font-weight: 600;
                    }

                    p {
                        margin-top: 10px;
                        font-size: 14px;
                        opacity: 1;
                    }

                    hr {
                        border: none;
                        border-top: 1px solid #ccc;
                        width: 99%;
                        margin: 40px auto 20px;
                    }

                    .social-app {
                        display: flex;
                        gap: 40px;
                        align-items: center;

                        .label {
                            a {
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                
                                .icon {
                                    font-size: 20px;
                                }
                            }
                        }
                    }
                }
            }


            .sponsored-by {
                max-width: 1380px;
                margin-top: 50px;
                padding: 0 15px;

                h1 {
                    font-size: 16px;
                }
                .sponsors {
                    margin-top: 10px;
                    padding: 15px 15px;
                    max-width: 1350px;
                    background-color: ${(props) => props.theme.header};
                    display: flex;
                    gap: 10px;

                    .sponsor {
                        img {
                            width: 400px;
                        }
                    }
                }
            }
        }
    }
`
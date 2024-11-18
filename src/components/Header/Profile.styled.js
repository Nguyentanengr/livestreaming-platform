import styled from "styled-components";



export const ProfileContainer = styled.div`
    position: relative;

    .profile {
        width: 30px;
        height: 30px;
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        background-color: deeppink;
        font-size: 22px;
        cursor: pointer;
    }

    .profile-menu {
        display: none;
        position: absolute;
        width: 200px;
        height: 400px;
        background-color: ${(props) => props.theme.header};
        color: ${(props) => props.theme.textColor};
        border-radius: 10px;
        box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.1);
        top: 35px;
        right: 0px;
        z-index: 15;
        padding: 10px;
        animation: pageAnim 0.3s;

        .menu-box {
            width: 100%;
            font-size: 16px;

            hr {
                background-color: ${(props) => props.theme.border};
                height: 1px;
                margin: 10px 0;
            }

            .self-profile {
                display: flex;
                align-items: center;

                .pp {
                    width: 40px;
                    height: 40px;
                    border-radius: 100px;
                    background-color: deeppink;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 30px;
                    cursor: pointer;
                }

                .info {
                    display: block;
                    padding: 10px;
                    font-size: 14px;

                    .username {
                        font-weight: 600;
                        padding: 3px 0;
                    }

                    .status {
                        display: flex;
                        align-items: center;
                        color: ${(props) => props.theme.soft};

                        .status-icon {
                            font-size: 7px;
                        }

                        .status-icon.online{
                            color: limegreen;
                        }

                        span {
                            font-size: 13px;
                            margin-left: 5px;
                        }
                    }
                }
            }

            .menu-list {
                display: block;

                li {
                    width: 100%;
                    padding: 8px 5px;
                    transition: 0.3s;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;

                    .item {
                        display: flex;
                        align-items: center;
                        font-size: 18px;
                        
                        span {
                            margin-left: 8px;
                            font-size: 13px;
                        }
                    }

                    &:hover {
                        background-color: ${(props) => props.theme.border};
                    }
                }
            }

        }
    }

    .show {
        display: block;
    }
`
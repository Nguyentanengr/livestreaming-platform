import styled from "styled-components";

export const LiveInfoContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    padding: 0 15px;
    display: flex;
    gap: 30px;

    .streamer {
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
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            font-size: 16px;
            font-weight: 700;
            color: ${(props) => props.theme.textColor};
            cursor: pointer;

            .check {
                font-size: 14px;
                stroke-width: 0.5;
                color: ${(props) => props.theme.color};
            }
        }
    }

    .about-video {
        display: flex;
        flex-direction: column;   
        justify-content: center; 
        gap: 8px;

        .title {
            font-size: 16px;
            font-weight: 700;
            color: ${(props) => props.theme.textColor};
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
                color: ${(props) => props.theme.textcolor};
                opacity: 0.7;
            }
        }

        .viewers {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 14px;
            font-weight: 700;
            color: red;
            
            .user {
                stroke-width: 0.8;
                font-size: 15px;
            }
        }
    }

    .about-chanel {
        flex: 1;
        display: flex;
        justify-content: end;
        gap: 20px;
        padding-top: 10px;
        
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
`
import styled from "styled-components";



export const PresentPreviewContainer = styled.div`
    width: 800px;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 2px solid rgba(0, 0, 0, 0.1);

    .present-screen {
        width: 100%;
    }

    .go-stream {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 20px;
        background-color:  ${(props) => props.theme.header};

        .timer {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            font-size: 25px;

            .time {
                font-size: 14px;
                color: ${(props) => props.theme.textColor};
                opacity: 0.9;
            }
        }

        .go-live {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            padding: 8px 10px;
            border-radius: 5px;
            background-color: ${(props) => props.theme.color};
            cursor: pointer;

            .live-icon {
                font-size: 8px;
                color: ${(props) => props.theme.header};
            }

            .live-text {
                font-size: 14px;
                font-weight: 600;
                color: ${(props) => props.theme.header};
            }
        }

        .go-live.on {
            background-color: red;
        }
    }

    .quick-actions {
        width: 100%;
        flex-grow: 1;
        background-color: ${(props) => props.theme.header};
        .action-list {
            margin: 15px 15px;
            ul {
                display: flex;
                gap: 10px;

                .item {
                    padding: 10px 20px;
                    cursor: pointer;
                    border-radius: 5px;
                    background-color: ${(props) => props.theme.color};
                    .icon {
                        font-size: 25px;
                        stroke-width: 1;
                        color: ${(props) => props.theme.header};
                        margin-bottom: 20px;
                    }

                    .action-name {
                        font-size: 16px;
                        font-weight: 600;
                        color: ${(props) => props.theme.header};
                    }
                }

                .item-blank {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 150px;
                    padding: 10px 20px;
                    cursor: pointer;
                    border-radius: 5px;
                    background-color: ${(props) => props.theme.hover};

                    .icon {
                        font-size: 25px;
                        stroke-width: 1;
                        color: ${(props) => props.theme.textColor};
                    }
                }
            }
        }
    }
`
import styled from "styled-components";


export const ActionPreviewContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    .actions {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        padding: 20px 15px;
        background-color: ${(props) => props.theme.header};

        .text {
            display: block;
            width: 180px;
            font-size: 16px;
            font-weight: 600;
        }

        textarea {
            width: 300px;
            height: 60px;
            border-radius: 5px;
            border: 1px solid rgba(0,0,0,0.3);
            font-size: 14px;
            resize: none;
            padding: 5px 10px;
            font-family: inherit;

            &:focus {
                border: 3px solid ${(props) => props.theme.color};
            }
        }

        input {
            width: 300px;
            padding: 5px 5px;
            height: 35px;
            font-family: inherit;
            font-size: 14px;
            border-radius: 5px;
            border: 1px solid rgba(0,0,0,0.3);
            &:focus {
                border: 3px solid ${(props) => props.theme.color};
            }
        }

        .title {
            display: flex;
            margin-bottom: 30px;
        }

        .notification {
            display: flex;
            margin-bottom: 30px;
        }

        .category {
            display: flex;
            margin-bottom: 30px;

            .category-box {
                display: flex;
                flex-direction: column;
                gap: 10px;

                .selected {
                    display: flex;
                    width: 300px;
                    border-radius: 5px;
                    background-color: #eee;

                    img {
                        width: 80px;
                        border-top-left-radius: 5px;
                        border-bottom-left-radius: 5px;
                    }

                    .name {
                        padding: 5px 10px;
                        font-size: 14px;
                        font-weight: 500;
                    }

                    .gap {
                        flex: 1;
                    }

                    .icon {
                        font-size: 22px;
                        cursor: pointer;
                    }
                }
            }
        }

        .tags {
            display: flex;
            margin-bottom: 40px;

            .tag-list {
                margin-top: 10px;
                display: flex;
                gap: 20px;
                width: 300px;

                .tag {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    background-color: #eee;
                    border-radius: 5px;
                    padding: 2px 5px;
                    font-size: 14px;
                    font-weight: 500;
                    opacity: 0.7;
                    cursor: pointer;
                }
            }

            .add-button {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #eee;
                font-size: 14px;
                font-weight: 500;
                border-radius: 5px;
                cursor: pointer;
                margin-left: 10px;
                color: ${(props) => props.theme.textColor};
                padding: 0 5px;
                height: 35px;
            }
        }


        .branded-content {
            display: flex;
            align-items: start;
            margin-bottom: 30px;

            .checkbox {
                flex: 1;
                display: flex;
                gap: 10px;
                align-items: start;
                font-size: 14px;
            }
        }

        .private {
            display: flex;

            .options {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 10px;

                .checkbox {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 14px;
                }
            }
        }

        .branded-content .checkbox input,
        .private .checkbox input {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(0, 0, 0, 0.3);
            border-radius: 4px;
            background-color: white;
            cursor: pointer;
            transition: background-color 0.3s, border-color 0.3s;

            &:checked {
                background-color: ${(props) => props.theme.color};
                border-color: ${(props) => props.theme.color};
                position: relative;
            }

            &:checked::after {
                content: '';
                position: absolute;
                width: 5px;
                height: 10px;
                border: solid white;
                border-width: 0 2px 2px 0;
                transform: translate(50%, -50%) rotate(45deg);
                top: 45%;
                left: 10%;
            }
        }

        .save {
            flex: 1;
            display: flex;
            justify-content: end;
            align-items: end;
            
            .button-save {
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                color: ${(props) => props.theme.header};
                width: 80px;
                height: 35px;
                padding: 5px 10px;

                background-color: ${(props) => props.theme.color};
            }
        }
    }

`
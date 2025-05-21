import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const SignUpContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 25;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;

    .sign-up-form {
        position: relative;
        width: 33vw;
        /* height: 65vh; */
        background-color: ${Theme.header};
        border-radius: 5px;
        padding: 30px 50px 50px 50px; 
        display: flex;
        flex-direction: column;
        gap: 25px;

        .close-icon {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent;
            transition: 0.1s;
            border-radius: 5px;
            font-size: 25px;
            cursor: pointer;

            &:hover {
                background-color: ${Theme.hover};
            }
        }

        .header-container {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px 0px;

            .title-header {
                font-size: 24px;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 10px;

                .t-icon {
                    font-size: 60px;
                    color: ${Theme.highlight}
                }
            }
        }

        .input-container {
            display: flex;
            flex-direction: column;

            .email-input .input input {
                height: 40px;
                width: 100%;
                font-size: 14px;
                background-color: transparent;
                border: 1px solid ${Theme.mediumSoft};
                border-radius: 5px;
                padding: 0 10px;
                font-size: sans-serif;
                font-weight: 400;

                &:hover {
                    border: 1px solid ${Theme.soft};
                }

                &:focus {
                    border: 4px solid ${Theme.highlight};
                }
            }

            .password-input .input input {
                height: 40px;
                width: 100%;
                font-size: 14px;
                background-color: transparent;
                border: 1px solid ${Theme.mediumSoft};
                border-radius: 5px;
                padding: 0 10px;
                font-size: sans-serif;
                font-weight: 400;

                &:hover {
                    border: 1px solid ${Theme.soft};
                }

                &:focus {
                    border: 4px solid ${Theme.highlight};
                }
            }

            .title {
                font-size: 16px;
                font-weight: 500;
            }

            .email-input, .password-input, .otp-input {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .password-input, .otp-input {
                margin-top: 25px;
            }

            .otp-input .input-send {
                display: flex;
                
                .input {
                    flex: 1;
                    input {
                        height: 40px;
                        width: 100%;
                        font-size: 14px;
                        background-color: transparent;
                        border: 1px solid ${Theme.mediumSoft};
                        border-top-left-radius: 5px;
                        border-bottom-left-radius: 5px;
                        padding: 0 10px;
                        font-size: sans-serif;
                        font-weight: 400;

                        &:hover {
                            border: 1px solid ${Theme.soft};
                        }

                        &:focus {
                            border: 4px solid ${Theme.highlight};
                        }
                    }
                }
                .send {
                    display: flex;
                    width: 130px;
                    align-items: center;
                    justify-content: center;
                    padding: 2px 15px;
                    font-size: 16px;
                    font-weight: 500;
                    color: ${Theme.header};
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                    background-color: ${Theme.highlight};
                    cursor: pointer; 
                }

                .send.lock {
                    cursor: not-allowed;
                }
            }

            .error-email, .error-code {
                color: ${Theme.hotRed};
                padding-top: 5px;
                font-size: 14px;
                display: none;
            }

            .error-email.highlight, .error-code.highlight, .error-password.highlight {
                display: block;
            }

            .error-password {
                padding-top: 5px;
                font-size: 14px;
                color: ${Theme.hotRed};
                display: none;
            }

            .term {
                margin-top: 30px;
                color: ${Theme.dark};
                font-size: 14px;
                display: inline;

                h4 {
                    display: inline;
                    font-weight: 400;
                    text-decoration: underline;
                    color: ${Theme.highlight};
                    cursor: pointer;
                }

                
            }
            
        }

        .footer-container {
            display: flex;
            flex-direction: column;
            gap: 30px;

            .sign-up-btn.lock {
                cursor: not-allowed;
            }

            .login {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                background-color: transparent;
                border-radius: 5px;
                padding: 10px 0;
                color: ${Theme.highlight};

                &:hover {
                    background-color: ${Theme.hover};
                    color: ${Theme.dark};
                }
            }
        }
    }
`
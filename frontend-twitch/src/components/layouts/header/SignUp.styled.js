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
                font-size: 28px;
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

            .title {
                font-size: 18px;
                font-weight: 500;
            }

            .username-input, .password-input, .email-input {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .password-input, .email-input {
                margin-top: 25px;
            }

            .term {
                margin-top: 30px;
                color: ${Theme.dark};
                font-size: 16px;
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

            .login {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
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
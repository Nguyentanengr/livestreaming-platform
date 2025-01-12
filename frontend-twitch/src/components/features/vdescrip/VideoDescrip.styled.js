import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";


export const VideoDescripContainer = styled.div`
    height: 100%;
    background-color: transparent;
    border: 1px solid ${Theme.hover};
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;

    .title {
        font-size: 22px;
        font-weight: 700;
        
    }

    .box {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 30px;

        .t-description,
        .t-thumb,
        .t-alow,
        .t-com {
            font-size: 20px;
            font-weight: 500;
            padding: 10px 0;
        }

        .thumb-container {
            display: flex;
            flex-direction: column;
            

            .thumb {
                background-color: ${Theme.header};
                padding: 30px 40px;
                border-radius: 5px;
                border: 1px dashed ${Theme.mediumSoft};
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;

                .text {
                    font-size: 18px;
                    color: ${Theme.soft};
                }

                .icon {
                    font-size: 30px;
                    opacity: 0.7;
                }

                &:hover {
                    border: 1px dashed ${Theme.lightDark};
                }
            }
        }

        .com-container {
            display: flex;
            gap: 15px;
            align-items: center;
        }
    }

    .post-button {
        display: flex;
        justify-content: end;
    }
`
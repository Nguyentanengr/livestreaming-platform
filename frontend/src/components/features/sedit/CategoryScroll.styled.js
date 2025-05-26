import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";


export const CategoryScrollContainer = styled.div`
    .scroll-box {
        width: 350px;
        max-height: 400px;
        background-color: ${Theme.header};
        box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
        display: flex;
        border-radius: 5px;
        flex-direction: column;
        overflow-y: auto;

        ::-webkit-scrollbar {
            width: 5px;
        }

        ::-webkit-scrollbar-thumb {
            background-color: ${Theme.mediumSoft};
            border-radius: 5px;
        }

        .cate-item {
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            display: flex;
            gap: 15px;
            cursor: pointer;
            background-color: transparent;

            &:hover {
                background-color: ${Theme.hover};
            }

            .thumbnail {
                img {
                    width: 50px;
                    height: 65px;
                    object-fit: cover;
                    display: block;
                }
            }

            .description {
                display: flex;
                flex-direction: column;
                gap: 5px;
                padding: 5px 0;

                .name {
                    font-size: 16px;
                    font-weight: 500;

                }

                .interested {
                    display: flex;
                    gap: 5px;
                    font-size: 14px;
                    font-weight: 500;
                    color: ${Theme.dark};

                    .text {
                        font-weight: 400;
                        color: ${Theme.lightDark};
                    }
                }
            }
        }
    }
`
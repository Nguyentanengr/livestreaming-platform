import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const EditBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    .edit-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px 20px 100px 20px;
        overflow-y: auto;

        ::-webkit-scrollbar {
            display: none;
        }

        .title-container,
        .noti-container,
        .category-container,
        .tag-container,
        .thumbnail-container,
        .comment-container,
        .visibility-container {
            display: flex;
            flex-direction: column;
            gap: 5px;
            
            
        }

        .thumbnail-container {
            display: flex;
            flex-direction: column;
            

            .add-area {
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

        .category-container {
            position: relative;

            .scroll-container {
                position: absolute;
                top: 110%;
                left: 0%;
                z-index: 20;
            }

            .cate-select-container {
                display: flex;
                align-items: start;
                justify-content: space-between;
                gap: 15px;
                background-color: ${Theme.hover};
                border-radius: 5px;

                .thumbnail {
                    img {
                        width: 70px;
                        height: 95px;
                        object-fit: cover;
                        display: block;
                        border-top-left-radius: 5px;
                        border-bottom-left-radius: 5px;
                    }
                }

                .description {
                    flex: 1;
                    background-color: transparent;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding-top: 10px;
                    color: ${Theme.dark};

                    .name { 
                        font-size: 20px;
                        font-weight: 600;
                    }

                    .interested {
                        display: flex;
                        gap: 5px;
                        font-size: 18px;
                        font-weight: 500;
                        
                        .text {
                            font-weight: 400;
                            color: ${Theme.lightDark};                            
                        }
                    }

                }
                .close-icon {
                    padding: 5px;
                    font-size: 35px;
                    cursor: pointer;
                    border-radius: 5px;
                    transition: 0.2s;

                    &:hover {
                        stroke-width: 3;
                    }
                }
            }

        }

        .tag-container {
            
            .tag-input {
                flex-grow: 1;
            }

            .select-container {
                display: flex;
                gap: 10px;

                .tag-select {
                    padding: 0 5px;
                    background-color: ${Theme.hover};
                    border-radius: 5px;
                    display: flex;
                    align-items: center;

                    .text {
                        padding: 0 10px;
                    }

                    .tag-icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 20px;
                        height: 35px;
                        cursor: pointer;
                        color: ${Theme.dark};
                        transition: 0.2s;

                        &:hover {
                            stroke-width: 3;
                        }
                    }
                }

            }
        }

        .save-button {
            margin-top: 20px;
            display: flex;
            justify-content: end;
        }
    }
    .save-button {
        padding: 20px 50px;
        display: flex;
        justify-content: end;
    }
`
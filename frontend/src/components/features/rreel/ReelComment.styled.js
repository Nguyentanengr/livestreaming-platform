import styled, { keyframes } from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

const slideIn = keyframes`
    from {
        opacity: 0;
        width: 0%;
    }
    to {
        opacity: 1;
        width: 23%;
    }
`;

export const ReelCommentContainer = styled.div`
    width: 23%;
    background-color: ${Theme.header};
    animation: ${slideIn} 0.3s ease-in-out;
    border-radius: 10px;
    border: 1px solid ${Theme.hover};

    .comment-container {
        display: flex;
        flex-direction: column;

        .line {
            width: 100%;
            height: 1px;
            background-color: ${Theme.hover};
        }

        .comment-list-container {
            padding: 10px;
            height: 400px;
            display: flex;
            background-color: transparent;
            flex-direction: column;
            overflow-y: auto;
            overscroll-behavior: contain;
            gap: 30px;

            .comment-item {
                display: flex;
                align-items: start;
                gap: 15px;

                .comment-info {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: start;
                    gap: 5px;

                    .username {
                        font-size: 16px;
                        font-weight: 500;
                        cursor: pointer;

                        &:hover {
                            text-decoration: underline;
                        }
                    }

                    .content {
                        font-size: 16px;
                        width: 100%;
                        -webkit-line-clamp: 5;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        word-break: break-word;
                        display: -webkit-box;
                    }

                    .sub-info {
                        padding-right: 30px;
                        display: flex;
                        justify-content: space-between;
                        align-items: start;
                        color: ${Theme.soft};
                        font-size: 16px;

                        .like-count {
                            display: flex;
                            align-items: center;
                            gap: 5px;
                            cursor: pointer;

                            .like-icon {
                                font-size: 15px;
                            }
                        }

                        .menu-dots {
                            position: relative;
                            cursor: pointer;

                            .more-icon {
                                font-size: 20px;
                                color: ${Theme.soft};
                            }

                            .dropdown-menu {
                                display: none;
                                position: absolute;
                                right: 0;
                                top: 100%;
                                background-color: ${Theme.header};
                                border: 1px solid ${Theme.hover};
                                border-radius: 5px;
                                padding: 5px;
                                z-index: 10;
                                min-width: 80px;

                                button {
                                    background: none;
                                    border: none;
                                    cursor: pointer;
                                    font-size: 14px;
                                    color: ${Theme.soft};
                                    width: 100%;
                                    text-align: left;
                                    padding: 2px 5px;

                                    &:hover {
                                        color: ${Theme.highlight};
                                    }
                                }
                            }

                            &:hover .dropdown-menu {
                                display: block;
                            }
                        }

                        .reply-btn {
                            cursor: pointer;
                        }
                    }
                }
            }

            &::-webkit-scrollbar {
                width: 3px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: ${Theme.hover};
                border-radius: 10px;
                cursor: pointer;
            }
        }
    }
`;
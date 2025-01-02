import styled, { keyframes } from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

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
            padding: 20px 20px;
            height: 550px;
            display: flex;
            background-color: transparent;
            flex-direction: column;
            overflow-y: auto;
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
                        font-size: 18px;
                        font-weight: 500;
                        cursor: pointer;

                        &:hover {
                            text-decoration: underline;
                        }
                    }

                    .content {

                        font-size: 18px;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                    }

                    .sub-info {
                        padding-right: 30px;
                        display: flex;
                        justify-content: space-between;
                        align-items: start;
                        color: ${Theme.soft};
                        font-size: 18px;
                    

                        .like-count {
                            display: flex;
                            align-items: center;
                            gap: 5px;
                            cursor: pointer;
                        }

                        .reply-btn {
                            cursor: pointer;
                        }
                       
                    }
                }
            }

            &::-webkit-scrollbar {
                width: 5px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: ${Theme.hover};
                border-radius: 10px;
                cursor: pointer;
            }
            
        }
    }
`
import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";


export const ChatListContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    

    ::-webkit-scrollbar {
        display: none;
    }

    .chat-item {
        display: flex;
        gap: 20px;
        padding: 5px 15px;
        transition: 0.2s;
        cursor: pointer;

        .thumbnail {

        }

        .content {
            flex: 1;
            display: flex;
            align-items: center;
            
            .box {
                display: inline;
                .username {
                    display: inline;
                    margin-right: 10px;
                    font-size: 18px;
                    font-weight: 500;
                    
                    color: ${Theme.highlight};

                    &:hover {
                        text-decoration: underline;
                        text-decoration-thickness: 2px;
                    }

                }

                .text {
                    display: inline;
                    font-size: 18px;
                    color: ${Theme.dark}

                }
            }
        }

        .more-icon {
            font-size: 20px;
        }

        &:hover {
            background-color: ${Theme.hover};
        }
    }

`
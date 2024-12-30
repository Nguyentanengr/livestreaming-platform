import styled, { keyframes } from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ReelItemContainer = styled.div`
    background-color: transparent;
    height: calc(100vh - 65px);
    padding: 120px 120px 120px 280px;
    display: flex;

     .view-container {
        background-color: ${Theme.dark};
        border-radius: 30px;
        height: 100%;
        video {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
            border-radius: 30px;
        }
    }

    .interaction-container {
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: center;
        gap: 30px;
        padding: 0 30px;

        .like-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;

            .like-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 52px;
                width: 52px;
                padding: 10px;
                border-radius: 50%;
                cursor: pointer;
                transition: 0.1s;
                background-color: ${Theme.hover};
            }

            .like-count {
                font-size: 18px;
                font-weight: 500;
            }
        }

        .like-container.able {
            
        }

        .comment-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;

            .comment-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 52px;
                width: 52px;
                padding: 10px;
                border-radius: 50%;
                cursor: pointer;
                transition: 0.1s;
                background-color: ${Theme.hover};
          
            }

            .comment-count {
                font-size: 18px;
                font-weight: 500;
            }
        }

        .share-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;

            .share-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 52px;
                width: 52px;
                padding: 10px;
                border-radius: 50%;
                cursor: pointer;
                transition: 0.1s;
                background-color: ${Theme.hover};
                
            }

            .share-count {
                font-size: 18px;
                font-weight: 500;
            }
        }   
    }
`
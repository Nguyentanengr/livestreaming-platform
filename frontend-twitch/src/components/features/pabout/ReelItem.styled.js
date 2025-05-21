import styled, { keyframes } from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const ReelItemContainer = styled.div`
    width: calc((100% - 60px) / 3);
    animation: ${fadeIn} 0.3s ease-out forwards;
    .thumbnail-container {
        position: relative;
        cursor: pointer;
        width: 100%;
        aspect-ratio: 16 / 9;
        background-color: ${Theme.lightSoft};
        transition: 0.2s;
        border-radius: 8px;

        .like-count-container {
            display: flex;
            align-items: center;
            position: absolute;
            bottom: 12px;
            right: 10px;
            font-size: 14px;
            font-weight: 500;
            color: ${Theme.header};
            border-radius: 1px;
            padding: 2px 8px;
            background-color: ${Theme.boldShadow};
            transition: 0.2s;
            border-radius: 4px;

            .like-icon {
                width: 16px;
                height: 16px;
                margin-right: 4px;
                fill: ${Theme.header};
            }
        }


        &:hover {
            background-color: ${Theme.highlight};

            img,
            .live-status,
            .viewers-count,
            .like-count-container,
            .duration {
                transform: translate(8px, -8px);
            }
        }

        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.2s;
            display: block;
            border-radius: 8px;
        }

       
       

        .option {

        }
    }
`;

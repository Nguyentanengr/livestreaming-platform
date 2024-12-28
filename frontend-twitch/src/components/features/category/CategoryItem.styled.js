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

export const CategoryItemContainer = styled.div`
    width: calc((100% - 100px) / 4);
    animation: ${fadeIn} 0.3s ease-out forwards;

   .thumbnail-container {
        position: relative;
        width: 100%;
        aspect-ratio: 4.5 / 6;
        background-color: ${Theme.highlight};
        cursor: pointer;
        transition: 0.2s;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.2s;
            display: block;
        }

        .popular-tag {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 4px 8px;
            font-size: 14px;
            line-height: 14px;
            text-transform: uppercase;
            font-weight: 700;
            color: ${Theme.dark};
            background-color: ${Theme.pink};
            border-radius: 10px;
            transition: 0.2s;
        }

        &:hover {
            background-color: ${Theme.pink};

            img,
            .popular-tag {
                transform: translate(8px, -8px);
            }
        }
   }

   .description-container {
        display: flex;
        align-items: start;
        justify-content: space-between;
        padding: 10px 0;

        .info-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: start;

            .title {
                font-size: 18px;
                font-weight: 600;
                color: ${Theme.dark};
                display: -webkit-box; // cut text
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: pointer;
                transition: 0.2s;

                &:hover {
                    color: ${Theme.pink};
                }
            }

            .interested {
                font-size: 16px;
                font-weight: 500;
                color: ${Theme.soft};
            }

        }

        .option {

        }
   }
`
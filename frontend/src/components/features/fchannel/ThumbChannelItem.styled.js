
import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";


export const ThumbChannelItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    .thumb-container {
        position: relative;

        .thumb-border {
            background-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;
            transition: 0.2s;

            &.highlight {
                border: 5px solid ${Theme.hotRed};
            }

            &.unhighlight {
                border: 5px solid ${Theme.mediumSoft};
            }

            
        }

        .span-live {
            position: absolute;
            top: 70%;
            right: 50%;
            transform: translateX(50%);
            padding: 0 10px;
            font-size: 20px;
            font-weight: 500;
            border-radius: 5px;
            background-color: ${Theme.hotRed};
            text-transform: uppercase;
            color: ${Theme.header};


        }



    }

    .username {
        font-size: 20px;
        font-weight: 500;
        color: ${Theme.dark};
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
            color: ${Theme.highlight};
        }
    }
`

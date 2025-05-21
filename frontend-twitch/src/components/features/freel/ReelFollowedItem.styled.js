import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const ReelFollowedItemContainer = styled.div`
    position: relative;
    cursor: pointer;

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: 0.3s ease; 
    }

    .duration {
        position: absolute;
        top: 10px;
        right: 20px;
        z-index: 1px;
        background-color: ${Theme.boldShadow};
        color: ${Theme.header};
        padding: 0px 7px;
        border-radius: 2px;
        font-size: 14px;
        font-weight: 500;
    }

    .reel-info {
        position: absolute;
        bottom: 30px;
        left: 20px;
        z-index: 1px;
        font-size: 14px;
        font-weight: 500;
        color: ${Theme.header};

        .title {
            font-size: 16px;
        }
        .username {
            opacity: 0.8;
        }

    }

    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30%;
        background: linear-gradient(
            to top, 
            rgba(0, 0, 0, 0.5), 
            rgba(0, 0, 0, 0)
        );
    }

    &:hover img {
        transform: scale(1.1); /* Zoom 1.05 lần */
        opacity: 0.7;
    }

`;
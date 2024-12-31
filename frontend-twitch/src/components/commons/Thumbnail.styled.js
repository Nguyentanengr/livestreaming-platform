import styled from "styled-components";

export const ThumbnailContainer = styled.div`
    img {
        width: 42px;
        height: 42px;
        border-radius: 100px;
        object-fit: cover;
        cursor: pointer;

        &.large {
            width: 52px;
            height: 52px;
        }

        &.small {
            width: 32px;
            height: 32px;
        }
    }
`

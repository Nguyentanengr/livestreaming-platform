import styled from "styled-components";

export const PresentScreenContainer = styled.div`
    width: 100%;
    position: relative;
    overflow: hidden;

    video {
        width: 100%;
    }

    .live {
        opacity: 0;
        position: absolute;
        top: 2%;
        right: 2%;
        text-transform: uppercase;
        font-size: 14px;
        color: #fff;
        background-color: red;
        padding: 0px 8px;
        border-radius: 2px;
        transition: 0.2s;
    }

    &:hover .live {
        opacity: 1;
    }

    // tạo phần tử giả

    &::before, &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: 50px;
        opacity: 0;
        transition: opacity 0.2s;
    }

    &::before {
        top: 0;
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
    }

    &::after {
        bottom: 5px;
        height: 10px;
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
    }

    &:hover::before, &:hover::after {
        opacity: 1;
    }

`
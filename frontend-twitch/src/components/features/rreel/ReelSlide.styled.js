import styled from "styled-components";

export const ReelSlideContainer = styled.div`
    .reel-container {
        position: fixed;
        right: 100px;
        left: 80px;
        top: 65px;
        bottom: 0;
        overflow-y: auto;
      
        &::-webkit-scrollbar {
            display: none;
        }
        
    }

`
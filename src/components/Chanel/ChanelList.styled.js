import styled from "styled-components";


export const ChanelListContainer = styled.div`
    .chanels-box {
        display: block;
        margin-top: 30px;
        color: ${(props) => props.theme.textColor};

        h1 {
            font-size: 18px;
            font-weight: 500;
            padding 5px 0;
        }

        .list {
            display: flex;
            gap: 10px;
        }
        height: 2000px;
    }
    
`
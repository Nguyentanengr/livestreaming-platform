import styled from "styled-components";



export const LiveSponsorContainer = styled.div`
    margin-top: 50px;
    padding: 0 15px;

    h1 {
        font-size: 16px;
        margin-left: 5px;
        color: ${(props) => props.theme.textColor};
    }

    .sponsor-box {
        margin-top: 10px;
        padding: 30px 20px;
        background-color: ${(props) => props.theme.header};
        display: flex;
        gap: 10px;
        height: 500px;

        .sponsor {
            img {
                width: 400px;
            }
        }
    }
`
import styled from "styled-components";

export const LiveAuthorContainer = styled.div`
    width: 100%;
    margin-top: 50px;
    padding: 0 15px;

    h1 {
        font-size: 16px;
        margin-left: 5px;
        color: ${(props) => props.theme.textColor};
    }

    .author-info {
        width: 100%;
        margin-top: 10px;
        padding: 20px 15px 30px;
        background-color: ${(props) => props.theme.header};
        border-radius: 5px;
        
        .followers {
            font-size: 16px;
            font-weight: 600;
            color: ${(props) => props.theme.textColor};
        }

        p {
            margin-top: 10px;
            font-size: 14px;
            color: ${(props) => props.theme.soft};
            opacity: 1;
        }

        hr {
            border: none;
            border-top: 1px solid #ccc;
            width: 99%;
            margin: 40px auto 20px;
        }

        .social-platform {
            display: flex;
            gap: 40px;
            align-items: center;

            .label {
                a {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: ${(props) => props.theme.textColor};
                    opacity: 0.8;
                    transition: 0.2s;
                    .icon {
                        font-size: 20px;
                    }
                    
                    &:hover {
                        opacity: 1;
                        color: ${(props) => props.theme.color};
                    }
                }
            }
        }
    }
`
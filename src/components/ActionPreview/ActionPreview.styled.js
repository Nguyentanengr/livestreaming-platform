import styled from "styled-components";


export const ActionPreviewContainer = styled.div`
    flex: 1;

    .actions {
        padding: 20px 15px;
        background-color: ${(props) => props.theme.header};

        .text {
            display: block;
            width: 180px;
            font-size: 16px;
            font-weight: 600;
        }

        textarea {
            width: 300px;
            height: 60px;
            border-radius: 5px;
            border: 1px solid rgba(0,0,0,0.3);
            font-size: 14px;
            resize: none;
            padding: 5px 10px;
            font-family: inherit;

            &:focus {
                border: 3px solid ${(props) => props.theme.color};
            }
        }

        input {
            width: 300px;
            padding: 5px 5px;
            height: 35px;
            font-family: inherit;
            font-size: 14px;
            border-radius: 5px;
            border: 1px solid rgba(0,0,0,0.3);
            &:focus {
                border: 3px solid ${(props) => props.theme.color};
            }
        }

        .title {
            display: flex;
            margin-bottom: 30px;
        }

        .notification {
            display: flex;
            margin-bottom: 30px;
        }

        .category {
            display: flex;
            margin-bottom: 30px;
        }

        .tags {
            display: flex;
            margin-bottom: 30px;

            .add-button {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: ${(props) => props.theme.color};
                font-size: 14px;
                font-weight: 500;
                border-radius: 5px;
                cursor: pointer;
                margin-left: 10px;
                color: ${(props) => props.theme.header};
                padding: 0 5px;
            }
        }

        .branded-content {
            .text {
                width: 300px;
            }
            display: flex;

            .check-box {
                display: flex;
            }
        }

        .private {
            display: flex;
        }
    }

`
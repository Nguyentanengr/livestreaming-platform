import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const CategoryInfoContainer = styled.div`
    padding: 30px 30px 20px;
    gap: 50px;

    .info-detail {
        display: flex;
        gap: 20px;

        .thumbnail {
            img {
                width: 220px;
                height: auto;
                object-fit: cover;
                border-radius: 5px;
            }
        }

        .detail {
            max-width: 50%;
            .name {
                font-size: 22px;
                font-weight: 700;

            }

            .interested {
                display: flex;
                align-items: center;
                color: ${Theme.soft};
                margin-top: 3px;
                gap: 5px;
            }

            .des {
                margin-top: 10px;
                font-size: 17px;
                color: ${Theme.soft};
            }
        }
    }

    .follow-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 8px 20px;
        background-color: ${Theme.highlight};
        color: ${Theme.header};
        font-weight: 700;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
        width: 200px;

        .icon {
            font-size: 16px;
        }
    }

`;
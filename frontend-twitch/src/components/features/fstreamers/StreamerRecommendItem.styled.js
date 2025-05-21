import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const StreamerRecommendItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    min-width: 23%;
    border-radius: 10px;
    border: 1px solid ${Theme.hover};
    margin-bottom: 30px;

    .info {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;


        .thumbnail {
        }

        .info-detail {
            .username {
                font-weight: 500;
            }
            .followers {
                font-size: 14px;
                color: ${Theme.soft}
            }
        }
    }

    .action {
    }
`;
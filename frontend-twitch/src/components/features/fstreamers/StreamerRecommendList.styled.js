import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const StreamerRecommendListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px 30px;

    .title {
        font-size: 18px;
        font-weight: 700;
    }

    .recomment-area {
        display: flex;
        gap: calc((100% - 92%) / 3);
        flex-wrap: wrap;
    }
    

`;
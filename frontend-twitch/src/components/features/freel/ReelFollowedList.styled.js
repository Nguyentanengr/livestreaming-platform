import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const ReelFollowedListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px 30px;

    .title-area {
        font-size: 18px;
        font-weight: 700;
    }

    .reel-list-cnt {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 2%;
        flex-wrap: wrap;
        
        .reel-item {
            width: 32%;
            height: 240px;
            background-color: ${Theme.soft};
            margin-bottom: 20px;
            border-radius: 10px;
            overflow: hidden;
        }
    }
`;
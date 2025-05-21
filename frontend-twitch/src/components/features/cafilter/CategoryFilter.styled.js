import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const CategoryFilterContainer = styled.div`
    padding: 30px 30px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .ca-title {
        font-size: 20px;
        font-weight: 700;
    }

    .filter-cnt {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        width: 100%;

        .search-cnt {
            padding: 0 5px;
            height: 100%;
            width: 50%;
            display: flex;
            background-color: ${Theme.header};
            border-radius: 5px;
            overflow: hidden;
            border: 1px solid rgba(0, 0, 0, 0.1);

            .icon-cnt {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                font-size: 22px;
                color: ${Theme.mediumSoft};
            }

            input {
                font-size: 16px;
                height: 100%;
                flex: 1;
            }
        }

        .option-cnt {
            display: flex;
            height: 100%;
            background-color: ${Theme.lightSoft};
            padding: 0 5px;
            border-radius: 5px;
            align-items: center;
            gap: 5px;

            .option-item {
                height: 32px;
                padding: 0 15px;
                border-radius: 2px;
                cursor: pointer;
                padding-top: 3px;
                font-weight: 500;
                color: ${Theme.mediumSoft};

                &.selected {
                    background-color: ${Theme.header};
                    color: ${Theme.lightDark};
                }
            }
        }
    }

`;
import styled from "styled-components";


export const TitleBarContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 3px 15px;
    background-color: ${(props) => props.theme.border};;

    .label {
        line-height: 36px;
        font-size: 16px;
        font-weight: 500;
        color: ${(props) => props.theme.textColor};
    }

    .collapse-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        padding: 2px 2px;
        border-radius: 5px;
        cursor: pointer;
        color: ${(props) => props.theme.textColor};
        background-color: ${(props) => props.theme.border};

        &:hover {
            background-color: ${(props) => props.theme.hover};
        }
    }

    .gap {
        flex: 1;
    }

    .option-icon {
        display: flex;
        align-items: center;
        justify-content: end;
        padding: 9px 9px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        color: ${(props) => props.theme.textColor};

        &:hover {
            background-color: ${(props) => props.theme.hover};
        }
    }
`
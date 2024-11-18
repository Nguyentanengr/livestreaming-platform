import styled from 'styled-components';

export const LiveChatContainer = styled.div`
  position: fixed;
  top: 57px;
  right: 0;
  bottom: 0;
  flex: 1;
  width: 415px;
  border-right: 1px solid #ccc;
  background-color: ${(props) => props.theme.header};
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  z-index: 10;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    background-color: ${(props) => props.theme.header};
    border-bottom: 1px solid #ddd;

    .collapse {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 5px;
      background-color: ${(props) => props.theme.header};
      cursor: pointer;
      border-radius: 5px;

      .collapse-icon {
        font-size: 25px;
        color:  ${(props) => props.theme.textColor};
      }

      &:hover {
        background-color: ${(props) => props.theme.hover};
      }
    }

    .header {
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 550;
        color: ${(props) => props.theme.textColor};
        opacity: 0.9;
    }

    .option {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 7px 7px;
      background-color: ${(props) => props.theme.header};
      cursor: pointer;
      border-radius: 5px;

      .option-icon {
        font-size: 16px;
        color:  ${(props) => props.theme.textColor};
      }
      &:hover {
        background-color: ${(props) => props.theme.hover};
      }
    }
  }

  .message-list {
    flex-grow: 1;
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 5px;
    
    ::-webkit-scrollbar {
      width: 6px; /* Làm thanh cuộn mỏng lại */
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.header}; /* Màu của thanh cuộn */
      border-radius: 10px;
    }

    &:hover {
      ::-webkit-scrollbar-thumb {
        background-color: #ccc; /* Màu của thanh cuộn */
        border-radius: 10px;
      }
    }

    .message-item {
      display: flex;
      align-items: center;
      background-color: ${(props) => props.theme.header};
      border-radius: 5px;
      gap: 10px;
      padding: 5px 5px;

      &:hover {
        background-color: ${(props) => props.theme.hover};
      }


      .pp {
        img {
          height: 30px;
          width: 30px;
          border-radius: 100px;
          cursor: pointer;
        }
      }

      .message-body {
        display: flex;
        align-items: center;
        gap: 5px;

        .username {
          font-size: 14px;
          font-weight: 550;
          color:  ${(props) => props.theme.color};
          cursor: pointer;
        }

        .text {
          font-size: 13px;
          color: ${(props) => props.theme.textColor};
        }
      }
    }
  }

  .input-box {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 5px 10px 10px;

    input {
      height: 35px;
      flex-grow: 1;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
      outline: none;
      border: 1px solid rgba(0, 0, 0, 0.6);

      &:focus {
        border: 3px solid ${(props) => props.theme.color};
      }
    } 

    .send {
      margin: 7px 0px;
      padding: 0px 20px;
      line-height: 35px;
      border-radius: 5px;
      background-color: ${(props) => props.theme.color};
      color: ${(props) => props.theme.header};
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
    }
  }
`;



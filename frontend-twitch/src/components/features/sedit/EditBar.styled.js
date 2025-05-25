import styled, { keyframes } from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

// Keyframes for fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Keyframes for fade-out animation
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

export const EditBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .edit-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 20px 100px 20px;
    overflow-y: auto;

    ::-webkit-scrollbar {
      display: none;
    }

    .title-container,
    .noti-container,
    .category-container,
    .tag-container,
    .thumbnail-container,
    .comment-container,
    .visibility-container {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .thumbnail-container {
      display: flex;
      flex-direction: column;

      .add-area {
        background-color: ${Theme.header};
        padding: 30px 40px;
        border-radius: 8px;
        border: 2px dashed ${Theme.mediumSoft};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        transition: all 0.3s ease;
        transform: translateY(0);

        &.drag-active {
          border: 2px solid ${Theme.highlight};
          background-color: ${Theme.hover};
          transform: scale(1.02);
          box-shadow: 0 0 10px rgba(${Theme.highlightRGB}, 0.3);
        }

        &:hover {
          border: 2px dashed ${Theme.lightDark};
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        &:active {
          transform: scale(0.98);
        }

        .text {
          font-size: 16px;
          color: ${Theme.soft};
          transition: color 0.3s ease;
        }

        .icon {
          font-size: 30px;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        &.drag-active .icon,
        &:hover .icon {
          opacity: 1;
        }

        .thumbnail-preview {
          position: relative;
          width: 100%;
          max-width: 200px;
          height: 120px;
          opacity: 0;
          transform: scale(0.95);

          &.visible {
            animation: ${fadeIn} 0.3s ease forwards;
          }

          &:not(.visible) {
            animation: ${fadeOut} 0.3s ease forwards;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
            transition: filter 0.3s ease;
          }

          &:hover img {
            filter: brightness(0.9);
          }

          .remove-thumbnail {
            position: absolute;
            top: 8px;
            right: 8px;
            font-size: 20px;
            cursor: pointer;
            color: ${Theme.dark};
            background-color: ${Theme.white};
            border-radius: 50%;
            padding: 4px;
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.2s ease;

            &:hover {
              transform: scale(1);
              background-color: ${Theme.highlight};
              color: ${Theme.white};
            }
          }

          &:hover .remove-thumbnail {
            opacity: 1;
            transform: scale(1);
          }
        }
      }
    }

    .category-container {
      position: relative;

      .scroll-container {
        position: absolute;
        top: 110%;
        left: 0%;
        z-index: 20;
      }

      .cate-select-container {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 15px;
        background-color: ${Theme.hover};
        border-radius: 5px;

        .thumbnail {
          img {
            width: 50px;
            height: 67px;
            object-fit: cover;
            display: block;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }
        }

        .description {
          flex: 1;
          background-color: transparent;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding-top: 10px;
          color: ${Theme.dark};

          .name {
            font-size: 16px;
            font-weight: 600;
          }

          .interested {
            display: flex;
            gap: 5px;
            font-size: 14px;
            font-weight: 500;

            .text {
              font-weight: 400;
              color: ${Theme.lightDark};
            }
          }
        }

        .close-icon {
          padding: 5px;
          font-size: 30px;
          cursor: pointer;
          border-radius: 5px;
          transition: 0.2s;

          &:hover {
            stroke-width: 3;
          }
        }
      }
    }

    .tag-container {
      .tag-input {
        flex-grow: 1;
      }

      .select-container {
        display: flex;
        gap: 10px;

        .tag-select {
          padding: 0 5px;
          background-color: ${Theme.hover};
          border-radius: 5px;
          display: flex;
          align-items: center;
          font-size: 14px;

          .text {
            padding: 0 10px;
          }

          .tag-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 15px;
            height: 30px;
            cursor: pointer;
            color: ${Theme.dark};
            transition: 0.2s;

            &:hover {
              stroke-width: 3;
            }
          }
        }
      }
    }
  }

  .save-button {
    padding: 20px 50px;
    display: flex;
    justify-content: end;
  }
`;
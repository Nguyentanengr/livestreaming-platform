import styled, {keyframes} from "styled-components";
import { Theme } from "../../../assets/styles/Theme";


const slideIn = keyframes`
    from {
        opacity: 0;
        width: 0%;
    }
    to {
        opacity: 1;
        width: 23%;
    }
`;

export const ReelBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    width: 6%;
    gap: 30px;
    padding: 0 25px;

    .profile-container {
        position: relative;

        .follow-button {
            position: absolute;
            top: 70%;
            right: 50%;
            transform: translateX(50%);
            background-color: ${Theme.highlight};
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            .follow-icon {
                font-size: 22px;
                color: ${Theme.header};

            }

        }

        .follow-button.followed {
            background-color: ${Theme.header};
            border: 1px solid ${Theme.hover};

            .follow-icon {
                color: ${Theme.highlight};
            }
        }
    }

    .like-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;

        .like-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60px;
            width: 60px;
            padding: 10px;
            border-radius: 50%;
            cursor: pointer;
            transition: 0.1s;
            background-color: ${Theme.hover};
        }

        .like-count {
            font-size: 18px;
            font-weight: 500;
        }
    }

    .like-container.able {
        
    }

    .comment-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;

        .comment-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 52px;
            width: 52px;
            padding: 10px;
            border-radius: 50%;
            cursor: pointer;
            transition: 0.1s;
            background-color: ${Theme.hover};
    
        }

        .comment-count {
            font-size: 18px;
            font-weight: 500;
        }
    }

    .share-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;

        .share-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 52px;
            width: 52px;
            padding: 10px;
            border-radius: 50%;
            cursor: pointer;
            transition: 0.1s;
            background-color: ${Theme.hover};
            
        }

        .share-count {
            font-size: 18px;
            font-weight: 500;
        }
    } 
`;

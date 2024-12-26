import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ChannelItemContainer = styled.div`
    width: calc((100% - 60px) / 4);
    
    .thumbnail-container {
        position: relative;
        cursor: pointer;
        
        img {
            object-fit: cover;
        }

        .live-status {
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 14px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 2px;
            background-color: ${Theme.hotRed};
            color: ${Theme.header};
        }

        .viewers-count {
            position: absolute;
            bottom: 12px;
            left: 10px;
            font-size: 14px;
            font-weight: 500;
            color: ${Theme.header};
            border-radius: 1px;
            padding: 2px 8px;
            background-color: ${Theme.boldShadow};
        }
    }

    .description-container {
        display: flex;
        justify-content: space-between;
        padding: 10px 10px;
        gap: 10px;

        .info-container {

            .avatar {
                img {
                    width: 45px;
                    height: 45px;
                    object-fit: cover;
                    border-radius: 50%;
                }
            }

            .profile-info {

                .title {

                }

                .username {

                }

                .tags {

                }
            }
        }

        .option {

        }
    }
`;

import { useSelector, useDispatch } from "react-redux";
import { ChannelListContainer } from "./ChannelList.styled";
import { useState, useEffect } from "react";
import ChannelItem from "./ChannelItem";
import ShowMore from "../../commons/ShowMore";
import { getRecentStreams, getRecommendedStreams } from "../../../service/api/streamApi";

const ChannelList = ({ title, type, itemToShow = 4 }) => {
    const dispatch = useDispatch();
    const [showMore, setShowMore] = useState(false);
    let items = [];
    let typeItem = null;

    // Fetch data based on type
    useEffect(() => {
        if (type === "recommended") {
            dispatch(getRecommendedStreams({ status: 1, key: '', page: 0, size: 16 }));
        } else if (type === "recent") {
            dispatch(getRecentStreams({ status: 0, key: '', page: 0, size: 16 }));
        }
    }, [dispatch, type]);

    const { recommendedStreams, recentStreams, loading, error } = useSelector((state) => state.stream);
    const { categoryStreams } = useSelector((state) => state.category);

    switch (type) {
        case "recommended":
            items = recommendedStreams.map((stream) => ({
                id: stream.id,
                title: stream.title,
                username: stream.user.username,
                thumbnail: stream.thumbnail,
                views: stream.viewersCount,
                avatar: stream.user.avatar,
                tags: stream.tagNames.map((tag) => ({ id: tag, tag })),
            }));
            typeItem = "live";
            break;
        case "recent":
            items = recentStreams.map((stream) => {
                const duration = stream.endedAt && stream.startedAt
                    ? Math.floor((new Date(stream.endedAt) - new Date(stream.startedAt)) / 1000)
                    : 0;
                return {
                    id: stream.id,
                    title: stream.title,
                    username: stream.user.username,
                    thumbnail: stream.thumbnail,
                    views: stream.totalViewers,
                    avatar: stream.user.avatar,
                    tags: stream.tagNames.map((tag) => ({ id: tag, tag })),
                    duration,
                    createdAt: stream.endedAt,
                };
            });
            typeItem = "video";
            break;
        case "related":
            items = categoryStreams
                .filter((stream) => !stream.endedAt) // Chỉ lấy stream đang live
                .map((stream) => ({
                    id: stream.id,
                    title: stream.title,
                    username: stream.user.username,
                    thumbnail: stream.thumbnail,
                    views: stream.viewersCount,
                    avatar: stream.user.avatar,
                    tags: stream.tagNames.map((tag) => ({ id: tag, tag })),
                }));
            typeItem = "live";
            break;
        case "recent-related":
            items = categoryStreams
                .filter((stream) => stream.endedAt) // Chỉ lấy stream đã kết thúc
                .map((stream) => {
                    const duration = stream.endedAt && stream.startedAt
                        ? Math.floor((new Date(stream.endedAt) - new Date(stream.startedAt)) / 1000)
                        : 0;
                    return {
                        id: stream.id,
                        title: stream.title,
                        username: stream.user.username,
                        thumbnail: stream.thumbnail,
                        views: stream.totalViewers,
                        avatar: stream.user.avatar,
                        tags: stream.tagNames.map((tag) => ({ id: tag, tag })),
                        duration,
                        createdAt: stream.endedAt,
                    };
                });
            typeItem = "video";
            break;
        default:
            items = [];
    }

    const itemsToShow = showMore ? items : items.slice(0, itemToShow);
    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    if (loading && (type === "recommended" || type === "recent")) {
        return <ChannelListContainer>Loading...</ChannelListContainer>;
    }

    if (error && (type === "recommended" || type === "recent")) {
        return <ChannelListContainer>Error: {error.message}</ChannelListContainer>;
    }

    return (
        <ChannelListContainer>
            <div className="title-heading">{title}</div>
            <div className="recommend-live-container">
                {itemsToShow.length > 0 ? (
                    itemsToShow.map((item) => (
                        <ChannelItem key={item.id} item={item} type={typeItem} />
                    ))
                ) : (
                    <div>No live streams available</div>
                )}
            </div>
            {items.length > itemToShow && (
                <ShowMore title={showMore ? "Show Less" : "Show More"} onclick={handleShowMore} />
            )}
        </ChannelListContainer>
    );
};

export default ChannelList;
import { createSlice } from "@reduxjs/toolkit";

const recentSlice = createSlice({
    name: "recent",
    initialState: {
        videos: [
            {
                id: 1,
                title: "Twitch !bonus round 🎄Merry Christmas Eve all!",
                thumbnail: "/images/games/game-dota.jpg",
                duration: 278, //seconds
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                createdAt: "2024:12:27 12:00:00",
                views: 889,
                tags: [
                    {id: 1, tag: "funny"}, 
                    {id: 2, tag: "fighting"}],
                username: "Ambience",
                avatar: "https://upload.wikimedia.org/wikipedia/vi/b/b0/Avatar-Teaser-Poster.jpg",
            },
            {
                id: 2,
                title: "🌸 Minecraft Cherry Blossom Forest Ambience w/ C418 Music (Slowed) | 4 Hours",
                thumbnail: "/images/games/game-pubg.jpg",
                duration: 15, //seconds
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                createdAt: "2024:12:27 18:00:00",
                views: 1029,
                tags: [
                    {id: 1, tag: "funny"}, 
                    {id: 2, tag: "money"}],
                username: "Taryn",
                avatar: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-2.jpg",
            },
            {
                id: 3,
                title: "Ranked to Top 10 | Merry ChristmasNerds Top 10 Merry Christmas Nerds",
                thumbnail: "/images/games/game-elder.jpg",
                duration: 290, //seconds
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                createdAt: "2024:12:27 15:00:00",
                views: 478,
                tags: [
                    {id: 1, tag: "crazy"}, 
                    {id: 2, tag: "fighting"}],
                username: "Chill Guy",
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE1KBCPl8x447HdgdioRuwZWGdQSJlBuQCNQ&s",
            },
            {
                id: 4,
                title: "Zooba Squad Path of Paws 1 Days Challenge Complete Event Gameplay",
                thumbnail: "/images/games/game-eft.jpg",
                duration: 4123, //seconds
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                createdAt: "2024:12:27 14:00:00",
                views: 2608,
                tags: [
                    {id: 1, tag: "crazy"}, 
                    {id: 2, tag: "fantastic"}],
                username: "CozyCraft",
                avatar: "https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg",
            },
            {
                id: 5,
                title: "Zooba Squad Path of Paws 1 Days Challenge Complete Event Gameplay",
                thumbnail: "/images/games/game-eft.jpg",
                duration: 254, //seconds
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                createdAt: "2024:12:26 13:00:00",
                views: 2608,
                tags: [
                    {id: 1, tag: "crazy"}, 
                    {id: 2, tag: "fantastic"}],
                username: "CozyCraft",
                avatar: "https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg",
            },
            {
                id: 6,
                title: "🌸 Minecraft Cherry Blossom Forest Ambience w/ C418 Music (Slowed) | 4 Hours",
                thumbnail: "/images/games/game-pubg.jpg",
                duration: 234, //seconds
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                createdAt: "2024:12:26 24:00:00",
                views: 1029,
                tags: [
                    {id: 1, tag: "funny"}, 
                    {id: 2, tag: "money"}],
                username: "Taryn",
                avatar: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-2.jpg",
            },
            {
                id: 7,
                title: "Ranked to Top 10 | Merry ChristmasNerds Top 10 Merry Christmas Nerds",
                thumbnail: "/images/games/game-elder.jpg",
                duration: 689, //seconds
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                createdAt: "2024:12:26 07:00:00",
                views: 478,
                tags: [
                    {id: 1, tag: "crazy"}, 
                    {id: 2, tag: "fighting"}],
                username: "Chill Guy",
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE1KBCPl8x447HdgdioRuwZWGdQSJlBuQCNQ&s",
            },
            {
                id: 8,
                title: "Twitch !bonus round 🎄Merry Christmas Eve all!",
                thumbnail: "/images/games/game-dota.jpg",
                duration: 122, //seconds
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                createdAt: "2024:12:26 16:00:00",
                views: 889,
                tags: [
                    {id: 1, tag: "funny"}, 
                    {id: 2, tag: "fighting"}],
                username: "Ambience",
                avatar: "https://upload.wikimedia.org/wikipedia/vi/b/b0/Avatar-Teaser-Poster.jpg",
            },
        ],
        loading: false,
        error: null,
    },
    reducers: {
        fetchRecentStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchRecentSuccess: (state, action) => {
            state.loading = false;
            state.videos = action.payload;
        }, 
        fetchRecentFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearRecents: (state) => {
            state.videos = [];
        }
    },
});

export const {
    fetchRecentFailure,
    fetchRecentStart,
    fetchRecentSuccess,
    clearRecents,
} = recentSlice.actions;

export default recentSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const recommendSlice = createSlice({
    name: "recommend",
    initialState: {
        lives: [
            {
                id: 1,
                title: "Twitch !bonus round 🎄Merry Christmas Eve all!",
                thumbnail: "/images/games/test.jpg",
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
        fetchRecommendStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchRecommendSuccess: (state, action) => {
            state.loading = false;
            state.lives = action.payload;
        }, 
        fetchRecommendFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearRecommendations: (state) => {
            state.lives = [];
        }
    },
});

export const {
    fetchRecommendStart,
    fetchRecommendSuccess,
    fetchRecommendFailure,
    clearRecommendations,
} = recommendSlice.actions;

export default recommendSlice.reducer;

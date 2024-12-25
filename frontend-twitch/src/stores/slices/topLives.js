import { createSlice } from "@reduxjs/toolkit";
export const topLivesSlice = createSlice({
    name: "topLives",
    initialState: {
        topLives: [
            {
                id: 1,
                title: "Twitch !bonus round 🎄Merry Christmas Eve all! 🎄!tree, Twitch !bonus round 🎄Merry Christmas Eve all! 🎄!tree, Twitch !bonus round 🎄Merry Christmas Eve all! 🎄!tree,",
                thumbnail: "./assets/images/game-dota.jpg",
                views: 889,
                tags: ["funny", "fighting"],
                username: "Taryn",
                avatar: "https://upload.wikimedia.org/wikipedia/vi/b/b0/Avatar-Teaser-Poster.jpg",
            },
            {
                id: 1,
                title: "Twitch !bonus round 🎄Merry Christmas Eve all! 🎄!tree, Twitch !bonus round 🎄Merry Christmas Eve all! 🎄!tree, Twitch !bonus round 🎄Merry Christmas Eve all! 🎄!tree,",
                thumbnail: "./assets/images/game-dota.jpg",
                views: 889,
                tags: ["funny", "fighting"],
                username: "Taryn",
                avatar: "https://upload.wikimedia.org/wikipedia/vi/b/b0/Avatar-Teaser-Poster.jpg",
            },
            {
                id: 2,
                title: "Ranked to Top 10 | Merry ChristmasNerds Top 10 Merry Christmas Nerds",
                thumbnail: "./assets/images/game-dota.jpg",
                views: 889,
                tags: ["funny", "fighting"],
                username: "NoTice XX10K",
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE1KBCPl8x447HdgdioRuwZWGdQSJlBuQCNQ&s",
            },
            {
                id: 2,
                title: "Ranked to Top 10 | Merry ChristmasNerds Top 10 Merry Christmas Nerds",
                thumbnail: "./assets/images/game-dota.jpg",
                views: 889,
                tags: ["funny", "fighting"],
                username: "NoTice XX10K",
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE1KBCPl8x447HdgdioRuwZWGdQSJlBuQCNQ&s",
            },
        ],
    },
    reducers: {
        setTopLives: (state, action) => {
            state.topLives = action.payload;
        },
    },
})

export const { setTopLives } = topLivesSlice.actions;
export default topLivesSlice.reducer;

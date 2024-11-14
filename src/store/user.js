import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name: "user",
    initialState: {
        users: [
            {
                username: "Cosmo Kramer",
                title: "Rapid Chess Championship!",
                game: "Chess",
                tag: ["Chatting"],
                pp: "https://i.pravatar.cc/",
                liveScreen: "./images/games/game-chees.jpg",
                viewers: "17.1K",
            },
            {
                username: "Soprano",
                title: "Espost ChampoinCup 2024 ",
                game: "Dota 2",
                tag: ["Turkish"],
                pp: "https://i.pravatar.cc/",
                liveScreen: "./images/games/game-dota.jpg",
                viewers: "395",
            },
            {
                username: "Seinfeld",
                title: "Reduce Ping & Avoid Lags",
                game: "PUBG",
                tag: ["English", "Turkish"],
                pp: "https://i.pravatar.cc/",
                liveScreen: "./images/games/game-pubg.jpg",
                viewers: "5.4K",
            },

            {
                username: "Soprano",
                title: "Espost ChampoinCup 2024 ",
                game: "Dota 2",
                tag: ["Turkish"],
                pp: "https://i.pravatar.cc/",
                liveScreen: "./images/games/game-dota.jpg",
                viewers: "395",
            },
            {
                username: "Seinfeld",
                title: "Reduce Ping & Avoid Lags",
                game: "PUBG",
                tag: ["English", "Turkish"],
                pp: "https://i.pravatar.cc/",
                liveScreen: "./images/games/game-pubg.jpg",
                viewers: "5.4K",
            },

            {
                username: "Soprano",
                title: "Espost ChampoinCup 2024 ",
                game: "Dota 2",
                tag: ["Turkish"],
                pp: "https://i.pravatar.cc/",
                liveScreen: "./images/games/game-dota.jpg",
                viewers: "395",
            },
            
        ],
    },
});

export default user.reducer;
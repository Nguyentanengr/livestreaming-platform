import { createSlice } from "@reduxjs/toolkit";

export const liveSessionSlice = createSlice({
    name: "liveSession",
    initialState: {
        liveSessions: [
            // {
            //     id: "",
            //     username: "CosmoKramer",
            //     title: "Rapid Chess Championship!",
            //     game: "Chess",
            //     tag: ["Chatting"],
            //     pp: "https://i.pravatar.cc/",
            //     liveScreen: "./images/games/game-chees.jpg",
            //     viewers: "17.1K",
            // },
        ],
    },
    reducers: {
        setLiveSessions: (state, action) => {
            state.liveSessions = action.payload;
        }
    },
});

export const { setLiveSessions } = liveSessionSlice.actions;
export default liveSessionSlice.reducer;
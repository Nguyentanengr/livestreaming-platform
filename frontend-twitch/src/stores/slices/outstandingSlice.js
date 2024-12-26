import { createSlice } from "@reduxjs/toolkit";
export const outstandingSlice = createSlice({
    name: "outstanding",
    initialState: {
        lives: [
            {
                id: 1,
                title: "Twitch !bonus round 🎄Merry Christmas Eve all! 🎄!tree, Twitch !bonus round 🎄Merry Christmas Eve all! 🎄!tree, Twitch !bonus round 🎄Merry Christmas Eve all! 🎄!tree.",
                thumbnail: "./assets/images/game-dota.jpg",
                views: 889,
                tags: [
                    {id: 1, tag: "funny"},
                    {id: 2, tag: "fighting"},
                ],
                username: "Taryn",
                avatar: "https://upload.wikimedia.org/wikipedia/vi/b/b0/Avatar-Teaser-Poster.jpg",
            },
            {
                id: 2,
                title: "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.",
                thumbnail: "./assets/images/game-dota.jpg",
                views: 1029,
                tags: [
                    {id: 1, tag: "funny"},
                    {id: 2, tag: "fighting"},
                ],
                username: "Taryn",
                avatar: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-2.jpg",
            },
            {
                id: 3,
                title: "Ranked to Top 10 | Merry ChristmasNerds Top 10 Merry Christmas Nerds",
                thumbnail: "./assets/images/game-dota.jpg",
                views: 478,
                tags: [
                    {id: 1, tag: "funny"},
                    {id: 2, tag: "fighting"},
                ],
                username: "NoTice XX10K",
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE1KBCPl8x447HdgdioRuwZWGdQSJlBuQCNQ&s",
            },
        ],
        loading: false,
        error: null,
    },
    reducers: {
        fetchOutstandingStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchOutstandingSuccess: (state, action) => {
            state.loading = false;
            state.lives = action.payload;
        },
        fetchOutstandingFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearOutstanding: (state) => {
            state.lives = [];
        }
    },
})

export const { 
    fetchOutstandingStart,
    fetchOutstandingSuccess,
    fetchOutstandingFailure,
    clearOutstanding,
 } = outstandingSlice.actions;
 
export default outstandingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const reelSlice = createSlice({
    name: "reel",
    initialState: {
        reels: [
            {
                id: 1,
                username: "Taryn",
                title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                thumbnail: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
                tags: [
                    {id: 1, name: "funny"},
                    {id: 2, name: "fighting"},
                ],
                videoUrl: "/videos/streamvideo1.mp4",
                interested: 249400,
            },
            {
                id: 2,
                username: "Tony",
                tags: [
                    {id: 1, name: "funny"},
                    {id: 2, name: "fighting"},
                ],
                title: "Xin cái kèo solo 1:1",
                thumbnail: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
                videoUrl: "/videos/streamvideo10.mp4",
                interested: 249400,
            },
            {
                id: 3,
                username: "Haliwen",
                tags: [
                    {id: 1, name: "funny"},
                    {id: 2, name: "fighting"},
                ],
                title: "Ranked to Top 10 | Merry ChristmasNerds Top 10 Merry Christmas Nerds",
                thumbnail: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
                videoUrl: "/videos/streamvideo3.mp4",
                interested: 249400,
            },
            {
               id: 4,
                username: "Coccon",
                tags: [
                    {id: 1, name: "funny"},
                    {id: 2, name: "fighting"},
                ],
                title: "Ranked to Top 10 | Merry ChristmasNerds Top 10 Merry Christmas Nerds",
                thumbnail: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
                videoUrl: "/videos/streamvideo4.mp4",
                interested: 249400,
            },
            {
                id: 5,
                username: "Rootuten",
                tags: [
                    {id: 1, name: "funny"},
                    {id: 2, name: "fighting"},
                ],
                title: "Ranked to Top 10 | Merry ChristmasNerds Top 10 Merry Christmas Nerds",
                thumbnail: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
                videoUrl: "/videos/streamvideo11.mp4",
                interested: 249400,

            },
            {
                id: 6,
                username: "QuyenTop1VN",
                tags: [
                    {id: 1, name: "funny"},
                    {id: 2, name: "fighting"},
                ],
                title: "Ranked to Top 10 | Merry ChristmasNerds Top 10 Merry Christmas Nerds",
                thumbnail: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
                videoUrl: "/videos/streamvideo5.mp4",
                interested: 249400,
            }  
        ],
        loading: false,
        error: null,
    }, 
    reducers: {
        fetchReelStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchReelSuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        fetchReelFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearReels: (state) => {
            state.reels = [];
        }
    },
});

export const {
    fetchReelStart,
    fetchReelSuccess,
    fetchReelFailure,
    clearReels,
} = reelSlice.actions;

export default reelSlice.reducer;
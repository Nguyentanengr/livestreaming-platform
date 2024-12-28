import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [
            {
                id: 1,
                name: "valorant",
                thumbnail: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
                interested: 249400,
            },
            {
                id: 2,
                name: "Counter Strike",
                thumbnail: "https://static-cdn.jtvnw.net/ttv-boxart/32399-188x250.jpg",
                interested: 486320,
            },
            {
                id: 3,
                name: "Minecaft",
                thumbnail: "https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-285x380.jpg",
                interested: 1290003,
            },
            {
                id: 4,
                name: "Dota 2",
                thumbnail: "https://static-cdn.jtvnw.net/ttv-boxart/29595-285x380.jpg",
                interested: 146603,
            },
            {
                id: 5,
                name: "Pubg Mobile",
                thumbnail: "https://static-cdn.jtvnw.net/ttv-boxart/505884-285x380.jpg",
                interested: 335046,

            },
            {
                id: 6,
                name: "EA Sports",
                thumbnail: "https://static-cdn.jtvnw.net/ttv-boxart/2011938005_IGDB-285x380.jpg",
                interested: 558903,
            }  
        ],
        loading: false,
        error: null,
    }, 
    reducers: {
        fetchCategoryStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCategorySuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        fetchCategoryFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearCategories: (state) => {
            state.categories = [];
        }
    },
});

export const {
    fetchCategoryStart,
    fetchCategorySuccess,
    fetchCategoryFailure,
    clearCategories,
} = categorySlice.actions;

export default categorySlice.reducer;
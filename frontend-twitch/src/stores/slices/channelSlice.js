import { createSlice } from "@reduxjs/toolkit";

export const channelSlice = createSlice({
    name: "category",
    initialState: {
        channel: {
            id: 102,
            username: "HizukiNozomi",
            description: "It's moonnin' time. la lúnica luna de @vdreamrail ഒ creadora de #pendejosdub",
            socialLinks: [
                {
                    id: "twitter",
                    link: "https://twitter.com",
                },
                {
                    id: "youtube",
                    link: "https://youtube.com",
                },
                {
                    id: "discord",
                    link: "https://discord.com",
                }
            ],
            followers: 440304,
        },
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
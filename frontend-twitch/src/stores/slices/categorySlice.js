import { createSlice } from "@reduxjs/toolkit";
import { getRecommendedCategories } from "../../service/api/categoryApi";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        loading: false,
        error: null,
        currentPage: 0,
        totalPages: 0,
    },
    reducers: {
        clearCategories: (state) => {
            state.categories = [];
            state.currentPage = 0;
            state.totalPages = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRecommendedCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRecommendedCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.categories;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getRecommendedCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCategories } = categorySlice.actions;

export default categorySlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { getRecommendedCategories, getCategoryById, getCategoryStreams, categoryInterest, categoryUninterest } from "../../service/api/categoryApi";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        selectedCategory: null,
        categoryStreams: [],
        loading: false,
        error: null,
        currentPage: 0,
        totalPages: 0,
        streamsCurrentPage: 0,
        streamsTotalPages: 0,
    },
    reducers: {
        clearCategories: (state) => {
            state.categories = [];
            state.currentPage = 0;
            state.totalPages = 0;
        },
        clearCategoryStreams: (state) => {
            state.categoryStreams = [];
            state.streamsCurrentPage = 0;
            state.streamsTotalPages = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get Recommended Categories
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
            })
            // Get Category by ID
            .addCase(getCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCategory = action.payload;
            })
            .addCase(getCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Category Streams
            .addCase(getCategoryStreams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategoryStreams.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryStreams = action.payload.streams;
                state.streamsCurrentPage = action.payload.currentPage;
                state.streamsTotalPages = action.payload.totalPages;
            })
            .addCase(getCategoryStreams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(categoryInterest.pending, (state) => {
                if (state.selectedCategory) {
                    state.selectedCategory.isInterested = true;
                    state.selectedCategory.interestedCount += 1;
                }
            })
            .addCase(categoryInterest.rejected, (state) => {
                if (state.selectedCategory) {
                    state.selectedCategory.isInterested = false;
                    state.selectedCategory.interestedCount -= 1;
                }
            })
            .addCase(categoryUninterest.pending, (state) => {
                if (state.selectedCategory) {
                    state.selectedCategory.isInterested = false;
                    state.selectedCategory.interestedCount -= 1;
                }
            })
            .addCase(categoryUninterest.rejected, (state) => {
                if (state.selectedCategory) {
                    state.selectedCategory.isInterested = true;
                    state.selectedCategory.interestedCount += 1;
                }
            });
    },
});

export const { clearCategories, clearCategoryStreams } = categorySlice.actions;

export default categorySlice.reducer;
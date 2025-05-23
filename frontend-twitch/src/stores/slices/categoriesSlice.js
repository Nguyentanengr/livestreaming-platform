import { createSlice } from "@reduxjs/toolkit";
import { getAllCategory, getInterestedCategories } from "../../service/api/categoryApi";

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categoryList: [],
        allLoading: false,
        allError: null,
    },
    reducers: {
        clearCategories: (state) => {
            state.categoryList = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Get Recommended Categories
            .addCase(getAllCategory.pending, (state) => {
                state.allLoading = true;
                state.allError = null;
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.allLoading = false;
                state.categoryList = action.payload.categoryList;
            })
            .addCase(getAllCategory.rejected, (state, action) => {
                state.allLoading = false;
                state.allError = action.payload;
            })
            // Get Category by ID
            .addCase(getInterestedCategories.pending, (state) => {
                state.allLoading = true;
                state.allError = null;
            })
            .addCase(getInterestedCategories.fulfilled, (state, action) => {
                state.allLoading = false;
                state.categoryList = action.payload.categoryList;
            })
            .addCase(getInterestedCategories.rejected, (state, action) => {
                state.allLoading = false;
                state.allError = action.payload;
            });
            
    },
});

export const { clearCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            id: 1,
            username: "Ripcode112",
            alias: "nguyenkicker",
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq5xtiFtIcvJqTpVbMI8K3jVG3tLXolM1fSA&s",
        },

        loading: false,
        error: null,
    },
    reducers: {
        fetchUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        fetchUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
    },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure, updateUser } = userSlice.actions;
export default userSlice.reducer;

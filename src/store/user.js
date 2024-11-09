import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name: "user",
    initialState: {
        users: [
            {
                fullname: "Cosmo Kramer",
                username: "cosmokramer",
            },
            {
                fullname: "Schil Linger",
                username: "schillinger",
            },
        ],
    },
});

export default user.reducer;
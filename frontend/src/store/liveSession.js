import { createSlice } from "@reduxjs/toolkit";

export const liveSessionSlice = createSlice({
    name: "liveSession",
    initialState: {
        liveSessions: [
            
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
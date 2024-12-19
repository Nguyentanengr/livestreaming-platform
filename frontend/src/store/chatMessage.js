import { createSlice } from "@reduxjs/toolkit";

export const chatMessageSlice = createSlice({
    name: 'chatMessage',
    initialState: {
        chatMessages: [],
    },
    reducers: {
        setChatMessages: (state, action) => {
            state.chatMessages = [...state.chatMessages, action.payload];
        }
    },
});

export const { setChatMessages } = chatMessageSlice.actions;
export default chatMessageSlice.reducer;
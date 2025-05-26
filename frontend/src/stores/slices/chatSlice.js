import { createSlice } from "@reduxjs/toolkit";


const ChatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: [
            // {
            //     id: "",
            //     content: "",
            //     createdAt: "",
            //     user: {
            //         id: "",
            //         username: "",
            //         avatar: ""
            //     }
            // }
        ]
    },
    reducers: {
        addChat: (state, action) => {
            state.chats = [...state.chats, action.payload];
        }
    }
});

export const { addChat } = ChatSlice.actions;
export default ChatSlice.reducer;
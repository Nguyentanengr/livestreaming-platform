import { createSlice } from "@reduxjs/toolkit";


const ChatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: [
            {id: 1, username: "Batium QuanDai", thumbnail: "/images/categories/game1.jpg", content: "I think should develop more strategy with Mitoma as the core"},
            {id: 2, username: "SieuBao", thumbnail: "/images/categories/game2.jpg", content: "There are some people who think Mitoma isn't as good as he used to be."},
            {id: 3, username: "Alibaba conKat", thumbnail: "/images/categories/game3.jpg", content: "mitoma has one of the best first touches in the league rn"},
            {id: 4, username: "Rikkid", thumbnail: "/images/categories/game4.jpg", content: "Brilliant first touch"},
            {id: 5, username: "MiAnTiem", thumbnail: "/images/categories/game5.jpg", content: "He is proud of Asia. "},
            {id: 6, username: "SK Son", thumbnail: "/images/categories/game6.jpg", content: "Mitoma has the ability "},
            {id: 7, username: "LeoINatdo", thumbnail: "/images/categories/game7.jpg", content: "Good luck and Happy new Year!"},
            {id: 8, username: "KurenMtho", thumbnail: "/images/categories/game8.jpg", content: "Given Mitoma’s incredible dribbling ability, he should focus on that while having his defensive duties reduced. That’s likely why his goals and assists aren’t as high."},
            {id: 9, username: "Richalison", thumbnail: "/images/categories/game9.jpg", content: "Legend Mitoma 💙🤍👑"},
            {id: 10, username: "Bugerlisa .M", thumbnail: "/images/categories/game10.jpg", content: "My favourite Brighton player over the past 2 years"},
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
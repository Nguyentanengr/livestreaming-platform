import { createSlice } from "@reduxjs/toolkit";



const editStreamSlice = createSlice({
    name: "editStream",
    initialState: {
        titleInput: "This is my stream channel",
        notificationInput: "Welcome to my channel!",
        categoryInput: "",
        tagInput: "",
        commentInput: ["ON", "OFF"],
        visibilityInput: ["All everyone", "Who are following me", "Friendly (Follow along with)"],
        tagSelects: [],
        categorySelect: undefined,
        commentSelect: "ON", // {value: "ON" / "OFF"}
        visibilitySelect: "All everyone", // {value: "All..." / "Who ..."}
        categories: [
            { id: 1, name: "Dota2", thumbnail: "/images/categories/game1.jpg", interested: "24400" },
            { id: 2, name: "Valorant", thumbnail: "/images/categories/game2.jpg", interested: "57944" },
            { id: 3, name: "MineCraft", thumbnail: "/images/categories/game3.jpg", interested: "2360009" },
            { id: 4, name: "Pubg Mobile", thumbnail: "/images/categories/game4.jpg", interested: "57000" },
            { id: 5, name: "EA Sports", thumbnail: "/images/categories/game5.jpg", interested: "78000" },
            { id: 6, name: "Lien Quan", thumbnail: "/images/categories/game6.jpg", interested: "23456" },
            { id: 7, name: "Free Fire", thumbnail: "/images/categories/game7.jpg", interested: "68434" },
            { id: 8, name: "Snip Counter", thumbnail: "/images/categories/game8.jpg", interested: "28439" },
            { id: 9, name: "Action Thumb", thumbnail: "/images/categories/game9.jpg", interested: "83858" },
            { id: 10, name: "Killer Snip", thumbnail: "/images/categories/game10.jpg", interested: "13924" },
        ]
    },

    reducers: {
        setInput: (state, action) => {
            state[action.payload.key] = action.payload.value;
        },
        addTag: (state, action) => {
            if (!state.tagSelects.find(each => each === action.payload)
                && state.tagSelects.length < 3)
                state.tagSelects.push(action.payload);
        },
        removeTag: (state, action) => { // action.payload is Id
            state.tagSelects = state.tagSelects
                .filter((each, index) => index != action.payload);
        },
    },
});

export const {
    setInput,
    setItem,
    addTag,
    removeTag,
} = editStreamSlice.actions;

export default editStreamSlice.reducer;
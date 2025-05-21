import { createSlice } from "@reduxjs/toolkit";
import { getMyReels } from "../../service/api/profileApi";



const myReelSlice = createSlice({
    name: "myReel",
    initialState: {
        myReelLoading: false,
        myReelError: null,
        myReel: {
            reels: [
                {
                    id: "reel1",
                    description: "Reel 1",
                    thumbnail: "/images/games/test.jpg",
                    video: "/videos/test.mp4",
                    viewsCount: 1000,
                    likesCount: 2000,
                    commentsCount: 5000,
                    visibility: "PUBLIC",
                    commentEnabled: true,
                    createdAt: "3 hour ago",
                    tagNames: ["funny", "fighting"],
                    user: {
                        id: 1,
                        username: "User 1",
                        avatar: "https://upload.wikimedia.org/wikipedia/vi/b/b0/Avatar-Teaser-Poster.jpg",
                        isStreaming: true,
                    }
                }
            ],
            currentPage: 0,
            totalPages: 1,
        },
    },
    extraReducers: (builder) => {   
        builder
            .addCase(getMyReels.pending, (state) => {
                state.myReelLoading = true;
                state.myReelError = null;
            })
            .addCase(getMyReels.fulfilled, (state, action) => {
                state.myReelLoading = false;
                console.log("action.payload", action.payload);
                state.myReel = action.payload;
            })
            .addCase(getMyReels.rejected, (state, action) => {
                state.myReelLoading = false;
                state.myReelError = action.payload;
            });
    }
});

export const {

} = myReelSlice.actions;

export default myReelSlice.reducer;
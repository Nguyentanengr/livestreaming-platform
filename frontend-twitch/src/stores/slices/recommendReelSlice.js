import { createSlice } from '@reduxjs/toolkit';
import { getRcmReel, likeReel, unlikeReel, followUser, unfollowUser } from '../../service/api/reelApi';

const recommendReelSlice = createSlice({
    name: 'recommendReel',
    initialState: {
        reels: [],
        currentPage: -1,
        totalPages: 1,
        isLoading: false,
        error: null,
        hasMore: true,
        activeCommentReelId: null,
    },
    reducers: {
        resetReels: (state) => {
            state.reels = [];
            state.currentPage = -1;
            state.totalPages = 1;
            state.isLoading = false;
            state.error = null;
            state.hasMore = true;
        },
        setActiveComment: (state, action) => {
            state.activeCommentReelId = action.payload;
        },
        resetActiveComment: (state) => {
            state.activeCommentReelId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRcmReel.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getRcmReel.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.reels = [...state.reels, ...payload.reels];
                state.currentPage = payload.currentPage;
                state.totalPages = payload.totalPages;
                state.hasMore = state.currentPage < state.totalPages - 1;
            })
            .addCase(getRcmReel.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
                state.hasMore = false;
            })
            .addCase(likeReel.pending, (state, { meta }) => {
                const reelId = meta.arg.reelId;
                const reel = state.reels.find((r) => r.id === reelId);
                if (reel) {
                    reel.isLiked = true;
                    reel.likesCount += 1;
                }
            })
            .addCase(likeReel.fulfilled, (state) => {})
            .addCase(likeReel.rejected, (state, { meta }) => {
                const reelId = meta.arg.reelId;
                const reel = state.reels.find((r) => r.id === reelId);
                if (reel) {
                    reel.isLiked = false;
                    reel.likesCount -= 1;
                }
            })
            .addCase(unlikeReel.pending, (state, { meta }) => {
                const reelId = meta.arg.reelId;
                const reel = state.reels.find((r) => r.id === reelId);
                if (reel) {
                    reel.isLiked = false;
                    reel.likesCount -= 1;
                }
            })
            .addCase(unlikeReel.fulfilled, (state) => {})
            .addCase(unlikeReel.rejected, (state, { meta }) => {
                const reelId = meta.arg.reelId;
                const reel = state.reels.find((r) => r.id === reelId);
                if (reel) {
                    reel.isLiked = true;
                    reel.likesCount += 1;
                }
            })
            .addCase(followUser.pending, (state, { meta }) => {
                const username = meta.arg.username;
                state.reels.forEach((reel) => {
                    if (reel.user.username === username) {
                        reel.user.isFollowing = true;
                    }
                });
            })
            .addCase(followUser.fulfilled, (state) => {})
            .addCase(followUser.rejected, (state, { meta }) => {
                const username = meta.arg.username;
                state.reels.forEach((reel) => {
                    if (reel.user.username === username) {
                        reel.user.isFollowing = false;
                    }
                });
            })
            .addCase(unfollowUser.pending, (state, { meta }) => {
                const username = meta.arg.username;
                state.reels.forEach((reel) => {
                    if (reel.user.username === username) {
                        reel.user.isFollowing = false;
                    }
                });
            })
            .addCase(unfollowUser.fulfilled, (state) => {})
            .addCase(unfollowUser.rejected, (state, { meta }) => {
                const username = meta.arg.username;
                state.reels.forEach((reel) => {
                    if (reel.user.username === username) {
                        reel.user.isFollowing = true;
                    }
                });
            });
    },
});

export const { resetReels, setActiveComment, resetActiveComment } = recommendReelSlice.actions;
export default recommendReelSlice.reducer;
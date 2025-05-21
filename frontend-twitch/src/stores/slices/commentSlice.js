import { createSlice } from '@reduxjs/toolkit';
import { getComments, createComment, deleteComment, likeComment, unlikeComment } from '../../service/api/reelApi';

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: [],
        currentPage: 0,
        totalPages: 1,
        isLoading: false,
        error: null,
        hasMore: true,
    },
    reducers: {
        resetComments: (state) => {
            state.comments = [];
            state.currentPage = 0;
            state.totalPages = 1;
            state.isLoading = false;
            state.error = null;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle getComments
            .addCase(getComments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getComments.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.comments = [...state.comments, ...payload.comments];
                state.currentPage = payload.currentPage;
                state.totalPages = payload.totalPages;
                state.hasMore = state.currentPage < state.totalPages - 1;
            })
            .addCase(getComments.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
                state.hasMore = false;
            })
            // Handle createComment
            .addCase(createComment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createComment.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.comments = [payload, ...state.comments];
            })
            .addCase(createComment.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            // Handle deleteComment
            .addCase(deleteComment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, { meta }) => {
                const { reelId, commentId } = meta.arg;
                state.isLoading = false;
                state.comments = state.comments.filter((comment) => comment.id !== commentId);
            })
            .addCase(deleteComment.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            // Handle likeComment
            .addCase(likeComment.pending, (state, { meta }) => {
                const { commentId } = meta.arg;
                const comment = state.comments.find((c) => c.id === commentId);
                if (comment) {
                    comment.isLiked = true;
                    comment.likesCount += 1; // Optimistic update
                }
            })
            .addCase(likeComment.fulfilled, (state, { meta }) => {
                // No action needed since backend returns null
            })
            .addCase(likeComment.rejected, (state, { meta }) => {
                const { commentId } = meta.arg;
                const comment = state.comments.find((c) => c.id === commentId);
                if (comment) {
                    comment.isLiked = false;
                    comment.likesCount -= 1; // Revert optimistic update
                }
            })
            // Handle unlikeComment
            .addCase(unlikeComment.pending, (state, { meta }) => {
                const { commentId } = meta.arg;
                const comment = state.comments.find((c) => c.id === commentId);
                if (comment) {
                    comment.isLiked = false;
                    comment.likesCount -= 1; // Optimistic update
                }
            })
            .addCase(unlikeComment.fulfilled, (state, { meta }) => {
                // No action needed since backend returns null
            })
            .addCase(unlikeComment.rejected, (state, { meta }) => {
                const { commentId } = meta.arg;
                const comment = state.comments.find((c) => c.id === commentId);
                if (comment) {
                    comment.isLiked = true;
                    comment.likesCount += 1; // Revert optimistic update
                }
            });
    },
});

export const { resetComments } = commentSlice.actions;
export default commentSlice.reducer;
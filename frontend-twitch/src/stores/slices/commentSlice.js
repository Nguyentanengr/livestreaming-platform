import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [
            {
                id: 1,
                videoId: 1,
                username: "John Doe",
                avatar: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-2.jpg",
                timestamp: "2024-01-01",
                content: "Good content with me",
                replyCount: 3,
                likeCount: 248,
            },
            {
                id: 2,
                videoId: 1,
                username: "Chung Dong",
                avatar: "https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg",
                timestamp: "2024-01-01",
                content: "That is very good",
                replyCount: 0,
                likeCount: 450,
            },
            {
                id: 3,
                videoId: 1,
                username: "Haring Woo",
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE1KBCPl8x447HdgdioRuwZWGdQSJlBuQCNQ&s",
                timestamp: "2024-01-01",
                content: "Welcome to you, from my witd love from my witd love",
                replyCount: 0,
                likeCount: 380,
            },
        ],
        replies: {
            "1": [
                {
                    id: 1,
                    parentId: 1,
                    username: "John Hang",
                    avatar: "https://via.placeholder.com/150",
                    timestamp: "2024:01:01 12:07:00",
                    content: "This is a reply",
                    likeCount: 28,
                },
                {
                    id: 2,
                    parentId: 1,
                    avatar: "https://via.placeholder.com/150",
                    username: "John Nguyen",
                    timestamp: "2024:01:01 12:09:00",
                    content: "This is a content",
                    likeCount: 12,
                }
            ]
        },
        loadingComment: false,
        loadingReply: false,
        commentError: null,
        replyError: null,
    },
    reducers: {
        fetchCommentStart: (state) => {
            state.loadingComment = true;
            state.commentError = null;
        }, 

        fetchCommentSuccess: (state, action) => {
            state.loadingComment = false;
            state.comments = action.payload;
        },

        fetchCommentFailure: (state, action) => {
            state.loadingComment = false;
            state.commentError = action.payload;
        },

        fetchMoreComment: (state, action) => {
            state.comments = [...state.comments, ...action.payload];
        },

        fetchReplyStart: (state) => {
            state.loadingReply = true;
            state.replyError = null;
        },

        fetchReplySuccess: (state, action) => {
            state.loadingReply = false;
            state.replies = action.payload;
        },  

        fetchReplyFailure: (state, action) => {
            state.loadingReply = false;
            state.replyError = action.payload;
        },
    },
});

export const {
    fetchCommentStart,
    fetchCommentSuccess,
    fetchCommentFailure,
    fetchMoreComment,
    fetchReplyStart,
    fetchReplySuccess,
    fetchReplyFailure,
} = commentSlice.actions;

export default commentSlice.reducer;
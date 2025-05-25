import { createSlice } from "@reduxjs/toolkit";
import { getOutstandingStream, getRecentStreams, getRecommendedStreams, getStreamById } from "../../service/api/streamApi";


export const streamSlice = createSlice({
    name: "stream",
    initialState: {
        outstandingStreams: [],
        recommendedStreams: [],
        recentStreams: [],
        selectedStream: null,
        loading: false,
        error: null,
        outstandingCurrentPage: 0,
        outstandingTotalPages: 0,
        recommendedCurrentPage: 0,
        recommendedTotalPages: 0,
        recentCurrentPage: 0,
        recentTotalPages: 0,
    },
    reducers: {
        clearStreams: (state) => {
            state.outstandingStreams = [];
            state.recommendedStreams = [];
            state.recentStreams = [];
            state.selectedStream = null;
            state.outstandingCurrentPage = 0;
            state.outstandingTotalPages = 0;
            state.recommendedCurrentPage = 0;
            state.recommendedTotalPages = 0;
            state.recentCurrentPage = 0;
            state.recentTotalPages = 0;
        },
        setViewersCount: (state, action) => {
            state.selectedStream.viewersCount = action.payload.viewersCount;
        }
    },
    extraReducers: (builder) => {
        builder
            // Outstanding Streams
            .addCase(getOutstandingStream.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOutstandingStream.fulfilled, (state, action) => {
                state.loading = false;
                state.outstandingStreams = action.payload.streams;
                state.outstandingCurrentPage = action.payload.currentPage;
                state.outstandingTotalPages = action.payload.totalPages;
            })
            .addCase(getOutstandingStream.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Recommended Streams
            .addCase(getRecommendedStreams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRecommendedStreams.fulfilled, (state, action) => {
                state.loading = false;
                state.recommendedStreams = action.payload.streams;
                state.recommendedCurrentPage = action.payload.currentPage;
                state.recommendedTotalPages = action.payload.totalPages;
            })
            .addCase(getRecommendedStreams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Recent Streams
            .addCase(getRecentStreams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRecentStreams.fulfilled, (state, action) => {
                state.loading = false;
                state.recentStreams = action.payload.streams;
                state.recentCurrentPage = action.payload.currentPage;
                state.recentTotalPages = action.payload.totalPages;
            })
            .addCase(getRecentStreams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Stream by ID
            .addCase(getStreamById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStreamById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedStream = action.payload;
            })
            .addCase(getStreamById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearStreams, setViewersCount } = streamSlice.actions;

export default streamSlice.reducer;
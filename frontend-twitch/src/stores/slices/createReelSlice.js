import { createSlice } from '@reduxjs/toolkit';
import { createReel } from '../../service/api/reelApi';

const createReelSlice = createSlice({
    name: 'createReel',
    initialState: {
        createReelLoading: false,
        createReelError: null,
        reel: null,
        videoFile: null,
        thumbnailFile: null,
    },
    reducers: {
        setVideoFile: (state, action) => {
            state.videoFile = action.payload;
        },
        setThumbnailFile: (state, action) => {
            state.thumbnailFile = action.payload;
        },
        resetCreateReelState: (state) => {
            state.createReelLoading = false;
            state.createReelError = null;
            state.reel = null;
            state.videoFile = null;
            state.thumbnailFile = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createReel.pending, (state) => {
                state.createReelLoading = true;
                state.createReelError = null;
            })
            .addCase(createReel.fulfilled, (state, { payload }) => {
                state.createReelLoading = false;
                state.reel = payload;
                state.createReelError = null;
                state.videoFile = null;
                state.thumbnailFile = null;
            })
            .addCase(createReel.rejected, (state, { payload }) => {
                state.createReelLoading = false;
                state.createReelError = payload;
            });
    },
});

export const { resetCreateReelState, setVideoFile, setThumbnailFile } = createReelSlice.actions;
export default createReelSlice.reducer;
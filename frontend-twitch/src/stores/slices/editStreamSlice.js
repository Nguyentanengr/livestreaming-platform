import { createSlice } from "@reduxjs/toolkit";
import { getAllCategoryByKey } from "../../service/api/categoryApi";
import { createStream } from "../../service/api/streamApi";

const editStreamSlice = createSlice({
  name: "editStream",
  initialState: {
    id: null,
    titleInput: "This is my stream channel",
    notificationInput: "Welcome to my channel!",
    categoryInput: "",
    tagInput: "",
    commentInput: ["ON", "OFF"],
    visibilityInput: ["All everyone", "Who are following me", "Only me"],
    tagSelects: [],
    categorySelect: undefined,
    commentSelect: "ON",
    visibilitySelect: "All everyone",
    categories: [],
    thumbnail: null,
    thumbnailFile: null, // Thêm để lưu file gốc
    loading: false,
    error: null,
    currentPage: 0,
    totalPages: 1,
    isVideoLoaded: false,
    isLive: false,
    createLoading: false,
    viewersCount: 0,
  },
  reducers: {

    setIsVideoLoaded: (state, action) => {
      state.isVideoLoaded = action.payload;
    },
    setIsLive: (state, action) => {
      state.isLive = action.payload;
    },
    setInput: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    addTag: (state, action) => {
      if (!state.tagSelects.find(each => each === action.payload) && state.tagSelects.length < 3) {
        state.tagSelects.push(action.payload);
      }
    },
    removeTag: (state, action) => {
      state.tagSelects = state.tagSelects.filter((_, index) => index !== action.payload);
    },
    setThumbnail: (state, action) => {
      state.thumbnail = action.payload; // Lưu base64 để hiển thị
    },
    setThumbnailFile: (state, action) => {
      state.thumbnailFile = action.payload; // Lưu file gốc
    },
    resetThumbnail: (state) => {
      state.thumbnail = null;
      state.thumbnailFile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoryByKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategoryByKey.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categoryList.map(category => ({
          id: category.id,
          name: category.name,
          thumbnail: category.thumbnail,
          interested: category.interestedCount,
        }));
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllCategoryByKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch categories";
      })
      .addCase(createStream.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createStream.fulfilled, (state, action) => {
        state.createLoading = false;
        state.id = action.payload?.streamId;
      })
      .addCase(createStream.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload?.message || "Failed to create stream";
      });
  },
});

export const { 
  setInput, 
  addTag, 
  removeTag, 
  setThumbnail, 
  setThumbnailFile, 
  resetThumbnail,
  setIsVideoLoaded,
  setIsLive,
  setViewersPresentCount,
} = editStreamSlice.actions;

export default editStreamSlice.reducer;
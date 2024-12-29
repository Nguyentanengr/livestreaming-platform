import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import recentReducer from "./slices/recentSlice";
import recommendReducer from "./slices/recommendSlice";
import outstandingReducer from "./slices/outstandingSlice";
import categoryReducer from "./slices/categorySlice";
import reelReducer from "./slices/reelSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        outstanding: outstandingReducer,
        recommend: recommendReducer,
        recent: recentReducer,
        category: categoryReducer,
        reel: reelReducer,
    },
});
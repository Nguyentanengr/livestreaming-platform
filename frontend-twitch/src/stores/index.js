import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import recommendReducer from "./slices/recommendSlice";
import outstandingReducer from "./slices/outstandingSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        outstanding: outstandingReducer,
        recommend: recommendReducer,
    },
});
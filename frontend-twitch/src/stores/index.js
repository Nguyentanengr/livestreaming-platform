import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import topLivesReducer from "./slices/topLives";

export default configureStore({
    reducer: {
        user: userReducer,
        topLives: topLivesReducer,
    },
});
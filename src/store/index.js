import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./user";
import siteReducers from "./site"
export default configureStore({
    reducer: {
        user: userReducers,
        site: siteReducers,
    },
});
import { configureStore } from "@reduxjs/toolkit";
import liveSessionReducers from "./liveSession";
import siteReducers from "./site"
export default configureStore({
    reducer: {
        liveSession: liveSessionReducers,
        site: siteReducers,
    },
});
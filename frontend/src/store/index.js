import { configureStore } from "@reduxjs/toolkit";
import liveSessionReducers from "./liveSession";
import siteReducers from "./site";
import chatMessageReducers from "./chatMessage";
import { chatMessage } from "../services/socketServices/chatSocketService";
export default configureStore({
    reducer: {
        liveSession: liveSessionReducers,
        site: siteReducers,
        chatMessage: chatMessageReducers,
    },
});
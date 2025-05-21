import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import recentReducer from "./slices/recentSlice";
import recommendReducer from "./slices/recommendSlice";
import outstandingReducer from "./slices/outstandingSlice";
import categoryReducer from "./slices/categorySlice";
import reelReducer from "./slices/reelSlice";
import commentReducer from "./slices/commentSlice";
import editStreamReducer from "./slices/editStreamSlice";
import chatReducer from "./slices/chatSlice";
import inputSignUpReducer from "./slices/inputSignUpSlice";
import inputResetPasswordReducer from "./slices/inputResetPasswordSlice";
import profileReducer from "./slices/profileSlice";
import myStreamReducer from "./slices/myStreamSlice";
import myReelReducer from "./slices/myReelSlice";
import createReudcer from "./slices/createReelSlice";
import recommendReelReducer from "./slices/recommendReelSlice";
import notiReducer from "./slices/notiSlice";

export default configureStore({
    reducer: {
        inputSignUp: inputSignUpReducer,
        inputResetPassword: inputResetPasswordReducer,
        user: userReducer,
        auth: authReducer,
        outstanding: outstandingReducer,
        recommend: recommendReducer,
        recent: recentReducer,
        category: categoryReducer,
        reel: reelReducer,
        comment: commentReducer,
        editStream: editStreamReducer,
        chat: chatReducer,
        profile: profileReducer,
        myStream: myStreamReducer,
        myReel: myReelReducer,
        createReel: createReudcer,
        recommendReel: recommendReelReducer,
        notifications: notiReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'createReel/setVideoFile',
                    'createReel/setThumbnailFile',
                    'reel/createReel/pending',
                    'reel/createReel/fulfilled',
                    'reel/createReel/rejected',
                ],
                ignoredPaths: ['createReel.videoFile', 'createReel.thumbnailFile'],
            },
        }),
});
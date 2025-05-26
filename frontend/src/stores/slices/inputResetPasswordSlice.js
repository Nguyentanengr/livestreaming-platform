import { createSlice } from "@reduxjs/toolkit";


export const inputResetPasswordSlice = createSlice({
    name: "inputResetPassword",
    initialState: {
        email: "",
        newPassword: "",
        code: "",
    },
    reducers: {
        onChangeEmail: (state, action) => ({...state, email: action.payload}),
        onChangeNewPassword: (state, action) => ({...state, newPassword: action.payload}),
        onChangeCode: (state, action) => ({...state, code: action.payload}),
    }
});

export const { onChangeEmail, onChangeNewPassword, onChangeCode } = inputResetPasswordSlice.actions;
export default inputResetPasswordSlice.reducer;
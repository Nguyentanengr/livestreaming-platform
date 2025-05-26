import { createSlice } from "@reduxjs/toolkit";


export const inputSignUpSlice = createSlice({
    name: "inputSignUp",
    initialState: {
        email: "",
        password: "",
        code: "",
    },
    reducers: {
        onChangeEmail: (state, action) => ({...state, email: action.payload}),
        onChangePassword: (state, action) => ({...state, password: action.payload}),
        onChangeCode: (state, action) => ({...state, code: action.payload}),
    }
});

export const { onChangeEmail, onChangePassword, onChangeCode } = inputSignUpSlice.actions;
export default inputSignUpSlice.reducer;
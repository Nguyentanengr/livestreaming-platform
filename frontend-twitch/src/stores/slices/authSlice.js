import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, otpRegister, otpResetPassword, registerUser, resetPassword } from "../../service/api/authApi";


const token = localStorage.getItem("accessToken")
    ? localStorage.getItem('accessToken')
    : null; // get token every reload (F5)

const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem('user'))
    : null; // get user every reload (F5)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        otpRegisterLoading: false,
        otpRegisterError: null,

        registerLoading: false,
        registerError: null,

        loginLoading: false,
        loginError: null,

        otpPasswordLoading: false,
        otpPasswordLoading: null,

        resetPasswordLoading: false,
        resetPasswordLoading: null,

        logoutLoading: false,
        logoutError: null,

        user,
        token,
    },

    reducers: {
        resetOtpRegisterState: (state) => {
            state.otpRegisterLoading = false;
            state.otpRegisterError = null;
        },

        resetRegisterState: (state) => {
            state.registerLoading = false;
            state.registerError = null;
        },

        resetLoginState: (state) => {
            state.loginLoading = false;
            state.loginError = null;
        },

        resetOtpPasswordState: (state) => {
            state.otpPasswordLoading = false;
            state.otpPasswordError = null;
        },

        resetResetPasswordState: (state) => {
            state.resetPasswordLoading = false;
            state.resetPasswordError = null;
        },

        resetAuthState: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(otpRegister.pending, (state) => {
                state.otpRegisterLoading = true;
                state.otpRegisterError = false;
            })
            .addCase(otpRegister.fulfilled, (state) => {
                state.otpRegisterLoading = false;
                state.otpRegisterError = false;
            })
            .addCase(otpRegister.rejected, (state, { payload }) => {
                state.otpRegisterLoading = false;
                state.otpRegisterError = payload;
            })

            .addCase(registerUser.pending, (state) => {
                state.registerLoading = true;
                state.registerError = false;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.registerLoading = false;
                state.user = payload.user;
                state.token = payload.accessToken;
                localStorage.setItem("user", JSON.stringify(payload.user));
                localStorage.setItem("accessToken", payload.accessToken);
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.registerLoading = false;
                state.registerError = payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.loginLoading = true;
                state.loginError = false;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loginLoading = false;
                state.user = payload.user;
                state.token = payload.accessToken;
                localStorage.setItem("user", JSON.stringify(payload.user));
                localStorage.setItem("accessToken", payload.accessToken);
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loginLoading = false;
                state.loginError = payload;
            })

            .addCase(otpResetPassword.pending, (state) => {
                state.otpPasswordLoading = true;
                state.otpPasswordError = false;
            })
            .addCase(otpResetPassword.fulfilled, (state, { payload }) => {
                state.otpPasswordLoading = false;
            })
            .addCase(otpResetPassword.rejected, (state, { payload }) => {
                state.otpPasswordLoading = false;
                state.otpPasswordError = payload;
            })

            .addCase(resetPassword.pending, (state) => {
                state.resetPasswordLoading = true;
                state.resetPasswordError = false;
            })
            .addCase(resetPassword.fulfilled, (state, { payload }) => {
                state.resetPasswordLoading = false;
                state.user = payload.user;
                state.token = payload.accessToken;
                localStorage.setItem("user", JSON.stringify(payload.user));
                localStorage.setItem("accessToken", payload.accessToken);
            })
            .addCase(resetPassword.rejected, (state, { payload }) => {
                state.resetPasswordLoading = false;
                state.resetPasswordError = payload;
            })

            .addCase(logoutUser.pending, (state) => {
                state.logoutLoading = true;
                state.logoutError = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.logoutLoading = false;
                state.logoutError = null;
                state.user = null;
                state.token = null;
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
            })
            .addCase(logoutUser.rejected, (state, { payload }) => {
                state.logoutLoading = false;
                state.logoutError = payload;
            });
        
    }
});

export const { resetAuthState, resetOtpRegisterState, resetRegisterState
    , resetLoginState, resetOtpPasswordState, resetResetPasswordState } = authSlice.actions;
export default authSlice.reducer;
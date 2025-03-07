import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const OTP_API = "http://localhost:8080/api/v1/auth/register/require-otp";
const REGISTER_API = "http://localhost:8080/api/v1/auth/register";
const LOGIN_API = "http://localhost:8080/api/v1/auth/login";
const LOGOUT_API = "http://localhost:8080/api/v1/auth/logout";
const OTP_PASS_API = "http://localhost:8080/api/v1/auth/reset-password/require-otp";
const CHANGE_PASS_API = "http://localhost:8080/api/v1/auth/reset-password";

export const requestOTP = createAsyncThunk("auth/requestOTP", async ({ email }, { rejectWithValue }) => {
    try {
        const response = await fetch(OTP_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const objectResponse = await response.json();
        if (objectResponse.code !== 1000) return rejectWithValue(objectResponse.message);
        return objectResponse;
    } catch (error) {
        return rejectWithValue(error.message || "Network error");
    }
})

export const registerUser = createAsyncThunk("auth/register",
    async ({ email, password, code }, { rejectWithValue }) => {
        try {
            const response = await fetch(REGISTER_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, code }),
                credentials: "include",
            });
            const objectResponse = await response.json();

            if (objectResponse.code != 1000) return rejectWithValue(objectResponse.message);
            else {
                localStorage.setItem('user', JSON.stringify(objectResponse.data.user));
                localStorage.setItem('accessToken', objectResponse.data.accessToken);
            }
            return objectResponse;
        } catch (error) {
            return rejectWithValue(error.message || "Network error");
        }
    });

export const loginUser = createAsyncThunk("auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            console.log(email, password);

            const response = await fetch(LOGIN_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });
            const objectResponse = await response.json();

            if (objectResponse.code != 1000) return rejectWithValue(objectResponse.message);
            // set user and access toke into localstorage
            localStorage.setItem('user', JSON.stringify(objectResponse.data.user));
            localStorage.setItem('accessToken', objectResponse.data.accessToken);

            return objectResponse;

        } catch (error) {
            return rejectWithValue(error.message || "Network error");
        }
    });

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(LOGOUT_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // send cookie contain refresh token
        });

        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');

        const objectResponse = await response.json();
        console.log(objectResponse);

        return objectResponse;
    } catch (error) {
        return rejectWithValue(error.message || "Network error");
    }
});

export const otpPassUser = createAsyncThunk("auth/otpPassword", 
    async ({ email }, { rejectWithValue }) => {
    try {
        const response = await fetch(OTP_PASS_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const objectResponse = await response.json();
        if (objectResponse.code !== 1000) return rejectWithValue(objectResponse.message);
        return objectResponse;
    } catch (error) {
        return rejectWithValue(error.message || "Network error");
    }
});


export const changePassUser = createAsyncThunk("auth/changePassword",
    async ({ email, newPassword, code }, { rejectWithValue }) => {
        try {
            const response = await fetch(CHANGE_PASS_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword, code }),
                credentials: "include",
            });
            const objectResponse = await response.json();

            if (objectResponse.code != 1000) return rejectWithValue(objectResponse.message);
            else {
                localStorage.setItem('user', JSON.stringify(objectResponse.data.user));
                localStorage.setItem('accessToken', objectResponse.data.accessToken);
            }
            return objectResponse;
        } catch (error) {
            return rejectWithValue(error.message || "Network error");
        }
    });



const token = localStorage.getItem("accessToken")
    ? localStorage.getItem('accessToken')
    : null; // get token every reload (F5)

const user = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null; // get user every reload (F5)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        otpLoading: false,
        otpSuccess: false,
        otpError: null,
        otpMessage: null,

        registerLoading: false,
        registerSuccess: false,
        registerError: null,
        registerMessage: null,

        loginLoading: false,
        loginSuccess: false,
        loginError: null,
        loginMessage: null,

        otpPassLoading: false,
        otpPassSuccess: false,
        otpPassError: null,
        otpPassMessage: null,

        changePassLoading: false,
        changePassSuccess: false,
        changePassError: null,
        changePassMessage: null,

        user,
        token,
    },

    reducers: {
        resetOtpState: (state) => {
            state.otpLoading = false;
            state.otpSuccess = false;
            state.otpError = null;
            state.otpMessage = null;
        },

        resetRegisterState: (state) => {
            state.registerLoading = false;
            state.registerSuccess = false;
            state.registerError = null;
            state.registerMessage = null;
        },

        resetLoginState: (state) => {
            state.loginLoading = false;
            state.loginSuccess = false;
            state.loginError = null;
            state.loginMessage = null;
        },

        resetOtpPassState: (state) => {
            state.otpPassLoading = false;
            state.otpPassSuccess = false;
            state.otpPassError = null;
            state.otpPassMessage = null;
        },

        resetChangePassState: (state) => {
            state.changePassLoading = false;
            state.changePassSuccess = false;
            state.changePassError = null;
            state.changePassMessage = null;
        },

        resetAuthState: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: {
        [requestOTP.pending]: (state) => {
            state.otpLoading = true;
            state.otpError = false;
            state.otpSuccess = false;
        },
        [requestOTP.fulfilled]: (state, { payload }) => {
            state.otpLoading = false;
            state.otpSuccess = true;
            state.otpMessage = payload.message;
        },
        [requestOTP.rejected]: (state, { payload }) => {
            state.otpLoading = false;
            state.otpError = payload;
        },
        [registerUser.pending]: (state) => {
            state.registerLoading = true;
            state.registerError = false;
            state.registerSuccess = false;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.registerLoading = false;
            state.registerSuccess = true;
            state.registerMessage = payload.message;
            state.user = payload.data.user; // login after login successfully
            state.token = payload.data.accessToken; // login after login successfully
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.registerLoading = false;
            state.registerError = payload;
        },
        [loginUser.pending]: (state) => {
            state.loginLoading = true;
            state.loginError = false;
            state.loginSuccess = false;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.loginLoading = false;
            state.loginSuccess = true;
            state.loginMessage = payload.message;
            state.user = payload.data.user;
            state.token = payload.data.accessToken;
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.loginLoading = false;
            state.loginError = payload;
        },
        [otpPassUser.pending]: (state) => {
            state.otpPassLoading = true;
            state.otpPassError = false;
            state.otpPassSuccess = false;
        },
        [otpPassUser.fulfilled]: (state, { payload }) => {
            state.otpPassLoading = false;
            state.otpPassSuccess = true;
            state.otpPassMessage = payload.message;
        },
        [otpPassUser.rejected]: (state, { payload }) => {
            state.otpPassLoading = false;
            state.otpPassError = payload;
        },
        [changePassUser.pending]: (state) => {
            state.changePassLoading = true;
            state.changePassError = false;
            state.changePassSuccess = false;
        },
        [changePassUser.fulfilled]: (state, { payload }) => {
            state.changePassLoading = false;
            state.changePassSuccess = true;
            state.changePassMessage = payload.message;
            state.user = payload.data.user;
            state.token = payload.data.accessToken;
        },
        [changePassUser.rejected]: (state, { payload }) => {
            state.changePassLoading = false;
            state.changePassError = payload;
        },
    },
});

export const { resetAuthState, resetOtpState, resetRegisterState
    , resetLoginState, resetOtpPassState, resetChangePassState } = authSlice.actions;
export default authSlice.reducer;
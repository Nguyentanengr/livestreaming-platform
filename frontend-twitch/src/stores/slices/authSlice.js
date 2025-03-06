import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const OTP_API = "http://localhost:8080/api/v1/auth/register/require-otp";
const REGISTER_API = "http://localhost:8080/api/v1/auth/register";
const LOGIN_API = "http://localhost:8080/api/v1/auth/login";
const LOGOUT_API = "http://localhost:8080/api/v1/auth/logout";


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
            });
            const objectResponse = await response.json();

            if (objectResponse.code != 1000) return rejectWithValue(objectResponse.message);
            else {
                localStorage.setItem('user', JSON.stringify(objectResponse.data.user));
                localStorage.setItem('accessToken', objectResponse.data.accessToken);
                console.log("local storage", localStorage.getItem('user'));
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
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include", // send cookie contain refresh token
            body: JSON.stringify({}),
        });

        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message || "Network error");
    }
})

const token = localStorage.getItem("accessToken")
    ? localStorage.getItem('accessToken')
    : null;

const authSlice = createSlice({
    name: "auth",
    initialState: {
        otpLoading: false,
        otpError: null,
        otpSuccess: false,
        authLoading: false,
        authError: null,
        authSuccess: false,
        message: null,
        user: null,
        token,
    },
    reducers: {
        resetAuthState: (state) => {
            state.otpError = null;
            state.otpLoading = false;
            state.otpSuccess = false;
            state.authError = null;
            state.authLoading = false;
            state.authSuccess = false;
            state.message = null;
        },
        logout: (state) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            state.authError = null;
            state.authLoading = false;
            state.authSuccess = false;
            state.message = null;
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: {
        [requestOTP.pending]: (state) => {
            state.otpLoading = true;
            state.otpError = false;
        },
        [requestOTP.fulfilled]: (state, { payload }) => {
            state.otpLoading = false;
            state.otpSuccess = true;
            state.message = payload.message;
        },
        [requestOTP.rejected]: (state, { payload }) => {
            state.otpLoading = false;
            state.otpError = payload;
        },
        [registerUser.pending]: (state) => {
            state.authLoading = true;
            state.authError = false;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.authLoading = false;
            state.authSuccess = true;
            state.message = payload.message;
            state.user = payload.data.user;
            state.token = payload.data.accessToken;
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.authLoading = false;
            state.authError = payload;
        },
        [loginUser.pending]: (state) => {
            state.authLoading = true;
            state.authError = false;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.authLoading = false;
            state.authSuccess = true;
            state.message = payload.message;
            state.user = payload.data.user;
            state.token = payload.data.accessToken;
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.authLoading = false;
            state.authError = payload;
        },
    },
});

export const { resetAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
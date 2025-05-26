

import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URLS } from '../../utils/constant';
import { handleErrorResponse } from '../../utils/handle';

export const registerUser = createAsyncThunk("auth/registerUser",
    async ({ code, email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URLS.REGISTER, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({ email, password, code }),
            });
            const apiResponse = await response.json();

            if (apiResponse.status != 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            };
            return apiResponse.data;
        } catch (error) {
            return rejectWithValue(handleErrorResponse(
                {
                    code: 'NETWORK_ERROR',
                    message: "Network error"
                }
            ));
        }
    });

export const loginUser = createAsyncThunk("auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URLS.LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });
            const apiResponse = await response.json();

            if (apiResponse.status != 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            };
            return apiResponse.data;
        } catch (error) {
            return rejectWithValue(handleErrorResponse(
                {
                    code: 'NETWORK_ERROR',
                    message: "Network error"
                }
            ));
        }
    });

export const logoutUser = createAsyncThunk("auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URLS.LOG_OUT, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                credentials: "include",
            });
            const apiResponse = await response.json();

            if (apiResponse.status != 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            };
            return apiResponse.data;
        } catch (error) {
            return rejectWithValue(handleErrorResponse(
                {
                    code: 'NETWORK_ERROR',
                    message: "Network error"
                }
            ));
        }
    });



export const refreshToken = createAsyncThunk("auth/refreshToken",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URLS.REFRESH_TOKEN, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                credentials: "include",
            });
            const apiResponse = await response.json();

            if (apiResponse.status != 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            };
            return apiResponse.data;
        } catch (error) {
            return rejectWithValue(handleErrorResponse(
                {
                    code: 'NETWORK_ERROR',
                    message: "Network error"
                }
            ));
        }
    });


export const otpResetPassword = createAsyncThunk("auth/otpResetPassword",
    async ({ email }, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URLS.OTP_RESET_PASSWORD, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ email }),
            });
            const apiResponse = await response.json();

            if (apiResponse.status != 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            };
            return apiResponse.data;
        } catch (error) {
            return rejectWithValue(handleErrorResponse(
                {
                    code: 'NETWORK_ERROR',
                    message: "Network error"
                }
            ));
        }
    });


export const otpRegister = createAsyncThunk("auth/otpRegister",
    async ({ email }, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URLS.OTP_REGISTER, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ email }),
            });
            const apiResponse = await response.json();

            if (apiResponse.status != 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            };
            return apiResponse.data;
        } catch (error) {
            return rejectWithValue(handleErrorResponse(
                {
                    code: 'NETWORK_ERROR',
                    message: "Network error"
                }
            ));
        }
    });


export const resetPassword = createAsyncThunk("auth/resetPassword",
    async ({ email, newPassword, code }, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URLS.RESET_PASSWORD, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ email, newPassword, code }),
                credentials: "include",
            });
            const apiResponse = await response.json();

            if (apiResponse.status != 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            };
            return apiResponse.data;
        } catch (error) {
            return rejectWithValue(handleErrorResponse(
                {
                    code: 'NETWORK_ERROR',
                    message: "Network error"
                }
            ));
        }
    });

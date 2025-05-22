import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URLS } from "../../utils/constant";
import { handleErrorResponse } from "../../utils/handle";

export const getOutstandingStream = createAsyncThunk(
    'stream/getOutstandingStream',
    async ({ page = 0, size = 1 }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.STREAM_OUTSTANDING.replace('{page}', page).replace('{size}', size);
            const headers = {
                "Content-Type": "application/json",
            };
            if (localStorage.getItem("accessToken")) {
                headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
            }

            const response = await fetch(TARGET_URL, {
                method: 'GET',
                headers,
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return {
                streams: apiResponse.data.streams,
                currentPage: apiResponse.data.currentPage,
                totalPages: apiResponse.data.totalPages,
            };
        } catch (error) {
            return rejectWithValue(
                handleErrorResponse({
                    code: 'NETWORK_ERROR',
                    message: 'Network error',
                })
            );
        }
    }
);


export const getRecommendedStreams = createAsyncThunk(
    'stream/getRecommendedStreams',
    async ({ status = 1, key = '', page = 0, size = 8 }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.STREAM_RECOMMENDED.replace('{status}', status).replace('{key}', key)
                .replace('{page}', page).replace('{size}', size);

            const headers = {
                "Content-Type": "application/json",
            };
            if (localStorage.getItem("accessToken")) {
                headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
            }

            const response = await fetch(TARGET_URL, {
                method: 'GET',
                headers,
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return {
                streams: apiResponse.data.streams,
                currentPage: apiResponse.data.currentPage,
                totalPages: apiResponse.data.totalPages,
            };
        } catch (error) {
            return rejectWithValue(
                handleErrorResponse({
                    code: 'NETWORK_ERROR',
                    message: 'Network error',
                })
            );
        }
    }
);


export const getRecentStreams = createAsyncThunk(
    'stream/getRecentStreams',
    async ({ status = 0, key = '', page = 0, size = 8 }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.STREAM_RECOMMENDED.replace('{status}', status).replace('{key}', key)
                .replace('{page}', page).replace('{size}', size);

            const headers = {
                "Content-Type": "application/json",
            };
            if (localStorage.getItem("accessToken")) {
                headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
            }

            const response = await fetch(TARGET_URL, {
                method: 'GET',
                headers,
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return {
                streams: apiResponse.data.streams,
                currentPage: apiResponse.data.currentPage,
                totalPages: apiResponse.data.totalPages,
            };
        } catch (error) {
            return rejectWithValue(
                handleErrorResponse({
                    code: 'NETWORK_ERROR',
                    message: 'Network error',
                })
            );
        }
    }
);


export const getStreamById = createAsyncThunk(
    'stream/getStreamById',
    async ({ streamId }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.GET_STREAM.replace('{streamId}', streamId);

            const headers = {
                "Content-Type": "application/json",
            };
            if (localStorage.getItem("accessToken")) {
                headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
            }
            
            const response = await fetch(TARGET_URL, {
                method: 'GET',
                headers
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return apiResponse.data;
        } catch (error) {
            return rejectWithValue(
                handleErrorResponse({
                    code: 'NETWORK_ERROR',
                    message: 'Network error',
                })
            );
        }
    }
);



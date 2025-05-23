import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URLS } from "../../utils/constant";
import { handleErrorResponse } from "../../utils/handle";

export const getRecommendedCategories = createAsyncThunk(
    'category/getRecommendedCategories',
    async ({ key = '', page = 0, size = 12 }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.CATEGORIES_RECOMMENDED
                .replace('{key}', key)
                .replace('{page}', page)
                .replace('{size}', size);

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
                categories: apiResponse.data.categories,
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

export const getCategoryStreams = createAsyncThunk(
    'category/getCategoryStreams',
    async ({ categoryId, key = '', page = 0, size = 16 }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.CATEGORY_STREAMS.replace('{categoryId}', categoryId)
                .replace('{key}', key).replace('{page}', page).replace('{size}', size);
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


export const categoryInterest = createAsyncThunk(
    'category/categoryInterest',
    async ({ categoryId, isInterested }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.INTERESTED_CATEGORY.replace('{categoryId}', categoryId);
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            };

            const response = await fetch(TARGET_URL, {
                method: 'POST',
                headers,
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return { categoryId, isInterested: !isInterested };
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

export const categoryUninterest = createAsyncThunk(
    'category/categoryUninterest',
    async ({ categoryId, isInterested }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.INTERESTED_CATEGORY.replace('{categoryId}', categoryId);
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            };

            const response = await fetch(TARGET_URL, {
                method: 'DELETE',
                headers,
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return { categoryId, isInterested: !isInterested };
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

export const getCategoryById = createAsyncThunk(
    'category/getCategoryById',
    async (categoryId, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.GET_CATEGORY.replace('{categoryId}', categoryId);
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



export const getAllCategory = createAsyncThunk(
    'category/getAllCategory',
    async ({ key = '', page = 0, size = 100 }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.GET_ALL_CATEGORIES
                .replace('{key}', key).replace('{page}', page).replace('{size}', size);

            const response = await fetch(TARGET_URL, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return {
                categoryList: apiResponse.data.categories,
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




export const getInterestedCategories = createAsyncThunk(
    'category/getInterestedCategories',
    async ({ key = '', page = 0, size = 100 }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.GET_INTERESTED_CATEGORIES
                .replace('{key}', key).replace('{page}', page).replace('{size}', size);

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            };

            const response = await fetch(TARGET_URL, {
                method: 'GET',
                headers,
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return {
                categoryList: apiResponse.data.categories,
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

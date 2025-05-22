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
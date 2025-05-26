import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URLS } from "../../utils/constant";
import { handleErrorResponse } from "../../utils/handle";

export const getUserProfile = createAsyncThunk(
    'user/getUserProfile',
    async ({ username }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.USER_PROFILE.replace('{username}', username);

             const headers = {
                "Content-Type": "application/json",
            };
            if (localStorage.getItem("accessToken")) {
                headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
            }
            
            console.log("header", headers)
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



export const unfollowUserInStream = createAsyncThunk(
    'connection/unfollowUser',
    async ({ username }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.UNFOLLOW_USER.replace('{username}', username);
            const response = await fetch(TARGET_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return { username };
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


export const followUserInStream = createAsyncThunk(
    'connection/followUser',
    async ({ username }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.FOLLOW_USER.replace('{username}', username);
            const response = await fetch(TARGET_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return { username };
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

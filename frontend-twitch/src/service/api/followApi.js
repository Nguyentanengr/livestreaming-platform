import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URLS } from "../../utils/constant";
import { handleErrorResponse } from "../../utils/handle";

export const getFollowedUsers = createAsyncThunk(
    'follow/getFollowedUsers',
    async ({ page = 0, size = 10 }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.GET_FOLLOWED_USERS
                .replace('{key}', '')
                .replace('{page}', page)
                .replace('{size}', size);

            const response = await fetch(TARGET_URL, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return {
                users: apiResponse.data.users,
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




export const unfollowUserInFollowing = createAsyncThunk(
    'connection/unfollowUserInFollowing',
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


export const followUserInFollowing = createAsyncThunk(
    'connection/followUserInFollowing',
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

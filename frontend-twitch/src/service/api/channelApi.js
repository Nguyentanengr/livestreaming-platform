
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URLS } from "../../utils/constant";
import { handleErrorResponse } from "../../utils/handle";



export const unfollowUserInChannel = createAsyncThunk(
    'connection/unfollowUserInChannel',
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


export const followUserInChannel = createAsyncThunk(
    'connection/followUserInChannel',
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



export const getStreams = createAsyncThunk("getStreams",
    async ({ username, page, size }, { rejectWithValue }) => {
        try {
            console.log("getMyStreams", username, page, size);
            const TARGET_URL = API_URLS.GET_MY_STREAMS
                .replace('{username}', username)
                .replace('{page}', page)
                .replace('{size}', size);

            // config header (public endpoint nhưng cần token để lấy thông tin người dùng)
            const headers = {
                "Content-Type": "application/json",
            };
            if (localStorage.getItem("accessToken")) {
                headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
            }

            const response = await fetch(TARGET_URL, {
                method: "GET",
                headers
            });
            const apiResponse = await response.json();

            // response
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



export const getReels = createAsyncThunk("getReels",
    async ({ username, page, size }, { rejectWithValue }) => {
        try {
            console.log("getMyReels", username, page, size);
            const TARGET_URL = API_URLS.GET_MY_REELS
                .replace('{username}', username)
                .replace('{page}', page)
                .replace('{size}', size);

            // config header (public endpoint nhưng cần token để lấy thông tin người dùng)
            const headers = {
                "Content-Type": "application/json",
            };
            if (localStorage.getItem("accessToken")) {
                headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
            }

            const response = await fetch(TARGET_URL, {
                method: "GET",
                headers
            });
            const apiResponse = await response.json();

            // response
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

import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URLS } from "../../utils/constant";
import { handleErrorResponse } from "../../utils/handle";

export const getMyProfile = createAsyncThunk("getMyProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URLS.GET_MY_PROFILE, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
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

export const getMyStreams = createAsyncThunk("getMyStreams",
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



export const getMyReels = createAsyncThunk("getMyReels",
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

export const updateMyProfile = createAsyncThunk(
    "profile/updateMyProfile",
    async (formData, { rejectWithValue }) => {
        try {
            console.log("Sending updateMyProfile request with FormData:");
            for (const pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }

            const response = await fetch(API_URLS.UPDATE_MY_PROFILE, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: formData,
            });

            const apiResponse = await response.json();
            console.log("API Response:", apiResponse);

            if (apiResponse.status !== "success") {
                return rejectWithValue({
                    code: apiResponse.error?.code || "API_ERROR",
                    message: apiResponse.error?.message || "Cập nhật hồ sơ thất bại",
                });
            }

            return apiResponse.data;
        } catch (error) {
            console.error("UpdateMyProfile error:", error);
            return rejectWithValue({
                code: "NETWORK_ERROR",
                message: error.message || "Lỗi mạng xảy ra",
            });
        }
    }
);



export const changePassword = createAsyncThunk(
    "profile/changePassword",
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URLS.CHANGE_PASSWORD || "/me/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(passwordData),
            });

            const apiResponse = await response.json();
            console.log("ChangePassword API Response:", apiResponse);

            if (apiResponse.status !== "success") {
                return rejectWithValue({
                    code: apiResponse.error?.code || "API_ERROR",
                    message: apiResponse.error?.message || "Failed to change password",
                });
            }

            return apiResponse.data;
        } catch (error) {
            console.error("ChangePassword error:", error);
            return rejectWithValue({
                code: "NETWORK_ERROR",
                message: error.message || "Network error occurred",
            });
        }
    }
);
import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URLS } from '../../utils/constant';
import { handleErrorResponse } from '../../utils/handle';

export const createReel = createAsyncThunk(
    'reel/createReel',
    async ({ reelData, videoFile, thumbnailFile }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('reel', new Blob([JSON.stringify(reelData)], { type: 'application/json' }));
            formData.append('video', videoFile);
            formData.append('thumbnail', thumbnailFile);

            const response = await fetch(API_URLS.CREATE_REEL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: formData,
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

export const getRcmReel = createAsyncThunk(
    'recommendReel/getRcmReel',
    async ({ key = '', page, size }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.RECOMMENDED_REELS.replace('{key}', key).replace('{page}', page).replace('{size}', size);

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
                reels: apiResponse.data.reels,
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


export const likeReel = createAsyncThunk(
    'recommendReel/likeReel',
    async ({ reelId }, { rejectWithValue }) => {
        try {

            const TARGET_URL = API_URLS.LIKE_REEL.replace('{reelId}', reelId);
            const response = await fetch(TARGET_URL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
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



export const unlikeReel = createAsyncThunk(
    'recommendReel/unlikeReel',
    async ({ reelId }, { rejectWithValue }) => {
        try {

            const TARGET_URL = API_URLS.UNLIKE_REEL.replace('{reelId}', reelId);
            const response = await fetch(TARGET_URL, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
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


export const getComments = createAsyncThunk(
    'comment/getComments',
    async ({ reelId, page, size }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.GET_COMMENT.replace('{reelId}', reelId).replace('{page}', page).replace('{size}', size);

            const response = await fetch(TARGET_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return {
                comments: apiResponse.data.comments,
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

export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({ reelId, content }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.CREATE_COMMENT.replace('{reelId}', reelId);
            const response = await fetch(TARGET_URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return apiResponse.data; // Returns CommentCreationResponse
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

// New deleteComment thunk
export const deleteComment = createAsyncThunk(
    'comment/deleteComment',
    async ({ reelId, commentId }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.DELETE_COMMENT.replace('{reelId}', reelId).replace('{commentId}', commentId);
            const response = await fetch(TARGET_URL, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return { reelId, commentId }; // Return meta data for slice to process
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


export const likeComment = createAsyncThunk(
    'comment/likeComment',
    async ({ reelId, commentId }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.LIKE_COMMENT.replace('{reelId}', reelId).replace('{commentId}', commentId);
            const response = await fetch(TARGET_URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return { commentId }; 
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


export const unlikeComment = createAsyncThunk(
    'comment/unlikeComment',
    async ({ reelId, commentId }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.UNLIKE_COMMENT.replace('{reelId}', reelId).replace('{commentId}', commentId);
            const response = await fetch(TARGET_URL, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return { commentId }; // Return commentId for state update
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


export const followUser = createAsyncThunk(
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

export const unfollowUser = createAsyncThunk(
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
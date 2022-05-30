import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import avatarService from './avatarService'

const initialState = {
    avatars: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create avatar
export const createAvatar = createAsyncThunk(
    'avatar/create',
    async (avatarData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().parents.parent.token
            return await avatarService.createAvatar(avatarData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get Avatars
export const getAvatars = createAsyncThunk(
    'avatar/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().parents.parent.token
            return await avatarService.getAvatars(token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete avatar
export const deleteAvatar = createAsyncThunk(
    'avatar/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().parents.parent.token
            return await avatarService.deleteAvatar(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const avatarSlice = createSlice({
    name: 'avatar',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAvatar.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createAvatar.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.avatars.push(action.payload)
            })
            .addCase(createAvatar.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAvatars.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAvatars.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.avatars = action.payload
            })
            .addCase(getAvatars.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteAvatar.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteAvatar.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.avatars = state.avatars.filter(
                    (avatar) => avatar._id !== action.payload.id
                )
            })
            .addCase(deleteAvatar.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = avatarSlice.actions
export default avatarSlice.reducer
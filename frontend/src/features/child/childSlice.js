import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import childService from './childService'

// Get child from localStorage
const child = JSON.parse(localStorage.getItem('child'))

const initialState = {
    child: child ? child : null,
    children: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Add child
export const addChild = createAsyncThunk(
    'child/create',
    async (childData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.parent.token
            return await childService.addChild(childData, token)
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

// Get children
export const getChildren = createAsyncThunk(
    'child/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.parent.token
            return await childService.getChildren(token)
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

// Delete child
export const deleteChild = createAsyncThunk(
    'child/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.parent.token
            return await childService.deleteChild(id, token)
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

export const childSlice = createSlice({
    name: 'child',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addChild.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addChild.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.children.push(action.payload)
            })
            .addCase(addChild.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getChildren.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getChildren.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.children = action.payload
            })
            .addCase(getChildren.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteChild.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteChild.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.children = state.children.filter(
                    (child) => child._id !== action.payload.id
                )
            })
            .addCase(deleteChild.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = childSlice.actions
export default childSlice.reducer
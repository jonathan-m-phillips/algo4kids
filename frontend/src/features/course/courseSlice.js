import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import courseService from './courseService'

const initialState = {
    courses: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Add course
export const addCourse = createAsyncThunk(
    'course/create',
    async (courseData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().parents.parent.token
            return await courseService.addCourse(courseData, token)
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

// Get courses
export const getCourses = createAsyncThunk(
    'course/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().parents.parent.token
            return await courseService.getCourses(token)
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

// Delete course
export const deleteCourse = createAsyncThunk(
    'course/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().parents.parent.token
            return await courseService.deleteCourse(id, token)
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

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCourse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addCourse.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courses.push(action.payload)
            })
            .addCase(addCourse.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCourses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courses = action.payload
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteCourse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courses = state.courses.filter(
                    (course) => course._id !== action.payload.id
                )
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = courseSlice.actions
export default courseSlice.reducer
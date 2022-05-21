import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get parent from localStorage
const parent = JSON.parse(localStorage.getItem('parent'))

const initialState = {
  parent: parent ? parent : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register parent
export const register = createAsyncThunk(
  'auth/register',
  async (parent, thunkAPI) => {
    try {
      return await authService.register(parent)
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

// Login parent
export const login = createAsyncThunk('auth/login', async (parent, thunkAPI) => {
  try {
    return await authService.login(parent)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.parent = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.parent = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.parent = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.parent = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.parent = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
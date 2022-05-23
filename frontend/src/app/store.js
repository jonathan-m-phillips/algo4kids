import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import childReducer from "../features/child/childSlice"
import avatarReducer from "../features/avatar/avatarSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    children: childReducer,
    avatars: avatarReducer
  },
});

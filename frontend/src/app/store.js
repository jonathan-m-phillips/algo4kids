import { configureStore } from '@reduxjs/toolkit'
import parentReducer from '../features/parent/parentSlice'
import childReducer from "../features/child/childSlice"
import avatarReducer from "../features/avatar/avatarSlice"

export const store = configureStore({
  reducer: {
    parents: parentReducer,
    children: childReducer,
    avatars: avatarReducer
  },
});

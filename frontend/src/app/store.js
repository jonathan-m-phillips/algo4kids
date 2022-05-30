import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '../features/admin/adminSlice'
import parentReducer from '../features/parent/parentSlice'
import childReducer from "../features/child/childSlice"
import avatarReducer from "../features/avatar/avatarSlice"

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    parents: parentReducer,
    children: childReducer,
    avatars: avatarReducer
  },
});

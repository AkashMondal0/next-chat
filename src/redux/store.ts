import { configureStore } from '@reduxjs/toolkit'
import  counterCounter  from './slices/counter'
import conversation from './slices/conversation'

export const store = configureStore({
  reducer: {
    counter: counterCounter,
    conversation: conversation,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
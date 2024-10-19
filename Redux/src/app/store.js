import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/reducer.js'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
})

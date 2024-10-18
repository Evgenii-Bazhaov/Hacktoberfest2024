import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: JSON.parse(localStorage.getItem('todos')) || [],
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload)
      localStorage.setItem('todos', JSON.stringify(state.list))
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload)
      localStorage.setItem('todos', JSON.stringify(state.list))
    },
    toggleComplete: (state, action) => {
      const todo = state.list.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
        localStorage.setItem('todos', JSON.stringify(state.list))
      }
    },
  },
})

export const { addTodo, deleteTodo, toggleComplete } = todoSlice.actions

export default todoSlice.reducer

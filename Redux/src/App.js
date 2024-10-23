import React from 'react'
import { Container, Typography } from '@mui/material'
import AddTodoForm from './components/AddTodoForm'
import TodoList from './components/TodoList'

const App = () => {
  return (
    <Container maxWidth='sm'>
      <Typography variant='h3' align='center' gutterBottom>
        Todo List
      </Typography>
      <AddTodoForm />
      <TodoList />
    </Container>
  )
}

export default App

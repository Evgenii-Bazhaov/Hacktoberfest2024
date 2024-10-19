import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo, toggleComplete } from '../features/reducer'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
const TodoList = () => {
  const todos = useSelector((state) => state.todos.list)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id))
  }

  return (
    <List>
      {todos.map((todo) => (
        <ListItem key={todo.id}>
          <ListItemText
            primary={todo.text}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          />
          <ListItemSecondaryAction>
            <Checkbox
              sx={{ '& .MuiSvgIcon-root': { fontSize: 38 } }}
              {...label}
              color='success'
              onChange={() => handleToggleComplete(todo.id)}
            />
            <Button
              variant='outlined'
              color='error'
              onClick={() => handleDelete(todo.id)}
            >
              <DeleteIcon />
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

export default TodoList

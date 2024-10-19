// components/AddTodoForm.js
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/reducer'
import { TextField, Button, Grid } from '@mui/material'

const AddTodoForm = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = () => {
    if (text.trim() === '') {
      alert('Please enter a todo!')
      return
    }
    dispatch(
      addTodo({
        id: Date.now(),
        text,
        completed: false,
      })
    )
    setText('')
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label='Add Todo'
          variant='outlined'
          value={text}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={4}>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  )
}

export default AddTodoForm

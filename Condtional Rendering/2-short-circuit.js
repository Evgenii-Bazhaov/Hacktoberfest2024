import React, { useState } from 'react'
// short-circuit evaluation
// ternary operator

const ShortCircuit = () => {
  const [text, setText] = useState('')
  const [IsError, setIsError] = useState(false)
  return (
    <>
      <h1>{text || 'Sahil Arora'}</h1>
      <button
        className='btn'
        onClick={() => {
          setIsError(!IsError)
        }}
      >
        Click to check for error
      </button>
      {IsError ? <p>There is an error</p> : <p>No Error...</p>}
    </>
  )
}

export default ShortCircuit

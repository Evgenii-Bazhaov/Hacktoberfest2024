import React from 'react'

const Welcome = ({user}) => {
  return (
    <div className='flex items-center justify-center h-full'>
        <div>
          <p className='text-white text-7xl'>Welcome {user.firstName} {user.lastName}!</p>
          <p className='text-white text-2xl text-center mt-5'>Please select a chat to start messaging</p>
        </div>
    </div>
  )
}

export default Welcome
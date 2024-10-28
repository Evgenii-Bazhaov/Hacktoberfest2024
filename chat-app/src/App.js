import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OpenRoute from './components/OpenRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Chat from './pages/Chat'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path='/' element={<OpenRoute><Home/></OpenRoute>}/>
            <Route path='/login' element={<OpenRoute><Login/></OpenRoute>}/>
            <Route path='/signup' element={<OpenRoute><Signup/></OpenRoute>}/>
            <Route path='/chat' element={<PrivateRoute><Chat/></PrivateRoute>}/>
        </Routes>
    </div>
  )
}

export default App
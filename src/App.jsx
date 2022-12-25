import React, { useState } from 'react'
import { db } from './fire-base'
import Main from './pages/main/main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Navbar from './Components/Navbar'
import CreatePost from './pages/create-post/Createpost'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/createpost' element={<CreatePost />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

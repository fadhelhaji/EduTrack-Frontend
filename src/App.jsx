import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import {Routes, Route} from 'react-router'
import ClassForm from './components/Classes/ClassForm'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/class/new' element={<ClassForm />} />
      </Routes>
    </div>
  )
}

export default App
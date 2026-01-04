import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import {Routes, Route} from 'react-router'
import ClassForm from './components/Classes/ClassForm'
import ClassList from './components/Classes/ClassList'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/class/new' element={<ClassForm />} />
        <Route path='/class' element={<ClassList />} />
      </Routes>
    </div>
  )
}

export default App
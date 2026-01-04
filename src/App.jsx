import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import {Routes, Route} from 'react-router'
import ClassForm from './components/Classes/ClassForm'
import ClassList from './components/Classes/ClassList'
import ClassDetails from './components/Classes/ClassDetails'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/class/new' element={<ClassForm />} />
        <Route path='/class' element={<ClassList />} />
        <Route path="/class/:id" element={<ClassDetails />} />
        <Route path="/class/:id/edit" element={<ClassForm />} />
      </Routes>
    </div>
  )
}

export default App
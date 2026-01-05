import { Route, Routes } from 'react-router'
import ClassDetails from './components/Classes/ClassDetails'
import ClassForm from './components/Classes/ClassForm'
import ClassList from './components/Classes/ClassList'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import SignUpForm from './components/User/SignUp/SignUpForm'

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
        <Route path='/sign-up' element={<SignUpForm />} />
      </Routes>
    </div>
  )
}

export default App
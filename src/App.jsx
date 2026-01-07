import { Route, Routes } from 'react-router'
import ClassDetails from './components/Classes/ClassDetails'
import ClassForm from './components/Classes/ClassForm'
import ClassList from './components/Classes/ClassList'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import Navbar from './components/Navbar/Navbar'
import SignInForm from './components/User/SignIn/SignInForm'
import SignUpForm from './components/User/SignUp/SignUpForm'

import { useContext } from 'react'

import AssignmentDetails from './components/Assignment/AssignmentDetails'
import AssignmentForm from './components/Assignment/AssignmentForm'
import AssignmentList from './components/Assignment/AssignmentList'

import SubmissionList from "./components/Submission/SubmissionList"
import SubmissionDetails from "./components/Submission/SubmissionsDetails"


import { UserContext } from './components/Contexts/UserContext'
import StudentList from './components/Students/StudentList'



function App() {
    const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={user ? <Home /> : <Landing />} />

        <Route path="/auth/sign-up" element={<SignUpForm />} />
        <Route path="/auth/sign-in" element={<SignInForm />} />
        

        {/* {user?.role ==='Student' && (
          <>
          
          
            <Route
              path="/assignment/:id/submit"
              element={<SubmissionForm studentId={user._id} />}
            />
            <Route path="/submissions" element={<SubmissionList />} />
            <Route path="/submission/:id" element={<SubmissionDetails />} />


          </>
        )} */}

        {user?.role === "Instructor" && (
          <>
            <Route path="/class" element={<ClassList />} />
            <Route path="/class/:id" element={<ClassDetails />} />
            <Route path="/class/new" element={<ClassForm />} />
            <Route path="/class/:id/edit" element={<ClassForm />} />
            <Route path='/assignment/new' element={<AssignmentForm />} />
            <Route path='/assignment' element={<AssignmentList />} />
            <Route path="/assignment/:id" element={<AssignmentDetails />} />
            <Route path="/assignment/:id/edit" element={<AssignmentForm />} />
            <Route path="/class/:id/assignment/new" element={<AssignmentForm />} />
            <Route path='/auth/students' element={<StudentList />} />
            <Route path="/submissions" element={<SubmissionList />} />
            <Route path="/submission/:id" element={<SubmissionDetails />} />

          </>
        )}

      </Routes>
    </div>
  )
}

export default App
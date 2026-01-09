import { Navigate, Route, Routes } from 'react-router';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from 'react';

import { UserContext } from './components/Contexts/UserContext';
import Navbar from './components/Navbar/Navbar';
import Footbar from './components/Footbar/Footbar';
import Sidebar from './components/Sidebar/Sidebar';

import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Profile from './components/Profile/Profile';
import ClassDetails from './components/Classes/ClassDetails';
import ClassForm from './components/Classes/ClassForm';
import ClassList from './components/Classes/ClassList';
import SignInForm from './components/User/SignIn/SignInForm';
import SignUpForm from './components/User/SignUp/SignUpForm';
import AssignmentDetails from './components/Assignment/AssignmentDetails';
import AssignmentForm from './components/Assignment/AssignmentForm';
import AssignmentList from './components/Assignment/AssignmentList';
import MySubmissions from "./components/Submission/MySubmissions";
import SubmissionForm from "./components/Submission/SubmissionForm";
import SubmissionList from "./components/Submission/SubmissionList";
import SubmissionDetails from "./components/Submission/SubmissionsDetails";

function App() {
  const { user } = useContext(UserContext);

  return (
 <div className="min-h-screen bg-[#eceff4] flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {user && (
          <aside className="w-64 shrink-0 border-r border-[#d8dee9] bg-[#2e3440]">
            <Sidebar />
          </aside>
        )}
        <main className="flex-1">
          <div className="p-6 md:p-10 max-w-400 mx-auto">
            <Routes>
              <Route path="/" element={user ? <Home /> : <Landing />} />
              <Route path="/auth/sign-up" element={<SignUpForm />} />
              <Route path="/auth/sign-in" element={<SignInForm />} />

              {user && (
                <>
                  <Route path="/submissions" element={<SubmissionList user={user} />} />
                  <Route path="/submissions/new" element={<SubmissionForm />} />
                  <Route path="/submission/:id" element={<SubmissionDetails />} />
                  <Route path="/profile" element={<Profile />} />
                </>
              )}

              {user?.role === "Student" && (
                <>
                  <Route path="/my-submissions" element={<MySubmissions />} />
                  <Route path="/assignment" element={<AssignmentList />} />
                  <Route path="/assignment/:id" element={<AssignmentDetails />} />
                </>
              )}

              {user?.role === "Instructor" && (
                <>
                  <Route path="/class" element={<ClassList />} />
                  <Route path="/class/new" element={<ClassForm />} />
                  <Route path="/class/:id" element={<ClassDetails />} />
                  <Route path="/class/:id/edit" element={<ClassForm />} />
                  <Route path="/assignment" element={<AssignmentList />} />
                  <Route path="/assignment/new" element={<AssignmentForm />} />
                  <Route path="/class/:id/assignment/new" element={<AssignmentForm />} />
                  <Route path="/class/:id/assignment/:assignmentId/edit" element={<AssignmentForm />} />
                  <Route path="/class/:classId/assignment/:assignmentId" element={<AssignmentDetails />} />
                </>
              )}

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
      </div>

      {!user && (
        <Footbar />
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default App;
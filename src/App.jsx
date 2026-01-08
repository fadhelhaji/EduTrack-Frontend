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
    <div className="flex flex-col min-h-screen bg-[#eceff4]">
      
      <header className="fixed top-0 left-0 w-full z-110">
        <Navbar />
      </header>
      
      
      {user && <Sidebar />}

      
      <main 
        className={`grow pt-20 pb-20 transition-all duration-300 ${user ? 'md:ml-64' : 'ml-0'}`}
      >
        <div className="p-8 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Landing />} />
            <Route path="/auth/sign-up" element={<SignUpForm />} />
            <Route path="/auth/sign-in" element={<SignInForm />} />
            <Route path="/profile" element={<Profile />} />

           
            {user && (
              <>
                <Route path="/assignment" element={<AssignmentList />} />
                <Route path="/assignment/:id" element={<AssignmentDetails />} />
                <Route path="/submissions/new" element={<SubmissionForm />} />
                <Route path="/submission/:id" element={<SubmissionDetails />} />
              </>
            )}

            
            {user?.role === "Student" && (
              <Route path="/my-submissions" element={<MySubmissions />} />
            )}

            {user?.role === "Instructor" && (
              <>
                <Route path="/class" element={<ClassList />} />
                <Route path="/class/new" element={<ClassForm />} />
                <Route path="/class/:id" element={<ClassDetails />} />
                <Route path="/class/:id/edit" element={<ClassForm />} />
                <Route path="/assignment/new" element={<AssignmentForm />} />
                <Route path="/submissions" element={<SubmissionList user={user} />} />
                <Route path="/class/:id/assignment/new" element={<AssignmentForm />} />
              </>
            )}
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>

     
      <footer className="fixed bottom-0 left-0 w-full z-110">
        <Footbar />
      </footer>
      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default App;
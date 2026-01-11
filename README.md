# 🎓 EduTrack  
### A MERN-Stack School & Learning Management System

---

## 📸 Screenshot / Logo

### Landing Page
<img src="/src/assets/Pictures/LandingPage/LandingPage1.png" alt="Landing Page Screenshot 1">
<img src="/src/assets/Pictures/LandingPage/LandingPage2.png" alt="Landing Page Screenshot 2">
<img src="/src/assets/Pictures/LandingPage/LandingPage3.png" alt="Landing Page Screenshot 3">

### Sign Up Page
<img src="/src/assets/Pictures/Auth/AuthSignUp.png" alt="Sign Up Page">

### Sign In Page
<img src="/src/assets/Pictures/Auth/AuthSignIn.png" alt="Sign In Page">

### Instructor Portal
<img src="/src/assets/Pictures/InstructorPortal/InstructorLandingDashboard.png" alt="Instructor Portal Landing Page">

### Student Portal
<img src="/src/assets/Pictures/StudentPortal/StudentDashboard.png" alt="Student Portal Landing Page">


---

## 📖 Description

**EduTrack** is a centralized **School & Learning Management System (LMS)** built using the **MERN stack**.  
It enables institutions to create classes, enroll students, manage assignments, collect submissions, and facilitate grading and academic feedback all within a single platform.

The system supports two primary roles:
- **Instructors**, who manage classes and assignments
- **Students**, who submit work and receive feedback

EduTrack provides a structured, secure, and role-based academic environment that mirrors real-world school systems.

---

## 💡 Background & Motivation

EduTrack was created to address a common challenge in academic environments:
Many institutions depend on multiple tools like emails, messaging apps, and cloud storage, which often leads to missed deadlines, unclear feedback, and poor organization.

EduTrack centralizes the entire academic workflow into one platform, offering:
- Complete assignment management from creation to grading
- Secure, role-based access for instructors and students
- Transparent tracking of grades and feedback

---

## 👥 User Roles & Functionality

### 🧑‍🏫 Instructor (Admin)

- Create, edit, and delete classes
- Enroll and manage students
- Create, update, and delete assignments
- View submissions per assignment
- Grade submissions and provide feedback
- Track submission status and deadlines
- Receive email notifications on submissions

---

### 🎓 Student (User)

- View enrolled classes
- See pending vs completed assignments
- Submit assignments (repo links)
- View grades and instructor feedback
- Visual indicators for upcoming and overdue deadlines

---

### 🚫 Guest Users

- Can only access the landing page
- Cannot create, update, or delete any data
- Restricted from protected routes

---

## 🚀 Getting Started

- 🌐 **Live App:**  
N/A

- 🧠 **Planning Materials:**
ERD: <img src ="src/assets/Pictures/ProjectPlan/ERD.jpeg" alt="Project ERD">

Initial App Flow: <img src="src/assets/Pictures/ProjectPlan/InitialWebFlow.png" alt="Page Flow">

- ⚙️ **Back-End Repository:**
https://github.com/fadhelhaji/EduTrack-Backend

---

## 🛠️ Technologies Used

### Frontend
- JavaScript (ES6+)
- React (Vite)
- React Router
- Axios
- Tailwind CSS
- DaisyUI
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JSON Web Tokens (JWT)
- Bcrypt
- Nodemailer

---

## 🔐 Authentication & Authorization

- JWT-based authentication (Sign Up / Sign In / Sign Out)
- Role-based authorization enforced on both frontend and backend
- Protected routes for instructors and students
- Secure password hashing
- No secret keys stored on the frontend

---

## 📜 Attributions

- Icons: [Lucide React](https://lucide.dev/)
- UI Components: [DaisyUI](https://daisyui.com/)
- Fonts & Styling: Tailwind CSS
- Email Service: Nodemailer

---

## 🔮 Next Steps (Future Enhancements)

- File uploads
- Attendance tracking
- Academic performance analytics
- Mobile-friendly optimization

---

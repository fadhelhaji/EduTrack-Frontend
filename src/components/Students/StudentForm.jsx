import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as authService from '../../services/authService';

function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
  });

    useEffect(() => {
    async function fetchStudent() {
        try {
        const studentData = await authService.show(id);
            setFormData({
            firstName: studentData.user.firstName,
            lastName: studentData.user.lastName,
            username: studentData.user.username
            });
        } catch (err) {
        console.log(err);
        }
    }
    fetchStudent();
    }, [id]);



  function handleChange(e) {
    setFormData({...formData,[e.target.name]: e.target.value,});
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const test = await authService.update(id, formData);
    navigate(`/auth/students/${id}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Student</h2>

      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />

      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />

      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />

      <button type="submit">Save Changes</button>
    </form>
  );
}

export default StudentForm;

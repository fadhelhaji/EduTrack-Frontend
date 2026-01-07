import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import * as authService from "../../services/authService";

function StudentDetails() {
    const [student, setStudent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function studentInfo() {
            try {
                const data = await authService.show(id);
                setStudent(data.user);
            } catch (error) {
                console.log(error);
            }
        }
        studentInfo();
    }, [id]);

    if (!student) return <p>Loading...</p>;

    return (
        <div>
            <p>First Name: {student.firstName}</p>
            <p>Last Name: {student.lastName}</p>
            <p>Username: {student.username}</p>
            <p>Role: {student.role}</p>
            <Link to={`/auth/students/${id}/edit`}>
                <button>Edit Student</button>
            </Link>
        </div>
    );
}

export default StudentDetails;

import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import * as authService from '../../services/authService'

function StudentList() {
    const [student, setStudent] = useState([])

    async function fetchStudents(){
        try {
            const data = await authService.index()
            console.log(data)
            setStudent(data.students)      
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{fetchStudents()},[])
  return (
    <div>
        {student.map((one)=>{
            return(
                <p key={one._id}>
                    <Link to={`/auth/students/${one._id}`}>
                        {one.firstName} {one.lastName}
                    </Link>
                </p>
            )
        })}
    </div>
  )
}

export default StudentList
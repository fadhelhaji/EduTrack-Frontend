import { useEffect, useState } from 'react'
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
                <p key={one._id}>{one.firstName}</p>
            )
        })}
    </div>
  )
}

export default StudentList
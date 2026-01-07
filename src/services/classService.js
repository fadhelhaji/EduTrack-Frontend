import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}`

//Create
async function create(formData){
    try {
        const token = localStorage.getItem("token"); // get JWT from localStorage
        const response = await axios.post(
            `${BASE_URL}/class/new`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`  // <-- send token in header
                }
            }
        );
        console.log(response.data.class);
        return response.data.class;
    } catch (error) {
        console.log(error);
    }
}

//create assignment
async function createAssignment(assignment, id){
    try {
        const token = localStorage.getItem("token"); // get JWT from localStorage
        const response = await axios.post(
            `${BASE_URL}/class/${id}/assignment/new`,
            assignment,
            {
                headers: {
                    Authorization: `Bearer ${token}`  // <-- send token in header
                }
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


//Index
async function index(){
    try {
        const response = await axios.get(`${BASE_URL}/class`)
        return response.data.classes
    } catch (error) {
        console.log(error);
    }
}

//Show
async function show(id) {
    try {
        const response = await axios.get(`${BASE_URL}/class/${id}`);
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

//Update
async function update(id, formData) {
    try {
        const response = await axios.put(`${BASE_URL}/class/${id}/edit`, formData);
        return response.data.class;
    } catch (error) {
        console.log(error);
    }
}

//Delete
async function remove(id) {
    try {
        const response = await axios.delete(`${BASE_URL}/class/${id}`);
        return response.data.class;
    } catch (error) {
        console.log(error);
    }
}

//get allavailable students
async function getAllStudents() {
  try {
    const response = await axios.get(`${BASE_URL}/students/all`);
    return response.data.students;
  } catch (error) {
    console.log(error);
  }
}

//add student
async function addStudent(classId, studentId) {
  try {
    const response = await axios.put(`${BASE_URL}/class/${classId}/add-student/${studentId}`, {}, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//remove student
async function removeStudent(classId, studentId) {
  try {
    const response = await axios.put(`${BASE_URL}/class/${classId}/remove-student/${studentId}`, {}, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
  })
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export {
    create, createAssignment, index, remove, show, update, addStudent, removeStudent, getAllStudents
};


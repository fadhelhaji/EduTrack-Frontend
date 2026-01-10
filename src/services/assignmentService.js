import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}`

const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

//Create
async function create(assignment){
    try {
    const response = await axios.post(`${BASE_URL}/assignment/new`, assignment, getAuthHeader())
        return response.data.assignment;
    } catch(error){
        console.log(error)
    }
}
//Index Instructor
async function index(){
    try {
        const response = await axios.get(`${BASE_URL}/assignment`, getAuthHeader());
        return response.data.assignments
    } catch (error) {
        console.log(error);
    }
}

//Index Student
async function myAssignments(){
    try {
        const response = await axios.get(`${BASE_URL}/assignment/my-assignments`, getAuthHeader());
        return response.data.assignments
    } catch (error) {
        console.log(error);
    }
}

//Show 
async function show(id) {
    try {
        const response = await axios.get(`${BASE_URL}/assignment/${id}`, getAuthHeader());
        return response.data.assignment;
    } catch (error) {
        console.log(error);
    }
}

//show 
async function getAssignmentForClass(classId, assignmentId) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/class/${classId}/assignment/${assignmentId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data.assignment;
  } catch (error) {
    console.log(error);
  }
}


//Update
async function update(id, assignment) {
    try {
    const response = await axios.put(`${BASE_URL}/assignment/${id}/edit`, assignment, getAuthHeader());        
    return response.data.assignment;
    } catch (error) {
        console.log(error);
    }
}

//Delete
async function remove(id) {
    try {
        const response = await axios.delete(`${BASE_URL}/assignment/${id}`, getAuthHeader());
        return response.data.assignment;
    } catch (error) {
        console.log(error);
    }
}


export {
    create, getAssignmentForClass, index, remove, update, myAssignments, show
};


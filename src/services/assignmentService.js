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

//submissions
// const getSubmission = async (assignmentId) =>{
//     try {
//     const response = await axios.get(`${BASE_URL}/assignment/${assignmentId}/submissions`, getAuthHeader()); 
//      console.log(response.data)
//     return response.data;
   
//     }
//      catch (err) {
//     console.log(err);
//     }
// }

//Index
async function index(){
    try {
        const response = await axios.get(`${BASE_URL}/assignment`);
        return response.data.assignments
    } catch (error) {
        console.log(error);
    }
}

//Show 
async function show(id) {
    try {
       const response = await axios.get(`${BASE_URL}/assignment/${id}`);
        return response.data.assignment
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
    create, index, show, update, remove 
};

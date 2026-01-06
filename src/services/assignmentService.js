import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}`

//Create
async function create(assignment){
    try {
        const token = localStorage.getItem("token"); // get JWT from localStorage
        const response = await axios.post(
            `${BASE_URL}/assignment/new`,
            assignment,
            {
                headers: {
                    Authorization: `Bearer ${token}`  // <-- send token in header
                }
            }
        );
        console.log(response.data.assignment);
        return response.data.assignment;
    } catch(error){
        console.log(error)
    }
}

//Index
async function index(){
    try {
        const response = await axios.get(`${BASE_URL}/assignment`)
        return response.data.assignments
    } catch (error) {
        console.log(error);
    }
}

async function show(id) {
    try {
        const response = await axios.get(`${BASE_URL}/assignment/${id}`);
        return response.data.assignments
    } catch (error) {
        console.log(error);
    }
}

//Update
async function update(id, assignment) {
    try {
        const response = await axios.put(`${BASE_URL}/assignment/${id}/edit`, assignment);
        return response.data.assignments;
    } catch (error) {
        console.log(error);
    }
}

//Delete
async function remove(id) {
    try {
        const response = await axios.delete(`${BASE_URL}/assignment/${id}`);
        return response.data.assignments;
    } catch (error) {
        console.log(error);
    }
}


export {
    create, index, show, update, remove 
};

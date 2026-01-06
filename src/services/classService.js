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

export {
    create, index, remove, show, update
};


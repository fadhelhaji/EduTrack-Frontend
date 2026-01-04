import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}`

//CREATE CLASS
async function create(formData){
    try {
        const response = await axios.post(`${BASE_URL}/class/new`, formData)
        console.log(response.data.class);
        
        return response.data.class
    } catch (error) {
        console.log(error)
    }
}

export {
    create
}
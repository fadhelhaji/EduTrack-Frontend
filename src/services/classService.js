import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}`

//CREATE CLASS
async function create(formData){
    const response = await axios.post(BASE_URL, formData)
    return response.data
}
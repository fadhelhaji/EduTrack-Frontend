import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`

//Index
async function index(){
    try {
        const response = await axios.get(`${BASE_URL}/students`)
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export {
    index
};

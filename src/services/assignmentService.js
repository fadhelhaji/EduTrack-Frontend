const BASE_URL = `${import.meta.env.VITE_API_URL}`
import axios from "axios";

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

export {
    create
};

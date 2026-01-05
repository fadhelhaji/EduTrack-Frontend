import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}`

async function signUp(formData){
    //send post request
    const response = await axios.post(`${BASE_URL}/auth/sign-up`, formData)
    const data = response.data

    //get token from data
    const token = data.token

    //save token in browser
    localStorage.setItem('token', token)

    //extract user from token (split)
    const tokenParts = token.split('.')
    console.log(tokenParts);

    const encodedPayload = tokenParts[1]
    console.log(encodedPayload);

    const decodedPayload = atob(encodedPayload)
    console.log(decodedPayload);
    
    const parsePayload = JSON.parse(decodedPayload)
    console.log(parsePayload)
    const user = parsePayload.payload
    console.log(parsePayload);
    
    
    return user
}

export {
    signUp
};

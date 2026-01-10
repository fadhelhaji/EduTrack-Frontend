import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`

async function signUp(formData) {

  // Step 1: Send POST request with form data
  const response = await axios.post(`${BASE_URL}/sign-up`,formData);

  // Step 2: Get the data from the response
  const data = response.data;

  // Step 3: Get the token from the response
  const token = data.token;

  // Step 4: Save the token to localStorage
  window.localStorage.setItem('token', token);

  // Step 5: Decode the token to get user data
  const tokenParts = token.split('.');
  const encodedPayload = tokenParts[1];
  const decodedPayload = window.atob(encodedPayload);
  const parsedPayload = JSON.parse(decodedPayload);
  const user = parsedPayload.payload;

  // Step 6: Return the user data
  return user;
}

async function signIn(formData) {
  // Step 1: Send POST request with form data
  const response = await axios.post(`${BASE_URL}/sign-in`, formData);

  // Step 2: Get the data from the response
  const data = response.data;

  // Step 3: Get the token from the response
  const token = data.token;

  // Step 4: Save the token to localStorage
  window.localStorage.setItem('token', token);

  // Step 5: Decode the token to get user data
  const tokenParts = token.split('.');
  const encodedPayload = tokenParts[1];
  const decodedPayload = window.atob(encodedPayload);
  const parsedPayload = JSON.parse(decodedPayload);
  const user = parsedPayload.payload;

  // Step 6: Return the user data
  return user;
}

async function index(){
  try {
    const response = await axios.get(`${BASE_URL}/students`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

async function show(id){
  try {
    const response = await axios.get(`${BASE_URL}/students/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

async function update(id, formData) {
  try {
    const response = await axios.put(`${BASE_URL}/students/${id}/edit`, formData);
    return response.data.student;
  } catch (error) {
    console.log(error)
  }
}


export { index, show, signIn, signUp, update };


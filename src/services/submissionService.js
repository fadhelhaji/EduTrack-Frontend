import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

async function create(submission) {
  try {
    const response = await axios.post(`${BASE_URL}/submission`, submission, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Create Submission Error:", error.response?.data || error.message);
    throw error;
  }
}

async function getSubmissions() {
  try {
    const response = await axios.get(`${BASE_URL}/submission`, getAuthHeader());
    return response.data.submissions;
  } catch (error) {
    console.error("Fetch Submissions Error:", error.response?.data || error.message);
    throw error;
  }
}

async function show(id) {
  try {
    const response = await axios.get(`${BASE_URL}/submission/${id}`, getAuthHeader());
    return response.data.submission;
  } catch (error) {
    console.error("Show Submission Error:", error.response?.data || error.message);
    throw error;
  }
}

async function update(id, submission) {
  try {
    const response = await axios.put(`${BASE_URL}/submission/${id}`, submission, getAuthHeader());
    return response.data.submission;
  } catch (error) {
    console.error("Update Submission Error:", error.response?.data || error.message);
    throw error;
  }
}

async function deleteSubmission(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/submission/${id}`, getAuthHeader());
    return response.data.submission;
  } catch (error) {
    console.error("Delete Submission Error:", error.response?.data || error.message);
    throw error;
  }
}

export { create, getSubmissions, show, update, deleteSubmission };

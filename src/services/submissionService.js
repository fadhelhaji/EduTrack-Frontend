import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}`
export const createSubmission = async (submissionData) => {
  try {
    const res = await axios.post(BASE_URL, submissionData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getSubmissions = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data.submissions;
  } catch (err) {
    throw err;
  }
};

export const getSubmissionById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data.submission;
  } catch (err) {
    throw err;
  }
};

export const deleteSubmission = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateSubmission = async (id, updatedData) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`,updatedData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

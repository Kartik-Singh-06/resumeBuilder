// const {default : axios} = require('axios');
import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);

const userResume = (userEmail) =>
  axiosClient.get(`/user-resumes?filter[userEmail][$eq]=${userEmail}`);

const updateResumeDetails = (id,data) => axiosClient.put(`/user-resumes/${id}`,data);


export default {
  CreateNewResume,
  userResume,
  updateResumeDetails,
};

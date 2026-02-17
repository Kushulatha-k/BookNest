import axios from "axios";

const instance = axios.create({
  baseURL: "https://booknest-backend-0buw.onrender.com/api"
});

export default instance;

import axios from "axios";

const instance = axios.create({
  // baseURL : 'http://localhost:5001',
  baseURL: "https://mekmar-aws-service.mekmar.com",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default instance;

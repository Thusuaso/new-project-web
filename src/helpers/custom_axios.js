import axios from "axios";
const instance = axios.create({
   // baseURL: "http://localhost:5001",
    baseURL: "https://doktor-servis.mekmar.com/",
});

export default instance;

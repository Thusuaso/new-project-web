/* eslint-disable prettier/prettier */
import axios from "@/helpers/custom_axios";

const loginService = {
  login(username,password) {
    return axios
      .get("/login/" + username + "/" + password)
      .then((res) => res.data);
  },
};

export default loginService;

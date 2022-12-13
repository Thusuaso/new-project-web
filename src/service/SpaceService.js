import axios from "@/helpers/custom_axios";
//import Vue from 'vue';

const SpacesService = {
  testRaporGonder(formdata) {
    let url = "spaces/mekmarcom/testRaporGonder";

    return axios.post(url, formdata).then((res) => res.data);
  },
  mekmarComFotoGonder(formdata) {
    return axios
      .put("spaces/mekmarcom/fotoGonder", formdata)
      .then((res) => res.data);
  },
};

export default SpacesService;

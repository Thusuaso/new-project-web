import axios from "@/helpers/custom_axios";

const ceyreklikSatislar = {
  getCeyreklikSatislar(year) {
    return axios
      .get("raporlar/ceyreklikSatislar/" + year)
      .then((res) => res.data);
  },
};

export default ceyreklikSatislar;

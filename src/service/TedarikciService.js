import axios from "@/helpers/custom_axios";

const TedarikciService = {
  getTedarikciMenuList() {
    return axios.get("listeler/tedarikciSiparisList").then((res) => res.data);
  },
  getDeleteForm(tedarikciId, siparisNo) {
    return axios
      .get("listeler/tedarikciDeleteForm/" + tedarikciId + "/" + siparisNo)
      .then((res) => res.data);
  },

  getDeleteFormControl(tedarikciId, siparisNo) {
    return axios
      .get(
        "/listeler/tedarikciDeleteFormKontrol/" + tedarikciId + "/" + siparisNo
      )
      .then((res) => res.data);
  }
}
export default TedarikciService

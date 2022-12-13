import axios from "../helpers/custom_axios";

export default class MusteriService {
  getMusteriList() {
    return axios.get("listeler/musteriList").then((res) => res.data);
  }
  getUlkeyeGoreMusteriList(year) {
    return axios
      .get("listeler/ulkeyeGoreMusteriList/" + year)
      .then((res) => res.data);
  }
  getUlkeyeGoreMusteriListAyrinti(year, ulkeId) {
    return axios
      .get("listeler/ulkeyeGoreMusteriListAyrinti/" + year + "/" + ulkeId)
      .then((res) => res.data);
  }
}

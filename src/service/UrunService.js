import axios from "@/helpers/custom_axios";

export default class UrunService {
  getUrunBirimList() {
    return axios.get("listeler/urunBirimList").then((res) => res.data);
  }
}

import axios from "@/helpers/custom_axios";

export default class KullaniciService {
  async getKullaniciList() {
    const res = await axios.get("listeler/kullaniciList");
    return res.data;
  }
  async getOperasyonKullaniciList() {
    const res = await axios.get("listeler/OperasyonKullaniciList");
    return res.data;
  }
}

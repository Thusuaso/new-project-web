import axios from "@/helpers/custom_axios";

const TeklifMusteriService = {
  getMusteriList() {
    return axios.get("listeler/teklif/musteriList").then((res) => res.data);
  },
  getMusteriDetay(musteriid) {
    return axios
      .get("listeler/teklif/musteriDetay/" + musteriid)
      .then((res) => res.data);
  },
  musteriGuncelle(musteri) {
    return axios
      .post("islemler/teklif/musteriTeklifGuncelle", musteri)
      .then((res) => res.data);
  },
  getYeniMusteriModel() {
    return axios
      .get("listeler/teklif/yeniMusteriModel")
      .then((res) => res.data);
  },
};

export default TeklifMusteriService;

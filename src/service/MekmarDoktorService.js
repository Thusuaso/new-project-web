import axios from "@/helpers/custom_axios";

const MekmarDoktorService = {
  getMusteriListesi() {
    return axios
      .get("mekmarcom/listeler/musteriListesi")
      .then((res) => res.data);
  },
  getMusteriDetay(id) {
    return axios
      .get("mekmarcom/listeler/musteriDetay/" + id)
      .then((res) => res.data);
  },
  getYeniMusteriDetay() {
    return axios
      .get("mekmarcom/listeler/yeniMusteriDetayModel")
      .then((res) => res.data);
  },
  yeniMusteriKaydet(item) {
    return axios
      .post("mekmarcom/islemler/musteriIslem", item)
      .then((res) => res.data);
  },
  musteriGuncelle(item) {
    return axios
      .put("mekmarcom/islemler/musteriIslem", item)
      .then((res) => res.data);
  },
  musteriSil(id) {
    return axios
      .delete("mekmarcom/islemler/musteriSil/" + id)
      .then((res) => res.data);
  },
};

export default MekmarDoktorService;

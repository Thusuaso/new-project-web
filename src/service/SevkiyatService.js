import axios from "@/helpers/custom_axios";

const SevkiyatService = {
  getSiparisListe() {
    return axios.get("sevkiyat/listeler/siparisListe").then((res) => res.data);
  },
  getSiparisKalemList(siparisno) {
    return axios
      .get("sevkiyat/listeler/siparisKalemList/" + siparisno)
      .then((res) => res.data);
  },
  getSevkYeniModel() {
    return axios
      .get("sevkiyat/islemler/sevkiyatNewModel")
      .then((res) => res.data);
  },
  getSiparisDetayKasaList(id) {
    return axios
      .get("operasyon/listeler/sevkTakipDetay/" + id)
      .then((res) => res.data);
  },
  siparisKayitIslem(data) {
    return axios
      .put("sevkiyat/islemler/sevkiyatKayit", data)
      .then((res) => res.data);
  },
};

export default SevkiyatService;

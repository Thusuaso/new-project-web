import axios from "@/helpers/custom_axios.js";

const NumuneService = {
  getNumuneAnaListesi(yil) {
    return axios.get(`numuneler/numunelist/${yil}`).then((res) => res.data);
  },
  getNumuneAyrintiListesi(po) {
    return axios
      .get("numuneler/numunelist/ayrinti/" + po)
      .then((res) => res.data);
  },
  getNumuneModel() {
    return axios.get("islemler/numune/numuneModel").then((res) => res.data);
  },
  getFormListeler() {
    return axios
      .get("listeler/numune/numuneFormListeler")
      .then((res) => res.data);
  },
  setNumuneKayit(data) {
    return axios
      .post("islemler/numune/numuneModel", data)
      .then((res) => res.data);
  },
  setNumuneGuncelleme(data) {
    return axios
      .put("islemler/numune/numuneModel", data)
      .then((res) => res.data);
  },
  getNumune(numunepo) {
    return axios
      .get("islemler/numune/numuneModel/" + numunepo)
      .then((res) => res.data);
  },
  getNumuneFinansListesi(yil) {
    return axios
      .get(`numunefinans/listeler/NumuneFinansAnaListe/${yil}`)
      .then((res) => res.data);
  },

  getNumuneFinansAyrintiListesi(musteriid) {
    return axios
      .get("numunefinans/listeler/numuneAyrintiListesi/" + musteriid)
      .then((res) => res.data);
  },
  getNumuneMusteriTahsilatListe(musteriid, siparisno) {
    return axios
      .get(
        "numune/finans/liste/musteriTahsilatListe/" +
          musteriid +
          "/" +
          siparisno
      )
      .then((res) => res.data);
  },
  numunetahsilatKaydetme(item_data) {
    return axios
      .post("numune/finans/islemler/tahsilatKayitDegistirme", item_data)
      .then((res) => res.data);
  },
  numunetahsilatGuncelleme(item_data) {
    return axios
      .put("numune/finans/islemler/tahsilatKayitDegistirme", item_data)
      .then((res) => res.data);
  },
  numunetahsilatSilme(id) {
    return axios
      .delete("numune/finans/islemler/tahsilatKayitSilme/" + id)
      .then((res) => res.data);
  },
  setNumuneDosyaKayit(numune) {
    return axios
      .post("islemler/numune/numuneDosyaKaydet", numune)
      .then((res) => res.data);
  },
  setNumuneDosyaKayit2(numune) {
    return axios
      .post("islemler/numune/numuneDosyaKaydet/arka", numune)
      .then((res) => res.data);
  },
  getNumuneYilListesi() {
    return axios
      .get("islemler/numune/numuneYilListesi")
      .then((res) => res.data);
  },
};

export default NumuneService;

import axios from "@/helpers/custom_axios";
import store from "@/store";

const teklifService = {
  getTakvimList() {
    /*getUser değiştirilecek */
    const username = store.getters.__getUsername;
    return axios
      .get("listeler/teklif/anaSayfaData/" + username)
      .then((res) => res.data);
  },
  gotoDate(date) {
    document.getElementById("calendar").fullCalendar("gotoDate", date);
  },
  getTeklifModel() {
    return axios.get("islemler/teklif/teklifModel").then((res) => res.data);
  },
  getFormListeler() {
    return axios
      .get("listeler/teklif/teklifFormListeler")
      .then((res) => res.data);
  },
  setTeklifKayit(data) {
    return axios
      .post("islemler/teklif/teklifModel", data)
      .then((res) => res.data);
  },
  setTeklifGuncelleme(data) {
    return axios
      .put("islemler/teklif/teklifModel", data)
      .then((res) => res.data);
  },
  setHatirlatilmaDurum(veri) {
    return axios
      .put("islemler/teklif/hatirlatilmaDurum", veri)
      .then((res) => res.data);
  },
  getTeklif(teklifId) {
    return axios
      .get("islemler/teklif/teklifModel/" + teklifId)
      .then((res) => res.data);
  },
  getKullaniciTeklif(kullaniciAdi) {
    return axios
      .get("listeler/teklif/kullaniciAyrintiListe/" + kullaniciAdi)
      .then((res) => res.data);
  },

  getKullaniciTeklifHepsi() {
    return axios
      .get("listeler/teklif/kullaniciAyrintiListe")
      .then((res) => res.data);
  },
  setProformaKayit(teklif) {
    return axios
      .post("islemler/teklif/proformaKaydet", teklif)
      .then((res) => res.data);
  },
  setTeklifDosyaKayit(teklif) {
    return axios
      .post("islemler/teklif/teklifDosyaKaydet", teklif)
      .then((res) => res.data);
  },
  setTeklifSonGorulmeKayit(teklif) {
    return axios
      .post("islemler/teklif/teklifSonGorulmeKaydet", teklif)
      .then((res) => res.data);
  },
  setTeklifNumuneKayit(teklif) {
    return axios
      .post("islemler/teklif/teklifNumuneKaydet", teklif)
      .then((res) => res.data);
  },
  setTeklifDosyaSil(teklif) {
    return axios
      .put("islemler/teklif/teklifDosyaSil", teklif)
      .then((res) => res.data);
  },
  teklifSilme(teklifid) {
    return axios
      .delete("islemler/teklif/teklifSil/" + teklifid)
      .then((res) => res.data);
  },
  teklifListeGrafikHepsi() {
    return axios
      .get("raporlar/teklif/teklifListe/grafikHepsi")
      .then((res) => res.data);
  },
  getTumTeklifler() {
    return axios.get("listeler/teklif/tumTeklifList").then((res) => res.data);
  },
  getEskiTeklifList() {
    return axios.get("listeler/teklif/eskiTeklifList").then((res) => res.data);
  },

  setEnBoy(datas) {
    return axios
      .post("listeler/teklif/addEnBoy", datas)
      .then((res) => res.data);
  },
  getCustomersList(){
    return axios.get('islemler/teklif/teklifMusteriler').then(res =>res.data)
  }
};

export default teklifService;

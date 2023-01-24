import axios from "@/helpers/custom_axios";

const FinansService = {
  getKonteynerAnaListe(yil) {
    return axios
      .get("finans/listeler/konteynerAnaListe/" + yil)
      .then((res) => res.data);
  },

  getFinansAyrintiListYukle(musteriid) {
    return axios
      .get("finans/listeler/konteynerAyrintiList/" + musteriid)
      .then((res) => res.data);
  },
  getFinansOdemeSecimList(musteri_id, tarih) {
    return axios
      .get("finans/listeler/odemeSecimList/" + musteri_id + "/" + tarih)
      .then((res) => res.data);
  },
  getMusteriTahsilatListe(musteriid, siparisno) {
    return axios
      .get(
        "finans/listeler/musteriTahsilatListe/" + musteriid + "/" + siparisno
      )
      .then((res) => res.data);
  },
  tahsilatKaydetme(item_data) {
    return axios
      .post("finans/islemler/tahsilatKayitDegistirme", item_data)
      .then((res) => res.data);
  },
  tahsilatGuncelleme(item_data) {
    return axios
      .put("finans/islemler/tahsilatKayitDegistirme", item_data)
      .then((res) => res.data);
  },
  tahsilatSilme(id) {
    return axios
      .delete("finans/islemler/tahsilatKayitSilme/" + id)
      .then((res) => res.data);
  },
  getDepoAyrintiListesi(musteriid) {
    return axios
      .get("finans/listeler/depoAyrintiListesi/" + musteriid)
      .then((res) => res.data);
  },
  getKonteynerExcelListe(data_list) {
    return axios
      .post("finans/dosyalar/konteynerExcelCikti", data_list)
      .then((res) => res.data);
  },
  getDepoAyrintiExcelListe(data_list) {
    return axios
      .post("finans/listeler/depoAyrintiExcellListe", data_list)
      .then((res) => res.data);
  },
  getDepoExcelListe(data_list) {
    return axios
      .post("finans/dosyalar/depoExcelCikti", data_list)
      .then((res) => res.data);
  },
  getKonteynerAyrintiListesi(data_list) {
    return axios
      .post("finans/dosyalar/konteynerAyrintiExcelListe", data_list)
      .then((res) => res.data);
  },
  getKonteynerOdemeListesi(data_list) {
    return axios
      .post("finans/dosyalar/konteynerOdemeExcelListe", data_list)
      .then((res) => res.data);
  },
  getMusteriOdemeListesi(yil, ay) {
    return axios
      .get("finans/listeler/musteriOdemeListesi/" + yil + "/" + ay)
      .then((res) => res.data);
  },
  getMusteriOdemeYilListesi() {
    return axios
      .get("finans/listeler/musteriOdemeYilListesi")
      .then((res) => res.data);
  },
  getMusteriOdemeAyListesi(yil) {
    return axios
      .get("finans/listeler/musteriOdemeAyListesi/" + yil)
      .then((res) => res.data);
  },
  getPesinatIslemListesi() {
    return axios
      .get("finans/listeler/pesinatIslemListesi")
      .then((res) => res.data);
  },
  finansPesinatKaydet(pesinat_model) {
    return axios
      .post("finans/listeler/pesinatIslemListesi", pesinat_model)
      .then((res) => res.data);
  },
  getVadeListesi() {
    return axios
      .get("finans/listeler/vadeYeniAnaListe")
      .then((res) => res.data);
  },
  getGuncelKur(yil, ay, gun) {
    return axios
      .get("listeler/DovizListe/" + yil + "/" + ay + "/" + gun)
      .then((res) => res.data);
  },
  getOdemelerTablosu() {
    return axios
      .get("finans/listeler/odemelerAnaListe")
      .then((res) => res.data);
  },

  getOdemelerAyrintiTablosu(musteriAdi) {
    return axios
      .get("finans/listeler/odemelerAyrintiListesi/" + musteriAdi)
      .then((res) => res.data);
  },
  getOdemelerAyrintiTablosuExcel(data_list) {
    return axios
      .post("finans/listeler/odemelerAyrintiListesiExcel", data_list)
      .then((res) => res.data);
  },
  setOdemelerAyrintiTablosu(data) {
    return axios.post("finans/listeler/odemelerDegisim",data)
  },
  getMayaNumunevSiparisOdemeleri(month,year) {
    return axios.get(`finans/listeler/mayaNumuneSiparisOdemeleri/${month}/${year}`).then(res=>res.data)
  },
  getMayaNumunevSiparisOdemeleriYear(year) {
    return axios.get(`finans/listeler/mayaNumuneSiparisOdemeleri/${year}`).then(res=>res.data)
  },
  getMayaListExcellCikti(data) {
    return axios.post('finans/listeler/mayaNumuneSiparisOdemeleriCikti',data).then(res=>res.data)
  }
};

export default FinansService;

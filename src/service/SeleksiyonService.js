import axios from "@/helpers/custom_axios";

const SeleksiyonService = {
  getUretimList() {
    return axios.get("seleksiyon/listeler/uretimList").then((res) => res.data);
  },
  getUretim(kasano) {
    return axios
      .get("seleksiyon/liste/uretim/" + kasano)
      .then((res) => res.data);
  },
  getUrunDetay(kasano) {
    return axios
      .get("seleksiyon/listeler/uretimDetay/" + kasano)
      .then((res) => res.data);
  },
  getUrunDetayModel() {
    return axios
      .get("seleksiyon/listeler/uretimDetayModel")
      .then((res) => res.data);
  },
  uretimKayit(uretim_model) {
    return axios
      .post("seleksiyon/islemler/uretimKayitIslem", uretim_model)
      .then((res) => res.data);
  },
  uretimGuncelle(uretim_model) {
    return axios
      .put("seleksiyon/islemler/uretimKayitIslem", uretim_model)
      .then((res) => res.data);
  },
  uretimSil(kasano) {
    return axios
      .delete("seleksiyon/islemler/uretimSilIslem/" + kasano)
      .then((res) => res.data);
  },
  uretimCokluKayit(uretim_data) {
    return axios
      .post("seleksiyon/islemler/uretimCokluKaydet", uretim_data)
      .then((res) => res.data);
  },
  getDisFirmaKasaNo() {
    return axios
      .get("seleksiyon/islemler/disFirmaKasaNo")
      .then((res) => res.data);
  },
  getSeleksiyonFirmaKasaNo() {
    return axios
      .get("seleksiyon/islemler/seleksiyonFirmaKasaNo")
      .then((res) => res.data);
  },

  getUrunKartBilgileri(urunkardId) {
    return axios
      .get("seleksiyon/islemler/urunKartBilgileri/" + urunkardId)
      .then((res) => res.data);
  },

  getIsUretimFazlası(data) {
    return axios
      .post(
        "seleksiyon/islemler/uretimFazlasiMi/" +
          data["po"] +
          "/" +
          data["urunkartid"]
      )
      .then((res) => res.data);
  },

  getUretimOzetList() {
    return axios
      .get("seleksiyon/listeler/uretimOzetList")
      .then((res) => res.data);
  },

  getUretimSipListesi() {
    return axios
      .get("seleksiyon/listeler/uretimSipListesi")
      .then((res) => res.data);
  },

  getSiparisUretimDetayList(siparisno) {
    return axios
      .get("seleksiyon/listeler/siparisUretimDetay/" + siparisno)
      .then((res) => res.data);
  },
  getUretimExcelListesi(data_list) {
    return axios
      .post("/siparisler/dosyalar/uretimExcelCikti", data_list)
      .then((res) => res.data);
  },
  getUretimExcelListesi_En(data_list) {
    return axios
      .post("/siparisler/dosyalar/uretimExcelCiktiEn", data_list)
      .then((res) => res.data);
  },

  getKasaOlculeriExcelListesi(data_list) {
    return axios
      .post("/siparisler/dosyalar/kasaOlculeriExcelCikti", data_list)
      .then((res) => res.data);
  },
  getIcSiparisExcelListesi(data_list) {
    return axios
      .post("/siparisler/dosyalar/IcSiparisExcelCikti", data_list)
      .then((res) => res.data);
  },
  getSeleksiyonExcelList(data_list) {
    console.log("getSeleksiyonExcelList", data_list);
    return axios
      .post("/siparisler/dosyalar/seleksiyonExcelCikti", data_list)
      .then((res) => res.data);
  },
  getSeleksiyonEtiketList(data_list) {
    return axios
      .post("/siparisler/dosyalar/seleksiyonEtiketCikti", data_list)
      .then((res) => res.data);
  },

  getSeleksiyonEtiketTarih(tarih) {
    return axios
      .get("seleksiyon/listeler/seleksiyonEtiketTarih/" + tarih)
      .then((res) => res.data);
  },
  getKasaDetayOlculeri() {
    return axios.get("/seleksiyon/listeler/kasaDetay").then((res) => res.data);
  },
  getKasaDetayOlculeriGuncelle(data) {
    return axios
      .post("/seleksiyon/listeler/kasaDetay/guncelle", data)
      .then((res) => res.data);
  },
  getKasaDetayOlculeriKaydet(data) {
    return axios
      .post("/seleksiyon/listeler/kasaDetay/kaydet", data)
      .then((res) => res.data);
  },
  setKasaDetayOlculeriSil(id) {
    return axios
      .delete("/seleksiyon/listeler/kasaDetay/sil/" + id)
      .then((res) => res.data);
  },
  getTedarikciList() {
    return axios
      .get("/seleksiyon/listeler/tedarikciler")
      .then((res) => res.data);
  },
  setIcSiparisKayit(item) {
    return axios
      .post("islemler/tedarikci/icsiparisKaydet", item)
      .then((res) => res.data);
  },
  setIcSiparisDosyaKayit(icsiparis) {
    return axios
      .post("islemler/tedarikci/icsiparis/IcSiparisDosyaKaydet", icsiparis)
      .then((res) => res.data);
  },
  setCrate(data) {
    return axios.post("/seleksiyon/setCrateAll", data).then((res) => res.data);
  }
};

export default SeleksiyonService;

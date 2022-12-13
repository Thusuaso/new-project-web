import axios from "@/helpers/custom_axios";

const UrunKartService = {
  getUrunKartMenuList() {
    return axios
      .get("listeler/urunKartMenuList")
      .then((response) => response.data);
  },

  setUrunKaydet(kart) {
    return axios.post("islemler/urunKart/kayit", kart).then((res) => res.data);
  },

  setUrunGuncelle(kart) {
    return axios.put("islemler/urunKart/kayit", kart).then((res) => res.data);
  },

  getUrunKart(urunKartId) {
    return axios
      .get("islemler/urunKart/getUrunKart/" + urunKartId)
      .then((res) => res.data);
  },

  setUrunKartSil(urunKartId, username) {
    return axios
      .delete(
        "/islemler/urunKart/getUrunKartSil/" + urunKartId + "/" + username
      )
      .then((res) => res.data);
  },
  getSeleksiyonKasaKontrol(urunKartId) {
    return axios
      .get(
        "/seleksiyon/islemler/getUrunKartSeleksiyonKasaKontrol/" + urunKartId
      )
      .then((res) => res.data);
  },

  getUrunKartModel() {
    return axios
      .get("islemler/urunKart/getUrunKartModel")
      .then((res) => res.data);
  },

  getUrunDetayList(urunKartId) {
    return axios
      .get("islemler/urunKart/getUrunKartDetayList/" + urunKartId)
      .then((res) => res.data);
  },

  getUrunDetayListYeni() {
    return axios
      .get("islemler/urunKart/getUrunKartDetayListYeni")
      .then((res) => res.data);
  },
  setKasaYeniUrunKart(kasaNo, urunKartId, username) {
    return axios
      .put(
        "islemler/urunKart/setKasaYeniUrunKart/" +
          kasaNo +
          "/" +
          urunKartId +
          "/" +
          username
      )
      .then((res) => res.data);
  },
};

export default UrunKartService;

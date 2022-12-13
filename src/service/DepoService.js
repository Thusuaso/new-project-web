import axios from "@/helpers/panel_axios";

const DepoService = {
  getDepoUrunListesi() {
    return axios.get("panel/mekmarusa/depoUrunListe").then((res) => res.data);
  },
  getUrunDetay(urunid) {
    return axios
      .get("/panel/mekmarusa/panelUrunDetay/" + urunid)
      .then((res) => res.data);
  },
  urunGuncelle(urun) {
    return axios
      .post("panel/mekmarusa/urunGuncelleme", urun)
      .then((res) => res.data);
  },
  urunSil(urun) {
    return axios
      .post("panel/mekmarusa/urunSilme", urun)
      .then((res) => res.data);
  },
  depoFotoDegisim(fotodata) {
    return axios
      .put("panel/mekmarusa/fotoIslem/fotoDegisim", fotodata)
      .then((res) => res.data);
  },
  fotoDataKayit(fotolist) {
    return axios
      .put("panel/mekmarusa/fotoDataKayit", fotolist)
      .then((res) => res.data);
  },
  mekmarUrunListesi() {
    return axios
      .get("panel/mekmarusa/mekmarUrunListesi")
      .then((res) => res.data);
  },
  getTurkeyStockList() {
    return axios
      .get("panel/mekmarusa/turkeyStockListe")
      .then((res) => res.data);
  },
  urunYorumKaydet(item) {
    return axios
      .post("depoIslem/urunYorum/kayitIslem", item)
      .then((res) => res.data);
  },
  getUrunYorumModel() {
    return axios.get("depoIslem/urunYorum/kayitIslem").then((res) => res.data);
  },
  getUrunYorumList(urunid) {
    return axios
      .get("listeler/depo/panelUrunYorumList/" + urunid)
      .then((res) => res.data);
  },
  getYorumList() {
    return axios.get("listeler/depo/panelYorumList").then((res) => res.data);
  },
  urunYorumSil(id) {
    return axios
      .delete("panel/mekmarusa/dataIslem/urunYorumSil/" + id)
      .then((res) => res.data);
  },
  urunYorumAktifYap(item) {
    return axios
      .put("panel/mekmarusa/dataIslem/urunAktifPasifYap", item)
      .then((res) => res.data);
  },
};

export default DepoService;

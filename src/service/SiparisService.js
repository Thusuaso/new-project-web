import axios from "@/helpers/custom_axios";
const SiparisService ={
  getSiparisList(siparisDurum, yil) {
    return axios
      .get("siparisler/" + siparisDurum + "/" + yil)
      .then((response) => response.data);
  },

  getSiparisHepsiList(siparisDurum) {
    return axios
      .get("siparislerhepsi/" + siparisDurum)
      .then((response) => response.data);
  },
  getSiparisUrun(siparisNo) {
    return axios
      .get("siparisler/siparisUrun/" + siparisNo)
      .then((res) => res.data);
  },
  getTeslimTurList() {
    return axios
      .get("listeler/teslimTurList")
      .then((response) => response.data);
  },
  getOdemeTurList() {
    return axios.get("listeler/odemeTurList").then((response) => response.data);
  },
  getFaturaKesimTurList() {
    return axios
      .get("listeler/FaturaKesimTurList")
      .then((response) => response.data);
  },
  getUlkeList() {
    return axios.get("listeler/ulkeList").then((response) => response.data);
  },
  getSiparis(prSiparisNo) {
    return axios
      .get("/siparis/siparisGirisModel/" + prSiparisNo)
      .then((res) => res.data);
  },

  getSiparisModel() {
    return axios.get("siparis/siparisGirisModel").then((res) => res.data);
  },
  getMasrafListesi(siparisNo) {
    return axios
      .get("raporlar/siparisMasrafList/" + siparisNo)
      .then((res) => res.data);
  },
  getCekiListesi(siparisNo) {
    return axios
      .get("raporlar/siparisCekiList/" + siparisNo)
      .then((res) => res.data);
  },

  setSiparisKaydet(siparisVeri) {
    return axios
      .post("siparis/kayitIslem", siparisVeri)
      .then((res) => res.data);
  },
  setSiparisGuncelle(siparisVeri) {
    return axios.put("siparis/kayitIslem", siparisVeri).then((res) => res.data);
  },

  getIscilikList(siparisNo, urunKartId) {
    return axios
      .get("raporlar/iscilikList/" + siparisNo + "/" + urunKartId)
      .then((res) => res.data);
  },

  getGiderList() {
    return axios.get("raporlar/siparisGiderTurList").then((res) => res.data);
  },

  getGiderModel() {
    return axios.get("siparis/iscilikIslem").then((res) => res.data);
  },

  setIscilikKaydet(veri) {
    return axios.post("siparis/iscilikIslem", veri).then((res) => res.data);
  },

  setIscilikGuncelle(veri) {
    return axios.put("siparis/iscilikIslem", veri).then((res) => res.data);
  },

  setIscilikSil(veri) {
    return axios
      .put("siparis/iscilikIslem/kayitSil", veri)
      .then((res) => res.data);
  },
  getSiparicIcSiparis() {
    return axios
      .get("tedarikci/icsiparisformu/listeler")
      .then((res) => res.data);
  },
  getTedarikciUrunAyrintiListYukle(siparisno) {
    return axios
      .get("tedarikci/listeler/tedarikciurun/" + siparisno)
      .then((res) => res.data);
  },
  setsiparisBolmeGuncelle(siparisVeri) {
    return axios
      .post("siparis/siparisBolmeGuncelleme", siparisVeri)
      .then((res) => res.data);
  },

  getOpChangeMailSend(datas) {
    return axios
      .post("siparis/opChangeMailSend", datas)
      .then((res) => res.data);
  }
}
export default SiparisService
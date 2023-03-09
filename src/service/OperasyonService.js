import axios from "@/helpers/custom_axios.js";

const OperasyonService = {
  getSevkTakipListesi() {
    return axios
      .get("operasyon/listeler/sevkTakipListesi")
      .then((res) => res.data);
  },
  getSevkTakipDusenListesi() {
    return axios
      .get("operasyon/listeler/sevkTakipDusenListesi")
      .then((res) => res.data);
  },
  getSevkTakipDetay(id) {
    return axios
      .get("operasyon/listeler/sevkTakipDetay/" + id)
      .then((res) => res.data);
  },
  sevkTakipGuncelle(item) {
    return axios
      .put("operasyon/islemler/sevkTakipGuncelle", item)
      .then((res) => res.data);
  },
  getKonteynerFormListesi() {
    return axios
      .get("operasyon/listeler/KonteynerFormListeler")
      .then((res) => res.data);
  },

  getKonteynerListesi() {
    return axios
      .get("operasyon/listeler/KonteynerList")
      .then((res) => res.data);
  },
  konteynerKaydet(item) {
    return axios
      .post("operasyon/islemler/konteynerKayit", item)
      .then((res) => res.data);
  },
  getKonteynerUrunModel(urunId) {
    return axios
      .get("operasyon/islemler/konteynermodel/" + urunId)
      .then((res) => res.data);
  },
  setKonteynerFaturaKayit(konteyner) {
    return axios
      .post("operasyon/islemler/konteyner/konteynerDosyaKaydet", konteyner)
      .then((res) => res.data);
  },
  setKonteynerFaturaGuncelle(data) {
    return axios
      .post("operasyon/islem/konteyner/konteynerDosyaGuncelle", data)
      .then((res) => res.data);
  },
  getNakliyeListesi() {
    return axios
      .get("operasyon/listeler/nakliyeListesi")
      .then((res) => res.data);
  },
  getNakliyeIslemListesi() {
    return axios
      .get("operasyon/listeler/nakliyebilgilistesi")
      .then((res) => res.data);
  },
  setFaturaKaydet(faturaVeri) {
    return axios
      .post("konteynerfatura/kayitIslem", faturaVeri)
      .then((res) => res.data);
  },
  getFaturaDetayListeYeni() {
    return axios
      .get("islemler/fatura/getFaturaDetayListeYeni")
      .then((res) => res.data);
  },

  getEvrakSiparisListe() {
    return axios
      .get("evrak/listeler/siparisListe")
      .then((response) => response.data);
  },
  getEvrakFaturaList(siparisno) {
    return axios.get("evrak/faturaList/" + siparisno).then((res) => res.data);
  },
  getEvrakTedarikciFaturaList(siparisno) {
    return axios
      .get("evrak/tedarikci/faturaList/" + siparisno)
      .then((res) => res.data);
  },
  getEvrakFaturaModel() {
    return axios.get("islemler/evrak/evrakFaturaModel").then((res) => res.data);
  },
  setEvrakFaturaKayit(data) {
    return axios
      .post("islemler/evrak/evrakFaturaModel", data)
      .then((res) => res.data);
  },

  setEtiketKayit(data) {
    return axios.post("islemler/evrak/etiket", data).then((res) => res.data);
  },

  getEtiketKayit(etiketNo) {
    return axios
      .get("islemler/evrak/etiketList/" + etiketNo)
      .then((res) => res.data);
  },

  nakliyeKaydet(item) {
    return axios
      .post("operasyon/islemler/nakliyeKayit", item)
      .then((res) => res.data);
  },
  EvrakFirmaKaydet(item) {
    return axios
      .post("operasyon/islemler/FirmaKayit", item)
      .then((res) => res.data);
  },
  getNakliyeUrunModel(urunId) {
    return axios
      .get("operasyon/islemler/nakliyemodel/" + urunId)
      .then((res) => res.data);
  },
  getNakliyeYeniUrunModel() {
    return axios.get("operasyon/islemler/nakliyemodel").then((res) => res.data);
  },
  setNakliyeFaturaKayit(nakliye) {
    return axios
      .post("operasyon/islemler/nakliye/nakliyeDosyaKaydet", nakliye)
      .then((res) => res.data);
  },
  getEvrakFirmaListesi() {
    return axios.get("operasyon/listeler/FirmaList").then((res) => res.data);
  },
  getFirmaModel() {
    return axios.get("operasyon/listeler/FirmaModel").then((res) => res.data);
  },
  setTedarikciEvrakFaturaKayit(tedarikci) {
    return axios
      .post("operasyon/islemler/tedarikci/tedarikciKayit", tedarikci)
      .then((res) => res.data);
  },
  setTedarikciFaturaKayit(tedarikci) {
    return axios
      .post("operasyon/islemler/tedarikci/tedarikciDosyaKaydet", tedarikci)
      .then((res) => res.data);
  },
  getTedarikciEvrakControl(tedarikci, siparis_no) {
    return axios.get(`operasyon/islemler/tedarikci/tedarikciKontrol/${tedarikci}/${siparis_no}`)
  },
  setDenizcilikEvrakFaturaKayit(denizcilik) {
    return axios
      .post("operasyon/islemler/denizcilik/denizcilikKayit", denizcilik)
      .then((res) => res.data);
  },
  setDenizcilikFaturaKayit(denizcilik) {
    return axios
      .post("operasyon/islemler/denizcilik/denizcilikDosyaKaydet", denizcilik)
      .then((res) => res.data);
  },

  setGumrukEvrakFaturaKayit(gumruk) {
    return axios
      .post("operasyon/islemler/gumruk/gumrukKayit", gumruk)
      .then((res) => res.data);
  },
  setGumrukFaturaKayit(gumruk) {
    return axios
      .post("operasyon/islemler/gumruk/gumrukDosyaKaydet", gumruk)
      .then((res) => res.data);
  },
  setOzelIscilikFaturaKayit(ozel) {
    return axios
      .post("operasyon/islemler/ekstra/ozelIscilikDosyaKaydet", ozel)
      .then((res) => res.data);
  },
  setChatMailIslem(veri) {
    return axios.post("kontroller/chatIslem", veri).then((res) => res.data);
  },
  getSonGorusmeList(po) {
    return axios
      .get("kontroller/listeler/chatmailler/" + po)
      .then((res) => res.data);
  },
  getKonteynerFormIslem(fatura_id, tur,siparis_no) {
    return axios
      .get(`operasyon/form/KonteynerForm/islem/${fatura_id}/${tur}/${siparis_no}`)
      .then((res) => res.data);
  },
  getNakliyeFormIslem(firmaId, evrakAdi, siparisNo) {
    return axios
      .get(
        `operasyon/form/NakliyeForm/islem/${firmaId}/${evrakAdi}/${siparisNo}`
      )
      .then((res) => res.data);
  },
  setDeleteNakliyeFatura(siparisNo, evrakAdi) {
    return axios
      .get(`operasyon/form/NakliyeFaturaSil/islem/${siparisNo}/${evrakAdi}`)
      .then((res) => res.data);
  },
  setChangeNakliyeFatura(data) {
    return axios
      .post("operasyon/form/NakliyeFaturaChange", data)
      .then((res) => res.data);
  },
  setChangeOdemeBilgisi(siparisNo, odemeTur) {
    return axios
      .get("operasyon/fatura/changeOdemeBilgisi/" + siparisNo + "/" + odemeTur)
      .then((res) => res.data);
  },
  setChangeOdemeBilgisiEx(siparisNo, odemeTur) {
    return axios
      .get(
        "operasyon/fatura/changeOdemeBilgisiEx/" + siparisNo + "/" + odemeTur
      )
      .then((res) => res.data);
  },
  setDeleteFaturaEvrak(id, siparisNo) {
    return axios.get(`operasyon/fatura/deleteFaturaEvrak/${id}/${siparisNo}`);
  },
  getMekmerDisFaturaModel() {
    return axios.get("/mekmer/disFaturaModel").then((res) => res.data);
  },
  setContainerAmount(data) {
    return axios.post("/operasyon/containeramount",data).then(res=>res.data)
  },
  getTedarikciFatura(id,siparis_no) {
    return axios.get(`/operasyon/fatura/tedarikciFaturaEvrak/${id}/${siparis_no}`).then(res=>res.data)
  },

};

export default OperasyonService;

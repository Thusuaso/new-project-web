import axios from "@/helpers/panel_axios";

const MekmarService = {
  getKategoriListesi() {
    return axios.get("kategoriList").then((res) => res.data);
  },
  getUrunKategoriList(kategori) {
    return axios
      .get("panel/mekmarcom/urunKategoriListesi/" + kategori)
      .then((res) => res.data);
  },
  getUrunDetay(urunid) {
    return axios.get("panelIslem/urunDetay/" + urunid).then((res) => res.data);
  },
  getYeniUrunModel() {
    return axios.get("panel/mekmarcom/yeniUrunIslem").then((res) => res.data);
  },
  urunKaydet(dtUrun) {
    return axios
      .post("panel/mekmarcom/urunIslem", dtUrun)
      .then((res) => res.data);
  },
  urunGuncelle(dtUrun) {
    return axios
      .put("panel/mekmarcom/urunIslem", dtUrun)
      .then((res) => res.data);
  },
  fotoGonder(formData) {
    return axios
      .post("panel/mekmarcom/fotoEkle", formData)
      .then((res) => res.data);
  },
  fotoKayit(fotolist) {
    return axios
      .put("panel/mekmarcom/fotoEkle", fotolist)
      .then((res) => res.data);
  },
  ebatKaydet(dtEbat) {
    return axios
      .post("panel/mekmarcom/ebatIslem", dtEbat)
      .then((res) => res.data);
  },
  ebatGuncelle(dtEbat) {
    return axios
      .put("panel/mekmarcom/ebatIslem", dtEbat)
      .then((res) => res.data);
  },
  ebatSil(id) {
    return axios
      .delete("panel/mekmarcom/ebatSilme/" + id)
      .then((res) => res.data);
  },

  onerilenUrunKaydet(dtOnerilenUrun) {
    return axios
      .post("panel/mekmarcom/onerilenUrunIslem", dtOnerilenUrun)
      .then((res) => res.data);
  },
  onerilenUrunSil(id) {
    return axios
      .delete("/panel/mekmarcom/onerilenUrunSilme/" + id)
      .then((res) => res.data);
  },
  yuzeyIslemKaydet(dtYuzeyIslem) {
    return axios
      .post("panel/mekmarcom/yuzeyIslem", dtYuzeyIslem)
      .then((res) => res.data);
  },
  yuzeyIslemSilme(id) {
    return axios
      .delete("panel/mekmarcom/yuzeySilme/" + id)
      .then((res) => res.data);
  },
  fotoListDegisim(fotoData) {
    return axios
      .put("panel/mekmarcom/fotoIslem/fotoDegisim", fotoData)
      .then((res) => res.data);
  },
  testRaporGonder(formdata) {
    return axios
      .put("panel/mekmarcom/testRaporEkle", formdata)
      .then((res) => res.data);
  },
  testRaporDataGuncelle(data) {
    return axios
      .put("panel/mekmarcom/testRaporIslem", data)
      .then((res) => res.data);
  },
  urunSiraKategoriList() {
    return axios
      .get("panel/mekmarcom/urunsira/kategoriList")
      .then((res) => res.data);
  },
  urunSiraUrunList(kategoriId) {
    return axios
      .get("panel/mekmarcom/urunsira/urunList/" + kategoriId)
      .then((res) => res.data);
  },
  urunSiraDataGuncelle(urunList) {
    return axios
      .put("panel/mekmarcom/urunsira/dataIslem", urunList)
      .then((res) => res.data);
  }
};

export default MekmarService;

import axios from "@/helpers/panel_axios";

const MekmarPanelService = {
  getKategoriList() {
    return axios.get("panel/mekmarcom/kategoriList").then((res) => res.data);
  },

  getProductList(kategori) {
    return axios
      .get("panelProductList/productKategoriList/" + kategori)
      .then((res) => res.data);
  },
  getProductDetailData(urunid) {
    return axios
      .get("panel/mekmarcom/productDetail/" + urunid)
      .then((res) => res.data);
  },
  getNewProductDetail() {
    return axios
      .get("panel/mekmarcom/productDetail/newProduct")
      .then((res) => res.data);
  },
  urunKayit(product) {
    return axios
      .post("panel/mekmarcom/productDetail/VeriKayıt", product)
      .then((res) => res.data);
  },
  urunGuncelle(product) {
    return axios
      .put("panel/mekmarcom/productDetail/VeriKayıt", product)
      .then((res) => res.data);
  },
  urunSil(urunid) {
    return axios
      .delete("panel/mekmarcom/urunSilme/" + urunid)
      .then((res) => res.data);
  },
  onerilenUrunKayitIslem(model) {
    return axios
      .post("panel/mekmarcom/productDetail/onerilenUrunKayit", model)
      .then((res) => res.data);
  },
  kenarIslemKaydet(model) {
    return axios
      .post("panel/mekmarcom/productDetail/finishDataIslem", model)
      .then((res) => res.data);
  },
  kenarIslemSil(model) {
    return axios
      .put("panel/mekmarcom/productDetail/finishDataIslem", model)
      .then((res) => res.data);
  },
  ebatKaydet(model) {
    return axios
      .post("panel/mekmarcom/productDetail/ebatDataIslem", model)
      .then((res) => res.data);
  },
  ebatGuncelle(model) {
    return axios
      .put("panel/mekmarcom/productDetail/ebatDataIslem", model)
      .then((res) => res.data);
  },
  ebatSil(model) {
    return axios
      .put("panel/mekmarcom/productDetail/ebatDataSil", model)
      .then((res) => res.data);
  },
  fotoKayitSiraDegisim(fotodata) {
    return axios
      .put("panel/mekmarcom/fotolar/SiraKayitDegisim", fotodata)
      .then((res) => res.data);
  },
};

export default MekmarPanelService;

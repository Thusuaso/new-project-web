import axios from "../helpers/custom_axios";

const MusteriIslemService = {
  getMusteriListesi() {
    return axios
      .get("musteriler/listeler/musteriListesi")
      .then((res) => res.data);
  },

  getMusteriSiparisListesi() {
    return axios
      .get("musteriler/listeler/musteriSiparisListesi")
      .then((res) => res.data);
  },
  getYeniMusteriModel() {
    return axios
      .get("musteriler/listeler/yeniMusteriModel")
      .then((res) => res.data);
  },
  getMusteriDetay(id) {
    return axios
      .get("musteriler/listeler/musteriDetay/" + id)
      .then((res) => res.data);
  },
  getMusteriSiparisDetay(yil, id) {
    return axios
      .get(`/musteriler/listeler/musteri/siparisDetay/${yil}/${id}`)
      .then((res) => res.data);
  },
  musteriKaydet(item) {
    return axios
      .post("musteriler/islemler/musteriKayitIslem", item)
      .then((res) => res.data);
  },
  musteriGuncelle(item) {
    return axios
      .put("musteriler/islemler/musteriKayitIslem", item)
      .then((res) => res.data);
  },
  musteriSilme(id) {
    return axios
      .delete("musteriler/islemler/musteriKayitSilme/" + id)
      .then((res) => res.data);
  },

  getMusteriExcelListesi(data_list) {
    return axios
      .post("musteriler/dosya_islemleri/excelMusterilerDetayListesi", data_list)
      .then((res) => res.data);
  },
  setCustomerChangeFollow(customer, follow) {
    return axios
      .get("customers/follow/" + customer + "/" + follow)
      .then((res) => res.data);
  },
  getProductDetailList(sipNo) {
    return axios
      .get("customers/products/detailList/" + sipNo)
      .then((res) => res.data);
  },
  getTeklifMusteriler() {
    return axios.get("listeler/teklifMusteriler").then((res) => res.data);
  },
  getTeklifMusterilerAyrinti(id) {
    return axios
      .get("listeler/teklifMusterilerAyrinti/" + id)
      .then((res) => res.data);
  },
  setTeklifMusteriler(data) {
    return axios
      .post("listeler/setTeklifMusteriler", data)
      .then((res) => res.data);
  },
  setNewTeklifMusteriler(data) {
    return axios
      .post("listeler/setNewTeklifMusteriler", data)
      .then((res) => res.data);
  },
  setTeklifMusterilerSil(id) {
    return axios
      .get("listeler/setNewTeklifMusterilerSil/" + id)
      .then((res) => res.data);
  },

  setNewFuarMusteriler(data) {
    return axios
      .post("listeler/setNewFuarMusteriler", data)
      .then((res) => res.data);
  },
  setNewFuarMusterilerGuncelle(data) {
    return axios
      .post("listeler/setNewFuarMusterilerGuncelle", data)
      .then((res) => res.data);
  },
  setNewFuarMusterileSil(id) {
    return axios
      .get("listeler/setNewFuarMusterilerSil/" + id)
      .then((res) => res.data);
  },
  getFuarMusterilerList() {
    return axios.get("listeler/getFuarMusterilerList").then((res) => res.data);
  },
  getFuarMusterilerListAyrinti(id) {
    return axios
      .get("listeler/getFuarMusterilerAyrintiList/" + id)
      .then((res) => res.data);
  },
  setNewBgpMusteriler(data) {
    return axios
      .post("listeler/setNewBgpMusteriler", data)
      .then((res) => res.data);
  },
  setNewBgpMusterilerGuncelle(data) {
    return axios
      .post("listeler/setNewBgpMusterilerGuncelle", data)
      .then((res) => res.data);
  },
  setNewBgpMusterileSil(id) {
    return axios
      .get("listeler/setNewBgpMusterilerSil/" + id)
      .then((res) => res.data);
  },
  getBgpMusterilerList() {
    return axios.get("listeler/getBgpMusterilerList").then((res) => res.data);
  },
  getBgpMusterilerListAyrinti(id) {
    return axios
      .get("listeler/getBgpMusterilerAyrintiList/" + id)
      .then((res) => res.data);
  },
  setCustomersCopyTo(teklifMusteriAyrinti) {
    return axios.post('listeler/teklifmusteriler/customersCopyto', teklifMusteriAyrinti).then(res => res.data);
  },
  setCustomerSurface(customers) {
    return axios.post('listeler/musteriler/musteriSurface',customers).then(res=>res.data)
  },
  setCustomerSurfaceUpdate(customers) {
    return axios.put('listeler/musteriler/musteriSurface',customers).then(res=>res.data)
  },
  setCustomerSurfaceDelete(id) {
    return axios.delete('listeler/musteriler/musteriSurface/delete/' + id).then(res=>res.data)
  },


  getCustomerSurfaceList() {
    return axios.get('listeler/musteriler/musteriSurfaceList').then(res=>res.data)
  }
};

export default MusteriIslemService;

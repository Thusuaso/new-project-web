import axios from "@/helpers/custom_axios";

const TedarikciIslemService = {
  getTedarikciListeYukle() {
    return axios
      .get("tedarikci/listeler/tedarikciListesi")
      .then((res) => res.data);
  },
  tedarikciKaydet(item) {
    return axios
      .post("tedarikci/kayitIslem/tedarikciKaydet", item)
      .then((res) => res.data);
  },
  tedarikciGuncelle(item) {
    return axios
      .put("tedarikci/kayitIslem/tedarikciKaydet", item)
      .then((res) => res.data);
  },
  tedarikciSil(id) {
    return axios
      .delete("tedarikci/kayitIslem/tedarikciSil/" + id)
      .then((res) => res.data);
  },
};

export default TedarikciIslemService;

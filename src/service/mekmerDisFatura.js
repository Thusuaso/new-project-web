import axios from "@/helpers/custom_axios";

const mekmarDisFaturaService = {
  kaydet(data) {
    return axios
      .post("mekmer/disFaturaIslem/kaydet", data)
      .then((res) => res.data);
  },
  guncelle(data) {
    return axios
      .post("mekmer/disFaturaIslem/guncelle", data)
      .then((res) => res.data);
  },
  getMekmerDisFaturaList() {
    return axios
      .get("mekmer/disFaturaIslem/getMekmerDisFatura")
      .then((res) => res.data);
  },
  setMekmerDisFaturaKaydet(id, evrakAdi) {
    return axios
      .get("mekmer/disFaturaIslem/setMekmerFatura/" + id + "/" + evrakAdi)
      .then((res) => res.data);
  },
};

export default mekmarDisFaturaService;

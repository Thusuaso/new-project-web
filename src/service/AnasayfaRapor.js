import axios from "../helpers/custom_axios";
import store from "../store";

const anasayfaRapor = {
  getAnasayfaSevkDetay(firmaadi) {
    return axios
      .get(`raporlar/sevkayrinti/${firmaadi}`)
      .then((res) => res.data);
  },
  getAnasayfaTeklifDetay(kullaniciAdi) {
    return axios
      .get(`raporlar/teklifayrinti/${kullaniciAdi}`)
      .then((res) => res.data);
  },

  getAnasayfaSiparisListe() {
    return axios.get("/raporlar/siparisayrintiyil").then((res) => res.data);
  },
  getAnasayfaTakipListe() {
    return axios.get("/raporlar/takiplist").then((res) => res.data);
  },
  /*
    getAnasayfaRapor(){

        return axios.get('/raporlar/siparisOzet').then(res => res.data);
    },
    */
  getAnasayfaMusteriList() {
    const username = store.getters.getUser;
    return axios
      .get("raporlar/anasayfamusterim/" + username)
      .then((res) => res.data);
  },
  getFinansTakipListesi() {
    const username = store.getters.getUser;
    return axios
      .get("anasayfa/finans/takipListesi/" + username)
      .then((res) => res.data);
  },
  getTahminiDegisiklik() {
    return axios
      .get("/raporlar/anaSayfa/tahminiDegisiklik")
      .then((res) => res.data);
  },
};

export default anasayfaRapor;

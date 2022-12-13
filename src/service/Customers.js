import axios from "../helpers/custom_axios";

const customersService = {
  getCustomersListe(users) {
    return axios
      .get("/listeler/customers/customersList/" + users)
      .then((res) => res.data);
  },
  getCustomersListeSatisci(users) {
    return axios
      .get("/listeler/customers/customersListSatisci/" + users)
      .then((res) => res.data);
  },
  getCustomersListeTeklifler(users) {
    return axios
      .get("/listeler/customers/customersListTeklifler/" + users)
      .then((res) => res.data);
  },
  getCustomersListeBGN(users) {
    return axios
      .get("/listeler/customers/customersListBGN/" + users)
      .then((res) => res.data);
  },

  getCustomersListAll() {
    return axios
      .get("/listeler/customers/customersListAll")
      .then((res) => res.data);
  },
  getCustomersListAllSatisci() {
    return axios
      .get("/listeler/customers/customersListAllSatisci")
      .then((res) => res.data);
  },
  getCustomersListAllTeklifler() {
    return axios
      .get("/listeler/customers/customersListAllTeklifler")
      .then((res) => res.data);
  },
  getCustomersListAllBGN() {
    return axios
      .get("/listeler/customers/customersListAllBGN")
      .then((res) => res.data);
  },

  getCustomersDetayListe(musteri_adi) {
    return axios
      .get("listeler/customers/customersDetay/" + musteri_adi)
      .then((res) => res.data);
  },
  satisciIcerikKaydetme(item_data) {
    return axios
      .post("satisci/customers/islemler/satisciKayitDegistirme", item_data)
      .then((res) => res.data);
  },
  satisciIcerikGuncelleme(item_data) {
    return axios
      .put("satisci/customers/islemler/satisciKayitDegistirme", item_data)
      .then((res) => res.data);
  },
  satisciIcerikSilme(id) {
    return axios
      .delete("satisci/customers/islemler/satisciKayitSilme/" + id)
      .then((res) => res.data);
  },
  getSatisciMusteriListe(musteriadi, id) {
    return axios
      .get("satisci/customers/liste/musteriListe/" + musteriadi + "/" + id)
      .then((res) => res.data);
  },
  getSatisciModel() {
    return axios.get("satisci/customers/satisciModel").then((res) => res.data);
  },
  setSatisciDosyaKayit(musteri) {
    return axios
      .post("islemler/customers/satisciDosyaKaydet", musteri)
      .then((res) => res.data);
  },

  getCustomersHatirlatmaListe(kullanici_id) {
    return axios
      .get("listeler/customers/customersHatirlatma/" + kullanici_id)
      .then((res) => res.data);
  },
  setCustomersPriority(customer, priority) {
    return axios
      .get("satisci/customers/changePriority/" + customer + "/" + priority)
      .then((res) => res.data);
  },
  setFollowing(customer, follow) {
    return axios
      .get("satisci/customers/Following/" + customer + "/" + follow)
      .then((res) => res.data);
  },
  getTemsilciList() {
    return axios
      .get("/islemler/customers/temsilciList")
      .then((res) => res.data);
  },
  setTemsilci(customer, representative) {
    return axios
      .get(
        "/islemler/customers/changeRepresentative/" +
          customer +
          "/" +
          representative
      )
      .then((res) => res.data);
  },
  getBgpProjectsHatirlatma(userId) {
    return axios
      .get("/listeler/bgpProjects/bgpProjectsHatirlatmaList/" + userId)
      .then((res) => res.data);
  },
};

export default customersService;

import axios from "../helpers/custom_axios";
import store from "../store";

const raporService = {
  getSiparisOzet() {
    return axios.get("raporlar/siparisOzet").then((res) => res.data);
  },
  getSiteYeniUrunList() {
    return axios.get("raporlar/siteYeniUrunList").then((res) => res.data);
  }
  ,
  getMarketingRaporlari() {
    return axios.get("/finans/listeler/marketing");
  },
  getByMarketingYukleme(month) {
    return axios.get("/finans/listeler/byMarketing/" + month);
  },
  getMarketingExcell(data_list) {
    return axios
      .post("/raporlar/dosyalar/marketingExcellCikti", data_list)
      .then((res) => res.data);
  },
  getMusteriListUretim() {
    return axios.get("/raporlar/musteri/uretim").then((res) => res.data);
  },
  getCustomersExcell(data_list) {
    return axios
      .post("/raporlar/dosyalar/customersExcellCikti", data_list)
      .then((res) => res.data);
  },
  getByMarketingDetailExcell(data_list) {
    return axios
      .post("/raporlar/dosyalar/byMarketingAyrintiExcellCikti", data_list)
      .then((res) => res.data);
  },

  getYeniSiparisList() {
    return axios.get("/raporlar/yeniEklenenSiparisler").then((res) => res.data);
  },
  getSiparisOzetRapor() {
    return axios
      .get("raporlar/siparis/siparisOzetRaporlar")
      .then((res) => res.data);
  },

  getSiparisBazindaOzetTablo() {
    return axios
      .get("raporlar/siparis/siparisBazindeOzetRapor")
      .then((res) => res.data);
  },

  getMusteriBazindaSiparisOzetTablo() {
    return axios
      .get("raporlar/siparis/musteriBazindaSiparisOzet")
      .then((res) => res.data);
  },

  getAnaSayfaDegisiklikList() {
    return axios
      .get("raporlar/anaSayfa/anaSayfaDegisiklikList")
      .then((res) => res.data);
  },

  getAnaSayfaDegisiklikListAll() {
    return axios
      .get("raporlar/anaSayfa/anaSayfaDegisiklikListAll")
      .then((res) => res.data);
  },

  getMusteriBazindaAyrinti(yil, ay) {
    return axios
      .get("raporlar/siparis/musteriBazindaAyrinti/" + yil + "/" + ay)
      .then((res) => res.data);
  },

  getUlkeBazindaSevkiyat() {
    return axios
      .get("raporlar/siparis/ulkeBazindaSevkiyat")
      .then((res) => res.data);
  },
  getUlkeBazindaSevkiyatYears() {
    return axios.get("raporlar/siparis/ulkeBazindaSevkiyatYears").then(res=>res.data)
  },
  getUlkeBazindaSevkiyatAyrinti(ulkeId,year) {
    return axios
      .get("raporlar/siparis/ulkeBazindaSevkiyatAyrinti/" + ulkeId + '/' + year)
      .then((res) => res.data);
  },
  getUlkeBazindaSevkiyatYear(year) {
    return axios
      .get("raporlar/siparis/ulkeBazindaSevkiyatYears/" + year)
      .then((res) => res.data);
  },

  getKullaniciSiparisOzetRapor() {
    const username = store.getters.__getUsername;
    return axios
      .get("raporlar/siparisozet/siparisOzetRaporlar/" + username)
      .then((res) => res.data);
  },
  getKullaniciSiparisOzetAyrinti(ay) {
    const username = store.getters.__getUsername;
    return axios
      .get(`raporlar/siparisozet/kullaniciOzet/${username}/${ay}`)
      .then((res) => res.data);
  },
  getUretimRaporuHepsi() {
    return axios
      .get("raporlar/listeler/uretimRaporuHepsi")
      .then((res) => res.data);
  },
  getUretimRaporTarih(tarih) {
    return axios
      .get("raporlar/listeler/uretimRaporTarih/" + tarih)
      .then((res) => res.data);
  },
  getUretimRaporIkiTarih(ilk_tarih, son_tarih) {
    return axios
      .get(`raporlar/listeler/uretimRaporIkiTarih/${ilk_tarih}/${son_tarih}`)
      .then((res) => res.data);
  },
  getUretimRaporExcel(data_list) {
    return axios
      .post("/raporlar/dosyalar/uretimRaporExcelListe", data_list)
      .then((res) => res.data);
  },
  getSevkiyatRaporHepsi(tarih) {
    return axios
      .get(`raporlar/listeler/sevkiyatRaporHepsi/${tarih}`)
      .then((res) => res.data);
  },
  getOcakListesiRapor() {
    return axios
      .get("/raporlar/listeler/ocakListesiRapor")
      .then((res) => res.data);
  },
  getOcakListesiRaporExcell(data_list) {
    return axios
      .post("/raporlar/listeler/ocakListesiRaporExcell", data_list)
      .then((res) => res.data);
  },
  getSipKalanExcell(data_list) {
    return axios
      .post("/raporlar/listeler/sipKalanListesiExcell", data_list)
      .then((res) => res.data);
  },
  getmusteriBazindaAylikExcell(data_list) {
    return axios
      .post("/raporlar/listeler/musteriBazindaRaporExcell", data_list)
      .then((res) => res.data);
  },
  getSevkiyatRaporTarih(tarih) {
    return axios
      .get(`raporlar/listeler/sevkiyatRaporTarih/${tarih}`)
      .then((res) => res.data);
  },
  getSevkiyatRaporTekTarih(tarih) {
    return axios
      .get(`raporlar/listeler/sevkiyatRaporTekTarih/${tarih}`)
      .then((res) => res.data);
  },
  getSevkiyatRaporIkiTarih(ilk_tarih, son_tarih) {
    return axios
      .get(`raporlar/listeler/sevkiyatRaporIkiTarih/${ilk_tarih}/${son_tarih}`)
      .then((res) => res.data);
  },
  getSevkiyatExcelCikti(data_list) {
    return axios
      .post("raporlar/dosyalar/sevkiyatRaporExcelListe", data_list)
      .then((res) => res.data);
  },
  getMaliyetRapor(yil, ay) {
    return axios
      .get(`maliyet/listeler/maliyetListesi/${yil}/${ay}`)
      .then((res) => res.data);
  },
  getMaliyetRaporYil(yil) {
    return axios
      .get(`maliyet/listeler/maliyetListesi/${yil}`)
      .then((res) => res.data);
  },
  getMaliyetYilListesi() {
    return axios
      .get("maliyet/listeler/maliyetYilListesi")
      .then((res) => res.data);
  },
  getMaliyetAyListesi(yil) {
    return axios
      .get(`maliyet/listeler/maliyetAyListesi/${yil}`)
      .then((res) => res.data);
  },
  getMaliyetExcelCikti(data_list) {
    return axios
      .post("maliyet/dosyalar/maliyetRaporExcelListe", data_list)
      .then((res) => res.data);
  },
  getMaliyetAyrintiYeni(siparisno) {
    return axios
      .get("maliyet/ayrinti/listeler/maliyetListesi/" + siparisno)
      .then((res) => res.data);
  },
  getSevkiyatOzetRapor() {
    return axios
      .get("raporlar/sevkiyat/sevkiyatOzetRaporlar")
      .then((res) => res.data);
  },
  StokRaporRaporApi() {
    return axios
      .get("/raporlar/listeler/stokRaporuHepsi")
      .then((res) => res.data);
  },

  StokRaporOlculeriApi() {
    return axios
      .get("/raporlar/listeler/stokRaporuOlculeri")
      .then((res) => res.data);
  },
  StokRaporAnaList() {
    return axios
      .get("/raporlar/listeler/stokRaporuAnaListe")
      .then((res) => res.data);
  },
  StokRaporAnaListOnlyMekmer() {
    return axios
      .get("/raporlar/listeler/stokRaporuOnlyMekmer")
      .then((res) => res.data);
  },
  StokRaporAnaListFilter(tedarikci) {
    return axios
      .get("/raporlar/listeler/stokRaporuAnaListeFilter/" + tedarikci)
      .then((res) => res.data);
  },

  StokTopRaporApi() {
    return axios
      .get("/raporlar/listeler/stokTopRaporuHepsi")
      .then((res) => res.data);
  },
  getStokRaporAyrintiHepsi(select_depo) {
    return axios
      .get(
        "/raporlar/listeler/stokRaporAyrintiHepsi/" +
          select_depo.boyut.en +
          "/" +
          select_depo.boyut.boy +
          "/" +
          select_depo.boyut.kenar +
          "/" +
          select_depo.boyut.yuzeyIslem +
          "/" +
          select_depo.boyut.urunAdi +
          "/" +
          select_depo.listDurum
      )
      .then((res) => res.data);
  },

  getSevkiyatBuYilAyrintiListesiApi(ay) {
    return axios
      .get("/raporlar/listeler/sevkiyatBuyilAyrinti/" + ay)
      .then((res) => res.data);
  },
  getSevkiyatOncekiYilAyrintiListesiApi(ay) {
    return axios
      .get("/raporlar/listeler/sevkiyatOncekiyilAyrinti/" + ay)
      .then((res) => res.data);
  },

  getSevkiyatGecenYilAyrintiListesiApi(ay) {
    return axios
      .get("/raporlar/listeler/sevkiyatGecenAyrinti/" + ay)
      .then((res) => res.data);
  },
  getSiparisGecenYilAyrintiListesiApi(ay) {
    return axios
      .get("/raporlar/listeler/siparisGecenAyrinti/" + ay)
      .then((res) => res.data);
  },
  getSiparisOncekiYilAyrintiListesiApi(ay) {
    return axios
      .get("/raporlar/listeler/siparisOncekiyilAyrinti/" + ay)
      .then((res) => res.data);
  },
  getSiaprisBuYilAyrintiListesiApi(ay) {
    return axios
      .get("/raporlar/listeler/siparisBuyilAyrinti/" + ay)
      .then((res) => res.data);
  },

  getStokExcelCikti(data_list) {
    return axios
      .post("/raporlar/listeler/stokRaporExcelListe", data_list)
      .then((res) => res.data);
  },
  getUretilenSipExcell(data_list) {
    return axios
      .post("/raporlar/listeler/uretilenSipExcelListe", data_list)
      .then((res) => res.data);
  },
  getUrunlerUretimList() {
    return axios
      .get("/raporlar/listeler/urunlerUretimListesi")
      .then((res) => res.data);
  },
  getUrunlerUretimAyrintiList(urunKartId) {
    return axios
      .get("/raporlar/listeler/urunlerUretimAyrintiListesi/" + urunKartId)
      .then((res) => res.data);
  },

  getStokAyrintiExcelCikti(data_list) {
    return axios
      .post("/raporlar/listeler/stokRaporAyrintiExcelListe", data_list)
      .then((res) => res.data);
  },
  get_musteri_list_excell_cikti(data_list) {
    return axios
      .post("/raporlar/musteri/musteriexcellCikti", data_list)
      .then((res) => res.data);
  },
  get_ulk_sevk_top_excell_cikti(data_list) {
    return axios
      .post("/raporlar/musteri/ulkebzindaSevkiyat", data_list)
      .then((res) => res.data);
  },

  getOcakListesiDetaylari(ocakadi) {
    return axios
      .get("/raporlar/listeler/ocakListesiDetayListe/" + ocakadi)
      .then((res) => res.data);
  },

  getMusteriList() {
    const username = store.getters.__getUsername;
    return axios.get("/raporlar/musteri/" + username).then((res) => res.data);
  },
  getGenelMusteriList() {
    return axios.get("/raporlar/musteri").then((res) => res.data);
  },
  getMusteriDetay(musteriid) {
    return axios
      .get("/raporlar/musteri/musteriDetay/" + musteriid)
      .then((res) => res.data);
  },
  getYuklemeRapor(yil, ay) {
    return axios
      .get(`/raporlar/listeler/yukleme/${yil}/${ay}`)
      .then((res) => res.data);
  },

  getYuklemeRaporYear(yil) {
    return axios
      .get(`/raporlar/listeler/yuklemeYear/${yil}`)
      .then((res) => res.data);
  },



  getAtlantaYuklemeRapor(yil, ay) {
    return axios
      .get(`/raporlar/listeler/atlantayukleme/${yil}/${ay}`)
      .then((res) => res.data);
  },
  getYuklemeYilListesi() {
    return axios
      .get("/raporlar/listeler/yuklemeYilListesi")
      .then((res) => res.data);
  },
  getYuklemeAll() {
    return axios
      .get("/raporlar/listeler/sevkiyatRaporAll")
      .then((res) => res.data);
  },
  getYuklemeAyListesi(yil) {
    return axios
      .get(`/raporlar/listeler/yuklemeAyListesi/${yil}`)
      .then((res) => res.data);
  },
  getYuklemePoExcelCikti(data_list) {
    return axios
      .post("/raporlar/listeler/yuklemepoExcelCikti", data_list)
      .then((res) => res.data);
  },

  getSeleksiyonOcakListesi(data_list) {
    return axios
      .post("/raporlar/listeler/ocakListesiRapor", data_list)
      .then((res) => res.data);
  },
  getYuklemeMuExcelCikti(data_list) {
    return axios
      .post("/raporlar/listeler/yuklememusExcelCikti", data_list)
      .then((res) => res.data);
  },
  getYuklemeYilExcelCikti(data_list) {
    return axios
      .post("/raporlar/listeler/yuklemeYilExcelCikti", data_list)
      .then((res) => res.data);
  },
  getSiparisOzetExcelCikti(data_list) {
    return axios
      .post("/raporlar/listeler/siparisOzetExcelCikti", data_list)
      .then((res) => res.data);
  },
  getAtlantaStokListesi() {
    return axios
      .get("/raporlar/listeler/atlanta/stoklistesi")
      .then((res) => res.data);
  },
  getAtlantaStokAyrintiListesi(skuNo) {
    return axios
      .get("/raporlar/listeler/atlanta/ayrinti/stoklistesi/" + skuNo)
      .then((res) => res.data);
  },

  getAtlantaStokExcelCikti(data_list) {
    return axios
      .post("/raporlar/listeler/atlanta/stokExcelCikti", data_list)
      .then((res) => res.data);
  },

  getTedarikciPDFCikti(data_list) {
    return axios
      .post("/islemler/dosyalar/pdfciktim", data_list)
      .then((res) => res.data);
  },

  /*All Orders Report */
  getAllOrders() {
    return axios.get("/islemler/listeler/allOrders").then((res) => res.data);
  },
  getOrder(po) {
    return axios.get("/islemler/listeler/order/" + po).then((res) => res.data);
  },

  getUreticiDagilimi(year) {
    return axios
      .get("/islemler/listeler/ureticiDagilimi/" + year)
      .then((res) => res.data);
  },

  get_tedarikci_list_excell_cikti(data) {
    return axios
      .post("/islemler/listeler/ureticiDagilimiExcelList", data)
      .then((res) => res.data);
  },
  getNakliyeciDagilimi(year) {
    return axios
      .get("/islemler/listeler/nakliyeciDagilimi/" + year)
      .then((res) => res.data);
  },
  getNakliyeciDagilimiExcel(data) {
    return axios
      .post("/islemler/listeler/nakliyeciDagilimiExcel", data)
      .then((res) => res.data);
  },
  getFobMasraflar(year) {
    return axios
      .get("/islemler/listeler/fobMasraflar/" + year)
      .then((res) => res.data);
  },
  getFobMasraflarExcel(data) {
    return axios
      .post("/islemler/listeler/fobMasraflarExcel", data)
      .then((res) => res.data);
  },

  getNavlunMasraflar(year) {
    return axios
      .get("/islemler/listeler/navlunMasraflar/" + year)
      .then((res) => res.data);
  },
  getNavlunMasraflarExcel(data) {
    return axios
      .post("/islemler/listeler/navlunMasraflarExcel", data)
      .then((res) => res.data);
  },

  getDigerMasraflar(year) {
    return axios
      .get("/islemler/listeler/digerMasraflar/" + year)
      .then((res) => res.data);
  },
  getDigerMasraflarExcel(data) {
    return axios
      .post("/islemler/listeler/digerMasraflarExcel", data)
      .then((res) => res.data);
  },

  getMekusMasraflar(year) {
    return axios
      .get("/islemler/listeler/mekusMasraflar/" + year)
      .then((res) => res.data);
  },
  getMekusMasraflarExcel(data) {
    return axios
      .post("/islemler/listeler/mekusMasraflarExcel", data)
      .then((res) => res.data);
  },

  getKomisyonMasraflar(year) {
    return axios
      .get("/islemler/listeler/komisyonMasraflar/" + year)
      .then((res) => res.data);
  },
  getKomisyonMasraflarExcel(data) {
    return axios
      .post("/islemler/listeler/komisyonMasraflarExcel", data)
      .then((res) => res.data);
  },

  getBankaVeEvrakMasraflar(year) {
    return axios
      .get("/islemler/listeler/bankaVeEvrakMasraflar/" + year)
      .then((res) => res.data);
  },
  getBankaVeEvrakMasraflarExcel(data) {
    return axios
      .post("/islemler/listeler/bankaVeEvrakMasraflarExcel", data)
      .then((res) => res.data);
  },
  /*Temsilci Satışçılar Raporları */

  getTemsilciSatislariAll(username) {
    return axios
      .get("/raporlar/temsilciSatislariAll/" + username)
      .then((res) => res.data);
  },
  getTemsilciSatislariAllDetay(ay, username) {
    return axios
      .get("/raporlar/temsilciSatislariAllDetay/" + ay + "/" + username)
      .then((res) => res.data);
  },
  getTemsilciSatislariAllDetaySatislar(ay, username) {
    return axios
      .get("/raporlar/temsilciSatislariAllDetaySatislar/" + ay + "/" + username)
      .then((res) => res.data);
  },
  getTemsilciSatislariAllDetayYuklemeler(ay, username) {
    return axios
      .get(
        "/raporlar/temsilciSatislariAllDetayYuklemeler/" + ay + "/" + username
      )
      .then((res) => res.data);
  },

  /////////////////////////////DashBoard/////////////////////////

  getDashboardSatislarTamami() {
    return axios.get("/raporlar/dashboard/dasboardNew").then((res) => res.data);
  },
  getDashboardSatislarSatisci(username) {
    return axios
      .get("/raporlar/dashboard/dasboardNewSatisci/" + username)
      .then((res) => res.data);
  },
  getDashboardSatislarGrafik() {
    return axios
      .get("/raporlar/dashboard/dasboardNewSatisciGrafik")
      .then((res) => res.data);
  },
  getDashboardGrafikData() {
    return axios
      .get("/raporlar/dashboard/dashboardNewGrafikData")
      .then((res) => res.data);
  },
  getDashboardSubData() {
    return axios
      .get("/raporlar/dashboard/dashboardSubData")
      .then((res) => res.data);
  },
  getTedarikciAyrintiData(tedarikciId) {
    return axios
      .get("/raporlar/dashboard/tedarikciAyrinti/" + tedarikciId)
      .then((res) => res.data);
  },

  getFirmaBazindaAyrintiData(firmaId) {
    return axios
      .get("/raporlar/dashboard/firmaBazindaSipAyrinti/" + firmaId)
      .then((res) => res.data);
  },
  getTekliflerAyrintiData(satisciId) {
    return axios
      .get("/raporlar/dashboard/tekliflerAyrinti/" + satisciId)
      .then((res) => res.data);
  },
  postLogsAyrinti(data) {
    return axios
      .post("/raporlar/logs/logsAyrinti", data)
      .then((res) => res.data);
  },
  getUlkeTeklifler(year) {
    return axios
      .get("/raporlar/dashboard/ulkeTeklifler/" + year)
      .then((res) => res.data);
  },
  getUlkeyeGoreTeklifAyrinti(year, ulkeId) {
    return axios
      .get("/raporlar/dashboard/ulkeTekliflerAyrinti/" + year + "/" + ulkeId)
      .then((res) => res.data);
  },
  getQuarterMaliyetDataList(quarter) {
    return axios
      .get("/raporlar/maliyet/quarterMaliyet/" + quarter)
      .then((res) => res.data);
  },
  getAyBazindaMarketingYuklemeler() {
        return axios.get('/raporlar/marketing/ayBazinda/yukleme').then(res=>res.data)
    },

    getAyBazindaMarketingIcPiyasaYuklemeler(month) {
        return axios.get('/raporlar/marketing/ayBazinda/yuklemeIcPiyasaAyrinti/' + month).then(res=>res.data)
    },
    getAyBazindaMarketingMekmerYuklemeler(month) {
        return axios.get('/raporlar/marketing/ayBazinda/yuklemeMekmerAyrinti/' + month).then(res=>res.data)
  },
    get_month_marketing_excell_cikti(data_list){

        return axios.post('/raporlar/musteri/monthMarketingExcell',data_list).then(res => res.data)
    },
    get_month_marketing_ayrinti_excell_cikti(data_list) {
        return axios.post('/raporlar/musteri/monthMarketingAyrintiExcell',data_list).then(res => res.data)
  },
    getSevkiyatRaporTarihMekmer(tarih){

        return axios.get(`raporlar/listeler/sevkiyatRaporTarihMekmer/${tarih}`).then(res => res.data)
    },
    getSevkiyatRaporTekTarihMekmer(tarih){

        return axios.get(`raporlar/listeler/sevkiyatRaporTekTarihMekmer/${tarih}`).then(res => res.data)
    },
    getSevkiyatRaporIkiTarihMekmer(ilk_tarih,son_tarih){

        return axios.get(`raporlar/listeler/sevkiyatRaporIkiTarihMekmer/${ilk_tarih}/${son_tarih}`).then(res => res.data)
    },

    getSevkiyatRaporTarihMekmar(tarih){

        return axios.get(`raporlar/listeler/sevkiyatRaporTarihMekmar/${tarih}`).then(res => res.data)
    },
    getSevkiyatRaporTekTarihMekmar(tarih){

        return axios.get(`raporlar/listeler/sevkiyatRaporTekTarihMekmar/${tarih}`).then(res => res.data)
    },
    getSevkiyatRaporIkiTarihMekmar(ilk_tarih,son_tarih){

        return axios.get(`raporlar/listeler/sevkiyatRaporIkiTarihMekmar/${ilk_tarih}/${son_tarih}`).then(res => res.data)
  },
    getSevkiyatRaporHepsiMekmer(tarih){

        return axios.get(`raporlar/listeler/sevkiyatRaporHepsiMekmer/${tarih}`).then(res => res.data)
    },
    getSevkiyatRaporHepsiMekmar(tarih){

        return axios.get(`raporlar/listeler/sevkiyatRaporHepsiMekmar/${tarih}`).then(res => res.data)
  },
    getYuklemeAllMekmer(){

        return axios.get('/raporlar/listeler/sevkiyatRaporAllMekmer').then(res => res.data)
    },
    getYuklemeAllMekmar(){

        return axios.get('/raporlar/listeler/sevkiyatRaporAllMekmar').then(res => res.data)
  },
     getUrunlerUretimAyrintiListMekmar(urunKartId) {
        return axios.get('/raporlar/listeler/urunlerUretimAyrintiListesiMekmar/' + urunKartId).then(res =>res.data)
    },
    getUrunlerUretimAyrintiListMekmer(urunKartId) {
        return axios.get('/raporlar/listeler/urunlerUretimAyrintiListesiMekmer/' + urunKartId).then(res =>res.data)
  },
    getUrunlerUretimListMekmar() {
        return axios.get('/raporlar/listeler/urunlerUretimListesiMekmar').then(res =>res.data)
    },
    getUrunlerUretimListMekmer() {
        return axios.get('/raporlar/listeler/urunlerUretimListesiMekmer').then(res =>res.data)
  },
    setAlisFiyatiControl(alis_fiyati_control) {
        return axios.post('/raporlar/ayo/alisFiyatiControlChange',alis_fiyati_control).then(res=>res.data)
  },
    getSevkiyatRaporTarihAll(tarih){

        return axios.get(`raporlar/listeler/sevkiyatRaporTarihAll/${tarih}`).then(res => res.data)
        },
        getSevkiyatRaporTekTarihAll(tarih){

            return axios.get(`raporlar/listeler/sevkiyatRaporTekTarihAll/${tarih}`).then(res => res.data)
        },
        getSevkiyatRaporIkiTarihAll(ilk_tarih,son_tarih){

            return axios.get(`raporlar/listeler/sevkiyatRaporIkiTarihAll/${ilk_tarih}/${son_tarih}`).then(res => res.data)
  },
        getSevkiyatRaporHepsiAll(tarih){

        return axios.get(`raporlar/listeler/sevkiyatRaporHepsiAll/${tarih}`).then(res => res.data)
  },
        getYuklemeAllAll(){

        return axios.get('/raporlar/listeler/sevkiyatRaporAllAll').then(res => res.data)
  },
        getMineList() {
    return axios.get("listeler/ocakList").then(res=>res.data)
  },
  setAddPrice(addPrice) {
    return axios.post("raporlar/listeler/setAddPrice",addPrice).then(res=>res.data)
  },
  /**************************Stok Listesi Fiyatlı*****************************/
  stokRaporAnaListMekmerMekmoz() {
    return axios
      .get("/raporlar/listeler/stokRaporuMekmerMekmoz")
      .then((res) => res.data);
  },
  stokRaporAnaListDis() {
    return axios
      .get("/raporlar/listeler/stokRaporuDis")
      .then((res) => res.data);
  },
  stokRaporAnaListDisMekmardaOlanlar() {
    return axios.get("/raporlar/listeler/stokRaporuDisMekmardaOlanlar").then(res =>res.data)
  },


  stokRaporAnaListMekmerMekmozAyrinti(urunId) {
    return axios.get(`raporlar/listeler/stokRaporuMekmerMekmozAyrinti/${urunId}`).then(res=>res.data)
  },
  stokRaporAnaListDisAyrinti(urunId) {
    return axios.get(`raporlar/listeler/stokRaporuDisAyrinti/${urunId}`).then(res=>res.data)
  },
  stokRaporAnaListDisMekmardaOlanAyrinti(urunId) {
    return axios.get(`/raporlar/listeler/stokRaporuDisMekmardaOlanAyrinti/${urunId}`).then(res=>res.data)
  },
  stockFiyatliExcellCikti(data) {
    return axios.post('/raporlar/listeler/stokRaporuFiyatli',data).then(res=>res.data)
  },
  
  galleriaAddProduct(data) {
    return axios.post("panel/mekmarcom/galleria/add",data).then(res=>res.data)
  },
  getMekmarComGalleriPhotos(product_id) {
    return axios.get(`/panel/mekmarcom/galleri/getPhotos/${product_id}`)
  },
  setMekmarComGalleriDeletePhotos(id) {
    return axios.get(`/panel/mekmarcom/galeri/deletePhotos/${id}`)
  },
  getOrderContainerAmount(sipNo) {
    return axios.get(`/ayo/getOrderContainerAmount/${sipNo}`)
  },
  /*Mekmar Raporları */
  getMekmarUlkeyeGore(year) {
    return axios.get(`/raporlar/mekmarraporlari/ulke/${year}`).then(res=>res.data)
  },
  getMekmarUlkeyeGoreAyrinti(ulke_id, year) {
    return axios.get(`raporlar/mekmarraporlari/ulke/ayrinti/${ulke_id}/${year}`).then(res=>res.data)
  },

  getMekmarMusteriyeGore(year) {
    return axios.get(`/raporlar/mekmarraporlari/musteri/${year}`).then(res=>res.data)
  },
  getMekmarMusteriyeGoreAyrinti(musteri_id, year) {
    return axios.get(`raporlar/mekmarraporlari/musteri/ayrinti/${musteri_id}/${year}`).then(res=>res.data)
  },


  getMekmarTedarikciyeGore(year) {
    return axios.get(`/raporlar/mekmarraporlari/tedarikci/${year}`).then(res=>res.data)
  },
  getMekmarTedarikciyeGoreAyrinti(tedarikci_id,year) {
    return axios.get(`/raporlar/mekmarraporlari/tedarikci/ayrinti/${tedarikci_id}/${year}`).then(res=>res.data)
  }
};

export default raporService;

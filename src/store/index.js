import { createStore } from "vuex";
import loginAuth from "./modules/loginAuth";
import dashboard from "./modules/dashboard";
import musteri from "./modules/musteri";
import kayitKontrol from "./modules/kayitKontrol";
import ekstraGiderler from "./modules/ekstraGiderler";
import local from "./modules/local";
import customers from "./modules/customers";
import customersislem from "./modules/customersislem";
import bgpProjects from "./modules/bgpProjects";
import mobilWidth from "./modules/mobilWidth";
import siparistoplam from "./modules/siparistoplam";
import siparis from "./modules/siparis";
import seleksiyonfonksiyon from "./modules/seleksiyonfonksiyon";
import uretimstok from "./modules/uretimstok";
import seleksiyon from "./modules/seleksiyon";
import tedarikciAlisFiyat from "./modules/tedarikciAlisFiyat";
import kasaEbatlari from "./modules/kasaEbatlari";
import urunKart from "./modules/urunKart";
import tedarikci from "./modules/tedarikci";
import evrakform from "./modules/evrakform";
import sevktakip from "./modules/sevktakip";
import konteynırform from "./modules/konteynırform";
import atlanta from "./modules/atlanta";
import ceyreklikSatislar from "./modules/ceyreklikSatislar";
import seleksiyonocaklistesi from "./modules/seleksiyonocaklistesi";
import teklifmusteri from "./modules/teklifmusteri";
import depo from "./modules/depo";
import mekmar from "./modules/mekmar";
import loading from "./modules/loading";
import efesfinans from "./modules/efesfinans";
import finans from "./modules/finans";
import finans_depo from "./modules/finans_depo";
import pesinat from "./modules/pesinat";
import tahsilat from "./modules/tahsilat";
import maliyet_ayrinti from "./modules/maliyet_ayrinti";
import bymarketingrapors from "./modules/bymarketingrapors";
import efespesinat from "./modules/efespesinat";
import efestahsilat from "./modules/efestahsilat";
import mekmerDisFatura from "./modules/mekmerDisFatura";

// import createPersistedState from "vuex-persistedstate";

export default createStore({
  modules: {
    loginAuth,
    dashboard,
    musteri,
    kayitKontrol,
    ekstraGiderler,
    local,
    customers,
    customersislem,
    bgpProjects,
    mobilWidth,
    siparistoplam,
    siparis,
    seleksiyonfonksiyon,
    uretimstok,
    seleksiyon,
    tedarikciAlisFiyat,
    kasaEbatlari,
    urunKart,
    tedarikci,
    evrakform,
    sevktakip,
    konteynırform,
    atlanta,
    ceyreklikSatislar,
    seleksiyonocaklistesi,
    teklifmusteri,
    depo,
    mekmar,
    loading,
    efesfinans,
    finans,
    finans_depo,
    pesinat,
    tahsilat,
    maliyet_ayrinti,
    bymarketingrapors,
    efespesinat,
    efestahsilat,
    mekmerDisFatura

  },
  // plugins: [createPersistedState()],
});

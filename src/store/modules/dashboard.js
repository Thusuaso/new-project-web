import raporService from "../../service/RaporService";
import store from "@/store";
const state = {
  gelenSiparis: [],
  gelenSiparisYuklenen: [],
  gelenSiparisYear: [],
  gelenSiparisYearYuklenen: [],
  gelenSiparisEfes: [],
  gelenSiparisEfesYillik: [],
  gelenSiparisEfesYuklenen: [],
  gelenSiparisEfesYillikYuklenen: [],
  gelenSiparislerGrafik: [],
  gelenSiparislerGrafikDataMekmar: [],
  dashboardSubData: [],
  dashboardLogsAll: [],
  dashboardLogs: [],
  dashboardUlkeyeGoreTeklif: [],
  kontAlacakTop: 0,
  finansAlacakTop: 0,
  tahminiDegisiklik: [],
  tedarikciPriceSum: 0,
  tedarikciProductSum: 0,
  musteriPriceSum: 0,
  musteriPriceProductSum: 0,
};

const actions = {
  tahmini_degisiklik_load({ commit }, data) {
    commit("tahmini_degisiklik_mut", data);
  },
  gelen_siparis_mekmar_load({ commit }) {
    store.dispatch("loadingBeginAct");
    raporService.getDashboardSatislarTamami().then((data) => {
      console.log("getDashboardSatislarTamami",data)
      commit("gelen_siparis_mut", data.gelenSiparisMekmar[0]);
      commit("gelen_siparis_year_mut", data.gelenSiparisYearMekmar[0]);
      commit("gelen_siparis_yuklenen_mut", data.gelenSiparisMekmarYuklenen[0]);
      commit(
        "gelen_siparis_year_yuklenen_mut",
        data.gelenSiparisYearYuklenenMekmar[0]
      );
      commit("gelen_siparis_efes_mut", data.gelenSiparisEfes[0]);
      commit("gelen_siparis_efes_year_mut", data.gelenSiparisYillikEfes[0]);
      commit(
        "gelen_siparis_efes_yuklenen_mut",
        data.gelenSiparisEfesYuklenen[0]
      );
      commit(
        "gelen_siparis_efes_year_yuklenen_mut",
        data.gelenSiparisYillikEfesYuklenen[0]
      );
    });
  },
  gelen_siparis_satisci_load({ commit }) {
    const localUser = store.getters.__getUsername;
    raporService.getDashboardSatislarSatisci(localUser).then((data) => {
      commit("gelen_siparis_mut", data);
    });
  },
  gelen_siparis_all_load({ commit }) {
    raporService.getDashboardSatislarTamami().then((data) => {
      commit("gelen_siparis_mut", data.gelenSiparisAll[0]);
      commit("gelen_siparis_year_mut", data.gelenSiparisYearAll[0]);
      commit("gelen_siparis_yuklenen_mut", data.gelenSiparisAllYuklenen[0]);
      commit(
        "gelen_siparis_year_yuklenen_mut",
        data.gelenSiparisYearYuklenenAll[0]
      );
      commit("gelen_siparis_efes_mut", data.gelenSiparisEfes[0]);
      commit("gelen_siparis_efes_year_mut", data.gelenSiparisYillikEfes[0]);
      commit(
        "gelen_siparis_efes_yuklenen_mut",
        data.gelenSiparisEfesYuklenen[0]
      );
      commit(
        "gelen_siparis_efes_year_yuklenen_mut",
        data.gelenSiparisYillikEfesYuklenen[0]
      );
    });
  },
  gelen_siparis_grafik_load({ commit }) {
    raporService.getDashboardSatislarGrafik().then((data) => {
      commit("gelen_siparis_grafik_mut", data.grafikMekmar);
    });
  },
  gelen_siparis_grafik_hepsi_load({ commit }) {
    raporService.getDashboardSatislarGrafik().then((data) => {
      commit("gelen_siparis_grafik_hepsi_mut", data.grafikHepsi);
    });
  },
  gelen_siparis_grafik_mekmar_data_load({ commit }) {
    raporService.getDashboardGrafikData().then((data) => {
      commit("gelen_siparis_grafik_mekmar_data_mut", data);
      store.dispatch("loadingEndAct");
    });
  },
  dashboard_sub_data_load({ commit }) {
    raporService.getDashboardSubData().then((data) => {
      commit("dashboard_sub_data_mut", data);
    });
  },
  dashboard_logs_all_load({ commit }, data) {
    commit("dashboard_logs_all_mut", data);
  },
  dashboard_logs_load({ commit }, data) {
    commit("dashboard_logs_mut", data);
  },
  dashboard_ulkeye_gore_load({ commit }, data) {
    commit("dashboard_ulkeye_gore_mut", data);
  },
};

const mutations = {
  tahmini_degisiklik_mut(state, data) {
    state.tahminiDegisiklik = data;
  },
  gelen_siparis_mut(state, data) {
    state.gelenSiparis = data;
  },
  gelen_siparis_year_mut(state, data) {
    state.gelenSiparisYear = data;
  },
  gelen_siparis_yuklenen_mut(state, data) {
    state.gelenSiparisYuklenen = data;
  },
  gelen_siparis_year_yuklenen_mut(state, data) {
    state.gelenSiparisYearYuklenen = data;
  },
  gelen_siparis_efes_mut(state, data) {
    state.gelenSiparisEfes = data;
  },
  gelen_siparis_efes_year_mut(state, data) {
    state.gelenSiparisEfesYillik = data;
  },
  gelen_siparis_efes_yuklenen_mut(state, data) {
    state.gelenSiparisEfesYuklenen = data;
  },
  gelen_siparis_efes_year_yuklenen_mut(state, data) {
    state.gelenSiparisEfesYillikYuklenen = data;
  },
  gelen_siparis_grafik_mut(state, data) {
    state.gelenSiparislerGrafik = data;
  },
  gelen_siparis_grafik_hepsi_mut(state, data) {
    state.gelenSiparislerGrafik = data;
  },
  gelen_siparis_grafik_mekmar_data_mut(state, data) {
    state.gelenSiparislerGrafikDataMekmar = data;
  },
  dashboard_sub_data_mut(state, data) {
    state.dashboardSubData = data;
    state.kontAlacakTop = 0;
    state.finansAlacakTop = 0;

    for (let item in data.konteynir) {
      state.kontAlacakTop += data.konteynir[item].kalan;
    }
    for (let item2 in data.finans.filter((x) => x.kalanBedel >= 10)) {
      state.finansAlacakTop += data.finans.filter((x) => x.kalanBedel >= 10)[
        item2
      ].kalanBedel;
    }
    state.tedarikciPriceSum = 0;
    state.tedarikciProductSum = 0;
    for (let item of data.tedarikci) {
      state.tedarikciPriceSum += item.satisToplam;
      state.tedarikciProductSum += item.satisMiktar;
    }
    state.musteriPriceSum = 0;
    state.musteriPriceProductSum = 0;
    for (let item of data.musteriSiparisler) {
      state.musteriPriceSum += item.satisToplam;
      state.musteriPriceProductSum += item.satisMiktar;
    }
  },
  dashboard_logs_all_mut(state, data) {
    state.dashboardLogsAll = data;
  },
  dashboard_logs_mut(state, data) {
    state.dashboardLogs = data;
  },
  dashboard_ulkeye_gore_mut(state, data) {
    state.dashboardUlkeyeGoreTeklif = data;
  },
};

const getters = {
  gelenSiparis(state) {
    return state.gelenSiparis;
  },
  gelenSiparisYear(state) {
    return state.gelenSiparisYear;
  },
  gelenSiparisYuklenen(state) {
    return state.gelenSiparisYuklenen;
  },
  gelenSiparisYearYuklenen(state) {
    return state.gelenSiparisYearYuklenen;
  },
  gelenSiparisEfes(state) {
    return state.gelenSiparisEfes;
  },
  gelenSiparisEfesYillik(state) {
    return state.gelenSiparisEfesYillik;
  },
  gelenSiparisEfesYuklenen(state) {
    return state.gelenSiparisEfesYuklenen;
  },
  gelenSiparisEfesYillikYuklenen(state) {
    return state.gelenSiparisEfesYillikYuklenen;
  },
  gelenSiparislerGrafik(state) {
    return state.gelenSiparislerGrafik;
  },
  gelenSiparislerGrafikDataMekmar(state) {
    return state.gelenSiparislerGrafikDataMekmar;
  },
  dashboardSubData(state) {
    return state.dashboardSubData;
  },
  dashboardLogsAll(state) {
    return state.dashboardLogsAll;
  },
  dashboardLogs(state) {
    return state.dashboardLogs;
  },
  dashboardUlkeyeGoreTeklif(state) {
    return state.dashboardUlkeyeGoreTeklif;
  },
  kontAlacakTop(state) {
    return state.kontAlacakTop;
  },
  finansAlacakTop(state) {
    return state.finansAlacakTop;
  },
  tahminiDegisiklik(state) {
    return state.tahminiDegisiklik;
  },
  tedarikciPriceSum(state) {
    return state.tedarikciPriceSum;
  },
  tedarikciProductSum(state) {
    return state.tedarikciProductSum;
  },
  musteriPriceSum(state) {
    return state.musteriPriceSum;
  },
  musteriPriceProductSum(state) {
    return state.musteriPriceProductSum;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

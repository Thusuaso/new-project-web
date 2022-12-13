const state = {
  konteyner_ana_list_all: [],
  konteyner_ana_list_filter: [],
  finans_toplam_devir: 0,
  finans_toplam_ciro: 0,
  finans_toplam_odenen: 0,
  finans_toplam_bakiye: 0,
  finans_toplam_pesinat: 0,
  finans_toplam_eski_pesinat: 0,
  finans_toplam_genel_bakiye: 0,
  finans_ayrinti_list: null,
  finans_ayrinti_kalan_toplam: 0,
  finans_ayrinti_siparis_total: 0,
  finans_ayrinti_siparis_pesinat: 0,
  finans_ayrinti_siparis_odenen_tutar: 0,
  finans_ayrinti_odeme_list: null,
  finans_ayrinti_odeme_toplam: 0,
  finans_odeme_secim_list: null,
  finans_odeme_secim_toplam: 0,
};

const actions = {
  finansAnaListeYukleAct({ commit }, data) {
    commit("finansAnaListeYukleMut", data);
  },
  finansAnaListe_hepsiAct({ commit }, data) {
    commit("finansAnaListe_hepsiMut", data);
  },
  finansAnaListe_filterAct({ commit }, data) {
    commit("finansAnaListe_filterMut", data);
  },
  finansAyrintiListYukleAct({ commit }, data) {
    commit("finansAyrintiListYukleMut", data);
  },
  finansOdemeSecimListYukleAct({ commit }, data) {
    commit("finansOdemeSecimListYukleMut", data);
  },
};

const mutations = {
  finansAnaListeYukleMut(state, data) {
    state.konteyner_ana_list_all = data.konteyner_list;

    state.konteyner_ana_list_filter = [];

    state.finans_toplam_devir = 0;
    state.finans_toplam_ciro = 0;
    state.finans_toplam_odenen = 0;
    state.finans_toplam_bakiye = 0;
    state.finans_toplam_pesinat = 0;
    state.finans_toplam_genel_bakiye = 0;
    state.finans_toplam_eski_pesinat = 0;

    for (let key in data.konteyner_list) {
      const item = data.konteyner_list[key];

      if (item.genel_bakiye > 8) {
        state.konteyner_ana_list_filter.push(item);
      }
      if (item.genel_bakiye < -8) {
        state.konteyner_ana_list_filter.push(item);
      }
    }

    for (let key in state.konteyner_ana_list_filter) {
      const item = state.konteyner_ana_list_filter[key];

      state.finans_toplam_devir += Number(item.devir);
      state.finans_toplam_ciro += Number(item.ciro);
      state.finans_toplam_odenen += Number(item.kapanmayan_odenen);
      state.finans_toplam_bakiye += Number(item.kapanmayan_siparis);
      state.finans_toplam_pesinat += Number(item.pesinat);
      state.finans_toplam_genel_bakiye += Number(item.genel_bakiye);
      state.finans_toplam_eski_pesinat += Number(item.eski_pesinat);
    }
  },
  finansAnaListe_hepsiMut(state, data) {
    state.finans_toplam_devir = 0;
    state.finans_toplam_ciro = 0;
    state.finans_toplam_odenen = 0;
    state.finans_toplam_bakiye = 0;
    state.finans_toplam_pesinat = 0;
    state.finans_toplam_genel_bakiye = 0;
    state.finans_toplam_eski_pesinat = 0;

    state.konteyner_ana_list_all = [];
    state.konteyner_ana_list_all = data;

    for (let key in state.konteyner_ana_list_all) {
      const item = state.konteyner_ana_list_all[key];

      state.finans_toplam_devir += Number(item.devir);
      state.finans_toplam_ciro += Number(item.ciro);
      state.finans_toplam_odenen += Number(item.kapanmayan_odenen);
      state.finans_toplam_bakiye += Number(item.kapanmayan_siparis);
      state.finans_toplam_pesinat += Number(item.pesinat);
      state.finans_toplam_genel_bakiye += Number(item.genel_bakiye);
      console.log(item.genel_bakiye);
      state.finans_toplam_eski_pesinat += Number(item.eski_pesinat);
    }
  },
  finansAnaListe_filterMut(state, data) {
    state.finans_toplam_devir = 0;
    state.finans_toplam_ciro = 0;
    state.finans_toplam_odenen = 0;
    state.finans_toplam_bakiye = 0;
    state.finans_toplam_pesinat = 0;
    state.finans_toplam_genel_bakiye = 0;
    state.finans_toplam_eski_pesinat = 0;

    state.konteyner_ana_list_filter = [];

    state.konteyner_ana_list_filter = data;

    for (let key in state.konteyner_ana_list_filter) {
      const item = state.konteyner_ana_list_filter[key];

      state.finans_toplam_devir += Number(item.devir);
      state.finans_toplam_ciro += Number(item.ciro);
      state.finans_toplam_odenen += Number(item.odenen);
      state.finans_toplam_bakiye += Number(item.bakiye);
      state.finans_toplam_pesinat += Number(item.pesinat);
      state.finans_toplam_genel_bakiye += Number(item.genel_bakiye);

      state.finans_toplam_eski_pesinat += Number(item.eski_pesinat);
    }
  },
  finansAyrintiListYukleMut(state, data) {
    state.finans_ayrinti_list = data.ayrinti_list;
    state.finans_ayrinti_odeme_list = data.odeme_liste;
    state.finans_ayrinti_kalan_toplam = 0;
    state.finans_ayrinti_odeme_toplam = 0;
    state.finans_ayrinti_siparis_total = 0;
    state.finans_ayrinti_siparis_pesinat = 0;
    state.finans_ayrinti_siparis_odenen_tutar = 0;
    var total = 0;
    for (let key in state.finans_ayrinti_list) {
      const item = state.finans_ayrinti_list[key];

      if (item.tip != "Yükleme") total = 0;
      else total = item.siparis_total;

      state.finans_ayrinti_siparis_total += total;
      state.finans_ayrinti_siparis_pesinat += item.pesinat;
      if (item.tip == "Üretim") {
        state.finans_ayrinti_kalan_toplam += item.kalan + item.odenen_tutar;
      } else {
        state.finans_ayrinti_kalan_toplam += item.kalan;
      }

      state.finans_ayrinti_siparis_odenen_tutar += item.odenen_tutar;
    }

    // ödeme listesi

    for (let key in state.finans_ayrinti_odeme_list) {
      const item = state.finans_ayrinti_odeme_list[key];

      state.finans_ayrinti_odeme_toplam += item.tutar;
    }
  },
  finansOdemeSecimListYukleMut(state, data) {
    state.finans_odeme_secim_list = data;

    state.finans_odeme_secim_toplam = 0;

    for (let key in state.finans_odeme_secim_list) {
      const item = state.finans_odeme_secim_list[key];

      state.finans_odeme_secim_toplam += item.tutar;
    }
  },
};

const getters = {
  konteyner_ana_list_all(state) {
    return state.konteyner_ana_list_all;
  },
  konteyner_ana_list_filter(state) {
    return state.konteyner_ana_list_filter;
  },
  finans_toplam_devir(state) {
    return state.finans_toplam_devir;
  },
  finans_toplam_ciro(state) {
    return state.finans_toplam_ciro;
  },
  finans_toplam_odenen(state) {
    return state.finans_toplam_odenen;
  },
  finans_toplam_bakiye(state) {
    return state.finans_toplam_bakiye;
  },
  finans_toplam_pesinat(state) {
    return state.finans_toplam_pesinat;
  },
  finans_toplam_genel_bakiye(state) {
    return state.finans_toplam_genel_bakiye;
  },
  finans_ayrinti_list(state) {
    return state.finans_ayrinti_list;
  },
  finans_ayrinti_kalan_toplam(state) {
    return state.finans_ayrinti_kalan_toplam;
  },

  finans_ayrinti_siparis_pesinat(state) {
    return state.finans_ayrinti_siparis_pesinat;
  },
  finans_ayrinti_siparis_odenen_tutar(state) {
    return state.finans_ayrinti_siparis_odenen_tutar;
  },
  finans_ayrinti_siparis_total(state) {
    return state.finans_ayrinti_siparis_total;
  },
  finans_ayrinti_odeme_toplam(state) {
    return state.finans_ayrinti_odeme_toplam;
  },
  finans_ayrinti_odeme_list(state) {
    return state.finans_ayrinti_odeme_list;
  },
  finans_odeme_secim_list(state) {
    return state.finans_odeme_secim_list;
  },
  finans_odeme_secim_toplam(state) {
    return state.finans_odeme_secim_toplam;
  },
  finans_toplam_eski_pesinat(state) {
    return state.finans_toplam_eski_pesinat;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

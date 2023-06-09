const state = {
  tedarikciList: null,
  siparisler: null,
  isNewClicked: false,
  yuklemeList: [],
  profData: [],
  teslimTurList: [],
  odemeTurList: [],
  faturaKesimTurList: [],
  ulkeList2: [],
  siparisSatisciInfo: [],
  opOzetList: [],
  ssOzetList: [],
  kullaniciList: [],
  satisciInfoSum: 0,
  opSum: 0,
  ssSum:0
  
};

const actions = {
  tedarikci_list_yukle_act({ commit }, data) {
    commit("tedarikci_list_yukle_mut", data);
  },
  siparisler_list_yukle_act({ commit }, data) {
    commit("siparisler_list_yukle_mut", data);
  },
  is_new_form_click_load({ commit }, data) {
    commit("is_new_form_click_mut", data);
  },
  siparis_evrak_list_load({ commit }, data) {
    this.yuklemeList = [];
    commit("siparis_evrak_list_mut", data);
  },
  profData_load_act({ commit }, data) {
    commit("profData_load_mut", data);
  },
  teslim_tur_load_act({ commit }, data) {
    commit('teslim_tur_load_mut',data)
  },
  odeme_tur_load_act({ commit }, data) {
    commit('odeme_tur_load_mut',data)
  },
  fatura_tur_load_act({ commit }, data) {
    commit('fatura_tur_load_mut',data)
  },
  ulke_tur_load_act({ commit }, data) {
    commit('ulke_tur_load_mut',data)
  },
  siparis_satisci_info_act({ commit }, data) {
    commit('siparis_satisci_info_mut', data);
  }
};

const mutations = {
  teslim_tur_load_mut(state, data) {
    state.teslimTurList = data
  },
  odeme_tur_load_mut(state, data) {
    state.odemeTurList = data
  },
  fatura_tur_load_mut(state, data) {
    state.faturaKesimTurList = data
  },
  ulke_tur_load_mut(state, data) {
    state.ulkeList2 = data
  },
  tedarikci_list_yukle_mut(state, data) {
    state.tedarikciList = data;
  },
  siparisler_list_yukle_mut(state, data) {
    state.siparisler = data;
  },
  is_new_form_click_mut(state, data) {
    state.isNewClicked = data;
  },
  is_new_form_click_reset_mut(state, data) {
    state.isNewClicked = data
  },
  siparis_evrak_list_mut(state, data) {
    state.yuklemeList = data
  },
  profData_load_mut(state, data) {
    state.profData = data
  },
  siparis_satisci_info_mut(state, data) {
    state.siparisSatisciInfo = data.infoList;
    state.opOzetList = data.opOzet;
    state.ssOzetList = data.ssOzet;
    state.kullaniciList = data.kullaniciList;
    state.satisciInfoSum = data.infoList.length;
    state.opSum = 0;
    state.ssSum = 0;

    for (const item of data.opOzet) {
      state.opSum += item.adet;
    }
    for (const item of data.ssOzet) {
      state.ssSum += item.adet;
    }
  }
};

const getters = {
  tedarikciList(state) {
    return state.tedarikciList;
  },
  siparisler(state) {
    return state.siparisler;
  },
  isNewClicked(state) {
    return state.isNewClicked;
  },
  yuklemeList(state) {
    return state.yuklemeList
  },
  profData(state) {
    return state.profData
  },
  teslimTurList(state) {
    return state.teslimTurList
  }
  ,
  odemeTurList(state) {
    return state.odemeTurList
  }
  ,
  faturaKesimTurList(state) {
    return state.faturaKesimTurList
  }
  ,
  ulkeList2(state) {
    return state.ulkeList2
  },
  siparisSatisciInfo(state) {
    return state.siparisSatisciInfo
  },
  opOzetList(state) {
    return state.opOzetList;
  },
  ssOzetList(state) {
    return state.ssOzetList;
  },
  kullaniciList(state) {
    return state.kullaniciList;
  },
  satisciInfoSum(state) {
    return state.satisciInfoSum;
  },
  ssSum(state) {
    return state.ssSum;
  },
  opSum(state) {
    return state.opSum;
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
};

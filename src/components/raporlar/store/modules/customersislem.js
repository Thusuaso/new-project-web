const state = {
  musteri: null,
  musteri_list: null,
};

const actions = {
  satisciKayitLoadAct({ commit }, data) {
    commit("satisciKayitLoadMut", data);
  },
  satisciKayitSecimAct({ commit }, data) {
    commit("satisciKayitSecimMut", data);
  },
};

const mutations = {
  satisciKayitLoadMut(state, data) {
    state.musteri = data;
    state.musteri_list = data.musteri_list;
  },
  satisciKayitSecimMut(state, data) {
    state.musteri = data;
  },
};

const getters = {
  musteri(state) {
    return state.musteri;
  },
  musteri_list(state) {
    return state.musteri_list;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

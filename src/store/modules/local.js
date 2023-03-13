const state = {
  urunbaslik: "",
  servis_adres: "",
};

const actions = {
  setUrunBaslik({ commit }, data) {
    commit("urunBaslikMut", data);
  },
  setServisAdresAct({ commit }) {
    let url = "https://doktor-servis.mekmar.com/";
   //let url = "http://localhost:5000/";

    commit("setServisAdresMut", url);
  },
};

const mutations = {
  urunBaslikMut(state, data) {
    state.urunbaslik = data;
  },
  setServisAdresMut(state, url) {
    state.servis_adres = url;
  },
};

const getters = {
  getUrunBaslik(state) {
    return state.urunbaslik;
  },
  servis_adres(state) {
    return state.servis_adres;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

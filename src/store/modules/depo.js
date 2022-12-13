const state = {
  depoUrunListesi: null,
  depoUrun: null,
  depoPickFotoList: null,
};
const actions = {
  depoUrunListesiYukle({ commit }, data) {
    commit("depoUrunListesiMut", data);
  },
  depoUrunFormYukle({ commit }, data) {
    commit("depoUrunFormMut", data);
  },
};
const mutations = {
  depoUrunListesiMut(state, data) {
    state.depoUrunListesi = data;
  },
  depoUrunFormMut(state, data) {
    state.depoUrunForm = data;

    // state.depoPickFotoList = [data.fotolar.slice(0,10),[]]
  },
};
const getters = {
  getDepoUrunListesi(state) {
    return state.depoUrunListesi;
  },
  getDepoUrunForm(state) {
    return state.depoUrunForm;
  },
  depoPickFotoList(state) {
    return state.depoPickFotoList;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

const state = {
  mekmerDisModel: [],
  mekmerDisFaturaList: [],
};

const actions = {
  mekmer_dis_model_act({ commit }, data) {
    commit("mekmer_dis_model_mut", data);
  },
  mekmer_dis_fatura_list_act({ commit }, data) {
    commit("mekmer_dis_fatura_list_mut", data);
  },
};

const mutations = {
  mekmer_dis_model_mut(state, data) {
    state.mekmerDisModel = data;
  },
  mekmer_dis_fatura_list_mut(state, data) {
    state.mekmerDisFaturaList = data;
  },
};

const getters = {
  mekmerDisModel(state) {
    return state.mekmerDisModel;
  },
  mekmerDisFaturaList(state) {
    return state.mekmerDisFaturaList;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

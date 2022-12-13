const state = {
  ceyreklikSatislarList: null,
  chartData: null,
  statisticsData: null,
};

const actions = {
  ceyreklik_satislar_load({ commit }, data) {
    commit("ceyreklik_satislar_mut", data);
  },
  chart_data_load({ commit }, data) {
    commit("chart_data_mut", data);
  },
  statistics_data_load({ commit }, data) {
    commit("statistics_data_mut", data);
  },
};

const mutations = {
  ceyreklik_satislar_mut(state, data) {
    state.ceyreklikSatislarList = data;
  },
  chart_data_mut(state, data) {
    state.chartData = data;
  },
  statistics_data_mut(state, data) {
    state.statisticsData = data;
  },
};

const getters = {
  ceyreklikSatislarList(state) {
    return state.ceyreklikSatislarList;
  },
  chartData(state) {
    return state.chartData;
  },
  statisticsData(state) {
    return state.statisticsData;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

const state = {
  ceyreklikYuklemelerList: null,
  ceyreklikSiparislerList: null,

  chartData: null,
  chartDataSip:null,
  statisticsData: null,
  statisticsDataSip:null
};

const actions = {
  ceyreklik_yuklemeler_load({ commit }, data) {
    commit("ceyreklik_yuklemeler_mut", data);
  },
  ceyreklik_siparisler_load({ commit }, data) {
    commit("ceyreklik_siparisler_mut", data);
  },
  chart_data_load({ commit }, data) {
    commit("chart_data_mut", data);
  },
  chart_data_sip_load({ commit }, data) {
    commit("chart_data_sip_mut", data);
  },
  statistics_data_load({ commit }, data) {
    commit("statistics_data_mut", data);
  },
  statistics_data_sip_load({ commit }, data) {
    commit("statistics_data_sip_mut", data);
  },
};

const mutations = {
  ceyreklik_yuklemeler_mut(state, data) {
    state.ceyreklikYuklemelerList = data;
  },
  ceyreklik_siparisler_mut(state, data) {
    state.ceyreklikSiparislerList = data;
  },
  chart_data_mut(state, data) {
    state.chartData = data;
  },
  chart_data_sip_mut(state, data) {
    state.chartDataSip = data;
  },
  statistics_data_mut(state, data) {
    state.statisticsData = data;
  },
  statistics_data_sip_mut(state, data) {
    state.statisticsDataSip = data;
  },
};

const getters = {
  ceyreklikYuklemelerList(state) {
    return state.ceyreklikYuklemelerList;
  },
  ceyreklikSiparislerList(state) {
    return state.ceyreklikSiparislerList
  },
  chartData(state) {
    return state.chartData;
  },
  chartDataSip(state) {
    return state.chartDataSip
  },
  statisticsData(state) {
    return state.statisticsData;
  },
  statisticsDataSip(state) {
    return state.statisticsDataSip
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
};

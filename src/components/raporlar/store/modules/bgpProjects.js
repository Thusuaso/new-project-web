const state = {
  bgpProjectList: null,
  bgpProjectAyrinti: null,
  projectName: null,
  bgpProjectAyrintiForm: null,
  bgpUlkeler: null,
  username_kontrol: true,
  bgpHatirlatmaList: null,
  bgpProjectCompanyList: null,
  ulkeAdi: null,
  bgpProjectStatistics: null,
  bgpProjectStatisticsDetail: null,
  bgpProjectStatisticsDetailSum: {
    wrongNumber: 0,
    notResponse: 0,
    notInterested: 0,
    interested: 0,
  },
  bgpProjectStatisticChart: null,
  bgpProjectCompanyDetailList: null,
  bgpProjectStatisticCountryandReseptation: [],
  bgpProjectStatisticCountryandReseptationSum: 0,
  filelink: "",
  fileCloud: false,
};

const actions = {
  bgp_projects_list_load({ commit }, data) {
    commit("bgp_projets_list_mut", data);
  },
  bgp_projects_list_ayrinti_load({ commit }, data) {
    commit("bgp_projets_list_ayrinti_mut", data);
  },
  bgp_project_name_load({ commit }, data) {
    commit("bgp_project_name_mut", data);
  },
  bgp_project_ulke_load({ commit }, data) {
    commit("bgp_project_ulke_mut", data);
  },
  bgp_project_ayrinti_form_load({ commit }, data) {
    commit("bgp_project_ayrinti_form_mut", data);
  },
  bgp_projects_ulkeler_list_load({ commit }, data) {
    commit("bgp_projects_ulkeler_list_mut", data);
  },
  bgp_projects_username_kontrol_load({ commit }, data) {
    commit("bgp_projects_username_kontrol_mut", data);
  },
  bgp_projects_hatirlatma_list_load({ commit }, data) {
    commit("bgp_projects_hatirlatma_list_mut", data);
  },
  bgp_projects_company_list_load({ commit }, data) {
    commit("bgp_projects_company_list_load", data);
  },
  bgp_projects_statistics_load({ commit }, data) {
    commit("bgp_projects_statistics_mut", data);
  },
  bgp_projects_statistics_detail_load({ commit }, data) {
    commit("bgp_projects_statistics_detail_mut", data);
  },
  bgp_projects_statistics_chart_load({ commit }, data) {
    commit("bgp_projects_statistics_chart_mut", data);
  },
  bgp_projects_company_detail_list({ commit }, data) {
    commit("bgp_projects_company_detail_list_mut", data);
  },
  bgp_projects_statistics_country_reseptation_load({ commit }, data) {
    commit("bgp_projects_statistics_country_reseptation_mut", data);
  },
  bgp_project_id_load({ commit }, data) {
    commit("bgp_project_id_mut", data);
  },
  bgp_projects_filelink_load({ commit }, data) {
    commit("bgp_projets_filelink_mut", data);
  },
  bgp_projects_fileCloud_load({ commit }, data) {
    commit("bgp_projets_fileCloud_mut", data);
  },
};

const mutations = {
  bgp_projets_filelink_mut(state, data) {
    state.filelink = data;
  },
  bgp_projets_fileCloud_mut(state, data) {
    state.fileCloud = data;
  },
  bgp_project_id_mut(state, data) {
    state.projectId = data;
  },
  bgp_projets_list_mut(state, data) {
    state.bgpProjectList = data;
  },
  bgp_projets_list_ayrinti_mut(state, data) {
    state.bgpProjectAyrinti = data;
  },
  bgp_project_name_mut(state, data) {
    state.projectName = data;
  },
  bgp_project_ulke_mut(state, data) {
    state.ulkeAdi = data;
  },
  bgp_project_ayrinti_form_mut(state, data) {
    state.bgpProjectAyrintiForm = data;
  },
  bgp_projects_ulkeler_list_mut(state, data) {
    state.bgpUlkeler = data;
  },
  bgp_projects_username_kontrol_mut(state, data) {
    state.username_kontrol = data;
  },
  bgp_projects_hatirlatma_list_mut(state, data) {
    state.bgpHatirlatmaList = data;
  },
  bgp_projects_company_list_load(state, data) {
    state.bgpProjectCompanyList = data;
  },
  bgp_projects_statistics_mut(state, data) {
    state.bgpProjectStatistics = data;
    state.bgpProjectStatisticsDetailSum.wrongNumber = 0;
    state.bgpProjectStatisticsDetailSum.notResponse = 0;
    state.bgpProjectStatisticsDetailSum.notInterested = 0;
    state.bgpProjectStatisticsDetailSum.interested = 0;
    for (let item in data) {
      state.bgpProjectStatisticsDetailSum.wrongNumber += data[item].wrongNumber;
      state.bgpProjectStatisticsDetailSum.notResponse += data[item].notResponse;
      state.bgpProjectStatisticsDetailSum.notInterested +=
        data[item].notInterested;
      state.bgpProjectStatisticsDetailSum.interested += data[item].interested;
    }
  },
  bgp_projects_statistics_detail_mut(state, data) {
    state.bgpProjectStatisticsDetail = data;
  },
  bgp_projects_statistics_chart_mut(state, data) {
    state.bgpProjectStatisticChart = data;
  },
  bgp_projects_company_detail_list_mut(state, data) {
    state.bgpProjectCompanyDetailList = data;
  },
  bgp_projects_statistics_country_reseptation_mut(state, data) {
    state.bgpProjectStatisticCountryandReseptation = data;
    state.bgpProjectStatisticCountryandReseptationSum = 0;

    for (let i in data) {
      state.bgpProjectStatisticCountryandReseptationSum += data[i].projectSum;
    }
  },
};
const getters = {
  bgpProjectList(state) {
    return state.bgpProjectList;
  },
  bgpProjectAyrinti(state) {
    return state.bgpProjectAyrinti;
  },
  projectName(state) {
    return state.projectName;
  },
  bgpProjectAyrintiForm(state) {
    return state.bgpProjectAyrintiForm;
  },
  bgpUlkeler(state) {
    return state.bgpUlkeler;
  },
  username_kontrol(state) {
    return state.username_kontrol;
  },
  bgpHatirlatmaList(state) {
    return state.bgpHatirlatmaList;
  },
  bgpProjectCompanyList(state) {
    return state.bgpProjectCompanyList;
  },
  ulkeAdi(state) {
    return state.ulkeAdi;
  },
  bgpProjectStatistics(state) {
    return state.bgpProjectStatistics;
  },
  bgpProjectStatisticsDetail(state) {
    return state.bgpProjectStatisticsDetail;
  },
  bgpProjectStatisticChart(state) {
    return state.bgpProjectStatisticChart;
  },
  bgpProjectCompanyDetailList(state) {
    return state.bgpProjectCompanyDetailList;
  },
  bgpProjectStatisticsDetailSum(state) {
    return state.bgpProjectStatisticsDetailSum;
  },
  bgpProjectStatisticCountryandReseptation(state) {
    return state.bgpProjectStatisticCountryandReseptation;
  },
  bgpProjectStatisticCountryandReseptationSum(state) {
    return state.bgpProjectStatisticCountryandReseptationSum;
  },
  filelink(state) {
    return state.filelink;
  },
  fileCloud(state) {
    return state.fileCloud;
  },
  projectId(state) {
    return state.projectId;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

import axios from "@/helpers/custom_axios";
const BgpProjectService = {
  setBgpProjectName(projectName, temsilci, bgpUlkeAdi, ulkeLogo) {
    return axios
      .get(
        "/bgpProject/SaveBgpProject/" +
          projectName +
          "/" +
          temsilci +
          "/" +
          bgpUlkeAdi +
          "/" +
          ulkeLogo
      )
      .then((res) => res.data);
  },
  setBgpProjectNameChange(
    projectName,
    temsilci,
    bgpUlkeAdi,
    ulkeLogo,
    projectId
  ) {
    return axios
      .get(
        "/bgpProject/SaveBgpProjectChange/" +
          projectName +
          "/" +
          temsilci +
          "/" +
          bgpUlkeAdi +
          "/" +
          ulkeLogo +
          "/" +
          projectId
      )
      .then((res) => res.data);
  },
  getBgpProjectList(temsilci) {
    return axios
      .get("/bgpProject/getBgpProjectList/" + temsilci)
      .then((res) => res.data);
  },
  getBgpProjectDetail(projectName) {
    return axios
      .get("/bgpProject/getBgpProjectDetail/" + projectName)
      .then((res) => res.data);
  },
  setBgpProjectDetailSave(datas) {
    return axios
      .post("/bgpProject/setBgpProjectDetailSave", datas)
      .then((res) => res.data);
  },
  getBgpProjectDetailForm(id) {
    return axios
      .get("/bgpProject/getBgpProjectDetailForm/" + id)
      .then((res) => res.data);
  },
  setBgpProjectDetailChange(datas) {
    return axios
      .post("/bgpProject/setBpgProjectDetailChange", datas)
      .then((res) => res.data);
  },
  setBgpProjectDetailDelete(id, projectName) {
    return axios
      .get("/bgpProject/setBgpProjectDetailDelete/" + id + "/" + projectName)
      .then((res) => res.data);
  },
  setBgpProjecDelete(temsilci, projectName) {
    return axios
      .get("/bgpProject/setBgpProjecDelete/" + temsilci + "/" + projectName)
      .then((res) => res.data);
  },
  getBgpProjectCompanyList() {
    return axios
      .get("/bgpProject/getBgpProjectCompanyList")
      .then((res) => res.data);
  },
  getBgpProjectCountryList() {
    return axios
      .get("/bgpProject/getBgpProjectCountryList")
      .then((res) => res.data);
  },
  getBgpProjectCountryandReseptation() {
    return axios
      .get("/bgpProject/getBgpProjectCountryandReseptation")
      .then((res) => res.data);
  },
  getBgpProjectCountryStatistic(username) {
    return axios
      .get("/bgpProject/getBgpProjectStatistics/" + username)
      .then((res) => res.data);
  },
  getBgpProjectCountryStatisticDetail(ulkeAdi) {
    return axios
      .get("/bgpProject/getBgpProjectStatisticsDetail/" + ulkeAdi)
      .then((res) => res.data);
  },
  getBgpProjectCompanyDetailList() {
    return axios
      .get("/bgpProject/getBgpProjectCompanyDetailList")
      .then((res) => res.data);
  },
  getBgpServiceSelectedCompany(firmaAdi) {
    return axios
      .get("/bgpProject/getBgpServiceSelectedCompany/" + firmaAdi)
      .then((res) => res.data);
  },
  setBgpProjectFileData(data) {
    return axios
      .post("/bgpProject/setBgpProjectFile", data)
      .then((res) => res.data);
  },
};

export default BgpProjectService;

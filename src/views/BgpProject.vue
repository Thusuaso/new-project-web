<template>
  <div>
    <div class="generalStatus">
      <div class="limitationStatus">
        <div class="columns">
          <div class="column is-8">
            <div class="columns">
              <div class="column">
                <Button class="p-button-success" style="width: 150px" :disabled="username_kontrol"
                  @click="newProject">New Project</Button>
              </div>
              <div class="column">
                <div class="column">
                  <Dropdown v-model="selectedTemsilci" :options="temsilciler" style="z-index:98;" optionLabel="temsilci"
                    placeholder="Select a Temsilci" @change="is_change_temsilci" />

                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <Button class="p-button-info" style="width: 150px" @click="showCompany">Show Company
                </Button>
              </div>
              <div class="column">
                <div class="column">
                  <Dropdown v-model="selectedCountry" :options="countries" optionLabel="country"
                    placeholder="Select a Country" @change="is_change_country" style="z-index:97;" />
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <Button class="p-button-warning" style="width: 150px" @click="statistics">Statistics
                </Button>
              </div>
              <div class="column" v-if="countryName != null ? true:false">
                <Button type="button" :label="countryName" :badge="countryCount"
                  :badgeClass="`p-badge-${badge(selectedTemsilci.id)}`" />
              </div>
            </div>
          </div>
          <div class="column is-4">
            <Chart type="bar" :data="bgpProjectStatisticChart" />
          </div>
        </div>
      </div>
    </div>

    <hr />
    <Dialog v-model:visible="new_project_form" :modal="true" header="Yeni Bgp Projesi" maximizable>
      <bgpNetworkForm :username="username"></bgpNetworkForm>
    </Dialog>
    <Dialog v-model:visible="change_project_form" :modal="true" header=" Bgp Projesi" maximizable>
      <bgpNetworkFormChange :username="username" :bpgProjeAdi="projectName" :ulkeAdi="ulkeAdi" :projectId="projectId">
      </bgpNetworkFormChange>
    </Dialog>
    <Dialog v-model:visible="bgp_project_ayrinti_form" :modal="true" :header="p_name" maximizable>
      <bgpNetworkDetail></bgpNetworkDetail>
    </Dialog>
    <Dialog v-model:visible="show_company_form" header="Tüm Şirketler" :modal="true" maximizable>
      <BgpNetworkCompany> </BgpNetworkCompany>
    </Dialog>
    <Dialog v-model:visible="show_statistic_form" header="Statistics" :modal="true" maximizable>
      <BgpNetworkStatistics></BgpNetworkStatistics>
    </Dialog>
    <ul class="cards">
      <li v-for="item in bgpProjectList" :key="item.id">
        <a class="card" :style="{ borderColor: item.borderColor }">
          <div class="card__overlay">
            <div class="card__header">
              <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                <path />
              </svg>
              <Image class="card__thumb" :src="'https://cdn.mekmarimage.com/countryLogo/' + item.ulkeLogo"
                alt="Image Text" />
              <h3>{{item.ulkeAdi}}</h3>
              <div class="card__header-text">
                <h3 class="card__title">{{ item.projectName }}</h3>
                <span class="card__status">{{ item.dateOfRegistiration }}</span>
                <span class="card__status">
                  {{ item.temsilci == 19 ? " Özlem" : " Hakan" }}</span>
              </div>
            </div>
            <p class="card__description">
            <div class="columns">
              <div class="column">
                <Button class="card_buttons"
                  @click="bgpProjectsDetail(item.projectName,item.ulkeAdi,item.id,item.filelink,item.fileCloud)" label="Detay Aç">Detay
                  Aç</Button>
              </div>
              <div class="column">
                <Button class="card_buttons" icon="pi pi-pencil" @click="
                changeProjectsInformation(
                    item.projectName,
                    item.ulkeAdi,
                    item.id
                )
                " />
              </div>

            </div>


            </p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import bgpNetworkForm from "../components/bgpproject/bgpNetworkForm.vue";
import bgpNetworkFormChange from "../components/bgpproject/bgpNetworkFormChange.vue";
import bgpNetworkDetail from "../components/bgpproject/bgpNetworkDetail.vue";
import bgpService from "../service/BgpProjectService";
import { mapGetters } from "vuex";
import BgpNetworkCompany from "../components/bgpproject/bgpNetworkCompany.vue";
import BgpNetworkStatistics from "../components/bgpproject/bgpNetworkStatistics.vue";
export default {
  components: {
    bgpNetworkForm,
    bgpNetworkDetail,
    BgpNetworkCompany,
    BgpNetworkStatistics,
    bgpNetworkFormChange,
  },
  computed: {
    ...mapGetters([
      "bgpProjectList",
      "username_kontrol",
      "bgpProjectStatisticChart",
      'bgpProjectStatisticCountryandReseptation'
    ]),

  },
  data() {
    return {
      isFullPage: true,
      isLoading: false,
      countryData: null,
      countryCount: 0,
      countryName: null,
      countryAndReseptation: null,
      selectedCountry: { country: "Hepsi" },
      countries: [{ country: "Hepsi" }],
      projectId: 0,
      projectName: "",
      ulkeName: "",
      change_project_form: false,
      show_statistic_form: false,
      events: [
        { id: 0, event: "Hepsi" },
        { id: 1, event: "Yanlış Numara" },
        { id: 2, event: "Cevap Vermiyor" },
        { id: 3, event: "İlgilenmiyor" },
        { id: 4, event: "Açtı, İlgili" },
      ],
      selectedEvent: "",
      show_company_form: false,
      new_project_form: false,
      username: null,
      is_save_projects: null,
      bgp_project_ayrinti_form: false,
      temsilciler: [
        { id: 0, temsilci: "Hepsi" },
        { id: 19, temsilci: "Ozlem" },
        { id: 44, temsilci: "Hakan" },
      ],
      selectedTemsilci: { id: 0, temsilci: "Hepsi" },
      searchUlke: null,
      p_name: "",
    };
  },
  created() {
    this.username = this.$store.getters.__getUserId;
    if (this.username == 19 || this.username == 44 || this.username == 47) {
      this.$store.dispatch("bgp_projects_username_kontrol_load", false);
    }
    this.$store.dispatch("fullscreenLoadingAct", true);

    bgpService.getBgpProjectList(this.username).then((data) => {
      this.$store.dispatch("bgp_projects_list_load", data.result);
      this.$store.dispatch("bgp_projects_ulkeler_list_load", data.ulkeler);
    });
    bgpService.getBgpProjectCountryStatistic(this.username).then((data) => {
      this.$store.dispatch("bgp_projects_statistics_load", data.result);
      this.$store.dispatch(
        "bgp_projects_statistics_chart_load",
        data.chartData
      );
      this.$store.dispatch("fullscreenLoadingAct", false);
    });

    bgpService.getBgpProjectCountryList().then((data) => {
      this.countries = [{ country: "Hepsi" }];
      for (let i in data) {
        this.countries.push({ country: data[i].ulkeAdi });
      }
    });
    bgpService.getBgpProjectCountryandReseptation().then((data) => {
      this.$store.dispatch(
        "bgp_projects_statistics_country_reseptation_load",
        data.result
      );
    });
  },
  methods: {
    badge(event) {
      if (event == 0) {
        return 'info'
      } else if (event == 19) {
        return 'warning'
      } else if (event == 44) {
        return 'success'
      }
    },
    is_change_country(event) {
      // this.countryAndReseptation = this.bgpProjectStatisticCountryandReseptation.filter(x => x.ulkeAdi == event.value.country)
      this.$store.dispatch("loadingBeginAct");
      if (this.selectedTemsilci.id == 0) {
        if (event.value.country == "Hepsi") {
          bgpService.getBgpProjectList(10).then((data) => {
            this.$store.dispatch("bgp_projects_list_load", data.result);
            this.countryName = null;
            this.countryCount = null;
            this.$store.dispatch("loadingEndAct");

          });
        } else {
          bgpService.getBgpProjectList(10).then((data) => {
            this.countryData = data.result;
          });
          setTimeout(() => {
            const result = this.countryData.filter(
              (x) => x.ulkeAdi == event.value.country
            );
            this.countryName = null;
            this.countryCount = null;
            this.countryName = event.value.country;
            this.countryCount = result.length;

            this.$store.dispatch("bgp_projects_list_load", result);
            this.$store.dispatch("loadingEndAct");

          }, 2000);
        }
      } else {
        if (event.value.country == "Hepsi") {
          bgpService
            .getBgpProjectList(this.selectedTemsilci.id)
            .then((data) => {
              this.$store.dispatch("bgp_projects_list_load", data.result);
              this.$store.dispatch("loadingEndAct");

            });
          this.countryName = null;
          this.countryCount = null;
        } else {
          const result = this.countryData.filter(
            (x) => x.ulkeAdi == event.value.country
          );
          this.countryName = null;
          this.countryCount = null;
          this.countryName = event.value.country;
          this.countryCount = result.length;

          this.$store.dispatch("bgp_projects_list_load", result);
          this.$store.dispatch("loadingEndAct");

        }
      }
    },
    changeProjectsInformation(projectName, ulkeAdi, id) {
      this.change_project_form = true;
      this.projectName = projectName;
      this.ulkeAdi = ulkeAdi;
      this.projectId = id;
    },
    statistics() {
      bgpService.getBgpProjectCountryStatistic(this.username).then((data) => {
        this.$store.dispatch("bgp_projects_statistics_load", data.result);
        this.$store.dispatch(
          "bgp_projects_statistics_chart_load",
          data.chartData
        );
        this.show_statistic_form = true;
      });
    },
    showCompany() {
      bgpService.getBgpProjectCompanyList().then((data) => {
        this.$store.dispatch("bgp_projects_company_list_load", data.result);
        this.show_company_form = true;
      });
    },
    is_change_temsilci(event) {
      if (event.value.id == 0) {
        bgpService.getBgpProjectList(10).then((data) => {
          this.$store.dispatch("bgp_projects_list_load", data.result);
          this.$store.dispatch("bgp_projects_ulkeler_list_load", data.ulkeler);
          this.countries = []
          for (let i of data.ulkeler) {
            this.countries.push({ country: i.ulkeAdi })
          }
          this.countryName = null;
          this.countryCount = null;
          this.selectedCountry = { country: "Hepsi" };
        });
        bgpService.getBgpProjectCountryStatistic(10).then((data) => {
          this.$store.dispatch(
            "bgp_projects_statistics_chart_load",
            data.chartData
          );
        });
      } else if (event.value.id == 19) {
        bgpService.getBgpProjectList(19).then((data) => {
          this.$store.dispatch("bgp_projects_list_load", data.result);
          this.$store.dispatch("bgp_projects_ulkeler_list_load", data.ulkeler);
          this.countries = []
          for (let i of data.ulkeler) {
            this.countries.push({ country: i.ulkeAdi })
          }
          this.countryData = data.result;
          this.countryName = null;
          this.countryCount = null;
          this.selectedCountry = { country: "Hepsi" };
        });
        bgpService.getBgpProjectCountryStatistic(19).then((data) => {
          this.$store.dispatch(
            "bgp_projects_statistics_chart_load",
            data.chartData
          );
        });
      } else if (event.value.id == 44) {
        bgpService.getBgpProjectList(44).then((data) => {
          this.$store.dispatch("bgp_projects_list_load", data.result);
          this.$store.dispatch("bgp_projects_ulkeler_list_load", data.ulkeler);
          this.countries = []
          for (let i of data.ulkeler) {
            this.countries.push({ country: i.ulkeAdi })
          }
          this.countryData = data.result;
          this.countryName = null;
          this.countryCount = null;
          this.selectedCountry = { country: "Hepsi" };
        });
        bgpService.getBgpProjectCountryStatistic(44).then((data) => {
          this.$store.dispatch(
            "bgp_projects_statistics_chart_load",
            data.chartData
          );
        });
      }
    },
    bgpProjectsDetail(projectName, ulkeAdi, id, filelink, fileCloud) {
      this.p_name = projectName + ' - ' + ulkeAdi
      this.$store.dispatch('bgp_project_name_load', projectName)
      this.$store.dispatch('bgp_project_id_load', id)
      this.$store.dispatch('bgp_projects_filelink_load', filelink);
      this.$store.dispatch('bgp_projects_fileCloud_load', fileCloud);


      this.$store.dispatch('bgp_project_ulke_load', ulkeAdi)
      this.$store.dispatch("fullscreenLoadingAct", true);
      bgpService.getBgpProjectDetail(projectName).then(data => {
        this.$store.dispatch('bgp_projects_list_ayrinti_load', data)
        this.bgp_project_ayrinti_form = true
        this.$store.dispatch("fullscreenLoadingAct", false);
      })

    },
    newProject() {
      this.new_project_form = true;
    },
    deleteProject() { },
    isSearchChangeUlke(event) {
      setTimeout(() => {
        let result;
        const value = event.target.value;
        if (value.length == "") {
          this.username = this.$store.getters.__getUserId;
          if (this.username == 19 || this.username == 44) {
            this.$store.dispatch("bgp_projects_username_kontrol_load", false);
          }
          bgpService.getBgpProjectList(this.username).then((data) => {
            this.$store.dispatch("bgp_projects_list_load", data.result);
            this.$store.dispatch(
              "bgp_projects_ulkeler_list_load",
              data.ulkeler
            );
          });
        } else {
          result = this.bgpProjectList.filter((x) => {
            return x.ulkeAdi.toLowerCase().startsWith(value.toLowerCase());
          });
        }
        this.$store.dispatch("bgp_projects_list_load", result);
      }, 1);
    },
  },
  mounted() {
    this.emitter.on("isProjectSave", (data) => {
      this.new_project_form = data;
    });
    this.emitter.on("project_delete_form", (data) => {
      this.bgp_project_ayrinti_form = data;
    });
  },
};
</script>
<style scoped>
.generalStatus {
  width: 100%;
  height: auto;
  margin: 0px;
  padding: 0px;
  border: none;
}

.limitationStatus {
  width: calc(100% - 70px);
  height: auto;
  margin: 0px;
  margin-left: 75px;
  padding: 0px;
}

@media screen and (max-width: 576px) {
  .limitationStatus {
    margin-left: 0px;
  }
}

.bgpProjectsGeneral {
  display: block;
  width: 100%;
  height: auto;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
  border: none;
  background: none;
  text-align: center;
  vertical-align: top;
  text-decoration: none;
}

.bgpProjectsSinirlandirilmisAlan {
  display: block;
  width: calc(100% - 100px);
  height: auto;
  margin: 0px;
  margin-left: 48px;
  padding: 0px;
  overflow: hidden;
  border: none;
  background-color: none;
  color: black;
  text-align: center;
  vertical-align: top;
  text-decoration: none;
}

.bgpProjectsElements {
  display: inline-block;
  float: left;
  width: 24%;
  height: 100px;
  margin-left: 1%;
  margin-bottom: 1%;
  padding: 10px;
  padding-left: 35px;
  border: 1px solid gray;
  border-radius: 40px 40px 0 40px;
  background-color: #daeff5;
  color: black;
  text-align: center;
  vertical-align: top;
  text-decoration: none;
}

@media screen and (max-width: 576px) {
  .bgpProjectsElements {
    display: block;
    width: 98%;
    height: 100px;
    margin-bottom: 1%;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 15px;
    background-color: #daeff5;
    color: black;
    text-align: center;
    vertical-align: top;
    text-decoration: none;
  }
}

.bgpProjectsElementsRegistiration {
  display: block;
  width: 100%;
  height: auto;
  margin: 0px;
  padding: 0px;
  border: none;
  background-color: none;
  text-align: left;
  vertical-align: top;
  text-decoration: none;
}

.bgpProjectsElementsProjectName {
  display: block;
  width: 100%;
  height: auto;
  margin: 0px;
  padding: 0px;
  border: none;
  background-color: none;
  text-align: left;
  vertical-align: top;
  text-decoration: none;
}

.bgpProjectsElementsButton {
  display: block;
  width: 100%;
  height: auto;
  margin: 0px;
  padding: 0px;
  border: none;
  background-color: none;
  text-align: left;
  vertical-align: top;
  text-decoration: none;
}

/****************************** */
.card_buttons {
  width: 150px;
  height: auto;
  border-radius: 5px;
  border: none;
  border: 2px solid #aedaed;
  background-color: gray;
  color: #fff;
}

.card_buttons:hover {
  animation: changeColors 0.5s linear infinite;
}

@keyframes changeColors {
  to {
    background-color: gray;
  }

  from {
    background-color: #aedaed;
  }
}

:root {
  --surface-color: #fff;
  --curve: 40;
}

* {
  box-sizing: border-box;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 5vw;
  padding: 0;
  list-style-type: none;
  height: 150px;
}

.card {
  position: relative;
  display: block;
  width: 450px;
  height: 150px;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  overflow: hidden;
  text-decoration: none;
}

.card__image {
  width: 100%;
  height: auto;
}

.card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-radius: 40px;
  background-color: #fff;
  transform: translateY(100%);
  transition: 0.2s ease-in-out;
}

.card:hover .card__overlay {
  transform: translateY(0);
}

.card:hover .card__header {
  margin-bottom: -20px;
}

.card:hover .card__description {
  margin-bottom: -20px;
}

.card__header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 2em;
  border-radius: 40px 0 0 0;
  background-color: #fff;
  transform: translateY(-100%);
  transition: 0.2s ease-in-out;
}

.card__arc {
  width: 80px;
  height: 80px;
  position: absolute;
  bottom: 100%;
  right: 0;
  z-index: 1;
}

.card__arc path {
  fill: #fff;
  d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
}

.card:hover .card__header {
  transform: translateY(0);
}

.card__thumb {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.card__title {
  font-size: 12px;
  margin: 0 0 0.3em;
  color: #6a515e;
}

.card__tagline {
  display: block;
  margin: 1em 0;
  font-family: "MockFlowFont";
  font-size: 0.8em;
  color: #d7bdca;
}

.card__status {
  font-size: 0.8em;
  color: #d7bdca;
}

.card__description {
  padding: 0 2em 2em;
  margin: 0;
  color: #d7bdca;
  font-family: "MockFlowFont";
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>

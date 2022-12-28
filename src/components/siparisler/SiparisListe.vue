<template>
  <div>
    <div class="columns">
      <div class="column">
        <Card class="box-content">
          <template #header>
            <Button
              class="p-button-success newButton"
              @click="yeniSiparisAc"
              outlined
              >Yeni</Button
            >
          </template>
        </Card>
      </div>
      <div class="column">
        <Card class="box-content" style="margin-top: 12px">
          <template #header>
            <div
              class="columns"
              style="padding-top: 10px; padding-left: 8px; padding-right: 8px"
            >
              <div class="column">
                <Dropdown
                  v-model="select_yil"
                  @change="yil_degisim_event"
                  :options="yil_listesi"
                  optionLabel="yil"
                  placeholder="Year"
                />
              </div>
              <div class="column">
                <div class="columns">
                  <div class="column">
                    <Button
                      @click="excel_cikti_click"
                      class="p-button-help p-button-sm"
                      label="TR"
                      icon="far fa-file-excel"
                    />
                  </div>
                  <div class="column">
                    <Button
                      @click="excel_cikti_click_en"
                      class="p-button-help p-button-sm"
                      label="EN"
                      icon="far fa-file-excel"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="column">
        <Card class="box-content">
          <template #header>
            <ul class="radioButton">
              <li>
                <b>Tedarikçi: </b>
              </li>
              <li>
                <RadioButton
                  v-model="FirmaAdi"
                  name="name"
                  @change="statuSecim2"
                  value="Mekmer"
                />Mekmer
              </li>
              <li>
                <RadioButton
                  v-model="FirmaAdi"
                  name="name"
                  @change="statuSecim2"
                  value="Dis"
                />Dış
              </li>
              <li>
                <RadioButton
                  v-model="FirmaAdi"
                  name="name"
                  @change="statuSecim2"
                  value="Hepsi"
                />Hepsi
              </li>
            </ul>
            <ul class="radioButton">
              <li>
                <b>Satışçı: </b>
              </li>
              <li>
                <RadioButton
                  v-model="Fatura"
                  name="name"
                  @change="statuSecim3"
                  value="Hepsi"
                  style="padding-right: 13px"
                />Hepsi
              </li>
              <li>
                <RadioButton
                  v-model="Fatura"
                  name="name"
                  @change="statuSecim3"
                  value="Mekmar"
                  style="padding-right: 2px"
                />Mekmar
              </li>
              <li>
                <RadioButton
                  v-model="Fatura"
                  name="name"
                  @change="statuSecim3"
                  value="Efes"
                  style="padding-right: 2px"
                />Efes
              </li>
            </ul>
          </template>
        </Card>
      </div>
    </div>
    <div v-if="!alan_gizle">
      <SiparisListeKisitli
        :siparisler="siparisler"
        @siparisKisitliEmit="alan_gizle = $event"
        @kisitliSiparisSecim="siparisSecim($event)"
        :siparisTur="siparisTur"
        :hasPage="hasPage"
        :baslik="baslik"
        :arkaPlanRengi="backColor"
        :user="usrName"
        :tonTopla="tonToplami"
        :desktop="isDesktop"
      />
    </div>
    <!-- <div v-if="alan_gizle">
      <SiparisListeHepsi
        :siparisler="siparisler"
        @siparisHepsiEmit="alan_gizle = $event"
        @hepsiSiparisSecim="siparisSecim($event)"
        :siparisTur="siparisTur"
        :hasPage="hasPage"
        :baslik="baslik"
        :pr_satisToplami="satisToplami"
        :arkaPlanRengi="backColor"
        :desktop="isDesktop"
      />
    </div> -->

    <Dialog
      v-model:visible="dialogVisible"
      v-model:header="siparisFormBaslik"
      :modal="true"
      maximizable
      position="top"
      style="width: 100%;"
      :closable="false"
    >
      <siparis-giris-form
        :dtSiparisNo="dtSiparisNo"
        :yeniSiparis="yeniSiparis"
      />
    </Dialog>
  </div>
</template>
<script>
import siparisService from "../../service/SiparisService";
import { mapGetters } from "vuex";
import SiparisGirisForm from "./SiparisGirisForm";
import socket from '../../service/SocketService';
import BmSiparisGirisForm from "./BmSiparisGirisForm";
import service from "../../service/SeleksiyonService";
import serviceRapor from "../../service/RaporService";
import SiparisListeKisitli from "./siparisListeler/SiparisListeKisitli";
import SiparisListeHepsi from "./siparisListeler/SiparisListeHepsi";
export default {
  props: {
    siparisTur: {
      type: String,
      required: false,
      default: "üretim",
    },
    hasPage: {
      type: Boolean,
      default: false,
    },
    baslik: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isDesktop: true,
      menuToggleExcell: false,
      menuToggle: false,
      yil_listesi: [{ yil: "Hepsi", id: 0 }],
      select_yil: null,
      yil_baslik: "",
      groups: ["sira", "tarih", "siparisNo", "musteriAdi"],
      siparis_list_hepsi: true,
      selectedSiparis: null,
      filters: {},
      siparisler: null,
      SiparislerHepsi: null,
      SiparislerEvent: null,
      dtSiparisler: null,
      loading: false,
      backColor: "",
      selectSiparis: true,
      dialogVisible: false,
      dtSiparisNo: "",
      siparisFormBaslik: "",
      yeniSiparis: true,
      marketing: "Hepsi",
      Fatura: "Hepsi",
      excel_cikti: "Mekmer",
      FirmaAdi: "Hepsi",
      g_is_login: false,
      o_is_login: false,
      h_is_login: false,
      tonToplami: 0,
      columnsShow: {
        sira: true,
        urunAdi: true,
      },
      columns: [
        {
          name: "Sıra",
          value: "Sıra",
        },
        {
          name: "Ürün Adı",
          value: "Ürün Adı",
        },
      ],
      selectedColumns: null,
      isYeniSiparisForm: false,
      alan_gizle: false,
      usrName: "",
      sipBolmeForm: false,
    };
  },
  computed: {
    ...mapGetters(["servis_adres", "getMobilWidth"]),
  },
  created() {
    if (this.getMobilWidth < 600) {
      this.isDesktop = false;
    }
    var userName = this.$store.getters.__getUsername;
    this.usrName = userName;

    if (userName == "ozlem") {
      this.backColor = "#FFC382";
    } else if (userName == "gizem") {
      this.backColor = "#EF9A9A";
    } else if (userName == "hakan") {
      this.backColor = "green";
    }
    this.selectedColumns = this.columns;
    serviceRapor.getYuklemeYilListesi().then((yil_list) => {
      for (let item of yil_list) {
        this.yil_listesi.push(item);

      }

      this.yil_baslik = this.select_yil.yil;
    });
    this.loading = true;
    // let siparisDurum = 2;
    this.select_yil = { yil: "Hepsi", id: 0 };

    // if (this.siparisTur == "bekleyen") siparisDurum = 1;
    // if (this.siparisTur == "sevk") siparisDurum = 3;
    // this.$store.dispatch("datatableLoadingBeginAct");
    // this.select_yil.yil = 2022;
    // this.siparisService
    //   .getSiparisList(siparisDurum, this.select_yil.yil)
    //   .then((data) => {
    //     this.siparisler = data;

    //     this.toplamGuncelle(this.siparisler);
    //     this.dtSiparisler = data;
    //     this.loading = false;
    //     this.toplamGuncelle(data);
    //     setTimeout(() => {
    //       this.$store.dispatch("datatableLoadingEndAct");

    //     }, 7000);
    //   });


  },

  mounted() {
    this.loading = true;
    let siparisDurum = 2;
    const d = new Date();
    const year = d.getFullYear();

    socket.siparis.on("siparisler_list_emit", () => {
      this.$store.dispatch('datatableLoadingBeginAct')

      if (this.siparisTur == "bekleyen") siparisDurum = 1;
      if (this.siparisTur == "sevk") siparisDurum = 3;
      siparisService.getSiparisList(siparisDurum, year).then((data) => {
        this.siparisler = data;
        this.siparisHepsiEvent();
        this.toplamGuncelle(this.siparisler);
        this.dtSiparisler = data;
        this.toplamGuncelle(data);
        this.$store.dispatch('datatableLoadingEndAct')

      });
    })
    if (this.siparisTur == "bekleyen") siparisDurum = 1;
    if (this.siparisTur == "sevk") siparisDurum = 3;
    siparisService.getSiparisList(siparisDurum, year).then((data) => {
      this.siparisler = data;
      this.siparisHepsiEvent();
      this.toplamGuncelle(this.siparisler);
      this.dtSiparisler = data;
      this.toplamGuncelle(data);
    });

    this.emitter.on("menu-Toggle", (data) => {
      if (data == false) {
        this.menuToggleExcell = true;
        this.menuToggle = true;
      } else if (data == true) {
        this.menuToggleExcell = false;
        this.menuToggle = false;
      }
    });

    this.emitter.on("kaydetmeden_cikma", (data) => {
      this.dialogVisible = data;
    });
  },
  methods: {
    siparisHepsiEvent() {
      let siparisDurum = 2;

      if (this.siparisTur == "bekleyen") siparisDurum = 1;
      if (this.siparisTur == "sevk") siparisDurum = 3;

      if (this.siparis_list_hepsi) {

        siparisService.getSiparisHepsiList(siparisDurum).then((data) => {
          this.siparisler = data;
          this.SiparislerEvent = data;
          setTimeout(() => {
            this.$store.dispatch("datatableLoadingEndAct");

          }, 2000);

        });
      } else {
        this.select_yil = this.yil_listesi.find(
          (x) => x.yil == this.select_yil.yil
        );
        this.yil_baslik = this.select_yil.yil;
        this.$store.dispatch("datatableLoadingEndAct");



      }
    },

    yukleme_listesi_yukle() {
      let siparisDurum = 2;

      if (this.siparisTur == "bekleyen") siparisDurum = 1;
      if (this.siparisTur == "sevk") siparisDurum = 3;
      this.$store.dispatch("datatableLoadingBeginAct");

      if (this.select_yil.id == 0) {

        this.siparisHepsiEvent();


      } else {

        siparisService
          .getSiparisList(siparisDurum, this.select_yil.yil)
          .then((data) => {
            this.siparisler = data;
            this.SiparislerHepsi = data;
            setTimeout(() => {
              this.$store.dispatch("datatableLoadingEndAct");

            }, 2000);
            if (this.FirmaAdi != "Hepsi") {
              this.statuSecim2();
            } else if (this.marketing != "Hepsi") {
              this.statuSecim();
            } else if (this.Fatura != "Hepsi") {
              this.statuSecim3();
            }

          });
      }
      
    },
    yil_degisim_event() {
      this.select_yil = this.yil_listesi.find(
        (x) => x.yil == this.select_yil.yil
      );
      this.yil_baslik = this.select_yil.yil;
      this.yukleme_listesi_yukle();
    },
    excel_cikti_click_en() {
      const data = this.siparisler;
      service.getUretimExcelListesi_En(data).then((data2) => {
        if (data2.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "siparisler/dosyalar/uretimExcelCiktiEn";
          link.setAttribute("download", "Üretim_Listesi.xlsx");
          document.body.appendChild(link);
          link.click();
          this.is_excel = false;
        }
      });
    },
    excel_cikti_click() {
      if (this.excel_cikti == "Mekmer") {
        const data = this.siparisler;

        service.getUretimExcelListesi(data).then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            link.href =
              this.servis_adres + "siparisler/dosyalar/uretimExcelCikti";

            link.setAttribute("download", "Üretim_Listesi.xlsx");
            document.body.appendChild(link);
            link.click();
            this.is_excel = false;
          }
        });
      }
    },
    toplamGuncelle(liste) {
      let kasaToplami = 0;
      let siparisToplami = 0;
      let uretimToplami = 0;
      let satisToplami = 0;
      let tonToplami = 0;
      for (let key in liste) {
        const data = liste[key];

        kasaToplami += data.kasa;
        siparisToplami += data.siparisMiktari;
        uretimToplami += data.uretimMiktari;
        satisToplami += data.satisToplam;
        tonToplami += data.ton;
      }

      const data = {
        kasaToplami: kasaToplami,
        siparisToplami: siparisToplami,
        uretimToplami: uretimToplami,
        satisToplami: satisToplami,
        tonToplami: tonToplami,
      };

      this.$store.dispatch("loadToplamGuncelleAct", data);
    },
    indexBul(id, liste) {
      let index = -1;
      if (!liste != null) {
        for (let i = 0; i < liste.length; i++) {
          if (liste[i].id === id) {
            index = i;
            break;
          }
        }
      }

      return index;
    },
    siparisFilterDegisim(event) {
      this.toplamGuncelle(event.filterValue);
    },
    kayitYenileme() {
      const result = this.dtSiparisler.sort((a, b) => {
        const tarih1 = a;
        const tarih2 = b;

        if (tarih1 < tarih2) return -1;
        if (tarih1 > tarih2) return 1;

        return 0;
      });
      this.siparisler = null;
      this.toplamGuncelle(result);
      this.siparisler = [...result];
    },
    statuSecim2() {
      //statü değişiminde
      if (this.siparis_list_hepsi == false) {
        if (this.FirmaAdi) {
          let result;

          if (this.FirmaAdi == "Hepsi") {
            result = this.SiparislerHepsi;
          }

          if (this.FirmaAdi != "Hepsi") {
            result = [
              ...this.SiparislerHepsi.filter(
                (x) => x.tedarikciAdi === "Mekmer"
              ),
            ];
          }
          if (this.FirmaAdi == "Dis") {
            this.siparisler = [
              ...this.SiparislerHepsi.filter(
                (x) => x.tedarikciAdi !== "Mekmer"
              ),
            ];
            result = [
              ...this.siparisler.filter((x) => x.tedarikciAdi !== "Mek-Moz"),
            ];
          }

          this.siparisler = result;

          this.toplamGuncelle(this.siparisler);
        }
      } else {
        if (this.FirmaAdi) {
          let result;

          if (this.FirmaAdi == "Hepsi") {
            result = this.SiparislerEvent;
          }
          if (this.FirmaAdi != "Hepsi") {
            result = [
              ...this.SiparislerEvent.filter(
                (x) =>
                  x.tedarikciAdi === "Mekmer" || x.tedarikciAdi === "Mek-Moz"
              ),
            ];
          }
          if (this.FirmaAdi == "Dis") {
            this.siparisler = [
              ...this.SiparislerEvent.filter(
                (x) => x.tedarikciAdi !== "Mekmer"
              ),
            ];
            result = [
              ...this.siparisler.filter((x) => x.tedarikciAdi !== "Mek-Moz"),
            ];
          }

          this.siparisler = result;

          this.toplamGuncelle(this.siparisler);
        }
      }
    },
    statuSecim3() {
      //statü değişiminde

      if (this.siparis_list_hepsi == false) {
        if (this.Fatura) {
          let result;

          if (this.Fatura == "Hepsi") {
            result = this.SiparislerHepsi;
          }
          if (this.Fatura != "Hepsi") {
            result = [
              ...this.SiparislerHepsi.filter(
                (x) => x.faturaKesimTur === this.Fatura
              ),
            ];
          }

          this.siparisler = result;

          this.toplamGuncelle(this.siparisler);
        }
      } else {
        if (this.Fatura) {
          let result;

          if (this.Fatura == "Hepsi") {
            result = this.SiparislerEvent;
          }
          if (this.Fatura != "Hepsi") {
            result = [
              ...this.SiparislerEvent.filter(
                (x) => x.faturaKesimTur === this.Fatura
              ),
            ];
          }

          this.siparisler = result;

          this.toplamGuncelle(this.siparisler);
        }
      }
    },
    statuSecim() {
      //statü değişiminde

      if (this.siparis_list_hepsi == false) {
        if (this.marketing) {
          let result;

          if (this.marketing == "Hepsi") {
            result = [...this.SiparislerHepsi];
          }
          if (this.marketing != "Hepsi") {
            result = [
              ...this.SiparislerHepsi.filter(
                (x) => x.marketing === this.marketing
              ),
            ];
          }

          this.siparisler = result;

          this.toplamGuncelle(this.siparisler);
        }
      } else {
        if (this.marketing) {
          let result;

          if (this.marketing == "Hepsi") {
            result = [...this.SiparislerEvent];
          }
          if (this.marketing != "Hepsi") {
            result = [
              ...this.SiparislerEvent.filter(
                (x) => x.marketing === this.marketing
              ),
            ];
          }

          this.siparisler = result;

          this.toplamGuncelle(this.siparisler);
        }
      }
    },
    siparisSecim(event) {
      //sipariş seçildiğinde
      this.selectedSiparis = event;
      this.selectSiparis = true;
      if (this.selectedSiparis) {
        this.selectSiparis = false;
      }
      this.dtSiparisNo = event.siparisNo;

      this.siparisFormBaslik = event.musteriAdi + " - " + this.dtSiparisNo;
      this.yeniSiparis = false;
      this.dialogVisible = true;

    },
    filterDegisim() {
      this.toplamGuncelle(this.dtSiparisler);
      //this.servisMetotTest(this.$refs.siparisData.processedData)
    },
    yeniSiparisAc() {
      this.selectedSiparis = null;
      this.dtSiparisNo = "";
      this.selectSiparis = true;
      this.siparisFormBaslik = "Yeni Sipariş";
      this.yeniSiparis = true;
      this.dialogVisible = true;
      this.$store.dispatch("is_new_form_click_load", true);

    },

    siparisAc() {
      this.dtSiparisNo = this.selectedSiparis.siparisNo;

      this.siparisFormBaslik =
        this.selectedSiparis.musteriAdi + " - " + this.dtSiparisNo;
      this.yeniSiparis = false;
      this.dialogVisible = true;
    },
    columSecim() {
      this.columnsShow.sira = this.selectedColumns.find(
        (x) => x.name === "Sıra"
      )
        ? true
        : false;
    },
    yeniSiparisForm() {
      this.isYeniSiparisForm = true;
    },

    gridGizlemeDegisim(event) {
      if (event) {
        alert("alan gösterimi başladı.");
      }
    },
  },

  components: {
    siparisGirisForm: SiparisGirisForm,
    bmSiparisGirisForm: BmSiparisGirisForm,
    SiparisListeKisitli,
    SiparisListeHepsi,
  },
  showColumn(value) {
    return this.selectedColumns.find((x) => x.name === value);
  },
};
</script>
<style scoped>
.newButton {
  width: 120px;
  margin-left: 150px;
  margin-top: 20px;
  text-align: center;
}
.radioButton {
  display: inline-block;
  float: left;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 10px;
}
.radioButton > li {
  display: block;
  float: left;
  width: 100px;
}
.box-content {
  width: 450px;
  height: 80px;
}
.yearSelected {
  margin-left: 15px;
  margin-top: -5px;
}
.yearSelectedExpand {
  margin-left: 8px;
  margin-top: -5px;
}

.hepsiSelected {
  margin-left: 22px;
  margin-bottom: 5px;
  margin-top: 7px;
}
.hepsiSelectedExpand {
  margin-left: 14px;
  margin-top: 7px;
}
.uretimExcell {
  display: inline-block;
  float: left;
  width: 100px;
  text-align: center;
}
.uretimExcellExpand {
  display: inline-block;
  float: left;
  width: 100px;
  margin-left: -7px;
}
.uretimExcell > div {
  display: inline-block;
  float: left;
  width: 100px;
  text-align: center;
  margin-left: 7px;
}
.genel {
  border: 1px;
  border-style: solid;
  border-color: blue;
  width: 50%;
}
.dairesel {
  border-radius: 150px;

  -webkit-border-radius: 150px;

  -moz-border-radius: 150px;
}
.rowBorder {
  border: 1px;
  border: solid;
  border-top-color: red;
  border-color: black;
}
.ui-datatable column {
  border: 1px;
  border-style: solid;
  border-color: blue;
}
.p-column-filter {
  margin-top: 1em;
}

.p-datatable-header {
  border: 0 none;

  text-align: left;
  font-size: 20px;
}

.p-paginator {
  border: 0 none;
  padding: 1em;
}

.p-datatable-thead > tr > th {
  border: 0 none;
  text-align: left;
}

.p-column-title {
  font-size: 16px;
}

.p-datatable-tbody > tr > td {
  border: 0 none;
}
span {
  margin-top: 0.125em;
}
.ciktiMenu Button {
  margin-left: 5px;
}
.p-datatable {
  font-size: 12px;
}
#excel_button {
  margin-top: 15px;
}
.renk {
  font-size: 5%;

  margin-top: -10px;
}
.pazarlamaToopTip {
  margin-left: 15px;
}
.custom-box {
  width: 70%;
  transition: 0.4s;
  box-shadow: 3px 3px 24px 5px rgba(0, 0, 0, 0.22),
    -3px -3px 24px 5px rgba(0, 0, 0, 0.18);
  margin-right: 20px;
  font-size: 11px;
  height: 120px;
}
.siparis-form {
  height: 1800px;
}
.tarih_hide {
  display: none;
}
.tarih_show {
  display: inline;
}
.block-satici {
  display: block;
  float: left;
  width: 300px;
  margin-left: -13px;
  margin-top: 3px;
}
.block-satici > ul {
  display: block;
  float: left;
}
.block-satici > ul > li {
  display: block;
  float: left;
  margin-right: 2px;
  width: 75px;
}
.block-satici > h3 {
  display: block;
  float: left;
  font-size: 11px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: -3px;
}
</style>

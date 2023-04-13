<template>

    <div class="grid">
      <div class="col">
        <Checkbox @change="konteynerHepsiEvent" v-model="konteyner_list_hepsi" :binary="true" />
        Hepsi
      </div>
      <div class="col">
        <Button class="p-button-primary" label="Tahsilat" @click="tahsilat_liste_ac_click" />
      </div>
      <div class="col">
        <Button style="background-color: #7aa998" @click="pesinat_event_click" label="Peşinat" class="p-button-primary" />
      </div>
      <div class="col">
                  <Button @click="maya_gelen_bedeller" label="Maya Gelen Bedeller" class="p-button-warning" />
      </div>
      <div class="col-1">
        <div class="grid">
          <div class="col">
            <RadioButton v-model="excel_cikti" value="konteyner" /> Konteynır
          </div>
        </div>
        <div class="grid">
          <div class="col">
            <RadioButton v-model="excel_cikti" value="depo" />Depo
          </div>
        </div>
      </div>
      <div class="col">
        <Button @click="excel_cikti_click" style="background-color: #609377; color: white;" label="Excel"
          class="p-button-primary" />
      </div>
    </div>

    <div class="grid">
      <div class="col-8">
        <DataTable :value="
                    !konteyner_list_hepsi
                      ? konteyner_ana_list_filter
                      : konteyner_ana_list_all
                  " sortField="genel_bakiye" dataKey="id" :sortOrder="-1" :scrollable="true" scrollHeight="800px"
          v-model:filters="filters" filterDisplay="row" @filter="siparisFilterDegisim($event)" selectionMode="single"
          v-model:selection="select_konteyner" ref="finans_ana_liste" @row-select="konteyner_item_select($event)"
          >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px"> Konteynır Alacak Tablosu </span>
              </div>
            </div>
          </template>
          <Column field="musteriadi" headerStyle="width:16.6%;" :bodyStyle="{ fontSize: isMobile, paddingLeft: '20px' }"
            :showFilterMenu="false">
            <template #body="slotProps">
              {{ slotProps.data.musteriadi }}
            </template>
            <template #filter="{filterModel,filterCallback}">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'" />
            </template>
          </Column>
        
          <Column header="Açık Po Fatura Toplamı" field="ciro" headerStyle="width:16.6%;" :bodyStyle="{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: isMobile,
                    }">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.kapanmayan_siparis) }}
            </template>
            <template #footer>
              {{ formatPrice(yeni_yukleme) }}
            </template>
          </Column>
          <Column header="Açık Po için Ödemeler" field="odenen" headerStyle="width:16.6%;" :bodyStyle="{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: isMobile,
                    }">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.kapanmayan_odenen) }}
            </template>
            <template #footer>
              {{ formatPrice(yeni_odenen) }}
            </template>
          </Column>
          <Column header="Açık Po için Kalan Alacak" field="bakiye" :sortable="true" headerStyle="width:16.6%;" :bodyStyle="{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: isMobile,
                    }">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.kapanmayan_kalan) }}
            </template>
            <template #footer>
              {{ formatPrice(yuklemeden_alacak) }}
            </template>
          </Column>
          <Column header="Yüklenmemiş Order Peşinatı" field="pesinat" headerStyle="width:16.6%;font-size:8.5px;" :bodyStyle="{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: isMobile,
                    }">
            <template #body="slotProps">
              <!--   <div :style="{'background-color' : slotProps.data.pesinat >10 || slotProps.data.pesinat <-8 ? '#7aa998'  : ''}">
                                                {{formatPrice(slotProps.data.pesinat)}}
                                            </div>
                                         -->
              <div :class="
                          slotProps.data.pesinat > 10 ||
                          slotProps.data.eski_pesinat > 10 ||
                          (slotProps.data.pesinat < -8 &&
                            slotProps.data.genel_bakiye < -8)
                            ? 'genel_bakiye_style'
                            : ''
                        ">
                {{
                formatPrice(
                slotProps.data.pesinat + slotProps.data.eski_pesinat
                )
                }}
              </div>
            </template>
            <template #footer>
              {{ formatPrice(yeni_pesinat) }}
            </template>
          </Column>
          <Column header="RİSK BAKİYE" field="genel_bakiye" :sortable="true" headerStyle="width:16.6%;" :bodyStyle="{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: isMobile,
                      fontWeight: 'bold',
                    }">
            <template #body="slotProps">
              <!--
                                            <div
                                                :class="slotProps.data.genel_bakiye < -8 ? 'genel_bakiye_style' : 'genel_bakiye_style2'">
                                                {{formatPrice(slotProps.data.genel_bakiye)}}
                                            </div>
                                        -->
              <div v-if="slotProps.data.genel_bakiye < -8" class="genel_bakiye_style">
                {{ formatPrice(slotProps.data.genel_bakiye) }}
              </div>
              <div v-else-if="slotProps.data.genel_bakiye > 8" class="genel_bakiye_style2">
                {{ formatPrice(slotProps.data.genel_bakiye) }}
              </div>
              <div v-else class="genelClassRisk">
                {{ formatPrice(slotProps.data.genel_bakiye) }}
              </div>
            </template>
            <template #footer>
              {{ formatPrice(genel_bakiye) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col-4">
        <div class="grid">
          <div class="col">
            <DepoAnaList />
          </div>
        </div>
        <div class="grid">
          <div class="col">
            <VadeliAlacaklar />
          </div>
        </div>
      </div>
    </div>
    <Dialog v-model:visible="isKonteyner" v-model:header="konteynerBaslik" :modal="true" maximizable position="top" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '95vw'}">
      <FinansAyrintiList />
    </Dialog>
    <Dialog v-model:visible="is_pesinat" header="PEŞİNAT LİSTESİ" :modal="true" maximizable position="top">
      <section>
        <div class="columns">
          <div class="column is-12">
            <PesinatTahsil />
          </div>
        </div>
      </section>
    </Dialog>

    <Dialog
      v-model:visible="is_maya_gelen_bedeller_form"
      header="Maya Numune ve Sipariş Gelen Bedeller"
      :modal="true"
      maximizable
      position="top"
    >
    <div class="grid">
      <div class="col">
        <Dropdown v-model="selected_year_maya" :options="years" optionLabel="year" placeholder="Select a Year"
          @change="selectedYearMaya" />

      </div>
      <div class="col">
        <Dropdown v-model="selected_month_maya" :options="months" optionLabel="month_name" placeholder="Select a Month"
          @change="selectedMonthMaya" />
      </div>
      <div class="col">
        <Button class="p-button-primary" @click="cikti_al2" label="EXCELL" />
      </div>
    </div>


    <div class="grid">
      <div class="col" v-if="maya_gelen_bedeller_sip_list.length>0">
        <DataTable :value="maya_gelen_bedeller_sip_list" responsiveLayout="scroll" >
          <template #header>
            <div class="table-header">
              Gelen Sipariş Bedelleri
            </div>
          </template>
          <Column field="tarih" header="Tarih"></Column>
          <Column field="po" header="PO"></Column>
          <Column field="tutar" header="Tutar($)">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.tutar) }}
            </template>
            <template #footer>
              {{ formatPrice(sipTopBedel) }}
            </template>
          </Column>
          <Column field="masraf" header="Masraf($)">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.masraf) }}
            </template>
            <template #footer>
              {{ formatPrice(sipTopMasraf) }}
            </template>
          </Column>
        
        </DataTable>
      </div>
      <div class="col" v-if="maya_gelen_bedeller_num_list.length>0">
        <DataTable :value="maya_gelen_bedeller_num_list" responsiveLayout="scroll" >
        
          <template #header>
            <div class="table-header">
              Gelen Numune Bedelleri
            </div>
          </template>
          <Column field="tarih" header="Gelen Bedel Tarihi"></Column>
          <Column field="numuneTarihi" header="Gönderilme Tarihi"></Column>
          <Column field="numuneYuklemeTarihi" header="Teslim Tarihi"></Column>
        
          <Column field="banka" header="Banka"></Column>
          <Column field="musteriAdi" header="Müşteri Adı"></Column>
          <Column field="po" header="PO"></Column>
          <Column field="tutar" header="Tutar($)">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.tutar) }}
            </template>
            <template #footer>
              {{ formatPrice(numuneTopBedel) }}
            </template>
          </Column>
          <Column field="masraf" header="Masraf($)">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.masraf) }}
            </template>
            <template #footer>
              {{ formatPrice(numuneTopMasraf) }}
            </template>
          </Column>
        
        </DataTable>
      </div >
    </div>


    
    

    </Dialog>
    <Dialog v-model:visible="is_tahsilat" header="TAHSİLAT LİSTESİ" :modal="true" maximizable position="top">
    
      <div class="columns" style="height: 800px; background-color: white">
        <div class="column is-12" style="height: 800px; background-color: white">
          <MusteriOdemeler />
        </div>
      </div>
    </Dialog>

</template>
<script>
import { mapGetters } from "vuex";
import service from "../service/FinansService";
import store from "@/store";
import FinansAyrintiList from "../components/finans/FinansAyrintiList";
import socket from "../service/SocketService";
import DepoAnaList from "../components/finans/DepoAnaList";
import VadeliAlacaklar from "../components/finans/VadeliAlacaklar";
import MusteriOdemeler from "../components/finans/MusteriOdemeler";
import PesinatTahsil from "../components/finans/PesinatTahsil";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    FinansAyrintiList,
    DepoAnaList,
    MusteriOdemeler,
    PesinatTahsil,
    VadeliAlacaklar,
  },
  beforeRouteEnter(to, from, next) {
    const username = store.getters.__getUsername;
    const ad = username;

    const d = new Date();
    const year = d.getFullYear(); // 2021
    store.dispatch("fullscreenLoadingAct",true);
    service.getKonteynerAnaListe(year).then((data) => {
      if (ad == "Ozlem" || ad == "Hakan") {
        data.konteyner_list = [
          ...data.konteyner_list.filter((x) => x.temsilci == ad),
        ];
      } else if (ad == "Gizem") {
        data.konteyner_list = [
          ...data.konteyner_list.filter((x) => x.marketing == "Mekmar"),
        ];
      }

      store.dispatch("finansAnaListeYukleAct", data);
      store.dispatch("depo_ana_list_yukle_act", data);
      store.dispatch("fullscreenLoadingAct",false);

      next();
    });
  },
  created() {
    
    if (window.innerWidth < 576) {
      this.isMobile = "8px";
    }

    this.genel_bakiye = this.finans_toplam_genel_bakiye;

    this.yeni_pesinat =
      this.finans_toplam_pesinat + this.finans_toplam_eski_pesinat;
    this.yuklemeden_alacak =
      this.finans_toplam_bakiye - this.finans_toplam_odenen;
    this.yeni_odenen = this.finans_toplam_odenen;
    this.yeni_yukleme = this.finans_toplam_bakiye;
    this.eski_pesinat = this.finans_toplam_eski_pesinat;
    this.eski_alacak = this.finans_toplam_devir;

  },
  data() {
    return {
      excell_list:[],
      sipTopBedel: 0,
      sipTopMasraf:0,
      numuneTopMasraf:0,
      numuneTopBedel:0,
      months: [
        { 'month': 0, 'month_name': 'Hepsi' },
        { 'month': 1, 'month_name': 'Ocak' },
        { 'month': 2, 'month_name': 'Şubat' },
        { 'month': 3, 'month_name': 'Mart' },
        { 'month': 4, 'month_name': 'Nisan' },
        { 'month': 5, 'month_name': 'Mayıs' },
        { 'month': 6, 'month_name': 'Haziran' },
        { 'month': 7, 'month_name': 'Temmuz' },
        { 'month': 8, 'month_name': 'Ağustos' },
        { 'month': 9, 'month_name': 'Eylül' },
        { 'month': 10, 'month_name': 'Ekim' },
        { 'month': 11, 'month_name': 'Kasım' },
        { 'month': 12, 'month_name': 'Aralık' },

      ],
      selected_month_maya: {},
      years: [
        {'year':2023},
        { 'year': 2022 },
        { 'year': 2021 },
        { 'year': 2020 },
        { 'year': 2019 },

      ],
      selected_year_maya: { "year": 2023 },
      is_maya_gelen_bedeller_form:false,
      isMobile: "",
      filters: {
        musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      datalist: [],
      select_konteyner: null,
      konteyner_list_hepsi: false,
      isKonteyner: false,
      konteynerBaslik: "",
      finans_loading: false,
      excel_cikti: "konteyner",
      is_tahsilat: false,
      ciro: 0,
      is_pesinat: false,
      is_form1: false,
      genel_bakiye: 0,
      yeni_pesinat: 0,
      yuklemeden_alacak: 0,
      yeni_odenen: 0,
      yeni_yukleme: 0,
      eski_pesinat: 0,
      eski_alacak: 0,
    };
  },
  computed: {
    ...mapGetters([
      "konteyner_ana_list_all",
      "konteyner_ana_list_filter",
      "finans_toplam_devir",
      "finans_toplam_ciro",
      "finans_toplam_odenen",
      "finans_toplam_bakiye",
      "finans_toplam_pesinat",
      "finans_toplam_genel_bakiye",
      "depo_ana_list",
      "servis_adres",
      "finans_toplam_eski_pesinat",
      "maya_gelen_bedeller_sip_list",
      "maya_gelen_bedeller_num_list"
    ]),
  },
  methods: {
    cikti_al2() {
        this.$store.dispatch('fullscreenLoadingAct', true)

      service
        .getMayaListExcellCikti(this.excell_list)
        .then((res) => {
          if (res.status) {
            const link = document.createElement("a");
            link.href =
              this.servis_adres + "finans/listeler/mayaNumuneSiparisOdemeleriCikti";
            //link.href = 'localhost:5000/finans/listeler/depoAyrintiExcellListe'
            link.setAttribute("download", "maya_numune_sip_odemeler.xlsx");
            document.body.appendChild(link);
            link.click();
        this.$store.dispatch('fullscreenLoadingAct', false)

          }
        });
    },
    sipToplamaİslemi(data) {
      this.sipTopBedel= 0
      this.sipTopMasraf = 0
      for (let item of data) {
        this.sipTopBedel += item.tutar
        this.sipTopMasraf += item.masraf
      }
    },
    numuneToplamaİslemi(data) {
      this.numuneTopBedel = 0
      this.numuneTopMasraf = 0
      for (let item of data) {
        this.numuneTopBedel += item.tutar
        this.numuneTopMasraf += item.masraf
      }
    },
    selectedYearMaya() {
      this.selected_month_maya = { 'month': 0, 'month_name': 'Hepsi' }
        this.$store.dispatch('fullscreenLoadingAct', true)

      service.getMayaNumunevSiparisOdemeleriYear(this.selected_year_maya.year).then(data => {
        this.$store.dispatch('mayaGelenBedellerSipAct', data.siparis)
        this.$store.dispatch('mayaGelenBedellerNumAct', data.numune)
        this.numuneToplamaİslemi(data.numune)
        this.sipToplamaİslemi(data.siparis)
        this.excell_list = data
        this.$store.dispatch('fullscreenLoadingAct', false)


      })
    },
    selectedMonthMaya() {
      this.$store.dispatch('fullscreenLoadingAct', true)

      if (this.selected_month_maya.month == 0) {
        this.selectedYearMaya()
        this.$store.dispatch('fullscreenLoadingAct', false)

      } else {
        service.getMayaNumunevSiparisOdemeleri(this.selected_month_maya.month, this.selected_year_maya.year).then(data => {
          this.$store.dispatch('mayaGelenBedellerSipAct', data.siparis)
          this.$store.dispatch('mayaGelenBedellerNumAct', data.numune)
          this.numuneToplamaİslemi(data.numune)
          this.sipToplamaİslemi(data.siparis)
          this.excell_list = data
        this.$store.dispatch('fullscreenLoadingAct', false)





        })
      }
      
    },
    maya_gelen_bedeller() {

      this.selected_month_maya = { 'month': 0, 'month_name': 'Hepsi' }
      service.getMayaNumunevSiparisOdemeleriYear(this.selected_year_maya.year).then(data => {
        this.$store.dispatch('mayaGelenBedellerSipAct', data.siparis)
        this.$store.dispatch('mayaGelenBedellerNumAct', data.numune)
        this.numuneToplamaİslemi(data.numune)
        this.sipToplamaİslemi(data.siparis)


        this.is_maya_gelen_bedeller_form = true;
        this.excell_list = data


      })
      
    },
    atlanta_depo() {
      const d = new Date();
      const year = d.getFullYear(); // 2021
      service.getKonteynerAnaListe(year).then((data) => {
        store.dispatch("depo_ana_list_yukle_act", data);
        this.is_form1 = true;
      });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    siparisFilterDegisim(event) {
      this.toplamGuncelle(event.filteredValue);
    },
    toplamGuncelle(liste) {
      this.genel_bakiye = 0;
      this.yeni_pesinat = 0;
      this.yuklemeden_alacak = 0;
      this.yeni_odenen = 0;
      this.yeni_yukleme = 0;
      this.eski_pesinat = 0;
      this.eski_alacak = 0;

      for (let key in liste) {
        const data = liste[key];

        this.genel_bakiye += data.genel_bakiye;
        this.yeni_pesinat += data.pesinat;
        this.yuklemeden_alacak += data.kapanmayan_kalan;
        this.yeni_odenen += data.kapanmayan_odenen;
        this.yeni_yukleme += data.kapanmayan_siparis;
        this.eski_pesinat += data.eski_pesinat;
        this.eski_alacak += data.devir;
      }
    },
    konteynerHepsiEvent() {
        

      if (this.konteyner_list_hepsi) {
        this.$store.dispatch('fullscreenLoadingAct', true)
        const data = [...this.konteyner_ana_list_all];

        store.dispatch("finansAnaListe_hepsiAct", data);
        this.tableToplamGuncelle(this.konteyner_list_all);
        this.$store.dispatch('fullscreenLoadingAct', false)

        //this.$refs.finans_ana_liste.value = this.konteyner_ana_list_all
      } else {
        this.$store.dispatch('fullscreenLoadingAct', true)
        const data = [...this.konteyner_ana_list_filter];
        store.dispatch("finansAnaListe_filterAct", data);
        this.tableToplamGuncelle(data);
        this.$store.dispatch('fullscreenLoadingAct', false)


        //this.$refs.finans_ana_liste.value = this.konteyner_ana_list_filter
      }
    },
    konteyner_item_select(event) {
        this.$store.dispatch('fullscreenLoadingAct', true)
      this.select_konteyner = event.data;
      service.getFinansAyrintiListYukle(event.data.id).then((data) => {
        store.dispatch("finansAyrintiListYukleAct", data);
        store.dispatch("finansPoListLoadAct", data.po_list)
        this.konteynerBaslik = event.data.musteriadi;
        this.$store.dispatch('fullscreenLoadingAct', false);
        this.isKonteyner = true;


      });
    },
    tableToplamGuncelle(data_list) {
      this.ciro = 0;

      for (let key in data_list) {
        const item = data_list[key];

        this.ciro += item.ciro;
      }
    },
    excel_cikti_click() {
        this.$store.dispatch('fullscreenLoadingAct', true)

      if (this.excel_cikti == "konteyner") {
        const data = !this.konteyner_list_hepsi
          ? this.konteyner_ana_list_filter
          : this.konteyner_ana_list_all;

        service.getKonteynerExcelListe(data).then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            link.href =
              this.servis_adres + "finans/dosyalar/konteynerExcelCikti";

            link.setAttribute("download", "konteyter_listesi.xlsx");
            document.body.appendChild(link);
            link.click();
            this.is_excel = false;
        this.$store.dispatch('fullscreenLoadingAct', false)

          }
        });
      } else {
        service.getDepoExcelListe(this.depo_ana_list).then((x) => {
          if (x.status) {
            const link = document.createElement("a");
            link.href = this.servis_adres + "finans/dosyalar/depoExcelCikti";
            link.setAttribute("download", "depo_listesi.xlsx");
            document.body.appendChild(link);
            link.click();
            this.is_excel = false;
                    this.$store.dispatch('fullscreenLoadingAct', false)

          }
        });
      }
    },
    tahsilat_liste_ac_click() {
      this.is_tahsilat = true;
    },
    pesinat_event_click() {
        this.$store.dispatch('fullscreenLoadingAct', true)

      this.$store.dispatch("new_pesinat_model_act");
      service.getPesinatIslemListesi().then((data) => {
        this.$store.dispatch("pesinat_listesi_yukle_act", data);
        this.is_pesinat = true;
        this.$store.dispatch('fullscreenLoadingAct', false)

      });
    },
  },
  mounted() {
    socket.siparis.on("tahsilat_kayitdegisim_emit", () => {
      this.$store.dispatch('fullscreenLoadingAct', true)

      const d = new Date();
      const year = d.getFullYear(); // 2021
      service.getKonteynerAnaListe(year).then((data) => {
        store.dispatch("finansAnaListeYukleAct", data);
        this.$store.dispatch('fullscreenLoadingAct', false)

      });
    });
  }
};
</script>
<style scoped>
.p-datatable {
  font-size: 10px;
}

.depo-radio {
  margin-top: -15px;
  margin-bottom: -35px;
}

.genel_bakiye_style {
  background-color: #f59c9c;
  color: #f23a3a;
  font-weight: bold;
  font-size: 11px;
}

.genel_bakiye_style2 {
  color: #527f62;
  background-color: #c8fdda;
  font-weight: bold;
  font-size: 11px;
}

@media screen and (max-width: 576px) {
  .genel_bakiye_style {
    background-color: #f59c9c;
    color: #f23a3a;
    font-weight: bold;
    font-size: 8px;
  }

  .genel_bakiye_style2 {
    color: #527f62;
    background-color: #c8fdda;
    font-weight: bold;
    font-size: 8px;
  }
}

.genel_pesinat_style {
  color: #527f62;
  background-color: #c8fdda;
  font-weight: bold;
  font-size: 11px;
}

.dairesel {
  border-radius: 150px;

  -webkit-border-radius: 150px;

  -moz-border-radius: 150px;
}

.genelClassRisk {
  background-color: transparent;
}
</style>

<template>
  <section>
    <div class="columns is-multiline">
      <div class="column is-3">
        <Checkbox @change="konteynerHepsiEvent" v-model="konteyner_list_hepsi" :binary="true" />
        Hepsi
      </div>
      <div class="columns is-multiline">
        <div class="column is-6">
          <Button
            class="p-button-primary"
            label="Tahsilat"
            @click="tahsilat_liste_ac_click"
          />
          <Dialog
            v-model:visible="is_tahsilat"
            header="TAHSİLAT LİSTESİ"
            :modal="true"
            maximizable
            position="top"
          >
            <section>
              <div
                class="container"
                style="height: 800px; background-color: white"
              >
                <div
                  class="columns"
                  style="height: 800px; background-color: white"
                >
                  <div
                    class="column is-12"
                    style="height: 800px; background-color: white"
                  >
                    <MusteriOdemeler />
                  </div>
                </div>
              </div>
            </section>
          </Dialog>
        </div>
        <div class="column is-6">
          <Button
            style="background-color: #7aa998"
            @click="pesinat_event_click"
            label="Peşinat"
            class="p-button-primary"
          />
        </div>
      </div>
      <Dialog
        v-model:visible="is_pesinat"
        header="PEŞİNAT LİSTESİ"
        :modal="true"
        maximizable
        position="top"
      >
        <section>
          <div class="columns">
            <div class="column is-12">
              <PesinatTahsil />
            </div>
          </div>
        </section>
      </Dialog>
      <div class="column is-3">
        <div class="columns is-multiline is-right">
          <div class="column is-3">
            <RadioButton v-model="excel_cikti" value="konteyner" /> Konteynır
          </div>
          <div class="column is-2">
            <RadioButton v-model="excel_cikti" value="depo" />Depo
          </div>
          <div class="column is-2">
            <Button
              @click="excel_cikti_click"
              style="background-color: #609377; color: white; margin-top: -10px"
              label="Excel"
              class="p-button-primary"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="columns" style="margin-top: -20px">
      <div class="column is-9">
        <DataTable
          :value="
            !konteyner_list_hepsi
              ? konteyner_ana_list_filter
              : konteyner_ana_list_all
          "
          sortField="genel_bakiye"
          dataKey="id"
          :sortOrder="-1"
          :scrollable="true" 
          scrollHeight="800px"
          v-model:filters="filters"
          filterDisplay="row"
          @filter="siparisFilterDegisim($event)"
          selectionMode="single"
          v-model:selection="select_konteyner"
          ref="finans_ana_liste"
          @row-select="konteyner_item_select($event)"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px"> Konteynır Alacak Tablosu </span>
              </div>
            </div>
          </template>
          <Column
            field="musteriadi"
            headerStyle="width:16.6%;"
            :bodyStyle="{ fontSize: isMobile, paddingLeft: '20px' }"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteriadi }}
            </template>
            <template #filter="{filterModel,filterCallback}">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'" />
            </template>
          </Column>

          <Column
            header="Açık Po Fatura Toplamı"
            field="ciro"
            headerStyle="width:16.6%;"
            :bodyStyle="{
              textAlign: 'center',
              color: 'black',
              fontSize: isMobile,
            }"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.kapanmayan_siparis) }}
            </template>
            <template #footer>
              {{ formatPrice(yeni_yukleme) }}
            </template>
          </Column>
          <Column
            header="Açık Po için Ödemeler"
            field="odenen"
            headerStyle="width:16.6%;"
            :bodyStyle="{
              textAlign: 'center',
              color: 'black',
              fontSize: isMobile,
            }"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.kapanmayan_odenen) }}
            </template>
            <template #footer>
              {{ formatPrice(yeni_odenen) }}
            </template>
          </Column>
          <Column
            header="Açık Po için Kalan Alacak"
            field="bakiye"
            :sortable="true"
            headerStyle="width:16.6%;"
            :bodyStyle="{
              textAlign: 'center',
              color: 'black',
              fontSize: isMobile,
            }"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.kapanmayan_kalan) }}
            </template>
            <template #footer>
              {{ formatPrice(yuklemeden_alacak) }}
            </template>
          </Column>
          <Column
            header="Yüklenmemiş Order Peşinatı"
            field="pesinat"
            headerStyle="width:16.6%;font-size:8.5px;"
            :bodyStyle="{
              textAlign: 'center',
              color: 'black',
              fontSize: isMobile,
            }"
          >
            <template #body="slotProps">
              <!--   <div :style="{'background-color' : slotProps.data.pesinat >10 || slotProps.data.pesinat <-8 ? '#7aa998'  : ''}">
                                        {{formatPrice(slotProps.data.pesinat)}}
                                    </div>
                                 -->
              <div
                :class="
                  slotProps.data.pesinat > 10 ||
                  slotProps.data.eski_pesinat > 10 ||
                  (slotProps.data.pesinat < -8 &&
                    slotProps.data.genel_bakiye < -8)
                    ? 'genel_bakiye_style'
                    : ''
                "
              >
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
          <Column
            header="RİSK BAKİYE"
            field="genel_bakiye"
            :sortable="true"
            headerStyle="width:16.6%;"
            :bodyStyle="{
              textAlign: 'center',
              color: 'black',
              fontSize: isMobile,
              fontWeight: 'bold',
            }"
          >
            <template #body="slotProps">
              <!--
                                    <div
                                        :class="slotProps.data.genel_bakiye < -8 ? 'genel_bakiye_style' : 'genel_bakiye_style2'">
                                        {{formatPrice(slotProps.data.genel_bakiye)}}
                                    </div>
                                -->
              <div
                v-if="slotProps.data.genel_bakiye < -8"
                class="genel_bakiye_style"
              >
                {{ formatPrice(slotProps.data.genel_bakiye) }}
              </div>
              <div
                v-else-if="slotProps.data.genel_bakiye > 8"
                class="genel_bakiye_style2"
              >
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

      <Dialog
        v-model:visible="isKonteyner"
        v-model:header="konteynerBaslik"
        :modal="true"
        maximizable
        position="top"
      >
        <FinansAyrintiList />
      </Dialog>

      <div class="column is-3">
        <DepoAnaList />
        <VadeliAlacaklar />
      </div>
    </div>
  </section>
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
    store.dispatch("loadingBeginAct");
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
      store.dispatch("loadingEndAct");

      next();
    });
  },
  created() {
    socket.siparis.on("tahsilat_kayitdegisim_emit", () => {
      this.finans_loading = true;
      const d = new Date();
      const year = d.getFullYear(); // 2021
      service.getKonteynerAnaListe(year).then((data) => {
        store.dispatch("finansAnaListeYukleAct", data);
        this.finans_loading = false;
      });
    });
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
    ]),
  },
  methods: {
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
        const data = [...this.konteyner_ana_list_all];

        store.dispatch("finansAnaListe_hepsiAct", data);
        this.tableToplamGuncelle(this.konteyner_list_all);
        //this.$refs.finans_ana_liste.value = this.konteyner_ana_list_all
      } else {
        const data = [...this.konteyner_ana_list_filter];
        store.dispatch("finansAnaListe_filterAct", data);
        this.tableToplamGuncelle(data);

        //this.$refs.finans_ana_liste.value = this.konteyner_ana_list_filter
      }
    },
    konteyner_item_select(event) {
      this.select_konteyner = event.data;
      service.getFinansAyrintiListYukle(event.data.id).then((data) => {
        store.dispatch("finansAyrintiListYukleAct", data);
        store.dispatch("finansPoListLoadAct", data.po_list)
        this.konteynerBaslik = event.data.musteriadi;
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
            this.musteri_loading = false;
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
            this.musteri_loading = false;
          }
        });
      }
    },
    tahsilat_liste_ac_click() {
      this.is_tahsilat = true;
    },
    pesinat_event_click() {
      this.$store.dispatch("new_pesinat_model_act");
      service.getPesinatIslemListesi().then((data) => {
        this.$store.dispatch("pesinat_listesi_yukle_act", data);
        this.is_pesinat = true;
      });
    },
  },
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

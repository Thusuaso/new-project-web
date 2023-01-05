<template>
  <section>
    <div class="columns">
      <div class="column is-9">
        <div class="columns">
          <div class="column">
            <RadioButton
              v-model="FirmaAdi"
              name="name"
              @change="statuSecim"
              value="OnlyMekmer"
            />Sadece Stok
          </div>
          <div class="column">
            <RadioButton
              v-model="FirmaAdi"
              name="name"
              @change="statuSecim"
              value="Mekmer"
            />Mekmer
          </div>
          <div class="column">
            <RadioButton
              v-model="FirmaAdi"
              name="name"
              @change="statuSecim"
              value="Mek-Moz"
            />Mek-Moz
          </div>
          <div class="column">
            <RadioButton
              v-model="FirmaAdi"
              name="name"
              @change="statuSecim"
              value="Hepsi"
            />Hepsi
          </div>
        </div>
      </div>
      <div class="column is-3">
        <Button @click="excel_cikti_click" label="Excel" />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <h2 class="has-text-centered has-text-weight-bold">STOCK LIST</h2>
        <DataTable
          :value="uretimKasalar"
          :rows="30"
          v-model:filters="filters"
          filterDisplay="row"
          selectionMode="single"
          dataKey="id"
          @row-select="depo_item_sec($event)"
          v-model:selection="select_depo"
          groupRowsBy="ebat"
          sortField="ebat"
          @filter="stokKasaToplama($event)"
          rowGroupMode="rowspan"
          sortMode="many"
          :sortOrder="1"
          scrollable
          scrollHeight="520px"
        >
          <Column
            field="en"
            header="En"
            headerStyle="width:12%"
            bodyStyle="text-align:center"
            :showFilterMenu="false"
          >
            <template style="display: sticky" #body="slotProps">
              {{ slotProps.data.en }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                :placeholder="`Search by name - `"
                v-tooltip.top.focus="'Hit enter key to filter'"
              />
            </template>
          </Column>
          <Column
            field="boy"
            header="Boy"
            headerStyle="width:12%"
            bodyStyle="text-align:center"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.boy }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                :placeholder="`Search by name - `"
                v-tooltip.top.focus="'Hit enter key to filter'"
              />
            </template>
          </Column>
          <Column
            field="kenar"
            header="Kenar"
            headerStyle="width:12%"
            bodyStyle="text-align:center"
            :showFilterMenu="false"
          >
            <template style="display: sticky" #body="slotProps">
              {{ slotProps.data.kenar }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                :placeholder="`Search by name - `"
                v-tooltip.top.focus="'Hit enter key to filter'"
              />
            </template>
          </Column>
          <Column
            field="urunAdi"
            header="Ürün"
            headerStyle="width:25%"
            bodyStyle="text-align:center"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.urunAdi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                :placeholder="`Search by name - `"
                v-tooltip.top.focus="'Hit enter key to filter'"
              />
            </template>
          </Column>
          <Column
            field="yuzeyIslem"
            header="Yuzey"
            headerStyle="width:25%"
            bodyStyle="text-align:center"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              <div style="word-break: break-all">
                {{ slotProps.data.yuzeyIslem }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                :placeholder="`Search by name - `"
                v-tooltip.top.focus="'Hit enter key to filter'"
              />
            </template>

            <template #footer> Kasa Toplam : </template>
          </Column>

          <Column
            field="kasaSayisi"
            header="Kasa"
            headerStyle="width:12%"
            bodyStyle="text-align:center"
            :showFilterMatchModes="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.kasaSayisi }}
            </template>

            <template #footer>
              {{ kasa_toplami }}
            </template>
          </Column>
          <Column
            field="miktar"
            header="Miktar"
            headerStyle="width:12%"
            bodyStyle="text-align:center"
            :showFilterMatchModes="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.miktar }}
            </template>
            <template #footer>
              {{ formatDecimal(m2toplami) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <Dialog
      v-model:visible="is_form"
      position="top"
      :modal="true"
      header="Stok Raporu Ayrıntı"
      maximizable
      :breakpoints="{'960px': '75vw', '640px': '100vw'}" 
      :style="{width: '100%'}"
    >

              <StokAyrintiListesi />

    </Dialog>

    <Dialog
      v-model:visible="is_form2"
      position="top"
      :modal="true"
      header="Stok Raporu Ayrıntı"
      maximizable
    >
      <section>
        <div class="container">
          <div class="columns">
            <div class="column is-12">
              <DataTable
                :value="filterEbats"
                :rows="30"
                v-model:filters="filters2"
                selectionMode="single"
                dataKey="id"
                @row-select="depo_item_sec($event)"
                v-model:selection="select_depo"
                groupRowsBy="ebat"
                sortField="ebat"
                rowGroupMode="rowspan"
                sortMode="many"
                :sortOrder="1"
                scrollable
                scrollHeight="459px"
                @filter="stokKasaToplama2($event)"
              >
                <Column
                  field="ebat"
                  header="Ebat"
                  headerStyle="width:80px"
                  bodyStyle="text-align:center"
                >
                  <template style="display: sticky" #body="slotProps">
                    {{ slotProps.data.ebat }}
                  </template>
                </Column>
                <Column
                  field="yuzeyIslem"
                  header="Yuzey"
                  headerStyle="width:100px"
                >
                  <template #body="slotProps">
                    {{ slotProps.data.yuzeyIslem }}
                  </template>
                </Column>
                <Column
                  field="urunAdi"
                  header="Ürün"
                  headerStyle="width:80px"
                  bodyStyle="text-align:center"
                >
                  <template #body="slotProps">
                    {{ slotProps.data.urunAdi }}
                  </template>
                  <template #footer> Kasa Toplam : </template>
                </Column>
                <Column
                  field="kasaSayisi"
                  header="Kasa"
                  headerStyle="width:20px"
                  bodyStyle="text-align:center"
                >
                  <template #body="slotProps">
                    {{ slotProps.data.kasaSayisi }}
                  </template>
                  <template #footer>
                    {{ kasa_toplami2 }}
                  </template>
                </Column>
                <Column
                  field="miktar"
                  header="Miktar"
                  headerStyle="width:20px"
                  bodyStyle="text-align:center"
                >
                  <template #body="slotProps">
                    {{ slotProps.data.miktar }}
                  </template>
                  <template #footer>
                    {{ formatDecimal(m2toplami2) }}
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
      </section>
    </Dialog>
  </section>
</template>
<script>
import store from "@/store";
import { mapGetters } from "vuex";
import service from "../service/RaporService";

import StokAyrintiListesi from "../components/stokraporu/StokAyrintiListesi";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    StokAyrintiListesi,
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("loadingBeginAct");
    service.StokRaporRaporApi().then((data) => {
      store.dispatch("stok_ana_list_yukle_act", data);
      store.dispatch("stok_ayrinti_list_yukle_act", data);
      store.dispatch("loadingEndAct");

      next();
    });
  },
  data() {
    return {
      m2toplami: null,
      m2toplami2: null,
      uretimKasalar: "",
      loading: false,
      select_depo: null,
      is_form: false,
      is_form2: false,
      filters: {
        en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        yuzeyIslem: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filters2: {},
      select_stok: null,
      FirmaAdi: "Hepsi",
      kasa_toplami: 0,
      kasa_toplami2: 0,
      selectedCategory: "All",

      groups: ["ebat", "yuzey_islem", "urun_adi"],
      selectedEbat: null,
      ebats: [],
      filterEbats: [],
      listDurum: null,
    };
  },
  computed: {
    ...mapGetters(["stok_ana_list", "stok_ayrinti_list", "servis_adres"]),
  },
  mounted() {
    this.kasa_toplamı(this.uretimKasalar);
  },
  created() {
    /*this.siparisler = this.stok_ana_list*/

    service.StokRaporOlculeriApi().then((data) => {
      this.ebats = data;
    });
    this.$store.dispatch("loadingBeginAct");
    service.StokRaporAnaList().then((data) => {
      this.uretimKasalar = data;
      this.kasa_toplamı(data);
      this.m2_toplami(data);
      this.$store.dispatch("loadingEndAct");
    });
  },
  methods: {
    stokKasaToplama(event) {
      this.kasa_toplamı(event.filteredValue);
      this.m2_toplami(event.filteredValue);
    },
    stokKasaToplama2(event) {
      this.kasa_toplamı2(event.filteredValue);
      this.m2_toplami2(event.filteredValue);
    },
    excel_cikti_click() {
      this.$store.dispatch("loadingBeginAct");

      service.getStokExcelCikti(this.uretimKasalar).then((response) => {
        if (response.status) {
          this.musteri_loading = true;
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "raporlar/listeler/stokRaporExcelListe";

          link.setAttribute("download", "Stok_listesi.xlsx");
          document.body.appendChild(link);
          link.click();
          this.$store.dispatch("loadingEndAct");
        }
      });
    },

    kasa_toplamı(liste) {
      this.kasa_toplami = 0;

      for (let key in liste) {
        const item = liste[key];

        this.kasa_toplami += item.kasaSayisi;
      }

      this.$store.dispatch("loadToplamGuncelleAct", this.kasa_toplami);
    },
    m2_toplami(liste) {
      this.m2toplami = 0;
      for (let key in liste) {
        this.m2toplami += liste[key].miktar;
      }
    },
    m2_toplami2(liste) {
      this.m2toplami2 = 0;
      for (let key in liste) {
        this.m2toplami2 += liste[key].miktar;
      }
    },
    kasa_toplamı2(liste) {
      this.kasa_toplami2 = 0;

      for (let key in liste) {
        const item = liste[key];

        this.kasa_toplami2 += item.kasaSayisi;
      }

      this.$store.dispatch("loadToplamGuncelleAct", this.kasa_toplami2);
    },
    depo_item_sec(event) {
      this.select_depo = {
        boyut: event.data,
        listDurum: this.listDurum,
      };
      if (this.FirmaAdi == "Hepsi") {
        this.listDurum = 1;
        this.select_depo = {
          boyut: event.data,
          listDurum: this.listDurum,
        };
        service.getStokRaporAyrintiHepsi(this.select_depo).then((data) => {
          this.$store.dispatch(
            "stok_top_ayrinti_list_yukle_act",
            data.stok_ayrinti_listesi
          );
          this.is_form = true;
        });
      } else if (this.FirmaAdi == "Mekmer") {
        this.listDurum = 2;
        this.select_depo = {
          boyut: event.data,
          listDurum: this.listDurum,
        };
        service.getStokRaporAyrintiHepsi(this.select_depo).then((data) => {
          this.$store.dispatch(
            "stok_top_ayrinti_list_yukle_act",
            data.stok_ayrinti_listesi
          );
          this.is_form = true;
        });
      } else if (this.FirmaAdi == "Mek-Moz") {
        this.listDurum = 3;
        this.select_depo = {
          boyut: event.data,
          listDurum: this.listDurum,
        };
        service.getStokRaporAyrintiHepsi(this.select_depo).then((data) => {
          this.$store.dispatch(
            "stok_top_ayrinti_list_yukle_act",
            data.stok_ayrinti_listesi
          );
          this.is_form = true;
        });
      } else if (this.FirmaAdi == "OnlyMekmer") {
        this.listDurum = 4;
        this.select_depo = {
          boyut: event.data,
          listDurum: this.listDurum,
        };
        service.getStokRaporAyrintiHepsi(this.select_depo).then((data) => {
          this.$store.dispatch(
            "stok_top_ayrinti_list_yukle_act",
            data.stok_ayrinti_listesi
          );
          this.is_form = true;
        });
      }

      this.select_depo = true;
      if (this.select_depo) {
        this.select_depo = false;
        this.emitter.emit("hepsiSiparisSecim", event.data);
      }
    },

    statuSecim() {
      //statü değişiminde
      if (this.FirmaAdi) {
        let result;

        if (this.FirmaAdi == "Mekmer") {
          const tedarikci_id = 1;
          service.StokRaporAnaListFilter(tedarikci_id).then((data) => {
            this.uretimKasalar = data;
            this.kasa_toplamı(data);
          });
          this.kasa_toplamı(result);
        }
        if (this.FirmaAdi == "Mek-Moz") {
          const tedarikci_id = 123;
          service.StokRaporAnaListFilter(tedarikci_id).then((data) => {
            this.uretimKasalar = data;
            this.kasa_toplamı(data);
            this.m2_toplami(data);
          });
          this.kasa_toplamı(result);
        }
        if (this.FirmaAdi == "Hepsi") {
          service.StokRaporAnaList().then((data) => {
            this.uretimKasalar = data;
            this.kasa_toplamı(data);
            this.m2_toplami(data);
          });
        }
        if (this.FirmaAdi == "OnlyMekmer") {
          service.StokRaporAnaListOnlyMekmer().then((data) => {
            this.uretimKasalar = data;
            this.kasa_toplamı(data);
            this.m2_toplami(data);
          });
        }
        if (this.FirmaAdi == "Dis") {
          this.siparisler = [
            ...this.uretimKasalar.filter((x) => x.tedarikciAdi !== "Mekmer"),
          ];
          result = [
            ...this.siparisler.filter((x) => x.tedarikciAdi !== "Mek-Moz"),
          ];
          this.kasa_toplamı(result);
          this.m2_toplami(result);
        }

        this.uretimKasalar = result;
      }
    },
    isSelectedEbat() {
      this.filterEbats = [];
      this.is_form2 = true;
      for (var i in this.selectedEbat) {
        for (var j in this.uretimKasalar) {
          if (this.uretimKasalar[j].ebat == this.selectedEbat[i].ebat) {
            this.filterEbats.push(this.uretimKasalar[j]);
          }
        }
      }
      this.kasa_toplamı2(this.filterEbats);
      this.m2_toplami2(this.filterEbats);
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 12px;
}

.p-column-filter {
  font-size: 10px;
}

.page-button {
  margin-top: 25px;
}

.page-button-excell {
  margin-left: -100px;
}

.isMobile {
}

.isMobileButton {
  height: 35px;
}

@media screen and (max-width: 576px) {
  .isMobileButton {
    height: auto;
    margin-top: -15px;
  }
}
</style>

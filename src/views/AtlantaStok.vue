<template>
  <br/>
  <section>
    <div class="columns is-centered">
      <div class="column is-4">
        <MultiSelect
          v-model="kategori_secim"
          optionLabel="name"
          @input="statuSecim($event)"
          :options="category"
          placeholder="Select Kategori"
          display="chip"
        >
        </MultiSelect>
      </div>
      <div class="column is-4">
        <MultiSelect
          v-model="ebat_secim"
          optionLabel="name"
          @input="statuSecim2($event)"
          :options="size"
          placeholder="Select Size"
          display="chip"
        >
        </MultiSelect>
      </div>
      <div class="column is-1">
        <div class="column is-12 page-button page-button-excell">
          <Button
            :disabled="is_excel"
            @click="excel_cikti_click"
            icon="pi pi-file-excel"
          />
        </div>
      </div>
    </div>
    <div class="columns is-centered" style="margin-top: -25px">
      <div class="column is-12">
        <DataTable
          :value="stok_listesi"
          :paginator="true"
          :rows="19"
          v-model:filters="filters"
          filterDisplay="row"
          @filter="filter_data_change($event)"
          @row-select="item_sec($event)"
          v-model:selection="select_depo"
          selectionMode="single"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px"> Atlanta SM Stok </span>
              </div>
            </div>
          </template>

          <Column
            field="sku"
            placeholder="SKU"
            bodyStyle="text-align:left; "
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.sku }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Sku"
              />
            </template>
          </Column>
          <Column
            field="kod"
            bodyStyle="text-align:left;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.kod }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Code"
              />
            </template>
          </Column>
          <Column
            field="tanim"
            placeholder="Ürün Tanımı"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              {{ slotProps.data.tanim }}
            </template>
          </Column>
          <Column
            field="po"
            header="ATL"
            bodyStyle="text-align:left;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.po }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by PO"
              />
            </template>
          </Column>

          <Column
            field="kasa_adet"
            header="Kasa Adet"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              {{ slotProps.data.kasa_adet }}
            </template>
          </Column>
          <Column
            field="kasa_kutu"
            header="Kasa Kutu"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              {{ slotProps.data.kasa_kutu }}
            </template>
          </Column>

          <Column field="kasa_m2" header="Kasa M2" bodyStyle="text-align:left;">
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.kasa_m2) }}
            </template>
          </Column>
          <Column
            field="kasa_Sqft"
            header="Kasa Sqft"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.kasa_Sqft) }}
            </template>
          </Column>
          <Column
            field="kutu_adet"
            header="Kutu Adet"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              {{ slotProps.data.kutu_adet }}
            </template>
          </Column>
          <Column
            field="stok_kutu"
            header="Stok Kutu"
            headerStyle="background-color:#90EE90;"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              {{ slotProps.data.stok_kutu }}
            </template>
            <template #footer>
              {{ stok_kutu }}
            </template>
          </Column>
          <Column
            field="stok_sqft"
            header="Stok Sqft"
            headerStyle="background-color:#90EE90;"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.stok_sqft) }}
            </template>
            <template #footer>
              {{ formatDecimal(stok_sqft) }}
            </template>
          </Column>
          <Column
            field="stok_m2"
            header="Stok m2"
            headerStyle="background-color:#90EE90;"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.stok_m2) }}
            </template>
            <template #footer>
              {{ formatDecimal(stok_m2) }}
            </template>
          </Column>
          <Column
            field="su_kutu"
            header="Sea Kutu"
            headerStyle="background-color:#00BFFF;"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              <div :class="slotProps.data.su_kutu > 0 ? 'water_style' : False">
                {{ slotProps.data.su_kutu }}
              </div>
            </template>
            <template #footer>
              <div style="text-align: left">{{ sea_kutu }}</div>
            </template>
          </Column>
          <Column
            field="su_sqft"
            header="Sea Sqft"
            headerStyle="background-color:#00BFFF;"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              <div :class="slotProps.data.su_sqft > 0 ? 'water_style' : False">
                {{ formatDecimal(slotProps.data.su_sqft) }}
              </div>
            </template>
            <template #footer>
              <div style="text-align: left">
                {{ formatDecimal(sea_sqft) }}
              </div>
            </template>
          </Column>
          <Column
            field="su_m2"
            header="Sea m2"
            headerStyle="background-color:#00BFFF;"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              <div :class="slotProps.data.su_m2 > 0 ? 'water_style' : False">
                {{ formatDecimal(slotProps.data.su_m2) }}
              </div>
            </template>
            <template #footer>
              <div style="text-align: left">{{ formatDecimal(sea_m2) }}</div>
            </template>
          </Column>
          <Column
            field="toplam_mekus"
            header="Mekus"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              <div style="background-color: #ff7f7f">
                {{ formatPrice(slotProps.data.toplam_mekus) }}
              </div>
            </template>
          </Column>
          <Column
            field="mekmar_fiyat"
            header="Mekus Efes"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.mekmar_fiyat) }}
            </template>
          </Column>
          <Column field="maya_fiyat" header="Maya" bodyStyle="text-align:left;">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.maya_fiyat) }}
            </template>
          </Column>
          <Column
            field="villo_fiyat"
            header="Villo"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.villo_fiyat) }}
            </template>
          </Column>
          <Column field="bd_fiyat" header="BD" bodyStyle="text-align:left;">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.bd_fiyat) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Dialog
      v-model:visible="is_form"
      v-model:header="FormBaslik"
      position="top"
      :modal="true"
      maximizable
      :breakpoints="{'960px': '75vw', '640px': '100vw'}" 
      :style="{width: '100%'}"
    >
      <DepoStokAyrinti />
    </Dialog>
  </section>
</template>
<script>
import service from "../service/RaporService";
import { mapGetters } from "vuex";
import DepoStokAyrinti from "../components/atlantastok/DepoStokAyrinti";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      stok_listesi: null,
      filters: {
        sku: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kod: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        po: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      stok_kutu: 0,
      stok_m2: 0,
      stok_sqft: 0,
      sea_kutu: 0,
      sea_m2: 0,
      sea_sqft: 0,
      is_form: false,
      select_depo: null,
      FormBaslik: "",
      kategori_secim: null,
      ebat_secim: null,
      loading: false,
      is_excel: false,
      result: [],
      category: [
        { name: "Travertine" },
        { name: "Marble" },
        { name: "Mosaic" },
        { name: "Limestone" },
        { name: "Baseboard" },
        { name: "Porcelain" },
        { name: "Paver" },
        { name: "Sample" },
      ],
      size: [
        { name: "12x12" },
        { name: "12x24" },
        { name: "14x14" },
        { name: "16x16" },
        { name: "16x24" },
        { name: "18x18" },
        { name: "1x2" },
        { name: "24x24" },
        { name: "2x2" },
        { name: "2x4" },
        { name: "2x6,5" },
        { name: "3x6" },
        { name: "4x12" },
        { name: "4x4" },
        { name: "60x120cm" },
        { name: "6x24" },
        { name: "6x6" },
        { name: "8x16" },
        { name: "8x18" },
        { name: "Basket" },
        { name: "Corner" },
        { name: "Diamond" },
        { name: "Mini Pattern" },
        { name: "Pattern Set" },
        { name: "Plinth" },
        { name: "Puzzle" },
        { name: "Random" },
        { name: "SPO" },
      ],
    };
  },
  components: {
    DepoStokAyrinti,
  },
  computed: {
    ...mapGetters(["servis_adres", "stok_list", "sea_list"]),
  },
  localService: null,
  created() {
    this.$store.dispatch("fullscreenLoadingAct",true);
    service.getAtlantaStokListesi().then((data) => {
      this.stok_listesi = data;
      this.stok_tum_list = data;
      this.toplam_islem(data);
      this.$store.dispatch("fullscreenLoadingAct",false);
    });
  },
  methods: {
    statuSecim(event) {
      this.result = [];
      for (var i = 0; i < event.length; i++) {
        for (let key in this.stok_tum_list) {
          const item = this.stok_tum_list[key];

          if (item.kategori == event[i].name) {
            this.result.push({ ...this.stok_tum_list[key] });
          }
        }
      }

      this.stok_listesi = this.result;
      this.result = [];
      this.toplam_islem(this.stok_listesi);
    },
    statuSecim2(event) {
      this.result = [];
      for (var i = 0; i < event.length; i++) {
        for (let key in this.stok_tum_list) {
          const item = this.stok_tum_list[key];

          if (item.ebat == event[i].name) {
            this.result.push({ ...this.stok_tum_list[key] });
          }
        }
      }

      this.stok_listesi = this.result;
      this.result = [];
      this.toplam_islem(this.stok_listesi);
    },
    item_sec(event) {
          this.$store.dispatch("fullscreenLoadingAct", true);

      this.select_depo = event.data;

      this.FormBaslik =
        "SKU : " + this.select_depo.sku + " / " + this.select_depo.tanim;

      service
        .getAtlantaStokAyrintiListesi(this.select_depo.sku)
        .then((data) => {
          this.$store.dispatch("AtlantaStatusLoadAct", data.stok_liste);
          this.$store.dispatch("AtlantaStatusLoadSeaAct", data.su_liste);
          this.$store.dispatch("AtlantaSatisAct", data.satis_liste);
          this.$store.dispatch("AtlantaMaliyetAct", data.maliyet);

          this.is_form = true;
          this.$store.dispatch("fullscreenLoadingAct", false);

        });
    },
    toplam_islem(liste) {
      this.stok_kutu = 0;
      this.stok_m2 = 0;
      this.stok_sqft = 0;
      this.sea_kutu = 0;
      this.sea_m2 = 0;
      this.sea_sqft = 0;

      for (let key in liste) {
        const item = liste[key];

        this.stok_kutu += item.stok_kutu;
        this.stok_m2 += item.stok_m2;
        this.stok_sqft += item.stok_sqft;
        this.sea_kutu += item.su_kutu;
        this.sea_m2 += item.su_m2;
        this.sea_sqft += item.su_sqft;
      }
    },
    filter_data_change(event) {
      this.toplam_islem(event.filterValue);
      return 1;
    },
    excel_cikti_click() {
      this.$store.dispatch("fullscreenLoadingAct", true);
      const data = this.stok_listesi;
      service.getAtlantaStokExcelCikti(data).then((responce) => {
        if (responce.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "raporlar/listeler/atlanta/stokExcelCikti";

          link.setAttribute("download", "/Atlanta_SM_stock.xlsx");
          document.body.appendChild(link);
          link.click();
          this.$store.dispatch("fullscreenLoadingAct", false);

        }
      });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
  font-size: 8px;
}

.p-column-filter {
  font-size: 8px;
}

.water_style {
  background-color: #00bfff;

  font-weight: bold;
}

.p-multiselect {
  width: 18rem;
}
</style>

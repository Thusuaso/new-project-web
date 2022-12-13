<template>
  <div>
    <div class="columns" style="margin-top: 10px; margin-left: 15px">
      <Dropdown
        v-model="selectedYear"
        :options="years"
        optionLabel="year"
        placeholder="Select a Year"
        @change="isSelectedYear"
      />

      <b-button
        style="width: 10px; height: 32px; margin-left: 10px"
        @click="get_nakliye_excell_cikti_btn"
        ><i class="fa-solid fa-file-excel fa-2xl"></i>
      </b-button>
    </div>

    <DataTable
      :value="nakliyeData"
      :scrollable="true"
      scrollHeight="400px"
      v-model:filters="filters"
      filterDisplay="menu"
      @filter="isNakliyeMasraflari"
    >
      <Column
        field="firma"
        header="Firma Adı"
        headerStyle="width:30%;"
        bodyStyle="text-align:center;"
      >
        <template #body="slotProps">
          {{ slotProps.data.firma }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by Customer"
          />
        </template>
      </Column>
      <Column
        field="tl"
        header="Nakliye Toplamı (₺)"
        headerStyle="width:30%;"
        bodyStyle="text-align:center;"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.tl) }}
        </template>
        <template #footer>
          {{ formatPrice(toplamTl) }}
        </template>
      </Column>
      <Column
        field="dolar"
        header="Nakliye Toplamı ($)"
        headerStyle="width:30%;"
        bodyStyle="text-align:center;"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.dolar) }}
        </template>
        <template #footer>
          {{ formatPrice(toplamDolar) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import service from "@/service/RaporService";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      nakliyeData: null,
      selectedYear: 2022,
      years: [{ year: 2022 }, { year: 2021 }, { year: 2020 }],
      topNakliyeData: null,
      toplamTl: null,
      toplamDolar: null,
      filters: {
        firma: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  computed: {
    ...mapGetters(["servis_adres"]),
  },
  methods: {
    isNakliyeMasraflari(event) {
      console.log(event.filteredValue)
      this.toplamTl = 0
      this.toplamDolar = 0
      for (let item in event.filteredValue) {
        this.toplamTl += event.filteredValue[item].tl
        this.toplamDolar += event.filteredValue[item].dolar

      }
    },

    nakliyeciData(year) {
      service.getNakliyeciDagilimi(year).then((data) => {
        this.nakliyeData = data;
        this.sum(data);
      });
    },
    sum(data) {
      this.toplamTl = 0;
      this.toplamDolar = 0;
      for (let item of data) {
        this.toplamTl += item.tl;
        this.toplamDolar += item.dolar;
      }
    },
    isSelectedYear(event) {
      this.nakliyeciData(event.value.year);
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    get_nakliye_excell_cikti_btn() {
      service.getNakliyeciDagilimiExcel(this.nakliyeData).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "islemler/listeler/nakliyeciDagilimiExcel";
          link.setAttribute("download", "nakliyeciDagilimiExcel.xlsx");
          document.body.appendChild(link);
          link.click();
          this.is_excel = false;
        }
      });
    },
  },
  created() {
    this.nakliyeciData(this.selectedYear);
    this.selectedYear = { year: 2022 };
  },
};
</script>
<style scoped></style>

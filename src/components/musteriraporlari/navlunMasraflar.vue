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
        @click="get_navlun_excell_cikti_btn"
        style="width: 10px; height: 32px; margin-left: 10px"
        ><i class="fa-solid fa-file-excel fa-2xl"></i
      ></b-button>
    </div>

    <DataTable
      :value="navlunMasraflar"
      :scrollable="true"
      scrollHeight="400px"
      v-model:filters="filters"
      filterDisplay="menu"
      @filter="isNavlunMasraflari"
    >
      <Column field="firma" header="Firma Adı" bodyStyle="text-align:center;">
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
        field="totalNavlun"
        header="Toplam Navlun ($)"
        bodyStyle="text-align:center;"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.totalNavlun) }}
        </template>
        <template #footer>
          {{ formatPrice(topNavlun) }}
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
      navlunMasraflar: null,
      selectedYear: 2022,
      years: [{ year: 2022 }, { year: 2021 }, { year: 2020 }],
      topNavlun: 0,
      filters: {
        firma: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  computed: {
    ...mapGetters(["servis_adres"]),
  },
  methods: {
    isNavlunMasraflari(event) {
      this.topNavlun = 0
      for (let item in event.filteredValue) {
        this.topNavlun += event.filteredValue[item].totalNavlun
      }
    },
    NavlunMasraflariService(year) {
      service.getNavlunMasraflar(year).then((data) => {
        this.navlunMasraflar = data;
        this.miktarTopla(data);
      });
    },
    isSelectedYear(event) {
      this.NavlunMasraflariService(event.value.year);
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    miktarTopla(data) {
      this.topNavlun = 0;
      for (let item of data) {
        this.topNavlun += item.totalNavlun;
      }
    },
    get_navlun_excell_cikti_btn() {
      service.getNavlunMasraflarExcel(this.navlunMasraflar).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "islemler/listeler/navlunMasraflarExcel";
          link.setAttribute("download", "navlunMasraflar.xlsx");
          document.body.appendChild(link);
          link.click();
          this.is_excel = false;
        }
      });
    },
  },
  created() {
    this.NavlunMasraflariService(this.selectedYear);
    this.selectedYear = { year: 2022 };
  },
};
</script>

<style scoped></style>

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

      <Button
        @click="get_mekus_excell_cikti_btn"
        icon="fa-solid fa-file-excel fa-2xl"
      />
    </div>

    <DataTable
      :value="mekusMasraflar"
      :scrollable="true"
      scrollHeight="550px"
      v-model:filters="filters"
      filterDisplay="menu"
      @filter="isMekusMasraflari"
    >
      <Column
        field="siparisNo"
        header="Sipariş No"
        bodyStyle="text-align:center;"
      >
        <template #bodyStyle="slotProps">
          {{ slotProps.data.siparisNo }}
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
        field="mekusMasraf"
        header="Mekus Masrafı ($)"
        bodyStyle="text-align:center;"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.mekusMasraf) }}
        </template>
        <template #footer>
          {{ formatPrice(topMekus) }}
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
      mekusMasraflar: null,
      selectedYear: 2022,
      years: [{ year: 2022 }, { year: 2021 }, { year: 2020 }],
      topMekus: null,
      filters: {
        siparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  computed: {
    ...mapGetters(["servis_adres"]),
  },
  methods: {
    isMekusMasraflari(event) {
      this.miktarTopla(event.filteredValue)
    },
    MekusMasraflarService(year) {
      service.getMekusMasraflar(year).then((data) => {
        this.mekusMasraflar = data;
        this.miktarTopla(data);
      });
    },
    isSelectedYear(event) {
      this.MekusMasraflarService(event.value.year);
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
      this.topMekus = 0;
      for (let item of data) {
        this.topMekus += item.mekusMasraf;
      }
    },
    get_mekus_excell_cikti_btn() {
      service.getMekusMasraflarExcel(this.mekusMasraflar).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "islemler/listeler/mekusMasraflarExcel";
          link.setAttribute("download", "mekusMasraflarExcel.xlsx");
          document.body.appendChild(link);
          link.click();
          this.is_excel = false;
        }
      });
    },
  },
  created() {
    this.MekusMasraflarService(this.selectedYear);
    this.selectedYear = { year: 2022 };
  },
};
</script>

<style scoped></style>

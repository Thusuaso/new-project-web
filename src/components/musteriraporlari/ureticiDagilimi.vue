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
        @click="get_tedarikci_excell_cikti_btn"
        style="width: 10px; height: 32px; margin-left: 10px"
        ><i class="fa-solid fa-file-excel fa-2xl"></i
      ></b-button>
    </div>

    <DataTable
      :value="ureticiDagilimi"
      :scrollable="true"
      scrollHeight="400px"
      v-model:filters="filters"
      filterDisplay="menu"
      @filter="isUreticiDagilimToplami"
    >
      <Column
        field="tedarikci"
        header="Tedarikçi"
        bodyStyle="text-align:center;"
        style="min-width: 200px"
      >
        <template #body="slotProps">
          {{ slotProps.data.tedarikci }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by Representative"
          />
        </template>
      </Column>
      <Column
        field="topUretimBedel"
        header="Toplam Üretilen Bedel ($)"
        bodyStyle="text-align:center;"
        style="min-width: 200px"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.topUretimBedel) }}
        </template>
        <template #footer>
          {{ formatPrice(topTedarikciMiktar) }}
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
      ureticiDagilimi: null,
      selectedYear: 2022,
      years: [{ year: 2022 }, { year: 2021 }, { year: 2020 }],
      topTedarikciMiktar: 0,
      filters: {
        tedarikci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  computed: {
    ...mapGetters(["servis_adres"]),
  },
  methods: {
    isUreticiDagilimToplami(event) {
      this.topTedarikciMiktar = 0
      console.log(event.filteredValue)
      for (let i in event.filteredValue) {
        this.topTedarikciMiktar += event.filteredValue[i].topUretimBedel
      }
    },
    ureticiDagilimiService(year) {
      service.getUreticiDagilimi(year).then((data) => {
        this.ureticiDagilimi = data;
        this.miktarTopla(data);
      });
    },
    isSelectedYear(event) {
      this.ureticiDagilimiService(event.value.year);
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
      this.topTedarikciMiktar = 0;
      for (let item of data) {
        this.topTedarikciMiktar += item.topUretimBedel;
      }
    },
    get_tedarikci_excell_cikti_btn() {
      service
        .get_tedarikci_list_excell_cikti(this.ureticiDagilimi)
        .then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            link.href =
              this.servis_adres + "islemler/listeler/ureticiDagilimiExcelList";
            link.setAttribute("download", "uretimTedarikciRapor.xlsx");
            document.body.appendChild(link);
            link.click();
            this.is_excel = false;
          }
        });
    },
  },
  created() {
    this.ureticiDagilimiService(this.selectedYear);
    this.selectedYear = { year: 2022 };
  },
};
</script>

<style scoped></style>

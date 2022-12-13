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

      <Button @click="get_banka_ve_evrak_masraflari_excell_cikti_btn"
        ><i class="fa-solid fa-file-excel fa-2xl"></i>
      </Button>
    </div>

    <DataTable
      :value="bankaVeEvrakMasraflar"
      :scrollable="true"
      scrollHeight="400px"
      v-model:filters="filters"
      filterDisplay="menu"
      @filter="isBankaveEvrak"
    >
      <Column
        field="musteri"
        header="Müşteri Adı"
        bodyStyle="text-align:center;"
      >
        <template #body="slotProps">
          {{ slotProps.data.musteri }}
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
        field="banka"
        header="Banka Gideri ($)"
        bodyStyle="text-align:center;"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.banka) }}
        </template>
        <template #footer>
          {{ formatPrice(topBankaMas) }}
        </template>
      </Column>
      <Column
        field="evrak"
        header="Evrak Gideri ($)"
        bodyStyle="text-align:center;"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.evrak) }}
        </template>
        <template #footer>
          {{ formatPrice(topEvrakMas) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import service from "../../service/RaporService";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      bankaVeEvrakMasraflar: null,
      selectedYear: 2022,
      years: [{ year: 2022 }, { year: 2021 }, { year: 2020 }],
      topBankaMas: null,
      topEvrakMas: null,
      filters: {
        musteri: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  computed: {
    ...mapGetters(["servis_adres"]),
  },
  methods: {
    isBankaveEvrak(event) {
      this.miktarTopla(event.filteredValue);
    },
    BankaVeEvrakMasraflarService(year) {
      service.getBankaVeEvrakMasraflar(year).then((data) => {
        this.bankaVeEvrakMasraflar = data;
        this.miktarTopla(data);
      });
    },
    isSelectedYear(event) {
      this.BankaVeEvrakMasraflarService(event.value.year);
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
      this.topBankaMas = 0;
      this.topEvrakMas = 0;
      for (let item of data) {
        this.topBankaMas += item.banka;
        this.topEvrakMas += item.evrak;
      }
    },
    get_banka_ve_evrak_masraflari_excell_cikti_btn() {
      service
        .getBankaVeEvrakMasraflarExcel(this.bankaVeEvrakMasraflar)
        .then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            link.href =
              this.servis_adres +
              "islemler/listeler/bankaVeEvrakMasraflarExcel";
            link.setAttribute("download", "bankaVeEvrakMasraflarExcel.xlsx");
            document.body.appendChild(link);
            link.click();
            this.is_excel = false;
          }
        });
    },
  },
  created() {
    this.BankaVeEvrakMasraflarService(this.selectedYear);
    this.selectedYear = { year: 2022 };
  },
};
</script>

<style scoped></style>

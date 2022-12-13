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
        @click="get_digermasraflar_excell_cikti_btn"
        style="width: 10px; height: 32px; margin-left: 10px"
        ><i class="fa-solid fa-file-excel fa-2xl"></i
      ></b-button>
    </div>

    <DataTable
      :value="digerMasraflar"
      :scrollable="true"
      scrollHeight="400px"
      v-model:filters="filters"
      filterDisplay="menu"
      @filter="isDigerMasraflar"
    >
      <Column
        field="musteriAdi"
        header="Müşteri Adı"
        :headerStyle="{ textAlign: 'center', fontSize: sizeBody + 'px' }"
        :bodyStyle="{ textAlign: 'center', fontSize: sizeBody + 'px' }"
        :footerStyle="{ fontSize: sizeBody + 'px' }"
      >
        <template #body="slotProps">
          {{ slotProps.data.musteriAdi }}
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
        field="siparisTotal"
        header="Toplam Sevk Edilen Sipariş ($)"
        :headerStyle="{ textAlign: 'center', fontSize: sizeBody + 'px' }"
        :bodyStyle="{ textAlign: 'center', fontSize: sizeBody + 'px' }"
        :footerStyle="{ fontSize: sizeBody + 'px' }"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.siparisTotal) }}
        </template>
        <template #footer>
          {{ formatPrice(topSip) }}
        </template>
      </Column>

      <Column
        field="navlunSatis"
        header="Navlun Satış ($)"
        :headerStyle="{ textAlign: 'center', fontSize: sizeBody + 'px' }"
        :bodyStyle="{ textAlign: 'center', fontSize: sizeBody + 'px' }"
        :footerStyle="{ fontSize: sizeBody + 'px' }"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.navlunSatis) }}
        </template>
        <template #footer>
          {{ formatPrice(topNavlun) }}
        </template>
      </Column>

      <Column
        field="detay_1"
        header="Detay Tutar 1 ($)"
        :headerStyle="{ textAlign: 'center', fontSize: sizeBody + 'px' }"
        :bodyStyle="{ textAlign: 'center', fontSize: sizeBody + 'px' }"
        :footerStyle="{ fontSize: sizeBody + 'px' }"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.detay_1) }}
        </template>
        <template #footer>
          {{ formatPrice(topDiger1) }}
        </template>
      </Column>

      <Column
        field="detay_2"
        header="Detay Tutar 2 ($)"
        :headerStyle="{ textAlign: 'center', fontSize: sizeBody + 'px' }"
        :bodyStyle="{ textAlign: 'center', fontSize: sizeBody + 'px' }"
        :footerStyle="{ fontSize: sizeBody + 'px' }"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.detay_2) }}
        </template>
        <template #footer>
          {{ formatPrice(topDiger2) }}
        </template>
      </Column>
      <Column
        field="detay_3"
        header="Detay Tutar 3 ($)"
        :headerStyle="{ textAlign: 'center', fontSize: sizeBody + 'px' }"
        :bodyStyle="{ textAlign: 'center', fontSize: sizeBody + 'px' }"
        :footerStyle="{ fontSize: sizeBody + 'px' }"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.detay_3) }}
        </template>
        <template #footer>
          {{ formatPrice(topDiger3) }}
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
      digerMasraflar: null,
      selectedYear: 2022,
      years: [{ year: 2022 }, { year: 2021 }, { year: 2020 }],
      topSip: null,
      topNavlun: null,
      topDiger1: null,
      topDiger2: null,
      topDiger3: null,
      sizeBody: null,
      filters: {
        musteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  computed: {
    ...mapGetters(["servis_adres"]),
  },
  methods: {
    isDigerMasraflar(event) {
      this.miktarTopla(event.filteredValue)
    },
    digerMasraflarService(year) {
      service.getDigerMasraflar(year).then((data) => {
        this.digerMasraflar = data;
        this.miktarTopla(data);
      });
    },
    isSelectedYear(event) {
      this.digerMasraflarService(event.value.year);
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
      this.topSip = 0;
      this.topNavlun = 0;
      this.topDiger1 = 0;
      this.topDiger2 = 0;
      this.topDiger3 = 0;
      for (let item of data) {
        this.topSip += item.siparisTotal;
        this.topNavlun += item.navlunSatis;
        this.topDiger1 += item.detay_1;
        this.topDiger2 += item.detay_2;
        this.topDiger3 += item.detay_3;
      }
    },
    get_digermasraflar_excell_cikti_btn() {
      service.getDigerMasraflarExcel(this.digerMasraflar).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "islemler/listeler/digerMasraflarExcel";
          link.setAttribute("download", "digerMasraflarExcel.xlsx");
          document.body.appendChild(link);
          link.click();
          this.is_excel = false;
        }
      });
    },
  },
  created() {
    this.digerMasraflarService(this.selectedYear);
    this.selectedYear = { year: 2022 };

    const width = window.innerWidth;
    if (width >= 500) {
      this.sizeBody = 9;
    }
  },
};
</script>

<style scoped></style>

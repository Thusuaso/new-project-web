<template>
  <div>
    <Dropdown
      v-model="selectedYear"
      :options="years"
      optionLabel="year"
      placeholder="Select a Year"
      @change="isDropdownChange"
    />
    <div class="card">
      <h2 style="text-align: center">Ülkeye Göre Müşteri Listesi</h2>
      <DataTable
        :value="ulkeye_gore_musteriler"
        scrollable
        scrollHeight="550px"
        @row-select="isRowSelected"
        selectionMode="single"
        dataKey="ulkeId"
        v-model:filters="filters1"
        filterDisplay="row"
        :loading="$store.getters.datatableLoading"
      >
        <Column
          field="ulkeAdi"
          style="min-width: '200px'"
          :showFilterMenu="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.ulkeAdi }}
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
          field="siparisSayisi"
          header="Sipariş Sayısı"
          style="min-width: '200px'"
        ></Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="is_form"
      :modal="true"
      header="Ülkeye Göre Müşteri Ayrıntı"
      maximizable
      position="top"
      :breakpoints="{'960px': '75vw', '640px': '100vw'}" 
      :style="{width: '100vw'}"
    >
      <div class="columns">
        <div class="column is-6">
          <h2 style="text-align: center">
            Ülkeye Göre Müşteri Listesi Yüklenmemiş
          </h2>
          <DataTable
            :value="ulkeye_gore_musteriler_ayrinti_sip"
            scrollable
            scrollHeight="450px"
            :resizableColumns="true" 
            columnResizeMode="fit" 
            showGridlines 
            responsiveLayout="scroll"
          >
            <Column
              field="siparisTarihi"
              header="Sipariş Tarihi"
              style="min-width: '200px'"
            ></Column>
            <Column
              field="siparisNo"
              header="Sipariş No"
              style="min-width: '200px'"
            >
              <template #body="slotProps">
                {{ slotProps.data.siparisNo }}
              </template>
              <template #footer>
                {{ ulkeye_gore_musteriler_ayrinti_sip.length }}
              </template>
            </Column>
            <Column
              field="firmaAdi"
              header="Firma Adı"
              style="min-width: '200px'"
            ></Column>
          </DataTable>
        </div>
        <div class="column is-6">
          <h2 style="text-align: center">
            Ülkeye Göre Müşteri Listesi Yüklenmiş
          </h2>
          <DataTable
            :value="ulkeye_gore_musteriler_ayrinti_yuk"
            scrollable
            scrollHeight="450px"
            :resizableColumns="true" 
            columnResizeMode="fit" 
            showGridlines 
            responsiveLayout="scroll"
          >
            <Column
              field="siparisTarihi"
              header="Sipariş Tarihi"
              style="min-width: '200px'"
            ></Column>
            <Column
              field="siparisNo"
              header="Sipariş No"
              style="min-width: '200px'"
            >
              <template #body="slotProps">
                {{ slotProps.data.siparisNo }}
              </template>
              <template #footer>
                {{ ulkeye_gore_musteriler_ayrinti_yuk.length }}
              </template>
            </Column>
            <Column
              field="firmaAdi"
              header="Firma Adı"
              style="min-width: '200px'"
            ></Column>
            <Column
              field="yuklemeTarihi"
              header="Yükleme Tarihi"
              style="min-width: '200px'"
            ></Column>
          </DataTable>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import MusteriService from "../service/MusteriService";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      is_form: false,
      filters1: {
        ulkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      service: null,
      selectedYear: { year: 2022 },
      ulkeyeGoreData: null,
      years: [{ year: 2022 }, { year: 2021 }, { year: 2020 }, { year: 2019 }],
    };
  },
  computed: {
    ...mapGetters([
      "ulkeye_gore_musteriler",
      "ulkeye_gore_musteriler_ayrinti_sip",
      "ulkeye_gore_musteriler_ayrinti_yuk",
    ]),
  },
  created() {
    this.service = new MusteriService();
    this.$store.dispatch("datatableLoadingBeginAct");
    this.$store.dispatch("loadingBeginAct");
    this.service.getUlkeyeGoreMusteriList(2022).then((data) => {
      this.$store.dispatch("ulkeye_gore_musteriler_act", data);
      this.$store.dispatch("datatableLoadingEndAct");
      this.$store.dispatch("loadingEndAct");
    });
  },
  methods: {
    isRowSelected(event) {
      this.$store.dispatch("datatableLoadingBeginAct");
      this.service
        .getUlkeyeGoreMusteriListAyrinti(
          this.selectedYear.year,
          event.data.ulkeId
        )
        .then((data) => {
          this.$store.dispatch("ulkeye_gore_musteriler_ayrinti_act", data);
          this.$store.dispatch("datatableLoadingEndAct");
          this.is_form = true;
        });
    },
    isDropdownChange(event) {
      this.$store.dispatch("datatableLoadingBeginAct");
      this.service.getUlkeyeGoreMusteriList(event.value.year).then((data) => {
        this.$store.dispatch("ulkeye_gore_musteriler_act", data);
        this.$store.dispatch("datatableLoadingEndAct");
      });
    },
  },
};
</script>

<style scoped></style>

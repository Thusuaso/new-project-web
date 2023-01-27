<template>
  <div style="width: 100%; height: 700px">
    <DataTable
      :value="bgpProjectStatistics"
      responsiveLayout="scroll"
      :selected="isSelectedDetail"
      selectionMode="single"
      dataKey="id"
      @row-select="statisticsDetail"
    >
      <Column
        field="ulkeAdi"
        header="Ülke Adı"
        :sortable="true"
        bodyStyle="text-align:left;"
      >
        <template #footer>
          <b>Toplam: </b>
        </template>
      </Column>
      <Column
        field="wrongNumber"
        header="Yanlış Numara"
        :sortable="true"
        bodyStyle="text-align:left;"
      >
        <template #footer>
          {{ bgpProjectStatisticsDetailSum.wrongNumber }}
        </template>
      </Column>
      <Column
        field="notResponse"
        header="Cevap Yok"
        :sortable="true"
        bodyStyle="text-align:left;"
      >
        <template #footer>
          {{ bgpProjectStatisticsDetailSum.notResponse }}
        </template>
      </Column>
      <Column
        field="notInterested"
        header="İlgilenmiyor"
        :sortable="true"
        bodyStyle="text-align:left;"
      >
        <template #footer>
          {{ bgpProjectStatisticsDetailSum.notInterested }}
        </template>
      </Column>
      <Column
        field="interested"
        header="İlgili"
        :sortable="true"
        bodyStyle="text-align:left;"
      >
        <template #footer>
          {{ bgpProjectStatisticsDetailSum.interested }}
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="statistics_detail"
      :header="ulkeAdi"
      maximizable
      :modal="true"
      position="top"
      
    >
      <DataTable :value="bgpProjectStatisticsDetail" responsiveLayout="scroll" v-model:filters="filters" filterDisplay="row">
        <Column
          field="projectName"
          header="Proje Adı"
          :showFilterMenu="false"
        > <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
            :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'" />
        </template></Column>
        <Column field="firmaAdi" header="Firma Adı" :showFilterMenu="false">
          <template #filter="{filterModel,filterCallback}">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'" />
          </template>
        </Column>
        <Column field="baslik" header="Başlık" ></Column>
        <Column field="aciklama" header="Açıklama" ></Column>
        <Column field="temsilciAdi" header="Temsilci" :showFilterMenu="false">
          <template #filter="{filterModel,filterCallback}">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'" />
          </template>
        </Column>
        <Column field="wrongNumber" header="Yanlış Numara" :sortable="true">
          <template #body="slotProps">
            <div v-if="slotProps.data.wrongNumber">✓</div>
            <div v-else>X</div>
          </template>
        </Column>
        <Column field="notResponse" header="Cevap Yok" :sortable="true">
          <template #body="slotProps">
            <div v-if="slotProps.data.notResponse">✓</div>
            <div v-else>X</div>
          </template>
        </Column>
        <Column field="notInterested" header="İlgilenmiyor" :sortable="true">
          <template #body="slotProps">
            <div v-if="slotProps.data.notInterested">✓</div>
            <div v-else>X</div>
          </template>
        </Column>
        <Column field="interested" header="İlgili" :sortable="true">
          <template #body="slotProps">
            <div v-if="slotProps.data.interested">✓</div>
            <div v-else>X</div>
          </template>
        </Column>
      </DataTable>
    </Dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import bgpService from "@/service/BgpProjectService";
import { FilterMatchMode } from 'primevue/api';
export default {
  computed: {
    ...mapGetters([
      "bgpProjectStatistics",
      "bgpProjectStatisticsDetail",
      "bgpProjectStatisticsDetailSum",
    ]),
  },
  data() {
    return {
      isSelectedDetail: null,
      statistics_detail: false,
      ulkeAdi: "",
      filters: {
        firmaAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        temsilciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        projectName: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
      },
    };
  },
  methods: {
    statisticsDetail(event) {
      bgpService
        .getBgpProjectCountryStatisticDetail(event.data.ulkeAdi)
        .then((data) => {
          this.$store.dispatch(
            "bgp_projects_statistics_detail_load",
            data.result
          ),
            (this.ulkeAdi = event.data.ulkeAdi);
          this.statistics_detail = true;
        });
    },
  },
};
</script>

<style scoped></style>

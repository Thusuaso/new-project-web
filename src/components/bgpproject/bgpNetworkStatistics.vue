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
      <DataTable :value="bgpProjectStatisticsDetail" responsiveLayout="scroll">
        <Column
          field="projectName"
          header="Proje Adı"
          :sortable="true"
        ></Column>
        <Column field="firmaAdi" header="Firma Adı" :sortable="true"></Column>
        <Column field="baslik" header="Başlık" :sortable="true"></Column>
        <Column field="aciklama" header="Açıklama" :sortable="true"></Column>
        <Column field="temsilci" header="Temsilci" :sortable="true"></Column>
        <Column field="wrongNumber" header="W.N" :sortable="true">
          <template #body="slotProps">
            <div v-if="slotProps.data.wrongNumber">✓</div>
            <div v-else>X</div>
          </template>
        </Column>
        <Column field="notResponse" header="N.R" :sortable="true">
          <template #body="slotProps">
            <div v-if="slotProps.data.notResponse">✓</div>
            <div v-else>X</div>
          </template>
        </Column>
        <Column field="notInterested" header="N.I" :sortable="true">
          <template #body="slotProps">
            <div v-if="slotProps.data.notInterested">✓</div>
            <div v-else>X</div>
          </template>
        </Column>
        <Column field="interested" header="I" :sortable="true">
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

<template>
  <div>
    <div class="container" style="height: 800px">
      <div class="columns" style="height: 800px">
        <div class="column is-12">
          <DataTable :value="odemelerAyrintiList" responsiveLayout="scroll">
            <Column
              field="tarih"
              header="Ödenen Tarih"
              bodyStyle="text-align:center;"
            >
              <template #body="slotProps">
                {{ slotProps.data.tarih }}
              </template>
            </Column>
            <Column field="po" header="PO" bodyStyle="text-align:center;">
              <template #body="slotProps">
                {{ slotProps.data.po }}
              </template>
            </Column>
            <Column
              field="odenenTutar"
              header="Ödenen Tutar"
              bodyStyle="text-align:center;"
            >
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.odenenTutar) }}
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/service/FinansService";
export default {
  props: ["musteriId", "musteriAdi"],
  data() {
    return {
      odemelerAyrintiList: null,
      filters: {},
    };
  },
  created() {
    service.getOdemelerAyrintiTablosu(this.musteriId).then((data) => {
      this.odemelerAyrintiList = data;
      console.log(data);
    });
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
<style scoped></style>

<template>
  <div>
    <DataTable
      :value="odemeler"
      responsiveLayout="scroll"
      @row-select="isSelectedRow"
      selectionMode="single"
    >
      <Column field="musteri_adi" header="Müşteri Adı">
        <template #body="slotProps">
          {{ slotProps.data.musteri_adi }}
        </template>

      </Column>
      <Column
        field="tutar"
        header="Ödenen Toplam"
        bodyStyle="text-align:center;"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.tutar) }}
        </template>
      </Column>
    </DataTable>
    <Dialog
      v-model:visible="isSelected"
      :modal="true"
      v-model:header="musteriAdi"
      maximizable
      position="top"
    >
      <section>
        <OdemelerFinans
          :musteriAdi="musteriAdi"
          :musteriId="musteriId"
        ></OdemelerFinans>
      </section>
    </Dialog>
  </div>
</template>

<script>
import service from "@/service/FinansService";
import OdemelerFinans from "./OdemelerFinansAyrintiListesi.vue";
export default {
  components: {
    OdemelerFinans,
  },
  data() {
    return {
      odemeler: null,
      isSelected: false,
      musteriId: "",
      musteriAdi: "",
      filters: {},
    };
  },
  created() {
        this.$store.dispatch('fullscreenLoadingAct', true)

    service.getOdemelerTablosu().then((data) => {
      this.odemeler = data;
        this.$store.dispatch('fullscreenLoadingAct', false)

    });
  },
  methods: {
    isSelectedRow(event) {
      this.isSelected = true;
      this.musteriId = event.data.Id;
      this.musteriAdi = event.data.musteri_adi;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
<style scoped></style>

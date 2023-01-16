<template>
    <div class="columns">
      <div class="column is-12">
        <DataTable
          :value="siparis_ozet_ayrinti"
          :scrollable="true"
          scrollHeight="450px"
          selection="selectedProduct"
          selectionMode="single"
          dataKey="id"
          @row-select="is_sip_selected"
        >
          <Column
            field="SiparisNo"
            header="Siparis No"
            headerStyle="width:5px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.SiparisNo }}
            </template>
          </Column>
          <Column
            field="Satisci"
            header="Satisci"
            headerStyle="width:3px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.Satisci }}
            </template>
          </Column>

          <Column
            field="Operasyon"
            header="Operasyon"
            headerStyle="width:3px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.Operasyon }}
            </template>
          </Column>
        </DataTable>
      </div>
      <Dialog
        v-model:visible="customer_product_form"
        :modal="true"
        :header="siparisNo"
        maximizable
        position="top"
      >
        <MusteriDetaySipListesi></MusteriDetaySipListesi>
      </Dialog>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import service from "@/service/MusteriIslemService";
import MusteriDetaySipListesi from "./MusteriDetaySipListesi.vue";
export default {
  components: {
    MusteriDetaySipListesi,
  },
  data() {
    return {
      selectedProduct: "",
      customer_product_form: false,
      siparisNo: "",
    };
  },

  computed: {
    ...mapGetters(["siparis_ozet_ayrinti"]),
  },
  props: ["urunid"],

  methods: {
    is_sip_selected(event) {
      this.siparisNo = event.data.SiparisNo;
      service.getProductDetailList(event.data.SiparisNo).then((data) => {
        this.$store.dispatch("customer_product_detail_list_act", data);
        this.customer_product_form = true;
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.p-datatable {
  font-size: 10px;
}
.p-column-filter {
  font-size: 10px;
}
.page-button {
  margin-top: 25px;
}
.page-button-excell {
  margin-left: -100px;
}
</style>

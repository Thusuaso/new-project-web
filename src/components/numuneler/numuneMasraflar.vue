<template>
  <section>
    <div class="columns">
      <div class="column">
        <DataTable
          :value="depo_ayrinti_list"
          :scrollable="true"
          scrollHeight="450px"
          dataKey="id"
          :resizableColumns="true"
          columnResizeMode="fit" 
          showGridlines 
          responsiveLayout="scroll"
        >
          <Column
            field="orderno"
            header="Order"
            bodyStyle="text-align:center; "
          >
            <template #body="slotProps">
              {{ slotProps.data.orderno }}
            </template>
          </Column>

          <Column
            field="kuryeAlis"
            header="USD-Alış"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.kuryeAlis) }}
            </template>
          </Column>
          <Column
            field="kuryeSatis"
            header="USD-Satış"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.kuryeSatis) }}
            </template>
          </Column>
          <Column
            field="TL_Alis"
            header="TL-Alış"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPriceTL(slotProps.data.TL_Alis) }}
            </template>
          </Column>
          <Column
            field="TL_Satis"
            header="TL-Satış"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPriceTL(slotProps.data.TL_Satis) }}
            </template>
          </Column>
          <Column
            field="Euro_Alis"
            header="EUR-Alış"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPriceEuro(slotProps.data.Euro_Alis) }}
            </template>
          </Column>
          <Column
            field="Euro_Satis"
            header="EUR-Satış"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPriceEuro(slotProps.data.Euro_Satis) }}
            </template>
          </Column>
          <Column
            field="odeme"
            header="Ödeme Tipi"
            bodyStyle="text-align:center; "
          >
            <template #body="slotProps">
              {{ slotProps.data.odeme }}
            </template>
          </Column>
          <template #footer> </template>
        </DataTable>
      </div>
    </div>
  </section>
</template>
<script>
import service from "@/service/NumuneService";

export default {
  props: {
    select_depo: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      depo_ayrinti_list: null,
      select: null,
      is_tahsilat_form: false,
    };
  },
  created() {
    service.getNumuneFinansAyrintiListesi(this.select_depo).then((data) => {
      this.depo_ayrinti_list = data.ayrinti_list;
    });
  },
  methods: {
    formatPriceTL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");

      return "₺" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatPriceEuro(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");

      return "€" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    tahsilat_form_ac(event) {
      service
        .getNumuneMusteriTahsilatListe(
          event.data.musteri_id,
          event.data.orderno
        )
        .then((data) => {
          const result_data = data;
          result_data.musteri_data.bakiye = event.data.bakiye;

          this.$store.dispatch("numunetahsilatLoadAct", result_data);
          this.ayrinti_loading = false;
          this.is_tahsilat_form = true;
        });
    },
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 12px;
}
</style>

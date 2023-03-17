<template>
    <br/>
    <div class="grid">
      <div class="col">
        <DataTable :value="list">
          <template #header>
            <div class="columns is-multiline">
              <div class="column">
                <span style="font-size: 15px"> Vadeli Alacaklar Listesi </span>
              </div>
            </div>
          </template>
          <Column field="firmaAdi" header="Müşteri">
            <template #body="slotProps">
              {{ slotProps.data.firmaAdi }}
            </template>
          </Column>
        
          <Column field="siparis_no" header="PO" bodyStyle="text-align:center;">
            <template #body="slotProps">
              {{ slotProps.data.siparis_no }}
            </template>
          </Column>
          <Column field="vade_tarih" header="Vade Tarihi" bodyStyle="text-align:center;">
            <template #body="slotProps">
              {{ slotProps.data.vade_tarih }}
            </template>
          </Column>
          <Column field="tutar" header="Tutar" bodyStyle="text-align:center;">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.tutar) }}
            </template>
            <template #footer>
              {{ formatPrice(toplam_vade) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

</template>
<script>
import service from "../../service/FinansService";

export default {
  data() {
    return {
      select_depo: null,
      loading: false,
      is_form: false,
      list: "",
      toplam_vade: 0,
    };
  },
  created() {
    
    service.getVadeListesi().then((data) => {
      this.list = data;
      for (let key in this.list) {
        const item = this.list[key];

        this.toplam_vade += item.tutar;
      }
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

<style scoped>
.p-datatable {
  font-size: 10px;
}
</style>

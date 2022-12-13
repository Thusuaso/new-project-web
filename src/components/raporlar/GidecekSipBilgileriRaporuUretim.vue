<template>
  <div class="columns">
    <div class="column">
      <Button
        @click="excel_cikti_click"
        label="Excel"
        class="p-button-success"
      />
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <DataTable :value="products">
        <template #header> Sipariş Kalan Bilgisi Tablosu </template>
        <Column field="kategori" header="Kategori"> </Column>
        <Column field="urunAdi" header="Ürün Adı"> </Column>
        <Column field="yuzey" header="Yüzey"> </Column>
        <Column field="boyut" header="EnxBoyxKenar">
          <template #body="slotProps">
            {{ slotProps.data.boyut }}
          </template>
        </Column>
        <Column field="miktar" header="Miktar">
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.miktar) }}
          </template>
        </Column>
        <Column field="birim" header="Birim">
          <template #body="slotProps">
            <div :style="{ backgroundColor: slotProps.data.birimBackground }">
              {{ slotProps.data.birim }}
            </div>
          </template>
        </Column>
        <Column field="uretimMiktari" header="Üretim Miktarı">
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.uretimMiktari) }}
          </template>
        </Column>
        <Column field="uretimAdet" header="Üretim Adet"> </Column>
        <Column field="kalanBilgisi" header="Kalan Bilgisi">
          <template #body="slotProps">
            <div
              :style="{
                backgroundColor: slotProps.data.kalanRenk,
                color: slotProps.data.fontColor,
              }"
            >
              {{ slotProps.data.kalanBilgisi }}
            </div>
          </template>
        </Column>
        <Column field="kalanMiktar" header="Kalan Miktar">
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.kalanMiktar) }}
          </template>
        </Column>

        <Column field="kalanAdet" header="Kalan Adet">
          <template #body="slotProps">
            {{ slotProps.data.kalanAdet }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import service from "../../service/RaporService";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["servis_adres"]),
  },
  props: ["selectOrderNo"],
  data() {
    return {
      selectedPo: null,

      products: null,
      filteredOrders: [],
    };
  },

  created() {
    service.getOrder(this.selectOrderNo).then((data) => {
      this.products = data;
    });
  },
  methods: {
    excel_cikti_click() {
      service.getSipKalanExcell(this.products).then((responce) => {
        if (responce.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "raporlar/listeler/sipKalanListesiExcell";
          link.setAttribute("download", "sipKalanListesiExcell.xlsx");
          document.body.appendChild(link);
          link.click();
          this.loading = false;
          this.is_excel = false;
        }
      });
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    poChangeEvent(event) {
      setTimeout(() => {
        let result;

        if (event.query.length == 0) result = [...this.orders];
        else {
          result = this.orders.filter((x) => {
            return x.siparisNo
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filteredOrders = result;
      }, 250);
    },
  },
};
</script>
<style scoped>
.isMobile {
  word-break: break-all;
}
</style>

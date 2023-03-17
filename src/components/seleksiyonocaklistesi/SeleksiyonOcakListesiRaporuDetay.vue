<template>
  <section>
    <div class="column is-12">
      <DataTable :value="ocak_list">
        <template #header>
          <div class="columns is-multiline">
            <div class="column is-12">
              <span style="font-size: 15px">Ocak Listesi Sevkiyat</span>
            </div>
          </div>
        </template>
        <Column
          field="kasano"
          header="Kasa No"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.kasano }}
          </template>
        </Column>
        <Column
          field="tarih"
          header="Tarih"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.tarih }}
          </template>
        </Column>
        <Column
          field="ocakAdi"
          header="Ocak Adı"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;background-color:#8AFF8A;"
        >
          <template #body="slotProps">
            <span style="color: #007500; font-weight: bold">{{
              slotProps.data.ocakAdi
            }}</span>
          </template>
        </Column>

        <Column
          field="adet"
          header="Adet"
          headerStyle="width:15px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.adet }}
          </template>
        </Column>
        <Column
          field="mt2"
          header="MT2"
          headerStyle="width:15px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.mt2 }}
          </template>
          <template #footer>
            {{ formatDecimal(toplam_toplam_bedel_sevk) }}
          </template>
        </Column>
        <Column
          field="cikisno"
          header="Çıkış No"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.cikisno }}
          </template>
        </Column>
        <Column
          field="kategori"
          header="Kategori"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.kategori }}
          </template>
        </Column>
        <Column
          field="urunadi"
          header="Ürün Adı"
          headerStyle="width:25px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.urunadi }}
          </template>
        </Column>

        <Column
          field="yuzeyislem"
          header="Yüzey Adı"
          headerStyle="width:25px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.yuzeyislem }}
          </template>
        </Column>
        <Column
          field="en"
          header="En"
          headerStyle="width:15px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.en }}
          </template>
        </Column>
        <Column
          field="boy"
          header="Boy"
          headerStyle="width:15px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.boy }}
          </template>
        </Column>
        <Column
          field="kenar"
          header="Kenar"
          headerStyle="width:15px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.kenar }}
          </template>
        </Column>
      </DataTable>
    </div>

    <div class="column is-12">
      <DataTable :value="ocak_list_uretim">
        <template #header>
          <div class="columns is-multiline">
            <div class="column is-12">
              <span style="font-size: 15px">Ocak Listesi Üretim</span>
            </div>
          </div>
        </template>
        <Column
          field="kasano"
          header="Kasa No"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.kasano }}
          </template>
        </Column>
        <Column
          field="tarih"
          header="Tarih"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.tarih }}
          </template>
        </Column>
        <Column
          field="ocakAdi"
          header="Ocak Adı"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;background-color:#8AFF8A;"
        >
          <template #body="slotProps">
            <span style="color: #007500; font-weight: bold">{{
              slotProps.data.ocakAdi
            }}</span>
          </template>
        </Column>

        <Column
          field="adet"
          header="Adet"
          headerStyle="width:15px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.adet }}
          </template>
        </Column>
        <Column
          field="mt2"
          header="MT2"
          headerStyle="width:15px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.mt2 }}
          </template>
          <template #footer>
            {{ formatDecimal(toplam_toplam_bedel_urt) }}
          </template>
        </Column>
        <Column
          field="cikisno"
          header="Açıklama"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.cikisno }}
          </template>
        </Column>
        <Column
          field="kategori"
          header="Kategori"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.kategori }}
          </template>
        </Column>
        <Column
          field="urunadi"
          header="Ürün Adı"
          headerStyle="width:25px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.urunadi }}
          </template>
        </Column>
        <Column
          field="yuzeyislem"
          header="Yüzey Adı"
          headerStyle="width:25px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.yuzeyislem }}
          </template>
        </Column>

        <Column
          field="en"
          header="En"
          headerStyle="width:15px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.en }}
          </template>
        </Column>
        <Column
          field="boy"
          header="Boy"
          headerStyle="width:15px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.boy }}
          </template>
        </Column>
        <Column
          field="kenar"
          header="Kenar"
          headerStyle="width:15px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.kenar }}
          </template>
        </Column>
      </DataTable>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import service from "../../service/RaporService";

export default {
  computed: {
    ...mapGetters(["ocak_data"]),
  },
  data() {
    return {
      ocak_list: null,
      ocak_list_uretim: null,
      toplam_toplam_bedel_sevk: 0,
      toplam_toplam_bedel_urt: 0,
    };
  },
  created() {
      this.$store.dispatch("fullscreenLoadingAct", true);

    this.ocakAdi = this.ocak_data.ocakAdi;
    service.getOcakListesiDetaylari(this.ocakAdi).then((data) => {
      this.ocak_list = data.ocakDetay;
      this.ocak_list_uretim = data.ocakDetayUretim;

      for (let val in this.ocak_list) {
        this.toplam_toplam_bedel_sevk += this.ocak_list[val].mt2;
      }
      for (let val in this.ocak_list_uretim) {
        this.toplam_toplam_bedel_urt += this.ocak_list_uretim[val].mt2;
      }
          this.$store.dispatch("fullscreenLoadingAct", false);

    });
  },

  methods: {
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
<style scoped>
.input-css {
  text-align: center;
}
.p-datatable {
  font-size: 9px;
}
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>

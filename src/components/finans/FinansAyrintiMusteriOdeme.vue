<template>
  <section>
    <div class="columns is-multiline">
      <div class="column is-12">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h2 class="has-text-centered has-text-weight-semibold">
              Ödeme Ayrıntı
            </h2>
          </div>
          <div class="column is-12">
            <DataTable
              :value="finans_odeme_secim_list"
              :scrollable="true"
              scrollHeight="350%"
              selectionMode="single"
            >
              <Column
                field="sira"
                header="#"
                headerStyle="width:5%"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.sira }}
                </template>
              </Column>
              <Column
                field="siparisno"
                header="Sipariş No"
                headerStyle="width:13%"
              >
                <template #body="slotProps">
                  {{ slotProps.data.siparisno }}
                </template>
              </Column>
              <Column
                field="faturatur"
                header="Fatura Türü"
                headerStyle="width:10%"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.faturatur }}
                </template>
              </Column>
              <Column field="aciklama" header="Not" headerStyle="width:25%">
                <template #body="slotProps">
                  {{ slotProps.data.aciklama }}
                </template>
              </Column>
              <Column
                field="tutar"
                header="Tutar"
                headerStyle="background-color:#7aa998;width:10%"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.tutar) }}
                </template>
                <template #footer>
                  {{ formatPrice(finans_odeme_secim_toplam) }}
                </template>
              </Column>
              <Column
                field="masraf"
                header="Masraf"
                headerStyle="width:10%"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.masraf) }}
                </template>
              </Column>
              <Column
                field="kur"
                header="Kur"
                headerStyle="width:10%"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.kur }}
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import service from "../../service/FinansService";
import socket from "../../service/SocketService";
export default {
  created() {
    socket.siparis.on("tahsilat_kayitdegisim_emit", () => {
      this.secim_loading = true;
      this.ayrinti_loading = true;
      this.odeme_loading = true;

      let musteri_id = this.finans_ayrinti_list[0].musteri_id;
      service.getFinansAyrintiListYukle(musteri_id).then((data) => {
        this.$store.dispatch("finansAyrintiListYukleAct", data);
        this.secim_loading = false;
        this.ayrinti_loading = false;
        this.odeme_loading = false;
      });
    });
  },
  data() {
    return {
      filters: {},
      select_ayrinti: null,
      select_odeme: null,
      secim_loading: false,
      is_tahsilat: true,
      ayrinti_loading: false,
      is_tahsilat_form: false,
      tahsilat_form_baslik: "",
      siparisno: "",
      odeme_loading: false,
      excel_cikti: "ayrinti_listesi",
    };
  },
  computed: {
    ...mapGetters([
      "finans_ayrinti_list",
      "finans_ayrinti_kalan_toplam",
      "finans_ayrinti_odeme_list",
      "finans_ayrinti_odeme_toplam",
      "finans_odeme_secim_toplam",
      "finans_odeme_secim_list",
      "servis_adres",
    ]),
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

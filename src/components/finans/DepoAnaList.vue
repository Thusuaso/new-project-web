<template>
    <div class="grid">
      <div class="col">
        <DataTable :value="depo_ana_list" selectionMode="single" v-model:selection="select_depo" dataKey="id"
          @row-select="depo_item_sec($event)">
          <template #header>
            <span style="font-size: 15px"> Atlanta SM Alacak Listesi </span>
          </template>
          <Column field="musteriadi" header="Müşteri">
            <template #body="slotProps">
              {{ slotProps.data.musteriadi }}
            </template>
          </Column>
          <Column field="ciro" header="Satış Tutar" bodyStyle="text-align:center;">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ciro) }}
            </template>
            <template #footer>
              {{ formatPrice(depo_ana_toplam_ciro) }}
            </template>
          </Column>
          <Column field="odenen" header="Ödenen" headerStyle="background-color:#7aa998;color:black"
            bodyStyle="text-align:center;">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.odenen) }}
            </template>
            <template #footer>
              {{ formatPrice(depo_ana_toplam_odenen) }}
            </template>
          </Column>
          <Column field="bakiye" header="Genel Bakiye" bodyStyle="text-align:center; font-weight:bold;">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.bakiye) }}
            </template>
            <template #footer>
              {{ formatPrice(depo_ana_toplam_bakiye) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <Dialog v-model:visible="is_form" v-model:header="form_baslik" maximizable :modal="true" position="top">
        <DepoAyrintiList />
    </Dialog>
</template>
<script>
import { mapGetters } from "vuex";
import service from "../../service/FinansService";
import DepoAyrintiList from "./DepoAyrintiList";
export default {
  components: {
    DepoAyrintiList,
  },
  data() {
    return {
      select_depo: null,
      loading: false,
      is_form: false,
      form_baslik: "",
    };
  },
  computed: {
    ...mapGetters([
      "depo_ana_list",
      "depo_ana_toplam_ciro",
      "depo_ana_toplam_odenen",
      "depo_ana_toplam_bakiye",
    ]),
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    depo_item_sec(event) {
      
      this.select_depo = event.data;
      this.$store.dispatch('fullscreenLoadingAct',true)
      service.getDepoAyrintiListesi(event.data.id).then((data) => {
        this.$store.dispatch("depo_ayrinti_list_yukle_act", data);
        this.form_baslik = event.data.musteriadi + " Borç Alacak Listesi";
        this.is_form = true;
        this.$store.dispatch('fullscreenLoadingAct',false)

      });
    },
  },
};
</script>

<style scoped>
.p-datatable {
  font-size: 10px;
}
</style>

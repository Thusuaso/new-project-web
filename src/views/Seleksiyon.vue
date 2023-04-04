<template>
  <div style="margin-left:-25px;">
     <SeleksiyonIslem />
     <div class="grid">
      <div class="row">
      <UretimListe />

      </div>
     </div>
  </div>
       
</template>
<script>
import UretimListe from "../components/seleksiyon/UretimListe";
import SeleksiyonIslem from "../components/seleksiyon/SeleksiyonIslem";
import { mapGetters } from "vuex";
import seleksiyonService from "../service/SeleksiyonService";
import urunKartService from "../service/UrunKartService";
import store from "@/store";
export default {
  components: {
    UretimListe,
    SeleksiyonIslem,
  },
  computed: {
    ...mapGetters(["slk_form"]),

    is_form: {
      get: () => {
        return this.slk_form;
      },
      set: () => {
        !this.slk_form
          ? this.$store.dispatch("seleksiyonFormAcActions")
          : this.$store.dispatch("seleksiyonFormKapatActions");
      },
    },
  },

  methods: {
    baslangicIslemler() {},
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    store.dispatch("fullscreenLoadingAct",true);
    urunKartService
      .getUrunKartMenuList()
      .then((data) => {
        store.dispatch("isUrunKartLoad");
        store.dispatch("urunKartMenuAct", data);
      })
      .then(() => {
        seleksiyonService.getUretimList().then((data) => {
          store.dispatch("loadUretimList", data);
          store.dispatch("fullscreenLoadingAct",false);

          next();
        });
      });
  },
};
</script>

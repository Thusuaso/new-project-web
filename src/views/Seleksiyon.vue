<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <SeleksiyonIslem />
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <UretimListe />
      </div>
    </div>
  </section>
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
    store.dispatch("loadingBeginAct");
    urunKartService
      .getUrunKartMenuList()
      .then((data) => {
        store.dispatch("isUrunKartLoad");
        store.dispatch("urunKartMenuAct", data);
      })
      .then(() => {
        seleksiyonService.getUretimList().then((data) => {
          store.dispatch("loadUretimList", data);
          store.dispatch("loadingEndAct");

          next();
        });
      });
  },
};
</script>

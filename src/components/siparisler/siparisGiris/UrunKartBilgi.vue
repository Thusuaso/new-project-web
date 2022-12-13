<template>
  <div>
    <Card>
      <template #content>
        <div class="columns is-gapless">
          <div class="column is-12">
            <span class="p-float-label">
              <InputText
                class="urunKartInputText"
                :disabled="dis_urun_giris"
                id="urunid"
                type="text"
                v-model="getSiparisUrunKart.id"
              />
              <label for="input">Ürün Kod</label>
            </span>
          </div>
          <div class="column">
            <Button
              style="margin-left: -35px"
              :disabled="dis_urun_giris"
              icon="pi pi-plus"
              @click="urunKartShow"
            />
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <span class="p-float-label">
              <InputText
                class="urunKartInputText"
                id="kategoriAdi"
                type="text"
                v-model="getSiparisUrunKart.kategoriAdi"
                disabled
              />
              <label for="input">Kategori Adı </label>
            </span>
            <br />
            <span class="p-float-label">
              <InputText
                class="urunKartInputText"
                id="urunAdi"
                type="text"
                v-model="getSiparisUrunKart.urunAdi"
                disabled
              />
              <label for="input">Ürün Adı </label>
            </span>
            <br />

            <span class="p-float-label">
              <InputText
                class="urunKartInputText"
                id="yuzeyIslem"
                type="text"
                v-model="getSiparisUrunKart.yuzeyIslem"
                disabled
              />
              <label for="input">İşlem</label>
            </span>
            <br />

            <span class="p-float-label">
              <InputText
                class="urunKartInputText"
                id="ebat"
                type="text"
                v-model="getSiparisUrunKart.ebat"
                disabled
              />
              <label for="input">Ebat</label>
            </span>
          </div>
        </div>
      </template>
    </Card>
    <urun-kart-menu
      :is_seleksiyon="false"
    />
  </div>
</template>

<script>
import UrunKartMenu from "../../../components/shared/UrunKartMenu";
import { mapGetters } from "vuex";
export default {
  props: {
    dis_urun_giris: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      urunler: {},
    };
  },

  components: {
    urunKartMenu: UrunKartMenu,
  },
  methods: {
    urunKartShow() {
      this.emitter.emit("urunKartShow");

      //const liste = this.$store.getters.getUrunKartMenuList;
    },
    urunKartAlanReset() {
      this.getSiparisUrunKart = {
        id: null,
        kategoriAdi: null,
        urunAdi: null,
        yuzeyIslem: null,
        ebat: null,
      };
    },
  },
  computed: {
    ...mapGetters(["getSiparisUrunKart"]),
  },
  mounted() {
    this.emitter.on("urunKartAlanTemizleme", (data) => {
      if (data) {
        this.urunKartAlanReset();
      }
    });
  },
};
</script>
<style scoped>
.urunKartInputText {
  width: 90%;
}
</style>

<template>
  <section>
    <div class="columns">
      <!-- Ürün Kart -->
      <div class="column is-12 custom-box">
        <div class="columns is-multiline">
          <div class="column is-8">
            <span class="p-float-label">
              <InputText
                id="id"
                type="text"
                v-model="getSiparisUrunKart.id"
                :disabled="dis_urun_giris"
              />
              <label for="id">Ürün Kod</label>
            </span>
          </div>
          <div class="column is-4">
            <Button
              :disabled="dis_urun_giris"
              class="p-button-secondary"
              @click="urunKartShow"
            />
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
          </div>
          <div class="column is-12">
            <span class="p-float-label">
              <InputText
                id="kategoriAdi"
                type="text"
                v-model="getSiparisUrunKart.kategoriAdi"
                :disabled="dis_urun_giris"
              />
              <label for="kategoriAdi">Kategori Adı</label>
            </span>
          </div>
          <br />
          <div class="column is-12">
            <span class="p-float-label">
              <InputText
                id="urunAdi"
                type="text"
                v-model="getSiparisUrunKart.urunAdi"
                :disabled="dis_urun_giris"
              />
              <label for="urunAdi">Ürün Adı</label>
            </span>
          </div>
          <br />
          <div class="column is-12">
            <span class="p-float-label">
              <InputText
                id="yuzeyIslem"
                type="text"
                v-model="getSiparisUrunKart.yuzeyIslem"
                :disabled="dis_urun_giris"
              />
              <label for="yuzeyIslem">Yüzey İşlem</label>
            </span>
          </div>
          <br />
          <div class="column is-12">
            <span class="p-float-label">
              <InputText
                id="ebat"
                type="text"
                v-model="getSiparisUrunKart.ebat"
                :disabled="dis_urun_giris"
              />
              <label for="ebat">Ebat</label>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
//import UrunKartMenu from '../../shared/UrunKartMenu';
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
    //urunKartMenu : UrunKartMenu
  },
  methods: {
    urunKartShow() {
      this.emitter.emit("urunKartShow");
    },
  },
  computed: {
    ...mapGetters(["getSiparisUrunKart"]),
  },
  mounter() {},
};
</script>

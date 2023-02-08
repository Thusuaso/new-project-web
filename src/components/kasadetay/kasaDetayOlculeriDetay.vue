<template>
  <br/>
  <div class="grid">
    <div class="col">
      <span class="p-float-label">
        <InputText id="firmaadi" type="text" v-model="kasaDatas.data.firmaadi" :disabled="true" />
        <label for="firmaadi">Firma Adı</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <InputText id="ebat" type="text" v-model="kasaDatas.data.ebat" />
        <label for="ebat">Taş Ebadı</label>
      </span>

    </div>
    <div class="col">
      <span class="p-float-label">
        <InputText id="forklift" type="text" v-model="forklift" />
        <label for="forklift">Forklift</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <InputText id="genislik" type="text" v-model="genislik" />
        <label for="genislik">Genişlik</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <InputText id="yukseklik" type="text" v-model="yukseklik" />
        <label for="yukseklik">Yükseklik</label>
      </span>
    </div>
  </div>
  <div class="grid">
    <div class="col">
      <Button @click="is_guncelle_click" label="Güncelle" style="margin-top: 10px; margin-left: 10px" />
    </div>
    <div class="col">
      <Button @click="is_sil_click" label="Sil" class="p-button-danger" style="margin-top: 10px; margin-left: 10px" />
    </div>
  </div>

</template>

<script>
import service from "@/service/SeleksiyonService";
export default {
  props: ["kasaDatas"],
  methods: {
    is_sil_click() {
      service.setKasaDetayOlculeriSil(this.id).then((data) => {
        if (data.status == true) {
          this.$toast.add({
            severity: "success",
            summary: "Kasa Detay Silme",
            detail: "Kasa detay silme başarılı",
            life: 3000,
          });
          this.$store.dispatch("kasa_ebatlari_list_load", data.kasaList);
        } else {
          this.$toast.add({
            severity: "danger",
            summary: "Kasa Detay Silme",
            detail: "Kasa detay silme hatalı",
            life: 3000,
          });
        }
      });
    },
    is_guncelle_click() {
      this.kasaDatas.data.kasaOlculeri =
        this.forklift + "x" + this.genislik + "x" + this.yukseklik;
      let firmaId = this.tedarikciler.tedarikciList.find(
        (x) => x.firmaAdi == this.kasaDatas.data.firmaadi
      ).id;

      const kasaDetay = {
        id: this.kasaDatas.data.id,
        firmaAdi: this.kasaDatas.data.firmaadi,
        tasEbat: this.kasaDatas.data.ebat,
        kasaOlcusu: this.kasaDatas.data.kasaOlculeri,
        firmaId: firmaId,
      };

      service.getKasaDetayOlculeriGuncelle(kasaDetay).then((data) => {
        if (data.status == true) {
          this.$toast.add({
            severity: "success",
            summary: "Kasa Detay Güncelleme",
            detail: "Kasa detay güncelleme başarılı",
            life: 3000,
          });
          this.$store.dispatch("kasa_ebatlari_list_load", data.kasaList);
        } else {
          this.$toast.add({
            severity: "danger",
            summary: "Kasa Detay Güncelleme",
            detail: "Kasa detay güncelleme hatalı",
            life: 3000,
          });
        }
      });
    },
  },
  data() {
    return {
      forklift: null,
      genislik: null,
      yukseklik: null,
      tedarikciler: null,
      id: null,
    };
  },
  created() {
    this.forklift = this.kasaDatas.data.kasaOlculeri.split("x")[0];
    this.genislik = this.kasaDatas.data.kasaOlculeri.split("x")[1];
    this.yukseklik = this.kasaDatas.data.kasaOlculeri.split("x")[2];
    this.id = this.kasaDatas.data.id;
    service.getTedarikciList().then((data) => {
      this.tedarikciler = data;
    });
  },
};
</script>

<style scoped>
.forkliftDetayGenel {
  display: inline-block;
  float: left;
  margin-top: 10px;
}
.forkliftDetay {
  display: inline-block;
  float: left;
}
</style>

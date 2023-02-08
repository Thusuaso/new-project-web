<template>
  <br />
  <div class="grid">
    <div class="col">
      <AutoComplete v-model="selectFirma" :dropdown="true" :suggestions="filteredBrands" @complete="aramaKategori($event)"
        placeholder="Firma Seç" field="firmaAdi" @item-select="isItemSelect(selectFirma)" />
    </div>
    <div class="col">
        <span class="p-float-label">
          <InputText id="ebat" type="text" v-model="ebat" />
          <label for="ebat">Taş Ebadı (EnxBoyxKenar)</label>
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
    <div class="col">
      <Button @click="is_kaydet_click" label="Kaydet" ></Button>
    </div>

  </div>






</template>

<script>
import service from "@/service/SeleksiyonService";
export default {
  methods: {
    is_kaydet_click() {
      this.kasaEbat =
        this.forklift + "x" + this.genislik + "x" + this.yukseklik;
      let datas = {
        firmaId: this.selectfirmaId,
        ebat: this.ebat,
        kasaEbat: this.kasaEbat,
      };
      service.getKasaDetayOlculeriKaydet(datas).then((data) => {
        if (data.status) {
          this.$toast.add({
            severity: "success",
            summary: "Kasa Ölçü Kaydet",
            detail: "Kasa ölçüsü başarıyla kaydedildi.",
            life: 3000,
          });
          this.$store.dispatch("kasa_ebatlari_list_load", data.kasaList);
        } else {
          this.$toast.add({
            severity: "danger",
            summary: "Kasa Ölçü Kaydet",
            detail: "Kasa ölçüsü kaydetme hatalı.",
            life: 3000,
          });
        }
      });
    },
    aramaKategori(event) {
      setTimeout(() => {
        let result;

        if (event.query.length == 0) {
          result = [...this.tedarikciler.tedarikciList];
        } else {
          result = this.tedarikciler.tedarikciList.filter((x) => {
            return x.firmaAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filteredBrands = result;
      }, 250);
    },

    isItemSelect(event) {
      this.selectfirmaId = event.id;
    },
  },
  data() {
    return {
      selectFirma: null,
      filteredBrands: null,
      selectfirmaId: null,
      ebat: null,
      forklift: null,
      genislik: null,
      yukseklik: null,
      kasaEbat: null,
    };
  },
  created() {
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

<template>
  <div>
    <br/> 
    <div class="columns">
      <div class="column">
        <span class="p-float-label">
          <Calendar id="date" v-model="value" @date-select="kurSecim" />
          <label for="date">Tarih</label>
        </span>
      </div>
      <div class="column">
        <span class="p-float-label">
          <InputText
            id="firmaAdi"
            type="text"
            v-model="mekmerDisModel.firmaAdi"
          />
          <label for="firmaAdi">Firma Adı</label>
        </span>
      </div>
      <div class="column">
        <span class="p-float-label">
          <InputText
            id="aciklama"
            type="text"
            v-model="mekmerDisModel.aciklama"
          />
          <label for="aciklama">Açıklama</label>
        </span>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <span class="p-float-label">
          <InputText
            id="Tutar_tl"
            type="text"
            v-model="Tutar_tl"
            @input="miktar_input_event($event)"
          />
          <label for="Tutar_tl">Tutar TL</label>
        </span>
      </div>
      <div class="column">
        <span class="p-float-label">
          <InputText
            id="kur"
            type="text"
            v-model="kur"
            @input="toplam_adet_hesapla($event)"
          />
          <label for="kur">Kur</label>
        </span>
      </div>
      <div class="column">
        <span class="p-float-label">
          <InputText
            id="Tutar_dolar"
            type="text"
            v-model="Tutar_dolar"
            @input="dolar_input_event($event)"
          />
          <label for="Tutar_dolar">Tutar Dolar ($)</label>
        </span>
      </div>
    </div>

    <div class="columns" style="margin-bottom: 200px">
      <div class="column">
        <Button @click="kaydet" label="Kaydet" class="p-button-success" />
      </div>
      <div class="column">
        <Button @click="guncelle" label="Güncelleme" class="p-button-info" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import service2 from "../../service/FinansService";
import mekmerDisFaturaService from "../../service/mekmerDisFatura";

export default {
  computed: {
    ...mapGetters(["mekmerDisModel"]),
  },
  data() {
    return {
      value: new Date(),
      Tutar_dolar: 0,
      Tutar_tl: 0,
      kur: 0,
    };
  },
  methods: {
    kaydet() {
      const year = this.value.getFullYear();
      const month = this.value.getMonth() + 1;
      const day = this.value.getDay();
      const date = year + "/" + month + "/" + day;
      this.mekmerDisModel.tutarTl = this.Tutar_tl;
      this.mekmerDisModel.tutarDolar = this.Tutar_dolar;
      this.mekmerDisModel.kur = this.kur;
      this.mekmerDisModel.tarih = date;
      mekmerDisFaturaService.kaydet(this.mekmerDisModel).then((data) => {
        if (data.status) {
          this.$toast.add({
            severity: "success",
            summary: "Kayıt Durum",
            detail: "Kaydetme başarılı",
            life: 3000,
          });
          this.$store.dispatch("mekmer_dis_fatura_list_act", data.dataList);
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Kayıt Durum",
            detail: "Kaydetme Hata",
            life: 3000,
          });
          this.$store.dispatch("mekmer_dis_fatura_list_act", data.dataList);
        }
      });
    },
    guncelle() {
      const year = this.value.getFullYear();
      const month = this.value.getMonth() + 1;
      const day = this.value.getDay();
      const date = year + "/" + month + "/" + day;
      this.mekmerDisModel.tutarTl = this.Tutar_tl;
      this.mekmerDisModel.tutarDolar = this.Tutar_dolar;
      this.mekmerDisModel.kur = this.kur;
      this.mekmerDisModel.tarih = date;
      mekmerDisFaturaService.guncelle(this.mekmerDisModel).then((data) => {
        if (data.status) {
          this.$toast.add({
            severity: "success",
            summary: "Güncelleme Durum",
            detail: "Güncelleme başarılı",
            life: 3000,
          });
          this.$store.dispatch("mekmer_dis_fatura_list_act", data.dataList);
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Güncelleme Durum",
            detail: "Güncelleme Hata",
            life: 3000,
          });
          this.$store.dispatch("mekmer_dis_fatura_list_act", data.dataList);
        }
      });
    },
    kurSecim() {
      const d = this.value;

      const year = d.getFullYear(); // 2021
      const mount = d.getMonth();
      const day = d.getDate();

      service2.getGuncelKur(year, mount + 1, day).then((data) => {
        this.kur = data.result;
      });
    },
    dolar_input_event(event) {
      if (event) this.Tutar_dolar = this.Tutar_dolar.replace(",", ".");

      if (this.kur != 0) {
        this.Tutar_tl = this.Tutar_dolar * this.kur;

        this.Tutar_tl = (this.Tutar_tl / 1).toFixed(2).replace(",", ".");
      }
    },
    miktar_input_event(event) {
      if (event) {
        const result = this.Tutar_tl.replace(",", ".");
        this.Tutar_tl = result
        
      } 
      if (this.Tutar_tl > 0 && this.kur > 0) {
        this.Tutar_dolar = this.Tutar_tl / this.kur;
        this.Tutar_dolar = (this.Tutar_dolar / 1).toFixed(2).replace(",", ".");
      }
    },
    toplam_adet_hesapla(event) {
      if (event) this.kur = this.kur.replace(",", ".");
      if (this.Tutar_tl > 0 && this.kur > 0) {
        this.Tutar_dolar = this.Tutar_tl / this.kur;
        this.Tutar_tl = (this.Tutar_tl / 1).toFixed(2).replace(",", ".");
        this.Tutar_dolar = (this.Tutar_dolar / 1).toFixed(2).replace(",", ".");
      }
    },
  },
};
</script>

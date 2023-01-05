<template>
  <section>
    <br/>
    <div class="columns is-multiline">
      <div class="column is-12">
        <span class="p-float-label">
          <InputText
            id="musteriAdi"
            type="text"
            v-model="musteriTeklif.musteriAdi"
          />
          <label for="musteriAdi">Müşteri Adı</label>
        </span>
      </div>
      <div class="column is-8">
        <span class="p-float-label">
          <AutoComplete
            id="country"
            v-model="ulke"
            :suggestions="filterUlkeList"
            @complete="searchCountry($event)"
            optionLabel="ulkeAdi"
            @input="ulkeDegisim($event)"
          />

          <label for="country">Ülke</label>
        </span>
      </div>

      <div class="colum is-4 is-centered">
        <Button
          class="p-button-secondary"
          label="KAYDET"
          @click="musteriKaydet"
        />
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import teklifMusteriService from "../../service/TeklifMusteriService";
export default {
  data() {
    return {
      ulke: "",
      ulkeFlags: "",
      ulkeId: null,
    };
  },
  props: ["yeni_kayit"],
  computed: {
    ...mapGetters(["musteriTeklif", "ulkeList"]),
    filterUlkeList() {
      return this.ulkeList.filter((option) => {
        return (
          option.ulkeAdi
            .toString()
            .toLowerCase()
            .indexOf(this.ulke.toLowerCase()) >= 0
        );
      });
    },
  },
  created() {
    if (!this.yeni_kayit) {
      const data = this.musteriTeklif.ulke;
      if (data.pngFlags) {
        this.ulke = data.ulkeAdi;
        this.ulkeFlags = data.pngFlags;
        this.ulkeId = data.id;
      }
    }
  },
  methods: {
    ulkeDegisim(event) {
      if (event) {
        const data = this.ulkeList.find((x) => x.ulkeAdi == event);
        this.ulkeFlags = data.pngFlags;
        this.ulkeId = data.id;
      }
    },
    musteriKaydet() {
      if (!this.ulke) {
        alert("Ülke Seçimi yapmalısınız.");
        return;
      }

      const musteriData = {
        id: this.musteriTeklif.id,
        musteriAdi: this.musteriTeklif.musteriAdi,
        ulkeId: this.ulkeId,
      };

      if (!this.yeni_kayit) {
        teklifMusteriService.musteriGuncelle(musteriData).then((data) => {
          this.$store.dispatch("guncelleMusteriList", data.musteriDetay);
          this.emitter.emit("musteriTeklifGuncelle", data);
          alert("Müşteri Bilgileri Değiştirildi.");
        });
      } else {
        //yeni müşteri kaydı
        alert("Yeni müşteri kaydı.");
      }
    },
  },
};
</script>
<style scoped>
.auto-image img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.auto-image span {
  margin-left: 15px;
  vertical-align: middle;
}
.select-image {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin-top: 25px;
}
</style>

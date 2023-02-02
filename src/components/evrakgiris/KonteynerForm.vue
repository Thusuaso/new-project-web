<template>
  <div style="margin-left: 32px">
    <div class="columns">
      <div class="column">
        <label for="lastname" class="p-col-fixed" style="width: 100px"
          >Firma</label
        >
        <div class="p-field p-col-12 p-md-12">
          <AutoComplete
            v-model="firma_adi"
            :suggestions="filterFaturaList"
            @complete="aramaFirma($event)"
            :dropdown="true"
            field="firma_adi"
            @item-select="firmaDegisim"
          >
          </AutoComplete>
        </div>
      </div>
      <div class="column">
        <label for="lastname" class="p-col-fixed" style="width: 100px"
          >Sipariş Numarası</label
        >
        <div class="p-col">
          <AutoComplete
            v-model="siparis_no"
            :suggestions="filterSiparisList"
            @complete="aramaSiparis($event)"
            :dropdown="true"
            field="siparisno"
            @item-select="siparisDegisim"
          >
          </AutoComplete>
        </div>
      </div>
      <div class="column">
        <label for="firstname" class="p-col-fixed" style="width: 100px"
          >Fatura Numarası</label
        >
        <div class="p-col">
          <InputText id="firstname" v-model="data.faturaNo" type="text" />
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <label for="firstname" class="p-col-fixed" style="width: 100px"
          >Kur</label
        >
        <div class="p-col">
          <InputText id="firstname" v-model="data.kur" type="text" />
        </div>
      </div>
      <div class="column">
        <label for="lastname" class="p-col-fixed" style="width: 100px"
          >Tutar- USD</label
        >
        <div class="p-col">
          <InputText id="lastname" v-model="data.Tutar_dolar" type="text" />
        </div>
      </div>
      <div class="column">
        <label for="lastname" class="p-col-fixed" style="width: 100px"
          >Tutar- TRY</label
        >
        <div class="p-col">
          <InputText id="lastname" v-model="data.Tutar_tl" type="text" />
        </div>
      </div>
    </div>

    <div class="columns" style="margin-left: 190px">
      <div class="column">
        <Button
          class="p-button-secondary"
          @click="dataKayitIslem"
          label="Kaydet"
        />
      </div>
      <div class="column">
        <custom-file-input
          baslik="Dosya Gönder"
          @sunucuDosyaYolla="konteynerDosyaGonder($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import service from "../../service/OperasyonService";
import fileService from "../../service/FileService";
import CustomInputFile from "../../components/shared/CustomInputFile";
export default {
  data() {
    return {
      firma_list: null,
      siparis_list: null,
      firma_adi: null,
      siparis_no: null,
      siparisno: null,
      DosyaSil: false,
      DosyaLink: null,
      DosyaAc: false,
      filterFaturaList: null,
      filterSiparisList: null,
    };
  },
  components: {
    customFileInput: CustomInputFile,
  },
  computed: {
    ...mapGetters(["data"]),
  },
  mounted() {
    this.firma_adi = this.data.firma_adi;

    this.siparis_no = this.data.siparisno;
  },
  created() {
    service.getKonteynerFormListesi().then((data) => {
      this.firma_list = data.konteyner_liste;
      this.siparis_list = data.siparis_list;
    });
  },

  methods: {
    konteynerDosyaGonder(event) {
      fileService
        .nakliyeDosyaGonder(
          event,
          this.data.Firma_id,
          this.data.faturaNo + ".pdf"
        )
        .then((data) => {
          console.log("nakliyeDosyaGonder", data);
          if (data.Status) {
            this.$toast.add({
              severity: "success",
              summary: "Bilgi Ekranı",
              detail: "Evrak başarılı şekilde yüklendi .",
              life: 1000,
            });
          } else {
            this.$toast.add({
              severity: "success",
              summary: "Bilgi Ekranı",
              detail: "Ops ! Lütfen Yeniden Deneyiniz  :( ",
              life: 1000,
            });
          }
        });
    },
    dataKayitIslem() {
      service.setKonteynerFaturaGuncelle(this.data).then((data) => {
        if (data.Status) {
          this.$toast.add({
            severity: "success",
            summary: "Bilgi Ekranı",
            detail: "Fatura Bilgileri Değiştirildi.",
            life: 1000,
          });
        } else {
          this.$toast.add({
            severity: "success",
            summary: "Bilgi Ekranı",
            detail: "Ops ! Lütfen Yeniden Deneyiniz  :(",
            life: 1000,
          });
        }
      });
    },
    firmaDegisim() {
      let deneme = this.firma_list.find(
        (x) => x.firma_adi == this.firma_adi.firma_adi
      );
      this.data.Firma_id = deneme.Firma_id;
      this.data.firma_adi = deneme.firma_adi;
    },
    siparisDegisim() {
      let deneme = this.siparis_list.find(
        (x) => x.siparisno == this.siparis_no.siparisno
      );

      this.data.siparisno = deneme.siparisno;
    },
    aramaFirma(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.firma_list];
        } else {
          result = this.firma_list.filter((ted) => {
            return ted.firma_adi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterFaturaList = result;
      }, 250);
    },

    aramaSiparis(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.siparis_list];
        } else {
          result = this.siparis_list.filter((ted) => {
            return ted.siparis_no
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterSiparisList = result;
      }, 250);
    },
  },
};
</script>
<style>
.p-autocomplete-dd .p-autocomplete-input {
  width: 250px;
}
.p-inputtext {
  width: 250px;
}
#isMobile {
  width: 150px;
}
</style>

<template>
  <section>
    <Card>
      <template #content>
        <div class="columns">
          <div class="column">
            <span class="p-float-label">
              <AutoComplete
                id="firma"
                v-model="firma"
                :suggestions="filterFaturaList"
                :disabled="kaydetVisible1"
                @complete="searchFatura($event)"
                optionLabel="firma_adi"
              />
              <label for="firma">Firma Seçiniz</label>
            </span>
          </div>
          <div class="column">
            <span class="p-float-label">
              <InputText
                id="siparisno"
                v-model="SiparisEvrakList.siparisno"
                :disabled="true"
              />
              <label for="siparisno">PO</label>
            </span>
          </div>
          <div class="column">
            <Dropdown
              style="width: 200px"
              :disabled="kaydetVisible1"
              v-model="selectFaturaTur"
              :options="FaturaTurList"
              optionLabel="name"
            />
          </div>
          <div class="column">
            <Button
              label="+ Yeni Firma"
              style="width: 250px; background-color: green; font-weight: bold"
              @click="yeniFirmaGiris"
            />
          </div>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div class="columns">
          <div class="column">
            <span class="p-float-label">
              <Calendar
                id="tarih"
                v-model="tarih"
                :disabled="kaydetVisible1"
                @date-select="isKurSelected"
              />
              <label for="tarih">Tarih</label>
            </span>
          </div>
          <div class="column">
            <span class="p-float-label">
              <InputText
                id="faturaNo"
                v-model="faturaNo"
                :disabled="kaydetVisible1"
                size="is-small"
              />
              <label for="faturaNo">Fatura No</label>
            </span>
          </div>
          <div class="column">
            <span class="p-float-label">
              <InputText
                id="Tutar_tl"
                v-model="Tutar_tl"
                :disabled="kaydetVisible1"
                @input="miktar_input_event($event)"
                size="is-small"
              />
              <label for="Tutar_tl">Tutar (TL)</label>
            </span>
          </div>
          <div class="column">
            <span class="p-float-label">
              <InputText
                id="kur"
                v-model="kur"
                @input="toplam_adet_hesapla($event)"
                @focus="$event.target.select()"
                @click="$event.target.select()"
                :disabled="kaydetVisible1"
                size="is-small"
              />
              <label for="kur">Kur</label>
            </span>
          </div>
          <div class="column">
            <span class="p-float-label">
              <InputText
                id="Tutar_dolar"
                v-model="Tutar_dolar"
                @input="dolar_input_event($event)"
                :disabled="kaydetVisible1"
                size="is-small"
              />

              <label for="Tutar_dolar">Tutar ($)</label>
            </span>
          </div>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div class="columns">
          <Button
            class="p-button-rounded p-button-warning"
            label="Bilgileri Kaydet"
            :disabled="kaydetVisible1"
            @click="kaydetIslemi"
            icon="fas fa-check"
            iconPos="left"
          />
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div class="columns">
          <div class="column">
            <custom-file-input
              :disabled="dis_DosyaAc"
              @sunucuDosyaYolla="konteynerDosyaGonder($event)"
              style="margin-left: 155px"
              baslik="Evrak Yükle"
            />
          </div>
          <div class="column">
            <a :href="denizcilikLink" target="_blank">
              <Button label="Dosya Aç" :disabled="dis_DosyaAc" />
            </a>
          </div>
        </div>
        <span style="color: red; font-size: 14px; font-weight: bold"
          >Pdf formatında ve dosya isminin '.' içermediğine dikkat ediniz
          .</span
        >
      </template>
    </Card>
    <Card>
      <template #content>
        <div class="columns">
          <div class="column">
            <Button
              label="KAYDET"
              class="p-button-success"
              :disabled="yenikaydetVisible"
              @click="kaydetolustur()"
            />
          </div>
          <div class="column">
            <Button
              label="Yeni Kayıt"
              :disabled="yenikayitVisible"
              @click="kayitolustur()"
            />
          </div>
          <div class="column">
            <Button
              label="Vazgec"
              class="p-button-danger"
              :disabled="vazgecVisible"
              @click="vazgec()"
            />
          </div>
        </div>
      </template>
    </Card>
    <Dialog
      v-model:visible="is_firma_alani"
      header="Firma Listesi"
      maximizable
      :modal="true"
      position="top"
    >
      <section>
        <div class="container">
          <div class="columns">
            <div class="column is-12">
              <FirmaAlani />
            </div>
          </div>
        </div>
      </section>
    </Dialog>
  </section>
  



</template>
<script>
import service from "../../service/OperasyonService";
import LocalService from "../../service/LocalService";
import CustomInputFile from "../../components/shared/CustomInputFile";
import fileService from "../../service/FileService";
import FirmaAlani from "./FirmaAlani";
import { mapGetters } from "vuex";
import service2 from "../../service/FinansService";
export default {
  components: {
    customFileInput: CustomInputFile,
    FirmaAlani,
  },

  data() {
    return {
      filterFaturaList: [],
      firma: "",
      firma_list: [],
      siparis: "",
      is_firma_alani: false,
      siparis_list: [],
      firma_adi: "",
      siparisno: "",
      faturaNo: "",
      Tutar_tl: 0,
      kur: 0,
      firma_id: 0,
      Tutar_dolar: 0,
      tarih: new Date(),
      dis_DosyaAc: true,
      denizcilikLink: "",
      urunid: 0,
      urunID: 0,
      dis_numuneDosyayukle: true,
      denizcilik_data2: [],
      proformaVisible: false,
      yenikayitVisible: false,
      kaydetVisible1: true,
      yenikaydetVisible: true,
      vazgecVisible: true,
      selectFaturaTur: null,
      FaturaTurList: [
        { id: 73, name: "İlaçlama" },
        { id: 7, name: "Gümrük" },
      ],
    };
  },
  localService: null,
  beforeRouteEnter(to, from, next) {
    service.getKonteynerFormListesi().then((data) => {
      next((vm) => {
        vm.firma_list = data.konteyner_liste;
        vm.siparis_list = data.siparis_list;
      });
    });
  },
  computed: {
    ...mapGetters(["SiparisEvrakList"]),
    filterSiparisList() {
      if (this.siparis_list) {
        return this.siparis_list.filter((option) => {
          return (
            option.siparisno
              .toString()
              .toLowerCase()
              .indexOf(this.siparis.toLowerCase()) >= 0
          );
        });
      }

      return null;
    },
  },
  methods: {
    isKurSelected() {
      const d = this.tarih;

      const year = d.getFullYear(); // 2021
      const mount = d.getMonth();
      const day = d.getDate();

      service2.getGuncelKur(year, mount + 1, day).then((data) => {
        this.kur = data.result;
      });
    },
    searchFatura(event) {


      let result;

      if (event.query.length == 0) result = [...this.firma_list];
      else {
        result = this.firma_list.filter((x) => {
          return x.firma_adi
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }
      this.filterFaturaList = result;
    },
    yeniFirmaGiris() {
      this.is_firma_alani = true;

      service.getKonteynerFormListesi().then((data) => {
        this.firma_list = data.konteyner_liste;
        this.siparis_list = data.siparis_list;
      });
    },
    dolar_input_event(event) {
      if (event) this.Tutar_dolar = event.replace(",", ".");

      if (this.kur != 0) {
        this.Tutar_tl = this.Tutar_dolar * this.kur;

        this.Tutar_tl = (this.Tutar_tl / 1).toFixed(2).replace(",", ".");
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    kayitolustur() {
      this.kaydetVisible1 = false;
      this.yenikayitVisible = true;
      this.denizcilik_data2 = [];
      this.selectFaturaTur = null;
      this.vazgecVisible = false;
      this.dis_numuneDosyayukle = true;
      service.getKonteynerFormListesi().then((data) => {
        this.firma_list = data.konteyner_liste;
        this.siparis_list = data.siparis_list;
      });
    },
    vazgec() {
      this.kaydetVisible1 = true;
      this.yenikayitVisible = false;
      this.vazgecVisible = true;
      this.dis_numuneDosyayukle = true;
    },
    kaydetolustur() {
      this.kaydetVisible1 = true;
      this.yenikayitVisible = false;
      this.dis_numuneDosyayukle = true;
      this.yenikaydetVisible = true;
    },
    miktar_input_event(event) {
      if (event) this.Tutar_tl = event.replace(",", ".");
      if (this.Tutar_tl > 0 && this.kur > 0) {
        this.Tutar_dolar = this.Tutar_tl / this.kur;
        this.Tutar_dolar = (this.Tutar_dolar / 1).toFixed(2).replace(",", ".");
      }
    },
    toplam_adet_hesapla(event) {
      if (event) this.kur = event.replace(",", ".");
      if (this.Tutar_tl > 0 && this.kur > 0) {
        this.Tutar_dolar = this.Tutar_tl / this.kur;
        this.Tutar_tl = (this.Tutar_tl / 1).toFixed(2).replace(",", ".");
        this.Tutar_dolar = (this.Tutar_dolar / 1).toFixed(2).replace(",", ".");
      }
    },

    konteynerDosyaGonder(event) {
      fileService
        .nakliyeDosyaGonder(
          event,
          this.denizcilik_data2.Firma_id,
          this.denizcilik_data2.faturaNo + ".pdf"
        )
        .then((data) => {
          console.log("nakliyeDosyaGonder", data);

          service.setGumrukFaturaKayit(this.denizcilik_data2).then((veri) => {
            if (veri.Status) {
              alert("Kayıt İşlemi Yapıldı.");
              this.dis_DosyaAc = false;
              this.denizcilikLink = `https://file-service.mekmar.com/file/download/customer/${
                this.denizcilik_data2.Firma_id
              }/${this.denizcilik_data2.faturaNo + ".pdf"}`;
              this.yenikaydetVisible = false;
            }
          });
        });
    },

    formatPriceTL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "₺" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    nakliye_tablo_yukle() {
      this.tedarikci_loading = true;
    },
    kaydetIslemi() {
      if (this.firma == "") {
        alert("Firma Adını Seçiniz..");
        return;
      }
      if (this.faturaNo == "") {
        alert("Fatura Numarasını Seçiniz..");
        return;
      }
      if (this.Tutar_tl == 0) {
        alert("Fatura Tutarı 0 dan büyük olmalı.");
        return;
      }
      if (this.kur == 0) {
        alert("Kur  0 dan büyük olmalı.");
        return;
      }
      if (this.tarih == 0) {
        alert("Tarih Seçiniz..");
        return;
      }

      const denizcilik_data = {
        siparisno: this.siparis,
        firma_adi: this.firma.firma_adi,
        faturaNo: this.faturaNo,
        Tutar_tl: this.Tutar_tl,
        kur: this.kur,
        Firma_id: this.firma.Firma_id,
        Tutar_dolar: this.Tutar_dolar,
        fatura_tur_list: this.selectFaturaTur,
        tarih: this.localService.getDateString(this.tarih),
        kullaniciAdi: this.$store.getters.__getUsername,
      };
      this.denizcilik_data2 = denizcilik_data;

      service.setGumrukEvrakFaturaKayit(denizcilik_data).then((status) => {
        if (status.Status) {
          this.dis_numuneDosyayukle = false;
          this.kaydetVisible = true;

          this.siparis = "";
          this.firma = "";
          this.faturaNo = "";
          this.Tutar_tl = 0;
          this.kur = 0;
          this.Tutar_dolar = 0;
          this.tarih = new Date();
        } else {
          alert("Ops! Kayıt İşlemi Yapılamadı, Lütfen Tekrar Deneyiniz.");
        }
      });
    },
  },
  created() {
    this.localService = new LocalService();
    this.siparis = this.SiparisEvrakList.siparisno;
    this.nakliye_tablo_yukle();
    this.kayitolustur();
  },
};
</script>
<style scoped>
.card {
  font-size: 20px;
}
</style>

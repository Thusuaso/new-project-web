<template>
  <section>
    <div class="card is-centered" style="weight: 25px; height: 850px">
      <div class="column is-12">
        <Card>
          <template #header> <h3>Adım 1</h3> </template>
          <template #content>
            <br />
            <div class="columns is-multiline">
              <div class="column is-3">
                <span class="p-float-label">
                  <AutoComplete
                    id="firma"
                    v-model="firma"
                    :suggestions="filterFaturaList"
                    optionLabel="firma_adi"
                    :disabled="kaydetVisible1"
                    @complete="searchFirma($event)"
                  />
                  <label for="firma">Firma Seçiniz</label>
                </span>
              </div>

              <div class="column is-3" size="is-small">
                <span class="p-float-label">
                  <AutoComplete
                    id="siparis"
                    v-model="siparis"
                    :suggestions="filterSiparisList"
                    optionLabel="siparisno"
                    @blur="faturaDegisim"
                    :disabled="kaydetVisible1"
                    @complete="searchSiparis($event)"
                  />
                  <label for="siparis">Sipariş Seçiniz</label>
                </span>
              </div>
              <div class="column is-3" size="is-small">
                <span class="p-float-label">
                  <Dropdown
                    style="width: 350px"
                    :disabled="kaydetVisible1"
                    v-model="selectFaturaTur"
                    :options="FaturaTurList"
                    optionLabel="name"
                    id="faturatur"
                  />
                  <label for="faturatur">Fatura Tür</label>
                </span>
              </div>
              <div class="column is-3" size="is-small">
                <Button
                  label="+ Yeni Firma"
                  style="
                    margin-left: 65px;
                    width: 120px;
                    background-color: green;
                    font-weight: bold;
                  "
                  @click="yeniFirmaGiris"
                />
              </div>
            </div>
            <div class="columns is-multiline" style="margin-top: 75px">
              <div class="column is-2">
                <span class="p-float-label">
                  <Calendar
                    id="tarih"
                    v-model="tarih"
                    @date-select="kurSecim"
                    :disabled="kaydetVisible1"
                  />
                  <label for="tarih">Tarih</label>
                </span>
              </div>
              <div class="column is-2">
                <span class="p-float-label">
                  <InputText
                    id="faturaNo"
                    v-model="faturaNo"
                    :disabled="kaydetVisible1"
                  />
                  <label for="faturaNo">Fatura No</label>
                </span>
              </div>
            </div>
            <div class="columns is-multiline" style="margin-top: 75px">
              <div class="column is-2">
                <span class="p-float-label">
                  <InputText
                    id="Tutar_tl"
                    v-model="Tutar_tl"
                    :disabled="kaydetVisible1"
                    @input="miktar_input_event($event)"
                  />
                  <label for="Tutar_tl">Tutar (TL)</label>
                </span>
              </div>
              <div class="column is-2">
                <span class="p-float-label">
                  <InputText
                    id="kur"
                    v-model="kur"
                    @input="toplam_adet_hesapla($event)"
                    @focus="$event.target.select()"
                    @click="$event.target.select()"
                    :disabled="kaydetVisible1"
                  />
                  <label for="kur">Kur</label>
                </span>
              </div>
              <div class="column is-2">
                <span class="p-float-label">
                  <InputText
                    id="tutar"
                    v-model="Tutar_dolar"
                    @input="dolar_input_event($event)"
                    :disabled="kaydetVisible1"
                  />
                  <label for="tutar">Tutar ($)</label>
                </span>
              </div>
            </div>
            <div class="columns is-12" style="margin-left: 235px">
              <div class="column is-12">
                <Button
                  class="p-button-rounded p-button-warning"
                  label="Bilgileri Kaydet"
                  :disabled="kaydetVisible1"
                  @click="kaydetIslemi"
                  icon="fas fa-check"
                  iconPos="left"
                />
              </div>
            </div>
          </template>
        </Card>
        <br />
        <div class="columns is-multiline">
          <Card>
            <template #header> <h3>Adım 2</h3> </template>
            <template #content>
              <div class="p-col-12 p-md-6">
                <div class="p-col-12 p-lg-12">
                  <Button
                    :disabled="dis_numuneDosyayukle"
                    style="background-color: #green; color: black"
                    label="Evrak Yukle"
                    conPos="left"
                    icon="fas fa-file-invoice-dollar"
                    @click="proformaVisible = true"
                  />
                  <Dialog
                    v-model:visible="proformaVisible"
                    position="top"
                    :modal="true"
                    header="Evrak Girişi"
                  >
                    <div
                      class="p-cardialog-content"
                      style="height: 300px; background-color: #f4f4f4"
                    >
                      <div class="p-grid">
                        <div class="p-col-12 p-lg-12">
                          <div class="p-col-12 p-lg-12">
                            <div class="p-grid">
                              <div class="p-col-8" style="margin-left: -60px">
                                <custom-file-input
                                  :disabled="dis_numuneDosyaAc"
                                  @sunucuDosyaYolla="
                                    konteynerDosyaGonder($event)
                                  "
                                  style="margin-left: 155px"
                                  baslik="Evrak Yükle"
                                />
                              </div>
                              <div class="p-col-4">
                                <a :href="numuneLink" target="_blank">
                                  <Button
                                    label="Dosya Aç"
                                    :disabled="dis_numuneDosyaAc"
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog>
                </div>
              </div>

              <span style="color: red; font-size: 14px; font-weight: bold"
                >Pdf formatında ve dosya isminin '.' içermediğine dikkat ediniz
                .</span
              >
              <br />
            </template>
          </Card>
          <br />
        </div>

        <div class="column is-12">
          <div class="columns">
            <div class="column is-4">
              <Button
                label="KAYDET"
                class="p-button-success"
                :disabled="yenikaydetVisible"
                @click="kaydetolustur()"
              />
            </div>
            <div class="column is-4">
              <Button
                label="Yeni Kayıt"
                :disabled="yenikayitVisible"
                @click="kayitolustur()"
              />
            </div>
            <div class="column is-4">
              <Button
                label="Vazgec"
                class="p-button-danger"
                :disabled="vazgecVisible"
                @click="vazgec()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="is_firma_alani"
      header="Firma Listesi"
      position="top"
      :modal="true"
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
import service2 from "../service/FinansService";
import service from "../service/OperasyonService";
import LocalService from "../service/LocalService";
import CustomInputFile from "../components/shared/CustomInputFile";
import fileService from "../service/FileService";
import FirmaAlani from "../components/evrakgiris/FirmaAlani";
export default {
  components: {
    customFileInput: CustomInputFile,
    FirmaAlani,
  },

  data() {
    return {
      filterSiparisList:[],
      filterFaturaList: [],
      isMobile: null,
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
      dis_numuneDosyaAc: true,
      numuneLink: "",
      urunid: 0,
      urunID: 0,
      dis_numuneDosyayukle: true,
      nakliye_data2: [],
      proformaVisible: false,
      yenikayitVisible: false,
      kaydetVisible1: true,
      yenikaydetVisible: true,
      vazgecVisible: true,
      selectFaturaTur: null,
      FaturaTurList: [
        { id: 73, name: "İlaçlama" },
        { id: 7, name: "Gümrük" },
        { id: 13, name: "Navlun" },
        { id: 9, name: "Liman" },
        { id: 100, name: "Lashing" },
        { id: 101, name: "Booking" },
        { id: 102, name: "Spanzet" }

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
    
  },
  methods: {
    searchSiparis(event) {
      let result;

      if (event.query.length == 0) result = [...this.siparis_list];
      else {
        result = this.siparis_list.filter((x) => {
          return x.siparisno
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }
      this.filterSiparisList = result;
    },
    searchFirma(event) {
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
    kurSecim() {
      const d = this.tarih;

      const year = d.getFullYear(); // 2021
      const mount = d.getMonth();
      const day = d.getDate();

      service2.getGuncelKur(year, mount + 1, day).then((data) => {
        this.kur = data.result;
      });
    },
    dolar_input_event() {
      this.Tutar_dolar = this.Tutar_dolar.replace(",", ".");

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
      this.nakliye_data2 = [];
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
    miktar_input_event() {
      this.Tutar_tl = this.Tutar_tl.replace(",", ".");
      if (this.Tutar_tl > 0 && this.kur > 0) {
        this.Tutar_dolar = this.Tutar_tl / this.kur;
        this.Tutar_dolar = (this.Tutar_dolar / 1).toFixed(2).replace(",", ".");
      }
    },
    toplam_adet_hesapla() {
      this.kur = this.kur.replace(",", ".");
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
          this.nakliye_data2.Firma_id,
          this.nakliye_data2.faturaNo + ".pdf"
        )
        .then((data) => {
          console.log("nakliyeDosyaGonder", data);
          service.setKonteynerFaturaKayit(this.nakliye_data2).then((veri) => {
            if (veri.Status) {
              alert("Kayıt İşlemi Yapıldı.");
              this.dis_numuneDosyaAc = false;
              this.numuneLink = `https://file-service.mekmar.com/file/download/customer/${
                this.nakliye_data2.Firma_id
              }/${this.nakliye_data2.faturaNo + ".pdf"}`;
              this.yenikaydetVisible = false;
            }
          });
        });
    },

    formatPriceTL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "₺" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    faturaDegisim() {
      if (this.firma_list) {
        setTimeout(() => {
          const siparis_item = this.firma_list.find(
            (x) => x.firma_adi == this.firma.firma_adi
          );
          this.firma_id = siparis_item.Firma_id;
        }, 1000);
      }
    },
    nakliye_tablo_yukle() {
      this.tedarikci_loading = true;
    },
    kaydetIslemi() {
      if (!this.siparis) {
        alert("Siparis Numarasını Seçiniz.");
        return;
      }

      if (!this.firma) {
        alert("Firma Adını Seçiniz.");
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
        alert("Kur 0 dan büyük olmalı.");
        return;
      }
      if (this.tarih == 0) {
        alert("Tarih Seçiniz..");
        return;
      }

      const nakliye_data = {
        siparisno: this.siparis.siparisno,
        firma_adi: this.firma.firma_adi,
        faturaNo: this.faturaNo,
        Tutar_tl: this.Tutar_tl,
        kur: this.kur,
        Firma_id: this.firma.Firma_id,
        Tutar_dolar: this.Tutar_dolar,
        fatura_tur_list: this.selectFaturaTur,
        tarih: this.localService.getDateString(this.tarih),
      };

      service.konteynerKaydet(nakliye_data).then((status) => {
        service.getKonteynerUrunModel(this.faturaNo).then((data) => {
          const nakliye_data2 = {
            siparisno: nakliye_data.siparisno,
            firma_adi: nakliye_data.firma_adi,
            faturaNo: nakliye_data.faturaNo,
            Tutar_tl: nakliye_data.Tutar_tl,
            kur: nakliye_data.kur,
            Firma_id: nakliye_data.Firma_id,
            Tutar_dolar: nakliye_data.Tutar_dolar,
            fatura_tur_list: this.selectFaturaTur,
            urunID: data.konteyner_liste[0].id,
            tarih: nakliye_data.tarih,
            kullaniciAdi: this.$store.getters.__getUsername,
          };
          this.nakliye_data2 = nakliye_data2;
        });

        if (status.status) {
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
    this.isMobile = window.innerWidth;
    this.localService = new LocalService();

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

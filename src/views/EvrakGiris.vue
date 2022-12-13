<template>
  <section>
    <div class="columns" style="height: 950px; background-color: White">
      <div class="column is-5" style="margin-top: 35px">
        <div class="columns">
          <div class="column">
            <div class="col-12 col-sm-12 stilim">
              <AutoComplete
                v-model="SiparisTur"
                :suggestions="filterSiparisTurList"
                @complete="aramaSiparisTur($event)"
                :dropdown="true"
                field="siparisno"
                placeholder="Sipariş Seçiniz"
                @item-select="siparisTurDegisim"
              >
                <template #items="slotProps">
                  <div class="p-clearfix p-autocomplete-brand-item">
                    <div>
                      {{ slotProps.siparisno }}
                    </div>
                  </div>
                </template>
              </AutoComplete>
            </div>
            <div class="col-12 col-sm-12 stilim" style="margin-top: 20px">
              <InputText v-model="musteriAdi" :disabled="true" />
            </div>
            <div class="col-12 col-sm-12 stilim" style="margin-top: 35px">
              <InputText v-model="mail" :disabled="true" />
            </div>
            <div class="col-12 col-sm-12 stilim" style="margin-top: 35px">
              <InputText v-model="KonteynerNo" :disabled="true" />
            </div>
            <div class="col-12 col-sm-12 stilim" style="margin-top: 35px">
              <InputText v-model="teslim" :disabled="true" />
            </div>
            <div class="col-12 col-sm-12 stilim" style="margin-top: 35px">
              <InputText v-model="odeme" :disabled="true" />
            </div>
            <div class="col-12 col-sm-12 stilim" style="margin-top: 35px">
              <InputText v-model="navlunAlis" :disabled="true" />
            </div>
            <div class="col-12 col-sm-12 stilim" style="margin-top: 35px">
              <InputText v-model="navlunSatis" :disabled="true" />
            </div>
          </div>
        </div>
      </div>

      <div
        class="column is-6"
        style="margin-top: 35px; font-size: 15px; font-weight: bold"
      >
        <div class="container">
          <DataTable
            :value="SiparisEvrakList1"
            :scrollable="true"
            scrollHeight="700px"
            selectionMode="single"
            v-model:selection="select_ayrinti"
            @row-select="select_ayrinti_sec($event)"
            :loading="table_loading"
          >
            <template #header>
              <div class="columns is-multiline">
                <div class="column is-12">
                  <span style="font-size: 15px">EVRAKLAR</span>
                </div>
              </div>
            </template>
            <Column
              field="Faturaid"
              header="ID"
              headerStyle="width:20px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ slotProps.data.Faturaid }}
              </template>
            </Column>
            <Column
              field="faturaadi"
              header="Evrak Adı"
              headerStyle="width:50px"
              bodyStyle="text-align:left"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    color: slotProps.data.renk,
                    backgroundColor:
                      slotProps.data.renk == 'red' ? '#F4B8AC' : '#CAF7AD',
                  }"
                >
                  {{ slotProps.data.faturaadi }}
                </div>
              </template>
            </Column>
            <template #footer> </template>
          </DataTable>
          <div class="column">
            <input
              type="file"
              ref="file"
              class="form-control validator"
              autocomplete="off"
              @change="handleUpload()"
              name="files[]"
              id="files"
              multiple
            />
          </div>
          <Dialog
            v-model:visible="is_diger"
            v-model:header="evrakFormBaslik"
            position="top"
            :modal="true"
            maximizable
          >
            <EvrakDigerForm />
          </Dialog>

          <Dialog
            v-model:visible="is_tedarikci"
            v-model:header="evrakFormBaslik"
            position="top"
            :modal="true"
            maximizable
          >
            <EvrakTedarikciForm />
          </Dialog>
          <Dialog
            v-model:visible="is_nakliye"
            v-model:header="evrakFormBaslik"
            position="top"
            :modal="true"
            maximizable=""
          >
            <NakliyeFaturaGiris />
          </Dialog>
          <Dialog
            v-model:visible="is_denizcilik"
            v-model:header="evrakFormBaslik"
            position="top"
            :modal="true"
            maximizable
          >
            <EvrakDenizcilikForm />
          </Dialog>
          <Dialog
            v-model:visible="is_gumruk_ilaclama"
            v-model:header="evrakFormBaslik"
            position="top"
            :modal="true"
            maximizable
          >
            <GumrukIlaclamaForm />
          </Dialog>
          <Dialog
            v-model:visible="is_ozeliscilik"
            v-model:header="evrakFormBaslik"
            position="top"
            :modal="true"
            maximizable
          >
            <EvrakOzelIscilikForm />
          </Dialog>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import service from "../service/OperasyonService";
import EvrakDigerForm from "../components/evrakgiris/EvrakDigerForm";
import EvrakTedarikciForm from "../components/evrakgiris/EvrakTedarikciForm";
import NakliyeFaturaGiris from "../components/evrakgiris/NakliyeFaturaGiris";
import EvrakDenizcilikForm from "../components/evrakgiris/EvrakDenizcilikForm";
import GumrukIlaclamaForm from "../components/evrakgiris/GumrukIlaclamaForm";
import EvrakOzelIscilikForm from "../components/evrakgiris/EvrakOzelIscilikForm";
import fileService from "../service/FileService";
import { mapGetters } from "vuex";
export default {
  components: {
    EvrakDigerForm: EvrakDigerForm,
    EvrakTedarikciForm: EvrakTedarikciForm,
    NakliyeFaturaGiris: NakliyeFaturaGiris,
    EvrakDenizcilikForm: EvrakDenizcilikForm,
    GumrukIlaclamaForm: GumrukIlaclamaForm,
    EvrakOzelIscilikForm: EvrakOzelIscilikForm,
  },
  data() {
    return {
      filterSiparisTurList: null,
      files: "",
      loading: false,
      select_ayrinti: null,
      SiparisList: null,
      musteriAdi: "",
      is_diger: false,
      SiparisTur: null,
      evrakFormBaslik: "",
      siparisno: null,
      kullaniciAdi: "",
      table_loading: false,
      evrakList: null,
      is_tedarikci: false,
      SatutusEvrak: null,
      evrak: null,
      evrakID: null,
      Listem: {},
      yenievrakList: null,
      id: null,
      is_nakliye: false,
      is_denizcilik: false,
      is_gumruk_ilaclama: false,
      mail: "",
      KonteynerNo: "",
      teslim: "",
      odeme: "",
      navlunAlis: 0,
      navlunSatis: 0,
      is_ozeliscilik: false,
    };
  },

  computed: {
    ...mapGetters(["SiparisEvrakList", "SiparisEvrakList1", "servis_adres"]),
  },

  service: null,
  mounted() {
    this.$store.dispatch("loadingBeginAct");

    service.getEvrakSiparisListe().then((data) => {
      this.SiparisList = data.siparis_liste;
      this.$store.dispatch("loadEvrakForm1", data.evrak_listesi);

      this.SiparisTur = this.SiparisList.find((x) => x.id == this.id);
      this.yeniKayitBaslangicIslemler();
      this.$store.dispatch("loadingEndAct");
    });
  },
  created() {},
  methods: {
    yeniKayitBaslangicIslemler() {
      service.getEvrakFaturaModel().then((data) => {
        this.evrak = data.evrak;
      });
    },
    handleUpload() {
      if (this.SiparisTur.siparisno) {
        for (var i = 0; i < this.$refs.file.files.length; i++) {
          let file = this.$refs.file.files[i];

          this.evrakID = 0;
          if (this.$refs.file.files[i].name == "Purchase Order.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "Purchase Order evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 1;
            }
          } else if (this.$refs.file.files[i].name == "Proforma Invoice.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "Proforma Invoice evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 2;
            }
          } else if (this.$refs.file.files[i].name == "Çeki Listesi.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "Çeki Listesi evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 4;
            }
          } else if (this.$refs.file.files[i].name == "Yükleme Notası.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "Yükleme Notası evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 5;
            }
          } else if (
            this.$refs.file.files[i].name == "Mekmar-Efes Gümrük Faturası.pdf"
          ) {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail:
                  "Mekmar-Efes Gümrük Faturası evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 6;
            }
          } else if (this.$refs.file.files[i].name == "Gümrük Notası.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "Gümrük Notası evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 7;
            }
          } else if (this.$refs.file.files[i].name == "ISF vb Formlar.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "ISF vb Formlar evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 8;
            }
          } else if (this.$refs.file.files[i].name == "Konşimento.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "Konşimento evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 9;
            }
          } else if (this.$refs.file.files[i].name == "İlaçlama Belgesi.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "İlaçlama Belgesi evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 10;
            }
          } else if (this.$refs.file.files[i].name == "Dolaşım Belgeleri.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "Dolaşım Belgeleri evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 11;
            }
          } else if (this.$refs.file.files[i].name == "Gçb Beyannamesi.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "Gçb Beyannamesi evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 12;
            }
          } else if (
            this.$refs.file.files[i].name == "Packing Declarition.pdf"
          ) {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "Packing Declarition evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 13;
            }
          } else if (this.$refs.file.files[i].name == "L-C Metin.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "L-C Metin evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 15;
            }
          } else if (this.$refs.file.files[i].name == "Commer Invoice.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "Commer Invoice evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 16;
            }
          } else if (this.$refs.file.files[i].name == "Packing List.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "Packing List evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 17;
            }
          } else if (this.$refs.file.files[i].name == "Booking.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "Booking evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 20;
            }
          } else if (this.$refs.file.files[i].name == "İlaçlama Notası.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "İlaçlama Notası evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 71;
            }
          } else if (this.$refs.file.files[i].name == "Fotolar.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "Fotolar evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 72;
            }
          } else if (this.$refs.file.files[i].name == "Draft.pdf") {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail: "Draft evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 99;
            }
          } else if (
            this.$refs.file.files[i].name == "Özel İşçilik Faturaları.pdf"
          ) {
            if (this.$refs.file.files[i].size > 1000000) {
              this.$toast.add({
                severity: "error",
                summary: "Evrak Boyutu Hata",
                detail:
                  "Özel İşçilik Faturaları evrak boyutunu kontrol ediniz.",
                life: 5000,
              });
              continue;
            } else {
              this.evrakID = 40;
            }
          }


          fileService
            .faturaDosyaGonder(file, this.evrakID, this.SiparisTur.siparisno)
            .then((data) => {
              console.log("faturaDosyaGonder ", data);
            });
          this.KayitIslemi();
        }
      } else {
        alert("Sipariş Seçiniz..");
      }
    },
    KayitIslemi() {
      this.evrak.id = this.evrakID;
      this.evrak.siparisno = this.SiparisTur.siparisno; //this.evrak verileri koydum
      this.evrak.kullaniciAdi = this.$store.getters.__getUsername;

      this.yeniKayit();
    },
    yeniKayit() {
      const veri = {
        evrak: this.evrak,
      };

      service.setEvrakFaturaKayit(veri.evrak).then((data) => {
        if (data.status) {
          //socket.siparis.emit('teklif_yeni_event',veri.kullaniciAdi);
          this.evrak.id = data.id;
          this.evrak.siparisno = data.siparisno;
          this.evrak.kullaniciAdi = this.$store.__getUsername;
          this.evrakLink = `https://file-service.mekmar.com/file/download/${this.evrakID}/${this.SiparisTur.siparisno}`;
          this.dis_download = false;

          return;
        } else {
          alert("Ops! Lütfen Yeniden Deneyiniz.");
        }
      });
      service.getEvrakFaturaList(this.SiparisTur.siparisno).then((data) => {
        this.$store.dispatch("loadEvrakForm1", data.color_listesi);
        this.table_loading = false;
      });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    select_ayrinti_sec(event) {
      if (this.SiparisTur) {
        this.select_ayrinti = event.data;

        if (
          this.select_ayrinti.Faturaid != 30 &&
          this.select_ayrinti.Faturaid != 40 &&
          this.select_ayrinti.Faturaid != 13 &&
          this.select_ayrinti.Faturaid != 73 &&
          this.select_ayrinti.Faturaid != 50 &&
          this.select_ayrinti.Faturaid != 3
        ) {
          service.getEvrakFaturaList(this.SiparisTur.siparisno).then((data) => {
            this.Listem = data.fatura_listesi.find(
              (x) => x.faturano == this.select_ayrinti.Faturaid
            );
            this.SatutusEvrak = data;

            const veri = {
              Listem: this.Listem,
              ID: this.select_ayrinti.Faturaid,
              siparisno: this.SiparisTur.siparisno,
            };

            this.$store.dispatch("loadEvrakForm", veri);

            this.is_diger = true;
            this.evrakFormBaslik =
              this.select_ayrinti.faturaadi + " Yükleme Formu";
            this.select_ayrinti = null;
          });
        } else if (this.select_ayrinti.Faturaid == 30) {
          service.getEvrakFaturaList(this.SiparisTur.siparisno).then((data) => {
            this.Listem = data.fatura_listesi.find(
              (x) => x.faturano == this.select_ayrinti.Faturaid
            );
            this.SatutusEvrak = data;

            const veri = {
              Listem: this.Listem,
              ID: this.select_ayrinti.Faturaid,
              siparisno: this.SiparisTur.siparisno,
            };

            this.$store.dispatch("loadEvrakForm", veri);

            this.is_tedarikci = true;
            this.evrakFormBaslik =
              this.select_ayrinti.faturaadi + " Yükleme Formu";
            this.select_ayrinti = null;
          });
        } else if (this.select_ayrinti.Faturaid == 13) {
          service.getEvrakFaturaList(this.SiparisTur.siparisno).then((data) => {
            this.Listem = data.fatura_listesi.find(
              (x) => x.faturano == this.select_ayrinti.Faturaid
            );
            this.SatutusEvrak = data;

            const veri = {
              Listem: this.Listem,
              ID: this.select_ayrinti.Faturaid,
              siparisno: this.SiparisTur.siparisno,
            };

            this.$store.dispatch("loadEvrakForm", veri);

            this.is_nakliye = true;
            this.evrakFormBaslik =
              this.select_ayrinti.faturaadi + " Yükleme Formu";
            this.select_ayrinti = null;
          });
        } else if (this.select_ayrinti.Faturaid == 50) {
          service.getEvrakFaturaList(this.SiparisTur.siparisno).then((data) => {
            this.Listem = data.fatura_listesi.find(
              (x) => x.faturano == this.select_ayrinti.Faturaid
            );
            this.SatutusEvrak = data;

            const veri = {
              Listem: this.Listem,
              ID: this.select_ayrinti.Faturaid,
              siparisno: this.SiparisTur.siparisno,
            };

            this.$store.dispatch("loadEvrakForm", veri);

            this.is_denizcilik = true;
            this.evrakFormBaslik =
              this.select_ayrinti.faturaadi + " Yükleme Formu";
            this.select_ayrinti = null;
          });
        } else if (this.select_ayrinti.Faturaid == 40) {
          service.getEvrakFaturaList(this.SiparisTur.siparisno).then((data) => {
            this.Listem = data.fatura_listesi.find(
              (x) => x.faturano == this.select_ayrinti.Faturaid
            );
            this.SatutusEvrak = data;

            const veri = {
              Listem: this.Listem,
              ID: this.select_ayrinti.Faturaid,
              siparisno: this.SiparisTur.siparisno,
            };

            this.$store.dispatch("loadEvrakForm", veri);

            this.is_ozeliscilik = true;
            this.evrakFormBaslik =
              this.select_ayrinti.faturaadi + " Yükleme Formu";
            this.select_ayrinti = null;
          });
        } else if (this.select_ayrinti.Faturaid == 73) {
          service.getEvrakFaturaList(this.SiparisTur.siparisno).then((data) => {
            this.Listem = data.fatura_listesi.find(
              (x) => x.faturano == this.select_ayrinti.Faturaid
            );
            this.SatutusEvrak = data;

            const veri = {
              Listem: this.Listem,
              ID: this.select_ayrinti.Faturaid,
              siparisno: this.SiparisTur.siparisno,
            };

            this.$store.dispatch("loadEvrakForm", veri);

            this.is_gumruk_ilaclama = true;
            this.evrakFormBaslik =
              this.select_ayrinti.faturaadi + " Yükleme Formu";
            this.select_ayrinti = null;
          });
        }
      } else {
        alert("İşlem Yapmak İstediğiniz Siparişi Seçiniz..) ");
        this.select_ayrinti = null;
      }
    },
    siparisTurDegisim() {
      this.id = this.SiparisTur.id;
      this.musteriAdi = this.SiparisTur.musteriAdi;
      this.mail = this.SiparisTur.mail;
      this.KonteynerNo = this.SiparisTur.KonteynerNo;
      this.teslim = this.SiparisTur.teslim;
      this.odeme = this.SiparisTur.odeme;
      this.navlunAlis = this.formatPrice(this.SiparisTur.navlunAlis);
      this.navlunSatis = this.formatPrice(this.SiparisTur.navlunSatis);
      this.table_loading = true;
      service.getEvrakFaturaList(this.SiparisTur.siparisno).then((data) => {
        this.$store.dispatch("loadEvrakForm1", data.color_listesi);
        this.table_loading = false;
      });
    },
    aramaSiparisTur(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.SiparisList];
        } else {
          result = this.SiparisList.filter((ted) => {
            return ted.siparisno
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterSiparisTurList = result;
      }, 250);
    },
  },
};
</script>
<style scoped>
.yukleme {
  margin-top: -25%;
}

.delete {
  background-color: yellow;
  color: white;
}

.p-datatable {
  font-size: 13px;
}

.p-column-filter {
  font-size: 10px;
}

.page-button {
  margin-top: 25px;
}

.stilim {
  margin-top: 10px;
  margin-bottom: 10px;

  margin-left: 20px;
  margin-right: 20px;
}
</style>

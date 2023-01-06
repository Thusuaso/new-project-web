<template>
  <section>
    <div class="is-centered" style="weight: 55px; height: 900px">
      <div class="column is-12">
        <Button
          label="+ Yeni Firma"
          style="
            width: 150px;
            margin-left: 1000px;
            background-color: green;
            font-weight: bold;
          "
          @click="yeniFirmaGiris"
        />
      </div>
      <div class="column is-12">
        <Card>
          <template #content>
            <div class="columns is-multiline">
                <div class="column is-4">
                    <span class="p-float-label">
                        <AutoComplete v-model="firma" :suggestions="filterFaturaList" optionLabel="firma_adi" 
                            :disabled="kaydetVisible1" @complete="searchFirma($event)" id="firma" />
                            
                        <label for="firma">Firma Adı</label>
                    </span>
                </div>
            
                <div class="column is-2">
                    <span class="p-float-label">
                        <Calendar v-model="tarih" @date-select="kurSecim" :disabled="kaydetVisible1" id="tarih" />
                        <label for="tarih">Tarih</label>
                    </span>
                </div>
                <div class="column is-2">
                    <span class="p-float-label">
                        <InputText v-model="faturaNo" :disabled="kaydetVisible1" id="faturaNo" />
                        <label for="faturaNo">Fatura No</label>
                    </span>
                </div>
            </div>
            <div class="columns is-multiline">
                <div class="column is-4" size="is-small">
                    <span class="p-float-label">
                        <AutoComplete v-model="siparis" :suggestions="filterSiparisList" optionLabel="siparisno"
                            :disabled="kaydetVisible2" id="siparissec" @complete="searchSiparis($event)" />
                        <label for="siparissec">Siparis Seçiniz</label>
                    </span>
                </div>
            
                <div class="column is-2">
                    <span class="p-float-label">
                        <InputText v-model="Tutar_tl" :disabled="kaydetVisible2" @input="miktar_input_event($event)"
                            id="Tutar_tl" />
                        <label for="Tutar_tl">Tutar (TL)</label>
                    </span>
                </div>
                <div class="column is-2">
                    <span class="p-float-label">
                        <InputText v-model="kur" @input="toplam_adet_hesapla($event)" @focus="$event.target.select()"
                            @click="$event.target.select()" :disabled="kaydetVisible2" id="kur" />
                        <label for="kur">Kur</label>
                    </span>
                </div>
                <div class="column is-2">
                    <span class="p-float-label">
                        <InputText v-model="Tutar_dolar" @input="dolar_input_event($event)" :disabled="kaydetVisible2"
                            id="tutarDolar" />
                        <label for="tutarDolar">Tutar ($)</label>
                    </span>
                </div>
                <div class="column is-5">
                    <div class="columns">
                        <div class="column is-3">
                            <Button class="p-button p-button-secondary" @click="btn_yeni_click" label="Yeni"
                                icon="pi pi-file-o" iconPos="left" />
                        </div>
                        <div class="column is-3">
                            <Button label="İptal" class="p-button p-button-danger" icon="pi pi-times" iconPos="left" />
                        </div>
                        <div class="column is-3">
                            <Button label="Ekle" class="p-button p-button-success" @click="btn_ekle_click" icon="pi pi-plus"
                                iconPos="left" />
                        </div>
                        <div class="column is-3">
                            <Button class="p-button p-button-warning" label="Değiştir" @click="btn_degistir_click"
                                icon="pi pi-refresh" iconPos="left" />
                        </div>
                        <div class="column is-3">
                            <Button label="Sil" class="p-button" @click="btn_sil_click"
                                style="background-color: yellow; color: black" icon="pi pi-times-circle" iconPos="left" />
                        </div>
                    </div>
                </div>
                <div class="column is-12">
                    <DataTable class="p-datatable-responsive p-datatable-cars" :value="siparisToplu" v-model:selection="selectUrun"
                        selectionMode="single" @row-select="siparisUrunSec" dataKey="id">
                        <Column field="siparisno" header="PO" headerStyle="width:90%;">
                            <template #body="slotProps">
                                {{ slotProps.data.siparisno }}
                            </template>
                        </Column>
                        <Column field="Tutar_tl" header="Tutar TRY" headerStyle="width:90%;">
                            <template #body="slotProps">
                                {{ slotProps.data.Tutar_tl }}
                            </template>
                        </Column>
                        <Column field="Tutar_dolar" header="Tutar USD" headerStyle="width:90%;">
                            <template #body="slotProps">
                                {{ slotProps.data.Tutar_dolar }}
                            </template>
                        </Column>
                        <Column field="kur" header="Kur" headerStyle="width:90%;">
                            <template #body="slotProps">
                                {{ slotProps.data.kur }}
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
            <div class="columns is-12" style="margin-left: 235px">
                <div class="column is-12">
                    <Button class="p-button p-button-warning" label="Bilgileri Kaydet" :disabled="kaydetVisible1"
                        @click="kaydetIslemi" icon="fas fa-check" iconPos="left" />
                </div>
            </div>
          </template>
          
        </Card>
        <br />
        <div class="columns is-multiline">
            <Card>
              <template #content>
                <div class="p-col-12 p-md-6">
                    <div class="p-col-12 p-lg-12">
                        <Button :disabled="dis_numuneDosyayukle" style="background-color: #green; color: black" label="Evrak Yukle"
                            conPos="left" icon="fas fa-file-invoice-dollar" @click="proformaVisible = true" />
                        <Dialog v-model:visible="proformaVisible" position="top" :modal="true" header="Evrak Girişi">
                            <div class="p-cardialog-content" style="height: 300px; background-color: #f4f4f4">
                                <div class="p-grid">
                                    <div class="p-col-12 p-lg-12">
                                        <div class="p-col-12 p-lg-12">
                                            <div class="p-grid">
                                                <div class="p-col-8" style="margin-left: -60px">
                                                    <custom-file-input :disabled="dis_numuneDosyaAc"
                                                        @sunucuDosyaYolla="nakliyeDosyaGonder($event)" style="margin-left: 155px"
                                                        baslik="Evrak Yükle" />
                                                </div>
                                                <div class="p-col-4">
                                                    <a :href="numuneLink" target="_blank">
                                                        <Button label="Dosya Aç" :disabled="dis_numuneDosyaAc" />
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
                
                <span style="color: red; font-size: 14px; font-weight: bold">Pdf formatında ve dosya isminin '.' içermediğine dikkat
                    ediniz
                    .</span>
                <br />
              </template>
              
            </Card>
          <br />
        </div>

        <div class="column is-12">
          <div class="columns">
            <div class="column is-4">
              <Button label="Kaydet" class="p-button-success" :disabled="yenikaydetVisible" @click="kaydetolustur()" />
            </div>
            <div class="column is-4">
              <Button label="Yeni Kayıt" :disabled="yenikayitVisible" @click="kayitolustur()" />
            </div>
            <div class="column is-4">
              <Button label="Vazgec" class="p-button-danger" :disabled="vazgecVisible" @click="vazgec()" />
            </div>
          </div>
          
        </div>
      </div>

      <Dialog
        v-model:visible="is_firma_alani"
        header="Firma Listesi"
        position="top"
        :modal="true"
        maximizable
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
    </div>
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
      filterFaturaList:[],
      isMobile: null,
      firma: "",
      is_firma_alani: false,
      firma_list: [],
      siparis: "",
      siparis_list: [],
      firma_adi: "",
      siparisno: "",
      faturaNo: "",
      Tutar_tl: 0,
      selectUrun: null,
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
      kaydetVisible2: true,
      yenikaydetVisible: true,
      vazgecVisible: true,
      siparisToplu: [],

      urunler: null,
    };
  },

  localService: null,

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
    siparisUrunSec(event) {
      if (this.selectUrun) {
        this.urunler = { ...event.data };

        this.firma_id = this.urunler.Firma_id;
        this.Tutar_dolar = this.urunler.Tutar_dolar;

        this.siparis = this.urunler.siparisno;
        this.siparis = this.siparis_list.filter(
          (x) => x.siparisno == this.urunler.siparisno
        );

        this.faturaNo = this.urunler.faturaNo;
        this.firma_adi = this.urunler.firma_adi;
        this.Tutar_tl = this.urunler.Tutar_tl;
        this.kur = this.urunler.kur;
      }
    },
    kurSecim() {
      console.log("kursecim");
      const d = this.tarih;

      const year = d.getFullYear(); // 2021
      const mount = d.getMonth();
      const day = d.getDate();

      service2.getGuncelKur(year, mount + 1, day).then((data) => {
        this.kur = data.result;
      });
    },
    indexBul(id, liste) {
      let index = -1;
      if (!liste != null) {
        for (let i = 0; i < liste.length; i++) {
          if (liste[i].id === id) {
            index = i;
            break;
          }
        }
      }

      return index;
    },
    btn_sil_click() {
      let index = this.indexBul(this.urunler.id, this.siparisToplu);

      this.siparisToplu.splice(index, 1);
      this.form_btn_reset();
    },
    btn_degistir_click() {
      this.urunIslemleri();
      let index = this.indexBul(this.urunler.id, this.siparisToplu);
      this.siparisToplu[index] = this.urunler;
      this.form_btn_reset();
      this.selectUrun = null;
    },

    idOlustur() {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (var i = 0; i < 8; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    urunIslemleri() {
      this.urunler.Firma_id = this.firma.Firma_id;
      this.urunler.Tutar_dolar = this.Tutar_dolar;
      this.urunler.siparisno = this.siparis.siparisno;
      this.urunler.faturaNo = this.faturaNo;
      this.urunler.firma_adi = this.firma.firma_adi;
      this.urunler.Tutar_tl = this.Tutar_tl;
      this.urunler.kur = this.kur;
      (this.urunler.kullaniciAdi = this.$store.getters.__getUsername),
        (this.urunler.tarih = this.localService.getDateString(this.tarih));
      if (!this.urunler.id) {
        this.urunler.id = this.idOlustur();
      }
    },
    btn_ekle_click() {
      this.urunIslemleri();
      this.siparisToplu.push({ ...this.urunler });
      this.form_btn_reset();
    },
    form_btn_reset() {
      this.Tutar_dolar = 0;
      this.siparis = "";
      this.Tutar_tl = 0;
      this.kur = 0;
      this.btn_yeni_click();
    },
    btn_yeni_click() {
      this.kaydetVisible2 = false;
      service.getNakliyeYeniUrunModel().then((data) => {
        this.urunler = { ...data.nakliye_model };
      });
    },
    yeniFirmaGiris() {
      this.is_firma_alani = true;

      this.kayitolustur();
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    kayitolustur() {
      this.kaydetVisible1 = false;

      this.yenikayitVisible = true;
      this.nakliye_data2 = [];
      this.vazgecVisible = false;
      this.dis_numuneDosyayukle = true;

      service.getNakliyeIslemListesi().then((data) => {
        console.log("getNakliyeIslemListesi",data)
        this.firma_list = data.nakliye_liste;
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
    dolar_input_event(event) {
      if (event) this.Tutar_dolar = event.replace(",", ".");

      if (this.kur != 0) {
        this.Tutar_tl = this.Tutar_dolar * this.kur;
        this.Tutar_tl = (this.Tutar_tl / 1).toFixed(2).replace(",", ".");
      }
    },
    miktar_input_event(event) {
      this.Tutar_tl = this.Tutar_tl.replace(",", ".");
      // if (event) this.Tutar_tl = event.replace(",", ".");
      if (this.kur != 0) {
        if (this.Tutar_tl > 0 && this.kur > 0) {
          this.Tutar_dolar = this.Tutar_tl / this.kur;
          this.Tutar_dolar = (this.Tutar_dolar / 1)
            .toFixed(2)
            .replace(",", ".");
        }
      }
    },
    toplam_adet_hesapla(event) {
      if (event) this.kur = event.replace(",", ".");
      if (this.Tutar_tl > 0 && this.kur > 0) {
        this.Tutar_dolar = this.Tutar_tl / this.kur;
        this.Tutar_dolar = (this.Tutar_dolar / 1).toFixed(2).replace(",", ".");
        this.Tutar_tl = (this.Tutar_tl / 1).toFixed(2).replace(",", ".");
      }
    },

    nakliyeDosyaGonder(event) {
      fileService
        .nakliyeDosyaGonder(
          event,
          this.nakliye_data2.Firma_id,
          this.nakliye_data2.faturaNo + ".pdf"
        )
        .then((data) => {
          console.log("nakliyeDosyaGonder 3", data);

          service.setNakliyeFaturaKayit(this.siparisToplu).then((veri) => {
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
      if (!this.firma) {
        alert("Firma Adını Seçiniz.");
        return;
      }
      if (this.faturaNo == "") {
        alert("Fatura Numarasını Seçiniz..");
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

        tarih: this.localService.getDateString(this.tarih),
      };

      service.nakliyeKaydet(this.siparisToplu).then((status) => {
        service.getNakliyeUrunModel(this.faturaNo).then((data) => {
          const nakliye_data2 = {
            siparisno: nakliye_data.siparisno,
            firma_adi: nakliye_data.firma_adi,
            faturaNo: nakliye_data.faturaNo,
            Tutar_tl: nakliye_data.Tutar_tl,
            kur: nakliye_data.kur,
            Firma_id: nakliye_data.Firma_id,
            Tutar_dolar: nakliye_data.Tutar_dolar,
            urunID: data.nakliye_liste[0].id,
            tarih: nakliye_data.tarih,
            kullaniciAdi: this.$store.getters.__getUsername,
          };
          this.nakliye_data2 = nakliye_data2;
        });

        if (status.status) {
          alert("Başarılı! Şimdi Evrağı Yükleyiniz.");
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
    service.getNakliyeIslemListesi().then((data) => {
      this.firma_list = data.nakliye_liste;
      this.siparis_list = data.siparis_list;
    });
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

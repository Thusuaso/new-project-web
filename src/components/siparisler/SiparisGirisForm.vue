<template>
  <div class="columns">
    <div class="column is-9">
      <TabView>
        <TabPanel header="SİPARİŞ BİLGİLERİ">
          <siparis-bilgileri
            v-model:siparisUrunler="siparisUrunler"
            :siparisUrunLoading="siparisUrunLoading"
            :urunModel="urunModel"
            :yeniSiparis="yeniSiparis"
            :urunler_yeni="urunler_yeni"
            :urunler_degisenler="urunler_degisenler"
            :urunler_silinenler="urunler_silinenler"
            :siparisNo="dtSiparisNo"
            @siparisBilgileriDegisim="kayitDurum = $event"
            @siparisUrunDegisim="faturaBilgileriGuncelle"
          />
        </TabPanel>
        <TabPanel header="PROFORMA BİLGİLERİ">
          <proforma-bilgileri
            @proformaBilgileriDegisim="kayitDurum = $event"
            @odemeTur="odemeTurDegisim($event)"
            @navlunDigerTutarDegisim="faturaBilgileriGuncelle"
            :siparisNo="dtSiparisNo"
            :siparisUrunler="siparisUrunler"
          />
        </TabPanel>
        <TabPanel header="MASRAFLAR">
          <masraflar :siparisNo="dtSiparisNo" :yeniSiparis="yeniSiparis" />
        </TabPanel>
        <TabPanel header="TEDARİKÇİLER">
          <tedarikciler
            :siparisUrunler="siparisUrunler"
            :siparisNo="dtSiparisNo"
          />
        </TabPanel>
        <TabPanel header="EVRAKLAR">
          <evraklar :siparisNo="dtSiparisNo" :siparisUrunler="siparisUrunler" />
        </TabPanel>
        <TabPanel header="ÇEKİ LİSTESİ">
          <ceki-listesi :siparisNo="dtSiparisNo" :yeniSiparis="yeniSiparis" />
        </TabPanel>
        <TabPanel header=" CHAT">
          <chat :siparisNo="dtSiparisNo" :yeniSiparis="yeniSiparis" />
        </TabPanel>
        <TabPanel header="KALAN SİPARİŞ BİLGİSİ">
          <gidecek-sip-bilgileri
            :selectOrderNo="dtSiparisNo"
          ></gidecek-sip-bilgileri>
        </TabPanel>
        
      </TabView>
    </div>

    <div class="column is-3">
      <div class="columns">
        <div class="column is-12">
          <Card>
            <template #content>
              <div class="columns">
                <div class="column">
                  <Button
                    :disabled="kayitDurum"
                    @click="siparisKaydet"
                    label="KAYDET"
                    icon="pi pi-save"
                  />
                </div>
                <div class="column">
                  <Button
                    @click="siparisBol"
                    label="Böl"
                    icon="pi pi-th-large"
                    class="p-button-info"
                  />
                </div>
                <div class="column">
                  <Button label="Çık" @click="close" class="p-button-danger" />
                </div>
              </div>
            </template>
          </Card>
          <Card>
            <template #header>
              <span style="text-decoration: underline; margin-left: 120px">
                Sipariş Bilgileri
              </span>
            </template>
            <template #content>
              <InputText
                id="siparisNo"
                :disabled="!yeniSiparis"
                v-model="siparis.siparisNo"
                placeholder="Sipariş No"
                class="inputs"
                @input="kayitDurum = false"
              />
              <Calendar
                v-model="siparisTarihi"
                :disabled="!yeniSiparis"
                :value="siparis.siparisTarihi"
                :showIcon="true"
                dateFormat="dd/mm/yy"
                @date-select="siparisTarihiDegisim"
                placeholder="Sipariş Tarihi"
                class="inputs"
              />
              <Calendar
                v-model="TahminiyuklemeTarihi"
                :value="siparis.TahminiyuklemeTarihi"
                :showIcon="true"
                dateFormat="dd/mm/yy"
                @date-select="TahminiyuklemeTarihiDegisim"
                placeholder="Tahmini Yükleme"
                class="inputs"
              />

              <AutoComplete
                id="firmaAdi"
                :disabled="!yeniSiparis"
                v-model="musteri"
                :suggestions="filterMusteriList"
                @complete="aramaMusteri($event)"
                optionLabel="firmaAdi"
                :dropdown="true"
                @item-select="musteriDegisim"
                placeholder="Müşteri Adı"
                class="inputs"
              />
            </template>
          </Card>
          <Card>
            <template #content>
              <AutoComplete
                v-model="kullanici"
                :suggestions="filterKullaniciList"
                @complete="aramaKullanici($event)"
                optionLabel="kullaniciAdi"
                placeholder="Satışçı"
                :dropdown="true"
                class="inputs"
                @item-select="kullaniciDegisim"
              >
                <template #items="slotProps">
                  <div class="p-clearfix p-autocomplete-brand-item">
                    <div>{{ slotProps.kullaniciAdi }}</div>
                  </div>
                </template>
              </AutoComplete>
              <AutoComplete
                v-model="kullaniciOp"
                :suggestions="filterOperasyonKullaniciList"
                @complete="aramaOperasyonKullanici($event)"
                optionLabel="kullaniciAdi"
                placeholder="Operasyon"
                :dropdown="true"
                @item-select="kullaniciOpDegisim"
                class="inputs"
              />
              <AutoComplete
                v-model="kullaniciFinans"
                :suggestions="filterFinansmanKullaniciList"
                @complete="aramaFinansmanKullanici($event)"
                optionLabel="kullaniciAdi"
                placeholder="Finansman"
                :dropdown="true"
                @item-select="kullaniciFinansmanDegisim"
                class="inputs"
              />
            </template>
          </Card>
          <Card>
            <template #content>
              <span class="p-float-label">
                <input-currency
                  id="toplam"
                  :disAktif="true"
                  :value="siparis.malBedeli"
                  @input="siparis.malBedeli = $event"
                  class="inputs"
                />
                <label for="toplam">Toplam</label>
              </span>
              <br />
              <span class="p-float-label">
                <input-currency
                  id="navlun"
                  :disAktif="true"
                  :value="siparis.navlunSatis"
                  @input="siparis.navlunSatis = $event"
                  class="inputs"
                />
                <label for="navlun">Navlun</label>
              </span>
              <br />

              <span class="p-float-label">
                <input-currency
                  id="diger"
                  :disAktif="true"
                  :value="siparis.digerTutarToplam"

                  @input="siparis.digerTutarToplam = $event"
                  class="inputs"
                />
                <label for="diger">Diğer</label>
              </span>
              <br />

              <span class="p-float-label">
                <input-currency
                  id="genelToplam"
                  :disAktif="true"
                  :value="siparis.genelToplam"
                  @input="siparis.genelToplam = $event"
                  class="inputs"
                />
                <label for="genelToplam">Genel Toplam</label>
              </span>
              <br />

              <span class="p-float-label">
                <InputNumber class="p-inputtext-sm" id="detayAlis_3" @input="siparis.pesinat = $event.value.replace(',','.')"
                  v-model="siparis.pesinat" :disabled="disPesinat" mode="currency" currency="USD" locale="jp-JP" inputStyle="text-align:center;" style="width:100%;height:40px;"/>

                <label for="pesinat">Peşinat</label>
              </span>
            </template>
          </Card>
          <Card>
            <template #header>
              <span style="text-decoration: underline; margin-left: 120px"
                >Yükleme Detayları</span
              >
            </template>
            <template #content>
              <span class="p-float-label">
                <Calendar
                  id="yuklemeTarihi"
                  v-model="yuklemeTarihi"
                  :showIcon="true"
                  dateFormat="dd/mm/yy"
                  class="inputs"
                />

                <label for="yuklemeTarihi">Yükleme Tarihi</label>
              </span>
              <br />
              <span class="p-float-label">
                <Calendar
                  id="etaTarihi"
                  v-model="eta"
                  :showIcon="true"
                  dateFormat="dd/mm/yy"
                  class="inputs"
                />

                <label for="etaTarihi">Eta Tarihi</label>
              </span>
              <br />

              <span class="p-float-label">
                <InputText
                  id="konteynırNo"
                  v-model="siparis.konteynerNo"
                  class="inputs"
                />

                <label for="konteynırNo">Konteynır No</label>
              </span>
              <br />

              <span class="p-float-label">
                <InputText
                  id="siparisFaturaNo"
                  v-model="siparis.siparisFaturaNo"
                  class="inputs"
                />

                <label for="siparisFaturaNo">Sipariş Fatura No</label>
              </span>
            </template>
          </Card>
          <Card>
            <template #header>
              <span style="text-decoration: underline; margin-left: 120px"
                >Maliyet Toplamları</span
              >
            </template>
            <template #content>
              <span class="p-float-label">
                <input-currency
                  id="uretici"
                  :disAktif="true"
                  :value="uretici"
                  @input="maliyet.uretici = $event"
                  class="inputs"
                />

                <label for="uretici">Üretici</label>
              </span>
              <br />
              <span class="p-float-label">
                <input-currency
                  id="iscilik"
                  :disAktif="true"
                  :value="iscilik"
                  @input="maliyet.iscilik = $event"
                  class="inputs"
                />

                <label for="iscilik">İşçilik</label>
              </span>
              <br />

              <span class="p-float-label">
                <input-currency
                  id="navlun"
                  :disAktif="true"
                  :value="maliyet.navlun"
                  @input="navlun = $event"
                  class="inputs"
                />
                <label for="navlun">Navlun</label>
              </span>
              <br />

              <span class="p-float-label">
                <input-currency
                  id="digerTutarlar"
                  :disAktif="true"
                  :value="digerTutar"
                  class="inputs"
                />

                <label for="digerTutarlar">Diğer</label>
              </span>
              <br />

              <span class="p-float-label">
                <input-currency
                  id="komisyon"
                  :disAktif="true"
                  :value="komisyon"
                  @input="maliyet.komisyon = $event"
                  class="inputs"
                />

                <label for="komisyon">Komisyon</label>
              </span>
              <br />

              <span class="p-float-label">
                <input-currency
                  id="mekus"
                  :disAktif="true"
                  :value="mekus_masraf"
                  @input="maliyet.mekus_masraf = $event"
                  class="inputs"
                />

                <label for="mekus">Mekus</label>
              </span>
              <br />

              <span class="p-float-label">
                <input-currency
                  id="fobMasraf"
                  :disAktif="true"
                  :value="fobMasraf"
                  @input="maliyet.fobMasraf = $event"
                  class="inputs"
                />

                <label for="fobMasraf">Fob Masraf</label>
              </span>
              <br />

              <span class="p-float-label">
                <input-currency
                  :disAktif="true"
                  id="genelToplam"
                  :value="genelToplam"
                  class="inputs"
                />

                <label for="genelToplam">Genel Toplam</label>
              </span>
              <br />

              <span class="p-float-label">
                <input-currency
                  id="profit"
                  :disAktif="true"
                  :value="siparis.genelToplam - genelToplam"
                  class="inputs"
                />

                <label for="profit">Profit (USD)</label>
              </span>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="isSipBolForm"
    :modal="true"
    header="Sipariş Bölme Form"
    position="top"
  >
    <siparisBolmeAlani :sipBilgiler="sipData" :isPesinat="isPesinat">
    </siparisBolmeAlani>
  </Dialog>
</template>

<script>
import SiparisBilgileri from "./siparisGiris/SiparisBilgileri";
// import Etiketler from './siparisGiris/Etiketler';

import ProformaBilgileri from "../../components/siparisler/siparisGiris/ProformaBilgileri";
import Masraflar from "../../components/siparisler/siparisGiris/Masraflar";
import Tedarikciler from "../../components/siparisler/siparisGiris/Tedarikciler";
import siparisService from "../../service/SiparisService";
import MusteriService from "../../service/MusteriService";
import KullaniciService from "../../service/KullaniciService";
import LocalService from "../../service/LocalService";
import CekiListesi from "../../components/siparisler/siparisGiris/CekiListesi";
import Evraklar from "../../components/siparisler/siparisGiris/Evraklar";
import Chat from "../../components/siparisler/siparisGiris/Chat";
import CurrencyInput2 from "../../components/shared/CurrencyInput2";
import socket from "../../service/SocketService";
import { mapGetters } from "vuex";
import store from "@/store";
import SiparisBolmeAlani from "../../components/siparisler/siparisListeler/SiparisBolmeAlani.vue";
import GidecekSipBilgileriRaporuUretim from "../../components/raporlar/GidecekSipBilgileriRaporuUretim.vue";

export default {

  data() {
    return {
      iscilikData: 0,
      sipData: null,
      isSipBolForm: false,
      isYeniSiparisForm: false,
      siparisFormBaslik: "",
      dialogVisible: false,
      yeniSiparis2: true,
      siparisTarihi: null,
      TahminiyuklemeTarihi: null,
      yuklemeTarihi: null,
      eta: null,
      musteri: null,
      musteriList: null,
      filterMusteriList: null,
      kullanici: null,
      kullaniciOp: null,
      kullaniciFinans: null,
      kullaniciList: null,
      OperasyonkullaniciList: null,
      FinansmankullaniciList: null,
      filterKullaniciList: null,
      filterOperasyonKullaniciList: null,
      filterFinansmanKullaniciList: null,
      siparis: {
        siparisNo: "",
      },
      siparisUrunler: {},
      siparisUrunLoading: true,
      disPesinat: true,
      urunModel: null,
      urunler_yeni: [],
      urunler_degisenler: [],
      urunler_silinenler: [],
      kayitDurum: true,
      maliyet: {
        fobMasraf: 0,
        uretici: 0,
        navlun: 0,
        komisyon: 0,
        digerTutar: 0,
        genelToplam: 0,
        iscilik: 0,
        mekus_masraf: 0,
      },
      localMasraflar: null,
      // profData: {},
      isPesinat: true,
    };
  },
  props: {
    dtSiparisNo: {
      type: String,
      required: false,
      default: "",
    },
    yeniSiparis: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters([
      "kayit_kontrol_degeri",
      "iscilik",
      "genelToplam",
      "uretici",
      "fobMasraf",
      "navlun",
      "komisyon",
      "digerTutar",
      "mekus_masraf",
      'masraflar'
    ]),
  },
  watch: {
    kayit_kontrol_degeri: function () {
      this.kayitDurum = this.kayit_kontrol_degeri;
    },
  },
  components: {
    siparisBolmeAlani: SiparisBolmeAlani,
    siparisBilgileri: SiparisBilgileri,
    proformaBilgileri: ProformaBilgileri,
    masraflar: Masraflar,
    tedarikciler: Tedarikciler,
    cekiListesi: CekiListesi,
    inputCurrency: CurrencyInput2,
    evraklar: Evraklar,
    chat: Chat,
    gidecekSipBilgileri: GidecekSipBilgileriRaporuUretim,
    // Etiketler
  },
  musteriService: null,
  kullaniciService: null,
  localService: null,
  methods: {
    pesinatDegisim(event) {
      console.log("pesinatDegisim", event)
      this.siparis.pesinat = event.target._value
    },
    close() {
      if (this.kayitDurum == false) {
        if (confirm("Kaydetmeden çıkmak istediğinize emin misiniz?")) {
          this.emitter.emit("kaydetmeden_cikma", false);
        }
      } else {
        this.emitter.emit("kaydetmeden_cikma", false);
      }
    },
    siparisBol() {
      this.isSipBolForm = true;
      if (this.sipData.siparis.pesinat > 0) {
        this.isPesinat = false;
      }
    },
    aramaMusteri(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.musteriList];
        } else {
          result = this.musteriList.filter((ted) => {
            return ted.firmaAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterMusteriList = result;
      }, 250);
    },
    aramaKullanici(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.kullaniciList];
        } else {
          result = this.kullaniciList.filter((ted) => {
            return ted.kullaniciAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterKullaniciList = result;
      }, 250);
    },
    aramaOperasyonKullanici(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.OperasyonkullaniciList];
        } else {
          result = this.OperasyonkullaniciList.filter((ted) => {
            return ted.kullaniciAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterOperasyonKullaniciList = result;
      }, 250);
    },
    aramaFinansmanKullanici(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.FinansmankullaniciList];
        } else {
          result = this.FinansmankullaniciList.filter((ted) => {
            return ted.kullaniciAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterFinansmanKullaniciList = result;
      }, 250);
    },
    siparisTarihiDegisim() {
      this.siparis.siparisTarihi = this.localService.getDateString(
        this.siparisTarihi

      );
      this.kayitDurum = false;
    },
    TahminiyuklemeTarihiDegisim() {
      this.siparis.TahminiyuklemeTarihi = this.localService.getDateString(
        this.TahminiyuklemeTarihi
      );
      this.kayitDurum = false;
    },
    faturaBilgileriGuncelle() {
      //ürün toplamı alma
      this.siparis.malBedeli = 0;

      for (let key in this.siparisUrunler) {
        this.siparis.malBedeli += this.siparisUrunler[key].satisToplam;
      }

      this.siparis.digerTutarToplam =
        this.siparis.detayTutar_1 +
        this.siparis.detayTutar_2 +
        this.siparis.detayTutar_3 +
      this.siparis.sigorta_tutar_satis

      this.siparis.genelToplam =
        this.siparis.malBedeli +
        this.siparis.navlunSatis +
        this.siparis.digerTutarToplam;
      this.$store.dispatch("navlun_act", this.siparis.navlunSatis);

      this.maliyetYenile();
    },

    siparisKaydet() {
      if (this.kayitDurum != true) {
        this.kayitDurum = true;

        store.dispatch("kayit_kontrol_degeri_act", true);
        if (this.yeniSiparis){
          this.yeniSiparisKayit()

        }
        else {
          this.siparisGuncelleme();

        } 
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Uyarı Ekranı",
          detail: "Sipariş iki kez kaydedilemez",
        });
      }
    },
    yeniSiparisKayit() {
      const username = this.$store.getters.__getUsername.toUpperCase();
      const username2 = this.$store.getters.__getUsername.toLowerCase();
      this.ad = username[0] + username2.substring(1);

      this.siparis.kayit_kisi = this.ad;

      this.siparis.siparisDurumId = 2;
      if (this.siparis.odemeTurId == 1 || this.siparis.odemeTurId == 2)
        this.siparis.siparisDurumId = 1;

      const siparisVeri = {
        siparis: this.siparis,
        siparisUrunler: this.siparisUrunler,
      };
      if (this.control(siparisVeri)) {
        this.kayitDurum = true;
        this.$store.dispatch('fullscreenLoadingAct', true)
        siparisService.getSiparisKayitControl(this.siparis.siparisNo).then(data => {
          if (data) {
            siparisService.setSiparisKaydet(siparisVeri).then((data) => {
              if (data.status == true) {
                this.$store.dispatch('fullscreenLoadingAct', false)
                let info = this.siparis.kayit_kisi + ' ' + this.siparis.siparisNo + ' siparişini sisteme girdi.'
                socket.siparis.emit('send_message_home_event',info)
                this.$toast.add({
                  severity: "success",
                  summary: "Bilgi Ekranı",
                  detail: "Sipariş Kaydı Tamamlandı.",
                  life: 5000,
                });
                this.kayitDurum = true;
                this.emitter.emit('siparisler_dialog_close',false)
                socket.siparis.emit("siparisler_list_event")
                // eslint-disable-next-line vue/no-mutating-props
                this.yeniSiparis = false;

                this.siparisUrunler = {}

                return;
              } else {
                this.$store.dispatch('fullscreenLoadingAct', false)

                this.$toast.add({
                  severity: "error",
                  summary: "Bilgi Ekranı",
                  detail: "Sipariş Kaydı Yapılamadı. Tekrar Deneyiniz",
                  life: 5000,
                });
                this.kayitDurum = false;

              }
            });
          } else {
            this.$store.dispatch('fullscreenLoadingAct', false)

            this.$toast.add({ severity: 'error', summary: 'Sipariş Kayıt', detail: 'Sipariş Zaten Kayıtlı.', life: 3000 })
            
          }
        })
      }
      
      
    },
    control(siparisVeri) {
      if (siparisVeri.siparis.faturaKesimTurId == null) {
        alert('Fatura Türünü Seçiniz!')
        return false
      } else if (siparisVeri.siparis.siparisNo == "" || siparisVeri.siparis.siparisNo == null) {
        alert('Sipariş No Giriniz!')
        return false
    }

      else if (siparisVeri.siparis.musteriId == null) {
        alert('Müşteriyi Seçiniz!')

        return false
      } else if (siparisVeri.siparis.finansman == 0) {
        alert('Finansmanı Seçiniz!')
        return false
      } else if (siparisVeri.siparis.operasyon == 0) {
        alert('Operasyoncuyu Seçiniz!')
        return false
      } else if (siparisVeri.siparis.ulkeId == null) {
        alert('Ülkeyi Seçiniz!')
        return false
      } else if (siparisVeri.siparis.siparisSahibi == "" || siparisVeri.siparis.siparisSahibi == null) {
        alert('Sipariş Sahibini Seçiniz!')
        return false
      } else if (siparisVeri.siparis.siparisTarihi == "") {
        alert('Sipariş Tarihini Giriniz!')
        return false
      } else if (siparisVeri.siparis.teslimTurId == null) {
        alert('Teslim Türünü Seçiniz!')
        return false
      } else if (siparisVeri.siparis.odemeTurId == null) {
        alert('Ödeme Türünü Seçiniz!')
        return false
      } else if (siparisVeri.siparisUrunler.length == 0) {
        alert('Ürün Bilgilerini Giriniz!')
        return false
      } 

      else {
        return true
      }
    },

    
    siparisGuncelleme() {
      const username = this.$store.getters.__getUsername.toUpperCase();
      const username2 = this.$store.getters.__getUsername.toLowerCase();
      this.ad = username[0] + username2.substring(1);
      this.siparis.kayit_kisi = this.ad;

      const siparisVeri = {
        siparis: this.siparis,
        urunlerYeni: this.urunler_yeni,
        urunlerDegisenler: this.urunler_degisenler,
        urunlerSilinenler: this.urunler_silinenler,
        degisimMasraflar: this.masraflar
      };
      this.$store.dispatch('fullscreenLoadingAct', true)
      siparisService.setSiparisGuncelle(siparisVeri).then((data) => {
        if (data.status == true) {
          const masraflarList = []
          for (let item of this.masraflar) {
            if (item.isChange == 1) {

              masraflarList.push(item)
            } else {
                continue
            }
          }
          if (masraflarList.length > 0) {
            let info = ""
            for (let item of masraflarList) {
              info = this.siparis.siparisNo + ' Po ya sahip ' + item.label + ' ' +  this.siparis.kayit_kisi +' tarafından degiştirildi.'
              socket.siparis.emit('send_message_home_event', info)
            }
          } else {
            if (this.urunler_degisenler.length > 0) {
              let info = "";
              for (let item of this.urunler_degisenler) {
                info = this.siparis.kayit_kisi + ' ' + this.siparis.siparisNo + ' po ya ait ' + item.musteriAciklama + ' ürününde değişiklik yaptı.'
                socket.siparis.emit('send_message_home_event', info)

              }
            }
            
          }
          this.$store.dispatch('fullscreenLoadingAct', false)

          this.$toast.add({
            severity: "success",
            summary: "Bilgi Ekranı",
            detail: "Sipariş Değişiklikleri Yapıldı.",
            life: 5000,
          });
          this.urunler_yeni = [];
          this.kayitDurum = true;
          // let siparisDurum = "";
          // if (this.siparis.siparisDurumId == 1) siparisDurum = "bekleyen";
          // if (this.siparis.siparisDurumId == 2) siparisDurum = "üretim";
          // if (this.siparis.siparisDurumId == 3) siparisDurum = "sevk";
          socket.siparis.emit("siparisler_list_event")
          this.emitter.emit('siparisler_dialog_close', false)



        } else {
          this.$store.dispatch('fullscreenLoadingAct', false)

          this.$toast.add({
            severity: "error",
            summary: "Bilgi Ekranı",
            detail: "Sipariş Değişiklik Kaydı Yapılamadı. Tekrar Deneyiniz",
            life: 5000,
          });
        }
      });
    },
    odemeTurDegisim(event) {
      const username = this.$store.getters.__getUsername.toLowerCase();

      this.disPesinat = true;
      if (event == 1) this.siparis.pesinat = this.siparis.genelToplam;
      if (event == 2) {
        if (username == "huseyin") {
          this.disPesinat = false;
        }
      }
      this.kayitDurum = false;
    },
    musteriDegisim() {
      if (this.musteri) {
        this.siparis.musteriId = this.musteri.id;
        this.kayitDurum = false;
      }
    },

    kullaniciDegisim() {
      let then = this.siparis.siparisSahibi;
      let now = this.kullanici.id;
      let orderNo = this.siparis.siparisNo;
      let info = "Satışçı";

      const datas = {
        then: then,
        now: now,
        orderNo: orderNo,
        username: this.$store.getters.__getUsername,
        info: info,
      };
      if (!this.yeniSiparis) {
        siparisService.getOpChangeMailSend(datas).then((data) => {
          console.log(data);
        });
      }
      if (this.kullanici) {
        this.siparis.siparisSahibi = this.kullanici.id;
        this.kayitDurum = false;
      }
    },
    kullaniciOpDegisim() {
      let then = this.siparis.operasyon;
      let now = this.kullaniciOp.id;
      let orderNo = this.siparis.siparisNo;
      let info = "Operasyon";

      const datas = {
        then: then,
        now: now,
        orderNo: orderNo,
        username: this.$store.getters.__getUsername,
        info: info,
      };
      if (!this.yeniSiparis) {
        siparisService.getOpChangeMailSend(datas).then((data) => {
          console.log(data);
        });
      }
      if (this.kullaniciOp) {
        this.siparis.operasyon = this.kullaniciOp.id;
        this.kayitDurum = false;
      }
    },
    kullaniciFinansmanDegisim() {
      if (this.kullaniciFinans) {
        this.siparis.finansman = this.kullaniciFinans.id;
        this.kayitDurum = false;
      }
    },
    maliyetYenile() {

      this.maliyet.fobMasraf = 0;
      this.maliyet.uretici = 0;
      //    if (parseFloat(this.iscilikData) != 0) {

      //        this.maliyet.iscilik += parseFloat(this.iscilikData)
      //    } else {
      //      this.maliyet.iscilik = 0
      //      this.maliyet.iscilik = this.siparis.iscilikTutar;

      //    }
      this.maliyet.iscilik = this.siparis.iscilikTutar;

      //local masraflar
      for (let key in this.localMasraflar) {
        this.maliyet.fobMasraf += this.localMasraflar[key].tutar;
      }

      //ürünler
      for (let key in this.siparisUrunler) {
        let data = this.siparisUrunler[key];

        this.maliyet.uretici += data.alisFiyati * data.miktar;
      }

      this.maliyet.navlun = this.siparis.navlunAlis;
      this.maliyet.komisyon = this.siparis.komisyon;
      this.maliyet.digerTutar =
        this.siparis.detayAlis_1 +
        this.siparis.detayAlis_2 +
        this.siparis.detayAlis_3 +
      this.siparis.evrakGideri +
          this.siparis.sigorta_tutar
      this.maliyet.mekus_masraf = this.siparis.mekus_masraf;
      //    this.maliyet.genelToplam = this.maliyet.fobMasraf + this.maliyet.uretici + this.maliyet.navlun + this.maliyet.digerTutar + this.maliyet.iscilik +this.maliyet.mekus_masraf ;
      this.$store.dispatch("iscilik_act", this.maliyet.iscilik);
      this.$store.dispatch('fob_masraf_act', this.maliyet.fobMasraf)
      this.$store.dispatch("uretici_act", this.maliyet.uretici);
      this.$store.dispatch("navlun_act", this.maliyet.navlun);
      this.$store.dispatch("komisyon_act", this.maliyet.komisyon);
      this.$store.dispatch("diger_tutar_act", this.maliyet.digerTutar);
      this.$store.dispatch("mekus_masraf_act", this.maliyet.mekus_masraf);
      this.$store.dispatch("genel_toplam_act");
    },
    musteriListYukle() {
      this.musteriService.getMusteriList().then((data) => {
        this.musteriList = data;

        this.musteri = data.find((x) => x.id == this.siparis.musteriId);
      });
    },
    kullaniciListYukle() {
      this.kullaniciService.getKullaniciList().then((data) => {
        this.kullaniciList = data;
        

        this.kullanici = data.find((x) => x.id == this.siparis.siparisSahibi);
        this.kullaniciOp = data.find((x) => x.id == this.siparis.operasyon);
        this.kullaniciFinans = data.find((x) => x.id == this.siparis.finansman);

      });

      this.kullaniciService.getOperasyonKullaniciList().then((data) => {
        this.OperasyonkullaniciList = data;

        this.FinansmankullaniciList = data;
      });
    },
    siparisList() {
      if (!this.yeniSiparis) {
        siparisService.getSiparis(this.dtSiparisNo).then((data) => {
          this.$store.dispatch("profData_load_act", data.siparis);

          this.sipData = data;
          this.siparis = data.siparis;
          this.pesinat = this.siparis.pesinat
          this.kullaniciListYukle();
          this.musteriListYukle();

          this.siparisUrunler = data.siparisUrunler;
          // this.profData = data.siparis;
          this.urunModel = data.urunModel;
          this.siparisUrunLoading = false;

          this.siparisTarihi = this.localService.getStringDate(
            this.siparis.siparisTarihi
          );
          const d = new Date(this.siparis.TahminiyuklemeTarihi);
          var year = d.getFullYear();

          if (year <= "1900") {
            this.TahminiyuklemeTarihi = null;
          } else {
            this.TahminiyuklemeTarihi = this.localService.getStringDate(
              this.siparis.TahminiyuklemeTarihi
            );
          }

          //
          const d2 = new Date(this.siparis.eta);
          var year2 = d2.getFullYear();
          if (this.siparis.siparisDurumId == 3) {
            this.yuklemeTarihi = this.localService.getStringDate(
              this.siparis.yuklemeTarihi
            );
          }

          if (year2 <= "1900") {
            this.eta = null;
          } else {
            if (this.siparis.eta.length > 0) {
              this.eta = this.localService.getStringDate(this.siparis.eta);
            }
          }

          /*if(this.siparis.siparisDurumId == 3){
              this.yuklemeTarihi = this.localService.getStringDate(this.siparis.yuklemeTarihi)
          }
  
          if(this.siparis.eta.length > 0) {
              this.eta = this.localService.getStringDate(this.siparis.eta)
          }*/

          siparisService
            .getMasrafListesi(this.dtSiparisNo)
            .then((data) => {
              this.localMasraflar = data.filter((x) => x.tur != "Navlun");
              this.localMasraflar = this.localMasraflar.filter(
                (x) => x.tur != "Özel İşçilik"
              );
              this.maliyetYenile();
            });

          this.siparisUrunLoading = false;
          this.$store.dispatch('fullscreenLoadingAct', false)

        });
      } else {
        siparisService.getSiparisModel().then((data) => {
          this.$store.dispatch("profData_load_act", data.siparis);

          this.siparis = data.siparis;
          

          this.kullaniciListYukle();
          this.musteriListYukle();
          this.maliyetYenile();
          this.siparisUrunler = data.siparisUrunler;
          // this.profData = data.siparis;

          this.siparisUrunLoading = false;
          this.urunModel = data.urunModel;
        });
      }
    },
  },
  created() {
    this.maliyet.iscilik = 0;
    this.musteriService = new MusteriService();
    this.kullaniciService = new KullaniciService();
    this.localService = new LocalService();
    this.siparisList();
    this.kullaniciListYukle();
  },
  mounted() {
    this.emitter.on("navlunSatis", (data) => {
      // this.siparis.genelToplam += data.target.value
      console.log(data);
      this.faturaBilgileriGuncelle();
    });
    socket.siparis.on("siparis_iscilik_emit", (data) => {
      this.siparis.iscilikTutar = data.iscilikToplam;
    });

    this.emitter.on('currencyInputIscilik', data => {
        this.iscilikData = data
        this.maliyetYenile()

    })
    this.emitter.on('save_button_activated', data => {
      this.kayitDurum = data
     })
  },
};
</script>
<style scoped>
.p-float-label {
  font-size: 8px;
}
.inputs {
  width: 100%;
}
</style>

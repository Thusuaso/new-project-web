<template>
  <div class="columns">
    <div class="column is-5">
      <Card>
        <template #content>
          <span class="p-float-label">
            <AutoComplete
              id="teslimTurAdi"
              v-model="teslimTur"
              :suggestions="filterTeslimTurList"
              @complete="aramaTeslimTur($event)"
              field="teslimTurAdi"
              :dropdown="true"
              @item-select="teslimTurDegisim"
              class="inputs"
            >
              <template #items="slotProps">
                <div class="p-clearfix p-autocomplete-brand-item">
                  <div>
                    {{ slotProps.teslimTurAdi }}
                  </div>
                </div>
              </template>
            </AutoComplete>
            <label for="teslimTurAdi">Teslim Tür</label>
          </span>
          <br />
          <span class="p-float-label">
            <AutoComplete
              id="odemeTur"
              v-model="odemeTur"
              :suggestions="filterOdemeTurList"
              @complete="aramaOdemeTur($event)"
              field="odemeTurAdi"
              :dropdown="true"
              @item-select="odemeTurDegisim"
              class="inputs"
            >
              <template #items="slotProps">
                <div class="p-clearfix p-autocomplete-brand-item">
                  <div>
                    {{ slotProps.odemeTurAdi }}
                  </div>
                </div>
              </template>
            </AutoComplete>
            <label for="odemeTur">Ödeme Tür</label>
          </span>
          <br />

          <span class="p-float-label">
            <Calendar
              id="vade"
              ref="vadeCalendar"
              v-model="vade"
              :showIcon="true"
              dateFormat="dd/mm/yy"
              @date-select="vadeDegisim"
              class="inputs"
            />
            <label for="vade">Vade Tarihi</label>
          </span>
          <br/>
          <span class="p-float-label">
            <Calendar id="tahminieta" ref="tahminiEtaCalendar" v-model="tahmini_eta" :showIcon="true" dateFormat="dd/mm/yy"
              @date-select="tahminiEtaDegisim" class="inputs" />
            <label for="tahminieta">Tahmini Eta</label>
          </span>
          <br />

          <span class="p-float-label">
            <AutoComplete
              id="ulke"
              v-model="ulke"
              :suggestions="filterUlkeList"
              @complete="aramaUlke($event)"
              field="ulkeAdi"
              :dropdown="true"
              @item-select="ulkeDegisim"
              class="inputs"
            >
              <template #items="slotProps">
                <div class="p-clearfix p-autocomplete-brand-item">
                  <img
                    src="assets/layout/images/country-log/Afghanistan-64.png"
                    width="32"
                    style="display: inline-block; margin: 5px 0 2px 5px"
                  />
                  <div>{{ slotProps.ulkeAdi }}</div>
                </div>
              </template>
            </AutoComplete>
            <label for="ulke">Ülke</label>
          </span>
          <br />

          <span class="p-float-label">
            <InputText
              id="odemeAciklama"
              v-model="profData.odemeAciklama"
              @change="veriDegisim"
              class="inputs"
            />
            <label for="odemeAciklama">Ödeme Açıklama</label>
          </span>
          <br />

          <span class="p-float-label">
            <InputText
              id="liman"
              v-model="profData.liman"
              @change="veriDegisim"
              class="inputs"
            />
            <label for="liman">Liman</label>
          </span>
          <br />

          <span class="p-float-label">
            <InputText
              id="konteynirAyrinti"
              v-model="profData.konteynerAyrinti"
              @change="veriDegisim"
              class="inputs"
            />
            <label for="konteynirAyrinti">Konteynır Ayrıntı</label>
          </span>
          <br />

          <span class="p-float-label">
            <span class="tag">
              Evrak Gideri
            </span>
            <input class="input" v-model="profData.evrakGideri" @input="profData.evrakGideri = $event.target.value.replace(',','.')"
              @change="currencyDegisim('evrakGideri', $event)" />
          </span>
          <br />

          <span class="p-float-label">
            <span class="tag">
              Komisyon
            </span>
            <input class="input" id="komisyon" v-model="profData.komisyon" @input="profData.komisyon = $event.target.value.replace(',','.')"
              @change="currencyDegisim('komisyon', $event)" />            
          </span>
          <br />
          <span class="p-float-label">
            <InputNumber
              id="iade"
              v-model="profData.iade"
              @change="veriDegisim"
              class="inputs"
              mode="currency"
              currency="USD"
              locale="jp-JP"
            />
            <label for="iade">Iade</label>
          </span>
          <br />

          <span class="p-float-label">
            <AutoComplete
              id="faturaKesimTur"
              v-model="faturaTur"
              :suggestions="filterFaturaTurList"
              @complete="aramaFaturaTur($event)"
              field="faturaKesimTurAdi"
              :dropdown="true"
              @item-select="faturaTurDegisim"
              class="inputs"
            >
              <template #items="slotProps">
                <div class="p-clearfix p-autocomplete-brand-item">
                  <div>
                    {{ slotProps.faturaKesimTurAdi }}
                  </div>
                </div>
              </template>
            </AutoComplete>
            <label for="faturaKesimTur">Fatura</label>
          </span>
          <br />
          <div class="grid">
            <div class="col">
              <div class="field-checkbox">
                <Checkbox :disabled="dis_takipEt" id="takip" v-model="profData.depo" @change="DepoDegisim" :binary="true" />
                <label for="city3">Atlanta SM</label>
              </div>
            </div>
            <div class="col">
              <div class="field-checkbox">
                <Checkbox :disabled="dis_sigorta" v-model="profData.sigorta_id" @change="SigortaDegisim" :binary="true" />
                <label for="city3">Sigorta</label>
              </div>
            </div>
          </div>
          
          
          
          
        </template>
      </Card>
      <br />
    </div>

    <div class="column is-7">
      <Card class="cardStyle">
        <template #content>
          <span class="p-float-label" >
            <Textarea
              id="uretimAciklama"
              rows="6"
              :autoResize="false"
              cols="65"
              v-model="profData.uretimAciklama"
              @change="veriDegisim"
            />
            <label for="uretimAciklama">Üretim Açıklama</label>
          </span>
        </template>
      </Card>
      <Card class="cardStyle">
        <template #content>
          <span class="p-float-label">
            <Textarea
              id="sevkiyatAciklama"
              rows="6"
              :autoResize="false"
              cols="65"
              v-model="profData.sevkiyatAciklama"
              @change="veriDegisim"
            />
            <label for="sevkiyatAciklama">Sevkiyat Açıklama</label>
          </span>
        </template>
      </Card>
      <Card class="cardStyle">
        <template #content>
          <span class="p-float-label">
            <Textarea
              id="finansAciklama"
              rows="6"
              :autoResize="false"
              cols="65"
              v-model="profData.finansAciklama"
              @change="veriDegisim"
            />
            <label for="finansAciklama">Finans Açıklama</label>
          </span>
        </template>
      </Card>
      <Card class="cardStyle">
        <template #content>
          <!-- <FileUpload
            mode="basic"
            @select="faturaDosyaGonder($event)"
            v-model="file"
            :maxFileSize="1000000"
            :multiple="true"
            :auto="true"
          /> -->
          <custom-file-input
            baslik="Proforma Yükle"
            @sunucuDosyaYolla="faturaDosyaGonder($event)"
          />

          <br />
          <span style="color: red; margin-left: 35px">
            * Siparişi oluşturduktan sonra yükleme yapınız.</span
          ><br />
          <span style="color: red; margin-left: 35px">
            * Pdf formatında ve dosya isminin ' . ' içermediğine dikkat ediniz!
          </span>
        </template>
      </Card>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <Card>
        <template #content>
          <div class="columns">
            <div class="column is-3">
              <span class="tag">
                Navlun Satış ($)
              </span>
              <input class="input" v-model="profData.navlunSatis"
                @input="profData.navlunSatis = $event.target.value.replace(',','.')" @change="currencyDegisim('navlunSatis', $event)" />
            </div>
            <div class="column is-3">
              <span class="p-float-label">
                <span class="tag">
                  Navlun Firma
                </span>
                <InputText
                  id="navlunFirma"
                  class="input"
                  v-model="profData.navlunFirma"
                  @change="veriDegisim"
                />
              </span>
            </div>
            <div class="column is-3">

              <span class="tag">
                Navlun Alış ($)
              </span>
              <input class="input" v-model="profData.navlunAlis"
                @input="profData.navlunAlis = $event.target.value.replace(',','.')" @change="currencyDegisim('navlunAlis', $event)"/>
            </div>
            <div class="column is-3">
              <span class="p-float-label">
                <span class="tag">
                  Navlun Alış Not
                </span>
                <InputText
                  id="navlunMekmarNot"
                  class="input"
                  v-model="profData.navlunMekmarNot"
                  @change="veriDegisim"
                  
                />
              </span>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <span class="tag">
                Diğer-1 Satış ($)
              </span>
              <input class="input" v-model="profData.detayTutar_1"
                @input="profData.detayTutar_1 = $event.target.value.replace(',','.')" @change="currencyDegisim('detayTutar_1', $event)" />



            </div>
            <div class="column">
              <span class="p-float-label">
                <span class="tag">
                  Açıklama
                </span>
                <InputText
                  id="aciklama"
                  class="input"
                  v-model="profData.detayAciklama_1"
                  @change="veriDegisim"
                  
                />

              </span>
            </div>
            <div class="column">

              <span class="tag">
                Diğer-1 Alış ($)
              </span>
              <input class="input" v-model="profData.detayAlis_1"
                @input="profData.detayAlis_1 = $event.target.value.replace(',','.')" @change="currencyDegisim('detayAlis_1', $event)" />
            </div>
            <div class="column">
              <span class="p-float-label">
                <span class="tag">
                  Açıklama
                </span>
                <InputText
                  id="aciklama"
                  class="input"
                  v-model="profData.detayMekmarNot_1"
                  @change="veriDegisim"
                />
                

              </span>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <span class="tag">
                Diğer-2 Satış ($)
              </span>
              <input class="input" v-model="profData.detayTutar_2"
                @input="profData.detayTutar_2 = $event.target.value.replace(',','.')" @change="currencyDegisim('detayTutar_2', $event)" />
            </div>
            <div class="column">
              <span class="p-float-label">
                <span class="tag">
                  Açıklama
                </span>
                <InputText
                  id="aciklama"
                  class="input"
                  v-model="profData.detayAciklama_2"
                  @change="veriDegisim"
                />

              </span>
            </div>
            <div class="column">

              <span class="tag">
              Diğer-2 Alış ($)
              </span>
              <input class="input" v-model="profData.detayAlis_2"
                @input="profData.detayAlis_2 = $event.target.value.replace(',','.')" @change="currencyDegisim('detayAlis_2', $event)" />
            </div>
            <div class="column">
              <span class="p-float-label">
                <span class="tag">
                  Açıklama
                </span>
                <InputText
                  id="aciklama"
                  class="input"
                  v-model="profData.detayMekmarNot_2"
                  @change="veriDegisim"
                />

              </span>
            </div>
          </div>
          <div class="columns">
            <div class="column">

              <span class="tag">
                Diğer-3 Satış ($)
              </span>
              <input class="input" v-model="profData.detayTutar_3"
                @input="profData.detayTutar_3 = $event.target.value.replace(',','.')" @change="currencyDegisim('detayTutar_3', $event)"/>
            </div>
            <div class="column">
              <span class="p-float-label">
                <span class="tag">
                  Açıklama
                </span>
                <InputText
                  class="input"
                  id="aciklama"
                  v-model="profData.detayAciklama_3"
                  @change="veriDegisim"
                />

              </span>
            </div>
            <div class="column">

              <span class="tag">
                Diğer-3 Alış ($)
              </span>
              <input class="input" v-model="profData.detayAlis_3"
                @input="profData.detayAlis_3 = $event.target.value.replace(',','.')" @change="currencyDegisim('detayAlis_3', $event)" />
            </div>
            <div class="column">
              <span class="p-float-label">
                <span class="tag">
                  Açıklama
                </span>
                <InputText
                  class="input"
                  id="aciklama"
                  v-model="profData.detayMekmarNot_3"
                  @change="veriDegisim"
                />
              </span>
            </div>
          </div>
          <div class="columns">
            <div class="column is-6">


              <span class="tag">
                Mekus Masrafı ($)
              </span>
              <input class="input" v-model="profData.detayTutar_4"
                @input="profData.detayTutar_4 =$event.target.value.replace(',','.')" @change="currencyDegisim('detayTutar_4', $event)" />
            </div>
            

          </div>
          <div class=columns>
            <div class="column is-6">
              <span class="tag">
                Sigorta Satış ($)
              </span>
              <input class="input" v-model="profData.sigorta_tutar_satis"
                @input="profData.sigorta_tutar_satis = $event.target.value.replace(',','.')" @change="currencyDegisim('sigorta_tutar_satis', $event)" />

            </div>
            <div class="column is-6">

                <span class="tag">
                  Sigorta Alış ($)
                </span>
                <input  class="input" v-model="profData.sigorta_tutar" @input="profData.sigorta_tutar = $event.target.value.replace(',','.')" @change="currencyDegisim('sigorta_tutar', $event)"/>
                
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
<script>
import LocalService from "../../../service/LocalService";
import store from "@/store";

import Opservice from "../../../service/OperasyonService";
// import CurrencyInput2 from "@/components/shared/CurrencyInput2";
import CustomInputFile from "../../../components/shared/CustomInputFile";
import fileService from "../../../service/FileService";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import socket from '@/service/SocketService'
export default {
  computed: {
    ...mapGetters([
      "isNewClicked",
      "profData", 
      "teslimTurList",
      "odemeTurList",
      "faturaKesimTurList",
      "ulkeList2"
    ]),
  },
  components: {
    customFileInput: CustomInputFile,
    // CurrencyInput2: CurrencyInput2,
  },

  data() {
    return {
      file: null,
      proforma: null,
      teslimTur: null,
      diger_4: true,
      dis_urun_giris: false,
      sigorta_tutar: true,
      filterTeslimTurList: null,
      odemeTur: null,
      filterOdemeTurList: null,
      faturaTur: null,
      filterFaturaTurList: null,
      ulke: null,
      dis_takipEt: true,
      dis_sigorta: true,
      filterUlkeList: null,
      vade: null,
      tahmini_eta:null,
      esProfData: null,
      detayMekmarNot_4: "Mekus Masrafı",
      detay4_aciklama: true,
      detay4: 0,
      scaleValue: "",
    };
  },
  props: {
    // profData: {
    //   type: Object,
    //   default: function () {
    //     return {};
    //   },
    // },
    siparisNo: null,
    siparisUrunler: null,
  },
  validations: {
    profData: {
      teslimTurId: { required },
      odemeTurId: { required },
      ulkeId: { required },
      faturaKesimTurId: { required },
    },
    faturaTur:{required}
  },
  localService: null,
  created() {
    this.localService = new LocalService();
    this.esProfData = this.profData;
    store.dispatch("navlun_ilk_degeri_act", this.esProfData);
    this.yeniKayitBaslangicIslemler();
    this.dataLoad();
    if (this.profData.depo) {
      this.diger_4 = true;
      this.dis_takipEt = true;
      
    }
    if (this.$store.getters.__getUsername == 'Gizem' || this.$store.getters.__getUsername == 'Semih') {
      this.dis_takipEt = false
    }
    if (this.profData.sigorta_id) {
      this.sigorta_tutar = false;
    }

    if (
      this.profData.teslimTurId == 9 ||
      this.profData.teslimTurId == 10 ||
      this.profData.teslimTurId == 12
    ) {
      this.dis_sigorta = false;
    }
    
  },
  mounted() {
    // this.emitter.on("sipBilgileri", (data) => {
    //   console.log("sipBilgileri",data)
    //   if (data.length > 0) {
    //     this.dis_takipEt = false;
    //   }
    // });

    // if (this.profData.vade != "") {
    //   this.vade = this.localService.getStringDate(this.profData.vade);
    // } else {
    //   this.vade = ""
    // }
    
  },
  methods: {
    changeMasrafData(event) {
      console.log(event.target.value)
    },
    dataLoad() {

        this.teslimTur = this.teslimTurList.find(
          (x) => x.id == this.profData.teslimTurId
        );

        this.odemeTur = this.odemeTurList.find(
          (x) => x.id == this.profData.odemeTurId
        );


        this.faturaTur = this.faturaKesimTurList.find(
          (x) => x.id == this.profData.faturaKesimTurId
        );
        this.ulke = this.ulkeList2.find((x) => x.id == this.profData.ulkeId);
    },

    scaleValueFunc() {
      this.scaleValue = "transform:scale(0.5)";
    },

    yeniKayitBaslangicIslemler() {
      Opservice.getEvrakFaturaModel().then((data) => {
        this.evrak = data.evrak;
        this.id = null;
        this.siparisno = null;
      });
    },
    KayitIslemi() {
      this.evrak.id = 2;
      this.evrak.siparisno = this.siparisNo; //this.evrak verileri koydum
      this.evrak.kullaniciAdi = this.$store.getters.__getUsername;
      this.yeniTeklifKayit();
    },
    yeniTeklifKayit() {
      const veri = {
        evrak: this.evrak,
      };
      Opservice.setEvrakFaturaKayit(veri).then((data) => {
        if (data.status) {
          //alert("Evrak başarılı şekilde yüklendi , Evraklardan görüntüleyebilirsiniz . ")
          //socket.siparis.emit('teklif_yeni_event',veri.kullaniciAdi);
          this.evrak.id = 2;
          this.evrak.siparisno = this.siparisNo;

          return;
        } else {
          // alert("Evrak yüklenemedi ,Lütfen tekrar deneyiniz . ")
        }
      });
    },
    faturaDosyaGonder(event) {
      if (event.size > 1000000) {
        alert("Lütfen Evrak Boyutunu Kontrol Ediniz.");
      } else {
        Opservice.getProformaControl(this.siparisNo).then(data => {
          if(data){
            alert('Proforma Zaten Yüklü');
            return;
          }else{
            const d = 2;
            fileService.faturaDosyaGonder(event, d, this.siparisNo).then((data) => {
              console.log("faturaDosyaGonder ", data);
              Opservice.setEvrakFaturaKayit(this.evrak).then((veri) => {
                if (veri.status) {
                  alert("Evrak başarılı şekilde yüklendi!");
                  socket.siparis.emit('isf_form_load_event', this.siparisNo);
                } else {
                  alert("Ops! Lütfen Tekrar Deneyiniz!");
                }
              });
            });
            this.KayitIslemi();

          }
        })
        
      }
    },
    aramaTeslimTur(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.teslimTurList];
        } else {
          result = this.teslimTurList.filter((ted) => {
            return ted.teslimTurAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterTeslimTurList = result;
      }, 250);
      this.emitter.emit('save_button_activated',true)

    },
    aramaOdemeTur(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.odemeTurList];
        } else {
          result = this.odemeTurList.filter((ted) => {
            return ted.odemeTurAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterOdemeTurList = result;
      }, 250);

    },

    aramaFaturaTur(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.faturaKesimTurList];
        } else {
          result = this.faturaKesimTurList.filter((ted) => {
            return ted.faturaKesimTurAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterFaturaTurList = result;
      }, 250);
    },
    aramaUlke(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.ulkeList2];
        } else {
          result = this.ulkeList2.filter((ted) => {
            return ted.ulkeAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterUlkeList = result;
      }, 250);
    },
    teslimTurDegisim() {
      this.emitter.emit('save_button_activated', false)

      this.profData.teslimTurId = this.teslimTur.id;

      if (
        this.teslimTur.id == 9 ||
        this.teslimTur.id == 10 ||
        this.teslimTur.id == 12
      ) {
        this.dis_sigorta = false;
      } else {
        this.dis_sigorta = true;
        this.profData.sigorta_id = 0;
      }
      this.kayitKontrol();
    },
    odemeTurDegisim() {
      if (this.isNewClicked) {
        if (this.profData.odemeTurId != this.odemeTur.id) {
          if (this.odemeTur.id == 1) {
            Opservice.setChangeOdemeBilgisi(
              this.profData.siparisNo,
              this.odemeTur.id
            ).then((data) => {
              if (data.status) {
                this.$toast.add({
                  severity: "success",
                  summary: "Sipariş Durum",
                  detail: "Sipariş durumu bekleyen olarak değiştirildi.",
                  life: 3500,
                });
              } else {
                this.$toast.add({
                  severity: "error",
                  summary: "Sipariş Durum",
                  detail: "Sipariş durumu hata.",
                  life: 3500,
                });
              }
            });
          } else if (this.odemeTur.id == 2) {
            Opservice.setChangeOdemeBilgisi(
              this.profData.siparisNo,
              this.odemeTur.id
            ).then((data) => {
              if (data.status) {
                this.$toast.add({
                  severity: "success",
                  summary: "Sipariş Durum",
                  detail: "Sipariş durumu bekleyen olarak değiştirildi.",
                  life: 3500,
                });
              } else {
                this.$toast.add({
                  severity: "error",
                  summary: "Sipariş Durum",
                  detail: "Sipariş durumu hata.",
                  life: 3500,
                });
              }
            });
          } else if (this.odemeTur.id == 3) {
            Opservice.setChangeOdemeBilgisiEx(
              this.profData.siparisNo,
              this.odemeTur.id
            ).then((data) => {
              if (data.status) {
                this.$toast.add({
                  severity: "success",
                  summary: "Sipariş Durum",
                  detail: "Sipariş durumu üretim olarak değiştirildi.",
                  life: 3500,
                });
              } else {
                this.$toast.add({
                  severity: "error",
                  summary: "Sipariş Durum",
                  detail: "Sipariş durumu hata.",
                  life: 3500,
                });
              }
            });
          }
        }
      }

      this.profData.odemeTurId = this.odemeTur.id;
      if (this.odemeTur.id == 3) {
        this.profData.pesinat = 0;
      }
      this.kayitKontrol();
      this.$emit("odemeTur", this.odemeTur.id);
      this.emitter.emit('save_button_activated', false)

    },
    faturaTurDegisim() {
      console.log(this.profData.faturaKesimTurId)
      this.profData.faturaKesimTurId = this.faturaTur.id;

      this.kayitKontrol();
      this.emitter.emit("faturaTur", this.faturaTur.id);
      this.emitter.emit('save_button_activated', false)

    },
    vadeDegisim() {
      this.profData.vade = this.localService.getDateString(this.vade);

      this.kayitKontrol();
    },
    tahminiEtaDegisim() {
      this.profData.tahmini_eta = this.localService.getDateString(this.tahmini_eta);

      this.kayitKontrol();
    },
    ulkeDegisim() {
      this.profData.ulkeId = this.ulke.id;
      this.kayitKontrol();
      this.emitter.emit('save_button_activated', false)

    },
    kayitKontrol() {
      let index = 0;

      if (this.esProfData.teslimTurId != this.profData.teslimTurId)
        index = index + 1;
      if (this.esProfData.odemeTurId != this.profData.odemeTurId)
        index = index + 1;
      if (this.esProfData.faturaKesimTurId != this.profData.faturaKesimTurId)
        index = index + 1;
      if (this.esProfData.vade != this.profData.vade) index = index + 1;

      if (this.esProfData.tahmini_eta != this.profData.tahmini_eta) index = index + 1;



      if (this.esProfData.odemeAciklama != this.profData.odemeAciklama)
        index = index + 1;
      if (this.esProfData.konteynerAyrinti != this.profData.konteynerAyrinti)
        index = index + 1;
      if (this.esProfData.evrakGideri != this.profData.evrakGideri)
        index = index + 1;
      if (this.esProfData.komisyon != this.profData.komisyon) index = index + 1;

      if (this.esProfData.navlunSatis != this.profData.navlunSatis)
        index = index + 1;
      if (this.esProfData.navlunFirma != this.profData.navlunFirma)
        index = index + 1;
      if (this.esProfData.navlunAlis != this.profData.navlunAlis)
        index = index + 1;
      if (this.esProfData.navlunMekmarNot != this.profData.navlunMekmarNot)
        index = index + 1;

      if (this.esProfData.detayTutar_1 != this.profData.detayTutar_1)
        index = index + 1;
      if (this.esProfData.detayAciklama_1 != this.profData.detayAciklama_1)
        index = index + 1;
      if (this.esProfData.detayAlis_1 != this.profData.detayAlis_1)
        index = index + 1;
      if (this.esProfData.detayMekmarNot_1 != this.profData.detayMekmarNot_1)
        index = index + 1;

      if (this.esProfData.detayTutar_2 != this.profData.detayTutar_2)
        index = index + 1;
      if (this.esProfData.detayAciklama_2 != this.profData.detayAciklama_2)
        index = index + 1;
      if (this.esProfData.detayAlis_2 != this.profData.detayAlis_2)
        index = index + 1;
      if (this.esProfData.detayMekmarNot_2 != this.profData.detayMekmarNot_2)
        index = index + 1;

      if (this.esProfData.detayTutar_3 != this.profData.detayTutar_3)
        index = index + 1;
      if (this.esProfData.detayAciklama_3 != this.profData.detayAciklama_3)
        index = index + 1;
      if (this.esProfData.detayAlis_3 != this.profData.detayAlis_3)
        index = index + 1;
      if (this.esProfData.detayMekmarNot_3 != this.profData.detayMekmarNot_3)
        index = index + 1;

      if (this.esProfData.detayTutar_4 != this.profData.detayTutar_4)
        index = index + 1;
      if (this.esProfData.detayAciklama_4 != this.profData.detayAciklama_4)
        index = index + 1;

      if (this.esProfData.uretimAciklama != this.profData.uretimAciklama)
        index = index + 1;
      if (this.esProfData.sevkiyatAciklama != this.profData.sevkiyatAciklama)
        index = index + 1;
      if (this.esProfData.finansAciklama != this.profData.finansAciklama)
        index = index + 1;
      if (this.esProfData.ulkeId != this.profData.ulkeId) index = index + 1;

      if (this.esProfData.sigorta_id != this.profData.sigorta_id)
        index = index + 1;
      if (this.esProfData.depo != this.profData.depo) index = index + 1;

      let durum = true;

      if (index > 0) durum = false;

      this.$emit("proformaBilgileriDegisim", durum);
    },
    veriDegisim() {
      this.kayitKontrol();
      this.emitter.emit('save_button_activated', false)

    },

    DepoDegisim() {
      this.emitter.emit('save_button_activated', false)

      var top = 0;
      var topAdet = 0;

      const d = new Date();
      let year = d.getFullYear();
      this.dis_takipEt = this.profData.depo;
      this.diger_4 = true;

      if (year == "2023") {
        if (this.profData.depo == true) {
          for (let i = 0; i < this.siparisUrunler.length; i++) {
            if (this.siparisUrunler[i].urunbirimAdi == "M2")
              top += this.siparisUrunler[i].m2;

            if (this.siparisUrunler[i].urunbirimAdi == "Adet") {
              topAdet += this.siparisUrunler[i].kasaAdet;
            }
            if (this.siparisUrunler[i].urunbirimAdi == "Mt") {
              topAdet += this.siparisUrunler[i].kasaAdet;
            }
          }

          if (top > 0 && topAdet > 0) {
            top = top * 8;
            topAdet = topAdet * 50;
            this.profData.detayTutar_4 = top + topAdet;
          } else if (top > 0 && topAdet == 0) {
            this.profData.detayTutar_4 = top * 8;
          } else if (top == 0 && topAdet > 0) {
            this.profData.detayTutar_4 = topAdet * 50;
          }

          //this.profData.detayTutar_4 = top*6

          this.diger_4 = true;
        } else {
          this.profData.detayTutar_4 = 0;
          this.diger_4 = true;
        }
      } else if (year == "2022") {
        if (this.profData.depo == true) {
          for (let i = 0; i < this.siparisUrunler.length; i++) {
            if (this.siparisUrunler[i].m2 != null)
              top += this.siparisUrunler[i].m2;

            if (this.siparisUrunler[i].adet != null) {
              topAdet += this.siparisUrunler[i].adet;
            }
          }
          //this.profData.detayTutar_4 = top*5.5
          if (top > 0 && topAdet > 0) {
            top = top * 6;
            topAdet = topAdet * 50;
            this.profData.detayTutar_4 = top + topAdet;
          } else if (top > 0 && topAdet == 0) {
            this.profData.detayTutar_4 = top * 6;
          } else if (top == 0 && topAdet > 0) {
            this.profData.detayTutar_4 = topAdet * 50;
          }
          this.diger_4 = false;
        } else {
          this.profData.detayTutar_4 = 0;
          this.diger_4 = true;
        }
      } else {
        if (this.profData.depo == true) {
          this.diger_4 = false;

          for (let i = 0; i < this.siparisUrunler.length; i++) {
            if (this.siparisUrunler[i].m2 != null)
              top += this.siparisUrunler[i].m2;

            if (this.siparisUrunler[i].adet != null) {
              topAdet += this.siparisUrunler[i].adet;
            }
          }
          //this.profData.detayTutar_4 = top*4
          if (top > 0 && topAdet > 0) {
            top = top * 4;
            topAdet = topAdet * 50;
            this.profData.detayTutar_4 = top + topAdet;
          } else if (top > 0 && topAdet == 0) {
            this.profData.detayTutar_4 = top * 4;
          } else if (top == 0 && topAdet > 0) {
            this.profData.detayTutar_4 = topAdet * 50;
          }
        } else {
          this.profData.detayTutar_4 = 0;
          this.diger_4 = true;
        }
      }
    },

    SigortaDegisim() {
      if (this.profData.sigorta_id) {
        this.sigorta_tutar = false;
      } else {
        this.sigorta_tutar = true;
        this.profData.sigorta_tutar = 0;
      }
      this.kayitKontrol();
      this.emitter.emit('save_button_activated', false)

    },
    currencyDegisim(property, _value) {

      let value = parseFloat(_value.target.value);
      if (property == "navlunSatis") {
        this.profData.navlunSatis = value;
        this.dis_urun_giris = true;
        this.emitter.emit("navlunSatis", true);
        this.$store.dispatch('navlun_satis_change_act',value)
      }
      if (property == "navlunAlis") {
        this.profData.navlunAlis = value;
        this.$store.dispatch('navlun_alis_change_act', value)

      }
      if (property == "detayTutar_1") {
        this.profData.detayTutar_1 = value;
        this.$store.dispatch('detay_tutar1_change_act', value)


      }
        
      if (property == "detayAlis_1") {
        this.profData.detayAlis_1 = value;
        this.$store.dispatch('detay_alis1_change_act', value)


      }
      if (property == "detayTutar_2") {
        this.profData.detayTutar_2 = value;
        this.$store.dispatch('detay_tutar2_change_act', value)


      }
      if (property == "detayAlis_2") {
        this.profData.detayAlis_2 = value;
        this.$store.dispatch('detay_alis2_change_act', value)



      }
      if (property == "detayTutar_3") {
        this.profData.detayTutar_3 = value;
        this.$store.dispatch('detay_tutar3_change_act', value)


      }

      if (property == "detayTutar_4") {
        this.profData.detayTutar_4 = value;
        this.profData.mekus_masraf = value;
        this.$store.dispatch('mekus_masrafi_change_act', value)



      }
      if (property == "detayAlis_3") {
        this.profData.detayAlis_3 = value;
        this.$store.dispatch('detay_alis3_change_act', value)


      }
      if (property == "komisyon") {
        this.profData.komisyon = value;
        this.$store.dispatch('komisyon_change_act', value)


      }
      if (property == "evrakGideri") {
        this.profData.evrakGideri = value;
        this.$store.dispatch('evrak_gideri_change_act', value)


      }
      if (property == "sigorta_tutar_satis") {
        this.profData.sigorta_tutar_satis = value;
        this.$store.dispatch('sigorta_satis_change_act', value)


      }
      if (property == "sigorta_tutar") {
        this.profData.sigorta_tutar = value;
        this.$store.dispatch('sigorta_alis_change_act', value)


      }

      this.kayitKontrol();
      this.$emit("navlunDigerTutarDegisim");
      this.emitter.emit('save_button_activated', false)

    },
  },
  watch: {
    profData() {
      this.dataLoad();
      if (this.profData.vade != "") {
        this.vade = this.localService.getStringDate(this.profData.vade);
      } else {
        this.vade = ""
      }

      if (this.profData.tahmini_eta != "") {
        this.tahmini_eta = this.localService.getStringDate(this.profData.tahmini_eta);
      } else {
        this.tahmini_eta = ""
      }
    }
  }
};
</script>

<style scoped>
#proformaButton {
  margin-top: 10px;
  margin-left: 155px;
}
@media screen and (max-width: 596px) {
  #proformaButton {
    margin-left: 15px;
  }
}
.inputs {
  width: 100%;
}
.navlunAlanInput {
  width: 80px;
}
.cardStyle {
  height: 179.5px;
}

</style>

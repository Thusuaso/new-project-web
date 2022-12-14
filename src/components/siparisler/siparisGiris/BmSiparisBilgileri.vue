<template>
  <section>
    <div class="columns">
      <div class="column is-4">
        <div class="columns">
          <urun-kart-bilgi :dis_urun_giris="dis_urun_giris" />
        </div>
        <div class="columns">
          <div class="column is-12 custom-box">
            <div class="columns is-multiline">
              <div class="column is-6">
                <AutoComplete
                  v-model="tedarikci"
                  @input="aramaTedarikci($event)"
                  :suggestions="filterTedarikciList"
                  optionLabel="name"
                />
              </div>
              <div class="column is-6">
                <span class="p-float-label">
                  <InputText id="alisFiyati" v-model="siparis.alisFiyati" />
                  <label for="alisFiyati">A.Fiyatı $</label>
                </span>
              </div>
              <div class="column is-6">
                <span class="p-float-label">
                  <InputText
                    id="alisFiyati_TL"
                    v-model="siparis.alisFiyati_TL"
                  />
                  <label for="alisFiyati_TL">A.Fiyatı TL</label>
                </span>
              </div>
              <div class="column is-6">
                <span class="p-float-label">
                  <InputText id="satisFiyati" v-model="siparis.satisFiyati" />
                  <label for="satisFiyati">S.Fiyatı $</label>
                </span>
              </div>
              <div class="column is-12">
                <Button
                  class="p-button-secondary"
                  v-if="!yeniSiparis"
                  :disabled="dis_ozelIscilik"
                  @click="ozelIscilikFormAc"
                />
                <Dialog
                  v-model:visible="dialogIscilik"
                  header="Sipariş Ekstra Gider Girişi"
                  :modal="true"
                  position="top"
                >
                  <div
                    class="p-cardialog-content"
                    style="height: 500px; background-color: #f4f4f4"
                  >
                    <iscilik
                      :siparisNo="siparisNo"
                      :urunKartId="siparis.urunKartId"
                    />
                  </div>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12 custom-box">
            <div class="columns is-multiline">
              <div class="column is-3">
                <AutoComplete
                  :disabled="dis_urun_giris"
                  v-model="urunBirim"
                  :suggestions="filterUrunBirimList"
                  @input="aramaBirim($event)"
                  optionLabel="name"
                />
              </div>
              <div class="column">
                <span class="p-float-label">
                  <InputText
                    id="miktar"
                    @input="miktarDegisim($event)"
                    :disabled="dis_urun_giris"
                    type="text"
                    v-model="siparis.miktar"
                  />
                  <label for="miktar">Miktar</label>
                </span>
              </div>
              <div class="column">
                <span class="p-float-label">
                  <InputText
                    id="kasaAdet"
                    :disabled="dis_urun_giris"
                    type="text"
                    v-model="siparis.kasaAdet"
                  />
                  <label for="kasaAdet">Kasa Adet</label>
                </span>
              </div>
              <div class="column">
                <span class="p-float-label">
                  <InputText
                    id="siraNo"
                    :disabled="dis_urun_giris"
                    type="text"
                    v-model="siparis.siraNo"
                  />
                  <label for="siraNo">Sıra No</label>
                </span>
              </div>
              <div class="column">
                <span class="p-float-label">
                  <InputText
                    id="ozelMiktar"
                    :disabled="dis_urun_giris"
                    type="text"
                    v-model="siparis.ozelMiktar"
                  />
                  <label for="ozelMiktar">Ö.M2</label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-8" style="margin-left: 10px">
        <div class="columns">
          <div class="column is-12 custom-box">
            <div class="columns is-multiline">
              <div class="column is-6">
                <span class="p-float-label">
                  <InputText
                    id="musteriAciklama"
                    :disabled="dis_urun_giris"
                    type="text"
                    v-model="siparis.musteriAciklama"
                  />
                  <label for="musteriAciklama">Müşteri Açıklama</label>
                </span>
              </div>
              <div class="column is-6">
                <span class="p-float-label">
                  <InputText
                    id="uretimAciklama"
                    :disabled="dis_urun_giris"
                    type="text"
                    v-model="siparis.uretimAciklama"
                  />
                  <label for="uretimAciklama">Üretim Açıklama</label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="columns">
          <div class="column is-12 custom-box">
            <div class="columns is-multiline">
              <div class="column is-8">

                <b-field>
                  <b-input size="is-small" />
                </b-field>
              </div>
              <div class="column is-4">
                <button class="button is-success is-small">
                  <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                  </span>
                </button>
              </div>
              <div class="column is-12">
                <b-table height="80px" :columns="hatirlatmaColumns"></b-table>
              </div>
            </div>
          </div>
        </div> -->
        <div class="columns">
          <div class="column is-12 custom-box">
            <div class="columns is-multiline">
              <div class="column">
                <Button
                  :disabled="dis_yeni"
                  @click="btn_yeni_click"
                  label="Yeni"
                  class="p-button-secondary"
                />
              </div>
              <div class="column">
                <Button
                  class="p-button-warning"
                  :disabled="dis_iptal"
                  @click="btn_iptal_click"
                  label="İptal"
                />
              </div>
              <div class="column">
                <Button
                  :disabled="dis_ekle"
                  @click="btn_ekle_click"
                  label="Ekle"
                  class="p-button-success"
                />
              </div>
              <div class="column">
                <Button
                  :disabled="dis_degistir"
                  @click="btn_degistir_click"
                  class="p-button-info"
                  label="Değiştir"
                />
              </div>
              <div class="column">
                <Button
                  :disabled="dis_sil"
                  @click="btn_sil_click"
                  label="Sil"
                  class="p-button-danger"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="columns">
      <div class="column is-12">
        <b-table height="500px" :columns="siparisColumns"> </b-table>
      </div>
    </div> -->
  </section>
</template>

<script>
import tedarikciService from "../../../service/TedarikciService";
import UrunService from "../../../service/UrunService";
import UrunKartBilgi from "./UrunKartBilgi";
//import CurrencyInput from '../../shared/CurrencyInput';
import { required } from "@vuelidate/validators";
import Iscilik from "./Iscilik";

export default {
  components: {
    urunKartBilgi: UrunKartBilgi,
    //inputCurrency : CurrencyInput,
    iscilik: Iscilik,
  },
  methods: {
    aramaTedarikci(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.tedarikciList];
        } else {
          result = this.tedarikciList.filter((ted) => {
            return ted.firmaAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterTedarikciList = result;
      }, 250);
    },
    aramaBirim(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.urunBirimList];
        } else {
          result = this.urunBirimList.filter((ted) => {
            return ted.birimAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterUrunBirimList = result;
      }, 250);
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
    diziUzunluk(liste) {
      let uzunluk = 0;

      for (let key in liste) {
        if (liste[key]) uzunluk = uzunluk + 1;
      }

      return uzunluk;
    },
    kayitKontrol() {
      const kontrol =
        this.diziUzunluk(this.urunler_yeni) +
        this.diziUzunluk(this.urunler_degisenler) +
        this.diziUzunluk(this.urunler_silinenler);
      let durum = true;
      if (kontrol > 0) durum = false;
      this.emitter.emit("siparisBilgileriDegisim", durum);
    },
    urunIslemleri() {
      const urunKart = this.$store.getters.getSiparisUrunKart;
      this.siparis.urunAdi = urunKart.urunAdi;
      this.siparis.urunKartId = urunKart.id;
      this.siparis.en = urunKart.en;
      this.siparis.boy = urunKart.boy;
      this.siparis.kenar = urunKart.kenar;
      this.siparis.yuzeyIslem = urunKart.yuzeyIslem;
      this.siparis.tedarikciAdi = this.tedarikci.firmaAdi;
      this.siparis.tedarikciId = this.tedarikci.id;
      this.siparis.urunBirimId = this.urunBirim.id;
      this.siparis.m2 = 0;
      this.siparis.mt = 0;
      this.siparis.ton = 0;
      this.siparis.adet = 0;

      if (this.siparis.urunBirimId == 1) this.siparis.m2 = this.siparis.miktar;
      if (this.siparis.urunBirimId == 2)
        this.siparis.adet = this.siparis.miktar;
      if (this.siparis.urunBirimId == 3) this.siparis.mt = this.siparis.miktar;
      if (this.siparis.urunBirimId == 4) this.siparis.ton = this.siparis.miktar;

      this.siparis.satisToplam = this.siparis.satisFiyati * this.siparis.miktar;

      //id kontrol
      if (!this.siparis.id) {
        this.siparis.id = this.idOlustur();
      }
    },
    form_btn_reset() {
      this.dis_yeni = false;
      this.dis_iptal = true;
      this.dis_ekle = true;
      this.dis_degistir = true;
      this.dis_urun_giris = true;
      this.dis_sil = true;
      this.dis_stokal = true;
      this.dis_ozelIscilik = true;
      this.urun = {};
      this.$store.dispatch("siparisUrunKartAct", {});
      this.selectUrun = null;
      this.siparis = null;
      this.tedarikci = null;
      this.siparis = {};
      this.urunBirim = null;
      this.alisFiyati = 0;
      this.satisFiyati = 0;
    },

    btn_yeni_click() {
      this.dis_yeni = true;
      this.dis_iptal = false;
      this.dis_ekle = false;
      this.dis_urun_giris = false;
      this.dis_ozelIscilik = true;

      this.siparis = { ...this.urunModel };
    },
    btn_iptal_click() {
      this.form_btn_reset();
    },
    btn_ekle_click() {

      this.urunIslemleri();
      // eslint-disable-next-line vue/no-mutating-props
      this.siparisUrunler.push({ ...this.siparis });

      if (!this.yeniSiparis) this.yeni_urun_islem();
      this.dataSatirTopla(this.siparisUrunler);
      this.form_btn_reset();
      this.$toast.add({
        severity: "success",
        summary: "Bilgi Ekranı",
        detail: "Ürün Eklendi",
        life: 3000,
      });
      this.$emit("siparisUrunDegisim");
      this.emitter.emit("isSipControl", true);
    },
    btn_degistir_click() {
      this.urunIslemleri();
      let index = this.indexBul(this.siparis.id, this.siparisUrunler);
      this.siparisUrunler[index] = this.siparis;
      if (!this.yeniSiparis) this.degisen_urun_islem();
      this.dataSatirTopla(this.siparisUrunler);
      this.form_btn_reset();
      this.$toast.add({
        severity: "success",
        summary: "Bilgi Ekranı",
        detail: "Ürün Değiştirildi",
        life: 3000,
      });
      this.$emit("siparisUrunDegisim");
    },
    btn_sil_click() {
      let index = this.indexBul(this.siparis.id, this.siparisUrunler);
      if (!this.yeniSiparis) this.silinen_urun_islem();
      this.siparisUrunler.splice(index, 1);
      this.dataSatirTopla(this.siparisUrunler);
      this.form_btn_reset();
      this.$toast.add({
        severity: "warn",
        summary: "Bilgi Ekranı",
        detail: "Ürün Silindi.",
        life: 3000,
      });
      this.$emit("siparisUrunDegisim");
    },

    siparisUrunSec(event) {
      this.dis_yeni = true;
      this.dis_degistir = false;
      this.dis_iptal = false;
      this.dis_sil = false;
      this.dis_urun_giris = false;
      this.dis_ozelIscilik = false;

      if (this.selectUrun) {
        this.siparis = { ...event.data };
        this.alisFiyati = this.siparis.alisFiyati;
        this.satisFiyati = this.siparis.satisFiyati;
        this.urunBirim = this.urunBirimList.find(
          (x) => x.id == this.siparis.urunBirimId
        );
        this.tedarikci = this.tedarikciList.find(
          (x) => x.id == this.siparis.tedarikciId
        );
        this.$store.dispatch(
          "siparisFormUrunGuncelleAct",
          this.siparis.urunKartId
        );
      }
    },
    dataSatirTopla(liste) {
      this.toplam_m2 = 0;
      this.toplam_mt = 0;
      this.toplam_adet = 0;
      this.toplam_ton = 0;
      this.toplam_kasa = 0;
      this.toplam_tutar = 0;

      for (let key in liste) {
        this.toplam_m2 += liste[key].m2;
        this.toplam_mt += liste[key].mt;
        this.toplam_adet += liste[key].adet;
        this.toplam_ton += liste[key].ton;
        this.toplam_kasa += liste[key].kasaAdet;
        this.toplam_tutar += liste[key].satisToplam;
      }
    },
    yeni_urun_islem() {
      this.urunler_yeni.push({ ...this.siparis });

      this.kayitKontrol();
    },
    degisen_urun_islem() {
      if (this.diziUzunluk(this.urunler_yeni) > 0) {
        let yeniUrunKontrol = this.indexBul(this.siparis.id, this.urunler_yeni);

        if (yeniUrunKontrol != -1) {
          this.urunler_yeni[yeniUrunKontrol] = { ...this.siparis };
        } else {
          let index = this.indexBul(this.siparis.id, this.urunler_degisenler);

          if (index == -1) {
            this.urunler_degisenler.push({ ...this.siparis });
          } else this.urunler_degisenler[index] = { ...this.siparis };
        }
      } else {
        let index = this.indexBul(this.siparis.id, this.urunler_degisenler);
        if (index == -1) this.urunler_degisenler.push({ ...this.siparis });
        else this.urunler_degisenler[index] = { ...this.siparis };
      }
      this.kayitKontrol();
    },
    silinen_urun_islem() {
      let yeniUrun = this.indexBul(this.siparis.id, this.urunler_yeni);

      if (yeniUrun != -1) {
        this.urunler_yeni.splice(yeniUrun, 1);
      } else {
        this.urunler_silinenler.push({ ...this.siparis });
        let degisenUrun = this.indexBul(
          this.siparis.id,
          this.urunler_degisenler
        );

        if (degisenUrun != -1) {
          this.urunler_degisenler.splice(degisenUrun, 1);
        }
      }
      this.kayitKontrol();
    },
    ozelIscilikFormAc() {
      this.dialogIscilik = true;
    },
    miktarDegisim(event) {
      alert("miktarDegisim", event);
    },
  },
  data() {
    return {
      siparis: {},
      not: "",
      selectNot: {},
      tedarikci: null,
      tedarikciList: null,
      filterTedarikciList: null,
      urunBirim: null,
      filterUrunBirimList: null,
      urunBirimList: null,
      urunler: null,
      selectUrun: null,
      filters: {},
      dis_yeni: false,
      dis_iptal: true,
      dis_ekle: true,
      dis_degistir: true,
      dis_stokal: true,
      dis_sil: true,
      dis_urun_giris: true,
      dis_ozelIscilik: true,
      dialogIscilik: false,
      toplam_m2: 0,
      toplam_mt: 0,
      toplam_adet: 0,
      toplam_ton: 0,
      toplam_kasa: 0,
      toplam_tutar: 0,
      satisFiyati: 0,
      alisFiyati: 0,

      hatirlatmaColumns: [
        {
          field: "not",
          label: "not",
          width: 40,
        },
      ],
      siparisColumns: [
        {
          field: "siraNo",
          label: "S",
          numeric: true,
          centered: true,
        },
        {
          field: "tedarikciAdi",
          label: "Kimden",
          width: "80",
          searchable: true,
        },
        {
          field: "iscilik",
          label: "İşçilik",
        },
        {
          field: "urunAdi",
          label: "Ürün Adı",
          width: "90",
        },
        {
          field: "en",
          label: "E",
          width: "60",
          searchable: true,
        },
        {
          field: "boy",
          label: "B",
          width: "60",
          searchable: true,
        },
        {
          field: "kenar",
          label: "K",
          width: "60",
          searchable: true,
        },
        {
          field: "yuzeyIslem",
          label: "İşlem",
          width: "170",
        },
        {
          field: "m2",
          label: "M2",
          width: "60",
          numeric: true,
          centered: true,
        },
        {
          field: "adet",
          label: "Adet",
          width: "60",
          numeric: true,
          centered: true,
        },
        {
          field: "mt",
          label: "Mt",
          width: "60",
          numeric: true,
          centered: true,
        },
        {
          field: "ton",
          label: "Ton",
          width: "60",
          numeric: true,
          centered: true,
        },
        {
          field: "kasaAdet",
          label: "Kasa",
          width: "60",
          numeric: true,
          centered: true,
        },
        {
          field: "satisToplam",
          label: "Tutar",
          width: "60",
          numeric: true,
          centered: true,
        },
      ],
    };
  },
  props: {
    siparisUrunler: null,
    urunModel: null,
    siparisNo: null,
    siparisUrunLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    urunler_yeni: {
      type: Array,
      required: true,
    },
    urunler_degisenler: {
      type: Array,
      required: true,
    },
    urunler_silinenler: {
      type: Array,
      required: true,
    },
    yeniSiparis: {
      type: Boolean,
    },
  },
  validations: {
    tedarikci: {
      required,
    },
    urunBirim: {
      required,
    },
    siparis: {
      miktar: {
        required,
      },
      siraNo: { required },
      musteriAciklama: { required },
      uretimAciklama: { required },
    },
  },
  urunService: null,
  created() {
    this.urunService = new UrunService();
  },
  mounted() {
    this.urunService.getUrunBirimList().then((data) => {
      this.urunBirimList = data;
    });
    tedarikciService
      .getTedarikciMenuList()
      .then((data) => (this.tedarikciList = data));

    this.dataSatirTopla(this.siparisUrunler);
  },
};
</script>

<style scoped>
.custom-box {
  width: 100%;
  transition: 0.4s;
  box-shadow: 3px 3px 14px 2px rgba(0, 0, 0, 0.18),
    -3px -3px 14px 2px rgba(0, 0, 0, 0.1);

  margin-top: 10px;
}
</style>

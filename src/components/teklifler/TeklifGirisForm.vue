<template>

  <div class="grid">
    <div class="col">
      <div class="grid">
        <div class=col>
          <span class="p-float-label">
            <Calendar id="teklifTarih" v-model="teklifTarihi" @date-select="teklifTarihiDegisim" dateFormat="dd.mm.yy"
              :class="{ 'p-invalid': v$.teklifTarihi.$invalid && submitted }" />
            <label for="teklifTarih">Tarih</label>
          </span>
        </div>
      </div>
      <div class="grid">
        <div class=col>
          <span class="p-float-label">
            <AutoComplete id="musteriAdi" v-model="musteri" :suggestions="filterMusteriList" @complete="aramaMusteri($event)"
              optionLabel="musteriAdi" @item-select="musteriDegisim" @change="musteriChangeEvent($event)"
              :class="{ 'p-invalid': v$.musteri.$invalid && submitted }" />
            <label for="musteriAdi">Müşteri Adı</label>
          </span>
        </div>
      </div>
      <div class="grid">
        <div class=col>
          <span class="p-float-label">
            <AutoComplete id="ulke" v-model="ulke" :suggestions="filterUlkeList" @complete="aramaUlke($event)"
              optionLabel="ulkeAdi" @item-select="ulkeDegisim" @change="ulkeChangeEvent($event)"
              :class="{ 'p-invalid': v$.ulke.$invalid && submitted }" />
            <label for="ulke">Ülke</label>
          </span>
        </div>
      </div>
      <div class="grid">
        <div class=col>
      
        </div>
      </div>
    </div>
    <div class="col">
      <div class="grid">
        <div class="col">
          <span class="p-float-label">
            <Dropdown id="kaynak" v-model="selectKaynak" :options="kaynakList" optionLabel="name" class="dropdown" :class="{
              'p-invalid': v$.selectKaynak.$invalid && submitted,
            }" />
            <label for="kaynak">Kaynak</label>
          </span>
        </div>
      </div>
      <div class="grid">
        <div class=col>
          <span class="p-float-label">
            <Dropdown id="teklifYeri" v-model="selectTeklifYeri" :options="teklifYeriList" optionLabel="name" class="dropdown"
              :class="{
                'p-invalid': v$.selectTeklifYeri.$invalid && submitted,
              }" />
            <label for="teklifYeri">Teklif Yeri</label>
          </span>
        </div>
      </div>
      <div class="grid">
        <div class=col>
          <span class="p-float-label">
            <Dropdown id="teklifOnceligi" v-model="selectOncelik" :options="oncelikList" optionLabel="name" class="dropdown"
              :class="{
                'p-invalid': v$.selectOncelik.$invalid && submitted,
              }" />
            <label for="teklifOnceligi">Teklif Önceliği</label>
          </span>
        </div>
      </div>
      
    </div>
    <div class="col">
      <TabView>
        <TabPanel header="Teklif Açıklama">
          <div class="grid" style="text-align:center;">
            <div class="col">
              <Textarea v-model="teklif.aciklama" rows="2" cols="46" />
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Hatırlatma Belge">
          <div class="grid" style="text-align:center;">
            <div class="col">
              <Calendar v-model="hatirlatmaTarihi" @date-select="hatirlatmaTarihiDegisim" placeholder="Hatırlatma Tarihi"
                dateFormat="dd.mm.yy" />
            </div>
            <div class="col">
              <custom-file-input baslik="Gönder" @sunucuDosyaYolla="teklifDosyaGonder($event)" />
            </div>
            <div class="col">
              <a :href="teklifDosyaLink" target="_blank">
                <Button :disabled="dis_teklifDosyaAc" iconPos="left" icon="fas fa-cloud-download-alt" class="p-button-success" />
              </a>
            </div>
            <div class="col">
              <Button :disabled="dis_teklifDosyaSil" iconPost="left" icon="fas fa-trash-alt" @click="teklifDosyaSil" />
            </div>
          </div>
          <div class="grid" style="text-align:center;">
            <div class="col">
              <Textarea v-model="teklif.hatirlatmaAciklama" rows="1" cols="46" />
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Proforma - Numune">
          <div class="grid" style="text-align:center;">
            <div class="col">
              <!--dis_proforma-->
              <Button :disabled="dis_proforma" style="background-color: #67a5c2; color: #fff" label="Proforma" conPos="left"
                icon="fas fa-file-invoice-dollar" @click="proformaVisible = true" />
            </div>
            <div class="col">
              <!--dis_numune-->

              <Button :disabled="dis_numune" style="background-color: #67c2ad" label="Numune" iconPos="left"
                icon="fas fa-file-invoice" @click="numuneVisible = true" />
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
    <div class="col">
      <div class="grid" style="text-align:center;">
        <div class="col">
          <Button :disabled="dis_teklifkaydet" label="T.Kaydet" iconPos="left" icon="fas fa-save" class="p-button-success"
            @click="teklifKayitIslemi" />
        </div>
        <div class="col">
          <Button @click="teklifSilmeIslemi" :disabled="dis_teklifSil" label="T.Sil" iconPos="left" icon="fas fa-trash-alt"
            class="p-button-warning" />
        </div>
      </div>
      <div class="grid" style="text-align:center;">
        <div class="col">
          <Checkbox :disabled="dis_takipEt" id="takip" v-model="teklif.takipEt" :binary="true" />
          Takip Et
        </div>
      </div>
    </div>
  </div>
  <div class="grid">
    <div class="col">
      <span class="p-float-label">
        <InputText id="sirket" type="text" v-model="teklif.company" />
        <label for="sirket">Şirket</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <InputText type="email" id="email" v-model="teklif.email" />
        <label for="email">Email</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <InputText id="phone" v-model="teklif.phone" />
        <label for="phone">Telefon</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <Textarea id="adress" v-model="teklif.adress" row="8" cols="57" />
        <label for="adress">Adres</label>
      </span>
    </div>
  </div>
  <br/>
  <div class="grid" style="text-align:center;">
    <div class="col" style="margin-bottom:10px;">
      <span class="p-float-label">
        <Calendar id="uruntarihi" v-model="urunTarihi" dateFormat="dd.mm.yy" />
        <label for="uruntarihi">Tarih</label>
      </span>
    </div>
    <div class="col" style="margin-bottom:10px;">
      <span class="p-float-label">
        <AutoComplete id="kategori" v-model="kategori" :suggestions="filterKategoriList" @complete="aramaKategori($event)"
          optionLabel="name" @item-select="degisimKategori" />
        <label for="kategori">Kategori</label>
      </span>
    </div>
    <div class="col" style="margin-bottom:10px;">
      <span class="p-float-label">
        <AutoComplete id="urun" v-model="urunL" :suggestions="filterUrunList" @complete="aramaUrun($event)" optionLabel="name"
          @item-select="degisimUrun" />
        <label for="urun">Ürün</label>
      </span>
    </div>
    <div class="col" style="margin-bottom:10px;">
      <span class="p-float-label">
        <AutoComplete id="enBoy" v-model="enBoy" :suggestions="filterEnBoyList" @complete="aramaEnBoy($event)"
          optionLabel="name" @item-select="degisimEnBoy" />
        <label for="enBoy">En x Boy</label>
      </span>
    </div>
    <div class="col" style="margin-bottom:10px;">
      <span class="p-float-label">
        <AutoComplete id="kalinlik" v-model="kalinlik" :suggestions="filterKalinlikList" @complete="aramaKalinlik($event)"
          optionLabel="name" @item-select="degisimKalinlik" />
        <label for="kalinlik">Kalınlık</label>
      </span>
    </div>
    <div class="col" style="margin-bottom:10px;">
      <span class="p-float-label">
        <AutoComplete id="yuzey" v-model="yuzey" :suggestions="filterYuzeyList" @complete="aramaYuzey($event)"
          optionLabel="name" @item-select="degisimYuzey" />
        <label for="yuzey">Yüzey</label>
      </span>
    </div>
    <div class="col" style="margin-bottom:10px;">
      <span class="p-float-label">
        <AutoComplete id="birim" v-model="birim" :suggestions="filterBirimList" @complete="aramaBirim($event)"
          optionLabel="name" @item-select="degisimBirim" />
      
        <label for="birim">Birim</label>
      </span>
    </div>
    
  </div>
  <br/>
  <div class="grid">
    <div class="col" style="margin-bottom:10px;">
      <span class="p-float-label">
        <InputNumber id="fobFiyat" v-model="fobFiyat" mode="currency" @input="urun.fobFiyat = $event.value"
          currency="USD" />
        <label for="fobFiyat">Fob Fiyat</label>
      </span>
    </div>
    <div class="col" style="margin-bottom:10px;">
      <span class="p-float-label">
        <InputNumber id="fob" v-model="fcaFiyat" mode="currency" @input="urun.fcaFiyat = $event.value" currency="USD" />
        <label for="fob">Fca</label>
      </span>
    </div>
    <div class="col" style="margin-bottom:10px;">
      <span class="p-float-label">
        <InputNumber id="fob" v-model="cFiyat" mode="currency" @input="urun.cFiyat = $event.value" currency="USD" />
        <label for="fob">C</label>
      </span>
    </div>
    <div class="col" style="margin-bottom:10px;">
      <span class="p-float-label">
        <InputNumber id="fob" v-model="dFiyat" mode="currency" @input="urun.dFiyat = $event.value" currency="USD" />
        <label for="fob">D</label>
      </span>
    </div>
  </div>
  <br/>
  <div class="grid" style="text-align:center;">
    <div class="col">
      <Button label="Ekle" iconPos="left" icon="fas fa-plus-circle" class="p-button" style="background-color: #dbc276"
        @click="teklifYeniUrunIslem" />
    </div>
    <div class="col">
      <Button :disabled="dis_urunSil" label="Sil" iconPos="left" icon="fas fa-trash-alt" @click="teklifUrunSilmeIslemi"
        class="p-button-danger" />
    </div>
    <div class="col">
      <Button label="vazgeç" iconPos="left" icon="fas fa-minus-circle" @click="vazgecButonu" class="p-button-secondary" />
    </div>
    <div class="col">
      <Button label="EnxBoy Ekle" iconPos="left" icon="fa-solid fa-asterisk" @click="enBoyEkleme" class="p-button-primary" />
      <OverlayPanel ref="op" appendTo="body" :showCloseIcon="true" :dismissable="true" style="width: 500px">
        <div class="grid" style="text-align:center;">
          <div class="col">
          <InputText v-model="en" placeholder="En" @input="isEn"></InputText>

          </div>
          <div class="col"> 
          <InputText v-model="boy" placeholder="Boy" @input="isBoy"></InputText>

          </div>
          <div class="col">
          <Button @click="addEbat" :disabled="isEnBoyButton" label="Kaydet"></Button>

          </div>
        </div>
      </OverlayPanel>
    </div>
  </div>
  <div class="grid" style="text-align:center;">
    <div class="col-9">
      <DataTable class="p-datatable-responsive" :value="urunListesi" selectionMode="single" v-model:selection="selectUrun"
        @row-select="teklifUrunSec" v-if="urunListesi.length > 0">
        <Column field="tarih" header="Tarih" headerStyle="width:10%" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ slotProps.data.tarih }}
          </template>
        </Column>
        <Column field="kategoriAdi" header="Kategori" headerStyle="width:10%">
          <template #body="slotProps">
            {{ slotProps.data.kategoriAdi }}
          </template>
        </Column>
        <Column field="urunAdi" header="Ürün" headerStyle="width:10%">
          <template #body="slotProps">
            {{ slotProps.data.urunAdi }}
          </template>
        </Column>
        <Column field="enBoy" header="En Boy" headerStyle="width:10%">
          <template #body="slotProps">
            {{ slotProps.data.enBoy }}
          </template>
        </Column>
        <Column field="kalinlik" header="K" headerStyle="width:5%" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ slotProps.data.kalinlik }}
          </template>
        </Column>
        <Column field="yuzeyIslem" header="Yüzey" headerStyle="width:15%">
          <template #body="slotProps">
            {{ slotProps.data.yuzeyIslem }}
          </template>
        </Column>
        <Column field="fobFiyat" header="Fob" headerStyle="width:7%" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ slotProps.data.fobFiyat }}
          </template>
        </Column>
        <Column field="fcaFiyat" header="Fca" headerStyle="width:7%" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ slotProps.data.fcaFiyat }}
          </template>
        </Column>
        <Column field="cFiyat" header="C" headerStyle="width:7%" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ slotProps.data.cFiyat }}
          </template>
        </Column>
        <Column field="dFiyat" header="D" headerStyle="width:7%" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ slotProps.data.dFiyat }}
          </template>
        </Column>
        <Column field="birim" header="Birim" headerStyle="width:7%" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ slotProps.data.birim }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <div class="grid" style="text-align:left;">
        <div class="col">
                        <Checkbox v-model="teklif.goruldu" :binary="true" />Görüldü

        </div>
        <div class="col">
                        <Checkbox v-model="teklif.blist" :binary="true" />B Liste

        </div>
      </div>
      <div class="grid" style="text-align:center;">
        <div class="col-3">
            <Textarea id="saritasNot" :disabled="dis_saritasNot" rows="7" cols="30" v-model="teklif.saritasNot" placeholder="S.Not"/>
        </div>
      </div>
    </div>
  </div>


  <Dialog
    v-model:visible="proformaVisible"
    :modal="true"
    header="Proforma"
    position="top"
  >
    <div class="grid" >
      <div class="col-2">
        <span class="tag">
            PO
        </span>
        <InputText type="text" v-model="teklif.proformaPoNo" />
      </div>
      <div class="col-2">

        <span class="tag">
          Tarih
        </span>
        <Calendar v-model="proformaTarihi" @date-select="proformaTarihiDegisim" dateFormat="dd.mm.yy" />

      </div>
      <div class="col-2">
        <span class="tag">
          Tutar ($)
        </span>
        <currency-input type="text" v-model="teklif.proformaTutar"
          @input="teklif.proformaTutar = $event.target.value.replace(',','.')" />
      </div>
      <div class="col-2">
          <span class="tag">
            Not
          </span>
          <InputText type="text" v-model="teklif.proformaNot" />
      </div>
      <div class="col-2">
        <div class="grid">
          <div class="col">
          <custom-file-input baslik="Proforma Yukle" @sunucuDosyaYolla="proformaDosyaGonder($event)" />

          </div>
          <div class="col">
            <a :href="proformaLink" target="_blank">
              <Button label="Proforma Aç" :disabled="dis_proformaAc" />
            </a>

          </div>
        </div>
      </div>

        
    </div>






  </Dialog>
  <Dialog
    v-model:visible="numuneVisible"
    :modal="true"
    header="Numune Takip"
    position="top"
  >
    <div class="grid">
      <div class="col">
        <span class="tag">
          Giriş Tarihi
        </span>
        <Calendar v-model="numuneGirisTarihi" @date-select="numuneTarihiDegisim" dateFormat="dd.mm.yy" />
      </div>
      <div class="col">
        <span class="tag">
          Tracking No
        </span>
        <InputText type="text" v-model="teklif.numuneTrackingNo" />
      </div>
      <div class="col">
        <span class="tag">
          Ödenen
        </span>
        <currency-input type="text" v-model="teklif.numuneOdenenTutar" />
      </div>
      <div class="col"> 
        <span class="tag">
          Alınan
        </span>
        <currency-input type="text" v-model="teklif.numuneAlinanTutar" />
      </div>
      <div class="col">
        <span class="tag">
          Not
        </span>
        <InputText type="text" v-model="teklif.numuneNot" />
      </div>
      <div class="col">
        <span class="tag">
          H.Tarihi
        </span>
        <Calendar v-model="numuneHatirlatmaTarihi" @date-select="numuneHatirlatmaTarihiDegisim" dateFormat="dd.mm.yy" />
      </div>
      <div class="col">
        <div class="grid">
          <div class="col">
            <custom-file-input baslik="Dosya Gönder" @sunucuDosyaYolla="numuneDosyaGonder($event)" />
          </div>
        </div>
        <div class="grid">
          <div class="col"> 
            <a :href="numuneLink" target="_blank">
              <Button label="Dosya Aç" :disabled="dis_numuneDosyaAc" />
            </a>
          </div>
        </div>
      </div>
    </div>
  
  
  
  </Dialog>
</template>
<script>
import teklifService from "../../service/TeklifService";
import LocalService from "../../service/LocalService";
import CurrencyInput from "../../components/shared/CurrencyInput";
import CustomInputFile from "../../components/shared/CustomInputFile";
import socket from "../../service/SocketService";
import fileService from "../../service/FileService";
import { mapGetters } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      teklifTarihi: { required },
      musteri: { required },
      ulke: { required },
      selectKaynak: { required },
      selectTeklifYeri: { required },
      selectOncelik: { required },
    };
  },
  computed: {
    ...mapGetters(["enBoyList"]),
  },
  components: {
    currencyInput: CurrencyInput,
    customFileInput: CustomInputFile,
  },
  data() {
    return {
      fcaFiyat: 0,
      cFiyat: 0,
      dFiyat: 0,
      submitted: false,
      urunListesi: [],
      fobFiyat: 0,
      teklifFiyat: 0,
      isEnBoyButton: false,
      en: null,
      boy: null,
      en_boy_form: false,
      is_goruldu: false,
      tip: "Fob",
      dis_ulke: true,
      urunLoading: false,
      selectUrun: null,
      teklifTarihi: null,
      hatirlatmaTarihi: null,
      musteri: null,
      musteriList: null,
      filterMusteriList: null,
      selectKaynak: null,
      kaynakList: [
        { id: 1, name: "Portföy" },
        { id: 2, name: "Site" },
        { id: 3, name: "Stone Contact" },
        { id: 4, name: "Fuar" },
        { id: 5, name: "Email" },
        { id: 6, name: "BGP Network" },
        { id: 7, name: "Ziyaret" },

      ],
      selectTeklifYeri: null,
      teklifYeriList: [
        { id: 1, name: "Mail" },
        { id: 2, name: "WhatsApp" },
        { id: 3, name: "Mail-Efes" },
      ],
      selectOncelik: null,
      oncelikList: [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" },
        { id: 4, name: "Toplantı" },
      ],
      teklif: {},
      urun: null,
      dtUrun: null,
      ulke: null,
      ulkeList: null,
      filterUlkeList: null,
      dis_urunSil: true,
      dis_teklifSil: true,
      dis_teklifFiyat: true,
      kategoriList: null,
      kategori: null,
      urunList: null,
      urunL: null,
      enBoy: null,
      kalinlikList: null,
      kalinlik: null,
      yuzeyList: null,
      yuzey: null,
      birimList: [
        { id: 1, name: "Sqm" },
        { id: 2, name: "Lmt" },
        { id: 3, name: "Pcs" },
        { id: 4, name: "Ton" },
      ],
      birim: null,
      degisim_yeni_urun: [],
      degisim_guncellenen_urun: [],
      degisim_silinen_urun: [],
      guncellenenMusteri: [],
      kategoriadd: [],
      urunadd: [],
      urunTarihi: null,
      proformaVisible: false,
      proformaTarihi: null,
      numuneVisible: false,
      numuneGirisTarihi: null,
      numuneHatirlatmaTarihi: null,
      filterKategoriList: null,
      filterUrunList: null,
      filterEnBoyList: null,
      filterKalinlikList: null,
      filterYuzeyList: null,
      filterBirimList: null,
      dis_goruldu: true,
      dis_saritasNot: false,
      dis_takipEt: false,
      dis_proforma: true,
      dis_numune: true,
      dis_fotoGonder: true,
      dis_proformaAc: true,
      proformaLink: "",
      numuneLink: "",
      dis_numuneDosyaAc: true,
      dis_teklifDosyaAc: true,
      dis_teklifSonGorulmeAc: true,
      dis_teklifDosyaSil: true,
      teklifDosyaLink: "",
      songorulmeDosyaLink: "",
      teklifSonGorulmeLink: "",
      dis_teklifkaydet: false,
      dis_urunlistesi: false,
      dis_teklifgoster: false,
      urunkayit: false,
    };
  },
  props: ["yeniKayit", "teklifId"],
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    isEn(event) {
      this.en = event.replace(".", ",");
      this.isEnBoyButton = false;
    },
    isBoy(event) {
      this.boy = event.replace(".", ",");
      this.isEnBoyButton = false;
    },
    enBoyEkleme(event) {
      this.$refs.op.toggle(event);
    },
    addEbat() {
      this.isEnBoyButton = true;
      this.$refs.op.hide();
      const datas = {
        olcu: this.en + "x" + this.boy,
      };

      teklifService.setEnBoy(datas).then((data) => {
        if (data.status) {
          this.$toast.add({
            severity: "success",
            summary: "Success Message",
            detail: "Başarıyla Kaydedildi",
            life: 3000,
          });
          this.$store.dispatch("loadTekliflerEnBoy", data.datas);
          this.isEnBoyButton = false
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Error Message",
            detail: "Kaydetme Başarısız",
            life: 3000,
          });
        }
      });
    },
    isGoruldu() {
      const localUser = this.$store.getters.__getUserId;
      if (localUser == 9) {
        this.is_goruldu = true;
      } else if (localUser == 10) {
        this.is_goruldu = true;
      } else {
        this.is_goruldu = false;
      }
    },
    diziUzunluk(liste) {
      let uzunluk = 0;

      for (let key in liste) {
        if (liste[key]) uzunluk = uzunluk + 1;
      }

      return uzunluk;
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

    teklifTarihiDegisim() {
      this.teklif.tarih = this.localService.getDateString(this.teklifTarihi);
    },
    aramaMusteri(event) {
      setTimeout(() => {
        let result;

        if (event.query.length == 0) result = [...this.musteriList];
        else {
          result = this.musteriList.filter((x) => {
            return x.musteriAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterMusteriList = result;
      }, 250);
    },
    musteriDegisim() {
      this.teklif.musteriId = this.musteri.id;
      let musteri = this.musteriList.find((x) => x.id == this.musteri.id);
      this.teklif.company = musteri.company
      this.teklif.email = musteri.email
      this.teklif.phone = musteri.phone
      this.teklif.adress = musteri.adress
      this.ulke = this.ulkeList.find((x) => x.id == this.musteri.ulkeId);

      if (!this.ulke) {
        this.dis_ulke = false;
      }
    },
    musteriChangeEvent() {
      let musteri = this.musteriList.find((x) => x.musteriAdi == this.musteri);

      if (!musteri) {
        this.dis_ulke = false;
        this.teklif.musteriId = null;
      } else {
        this.ulke = this.ulkeList.find((x) => x.ulkeId == this.ulke);
        this.dis_ulke = true;
      }
    },
    ulkeChangeEvent() {
      let ulke = this.ulkeList.find((x) => x.ulkeId == this.ulke);

      if (!ulke) {
        this.teklif.ulkeId = null;
      } else {
        this.musteri = this.musteriList.find(
          (x) => x.musteriAdi == this.musteri
        );
      }
    },
    aramaUlke(event) {
      setTimeout(() => {
        let result;

        if (event.query.length == 0) result = [...this.ulkeList];
        else {
          result = this.ulkeList.filter((x) => {
            return x.ulkeAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterUlkeList = result;
      }, 250);
    },
    /* Ürün Metotları */

    birimDegisim() {
      this.urun.birim = this.selectBirim.name;
    },
    proformaTarihiDegisim() {
      this.teklif.proformaTarihi = this.localService.getDateString(
        this.proformaTarihi
      );
    },
    numuneHatirlatmaTarihiDegisim() {
      this.teklif.numuneHatirlatmaTarihi = this.localService.getDateString(
        this.numuneHatirlatmaTarihi
      );
    },
    numuneTarihiDegisim() {
      this.teklif.numuneGirisTarihi = this.localService.getDateString(
        this.numuneGirisTarihi
      );
    },

    aramaKategori(event) {
      setTimeout(() => {
        let result;
        if (event.query.length == 0) result = [...this.kategoriList];
        else {
          result = this.kategoriList.filter((x) => {
            return x.name.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
        this.filterKategoriList = result;
      }, 250);
    },
    degisimKategori() {
      this.urun.kategoriId = this.kategori.id;
      this.urun.kategoriAdi = this.kategori.name;
    },
    aramaUrun(event) {
      setTimeout(() => {
        let result;
        if (event.query.length == 0) result = [...this.urunList];
        else {
          result = this.urunList.filter((x) => {
            return x.name.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
        this.filterUrunList = result;
      }, 250);
    },
    degisimUrun() {
      this.urun.urunId = this.urunL.id;
      this.urun.urunAdi = this.urunL.name;
    },
    aramaEnBoy(event) {
      setTimeout(() => {
        let result;
        if (event.query.length == 0) result = [...this.enBoyList];
        else {
          result = this.enBoyList.filter((x) => {
            return x.name.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
        this.filterEnBoyList = result;
      }, 250);
    },
    degisimEnBoy() {
      this.urun.enBoyId = this.enBoy.id;
      this.urun.enBoy = this.enBoy.name;
    },
    aramaKalinlik(event) {
      setTimeout(() => {
        let result;
        if (event.query.length == 0) result = [...this.kalinlikList];
        else {
          result = this.kalinlikList.filter((x) => {
            return x.name.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
        this.filterKalinlikList = result;
      }, 250);
    },
    degisimKalinlik() {
      this.urun.kalinlikId = this.kalinlik.id;
      this.urun.kalinlik = this.kalinlik.name;
    },
    aramaYuzey(event) {
      setTimeout(() => {
        let result;
        if (event.query.length == 0) result = [...this.yuzeyList];
        else {
          result = this.yuzeyList.filter((x) => {
            return x.name.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
        this.filterYuzeyList = result;
      }, 250);
    },
    degisimYuzey() {
      this.urun.yuzeyIslemId = this.yuzey.id;
      this.urun.yuzeyIslem = this.yuzey.name;
    },
    aramaBirim(event) {
      setTimeout(() => {
        let result;
        if (event.query.length == 0) result = [...this.birimList];
        else {
          result = this.birimList.filter((x) => {
            return x.name.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
        this.filterBirimList = result;
      }, 250);
    },
    degisimBirim() {
      this.urun.birimId = this.birim.id;
      this.urun.birim = this.birim.name;
    },
    /* *** */
    ulkeDegisim() {
      this.teklif.ulkeId = this.ulke.id;

      // this.musteri = this.musteriList.find(x=> x.id == this.teklif.musteriId);
      this.musteri.ulkeId = this.teklif.ulkeId;

      this.guncellenenMusteri.push({ ...this.musteri });
    },
    hatirlatmaTarihiDegisim() {
      this.teklif.hatirlatmaTarihi = this.localService.getDateString(
        this.hatirlatmaTarihi
      );
    },
    teklifUrunSec() {
      this.urun = { ...this.selectUrun };
      this.kategori = this.kategoriList.find(
        (x) => x.id == this.urun.kategoriId
      );
      this.urunL = this.urunList.find((x) => x.id == this.urun.urunId);
      this.kalinlik = this.kalinlikList.find(
        (x) => x.id == this.urun.kalinlikId
      );
      this.enBoy = this.enBoyList.find((x) => x.id == this.urun.enBoyId);
      this.yuzey = this.yuzeyList.find((x) => x.id == this.urun.yuzeyIslemId);
      this.birim = this.birimList.find((x) => x.name == this.urun.birim);
      this.dis_urunSil = false;
      this.urunTarihi = this.localService.getStringDate(this.urun.tarih);
      if (this.tip != "Fob") this.dis_teklifFiyat = false;
      this.fobFiyat = this.urun.fobFiyat;
      this.fcaFiyat = this.urun.fcaFiyat;
      this.cFiyat = this.urun.cFiyat;
      this.dFiyat = this.urun.dFiyat
      this.teklifFiyat = this.urun.teklifFiyat;
    },
    urun_kontrol() {
      let durum = true;
      for (let key in this.urunListesi) {
        const item = this.urunListesi[key];
        const urun = this.urun;

        if (
          item.birim == urun.birim &&
          item.enBoy == urun.enBoy &&
          item.fobFiyat == urun.fobFiyat &&
          item.kalinlik == urun.kalinlik &&
          item.teklifFiyat == urun.teklifFiyat &&
          item.kategoriAdi == urun.kategoriAdi &&
          item.urunAdi == urun.urunAdi &&
          item.yuklemeTipi == urun.yuklemeTipi &&
          item.yuzeyIslem == urun.yuzeyIslem
        ) {
          durum = false;
        }
      }

      return durum;
    },
    resetProduct() {
      this.urun = {
        'birim':"",
        'birimId': 0,
        'enBoy':"",
        'enBoyId':0,
        'fobFiyat': 0,
        'id': 0,
        'kalinlik':"",
        'kalinlikId': 0,
        'kategoriAdi': "",
        'kategoriId':0,
        'tarih': "",  
        'fcaFiyat': 0,
        'cFiyat': 0,
        'dFiyat': 0,
        'teklifId': 0,
        'urunAdi': "",    
        'urunId': 0,
        'yuklemeTipi': "", 
        'yuzeyIslem': "",
        'yuzeyIslemId':""
      }
      this.urunTarihi = null;
      this.kategori = null;
      this.urunL = null;
      this.enBoy = null;
      this.kalinlik = null;
      this.yuzey = null;
      this.birim = null;
      this.fobFiyat = 0;
      this.fcaFiyat = 0;
      this.cFiyat = 0;
      this.dFiyat = 0;

    },
    vazgecButonu() {
      this.selectUrun = null;
      this.resetProduct();
    },
    teklifYeniUrunIslem() {
      this.kategoriadd.push({ ...this.kategori });

      this.urun.kategoriAdi = this.kategori.name
        ? this.kategori.name
        : this.kategori;
      this.urun.urunAdi = this.urunL.name ? this.urunL.name : this.urunL;
      this.urun.enBoy = this.enBoy.name ? this.enBoy.name : this.enBoy;
      this.urun.kalinlik = this.kalinlik.name
        ? this.kalinlik.name
        : this.kalinlik;
      this.urun.yuzeyIslem = this.yuzey.name ? this.yuzey.name : this.yuzey;
      this.urun.teklifId = this.teklif.id;


      this.yuklemeTipKontrol();


      this.urun.tarih = this.localService.getDateString(this.urunTarihi);

      if (this.dis_teklifFiyat) this.urun.teklifFiyat = this.urun.fobFiyat;
      if (this.urunListesi == []) this.urunListesi = [];

      let index = this.indexBul(this.urun.id, this.urunListesi);
      if (index == -1) {
        this.urun.id = this.idOlustur();
        if (!this.urunkayit) {
          this.degisim_yeni_urun.push(this.urun);
        }
        this.urunListesi.push(this.urun);

      } else {
        if (!this.urunkayit) {
          //değişim yeni ürünlerde kontrolü
          let kontrol = this.indexBul(this.urun.id, this.degisim_yeni_urun);
          //eklenmesi için yeni üründe olmaması lazım
          if (kontrol == -1) {
            this.degisim_guncellenen_urun.push(this.urun);
          }
        }
        this.urunListesi[index] = this.urun;
        this.selectUrun = this.urun;
      }

      this.urun = this.dtUrun;
      this.dis_urunSil = true;
      this.resetProduct();
      //  }
    },
    teklifUrunSilmeIslemi() {
      let index = this.indexBul(this.urun.id, this.urunListesi);
      this.urunListesi.splice(index, 1);

      this.dis_urunSil = true;

      if (!this.urunkayit) {
        //yeni ürünlerdeki kontrol
        let yeniUrunKontrol = this.indexBul(event.id, this.degisim_yeni_urun);
        if (yeniUrunKontrol != -1) {
          this.degisim_yeni_urun.splice(yeniUrunKontrol, 1);
          return;
        }

        let guncellemeKontrol = this.indexBul(
          event.id,
          this.degisim_guncellenen_urun
        );

        if (guncellemeKontrol != -1)
          this.degisim_guncellenen_urun.splice(guncellemeKontrol, 1);

        this.degisim_silinen_urun.push({ ...this.urun });
      }

      this.urun = this.dtUrun;
      this.dis_urunSil = true;
      this.urunTarihi = new Date();
      this.kategori = null;
      this.urunL = null;
      this.kalinlik = null;
      this.enBoy = null;
      this.yuzey = null;
      this.birim = null;
    },
    teklifListeleriYukle() {
      teklifService.getFormListeler().then((data) => {
        this.musteriList = data.musteriList;
        this.ulkeList = data.ulkeList;

        this.kategoriList = data.kategoriList;
        this.urunList = data.urunList;
        this.$store.dispatch("loadTekliflerEnBoy", data.enBoyList);
        this.kalinlikList = data.kalinlikList;
        this.yuzeyList = data.yuzeyList;

        if (!this.urunkayit) {
          this.musteri = this.musteriList.find(
            (x) => x.id == this.teklif.musteriId
          );
          this.ulke = this.ulkeList.find((x) => x.id == this.musteri.ulkeId);
          this.selectKaynak = this.kaynakList.find(
            (x) => x.name == this.teklif.kaynakYeri
          );
          this.selectTeklifYeri = this.teklifYeriList.find(
            (x) => x.name == this.teklif.teklifYeri
          );
          this.selectOncelik = this.oncelikList.find(
            (x) => x.name == this.teklif.teklifOncelik
          );

          if (this.teklif.tarih.length > 0)
            this.teklifTarihi = this.localService.getStringDate(
              this.teklif.tarih
            );

          if (this.teklif.hatirlatmaTarihi.length > 0)
            this.hatirlatmaTarihi = this.localService.getStringDate(
              this.teklif.hatirlatmaTarihi
            );
          if (this.teklif.numuneGirisTarihi.length > 0)
            this.numuneGirisTarihi = this.localService.getStringDate(
              this.teklif.numuneGirisTarihi
            );
          if (this.teklif.numuneHatirlatmaTarihi.length > 0)
            this.numuneHatirlatmaTarihi = this.localService.getStringDate(
              this.teklif.numuneHatirlatmaTarihi
            );
          if (this.teklif.proformaTarih.length > 0)
            this.proformaTarihi = this.localService.getStringDate(
              this.teklif.proformaTarih
            );

          if (this.teklif.cfr) {
            this.tip = "C";
            this.dis_teklifFiyat = false;
          }

          if (this.teklif.fob) {
            this.tip = "Fob";
          }

          if (this.teklif.dtp) {
            this.tip = "D";
            this.dis_teklifFiyat = false;
          }

          if (this.teklif.fca) {
            this.tip = "Fca";
            this.dis_teklifFiyat = false;
          }
        }

        this.urunLoading = false;
        this.dis_urunlistesi = false; 
        this.$store.dispatch('fullscreenLoadingAct', false)


      });
    },
    yuklemeTipKontrol() {
      this.dis_teklifFiyat = false;
      //yükleme tipinin alınması
      if (this.tip == "Fca") {
        this.teklif.fca = true;
        this.teklif.fob = false;
        this.teklif.cfr = false;
        this.teklif.dtp = false;
      }
      if (this.tip == "Fob") {
        this.teklif.fob = true;
        this.dis_teklifFiyat = true;
        this.teklif.cfr = false;
        this.teklif.fca = false;
        this.teklif.dtp = false;
      }
      if (this.tip == "C") {
        this.teklif.cfr = true;
        this.teklif.fca = false;
        this.teklif.fob = false;
        this.teklif.dtp = false;
      }
      if (this.tip == "D") {
        this.teklif.dtp = true;
        this.teklif.cfr = false;
        this.teklif.fca = false;
        this.teklif.fob = false;
      }

      this.urun.yuklemeTipi = this.tip;
    },
    kayit_kontrol() {
      if (this.musteri == "") {
        alert("Lütfen Müşteri Adını Giriniz..");
        return false;
      }
      if (this.ulke == "") {
        alert("Lütfen Ulke Adını Giriniz..");
        return false;
      }
      if (this.selectKaynak == "") {
        alert("Lütfen Teklif Kaynağını Belirtiniz..");
        return false;
      }
      if (this.selectTeklifYeri == "") {
        alert("Lütfen Teklif Yerini Belirtiniz..");
        return false;
      }
      if (this.selectOncelik == "") {
        alert("Lütfen Teklif Onceliğini Belirtiniz..");
        return false;
      }

      if (this.urunListesi == []) {
        alert("Lütfen Ürün Bilgilerini Giriniz..");
        return false;
      } else return true;
    },
    teklifKayitIslemi() {
      this.submitted = true;
      
      if (this.v$.$invalid) {
        this.$toast.add({
          severity: "error",
          summary: "Zorunlu Alanlar",
          detail: "Zorunlu alanları doldurunuz!",
          life: 3000,
        });
      } else {
        if (this.kayit_kontrol) {
          this.yuklemeTipKontrol();
          this.teklif.kaynakYeri = this.selectKaynak.name;
          this.teklif.teklifYeri = this.selectTeklifYeri.name;

          //müşteri kontrol
          if (this.teklif.musteriId == null) {
            this.teklif.musteriAdi = this.musteri;
            this.teklif.ulkeId = this.ulke.id;
          }

          if (this.selectOncelik) {
            this.teklif.teklifOncelik = this.selectOncelik.name;
          }

          if (this.urunkayit) this.yeniTeklifKayit();
          if (!this.urunkayit) this.teklifGuncelleme();
        }
      }

      //code sonu
    },
    yeniTeklifKayit() {
      if (this.kayit_kontrol()) {
        this.urunLoading = true;
        const veri = {
          teklif: this.teklif,
          urunler: this.urunListesi,
          kullaniciAdi: this.$store.getters.__getUsername,
          hatirlatmaDurumu: true,
        };

        this.dis_teklifkaydet = true;
        this.$store.dispatch('fullscreenLoadingAct', true)

        teklifService.setTeklifKayit(veri).then((data) => {
          if (data.status) {
            this.$toast.add({
              severity: "success",
              summary: "Bilgi Ekranı",
              detail: "Yeni Teklif Kaydı Yapıldı",
              life: 5000,
            });
            socket.siparis.emit('teklif_degisim_event');
            socket.siparis.emit(
              "anaSayfaDegisiklikEvent",
              data.anaSayfaDegisiklikList
            );
            this.teklif.id = data.teklifId;
            this.urunkayit = false;
            this.dis_numune = false;
            this.dis_proforma = false;
            this.dis_fotoGonder = false;
            this.dis_teklifkaydet = false;
            this.urunLoading = false;
            this.$store.dispatch('fullscreenLoadingAct', false)

            this.emitter.emit('dialog_close', false)

            return;
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Uyarı Ekranı",
              detail: "Teklif kaydı yapılamadı",
              life: 5000,
            });
            this.dis_teklifkaydet = false;
            this.$store.dispatch('fullscreenLoadingAct', false)

            

          }

          this.urunLoading = false;
          this.dis_teklifkaydet = false;
        });
      }
    },
    teklifGuncelleme() {
      this.dis_teklifkaydet = true;
      this.urunLoading = true;
      this.musteri.company = this.teklif.company
      this.musteri.email = this.teklif.email
      this.musteri.phone = this.teklif.phone
      this.musteri.adress = this.teklif.adress
      this.guncellenenMusteri.push({ ...this.musteri });
      if (this.kayit_kontrol()) {
        
        const veri = {
          teklif: this.teklif,
          eklenenUrunler: this.degisim_yeni_urun,
          guncellenenUrunler: this.degisim_guncellenen_urun,
          silinenUrunler: this.degisim_silinen_urun,
          kullaniciAdi: this.$store.getters.__getUsername,
          guncellenenMusteri: this.guncellenenMusteri,
          kategoriadd: this.kategoriadd,
          hatirlatmaDurumu: false,
        };
        this.$store.dispatch('fullscreenLoadingAct', true)


        teklifService.setTeklifGuncelleme(veri).then((data) => {
          if (data.status) {
            this.$toast.add({
              severity: "success",
              summary: "Bilgi Ekranı",
              detail: "Teklif Bilgileri Değiştirildi.",
              life: 1000,
            });

            socket.siparis.emit(
              "anaSayfaDegisiklikEvent",
              data.anaSayfaDegisiklikList
            );
            this.dis_teklifkaydet = false;
            this.$store.dispatch('fullscreenLoadingAct', false)


          } else {
            this.$toast.add({
              severity: "error",
              summary: "Uyarı Ekranı",
              detail: "Teklif kaydı yapılamadı",
              life: 5000,
            });
            this.dis_teklifkaydet = false;

          }

          this.urunLoading = false;
          this.emitter.emit('teklif_kaydet', true)
          this.$store.dispatch('fullscreenLoadingAct', false)


        });
      }
    },
    teklifSilmeIslemi() {
      if (confirm('Gerçekten Silmek istiyor musunuz?')) {
        this.$store.dispatch("teklif_form_load_act", false);
        this.$store.dispatch('fullscreenLoadingAct', true)


        teklifService.teklifSilme(this.teklif.id).then((data) => {
          if (data.status) {
            this.dis_teklifgoster = false;
            this.$toast.add({
              severity: "success",
              summary: "Bilgi Ekranı",
              detail: "Teklif Bilgileri Silindi.",
              life: 1000,
            });
            socket.siparis.emit('teklif_degisim_event');
            this.emitter.emit('teklif_yenileme', true)
            this.emitter.emit('dialog_close',false)
            this.$store.dispatch('fullscreenLoadingAct', false)



          }
        });
      }
      
    },
    yeniKayitBaslangicIslemler() {
      this.dis_takipEt = true;
      this.urunLoading = true;
      this.dis_urunlistesi = true;
      this.teklifListeleriYukle();
      teklifService.getTeklifModel().then((data) => {
        this.teklif = data.teklif;
        this.dtUrun = data.teklifUrun;
        this.urun = { ...this.dtUrun };
        this.teklif.takipEt = true;
        // this.tarih = null
        this.musteri = "";
        this.teklifTarihi = "";
        this.ulke = "";
        this.selectKaynak = "";
        this.selectTeklifYeri = "";
        this.selectOncelik = "";
        this.hatirlatmaTarihi = null;
        this.proformaTarihi = null;
        this.numuneGirisTarihi = null;
        this.numuneHatirlatmaTarihi = null;
        this.urunListesi = [];
        this.urunLoading = false;
        this.dis_urunlistesi = false;
        this.company = "";
      });
    },
    proformaDosyaGonder(event) {
      fileService.proformaGonder(event, this.teklif.id).then((data) => {
        if (data.Status) {
          this.teklif.proformaCloud = true;
          this.teklif.proformaCloudDosya = data.dosyaAdi;
          this.teklif.proformaTarih = this.localService.getDateString(
            this.proformaTarihi
          );

          teklifService.setProformaKayit(this.teklif).then((veri) => {
            if (veri.Status) {
              this.dis_proformaAc = false;
              this.proformaLink = `https://file-service.mekmar.com/file/download/teklif/proforma/${this.teklif.id}/${this.teklif.proformaCloudDosya}`;
            }
          });
        }
      });
    },
    teklifDosyaGonder(event) {
      fileService.teklifDosyaGonder(event, this.teklif.id).then((data) => {
        if (data.Status) {
          this.teklif.teklifCloud = true;
          this.teklif.teklifCloudDosya = data.dosyaAdi;

          teklifService.setTeklifDosyaKayit(this.teklif).then((veri) => {
            if (veri.Status) {
              this.dis_teklifDosyaAc = false;
              this.dis_teklifDosyaSil = false;
              this.teklifDosyaLink = `https://file-service.mekmar.com/file/download/teklif/teklifDosya/${this.teklif.id}/${this.teklif.teklifCloudDosya}`;
            }
          });
        }
      });
    },
    sonGorulmeDosyaGonder(event) {
      fileService.teklifSonGorulmeGonder(event, this.teklif.id).then((data) => {
        if (data.Status) {
          this.teklif.sonGorulmeCloud = true;
          this.teklif.sonGorulmeCloudDosya = data.dosyaAdi;

          teklifService.setTeklifSonGorulmeKayit(this.teklif).then((veri) => {
            if (veri.Status) {
              this.dis_teklifSonGorulmeAc = false;

              this.songorulmeDosyaLink = `https://file-service.mekmar.com/file/download/teklif/teklifGorusmeDosya/${this.teklif.id}/${this.teklif.sonGorulmeCloudDosya}`;
            }
          });
        }
      });
    },
    numuneDosyaGonder(event) {
      fileService.teklifNumuneGonder(event, this.teklif.id).then((data) => {
        this.teklif.numuneCloud = true;
        this.teklif.numuneCloudDosya = data.dosyaAdi;

        if (this.numuneGirisTarihi != null)
          this.teklif.numuneGirisTarihi = this.localService.getDateString(
            this.numuneGirisTarihi
          );
        if (this.numuneHatirlatmaTarihi != null)
          this.teklif.numuneHatirlatmaTarihi = this.localService.getDateString(
            this.numuneHatirlatmaTarihi
          );

        teklifService.setTeklifNumuneKayit(this.teklif).then((veri) => {
          if (veri.Status) {
            this.dis_numuneDosyaAc = false;
            this.numuneLink = `https://file-service.mekmar.com/file/download/teklif/teklifNumune/${this.teklif.id}/${this.teklif.numuneCloudDosya}`;
          }
        });
      });
    },
    teklifDosyaSil() {
      teklifService.setTeklifDosyaSil(this.teklif).then((data) => {
        if (data.Status) {
          this.dis_teklifDosyaAc = true;
          this.dis_teklifDosyaSil = true;
        }
      });
    },
  },
  localService: null,
  created() {
    this.isGoruldu();
    this.urunkayit = this.yeniKayit;

    this.localService = new LocalService();

    let user = this.$store.getters.__getUsername;

    if (user == "Fatih") {
      this.dis_goruldu = false;
      this.dis_saritasNot = false;
    }
    if (this.urunkayit) {
      this.yeniKayitBaslangicIslemler();
    }
    if (!this.urunkayit) {
      this.urunLoading = true;
      this.dis_urunlistesi = true;
      teklifService.getTeklif(this.teklifId).then((data) => {
        this.teklif = data.teklif;
        this.urunListesi = data.urunler;
        this.dtUrun = data.teklifModel;
        this.urun = this.dtUrun;
        //dosya işlemleri
        this.dis_fotoGonder = false;
        this.dis_proforma = false;
        this.dis_numune = false;

        if (this.teklif.proformaCloud) {
          this.dis_proformaAc = false;
          this.proformaLink = `https://file-service.mekmar.com/file/download/teklif/proforma/${this.teklif.id}/${this.teklif.proformaCloudDosya}`;
        }
        if (this.teklif.teklifCloud) {
          this.dis_teklifDosyaAc = false;
          this.dis_teklifDosyaSil = false;
          this.teklifDosyaLink = `https://file-service.mekmar.com/file/download/teklif/teklifDosya/${this.teklif.id}/${this.teklif.teklifCloudDosya}`;
        }
        if (this.teklif.numuneCloud) {
          this.numuneLink = `https://file-service.mekmar.com/file/download/teklif/teklifNumune/${this.teklif.id}/${this.teklif.numuneCloudDosya}`;
          this.dis_numuneDosyaAc = false;
        }
        if (this.teklif.sonGorulmeCloud) {
          this.songorulmeDosyaLink = `https://file-service.mekmar.com/file/download/teklif/teklifGorusmeDosya/${this.teklif.id}/${this.teklif.sonGorulmeCloudDosya}`;
          this.dis_teklifSonGorulmeAc = false;
        }
        if (this.teklif) this.teklifListeleriYukle();
        this.dis_teklifSil = false;
      });
    }
  },
  mounted() {

  }
};
</script>
<style scoped>
.dropdown {
  width: 200px;
}
</style>

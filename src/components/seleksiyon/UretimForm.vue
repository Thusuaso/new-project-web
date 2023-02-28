<template>
  
  <UrunKartMenu
    :is_seleksiyon="true"
    @urunKartSelect="urunkart_change_event($event)"
  />
  <div class="columns">
    <div class="column is-4">
      <div class="columns">
        <Card>
          <template #content>
            <div class="column">
              <div class="columns">
                <div class="column">
                  <Dropdown
                    class="siparisBilgileri"
                    v-model="kayit_tur"
                    placeholder="Kayıt Tur Seç"
                    :disabled="slk_form"
                    :options="kayitTurList"
                    optionLabel="kayitTur"
                    @change="kayitTurDegisim($event)"
                    :class="{ 'p-invalid': v$.kayit_tur.$invalid && submitted }"
                  />
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <AutoComplete
                    class="siparisBilgileri"
                    v-model="siparis"
                    :suggestions="filterSiparisList"
                    @complete="siparisListFiltered($event)"
                    @item-select="siparisSecim"
                    optionLabel="name"
                    :disabled="slk_form"
                  />
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <Dropdown
                    class="siparisBilgileri"
                    v-model="siparis_detay"
                    placeholder="Sipariş Detay Seç"
                    :disabled="dis_siparis_detay"
                    :options="seleksiyon_siparisdetay"
                    optionLabel="tanim"
                    @change="siparisDetayDegisim($event)"
                  />
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <span class="p-float-label">
                    <InputText
                      class="siparisBilgileri"
                      id="tanim"
                      type="text"
                      v-model="detail.tanim"
                      disabled
                    />
                    <label for="tanim">Sipariş Ürün Kart</label>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div clss="columns">
        <div class="column">
          <div class="columns">
            <div class="column">
              <InputText
                id="urunkartid"
                @input="urunkart_change_event($event)"
                type="text"
                v-model="detail.urunkartid"
                :disabled="slk_form"
                :class="{
                  'p-invalid': v$.detail.urunkartid.$invalid && submitted,
                }"
              />
              <Button
                v-model="detail.urunkartid"
                class="p-button-success"
                label="Seç"
                @click="urunKartShow"
                :disabled="slk_form"
              />
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <span class="p-float-label">
                <InputText
                  id="kasano"
                  type="text"
                  v-model="detail.kasano"
                  :disabled="slk_form"
                  :class="{
                    'p-invalid': v$.detail.kasano.$invalid && submitted,
                  }"
                />
                <label for="kasano">Kasa No</label>
              </span>
              <br />
              <span class="p-float-label">
                <InputText
                  id="duzenleyen"
                  type="text"
                  v-model="detail.duzenleyen"
                  :disabled="slk_form"
                  :class="{
                    'p-invalid': v$.detail.duzenleyen.$invalid && submitted,
                  }"
                />
                <label for="duzenleyen">Düzenleyen</label>
              </span>
            </div>
            <div class="column">
              <span class="p-float-label">
                <AutoComplete
                  id="ocak"
                  v-model="ocak"
                  :suggestions="filterOcakList"
                  @complete="searchOcak($event)"
                  :disabled="slk_form"
                  @item-select="selectedOcak"
                  optionLabel="name"
                  :class="{ 'p-invalid': v$.ocak.$invalid && submitted }"
                />

                <label for="ocak">Ocak Seç</label>
              </span>
              <br />
              <span class="p-float-label">
                <InputText
                  id="kasalayan"
                  type="text"
                  v-model="detail.kasalayan"
                  :disabled="slk_form"
                  :class="{
                    'p-invalid': v$.detail.kasalayan.$invalid && submitted,
                  }"
                />

                <label for="kasalayan">Kasalayan</label>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-4" style="margin-top:-11px;">
      <div class="columns">
        <div class="column">
          <Card>
            <template #content>
              <span class="p-float-label">
                <AutoComplete
                  class="siparisBilgileri"
                  id="tedarikci"
                  v-model="tedarikci"
                  :suggestions="filterTedarikciList"
                  :disabled="slk_form"
                  @complete="searchTedarikci($event)"
                  @item-select="tedarikciSecim"
                  optionLabel="name"
                  :class="{
                    'p-invalid': v$.tedarikci.$invalid && submitted,
                  }"
                />
                <label for="tedarikci">Tedarikçi Seç</label>
              </span>
              <br />
              <span class="p-float-label">
                <Calendar
                  class="siparisBilgileri"
                  id="date"
                  v-model="tarih"
                  :disabled="slk_form"
                  :class="{
                    'p-invalid': v$.tarih.$invalid && submitted,
                  }"
                />
                <label for="date">Click to select...</label>
              </span>
              <br />
              <div class="columns">
                <div
                  class="column"
                  v-for="item in seleksiyon_urunbirimlist"
                  :key="item"
                >
                  <RadioButton
                    :value="item.name"
                    v-model="urunbirim"
                    @click="urunbirim_degisim(item.id)"
                  />
                  {{ item.name }}
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
      <div class="columns" style="margin-top:-25px;">
        <div class="column">
          <Card>
            <template #content>
              <div class="columns">
                <div class="column">
                  <span class="p-float-label">
                    <InputText
                      id="kutuadet"
                      class="count"
                      type="text"
                      @input="toplam_adet_hesapla"
                      v-model="detail.kutuadet"
                      :disabled="slk_form"
                      style="width:120px;"
                    />
                    <label for="kutuadet">Kutu Sayısı</label>
                  </span>
                </div>
                <div class="column">
                  <span class="p-float-label">
                    <InputText
                      id="kutuiciadet"
                      class="count"
                      type="text"
                      @input="toplam_adet_hesapla"
                      v-model="detail.kutuiciadet"
                      :disabled="slk_form"
                      style="width:120px;"
                    />
                    <label for="kutuiciadet">Kutu İçi Adet</label>
                  </span>
                </div>
                <div class="column">
                  <span class="p-float-label">
                    <InputText
                      id="adet"
                      type="text"
                      class="count"
                      @input="m2_hesaplama"
                      v-model="detail.adet"
                      :disabled="slk_form"
                      style="width:120px;"
                    />
                    <label for="adet">Toplam Adet</label>
                  </span>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <span class="p-float-label">
                    <InputText
                      id="miktar"
                      class="count"
                      type="text"
                      @input="miktar_input_event"
                      v-model="detail.miktar"
                      :disabled="slk_form"
                      :class="{
                        'p-invalid': v$.detail.miktar.$invalid && submitted,
                      }"
                      style="width:120px;"
                    />
                    <label for="miktar">Sipariş Miktarı</label>
                  </span>
                </div>
                <div class="column">
                  <span class="p-float-label">
                    <InputText
                      id="sqm"
                      class="count"
                      type="text"
                      @input="sqm_input_event"
                      v-model="detail.sqm_miktar"
                      :disabled="slk_form"
                      :class="{
                        'p-invalid': v$.detail.sqm_miktar.$invalid && submitted,
                      }"
                      style="width:120px;"
                    />
                    <label for="sqm">SQM</label>
                  </span>
                </div>
                <div class="column">
                  <span class="p-float-label">
                    <InputText
                      id="kasa"
                      type="text"
                      class="count"
                      v-model="kasaadet"
                      :disabled="slk_form"
                      :class="{
                        'p-invalid': v$.kasaadet.$invalid && submitted,
                      }"
                      style="width:120px;"
                    />
                    <label for="kasa">Kasa</label>
                  </span>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
      <div class="columns" style="margin-top:-25px;">
        <div class="column">
          <Card style="height:100px;">
            <template #content>
              <div class="columns" style="margin-top:-35px;">
                <div class="column">
                  <Checkbox
                    v-model="detail.kutu"
                    :binary="true"
                    :disabled="slk_form"
                  />
                  Kutu
                </div>
                <div class="column">
                  <Checkbox
                    v-model="detail.bagli"
                    :binary="true"
                    :disabled="slk_form"
                  />
                  Bağlı
                </div>
                <div class="column">
                  <Checkbox
                    v-model="detail.disarda"
                    :binary="true"
                    :disabled="slk_form"
                  />
                  Dışarda
                </div>
              </div>
              <span class="p-float-label">
                <InputText
                  id="notlar"
                  style="width: 100%"
                  type="text"
                  v-model="notlar"
                  :disabled="slk_form"
                  :class="{ 'p-invalid': v$.notlar.$invalid && submitted }"
                />
                <label for="notlar">Notlar</label>
              </span>
            </template>
          </Card>
        </div>
      </div>
    </div>
    <div class="column is-4" style="margin-top:-11px;">
      <Card>
        <template #content>
          <div class="columns">
            <div class="column">
              <span class="p-float-label">
                <InputText
                  id="kategoriadi"
                  type="text"
                  v-model="detail.kategoriadi"
                  :disabled="true"
                />
                <label for="kategoriadi">Kategori Adı</label>
              </span>
              <br />
              <span class="p-float-label">
                <InputText
                  id="ebat"
                  type="text"
                  v-model="detail.ebat"
                  :disabled="true"
                />
                <label for="ebat">Ebat</label>
              </span>
            </div>
            <div class="column">
              <span class="p-float-label">
                <InputText
                  id="urunadi"
                  type="text"
                  v-model="detail.urunadi"
                  :disabled="true"
                />
                <label for="urunadi">Ürün Adı</label>
              </span>
              <br />

              <span class="p-float-label">
                <InputText
                  id="kenarislem"
                  type="text"
                  v-model="detail.kenarislem"
                  :disabled="true"
                />
                <label for="kenarislem">Kenar İşlem</label>
              </span>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <DataTable :value="seleksiyon_uretimozetlist">
                <Column field="tanim" header="Üretici"></Column>
                <Column field="gun" header="Gün"></Column>
                <Column field="ay" header="Ay"></Column>
                <Column field="yil" header="Yıl"></Column>
              </DataTable>
              <br />
              <div id="notHereButton">
                <span class="notHereButtonTitle">BULUNAMADI</span>
                <InputSwitch
                  class="notHereButtonInput"
                  v-model="detail.bulunamayan"
                  style="margin-left: 25px"
                />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
  <div class="columns" style="margin-top:-30px;">
    <div class="column">
      <Button
        class="p-button-primary"
        :disabled="slk_dis_yeni_btn"
        @click="btn_yeni_click"
        label="Yeni"
      />
    </div>
    <div class="column">
      <Button
        :disabled="slk_dis_vazgec_btn"
        @click="btn_vazgec_click"
        class="p-button-info"
        label="Vazgeç"
      />
    </div>
    <div class="column">
      <Button
        :disabled="slk_dis_kaydet_btn"
        @click="btn_kaydet_click"
        label="Kaydet"
        class="p-button-success"
      />
    </div>
    <div class="column">
      <Button
        :disabled="slk_dis_guncelle_btn"
        @click="btn_guncelle_click"
        label="Güncelle"
        class="p-button-secondary"
      />
    </div>
    <div class="column">
      <Button
        :disabled="slk_dis_sil_btn"
        @click="btn_sil_click"
        label="Sil"
        class="p-button-danger"
      />
    </div>
  </div>

  
  
  
  
  <Dialog :visible="isDisplay">
    <template #header>
      <h3>Üretim Fazlası Dikkat !</h3>
    </template>

    Üretim Fazlası Mevcut Yinede Kaydetmek Ister misiniz?

    <template #footer>
      <Button
        @click="isfazlaMiKayit"
        label="No"
        icon="pi pi-times"
        class="p-button-text"
      />
      <Button @click="fazlaKayit" label="Yes" icon="pi pi-check" autofocus />
    </template>
  </Dialog>
  <Dialog :visible="isDisplay2" :modal="true" position="top">
    <template #header>
      <h3>Ürün bilgileri eşleşmiyor</h3>
    </template>

    Yinede Kaydetmek Ister misiniz?

    <template #footer>
      <Button
        @click="isEslesmiyor"
        label="No"
        icon="pi pi-times"
        class="p-button-text"
      />
      <Button
        @click="isYinedeKaydet"
        label="Yes"
        icon="pi pi-check"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script>
import { mapGetters } from "vuex";
import service from "@/service/SeleksiyonService";
import LocalService from "@/service/LocalService";
import UrunKartMenu from "@/components/shared/UrunKartMenu";
import socket from "@/service/SocketService";
import siparisService from "@/service/SiparisService";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      kayit_tur: { required },
      ocak: { required },
      tedarikci: { required },
      tarih: { required },
      urunbirim: { required },
      kasaadet: { required },
      notlar: { required },
      detail: {
        urunkartid: { required },
        kasano: { required },
        duzenleyen: { required },
        kasalayan: { required },
        miktar: { required },
        sqm_miktar: { required },
      },
    };
  },
  components: {
    UrunKartMenu,
  },
  computed: {
    ...mapGetters([
      "seleksiyon_siparislist",
      "seleksiyon_siparisdetaylist",
      "seleksiyon_ocaklist",
      "seleksiyon_tedarikcilist",
      "seleksiyon_urunbirimlist",
      "seleksiyon_uretimozetlist",
      "slk_dis_yeni_btn",
      "slk_dis_kaydet_btn",
      "slk_dis_vazgec_btn",
      "slk_dis_guncelle_btn",
      "slk_dis_sil_btn",
      "slk_enb_mekmar",
      "slk_form",
      "getUrunKartMenuList",
      "select_seleksiyon_kart",
      "getLoadStatus",
    ]),

  },
  props: ["kasano", "kayitstatu"],
  data() {
    return {
      filterSiparisList:[],
      submitted: false,
      isDisplay2: false,
      isDisplay: false,
      dis_siparis_detay: false,
      notlar: "",
      kasaadet: 0,
      urunbirim: null,
      tarih: null,
      filterTedarikciList: null,
      tedarikci: null,
      ocak: null,
      filterOcakList: null,
      seleksiyon_siparisdetay: [],
      siparis_detay: null,
      siparis: null,
      kayit_tur: null,
      kayitTurList: [
        { id: 1, kayitTur: "Stok" },
        { id: 2, kayitTur: "Sipariş" },
      ],
      detail: {
        tanim: "",
      },
      en: "",
      boy: "",
    };
  },
  methods: {
    isYinedeKaydet() {
      this.isDisplay2 = false


      
      const item = this.seleksiyon_siparisdetay.find(x => x.tanim === this.siparis_detay.tanim)
        

        //ürün kartı bilgisini göndermek için
        const item2 = this.seleksiyon_siparisdetay.find(
          (x) => x.tanim === this.siparis_detay.tanim
        );
        this.detail.tanim = this.siparis_detay.tanim;
        this.detail.urunkartid = item2.urunkart_id;
        const urunKart = this.getUrunKartMenuList.find(x=>x.id == item2.urunkart_id)
        this.detail.kategoriadi = urunKart.kategoriAdi
        this.detail.ebat = urunKart.ebat
        this.detail.urunadi = urunKart.urunAdi
        this.detail.kenarislem = urunKart.yuzeyIslem

        if (item) {


          this.urunkart_change_event(item.urunkart_id)
          this.tedarikci = item.tedarikci
          console.log("urunbirimid", item.urunbirimid)
          if (item.urunbirimid == 1) {
          this.urunbirim = 'M2'
          } else if (item.urunbirimid == 2) {
            this.urunbirim = 'Adet'
          } else if (item.urunbirimid == 3) {
          this.urunbirim = 'Mt'
        }

          
        }

    },
    isEslesmiyor() {
      this.isDisplay2 = false;
    },
    miktar_input_event(event) {
      this.detail.miktar = event.target.value.replace(",", ".");
      if (this.urunbirim == "M2") {
        this.detail.sqm_miktar = this.detail.miktar;
      }
    },
    sqm_input_event(event) {
      if (event) this.detail.sqm_miktar = event.replace(",", ".");
    },
    m2_hesaplama() {
      if (this.kayitstatu) {
          if (this.urunbirim == "M2") {
          if (this.en == "ANT" && this.boy == "PAT") {
            this.detail.miktar = this.detail.kutuadet * 0.74338688;
            this.detail.miktar = this.formatdecimal(this.detail.miktar);
            this.detail.sqm_miktar = this.detail.miktar;
          } else if (this.en == "20,3" && this.boy == "SET") {
            this.detail.miktar = this.detail.kutuadet * 0.494914;
            this.detail.miktar = this.formatdecimal(this.detail.miktar);
            this.detail.sqm_miktar = this.detail.miktar;
          } else if (
            this.boy == "FREE" ||
            this.boy == "SLAB" ||
            this.boy == "VAR" ||
            this.boy == "Free" ||
            this.boy == "Various" ||
            this.boy == "Random"
          ) {
            this.detail.miktar = 0;
            this.detail.sqm_miktar = this.detail.miktar;
          } else {
            this.en = this.en.replace(",", ".");
            this.boy = this.boy.replace(",", ".");
            this.detail.miktar = this.formatdecimal(
              (this.detail.adet * this.en * this.boy) / 10000
            );
            this.detail.sqm_miktar = this.detail.miktar;
          }
        } else if (this.urunbirim == "Adet") {
          this.detail.miktar = this.detail.adet;
          if (this.en == "ANT" && this.boy == "PAT") {
            this.detail.sqm_miktar = this.detail.kutuadet * 0.74338688;
            this.detail.sqm_miktar = this.formatdecimal(this.detail.sqm_miktar);
            this.detail.miktar = this.detail.kutuadet * this.detail.kutuiciadet;
          } else if (this.en == "20,3" && this.boy == "SET") {
            this.detail.sqm_miktar = this.detail.kutuadet * 0.494914;
            this.detail.sqm_miktar = this.formatdecimal(this.detail.sqm_miktar);
            this.detail.miktar = this.detail.kutuadet * this.detail.kutuiciadet;
          } else if (
            this.boy == "FREE" ||
            this.boy == "SLAB" ||
            this.boy == "VAR" ||
            this.boy == "Free" ||
            this.boy == "Various" ||
            this.boy == "Random"
          ) {
            this.detail.sqm_miktar = 0;
            this.detail.miktar = this.detail.kutuadet * this.detail.kutuiciadet;
          } else {
            this.en = this.en.replace(",", ".");
            this.boy = this.boy.replace(",", ".");
            this.detail.sqm_miktar = this.formatdecimal(
              (this.detail.adet * this.en * this.boy) / 10000
            );
          }
        }
      } else {
        if (this.detail.urunbirimid == 1) {
          const urunKart = this.getUrunKartMenuList.find(x => x.id == this.detail.urunkartid)
          console.log("urunKart ilk",urunKart)
          if (urunKart.en == "ANT" && urunKart.boy == "PAT") {
            this.detail.miktar = this.detail.kutuadet * 0.74338688;
            this.detail.miktar = this.formatdecimal(this.detail.miktar);
            this.detail.sqm_miktar = this.detail.miktar;
          } else if (urunKart.en == "20,3" && urunKart.boy == "SET") {
            this.detail.miktar = this.detail.kutuadet * 0.494914;
            this.detail.miktar = this.formatdecimal(this.detail.miktar);
            this.detail.sqm_miktar = this.detail.miktar;
          } else if (
            urunKart.boy == "FREE" ||
            urunKart.boy == "SLAB" ||
            urunKart.boy == "VAR" ||
            urunKart.boy == "Free" ||
            urunKart.boy == "Various" ||
            urunKart.boy == "Random"
          ) {
            this.detail.miktar = 0;
            this.detail.sqm_miktar = this.detail.miktar;
          } else {
            const en = parseFloat(urunKart.en.replace(",", "."));
            const boy = parseFloat(urunKart.boy.replace(",", "."));
            this.detail.miktar = this.formatdecimal(
              (this.detail.adet * en * boy) / 10000
            );
            this.detail.sqm_miktar = this.detail.miktar;
          }
        } else if (this.detail.urunbirimid == 2) {
          const urunKart = this.getUrunKartMenuList.find(x => x.id == this.detail.urunkartid)

          this.detail.miktar = this.detail.adet;
          if (urunKart.en == "ANT" && urunKart.boy == "PAT") {
            this.detail.sqm_miktar = this.detail.kutuadet * 0.74338688;
            this.detail.sqm_miktar = this.formatdecimal(this.detail.sqm_miktar);
            this.detail.miktar = this.detail.kutuadet * this.detail.kutuiciadet;
          } else if (urunKart.en == "20,3" && urunKart.boy == "SET") {
            this.detail.sqm_miktar = this.detail.kutuadet * 0.494914;
            this.detail.sqm_miktar = this.formatdecimal(this.detail.sqm_miktar);
            this.detail.miktar = this.detail.kutuadet * this.detail.kutuiciadet;
          } else if (
            urunKart.boy == "FREE" ||
            urunKart.boy == "SLAB" ||
            urunKart.boy == "VAR" ||
            urunKart.boy == "Free" ||
            urunKart.boy == "Various" ||
            urunKart.boy == "Random"
          ) {
            this.detail.sqm_miktar = 0;
            this.detail.miktar = this.detail.kutuadet * this.detail.kutuiciadet;
          } else {
            const en = urunKart.en.replace(",", ".");
            const boy = urunKart.boy.replace(",", ".");
            this.detail.sqm_miktar = this.formatdecimal(
              (this.detail.adet * en * boy) / 10000
            );
          }
        }
      }
      
    },
    formatdecimal(value) {
      return (value / 1).toFixed(2).replace(",", ".");
    },
    // Kutulu Ürünlerde
    toplam_adet_hesapla() {
      this.m2_hesaplama();
      if (this.detail.kutuadet > 0 && this.detail.kutuiciadet > 0) {
        this.detail.adet = this.detail.kutuadet * this.detail.kutuiciadet;
      }
    },
    btn_sil_click() {
      this.$store.dispatch("seleksiyonSilClickActions");
      this.$store.dispatch('fullscreenLoadingAct', true)

      service.uretimSil(this.detail.kasano).then((status) => {
        this.$store.dispatch('loadUretimList', status.data2)

        if (status) {
          socket.siparis.emit("seleksiyon_kayitsil_event", this.detail.id);
          if (this.kayit_tur == "Sipariş") {
            siparisService
              .getSiparisUrun(this.siparis.name)
              .then((siparis_data) => {
                console.log(siparis_data)
                this.dataSifirla();
                this.$emit("seleksiyon_form_kapat");
                this.$store.dispatch('fullscreenLoadingAct', false)

                this.$toast.add({
                  severity: "error",
                  summary: "Üretim Kasa Silme",
                  detail: "Kasa Silme Başarılı",
                  life: 3000,
                });
                this.emitter.emit('kaydet_emit')



              });
          } else {
            this.dataSifirla();
            this.$emit("seleksiyon_form_kapat");
            this.emitter.emit('kaydet_emit')

            this.$store.dispatch('fullscreenLoadingAct', false)

          }
        }
      });
    },
    btn_guncelle_click() {
      this.submitted = true;
      if (this.v$.$invalid) {
        this.$toast.add({
          severity: "error",
          summary: "Zorunlu Alanlar",
          detail: "Zorunlu alanları doldurunuz",
          life: 3000,
        });

      } else {

        this.isGuncelle = true;
        if (this.kayit_kontrol()) {
          this.$store.dispatch('fullscreenLoadingAct', true)

          service.uretimGuncelle(this.detail).then((status) => {
            this.$store.dispatch('loadUretimList', status.data2)

            if (status) {
              service.getUretim(this.detail.kasano).then((uretim_data) => {
                socket.siparis.emit(
                  "seleksiyon_kayitguncelle_event",
                  uretim_data
                );


                if (this.detail.uretimturid == 2) {
                  siparisService
                    .getSiparisUrun(this.siparis.name)
                    .then((siparis_data) => {
                      socket.siparis.emit(
                        "seleksiyon_siparisdegisim_event",
                        siparis_data
                      );

                      this.dataSifirla();
                      this.$store.dispatch("seleksiyonGuncelleClickActions");
                      this.emitter.emit('kaydet_emit')
                      this.$emit("seleksiyon_form_kapat");
                      this.$store.dispatch('fullscreenLoadingAct', false)


                    });
                } else {
                  this.dataSifirla();
                  this.$store.dispatch("seleksiyonGuncelleClickActions");
                  this.emitter.emit('kaydet_emit')
                  this.$emit("seleksiyon_form_kapat");
                  this.$store.dispatch('fullscreenLoadingAct', false)


                }

              });
              this.$store.dispatch('fullscreenLoadingAct', false)

              this.$toast.add({
                severity: "success",
                summary: "Kayıt Güncelleme",
                detail: "Kayıt Güncelleme Başarılı",
                life: 3000,
              });
            } else {
              this.$store.dispatch('fullscreenLoadingAct', false)

              this.$toast.add({
                severity: "error",
                summary: "Kayıt Güncelleme",
                detail: "Kayıt Güncelleme Hatalı",
                life: 3000,
              });
              this.emitter.emit('kaydet_emit')


            }
          });
        }
      }
    },
    async dataSifirla() {
      await service.getUrunDetayModel().then((data) => {
        this.detail = data;
        this.siparis = "";
        this.tedarikci = "";
        this.tarih = null;
        this.notlar = "";
        this.urunbirim = "";
        this.kayit_tur = "";
        this.siparis_detay = "";
        this.ocak = "";
        this.kasaadet = 1;
      });
    },
    kayit_kontrol() {
      if (this.kayit_tur.name == "") {
        alert("Üretim Kayıt Tür Şeklini Belirtiniz.");
        return false;
      }
      if (this.ocak == "") {
        alert("Lütfen ocak giriniz..");
        return false;
      }
      if (this.tedarikci == "") {
        alert("Tedarikçi seçiniz..");
        return false;
      }
      if (this.tarih == null) {
        alert("Tarih giriniz..");
        return false;
      }

      if (this.kayit_tur == "Sipariş") {
        if (this.siparis == "") {
          alert("Sipariş no giriniz..");
          return false;
        }

        if (this.siparis_detay == "" && this.detail.urunkartid == null) {
          alert("Sipariş kalem seçimi yapınız..");

          return false;
        }
      }

      if (this.urunbirim == "") {
        alert("Ürün Birim Seçimi Yapınız..");
        return false;
      }

      if (this.kasaadet == null) {
        alert("Kasa sayısı belirtilmeli..");
        return false;
      }

      if (this.kasaadet <= 0) {
        alert("Kasa sayısı en az 1 olmalıdır.");
        return false;
      }
      if (this.kasano == null) {
        alert("Kasano girilmesi gerekiyor..");
        return false;
      }
      if (this.notlar == "") {
        alert("Not girilmesi gerekiyor.");
        return false;
      }

      //tedarikçi seçimi

      // ürün birim seçimi
      if (this.urunbirim == "M2") {
        this.detail.urunbirimid = 1;
      } else if (this.urunbirim == "Adet") {
        this.detail.urunbirimid = 2;
      } else if (this.urunbirim == "Mt") {
        this.detail.urunbirimid = 3;
      }
      // tarih bilgisinin alınması
      this.detail.tarih = this.localService.getDateString(this.tarih);
      //ürün ocak yüklemesi
      this.detail.urunocakid = this.ocak.id;
      //   this.seleksiyon_ocaklist.find(
      //   (x) => x.name == this.ocak.name
      // ).id;
      this.detail.tedarikciid = this.tedarikci.id;
      //   this.seleksiyon_tedarikcilist.find(
      //   (x) => x.name == this.tedarikci.name
      // ).id;

      //üretim tür bilgisi
      this.detail.urundurumid = 1;
      this.detail.uretimturid = this.kayit_tur.id;

      this.detail.kayit_sayisi = this.kasaadet;
      this.detail.aciklama = this.notlar;

      return true;
    },
    coklu_kayit() {
      service.uretimCokluKayit(this.detail).then((data) => {
        if (!data.kasa_kontrol) {
          alert("Kasa no daha önce kullanılmış kontrol ediniz.");
          return;
        }
        if (!data.kayit_durum) {
          alert("Seleksiyon kaydı yapılamadı sonra tekrar deneyin.");
          return;
        }

        if (data.kayit_durum) {
          this.$store.dispatch("seleksiyonKaydetClickActions");
          socket.siparis.emit("seleksiyon_coklukayit_event", data.kasa_list);
          this.$store.dispatch('loadUretimList', data.data2)

          if (this.kayit_tur.name == "Sipariş") {
            siparisService
              .getSiparisUrun(this.siparis)
              .then((siparis_data) => {
                socket.siparis.emit(
                  "seleksiyon_siparisdegisim_event",
                  siparis_data
                );

                this.dataSifirla();
                this.$toast.add({
                  severity: "success",
                  summary: "Üretim Kasa Kaydet",
                  detail: "Kasa Kaydetme Başarılı",
                  life: 3000,
                });
                this.emitter.emit('kaydet_emit')
                this.$store.dispatch('fullscreenLoadingAct', false)

              });
          } else {
            this.dataSifirla();
            this.$toast.add({
              severity: "success",
              summary: "Üretim Kasa Kaydet",
              detail: "Kasa Kaydetme Başarılı",
              life: 3000,
            });
            this.emitter.emit('kaydet_emit')
            this.$store.dispatch('fullscreenLoadingAct', false)


          }
        }
      });
    },
    btn_kaydet_click() {
      this.submitted = true;
      if (this.v$.$invalid) {
        this.$toast.add({
          severity: "error",
          summary: "Zorunlu Alanlar",
          detail: "Zorunlu alanları doldurunuz",
          life: 3000,
        });

      } else {
        const data = {
          'siparisno': this.detail.siparisaciklama,
          'urunkartid': this.detail.urunkartid,
          'kasaadet': this.kasaadet,
          'miktar': this.detail.miktar
        }
        this.$store.dispatch('fullscreenLoadingAct', true)

        service.getProductCrateControl(data).then(data => {
          if (data.status) {
            if (confirm('Üretim fazlası mevcut. Yine de kaydetmek istermisiniz?')) {
              this.kayit_kontrol();
              this.isGuncelle = false;
              if (this.detail) {
                if (this.detail.kayit_tur == 1) {
                  if (this.kayit_kontrol()) {
                    this.kayit_kontrol();

                    this.coklu_kayit();
 

                    //kasa sayısı alınacak toplama göre hareket edilecek
                  }
                } else {
                  if (this.kayit_kontrol()) {
                    this.kayit_kontrol();
                    this.coklu_kayit();

                  }
                }
              }
            }
          } else {
            this.kayit_kontrol();
            this.isGuncelle = false;
            if (this.detail) {
              if (this.detail.kayit_tur == 1) {
                if (this.kayit_kontrol()) {
                  this.kayit_kontrol();

                  this.coklu_kayit();
                  

                  //kasa sayısı alınacak toplama göre hareket edilecek
                }
              } else {
                if (this.kayit_kontrol()) {
                  this.kayit_kontrol();
                  this.coklu_kayit();
                  

                }
              }
            }
          }
        })
        
      }
    },
    btn_vazgec_click() {
      this.$store.dispatch("seleksiyonVazgecClickActions");
    },
    btn_yeni_click() {

      this.dataSifirla().then(() => {
        this.$store.dispatch("seleksiyonYeniClickActions");
        this.tarih = new Date();

      });

      //this.seleksiyonKasaNo()
    },
    urunbirim_degisim(event) {
      this.detail.urunbirimid = this.seleksiyon_urunbirimlist.find(
        (x) => x.id == event
      ).id;
      this.urunbirim = this.seleksiyon_urunbirimlist.find(
        (x) => x.id == event
      ).name;
      this.detail.sqm_miktar = 0;
      this.detail.miktar = 0;
      if (this.urunbirim == 1) {
        this.isInputValue = false;
      } else if (this.urunbirim == 2) {
        this.isInputValue = true;
      }
    },
    tedarikciSecim() {
      const item = this.seleksiyon_tedarikcilist.find(
        (x) => x.name == this.tedarikci.name
      );
      this.detail.tedarikciid = item.id;
      if (item.id == 1 || item.id == 123) {
        if (this.kasano == "") {
            this.seleksiyonKasaNo();

        }
      } else {
        if (this.kayitstatu) {
          this.kasaNoAuto();
        } else {
          let kasaNo = this.detail.kasano.toString();
          if (kasaNo.length == 5) {
            this.kasaNoAuto();
          }
        }
      }
    },
    searchTedarikci(event) {
      let result;
      if (event.query.length == 0) result = this.seleksiyon_tedarikcilist;
      else {
        result = this.seleksiyon_tedarikcilist.filter((x) => {
          return x.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filterTedarikciList = result;
    },
    selectedOcak(event) {
      this.detail.urunocakid = event.value.id;
    },
    searchOcak(event) {
      let result;

      if (event.query.length == 0) result = this.seleksiyon_ocaklist;
      else {
        result = this.seleksiyon_ocaklist.filter((x) => {
          return x.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filterOcakList = result;
    },
    siparisListFiltered(event) {
      let result;

      if (event.query.length == 0) {
        result = this.seleksiyon_siparislist;

      }

      else {
        result = this.seleksiyon_siparislist.filter((x) => {
          return x.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filterSiparisList = result;
    },
    siparisDetayDegisim() {

        const item = this.seleksiyon_siparisdetay.find(
          (x) => x.tanim === this.siparis_detay.tanim
      );

        //ürün kartı bilgisini göndermek için
      
      if (item.urunkart_id == this.detail.urunkartid) {
        this.urunkart_change_event(item.urunkart_id);

          if (item) {
            

            this.tedarikci = this.seleksiyon_tedarikcilist.find(
              (x) => x.name == item.tedarikci
            );
            this.detail.tedarikciid = this.seleksiyon_tedarikcilist.find(
              (x) => x.name == item.tedarikci
            ).id;








            console.log("urunbirimid",item.urunbirimid)
            this.urunbirim = this.seleksiyon_urunbirimlist.find(
              (x) => x.id == item.urunbirimid
            ).name;
            this.tedarikciSecim()
            
          }
        } else {
          

          if (this.kayitstatu == true) {
            if (item) {
              this.urunkart_change_event(item.urunkart_id);

              this.tedarikci = this.seleksiyon_tedarikcilist.find(
                (x) => x.name == item.tedarikci
              );
              this.detail.tedarikciid = this.seleksiyon_tedarikcilist.find(
                (x) => x.name == item.tedarikci
              ).id;              
              
              

              this.isYinedeKaydet()
            } 
             
          

          } else {
            
            this.isDisplay2 = true
            

          }
        }
        if (this.kasano == "") {
          if (this.detail.tedarikciid == 1 || this.detail.tedarikciid == 123) {
            this.seleksiyonKasaNo();
          } else {
            this.kasaNoAuto();
          }
        }
        
    },
    kasaNoAuto() {
      service.getDisFirmaKasaNo().then((value) => {
        this.detail.kasano = value.kasano;
      });
    },
    siparisSecim() {
      const kontrol = this.seleksiyon_siparislist.find(
        (x) => x.name == this.siparis.name
      );

      if (kontrol) {
        service.getSiparisUretimDetayList(this.siparis.name).then((data) => {
          this.$store.dispatch("loadSiparisDetay", data);
          this.seleksiyon_siparisdetay = data;

          this.dis_siparis_detay = true;

          if (this.siparis) this.dis_siparis_detay = false;
          this.detail.siparisaciklama = this.siparis.name;
          this.notlar = this.detail.siparisaciklama;
        });
      }
    },
    seleksiyonKasaNo() {
      service.getSeleksiyonFirmaKasaNo().then((value) => {
        this.detail.kasano = value.kasano;
      });
    },
    kayitTurDegisim(event) {
      this.detail.kayit_tur = event.value.id;
      if (this.kasano != 0) {
        this.kasano;
      } else {
        this.seleksiyonKasaNo();
      }

      if (event == "Sipariş") {
        this.dis_siparis_list = false;
      } else {
        this.siparis = "";
        this.siparis_detay = "";

        this.detail.siparisaciklama = "Stok";
        this.notlar = "STOK";
        this.urunbirim = "M2";
        this.kasaadet = 1;
        this.detail.duzenleyen = "Muhsin";
        this.tedarikci = { id: "1", name: "Mekmer" };
        
      }
    },
    urunKartShow() {
      this.emitter.emit("seleksiyonUrunKartShow");
    },
    urunkart_change_event(event) {
      const urun_kart = this.getUrunKartMenuList.find((x) => x.id == event);

      if (urun_kart) {
        this.detail.kategoriadi = urun_kart.kategoriAdi;
        this.detail.ebat = urun_kart.ebat;
        this.detail.urunadi = urun_kart.urunAdi;
        this.detail.kenarislem = urun_kart.yuzeyIslem;
        this.en = urun_kart.en;
        this.boy = urun_kart.boy;
        this.detail.urunkartid = event;






      } else {
        this.detail.kategoriadi = "";
        this.detail.ebat = "";
        this.detail.urunadi = "";
        this.detail.kenarislem = "";
      }



    },

  },
  created() {
    this.localService = new LocalService();
    if (!this.kayitstatu) {
      service.getUrunDetay(this.kasano).then((data) => {
        this.detail = data;
        this.kayit_tur = this.kayitTurList.find(
          (x) => x.id == parseInt(this.detail.uretimturid)
        );
        this.siparis = this.seleksiyon_siparislist.find(
          (x) => x.name == this.detail.siparisaciklama
        );
        this.seleksiyon_siparisdetay = this.seleksiyon_siparisdetaylist.filter(
          (x) => x.siparisno == this.detail.siparisaciklama
        );
        this.siparis_detay = this.seleksiyon_siparisdetaylist.find(
          (x) =>
            x.siparisno == this.detail.siparisaciklama &&
            x.urunkart_id == this.detail.urunkartid
        );
        this.ocak = this.seleksiyon_ocaklist.find(
          (x) => x.id == this.detail.urunocakid
        );
        this.tedarikci = this.seleksiyon_tedarikcilist.find(
          (x) => x.id == this.detail.tedarikciid
        );
        this.tarih = this.localService.getStringDate(this.detail.tarih);
        this.urunbirim = this.seleksiyon_urunbirimlist.find(
          (x) => x.id == this.detail.urunbirimid
        ).name;
        this.kasaadet = 1;
        this.notlar = this.detail.aciklama;
        this.$store.dispatch('fullscreenLoadingAct', false)

        
      });
    } else {
      if (this.kayitstatu) {
        this.tarih = new Date();

        service.getUrunDetayModel().then((data) => {
          this.detail = data;
          this.detail.miktar = null

          
        });
        this.detail.tanim = ""
      }
    }
  },
  watch: {
    
  }
};
</script>

<style scoped>
.count {
  width: 50px;
}
.siparisBilgileri {
  width: 350px;
}
</style>

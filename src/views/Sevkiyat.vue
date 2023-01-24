<template>
  <section>
    <div class="columns is-multiline is-centered">
      <div class="column is-10">
        <div class="columns is-multiline" style="margin-left: -129px">
          <div class="column is-4">
            <span class="p-float-label">
              <AutoComplete
                id="siparisno"
                v-model="siparis"
                :suggestions="filterSiparisListe"
                @item-select="siparisDegisim"
                @complete="filterSiparisList($event)"
                optionLabel="siparisno"
                :class="{ 'p-invalid': v$.siparis.$invalid && submitted }"
              />

              <label for="siparisno">Sipariş Listesi</label>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-multiline">
      <div class="column is-12 box">
        <h4 class="subtitle">Çıkış Bilgileri</h4>

        <div class="columns is-multiline">
          <div class="column is-2">
            <Calendar
              v-model="cikis_tarihi"
              :class="{ 'p-invalid': v$.cikis_tarihi.$invalid && submitted }"
            />
          </div>
          <div class="column is-2">
            <span class="p-float-label">
              <InputText
                id="faturano"
                type="text"
                v-model="faturano"
                :class="{ 'p-invalid': v$.faturano.$invalid && submitted }"
              />

              <label for="faturano">Fatura No</label>
            </span>
          </div>
          <div class="column is-2">
            <Checkbox v-model="takip" :binary="true" />Takip
          </div>
          <div class="column is-2">
            <Checkbox
              @input="normalSevkIslem($event)"
              v-model="normal_sevk"
              :binary="true"
            />Normal Sevk
          </div>
          <div class="column is-2">
            <Checkbox
              @input="hizliSevkIslem($event)"
              v-model="hizli_sevk"
              :binary="true"
            />Hızlı Sevk
          </div>
        </div>
      </div>
      <br />
    </div>
    <div class="columns is-multiline">
      <div class="column is-12 box">
        <div class="columns is-multiline">
          <div class="column is-4">
            <span class="p-float-label">
              <Dropdown
                id="icerik"
                @change="siparisKalemDegisim($event)"
                v-model="selectedSipKalem"
                :options="sipariskalemlist"
                optionLabel="icerik"
                :style="{ width: '350px' }"
              />

              <label for="icerik">Sipariş Kalem Listesi</label>
            </span>
          </div>
          <div class="column is-2">
            <span class="p-float-label">
              <InputText
                id="siparis"
                type="text"
                v-model="siparis_miktar"
                disabled
              />

              <label for="siparis">Sipariş</label>
            </span>
          </div>
          <div class="column is-2">
            <span class="p-float-label">
              <InputText
                id="giden"
                type="text"
                v-model="gidenMiktar"
                disabled
              />

              <label for="giden">Giden</label>
            </span>
          </div>
          <div class="column is-2" style="text-align: center">
            <span class="p-float-label">
              <InputText id="kalan" type="text" v-model="kalan" disabled />
              <label for="kalan">Kalan</label>
            </span>
          </div>
          <div class="column is-2">
            <Button type="is-success" @click="sevkiyatIslemi" label="Sevk Et" :disabled="is_sevk_disabled"/>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-multiline">
      <div class="column is-4">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h2 class="has-text-centered">ÜRETİM ÜRÜN LİSTESİ</h2>
          </div>
          <div class="column is-12">
            <DataTable :value="kasalistesi" dataKey="kasano">
              <Column field="kasano" header="No">
                <template #body="slotProps">
                  {{ slotProps.data.kasano }}
                </template>
                <template #footer>
                  {{ toplam_uretim_adet }}
                </template>
              </Column>
              <Column field="miktar" header="Miktar">
                <template #body="slotProps">
                  {{ slotProps.data.miktar }}
                </template>
                <template #footer>
                  {{ formatDecimal(toplam_uretim_miktar) }}
                </template>
              </Column>
              <Column field="birimadi" header="B">
                <template #body="slotProps">
                  {{ slotProps.data.birimadi }}
                </template>
              </Column>

              <Column
                field="kasa_secim"
                header="S"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  <Checkbox
                    v-model="slotProps.data.kasa_secim"
                    :binary="true"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
      <div class="column is-2">
        <div class="columns is-multiline">
          <div class="column is-12 btn_islem">
            <Button
              class="p-button-secondary"
              @click="kasaCikisYap"
              :disabled="is_kasa_form"
              label="Kasa Çık"
            />
          </div>
          <div class="column is-12 is-justified">
            <Checkbox
              @input="kasaHepsiSec($event)"
              v-model="isSelectedHepsi"
              :disabled="is_all_form"
              :binary="true"
            />
            Hepsi
          </div>
        </div>
      </div>
      <div class="column is-6">
        <div class="columns is-multiline is-mobile">
          <div class="column is-12">
            <h2 class="has-text-centered">ÇIKIŞ ÜRÜN LİSTESİ</h2>
          </div>
          <div class="column is-12">
            <DataTable :value="sevk_kasa_listesi">
              <Column
                header="Kasa No"
                headerStyle="width:70px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.kasano }}
                </template>
              </Column>
              <Column
                header="Ürün"
                headerStyle="width:70px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.urunadi }}
                </template>
              </Column>
              <Column
                header="Ebat"
                headerStyle="width:70px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.ebat }}
                </template>
              </Column>
              <Column header="Yüzey" headerStyle="width:130px">
                <template #body="slotProps">
                  {{ slotProps.data.yuzeyislem }}
                </template>
              </Column>
              <Column
                field="miktar"
                header="Miktar"
                headerStyle="width:70px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.miktar) }}
                </template>
                <template #footer>
                  {{ formatDecimal(sevk_toplam_miktar) }}
                </template>
              </Column>
              <Column
                field="birimfiyat"
                header="B"
                headerStyle="width:70px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.birimfiyat) }}
                </template>
              </Column>
              <Column
                header="Satış Toplam"
                headerStyle="width:90px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.toplam) }}
                </template>
                <template #footer>
                  {{ formatDecimal(sevk_toplam_satis) }}
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import service from "../service/SevkiyatService";
import socket from "../service/SocketService";
import LocalService from "../service/LocalService";
import store from "@/store";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ref } from 'vue'
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      siparis: { required },
      cikis_tarihi: { required },
      faturano: { required },
    };
  },
  data() {
    return {
      is_sevk_disabled:false,
      submitted: false,
      filterSiparisListe: null,
      selectedSipKalem: null,
      is_navlun_form: false,
      isNavlun: false,
      isMobile: null,
      is_kasa_form: true,
      is_all_form: true,
      siparis: "",
      siparisList: null,
      sipariskalemlist: null,
      cikis_tarihi: null,
      eta_tarihi: null,
      sevk_toplam_satis: 0,
      sevk_toplam_miktar: 0,
      sevkmodel: null,
      kasamodel: null,
      siparis_miktar: 0,
      giden: 0,
      kalan: 0,
      sipariskalem_kasalistesi: null,
      kasalistesi: null,
      toplam_uretim_adet: 0,
      toplam_uretim_miktar: 0,
      dis_kasa_sec: true,
      sevk_kasa_listesi: [],
      select_urunkartid: null,
      musteri_id: null,
      takip: true,
      faturano: "",
      normal_sevk: true,
      hizli_sevk: false,
      teslimturu: "",
      navlunSatis: 0,
      isSelectedHepsi: "",
      user: "",
      gidenMiktar: 0,
      tedarikci_id: "",
    };
  },
  localService: null,
  beforeRouteEnter(to, from, next) {
    store.dispatch("loadingBeginAct");
    service.getSiparisListe().then((data) => {
      next((vm) => {
        vm.siparisList = data;
        store.dispatch("loadingEndAct");

        // console.log("vm.siparisList",vm.siparisList)
      });
    });
  },
  created() {
    this.localService = new LocalService();
    this.user = this.$store.getters.__getUsername;
    this.isMobile = window.innerWidth;
  },
  computed: {},
  methods: {
    filterSiparisList(event) {
      let result;
      if (event.query.length == 0) result = this.siparisList;
      else {
        result = this.siparisList.filter((x) => {
          return x.siparisno.toLowerCase().startsWith(event.query);
        });
      }
      this.filterSiparisListe = result;
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    siparisDegisim() {
      if (this.siparis) {
        setTimeout(() => {
          service.getSiparisKalemList(this.siparis.siparisno).then((data) => {
            this.sipariskalemlist = data.siparis_kalem_list;
            this.sipariskalem_kasalistesi = data.siparis_kalem_kasa_list;
            const siparis_item = this.siparisList.filter(
              (x) => x.siparisno == this.siparis.siparisno
            );

            this.musteri_id = siparis_item[0].musteriid;
            this.teslimturu = this.sipariskalemlist[0].teslimturu;
            this.navlunSatis = this.sipariskalemlist[0].navlunsatis;
          });
        }, 1300);
      }
    },
    siparisKalemDegisim(event) {
      let sipariskalem = this.sipariskalemlist.filter(
        (x) => x.id == event.value.id
      );
      this.select_urunkartid = sipariskalem[0].urunkartid;
      this.tedarikci_id = sipariskalem[0].tedarikciid;
      this.siparis_miktar = sipariskalem[0].siparis;

      this.kalan = this.siparis_miktar.toFixed(2) - this.giden.toFixed(2);

      this.kasa_secim = true;
      this.kasalistesi = this.sipariskalem_kasalistesi.filter(
        (x) =>
          x.id == this.select_urunkartid &&
          x.kasa_secim == false &&
          sipariskalem[0].tedarikciid == x.tedarikci_id
      );

      if (this.kasalistesi) this.kasa_secim = false;
      this.uretimToplamGuncelle();
      this.is_all_form = false;
    },

    uretimToplamGuncelle() {
      if (this.kasalistesi) {
        this.toplam_uretim_adet = this.kasalistesi.length;
        this.giden = 0;
        this.toplam_uretim_miktar = 0;
        for (let key in this.kasalistesi) {
          this.toplam_uretim_miktar += this.kasalistesi[key].miktar;
          this.giden += this.kasalistesi[key].miktar;
        }
        this.gidenMiktar = this.giden.toFixed(2);
        this.kalan = this.siparis_miktar.toFixed(2) - this.gidenMiktar;
        this.kalan = this.kalan.toFixed(2);
      }
    },
    kasaHepsiSec(event) {
      if (this.kasalistesi) {
        for (let key in this.kasalistesi) {
          this.kasalistesi[key].kasa_secim = event;
        }
      }
      this.is_all_form = true;
      this.is_kasa_form = false;
    },
    kasaCikisYap() {
      if (!this.kasalistesi) {
        alert("Kasa Seçimi Yapınız..");
        return;
      } else {
        if (this.kasalistesi.filter((x) => x.kasa_secim == true).length <= 0) {
          alert("Kasa Seçimi Yapınız..");
          return;
        }

        for (let key in this.kasalistesi) {
          const item = this.kasalistesi[key];

          if (item.kasa_secim) {
            this.sevkKasaYukle(item);
            this.sipariskalem_kasalistesi.filter(
              (x) => x.kasano == item.kasano
            ).kasa_secim = true;
          }
        }
        this.sevk_toplam_miktar = 0;
        this.sevk_toplam_satis = 0;
        for (let key in this.sevk_kasa_listesi) {
          const item = this.sevk_kasa_listesi[key];

          this.sevk_toplam_satis += item.toplam;
          this.sevk_toplam_miktar += item.miktar;
        }

        this.kasalistesi = this.sipariskalem_kasalistesi.filter(
          (x) => x.id == this.select_urunkartid && x.kasa_secim == false
        );
      }
      this.isSelectedHepsi = false;
      this.toplam_uretim_adet = 0;
      this.toplam_uretim_miktar = 0;
      this.sipariskalemlist = this.sipariskalemlist.filter(
        (x) =>
          x.urunkartid !== this.select_urunkartid ||
          x.tedarikciid !== this.tedarikci_id
      );
      this.is_kasa_form = true;
    },
    sevkKasaYukle(item) {
      let kontrol = this.sevk_kasa_listesi.filter(
        (x) => x.kasano == item.kasano
      );
      if (kontrol.length == 0) {
        item.toplam = item.birimfiyat * item.miktar;
        this.sevk_kasa_listesi.push(item);
      }
    },
    sevkiyatIslemi() {
      this.is_sevk_disabled = true;
      this.submitted = true;
      if (this.v$.$invalid) {
        this.$toast.add({
          severity: "error",
          summary: "Zorunlu Alanlar",
          detail: "Zorunlu alanları doldurunuz!",
          life: 3000,
        });
      } else {
        if (!this.cikis_tarihi) {
          alert("Çıkış Tarihini Giriniz..");
          return;
        }
        if (this.faturano == "") {
          alert("Fatura Nosunu Giriniz..");
          return;
        }
        if (this.sevk_kasa_listesi.length <= 0) {
          alert("Kasa Listesi Boş Olamaz!");
          return;
        }
        if (
          this.navlunSatis <= 0 &&
          this.teslimturu != "EXW" &&
          this.teslimturu != "FCA" &&
          this.teslimturu != "FOB"
        ) {
          // this.is_navlun_form = false
          if (confirm("Navlun Girilmemiş, Yinede Sevk Etmek İstermisiniz?")) {
            const sevk_data = {
              siparisno: this.siparis.siparisno,
              musteriid: this.musteri_id,
              faturano: this.faturano,
              takip: this.takip,
              normal_sevk: this.normal_sevk,
              hizli_sevk: this.hizli_sevk,
              hatirlatma_sure: this.normal_sevk ? 5 : 3,
              sevk_tarihi: this.localService.getDateString(this.cikis_tarihi),
              kasalistesi: this.sevk_kasa_listesi,
              sevkEden: this.user,
            };
            this.$store.dispatch('fullscreenLoadingAct', true)

            service.siparisKayitIslem(sevk_data).then((data) => {
              if (data.status) {
                alert("Kayıt İşlemi Yapıldı.");
                socket.siparis.emit(
                  "anaSayfaDegisiklikEvent",
                  data.anaSayfaDegisiklikList
                );
                this.siparis = "";
                this.sipariskalemlist = null;
                this.kasalistesi = null;
                this.sevk_kasa_listesi = [];
                this.toplam_uretim_adet = 0;
                this.toplam_uretim_miktar = 0;
                this.sevk_toplam_satis = 0;
                this.sevk_toplam_miktar = 0;
                this.musteri_id = null;
                this.faturano = "";
                this.takip = false;
                this.normal_sevk = true;
                this.hizli_sevk = false;
                this.cikis_tarihi = new Date();
                this.giden = 0;
                this.siparis_miktar = 0;
                this.kalan = 0;
                this.$store.dispatch('fullscreenLoadingAct', true)



              }
            });
          }
        } else {
          const sevk_data = {
            siparisno: this.siparis.siparisno,
            musteriid: this.musteri_id,
            faturano: this.faturano,
            takip: this.takip,
            normal_sevk: this.normal_sevk,
            hizli_sevk: this.hizli_sevk,
            hatirlatma_sure: this.normal_sevk ? 5 : 3,
            sevk_tarihi: this.localService.getDateString(this.cikis_tarihi),
            kasalistesi: this.sevk_kasa_listesi,
            sevkEden: this.user,
          };
          this.$store.dispatch('fullscreenLoadingAct', true)

          service.siparisKayitIslem(sevk_data).then((data) => {
            if (data.status) {
              alert("Kayıt İşlemi Yapıldı.");
              socket.siparis.emit(
                "anaSayfaDegisiklikEvent",
                data.anaSayfaDegisiklikList
              );
              this.siparis = "";
              this.sipariskalemlist = null;
              this.kasalistesi = null;
              this.sevk_kasa_listesi = [];
              this.toplam_uretim_adet = 0;
              this.toplam_uretim_miktar = 0;
              this.sevk_toplam_satis = 0;
              this.sevk_toplam_miktar = 0;
              this.musteri_id = null;
              this.faturano = "";
              this.takip = false;
              this.normal_sevk = true;
              this.hizli_sevk = false;
              this.cikis_tarihi = new Date();
              this.giden = 0;
              this.siparis_miktar = 0;
              this.kalan = 0;
              this.$store.dispatch('fullscreenLoadingAct', false)


            }
          });
        }
      }
    },
  },
  normalSevkIslem(event) {
    if (event) this.hizli_sevk = false;
  },
  hizliSevkIslem(event) {
    if (event) this.normal_sevk = false;
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 10px;
}

.btn_islem {
  margin-top: 75px;
}
</style>

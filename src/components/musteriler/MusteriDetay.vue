<template>
    <br/>
    <div class="columns">
      <div class="column is-9">
        <div class="columns">
          <div class="column is-12">
            <span class="p-float-label">
              <InputText
                id="musteriAdi"
                type="text"
                v-model="musteri_model.musteri_adi"
                :class="{
                  'p-invalid':
                    v$.musteri_model.musteri_adi.$invalid && submitted,
                }"
              />
              <label for="musteriAdi">Müşteri Adı</label>
            </span>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <span class="p-float-label">
              <Textarea
                id="firmaAdi"
                type="text"
                v-model="musteri_model.unvan"
                rows="5"
                cols="30"
                :class="{
                  'p-invalid': v$.musteri_model.unvan.$invalid && submitted,
                }"
              />
              <label for="firmaAdi">Firma Adı</label>
            </span>
          </div>
          <div class="column">
            <div class="column">
              <span class="p-float-label">
                <InputText
                  id="mail"
                  type="text"
                  v-model="musteri_model.mail_adresi"
                  :class="{
                    'p-invalid':
                      v$.musteri_model.mail_adresi.$invalid && submitted,
                  }"
                />
                <label for="mail">MAİL</label>
              </span>
              <br />
              <span class="p-float-label">
                <InputText id="sira" type="text" v-model="musteri_model.sira" />
                <label for="sira">SIRA</label>
              </span>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <span class="p-float-label">
              <Textarea
                id="sira"
                v-model="musteri_model.adres"
                rows="5"
                cols="100"
                :class="{
                  'p-invalid': v$.musteri_model.adres.$invalid && submitted,
                }"
              />
              <label for="sira">ADRES</label>
            </span>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3">
            <span class="p-float-label">
              <InputText
                id="marketing"
                type="text"
                v-model="musteri_model.marketing"
                :class="{
                  'p-invalid': v$.musteri_model.marketing.$invalid && submitted,
                }"
              />
              <label for="marketing">Pazarlama</label>
            </span>
          </div>
          <div class="column is-3" style="margin-left:100px;">
            <span class="p-float-label">
              <AutoComplete
                id="ulke"
                v-model="select_ulke"
                :suggestions="filter_ulke_list"
                @complete="ulke_complete_event($event)"
                field="ulke_adi"
                :class="{ 'p-invalid': v$.select_ulke.$invalid && submitted }"
              />
              <label for="ulke">Ülke</label>
            </span>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3">
            <span class="p-float-label">
              <InputText
                id="telefon"
                type="text"
                v-model="musteri_model.telefon"
                :class="{
                  'p-invalid': v$.musteri_model.telefon.$invalid && submitted,
                }"
              />
              <label for="telefon">TELEFON</label>
            </span>
          </div>
          <div class="column is-3" style="margin-left:100px;">
            <span class="p-float-label">
              <AutoComplete
                id="temsilci"
                v-model="select_temsilci"
                :suggestions="filter_temsilci_list"
                @complete="temsilci_complete_event($event)"
                field="kullanici_adi"
                :class="{
                  'p-invalid': v$.select_temsilci.$invalid && submitted,
                }"
              />
              <label for="temsilci">Temsilci</label>
            </span>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3" >
            <span class="p-float-label">
              <AutoComplete
                id="satisci"
                v-model="select_satisci"
                :suggestions="filter_satisci_list"
                @complete="satisci_complete_event($event)"
                @item-select="satisci_selected($event)"
                field="kullanici_adi"
                :class="{
                  'p-invalid': v$.select_satisci.$invalid && submitted,
                }"
              />
              <label for="satisci">Satışçı</label>
            </span>
          </div>
          <div class="column is-3" style="margin-left:100px;">
            <span class="p-float-label">
              <Dropdown
                id="oncelik"
                style="width: 100px"
                v-model="selectOncelik"
                :options="oncelikList"
                optionLabel="name"
                :class="{
                  'p-invalid': v$.selectOncelik.$invalid && submitted,
                }"
              />
              <label for="oncelik">Öncelik</label>
            </span>
          </div>
        </div>
        <div class="columns">
          <div class="column is-6">
            <span class="p-float-label">
              <Textarea
                id="notlar"
                v-model="musteri_model.notlar"
                rows="5"
                cols="30"
              />
              <label for="notlar">Notlar</label>
            </span>
          </div>
          <div class="column is-4">
            <div class="columns">
              <div class="column is-2" style="margin-right:70px;">
                <Checkbox v-model="musteri_model.devir" :binary="true" /> Devir
              </div>
              <div class="column is-2" style="margin-right:70px;">
                <Checkbox v-model="musteri_model.ozel" :binary="true" />
                Özel
              </div>
              <div class="column is-2" style="margin-right:70px;">
                <Checkbox
                  id="takip"
                  v-model="musteri_model.takip"
                  @change="isFollowChange"
                  :binary="true"
                />
                <label for="takip">Takip</label>
              </div>
              <div class="column is-2" style="margin-right:70px;">
                <h3>Son Kullanıcı</h3>
                <InputSwitch
                  id="sonkullanici"
                  v-model="musteri_model.sonkullanici"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-3" style="margin-left: 40px">
        <DataTable
          :value="siparis_ozet_list"
          :scrollable="true"
          scrollHeight="390px"
          selectionMode="single"
          dataKey="Yil"
          v-model:selection="selectYil"
          @row-select="YilUrunSecim($event)"
        >
          <Column
            field="Yil"
            header="Yıl"
            headerStyle="width:3%;"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.Yil }}
            </template>
          </Column>
          <Column
            field="Total"
            header="DDP"
            headerStyle="width:3%;"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.Total) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <div class="columns is-multiline is-centered">
      <div class="column is-2">
        <Button
          :disabled="is_kaydet"
          @click="musteri_kaydet_click"
          expanded
          type="is-success"
          >KAYDET
        </Button>
      </div>
      <div class="column is-1">
        <Button
          :disabled="is_sil"
          @click="musteri_sil_click"
          expanded
          class="p-button-danger"
          >SİL</Button
        >
      </div>
    </div>
    <Dialog
      v-model:visible="is_form"
      :modal="true"
      header="Musteri Sipariş Detay"
      maximizable
    >

              <MusteriSiparisDetay />
    </Dialog>
</template>
<script>
import { mapGetters } from "vuex";
import service from "@/service/MusteriIslemService";
import socket from "@/service/SocketService";
import MusteriSiparisDetay from "./MusteriSiparisDetay";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      select_ulke: { required },
      select_temsilci: { required },
      select_satisci: { required },
      selectOncelik: { required },

      musteri_model: {
        musteri_adi: { required },
        unvan: { required },
        mail_adresi: { required },
        sira: { required },
        adres: { required },
        marketing: { required },
        telefon: { required },
      },
    };
  },
  data() {
    return {
      submitted: false,
      select_ulke: null,
      is_form: false,
      filter_ulke_list: null,
      select_temsilci: null,
      select_satisci: null,
      filter_temsilci_list: null,
      filter_satisci_list: null,
      is_kaydet: false,
      selectYil: null,
      siparis_ozet_list: null,
      selectOncelik: null,
      is_sil: true,
      oncelikList: [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" },
      ],
    };
  },
  components: {
    MusteriSiparisDetay,
  },
  created() {
    if (!this.is_yeni) {
      this.select_ulke = this.musteri_ulke_list.find(
        (x) => x.id == this.musteri_model.ulke_id
      );
      this.select_temsilci = this.musteri_temsilci_list.find(
        (x) => x.id == this.musteri_model.musteri_temsilci_id
      );
      this.select_satisci = this.musteri_temsilci_list.find(
        (x) => x.id == this.musteri_model.satisci
      ).kullanici_adi;
      this.siparis_ozet_list = this.siparis_ozet;
      this.selectOncelik = this.oncelikList.find(
        (x) => x.name == this.musteri_model.selectOncelik
      );
      this.is_sil = false;
    }
  },
  computed: {
    ...mapGetters([
      "musteri_model",
      "siparis_ozet",
      "siparis_ozet_ayrinti",
      "musteri_ulke_list",
      "musteri_temsilci_list",
    ]),
  },
  props: ["is_yeni"],
  methods: {
    isFollowChange() {
      service
        .setCustomerChangeFollow(
          this.musteri_model.musteri_adi,
          this.musteri_model.takip
        )
        .then((data) => {
          if (data) {
            this.$toast.add({
              severity: "success",
              summary: "Takip",
              detail: "Takip Başarıyla Değişti",
              life: 3000,
            });
            this.emitter.emit("followingStatus", false);
          } else {
            this.$toast.add({
              severity: "warning",
              summary: "Takip",
              detail: "Takip Değiştirme Hatalı",
              life: 3000,
            });
          }
        });
    },
    YilUrunSecim(event) {
      if (event.data) {
        this.selectYil = event.data;
        service
          .getMusteriSiparisDetay(event.data.Yil, event.data.id)
          .then((data) => {
            this.$store.dispatch(
              "siparis_ozet_ayrinti_act",
              data.siparis_detay
            );

            this.is_form = true;
          });
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    ulke_complete_event(event) {
      this.filter_ulke_list = this.musteri_ulke_list.filter((x) => {
        return (
          x.ulke_adi
            .toString()
            .toLowerCase()
            .indexOf(event.query.toString().toLowerCase()) >= 0
        );
      });
    },
    temsilci_complete_event(event) {
      this.filter_temsilci_list = this.musteri_temsilci_list.filter((x) => {
        return (
          x.kullanici_adi
            .toString()
            .toLowerCase()
            .indexOf(event.query.toString().toLowerCase()) >= 0
        );
      });
    },
    satisci_complete_event(event) {
      this.filter_satisci_list = this.musteri_temsilci_list.filter((x) => {
        return (
          x.kullanici_adi
            .toString()
            .toLowerCase()
            .indexOf(event.query.toString().toLowerCase()) >= 0
        );
      });
      
    },
    satisci_selected(event) {
       this.musteri_model.satisci = event.value.id
    },
    musteri_kaydet_click() {
      this.submitted = true;
      if (this.v$.$invalid) {
        this.$toast.add({
          severity: "error",
          summary: "Zorunlu Alanlar",
          detail: "Zorunlu alanları doldurunuz!",
          life: 3000,
        });
      } else {
        if (this.musteri_model.musteri_adi.length <= 0) {
          this.$toast.add({
            severity: "error",
            summary: "Müşteri Kaydet",
            detail: "Müşteri Adı Giriniz..",
            life: 3000,
          });
          return;
        }
        if (this.musteri_model.marketing.length <= 0) {
          this.$toast.add({
            severity: "error",
            summary: "Müşteri Kaydet",
            detail: "Marketing Giriniz..",
            life: 3000,
          });
          return;
        }
        if (this.select_ulke == null) {
          this.$toast.add({
            severity: "error",
            summary: "Müşteri Kaydet",
            detail: "Ülke Giriniz..",
            life: 3000,
          });
          return;
        }
        if (this.select_temsilci == null) {
          this.$toast.add({
            severity: "error",
            summary: "Müşteri Kaydet",
            detail: "Temsilci Seçiniz..",
            life: 3000,
          });
          return;
        }

        this.musteri_model.musteri_temsilci_id = this.select_temsilci.id;

        this.musteri_model.ulke_id = this.select_ulke.id;
        let kullaniciadi = this.$store.getters.__getUsername
        this.musteri_model.kullanici_id = this.musteri_temsilci_list.find(
          (x) => x.kullanici_adi === kullaniciadi
        ).id;
        this.musteri_model.selectOncelik = this.selectOncelik.name;
        if (this.is_yeni) this.musteri_kayit_islemi();
        else this.musteri_gunceleme_islemi();
      }
    },
    musteri_gunceleme_islemi() {
      if (this.musteri_model.id == null) {
        alert("kayıt değiştirilemez.");
        return;
      }

      this.is_kaydet = true;
      service.musteriGuncelle(this.musteri_model).then((response) => {
        if (response.status) {
          this.$toast.add({
            severity: "success",
            summary: "Müşteri Güncelleme",
            detail: "Müşteri Başarıyla Güncellendi",
            life: 3000,
          });

          socket.siparis.emit("musteri_kayitdegisim_event");
          this.emitter.emit('customer_form_close')

        } else {
          this.$toast.add({
            severity: "error",
            summary: "Müşteri Güncelleme",
            detail: "Müşteri Başarısız",
            life: 3000,
          });

          this.is_kaydet = false;
        }
      });
    },
    musteri_kayit_islemi() {
      const data = { ...this.musteri_model };
      this.is_kaydet = true;
      service.musteriKaydet(data).then((response) => {
        if (response.status) {
          alert("Musteri kaydı yapıldı.");
          socket.siparis.emit("musteri_kayitdegisim_event");
          this.emitter.emit('customer_form_close')
        } else {
          alert("Müşteri kaydı yapılamadı kontrol ediniz.");
          this.is_kaydet = false;
        }
      });
    },
    musteri_sil_click() {
      this.is_sil = true;
      service.musteriSilme(this.musteri_model.id).then((response) => {
        if (response.status) {
          alert("Müşteri Kaydı Silindi.");
          socket.siparis.emit("musteri_kayitdegisim_event");
          this.emitter.emit('customer_form_close')
        } else {
          alert("Müşteri kaydı silinemedi kontrol ediniz.");
          this.is_sil = false;
        }
      });
    },
  },
};
</script>

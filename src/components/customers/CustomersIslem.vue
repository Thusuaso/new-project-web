<!-- eslint-disable prettier/prettier -->
<template>
  <section>
    <br/>
    <div class="columns">
      <div class="column is-12">
        <div class="columns is-multiline" style="margin-left:22px;">
          <div class="column is-2" style="background-color: white">
            
            <span class="p-float-label" v-if="yeniSiparis">
              <InputText id="musteriAdi"  v-model="musteri.musteriadi" :disabled="true" />
              <label for="musteriAdi">Müşteri Adı</label>
            </span>
            <span class="p-float-label" v-else>
              <InputText id="musteriAdi" v-model="musteri.musteriadi" :disabled="true" />
              <label for="musteriAdi">Müşteri Adı</label>
            </span>
            
          </div>

          <div class="column is-2">
            
            <span class="p-float-label">
              <Calendar id="kayitTarihi" v-model="date" :disabled="is_form" />
              <label for="kayitTarihi">Kayıt Tarihi</label>
            </span>
          </div>
        </div>

        <div class="columns">
          <div class="column is-6">
            <div class="column is-12 card">
              <div class="column is-12">
                <div class="column is-10">
                  <span class="p-float-label">
                    <InputText
                      id="baslik"
                      v-model="musteri.baslik"
                      :disabled="is_form"
                    />
                    <label for="baslik">Başlık</label>
                  </span>
                </div>
                <div class="column is-12">
                  <span class="p-float-label">
                    <Textarea id="aciklama" v-model="musteri.aciklama" rows="10" cols="80" />
                    <label for="aciklama">Açıklama</label>
                  </span>
                  
                </div>
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="column is-12 card">
              <div class="column is-12">
                <div class="column is-5">
                  
                  <span class="p-float-label">
                    <Calendar id="hatirlatmaTarihi" v-model="date_hatirlatma" :disabled="is_form" />
                    <label for="hatirlatmaTarihi">Hatırlatma Tarihi</label>
                  </span>
                </div>
                <div class="column is-12">
                  <span class="p-float-label">
                    <Textarea id="hatirlatmaNotu" v-model="musteri.hatirlatma_notu" rows="10" cols="80" />
                    <label for="hatirlatmaNotu">Hatırlatma Notu</label>
                  </span>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="columns is-multiline" style="margin-left: 530px">
          <div class="column is-12">
            <div class="columns is- multiline">
              <div class="column is-2">
                <Button
                  class="p-button-secondary"
                  @click="kaydet_click"
                  :disabled="is_kaydet"
                >
                  Kaydet
                </Button>
              </div>
              <div class="column is-2">
                <Button
                  :disabled="is_degistir"
                  class="p-button-warning"
                  @click="degistir_click"
                >
                  Guncelle
                </Button>
              </div>
              <div class="column is-2">
                <Button :disabled="is_sil" class="p-button-danger" @click="sil_click">
                  Sil
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import LocalService from "@/service/LocalService";
import socket from "@/service/SocketService";
import service from "@/service/Customers";
import fileService from "@/service/FileService";

export default {
  data() {
    return {
      is_form: false,
      date: new Date(),
      date_hatirlatma: new Date(),
      is_kaydet: true,
      is_sil: true,
      is_degistir: true,
      select_list: null,
      is_loading: false,
      urunkayit: false,
      satisciLink: "",
      yenimusteri: [],
      dis_satisciDosyaAc: "",
    };
  },
  props: {
    select_satisci: {
      type: String,
      required: false,
      default: "",
    },
    yeniSiparis: {
      type: Boolean,
      default: true,
    },
  },
  components: {},
  localService: null,

  created() {
    this.localService = new LocalService();
    this.urunkayit = this.yeniSiparis;
    this.yenimusteri = "";

    const users = this.$store.getters.__getUsername;

    if (!this.urunkayit) {
      this.is_kaydet = true;
      this.is_degistir = false;
      this.is_sil = false;

      if (this.musteri_list[0].satisci_cloud) {
        this.dis_satisciDosyaAc = false;
        this.satisciLink = `https://file-service.mekmar.com/file/download/satisci/satisciDosya/${this.musteri_list[0].id}/${this.musteri_list[0].satisci_cloud_dosya}`;
      }
      this.tahsilat_secim(this.musteri_list[0]);
    }

    if (this.urunkayit) {
      this.is_kaydet = false;
      this.is_degistir = true;
      this.is_sil = true;
      this.dis_satisciDosyaAc = true;
      service.getSatisciModel().then((data) => {
        this.yenimusteri = data;
        this.yenimusteri.musteriadi = this.select_satisci.musteriadi;
        this.yenimusteri.temsilci = users;
        this.date = this.yenimusteri.tarih_giris;
        this.date_hatirlatma = this.yenimusteri.hatirlatmaTarihi;

        this.tahsilat_secim(this.yenimusteri);
      });
    }
  },
  mounted() {

  },
  computed: {
    ...mapGetters(["musteri_list", "musteri"]),
  },

  methods: {
    satisciDosyaGonder(event) {
      fileService.satisciDosyaGonder(event, this.musteri.id).then((data) => {
        if (data.Status) {
          this.musteri.satisci_cloud = true;
          this.musteri.satisci_cloud_dosya = data.dosyaAdi;

          service.setSatisciDosyaKayit(this.musteri).then((veri) => {
            if (veri.Status) {
              this.dis_satisciDosyaAc = false;

              this.satisciLink = `https://file-service.mekmar.com/file/download/satisci/satisciDosya/${this.musteri.id}/${this.musteri.satisci_cloud_dosya}`;
            }
          });
        }
      });
    },
    tahsilat_secim(event) {
      this.date = this.localService.getStringDate(event.tarih_giris);
      this.date_hatirlatma = this.localService.getStringDate(
        event.hatirlatmaTarihi
      );

      this.$store.dispatch("satisciKayitSecimAct", event);
    },
    default_data() {
      service
        .getSatisciMusteriListe(this.musteri.musteriadi, this.musteri.id)
        .then((data) => {
          this.$store.dispatch("satisciKayitLoadAct", data);
          this.is_loading = false;
          this.is_form = false;
          this.date = new Date();
          this.date_hatirlatma = new Date();

          this.yenimusteri = [];
        });
    },
    kaydet_click() {
      if (!this.date) {
        alert("Tarih Seçiniz..");
        return;
      }
      this.is_kaydet = true;
      this.emitter.emit("hatirlatmaKaydet", false);
      this.is_loading = true;
      const data = this.musteri;

      data.tarih_giris = this.localService.getDateString(this.date);
      data.hatirlatmaTarihi = this.localService.getDateString(
        this.date_hatirlatma
      );

      const users = this.$store.getters.__getUserId;
      data.temsilci = users;

      service.satisciIcerikKaydetme(data).then((res) => {
        if (res.status) {
          this.is_kaydet = false;
          this.is_degistir = true;
          this.is_sil = true;
          this.$toast.add({
            severity: "success",
            summary: "Kayıt Bildirimi",
            detail: "Başarıyla Kaydedildi",
            life: 3000,
          });
          this.$store.dispatch("customers_yukle_act", res.result);
          this.$store.dispatch("customers_yukle_all_act", res.result);
          this.$store.dispatch("musteri_ayrinti_yukle_act", res.result2);
          this.emitter.emit("isSearch", true);
          socket.siparis.emit('bildirimler_update_event')
          
        }
      });
    },
    degistir_click() {
      if (!this.date) {
        alert("Tarih Seçiniz..");
        return;
      }
      const data = this.musteri;
      this.is_degistir = false;
      this.emitter.emit("hatirlatmaKaydet", false);
      data.tarih_giris = this.localService.getDateString(this.date);
      data.hatirlatmaTarihi = this.localService.getDateString(
        this.date_hatirlatma
      );
      const users = this.$store.getters.__getUsername;
      data.temsilci = users;
      service.satisciIcerikGuncelleme(data).then((res) => {
        if (res) {
          socket.siparis.emit("numunetahsilat_kayitdegisim_event", data.id);
          this.default_data();
          this.is_kaydet = false;
          this.is_degistir = true;
          this.is_sil = true;
          this.$toast.add({
            severity: "success",
            summary: "Kayıt Bildirimi",
            detail: "Başarıyla Değiştirildi",
            life: 3000,
          });
          this.$store.dispatch("customers_yukle_act", res.result);
          this.$store.dispatch("musteri_ayrinti_yukle_act", res.result2);
          this.$store.dispatch("customers_yukle_all_act", res.result);
          this.emitter.emit("isSearch", true);
          socket.siparis.emit('bildirimler_update_event')

        }
      });
    },
    sil_click() {
      if (!this.date) {
        alert("Tarih Seçiniz..");
        return;
      }
      this.is_sil = true;
      this.emitter.emit("hatirlatmaKaydet", false);
      const id = this.musteri.id;
      service.satisciIcerikSilme(id).then((res) => {
        if (res) {
          socket.siparis.emit(
            "numunetahsilat_kayitdegisim_event",
            this.musteri.id
          );
          this.default_data();
          this.is_kaydet = false;
          this.is_degistir = true;
          this.is_sil = true;
          this.$toast.add({
            severity: "success",
            summary: "Kayıt Bildirimi",
            detail: "Başarıyla Silindi",
            life: 3000,
          });
          this.$store.dispatch("customers_yukle_act", res.result);
          this.$store.dispatch("musteri_ayrinti_yukle_act", res.result2);
          this.$store.dispatch("customers_yukle_all_act", res.result);
          this.emitter.emit("isSearch", true);
          socket.siparis.emit('bildirimler_update_event')

        }
      });
    },
  },
};
</script>
<style scoped>
.input-style {
  text-align: center;
}
</style>

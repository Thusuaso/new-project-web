<template>
  <div class="columns">
    <div class="column">
      <custom-file-input
        multiple
        v-model="files"
        :state="Boolean(files)"
        baslik="Upload2"
        @sunucuDosyaYolla="faturaDosyaGonder($event)"
      />
    </div>

    <div class="column">
      <a :href="evrakLink" target="_blank">
        <Button
          :disabled="dis_download"
          iconPos="left"
          icon="fas fa-download"
          class="p-button-success"
          v-tooltip="'Aç'"
          label="Aç"
        />
      </a>
    </div>
  </div>
</template>
<script>
import service from "../../service/OperasyonService";
import CustomInputFile from "../../components/shared/CustomInputFile";
import { mapGetters } from "vuex";
import fileService from "../../service/FileService";
export default {
  components: {
    customFileInput: CustomInputFile,
  },

  mounted() {
    this.yeniKayitBaslangicIslemler();
  },
  data() {
    return {
      evrakLink: "",
      files: "",
      dis_download: true,
      evrak: null,
      id: null,
      siparisno: null,
    };
  },
  localService: null,

  computed: {
    ...mapGetters(["SiparisEvrakList"]),
  },
  created() {
    if (this.SiparisEvrakList.Listem != null) {
      this.evrakLink = `${this.SiparisEvrakList.Listem.Draft}`;
      this.dis_download = false;
    } else {
      this.dis_download = true;
    }
    console.log("SiparisEvrakList", this.SiparisEvrakList)

  },
  methods: {
    faturaDosyaGonder(event) {
      if (event.size > 1000000) {
        alert("Evrak Boyutunu Kontrol Ediniz.");
      } else {
        fileService
          .faturaDosyaGonder(
            event,
            this.SiparisEvrakList.ID,
            this.SiparisEvrakList.siparisno
          )
          .then((data) => {
            console.log("faturaDosyaGonder ", data);
          });
        this.KayitIslemi();
      }
    },

    KayitIslemi() {
      this.evrak.id = this.SiparisEvrakList.ID;
      this.evrak.siparisno = this.SiparisEvrakList.siparisno; //this.evrak verileri koydum
      this.evrak.kullaniciAdi = this.$store.getters.__getUsername;

      this.yeniKayit();
    },
    yeniKayitBaslangicIslemler() {
      service.getEvrakFaturaModel().then((data) => {
        this.evrak = data.evrak;
        this.id = null;
        this.siparisno = null;
        this.kullaniciAdi = this.$store.getters.__getUsername;
      });
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
          this.evrak.kullaniciAdi = this.$store.getters.__getUsername;
          this.evrakLink = `https://file-service.mekmar.com/file/download/${this.SiparisEvrakList.ID}/${this.SiparisEvrakList.siparisno}`;
          this.dis_download = false;
          alert("Başarılı şekilde yüklendi.");
          return;
        } else {
          alert("Ops! Lütfen Yeniden Deneyiniz.");
        }
      });
    },
  },
};
</script>
<style scoped>
.card {
  font-size: 20px;
}
.columns {
  margin-left: auto;
  margin-right: auto;
  margin-top: 195px;
  width: 70%;
}

/* Clear floats after the columns */
</style>

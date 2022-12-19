<template>
  <section>
    <div class="columns">
      <div class="column">
        <custom-file-input
          baslik="  Dosya Yükle  "
          @sunucuDosyaYolla="faturaDosyaGonder($event)"
        />
        <div class="column">
          <a :href="tedarikciLink" target="_self">
            <Button
              label="Download"
              class="p-button-success"
              iconPos="left"
              icon="fas fa-download"
              :disabled="dis_download"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import service from "../../service/OperasyonService";
import { mapGetters } from "vuex";
import fileService from "../../service/FileService";
import CustomInputFile from "../../components/shared/CustomInputFile";
export default {
  components: {
    customFileInput: CustomInputFile,
  },
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
    service
      .getEvrakTedarikciFaturaList(this.SiparisEvrakList.siparisno)
      .then((data) => {
        this.tedarikciList = data;
        this.TedarikciTur = this.tedarikciList.find((x) => x.ID == this.id);
      });
    this.tedarikciLink = this.SiparisEvrakList.Listem.Draft


  },
  data() {
    return {
      tedarikciList: [],
      tedarikci: "",
      tedarikci_adi: "",
      id: null,
      filterTedarikciTurList: null,
      TedarikciTur: null,
      veri: [],
      faturaNo: "",
      tedarikciLink: "",
      dis_DosyaAc: true,
    };
  },

  mounted() {},
  methods: {
    faturaDosyaGonder(event) {
      if (event.size > 1000000) {
        alert("Evrak Boyutunu Kontrol Ediniz.");
      } else {
        const veri = {
          evrak: this.SiparisEvrakList.siparisno + ".pdf",
          siparisno: this.SiparisEvrakList.siparisno,
          kullaniciAdi: this.$store.getters.getUser,
        };

        fileService
          .faturaDosyaGonder(
            event,
            40,
            this.SiparisEvrakList.siparisno + ".pdf"
          )
          .then((data) => {
            console.log(data);
            service.setOzelIscilikFaturaKayit(veri).then((veri) => {
              if (veri.Status) {
                alert("Kayıt İşlemi Yapıldı.");
                this.dis_numuneDosyaAc = false;
                this.tedarikciLink = `https://file-service.mekmar.com/file/tedarikci/download/30/${
                  this.SiparisEvrakList.siparisno
                }/${this.TedarikciTur.tedarikci + ".pdf"}`;

                this.dis_DosyaAc = false;
              }
            });
          });
      }
    },
  },
};
</script>
<style scoped>
.card {
  font-size: 20px;
}
.stilim {
  margin-top: 10px;
  margin-bottom: 10px;

  margin-left: 20px;
  margin-right: 20px;
}
</style>

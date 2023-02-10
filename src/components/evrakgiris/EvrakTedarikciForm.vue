<template>
  <br />
  <br />
  <br />
  <div class="columns">
    <div class="column">
      <AutoComplete
        :dropdown="true"
        size="20%;"
        v-model="TedarikciTur"
        :suggestions="filterTedarikciTurList"
        @complete="aramaTedarikciTur($event)"
        field="tedarikci"
        @item-select="siparisTurDegisim"
      >
        <template #items="slotProps">
          <div class="p-clearfix p-autocomplete-brand-item">
            <div>
              {{ slotProps.tedarikci }}
            </div>
          </div>
        </template>
      </AutoComplete>
    </div>
    <div class="column">
      <custom-file-input
        baslik="  Dosya Yükle  "
        @sunucuDosyaYolla="faturaDosyaGonder($event)"
      />
    </div>
    <div class="column">
      <span class="p-float-label">
        <InputText id="faturaNo" v-model="faturaNo" />
        <label for="faturaNo">Fatura No</label>
      </span>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <a :href="tedarikci_link" ref="download" target="_blank">

      </a>
      <Button type="button" icon="pi pi-download" @click="$refs.download.click()" :disabled="tedarikci_link_form"/>
    </div>
  </div>
  <div class="columns">
    <div class="column is-12">
      <Button
        @click="urunKaydet"
        :disabled="urun_kaydet_form"
        style="width: 100%"
        class="p-button-success"
        label="KAYDET"
      />
    </div>
    <!-- <div class="column">
        <a :href="tedarikciLink" target="_self">
          <Button
            label="Download"
            style="width: 120px"
            class="p-button-success"
            icon="fas fa-download"
            :disabled="dis_DosyaAc"
          />
        </a>
      </div> -->
    <!-- <div class="column">
        <Button v-model="faturaNo" style="width: 220px" />
      </div> -->
  </div>
</template>
<script>
import service from "../../service/OperasyonService";
import { mapGetters } from "vuex";
// import store from "@/store";
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
  },
  data() {
    return {
      tedarikci_link_form:true,
      tedarikci_link:"",
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
      urun_kaydet_form: false,
      urun_kaydet_aciklama:'Tedarikçi Mekmer veya Mekmoz ise kaydetmeye gerek yoktur. Lütfen sadece evrak yükleyiniz.'
    };
  },

  mounted() {},
  methods: {

    faturaDosyaGonder(event) {
      if (event.size > 1000000) {
        alert("Evrak Boyutunu Kontrol Ediniz.");
      } else {
        const veri = {
          FaturaNo: this.faturaNo,
          tedarikci_id: this.TedarikciTur.ID,
          tedarikci: this.TedarikciTur.tedarikci,
          evrak: this.TedarikciTur.tedarikci + ".pdf",
          siparisno: this.SiparisEvrakList.siparisno,
          kullaniciAdi: this.$store.getters.__getUsername,
        };

        fileService
          .TedarikciDosyaGonder(
            event,
            this.SiparisEvrakList.siparisno,
            this.TedarikciTur.tedarikci + ".pdf"
          )
          .then((data) => {
            console.log(data);
            service.setTedarikciFaturaKayit(veri).then((veri) => {
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
    urunKaydet() {
      const veri = {
        FaturaNo: this.faturaNo,
        tedarikci_id: this.TedarikciTur.ID,
        tedarikci: this.TedarikciTur.tedarikci,
        evrak: this.TedarikciTur.tedarikci + ".pdf",
        siparisno: this.SiparisEvrakList.siparisno,
        kullaniciAdi: this.$store.getters.__getUsername,
      };

      service.setTedarikciEvrakFaturaKayit(veri).then((veri) => {
        if (veri.Status) {
          alert("Kayıt İşlemi Yapıldı.");
        } else {
          alert("Ops! Lütfen Yeniden Deneyiniz.");
        }
      });
    },

    siparisTurDegisim() {
      this.id = this.TedarikciTur.ID;
      if (this.TedarikciTur.ID == 1 || this.TedarikciTur.ID == 123) {
        this.urun_kaydet_form = true
      } else {
        this.urun_kaydet_form = false
      }
      this.tedarikci_link = `https://file-service.mekmar.com/file/tedarikci/download/30/${this.SiparisEvrakList.siparisno
        }/${this.TedarikciTur.tedarikci + ".pdf"}`
      this.tedarikci_link_form = false
    },
    aramaTedarikciTur(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.tedarikciList];
        } else {
          result = this.tedarikciList.filter((ted) => {
            return ted.tedarikci
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterTedarikciTurList = result;
      }, 250);
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

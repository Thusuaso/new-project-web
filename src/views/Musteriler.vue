<template>
      <MusteriListesi></MusteriListesi>
    
</template>
<script>
import { mapGetters } from "vuex";
import service from "../service/MusteriIslemService";
import MusteriListesi from "../components/musteriler/MusteriListesi";
import socket from "../service/SocketService";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    MusteriListesi,


  },
  computed: {
    ...mapGetters(["musteri_listesi", "servis_adres"]),
  },
  created() {
    const users = this.$store.getters.__getUsername;
    this.musteri_tablo_yukle(users);
    socket.siparis.on("musteri_kayitdegisim_emit", () => {
      //yapılacak işlemler
      this.musteri_tablo_yukle(users);
    });
  },
  data() {
    return {
      show_all_customers: false,
      filters: {
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        unvan: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        marketing: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ulkeadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        temsilci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        satisci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      is_musteri_form: false,
      musteri_form_baslik: "",
      select_musteri: null,
      is_musteri_yeni: false,
      is_detay_ac: true,
      is_excel: false,
      musteri_data: null,
    };
  },

  methods: {
    is_change_all_customer(event) {
      if (event) {
        service.getMusteriListesi().then((data) => {
          this.$store.dispatch("musteri_listesi_yukle_act", data);
        });
      } else {
        const users = this.$store.getters.__getUsername;
        this.musteri_tablo_yukle(users);
      }
    },
    musteri_tablo_yukle(users) {
      this.$store.dispatch("datatableLoadingBeginAct");
      service.getMusteriListesi().then((data) => {
        this.musteri_data = data;
        if (users == "Semih" || users == "Gizem" || users == "Fatih") {
          this.$store.dispatch("musteri_listesi_yukle_act", data);
        } else {
          const result = data.filter((x) => x.temsilci == users);
          this.$store.dispatch("musteri_listesi_yukle_act", result);
        }

        this.$store.dispatch("datatableLoadingEndAct");
      });
    },
    yeni_musteri_click() {
      service.getYeniMusteriModel().then((data) => {
        this.$store.dispatch("yeni_musteri_model_yukle_act", data);
        this.is_musteri_yeni = true;
        this.musteri_form_baslik = "Yeni Müşteri Girişi";
        this.is_musteri_form = true;
      });
    },
    detay_ac_click() {
      service.getMusteriDetay(this.select_musteri.id).then((data) => {
        this.$store.dispatch("musteri_detay_yukle_act", data);
        this.is_musteri_yeni = false;
        this.musteri_form_baslik = this.select_musteri.musteriadi;
        this.is_musteri_form = true;
      });
    },
    musteri_secim_event(event) {
      this.select_musteri = { ...event.data };
      this.is_detay_ac = false;
      this.detay_ac_click();
    },
    excel_cikti_al_click() {
      const data = this.musteri_data;
      this.$store.dispatch('datatableLoadingBeginAct')
      service.getMusteriExcelListesi(data).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres +
            "musteriler/dosya_islemleri/excelMusterilerDetayListesi";

          link.setAttribute("download", "musteri_listesi.xlsx");
          document.body.appendChild(link);
          link.click();
          this.is_excel = false;
          this.$store.dispatch('datatableLoadingEndAct')

        }
      });
    },
  },
  mounted() {
    this.emitter.on("followingStatus", (data) => {
      this.is_musteri_form = data;
    });
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 11px;
}

@media screen and (max-width: 576px) {
  #isMobileButton {
    clear: both;
    margin-left: -200px;
  }
}
</style>

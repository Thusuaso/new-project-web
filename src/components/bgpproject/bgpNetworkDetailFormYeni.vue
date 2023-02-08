<template>
  <br />
  <div class="grid">
    <div class="col">
      <span class="p-float-label">
        <AutoComplete id="firmaAdi" v-model="datas.firmaAdi" :suggestions="filteredCompany" @complete="searchCompany($event)"
          field="firmaAdi" @item-select="selectedCompanyFilter" :class="{
            'p-invalid': v$.datas.firmaAdi.$invalid && submitted,
          }" />
        <label for="firmaAdi">Firma Adı</label>
      </span>
    </div>
    <div class="col">
        <span class="p-float-label">
          <Calendar id="kayitTarihi" :disabled="is_form" v-model="datas.date" :class="{
                        'p-invalid': v$.datas.date.$invalid && submitted,
                      }" />
        
          <label for="kayitTarihi">Kayıt Tarihi</label>
        </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <InputText id="email" type="text" v-model="datas.email" :class="{
                      'p-invalid': v$.datas.email.$invalid && submitted,
                    }" />
        <label for="email">Email</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <InputText id="phoneNumber" type="text" v-model="datas.phoneNumber" :class="{
        'p-invalid': v$.datas.phoneNumber.$invalid && submitted,
                    }" />
        <label for="phoneNumber">Telefon Numarası</label>
      </span>
    </div>
  </div>
  <br/>
  <div class="grid">
    <div class="col"><Checkbox v-model="datas.wrongNumber" :binary="true" />Numara Hatalı</div>
    <div class="col"><Checkbox v-model="datas.notResponse" :binary="true" />Arandı, Açmadı,
    Sesli Mesaj</div>
    <div class="col"><Checkbox v-model="datas.notInterested" :binary="true" />Açtı,
    İlgilenmiyor</div>
    <div class="col"><Checkbox v-model="datas.interested" :binary="true" />Açtı,
    İlgileniyor</div>

  </div>
  <div class="grid">
    <div class="col"><RadioButton name="name" value="contractor" v-model="datas.unvan" />Constructor</div>
    <div class="col"><RadioButton v-model="datas.unvan" name="name" value="architect" />Architect</div>

  </div>
  <br/>
  <div class="grid">
    <div class="col">
      <span class="p-float-label">
        <InputText id="baslik" type="text" :disabled="is_form" v-model="datas.baslik" :class="{
                'p-invalid': v$.datas.baslik.$invalid && submitted,
                            }" />
        <label for="baslik">Başlık</label>
      </span>
      <br/>
      <span class="p-float-label">
        <Textarea id="aciklama" rows="5" cols="30" :disabled="is_form" v-model="datas.aciklama" :class="{
              'p-invalid': v$.datas.aciklama.$invalid && submitted,
                                  }" />
        <label for="aciklama">Detay</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <Calendar v-model="datas.date_hatirlatma" :disabled="is_form" />
        <label for="aciklama">Detay</label>
      </span>
      <br />

      <span class="p-float-label">
        <Textarea rows="5" id="haciklama" cols="30" v-model="datas.hatirlatmaAciklama" />
        <label for="haciklama">Hatırlatma Açıklama</label>
      </span>
    </div>

  </div>
  <div class="grid">
    <div class="col">
      <Button class="p-button-secondary" @click="kaydet_click" :disabled="is_kaydet">
        Kaydet
      </Button>
    </div>
  </div>

</template>

<script>
import bgpService from "@/service/BgpProjectService";
import { mapGetters } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import socket from "@/service/SocketService"
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      datas: {
        firmaAdi: { required },
        email: { required },
        phoneNumber: { required },
        baslik: { required },
        aciklama: { required },
        date: { required },

      },
    };
  },
  computed: {
    ...mapGetters(["projectName", "ulkeAdi", "bgpProjectCompanyDetailList"]),
  },
  data() {
    return {
      submitted:false,
      filteredCompany: {},
      date_hatirlatma: null,
      date: null,
      datas: {
        projectName: "",
        firmaAdi: "",
        date: new Date(),
        baslik: "",
        aciklama: "",
        date_hatirlatma: new Date(),
        hatirlatma_notu: "",
        temsilci: 0,
        email: "",
        phoneNumber: "",
        wrongNumber: false,
        notResponse: false,
        notInterested: false,
        interested: false,
        unvan: "",
        ulkeAdi: "",
      },
    };
  },
  methods: {
    selectedCompanyFilter(event) {
      bgpService
        .getBgpServiceSelectedCompany(event.value.firmaAdi)
        .then((data) => {
          this.datas = data[0];
          this.datas.hatirlatma_notu = "";
          this.datas.date_hatirlatma = new Date();
          this.datas.date = new Date();
          (this.datas.baslik = ""), (this.datas.aciklama = "");
          (this.datas.wrongNumber = false),
            (this.datas.notResponse = false),
            (this.datas.notInterested = false),
            (this.datas.interested = false),
            (this.datas.unvan = "");
        });
    },
    companyDetailList() {
      bgpService.getBgpProjectCompanyDetailList().then((data) => {
        this.$store.dispatch("bgp_projects_company_detail_list", data);
      });
    },
    searchCompany(event) {
      let result;

      if (event.query.length == 0)
        result = [...this.bgpProjectCompanyDetailList];
      else {
        result = this.bgpProjectCompanyDetailList.filter((x) => {
          return x.firmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredCompany = result;
    },
    dateFormatChange(dates) {
      const d = new Date(dates);
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return year + "-" + month + "-" + day;
    },
    kaydet_click() {
      this.submitted = true;
      if (this.v$.$invalid) {
        this.$toast.add({
          severity: "error",
          summary: "Zorunlu Alanlar",
          detail: "Zorunlu alanları doldurunuz!",
          life: 3000,
        });
      } else {
        this.datas.temsilci = this.$store.getters.__getUserId;
        this.datas.projectName = this.projectName;
        this.datas.ulkeAdi = this.ulkeAdi;
        this.datas.date = this.dateFormatChange(this.datas.date);
        this.datas.date_hatirlatma = this.dateFormatChange(
          this.datas.date_hatirlatma
        );
        bgpService.setBgpProjectDetailSave(this.datas).then((data) => {
          if (data.status) {
            this.$toast.add({
              severity: "success",
              summary: "Proje Kaydetme",
              detail: "Proje içeriği başarıyla kaydedildi",
              life: 3500,
            });
            this.$store.dispatch("bgp_projects_list_ayrinti_load", data.result);
            this.datas_reset();
            socket.siparis.emit('bildirimler_update_event')

          } else {
            this.$toast.add({
              severity: "error",
              summary: "Proje Kaydetme",
              detail: "Proje içeriği kaydetme hatası",
              life: 3500,
            });
          }
        });

      }
      
    },
    datas_reset() {
      (this.datas.projectName = ""),
        (this.datas.firmaAdi = ""),
        (this.datas.date = new Date()),
        (this.datas.baslik = ""),
        (this.datas.aciklama = ""),
        (this.datas.date_hatirlatma = new Date()),
        (this.datas.hatirlatma_notu = ""),
        (this.datas.temsilci = 0),
        (this.datas.email = ""),
        (this.datas.phoneNumber = ""),
        (this.datas.wrongNumber = false),
        (this.datas.notResponse = false),
        (this.datas.notInterested = false),
        (this.datas.interested = false);
      this.unvan = "";
    },
  },
  created() {
    this.companyDetailList();
  },
};
</script>

<style scoped></style>

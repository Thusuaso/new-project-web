<template>
  <br />
  <div class="grid">
    <div class="col">
      <span class="p-float-label">
        <InputText id="firmaAdi" type="text" v-model="bgpProjectAyrintiForm.firmaAdi" :class="{
          'p-invalid':
            v$.bgpProjectAyrintiForm.firmaAdi.$invalid && submitted,
        }" />
        <label for="firmaAdi">Firma Adı</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <Calendar id="kayitTarihi" v-model="date" :class="{ 'p-invalid': v$.date.$invalid && submitted }" />
      
        <label for="kayitTarihi">Kayıt Tarihi</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <InputText id="email" type="text" v-model="bgpProjectAyrintiForm.email" :class="{
                      'p-invalid':
                        v$.bgpProjectAyrintiForm.email.$invalid && submitted,
                    }" />
        <label for="email">Email</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <InputText id="phoneNumber" type="text" v-model="bgpProjectAyrintiForm.phoneNumber" :class="{
                      'p-invalid':
                        v$.bgpProjectAyrintiForm.phoneNumber.$invalid && submitted,
                    }" />
        <label for="phoneNumber">Telefon Numarası</label>
      </span>
    </div>
  </div>
  <br/>
  <div class="grid">
    <div class="col">
      <Checkbox v-model="bgpProjectAyrintiForm.wrongNumber" :binary="true" />Numara Hatalı
    </div>
    <div class="col">
      <Checkbox v-model="bgpProjectAyrintiForm.notResponse" :binary="true" />Arandı, Açmadı, Sesli Mesaj
    </div>
    <div class="col">
      <Checkbox v-model="bgpProjectAyrintiForm.notInterested" :binary="true" />Açtı, İlgilenmiyor
    </div>
    <div class="col">
      <Checkbox v-model="bgpProjectAyrintiForm.interested" :binary="true" />Açtı, İlgileniyor
    </div>

  </div>
  <br />
  <div class="grid">
    <div class="col"><RadioButton name="name" value="contractor" v-model="bgpProjectAyrintiForm.unvan" />Constructor</div>
    <div class="col"><RadioButton v-model="bgpProjectAyrintiForm.unvan" name="name" value="architect" />Architect</div>
  </div>
  <br />
  <div class="grid">
    <div class="col">
      <span class="p-float-label">
        <InputText id="baslik" type="text" v-model="bgpProjectAyrintiForm.baslik" :class="{
                            'p-invalid':
                              v$.bgpProjectAyrintiForm.baslik.$invalid && submitted,
                          }" />
        <label for="baslik">Başlık</label>

      </span>
      <br />
      <span class="p-float-label">
        <Textarea id="aciklama" rows="5" cols="30" v-model="bgpProjectAyrintiForm.aciklama" :class="{
                            'p-invalid':
                              v$.bgpProjectAyrintiForm.aciklama.$invalid && submitted,
                          }" />
        <label for="aciklama">Detay</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <Calendar v-model="date_hatirlatma" />
        <label for="aciklama">Detay</label>
      </span>
      <br />
      <span class="p-float-label">
        <Textarea rows="5" id="haciklama" cols="30" v-model="bgpProjectAyrintiForm.hatirlatmaAciklama" />
        <label for="haciklama">Hatırlatma Açıklama</label>
      </span>
    </div>
  </div>
  <br />
  <div class="grid">
    <div class="col"><Button :disabled="username_kontrol" class="p-button-warning" @click="degistir_click" label="Guncelle" />
      </div>
    <div class="col">
      <Button :disabled="username_kontrol" class="p-button-danger" @click="sil_click" label="Sil" />
        
    </div>

  </div>

</template>

<script>
import { mapGetters } from "vuex";
import bgpService from "@/service/BgpProjectService";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import socket from "@/service/SocketService";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      date: { required },
      bgpProjectAyrintiForm: {
        firmaAdi: { required },
        email: { required },
        phoneNumber: { required },
        baslik: { required },
        aciklama: { required },
      },
    };
  },
  computed: {
    ...mapGetters(["bgpProjectAyrintiForm", "username_kontrol"]),
  },
  data() {
    return {
      date_hatirlatma: new Date(),
      date: new Date(),
    };
  },
  created() {

  },
  methods: {
    degistir_click() {
      this.submitted = true;
      if (this.v$.$invalid) {
        this.$toast.add({
          severity: "error",
          summary: "Zorunlu Alanlar",
          detail: "Zorunlu alanları doldurunuz!",
          life: 3000,
        });
      } else {
        this.bgpProjectAyrintiForm.kayitTarihi = this.dateFormatChange(
          this.date
        );
        this.bgpProjectAyrintiForm.hatirlatmaTarihi = this.dateFormatChange(
          this.date_hatirlatma
        );
        this.$store.dispatch("fullscreenLoadingAct", true);
        bgpService
          .setBgpProjectDetailChange(this.bgpProjectAyrintiForm)
          .then((data) => {
            if (data.status) {
              
              this.$store.dispatch(
                "bgp_projects_list_ayrinti_load",
                data.result
              );
              this.emitter.emit("ayrinti_form_closed", false);
              socket.siparis.emit('bildirimler_update_event')
              this.$store.dispatch("fullscreenLoadingAct", false);
              this.$toast.add({
                severity: "success",
                summary: "Detay Güncelleme Bilgi",
                detail: "Güncelleme Başarılı",
                life: 3500,
              });

            } else {
              this.$store.dispatch("fullscreenLoadingAct", false);
              this.$store.dispatch(
                "bgp_projects_list_ayrinti_load",
                data.result
              );
              this.$toast.add({
                severity: "error",
                summary: "Detay Güncelleme Bilgi",
                detail: "Güncelleme Hatayla Sonuçlandı",
                life: 3500,
              });
            }
          });
      }
    },


    sil_click() {
      this.$store.dispatch("fullscreenLoadingAct", true);

      bgpService
        .setBgpProjectDetailDelete(
          this.bgpProjectAyrintiForm.id,
          this.bgpProjectAyrintiForm.projectName
        )
        .then((data) => {
          if (data.status) {
            
            this.$store.dispatch("bgp_projects_list_ayrinti_load", data.result);
            this.emitter.emit("ayrinti_form_closed", false);
            socket.siparis.emit('bildirimler_update_event')
            this.$store.dispatch("fullscreenLoadingAct", false);
            this.$toast.add({
              severity: "success",
              summary: "Detay Silme Bilgi",
              detail: "Silme Başarılı",
              life: 3500,
            });


          } else {
            
            this.$store.dispatch("fullscreenLoadingAct", false);

            this.$store.dispatch("bgp_projects_list_ayrinti_load", data.result);
            this.$toast.add({
              severity: "error",
              summary: "Detay Silme Bilgi",
              detail: "Silme Hatayla Sonuçlandı",
              life: 3500,
            });
          }
        });
    },
    dateFormatChange(dates) {
      const d = new Date(dates);
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return year + "-" + month + "-" + day;
    },
  },
};
</script>

<style scoped></style>

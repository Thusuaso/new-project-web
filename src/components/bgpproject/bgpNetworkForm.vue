<template>
  <br/>
    <div class="grid">
      <div class="col">
        <span class="p-float-label">
          <InputText id="projectName" type="text" v-model="bpgProjeAdi" :class="{ 'p-invalid': v$.bpgProjeAdi.$invalid && submitted }" />
          <label for="projectName">Bgp Proje Adı</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <AutoComplete id="ulke_adi" v-model="bgpUlkeAdi" :suggestions="filter_ulke_list" @complete="ulke_complete_event($event)"
            field="ulke_adi" :class="{ 'p-invalid': v$.bgpUlkeAdi.$invalid && submitted }" />
          <label for="ulke_adi">Ülke</label>
        </span>
      </div>
    </div>
    <div class="grid">
      <div class="col">
        <Button @click="bgpProjeKayit" label="Kaydet" :disabled="is_save_disabled" />
      </div>
    </div>


      
</template>
<script>
import bgpService from "@/service/BgpProjectService";
import { mapGetters } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      bpgProjeAdi: { required },
      bgpUlkeAdi: { required },
    };
  },
  computed: {
    ...mapGetters(["bgpUlkeler"]),
  },
  props: ["username"],
  data() {
    return {
      submitted: false,
      bpgProjeAdi: "",
      bgpUlkeAdi: "",
      filter_ulke_list: {},
      is_save_disabled: false,
    };
  },
  created() {},
  methods: {
    bgpProjeKayit() {
      this.submitted = true;
      if (this.v$.$invalid) {
        this.$toast.add({ severity: 'error', summary: 'Zorunlu Alanlar', detail: 'Zorunlu alanları doldurunuz!', life: 3000 });
      } else {
        this.is_save_disabled = true;
        bgpService
          .setBgpProjectName(
            this.bpgProjeAdi,
            this.username,
            this.bgpUlkeAdi.ulke_adi,
            this.bgpUlkeAdi.logo
          )
          .then((data) => {
            if (data.status) {
              this.$toast.add({
                severity: "success",
                summary: "Proje İsmi",
                detail: "Proje ismi başarıyla kaydedildi.",
                life: 3500,
              });
              this.$store.dispatch("bgp_projects_list_load", data.result);
              this.emitter.emit("isProjectSave", false);
              this.is_save_disabled = true;
            } else {
              this.$toast.add({
                severity: "error",
                summary: "Proje İsmi",
                detail:
                  "Proje ismi kaydetme başarısız.Lütfen proje isminizi kontrol ediniz.",
                life: 3500,
              });
              this.$store.dispatch("bgp_projects_list_load", data.result);
              this.is_save_disabled = true;
            }
          });
      }
      
    },
    ulke_complete_event(event) {
      this.filter_ulke_list = this.bgpUlkeler.filter((x) => {
        return (
          x.ulke_adi
            .toString()
            .toLowerCase()
            .indexOf(event.query.toString().toLowerCase()) >= 0
        );
      });
    },
  },
};
</script>
<style scoped></style>

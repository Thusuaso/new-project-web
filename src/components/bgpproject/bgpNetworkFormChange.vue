<template>
  <div>
    <div class="container" style="padding: 45px">
      <div class="columns">
        <div class="column">
          <b-field label="Bgp Proje Adı" label-position="on-border">
            <InputText type="text" v-model="bgpProjectName"></InputText>
          </b-field>
        </div>
        <div class="column">
          <b-field label="ÜLKE" label-position="on-border">
            <AutoComplete
              v-model="bgpUlkeAdi"
              :suggestions="filter_ulke_list"
              @complete="ulke_complete_event($event)"
              field="ulke_adi"
            />
          </b-field>
        </div>
      </div>

      <Button
        @click="bgpProjeGuncelle"
        label="Güncelle"
        style="width: 530px"
        :disabled="is_save_disabled"
      ></Button>
    </div>
  </div>
</template>
<script>
import bgpService from "@/service/BgpProjectService";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["bgpUlkeler"]),
  },
  props: ["username", "bpgProjeAdi", "ulkeAdi", "projectId"],
  data() {
    return {
      bgpUlkeAdi: "",
      filter_ulke_list: {},
      is_save_disabled: false,
      bgpProjectName:""
    };
  },
  created() {
    this.bgpProjectName = this.bpgProjeAdi
  },
  methods: {
    bgpProjeGuncelle() {
      this.is_save_disabled = true;
      bgpService
        .setBgpProjectNameChange(
          this.bpgProjeAdi,
          this.username,
          this.bgpUlkeAdi.ulke_adi,
          this.bgpUlkeAdi.logo,
          this.projectId
        )
        .then((data) => {
          if (data.status) {
            this.$toast.add({
              severity: "success",
              summary: "Proje İsmi",
              detail: "Proje başarıyla güncellendi.",
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
                "Proje güncelleme başarısız.Lütfen proje isminizi kontrol ediniz.",
              life: 3500,
            });
            this.$store.dispatch("bgp_projects_list_load", data.result);
            this.is_save_disabled = true;
          }
        });
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
  mounted() {
    this.bgpUlkeAdi = this.bgpUlkeler.filter(
      (x) => x.ulke_adi == this.ulkeAdi
    )[0];
  },
};
</script>
<style scoped></style>

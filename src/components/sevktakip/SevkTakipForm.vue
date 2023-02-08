<template>
  <br/>
  <div class="grid">
    <div class="col">
      <span class="p-float-label">
        <InputText id="konteynerno" type="text" v-model="takip_form[0].konteynerno" />
        <label for="konteynerno">Konteynır No</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <InputText id="line" type="text" v-model="takip_form[0].line" />
        <label for="line">Hat</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <Calendar id="line" type="text" v-model="eta" />
        <label for="line">Eta</label>
      </span>
    </div>
    <div class="col">
      <span class="p-float-label">
        <Checkbox id="konsimento" v-model="takip_form[0].konsimento" :binary="true" />
        {{ takip_form[0].konsimento ? "Gönderildi" : "Gönderilmedi" }}
      </span>
    </div>
    <div class="col">
        <Checkbox v-model="takip_form[0].takip" :binary="true" /> Takip
    </div>
  </div>
  <div class="grid">
    <div class="col">
      <Button class="p-button-secondary" @click="takipGuncelle" label="Kaydet" />
    </div>
  </div>
</template>
<script>
import LocalService from "../../service/LocalService";
import { mapGetters } from "vuex";
import service from "../../service/OperasyonService";
export default {
  props: ["id", "isMobile"],
  data() {
    return {
      eta: new Date(),
      model: null,
    };
  },
  localService: null,
  mounted() {},
  created() {
    this.localService = new LocalService();

    if (this.takip_form[0].eta != "") {
      this.eta = this.localService.getStringDate(this.takip_form[0].eta);
    }
  },
  computed: {
    ...mapGetters(["takip_form"]),
  },
  methods: {
    takipGuncelle() {
      this.takip_form[0].eta = this.localService.getDateString(this.eta);

      const data = { ...this.takip_form[0] };
      service.sevkTakipGuncelle(data).then((res) => {
        if (res) {
          alert("Bilgiler Güncellendi.");
          this.$emit("sevkTakipFormGuncelle");
        }
      });
    },
  },
};
</script>

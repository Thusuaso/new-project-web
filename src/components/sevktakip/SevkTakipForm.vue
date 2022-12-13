<template>
  <section>
    <br />
    <div class="columns is-multiline">
      <div class="column is-4">
        <span class="p-float-label">
          <InputText
            id="konteynerno"
            type="text"
            v-model="takip_form[0].konteynerno"
          />
          <label for="konteynerno">Konteynır No</label>
        </span>
      </div>
      <div class="column is-4">
        <span class="p-float-label">
          <InputText id="line" type="text" v-model="takip_form[0].line" />
          <label for="line">Hat</label>
        </span>
      </div>
      <div class="column is-4">
        <span class="p-float-label">
          <InputText id="line" type="text" v-model="eta" />
          <label for="line">Eta</label>
        </span>
      </div>
      <div class="column is-3">
        <b-field label="Konşimento" horizontal>
          <Checkbox v-model="takip_form[0].konsimento" :binary="true" />
          {{ takip_form[0].konsimento ? "Gönderildi" : "Gönderilmedi" }}
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="" horizontal>
          <Checkbox v-model="takip_form[0].takip" :binary="true" /> Takip
        </b-field>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-3">
        <Button
          class="p-button-secondary"
          @click="takipGuncelle"
          label="Kaydet"
        />
      </div>
    </div>
  </section>
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
        console.log("sevkTakipGuncelle", data);
        if (res) {
          alert("Bilgiler Güncellendi.");
          this.emitter.emit("sevkTakipFormGuncelle");
        }
      });
    },
  },
};
</script>

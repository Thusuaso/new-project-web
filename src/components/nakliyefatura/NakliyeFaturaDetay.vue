<template>
  <div class="columns">
    <div class="column is-12" :style="{ width: '350px', height: '500px' }">
      <div class="p-field p-col-12 p-md-12">
        <label for="firstname" class="p-col-fixed" style="width: 100px"
          >Fatura No</label
        >
        <div class="p-col">
          <InputText
            v-model="nakliyeAyrinti.faturaNo"
            id="firstname"
            type="text"
            disabled="true"
          />
        </div>
      </div>
      <div class="p-field p-col-12 p-md-12">
        <label for="firstname" class="p-col-fixed" style="width: 100px"
          >Kur</label
        >
        <div class="p-col">
          <InputText
            v-model="nakliyeAyrinti.kur"
            id="firstname"
            type="text"
            @input="isInputKur"
          />
        </div>
      </div>
      <div class="p-field p-col-12 p-md-12">
        <label for="lastname" class="p-col-fixed" style="width: 100px"
          >Tutar- USD</label
        >
        <div class="p-col">
          <InputText
            v-model="nakliyeAyrinti.Tutar_dolar"
            id="lastname"
            type="text"
            @input="isInputDolar"
          />
        </div>
      </div>
      <div class="p-field p-col-12 p-md-12">
        <div class="columns">
          <div class="column is-3">
            <OverlayPanel
              ref="op"
              style="margin-left: -570px; margin-top: -130px"
            >
              <div>Silmek istediğinize emin misiniz?</div>
              <div class="columns">
                <div class="column">
                  <Button @click="is_yes" label="Evet"></Button>
                </div>
                <div class="column">
                  <Button @click="is_no" label="Hayır"></Button>
                </div>
              </div>
            </OverlayPanel>
            <Button
              class="button is-danger"
              @click="is_delete_document"
              icon="pi pi-check"
              label="Sil"
            ></Button>
          </div>
          <div class="column">
            <Button
              class="button is-warning"
              @click="is_change_document"
              icon="pi pi-check"
              label="Değiştir"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import service from "../../service/OperasyonService";

export default {
  data() {
    return {
      filterSiparisList: null,
    };
  },
  created() {
    service.getKonteynerFormListesi().then((data) => {
      this.firma_list = data.konteyner_liste;
      this.siparis_list = data.siparis_list;
    });
  },
  computed: {
    ...mapGetters(["nakliyeAyrinti"]),
  },
  methods: {
    isInputDolar(event) {
      this.nakliyeAyrinti[0].Tutar_dolar = event.replace(",", ".");
    },
    isInputKur(event) {
      this.nakliyeAyrinti[0].kur = event.replace(",", ".");
    },
    formatPriceDolar(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatPriceTL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "₺" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    is_change_document() {
      service.setChangeNakliyeFatura(this.nakliyeAyrinti).then((data) => {
        if (data.status) {
          this.$toast.add({
            severity: "success",
            summary: "Nakliye Fatura",
            detail: "Nakliye fatura güncellendi",
            life: 3000,
          });
          this.$store.dispatch("nakliye_data_list_yukle_act", data.nakliyeList);
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Nakliye Fatura",
            detail: "Nakliye fatura güncelleme hata",
            life: 3000,
          });
        }
      });
    },
    aramaSiparis(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.siparis_list];
        } else {
          result = this.siparis_list.filter((ted) => {
            return ted.siparis_no
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterSiparisList = result;
      }, 250);
    },
    siparisDegisim(event) {
      this.nakliyeAyrinti[0].siparis_no = event.value.siparisno;
    },
    is_no: function () {
      this.$refs.op.hide();
      this.$toast.add({
        severity: "info",
        summary: "Nakliye Evrak",
        detail: "Nakliye evrak silme iptal edildi",
        life: 3000,
      });
    },
    is_yes() {
      service
        .setDeleteNakliyeFatura(this.siparis_no, this.evrak_id)
        .then((data) => {
          if (data.status) {
            this.$refs.op.hide();
            this.$toast.add({
              severity: "success",
              summary: "Nakliye Evrak",
              detail: "Nakliye evrak silme başarılı",
              life: 3000,
            });
            this.$store.dispatch(
              "nakliye_data_list_yukle_act",
              data.nakliyeList
            );
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Nakliye Evrak",
              detail: "Nakliye evrak silme başarısız",
              life: 3000,
            });
          }
        });
    },
    is_delete_document(event) {
      this.$refs.op.toggle(event);
    },
  },
};
</script>
<style scoped></style>

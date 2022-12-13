<template>
  <InputText
    type="text"
    v-model="currencyValue"
    @blur="isInputActive = false"
    @focus="isInputActive = true"
    @input="miktar_input_event($event)"
    @change="currencyDegisim($event)"
    :disabled="disAktif"
  />
</template>
<script>
import store from "../../store";
import { mapGetters } from "vuex";
export default {
  data: function () {
    return {
      isInputActive: false,
      isActive: false,
    };
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    ondalik: {
      type: Number,
      default: 2,
    },
    disAktif: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currencyValue: {
      get: function () {
        if (this.isInputActive) {
          return this.value.toString();
        } else {
          let val = (this.value / 1).toFixed(2).replace(".", ",");
          return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
      },
      set: function (modifiedValue) {
        let newValue = parseFloat(modifiedValue /*.replace(/[^\d\.]/g, "")*/);
        if (isNaN(newValue)) {
          newValue = 0;
        }
        //console.log("kayit durumu",SiparisGirisForm.data.kayitDurum)
        this.emitter.emit("input", newValue);
      },
    },

    ...mapGetters(["navlun_ilk_deger"]),
  },
  methods: {
    miktar_input_event(event) {
      if (event) this.currencyValue = event.replace(",", ".");
      this.emitter.emit("navlunSatis", true);
    },
    currencyDegisim(event) {
      this.$store.dispatch("navlun_act", event.target.value);

      let index = 0;
      let durum = false;
      if (this.navlun_ilk_deger.navlunSatis != event) {
        index = index + 1;
        this.emitter.emit("navlunSatis", true);
      }
      if (this.navlun_ilk_deger.navlunFirma != event) index = index + 1;
      if (this.navlun_ilk_deger.navlunAlis != event) index = index + 1;
      if (this.navlun_ilk_deger.navlunMekmarNot != event) index = index + 1;
      if (index > 0) {
        durum = false;
      }
      store.dispatch("kayit_kontrol_degeri_act", durum);
    },
  },
};
</script>
<style scoped>
body {
  margin: 20px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
input {
  border: 1px solid #888;
  font-size: 14px;
  padding: 0.5rem;
  text-align: center;
}
</style>

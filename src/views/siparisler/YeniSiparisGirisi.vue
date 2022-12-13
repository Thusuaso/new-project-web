<template>
  <div>
    <siparis-giris-form :dtSiparisNo="siparisNo" yeniSiparis="true" />
  </div>
</template>
<script>
import SiparisGirisForm from "../components/siparisler/SiparisGirisForm";
export default {
  components: {
    siparisGirisForm: SiparisGirisForm,
  },

  data() {
    return {
      siparisNo: "",
    };
  },
};
</script>

<template>
  <siparis-liste siparisTur="üretim" :hasPage="false" baslik="Üretim Listesi" />
</template>
<script>
import SiparisListe from "../../components/siparisler/SiparisListe";
export default {
  data() {
    return {
      dataSiparisler: null,
    };
  },
  components: {
    siparisListe: SiparisListe,
  },
};
</script>

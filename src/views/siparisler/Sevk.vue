<template>
  <siparis-liste siparisTur="sevk" :hasPage="true" baslik="Sevk Listesi" />
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

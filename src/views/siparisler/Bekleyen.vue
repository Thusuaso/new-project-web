<template>
  <siparis-liste
    siparisTur="bekleyen"
    :hasPage="false"
    baslik="Bekleyenler Listesi"
  />
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

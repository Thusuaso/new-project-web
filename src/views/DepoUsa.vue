<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <DepoUrunList title="Mekmar Usa Ürün Listesi" :depostock="true" />
      </div>
    </div>
  </section>
</template>
<script>
import DepoUrunList from "../components/depousa/DepoUrunList";
export default {
  components: {
    DepoUrunList,
  },
};
</script>

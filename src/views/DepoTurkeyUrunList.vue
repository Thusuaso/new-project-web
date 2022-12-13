<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <DepoUrunList title="Turkey Usa Ürün Listesi" :depostock="false" />
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

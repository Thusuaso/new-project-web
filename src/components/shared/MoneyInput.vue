<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <b-field label-position="on-border" :label="label">
          <b-input
            :disabled="disAktif"
            v-model="text_value"
            @input="value_change_event($event)"
            custom-class="has-text-centered"
          />
        </b-field>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ["label", "text_value", "disAktif"],

  methods: {
    value_change_event(event) {
      let value = event;
      value = value.replace(",", ".");

      this.emitter.emit("money_input_text_change", value);
    },
  },
};
</script>
<style scoped>
input {
  text-align: center;
}
</style>

<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <span label-position="on-border" :label="label">
          <input
            :disabled="disAktif"
            v-model="text_value2"
            @input="value_change_event($event)"
            custom-class="has-text-centered"
          />
        </span>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ["label", "text_value", "disAktif"],

  data() {
    return {
      text_value2: 0,

    }
  },
  created() {
    this.text_value2 = this.text_value
  },
  methods: {
    value_change_event(event) {
      let value = event;
      value = value.replace(",", ".");

      this.emitter.emit("money_input_text_change", value);
      // this.masraflar_mail_control(event)
    },
    // masraflar_mail_control(event) {
    //   if (this.label == 'Satış Fiyati ($)') {
    //     this.$store.dispatch('masraflar_change_act',{ 'name': 'Satış Fiyatı', 'new_value': event })
    //   }
    // }
  },
};
</script>
<style scoped>
input {
  text-align: center;
}
</style>

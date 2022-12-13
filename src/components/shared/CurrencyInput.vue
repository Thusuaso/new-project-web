<template>
  <InputText
    type="text"
    v-model="currencyValue"
    @blur="isInputActive = false"
    @focus="isInputActive = true"
    :disabled="disAktif"
    @input="isInput"
  />
</template>
<script>
export default {
  data: function () {
    return {
      isInputActive: false,
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
          return (
            "$ " +
            this.value
              .toFixed(this.ondalik)
              .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
          );
        }
      },
      set: function (modifiedValue) {
        let newValue = parseFloat(modifiedValue /*.replace(/[^\d\.]/g, "")*/);
        if (isNaN(newValue)) {
          newValue = 0;
        }

        this.emitter.emit("input", newValue);
      },
    },
  },
  methods: {},
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

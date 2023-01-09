<template>
  <div class="upload-btn-wrapper">
    <button class="btn">{{ baslik }}</button>
    <input type="file" ref="file" name="myfile" @input="dosyaGonder($event)" :disabled="isISFForm" />
  </div>
</template>
<script>
export default {
  methods: {
    dosyaGonder() {
      //let file = event.target.files[0];
      let file = this.$refs.file.files[0];

      this.$emit("sunucuDosyaYolla", file);
    },
  },
  props: ["baslik",'isISFForm'],
};
</script>
<style scoped>
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn {
  border: 2px solid gray;
  color: white;
  background-color: #6495ed;
  padding: 8px 20px;
  font-size: 12px;
  font-weight: bold;
  margin-right: 2px;
  height: 50px;
  width: 150px;
}

.upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>

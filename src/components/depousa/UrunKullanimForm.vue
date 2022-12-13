<template>
  <section>
    <div v-for="item in kullanimList" :key="item.id" class="field">
      <Checkbox :value="item.durum" @input="durumDegisim(item, $event)" />
      {{ item.kullanimAdi }}
    </div>
    <div class="columns is-centered">
      <div class="column is-4">
        <Button
          class="p-button-success"
          label="Kaydet"
          @click="dataKayitIslem"
        />
      </div>
    </div>
  </section>
</template>

<script>
import depoKullanimService from "../../service/DepoKullanimService";

export default {
  data() {
    return {
      kullanimList: null,
      kullanim: null,
      silinenler: [],
      eklenenler: [],
    };
  },
  props: ["urunid"],
  created() {
    depoKullanimService.getKullanimList(this.urunid).then((data) => {
      this.kullanimList = data;
    });
  },
  methods: {
    durumDegisim(item, event) {
      if (event) {
        this.urunEkle(item);
      } else {
        this.urunSil(item);
      }
    },
    urunEkle(item) {
      const data = { ...item, urunid: this.urunid };

      this.eklenenler.push(data);
      this.kontrol(this.silinenler, item);
    },
    urunSil(item) {
      const data = { ...item, urunid: this.urunid };

      this.silinenler.push(data);

      this.kontrol(this.eklenenler, item);
    },
    kontrol(list, item) {
      for (let key in list) {
        if (list[key].id == item.id) {
          list.splice(key, 1);
        }
      }
    },
    dataKayitIslem() {
      const data = {
        eklenenler: this.eklenenler,
        silinenler: this.silinenler,
      };

      depoKullanimService.dataKayitIslem(data).then((status) => {
        if (status) {
          this.eklenenler = [];
          this.silinenler = [];
          alert("Kullanım Alanları Eklendi.");
        }
      });
    },
  },
};
</script>

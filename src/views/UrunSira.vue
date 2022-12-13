<template>
  <section class="box-content">
    <div class="columns is-centered">
      <div class="column is-12">
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="select">
              <select @change="kategoriSecim" v-model="selectkategori">
                <option
                  v-for="kategori in kategoriler"
                  :key="kategori.id"
                  :value="kategori.id"
                >
                  {{ kategori.adi }}
                </option>
              </select>
            </div>
          </div>
          <div class="column is-1">
            <button :disabled="isdegistir" class="button" @click="yukariTasi">
              <i class="fas fa-chevron-up"></i>
            </button>
          </div>
          <div class="column is-1">
            <button :disabled="isdegistir" class="button" @click="enyukariTasi">
              <i class="fas fa-angle-double-up"></i>
            </button>
          </div>
          <div class="column is-1">
            <button :disabled="isdegistir" class="button" @click="asagiTasi">
              <i class="fas fa-chevron-down"></i>
            </button>
          </div>
          <div class="column is-1">
            <button :disabled="isdegistir" class="button" @click="enasagisTasi">
              <i class="fas fa-angle-double-down"></i>
            </button>
          </div>

          <div class="column is-2">
            <Button
              label="Kaydet"
              class="p-button-success"
              :loading="btnloading"
              :disabled="iskaydet"
              @click="dataDegisikligiKaydet"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="columns content">
      <div class="column is-12">
        <DataTable
          ref="urunsira"
          :value="urunlist"
          selectionMode="simple"
          v-model:selection="urun"
          :scrollable="true"
          :loading="dataloading"
          scrollHeight="500px"
          :filters="filters"
          @row-select="urunSecim($event)"
        >
          <Column
            field="sira"
            header="Sıra"
            headerStyle="width:80px;"
            bodyStyle="text-align:center;vertical-align:middle;"
          >
            <template #body="slotProps">
              {{ slotProps.data.sira }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['sira']"
                class="p-column-filter"
              />
            </template>
          </Column>
          <Column
            field="id"
            header="ID"
            headerStyle="width:80px;"
            bodyStyle="text-align:center;vertical-align:middle;"
          >
            <template #body="slotProps">
              {{ slotProps.data.id }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['id']"
                class="p-column-filter"
              />
            </template>
          </Column>
          <Column
            field="urunadi"
            header="Ürün"
            headerStyle="width:300px;"
            bodyStyle="vertical-align:middle;"
          >
            <template #body="slotProps">
              {{ slotProps.data.urunadi }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['urunadi']"
                class="p-column-filter"
              />
            </template>
          </Column>
          <Column
            field="foto"
            header="Foto"
            headerStyle="width:100px;"
            bodyStyle="vertical-align:middle;"
          >
            <template #body="slotProps">
              <img :src="slotProps.data.foto" width="100" height="100" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </section>
</template>
<script>
import mekmarService from "../service/MekmarService";

export default {
  data() {
    return {
      urunlist: null,
      urun: null,
      selectKey: 0,
      iskaydet: true,
      isdegistir: true,
      dataloading: false,
      btnloading: false,
      kategoriler: null,
      selectkategori: null,
      filters: {},
    };
  },
  created() {
    mekmarService.urunSiraKategoriList().then((res) => {
      this.kategoriler = res;
      this.selectkategori = 1;
      console.log("Kategori List : ", res);
      //varsayılan ilk listenin yüklenmesi
      this.urunListYukle(1);
    });
  },
  methods: {
    urunListYukle(kategoriId) {
      this.dataloading = true;
      mekmarService.urunSiraUrunList(kategoriId).then((data) => {
        this.urunlist = data;
        this.dataloading = false;
      });
    },
    kategoriSecim() {
      this.urunListYukle(this.selectkategori);
    },
    urunSecim(event) {
      this.urun = null;
      if (event.data) this.urun = event.data;
      this.getUrunIndex();

      this.isdegistir = false;
    },
    getUrunIndex() {
      if (this.urun) {
        for (let key in this.urunlist) {
          if (this.urun.id == this.urunlist[key].id)
            this.selectKey = Number(key);
        }
      }
    },
    urunSirala() {
      let sira = 1;
      for (let key in this.urunlist) {
        this.urunlist[key].sira = sira;
        sira += 1;
      }

      this.iskaydet = false;
    },
    yukariTasi() {
      if (this.selectKey && this.selectKey > 0) {
        let item = { ...this.urun };

        this.urunlist.splice(this.selectKey, 1);

        this.urun = null;

        this.selectKey -= 1;

        this.urunlist.splice(this.selectKey, 0, { ...item });

        this.urun = item;

        this.urunSirala();
      }
    },
    asagiTasi() {
      let ensonindeks = this.urunlist.length - 1;
      console.log("En Son İndeks : ", ensonindeks);
      console.log("Select key : ", this.selectKey);
      if (this.selectKey != ensonindeks) {
        console.log("En Son İndeks : ", ensonindeks);
        console.log("Select key : ", this.selectKey);

        let item = { ...this.urun };

        this.urunlist.splice(this.selectKey, 1);

        this.urun = null;

        this.selectKey += 1;

        this.urunlist.splice(this.selectKey, 0, { ...item });

        this.urun = item;

        this.urunSirala();
      }
    },
    enyukariTasi() {
      if (this.selectKey && this.selectKey > 0) {
        let item = { ...this.urun };

        this.urunlist.splice(this.selectKey, 1);

        this.urun = null;

        this.urunlist.splice(0, 0, { ...item });

        this.urun = item;

        this.urunSirala();

        console.log("Window bilgi : ", window.scrollY);
      }
    },
    enasagisTasi() {
      let sonindeks = this.urunlist.length - 1;

      if (this.selectKey != sonindeks) {
        let item = { ...this.urun };

        this.urunlist.splice(this.selectKey, 1);

        this.urun = null;

        this.urunlist.splice(sonindeks, 0, item);

        this.urun = item;

        this.urunSirala();
      }
    },
    dataDegisikligiKaydet() {
      this.dataloading = true;
      this.iskaydet = true;

      mekmarService.urunSiraDataGuncelle(this.urunlist).then((data) => {
        if (data.status) {
          alert("Sıralama Değişti.");
          this.isdegistir = true;
          this.iskaydet = true;
          this.selectKey = 0;
          this.urun = null;
          this.btnloading = false;
          this.dataloading = false;
        } else {
          this.iskaydet = false;
        }
      });
    },
  },
};
</script>
<style scoped>
.box-content {
  position: relative;
}
.header {
  top: 20px;
  bottom: 20px;
  position: sticky;
  position: -webkit-sticky;
  z-index: 1;
  height: 20px;
  padding: 16px;
}
</style>

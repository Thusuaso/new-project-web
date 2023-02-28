<!-- eslint-disable vue/no-mutating-props -->
<template>
  
  <TabView>
    <TabPanel header="Ürün Genel Bilgileri">
      <br/>
      <div class="columns">
        <div class="column is-4">
          <Carousel
            :value="urunDetaya.fotolar"
            :numVisible="1"
            :numScroll="1"
            orientation="vertical"
            verticalViewPortHeight="330px"
            :responsiveOptions="responsiveOptions"
          >
            <template #item="slotProps"
              ><img width="400" height="400" :src="slotProps.data.link" />
            </template>
          </Carousel>
        </div>
        <div class="column is-8" style="margin-left: 65px">
          <div class="columns">
            <div class="column">
              <span class="p-float-label">
                <InputText
                  id="urunadi"
                  type="text"
                  v-model="urunDetaya.urunadi"
                />
                <label for="urunadi">Ürün Adı</label>
              </span>
            </div>
            <div class="column">
              <span class="p-float-label">
                <InputText id="size" type="text" v-model="urunDetaya.size" />
                <label for="size">Ebat</label>
              </span>
            </div>
            <div class="column">
              <span class="p-float-label">
                <InputText id="renk" type="text" v-model="urunDetaya.renk" />
                <label for="renk">Renk</label>
              </span>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <span class="p-float-label">
                <InputText id="fiyat" type="text" v-model="urunDetaya.fiyat" />
                <label for="fiyat">Fiyat</label>
              </span>
            </div>
            <div class="column">
              <span class="p-float-label">
                <InputText
                  id="kutuDetay"
                  type="text"
                  v-model="urunDetaya.kutuDetay"
                />
                <label for="kutuDetay">Kutu Detayı</label>
              </span>
            </div>
            <div class="column">
              <span class="p-float-label">
                <InputText
                  id="kasaDetay"
                  type="text"
                  v-model="urunDetaya.kasaDetay"
                />
                <label for="kasaDetay">Kasa Detay</label>
              </span>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <span class="p-float-label">
                <InputText
                  id="surface"
                  type="text"
                  v-model="urunDetaya.surface"
                />
                <label for="surface">Yüzey</label>
              </span>
            </div>
            <div class="column">
              <span class="p-float-label">
                <InputText id="edge" type="text" v-model="urunDetaya.edge" />
                <label for="edge">Kenar</label>
              </span>
            </div>
            <div class="column">
              <div class="columns is-gapless">
                <div class="column is-2">
                  <InputSwitch v-model="urunDetaya.turkeyStock" />
                </div>
                <div class="column">Turkey Stock</div>
                <div class="column is-2">
                  <InputSwitch v-model="urunDetaya.yayinla" />
                </div>
                <div class="column">Yayınla</div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-3">
              <span class="p-float-label">
                <Textarea
                  id="aciklama"
                  v-model="urunDetaya.aciklama"
                  rows="5"
                  cols="25"
                />

                <label for="aciklama">Açıklama</label>
              </span>
            </div>
            <div class="column is-6">
              <span class="p-float-label">
                <Chips id="aciklama" v-model="keyLista" rows="5" cols="20" />

                <label for="aciklama">Anahtarlar</label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="columns" style="margin-left: 160px">
        <div class="column">
          <FileUpload
            mode="basic"
            :maxFileSize="5000000"
            v-model="file"
            multiple
            @select="fotoGonder"
          />
        </div>
        <div class="column">
          <Button
            @click="isfotolist = true"
            label="Foto List"
            class="p-button-primary"
          />
        </div>

        <div class="column">
          <Button
            @click="urunGuncelle"
            label="Kaydet"
            class="p-button-success"
          />
        </div>
        <div class="column">
          <Button @click="urunSil" label="Sil" class="p-button-danger" />
        </div>
      </div>
    </TabPanel>
    <TabPanel header="Kullanım Alanları">
      <br />

      <UrunKullanimForm :urunid="this.urunDetay.urunid" />
    </TabPanel>
    <TabPanel header="Ürün Yorumları">
      <br />

      <DepoUrunYorum :urunid="urunDetay.urunid" />
    </TabPanel>
  </TabView>

  <Dialog v-model:visible="isfotolist" :modal="true" position="top">

            <DepoUrunFotoList
              @fotoDegisim="fotoDegisimEvent($event)"
              :urunid="urunDetay.urunid"
              :depoPickFotoList="sliceFotoList"
            />

  </Dialog>
</template>
<script>
import depoService from "../../service/DepoService";
import DepoUrunFotoList from "./DepoUrunFotoList";
import digitalOceanService from "../../service/DigitalOceanService";
import UrunKullanimForm from "./UrunKullanimForm";
import DepoUrunYorum from "./DepoUrunYorum";
//import spaceService from '../../service/SpaceService';
export default {
  components: {
    DepoUrunFotoList,
    UrunKullanimForm,
    DepoUrunYorum,
  },
  data() {
    return {
      urunDetaya:[],
      keyLista:[],
      file: null,
      loading: false,
      isfotolist: false,
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 3,
          numScroll: 3,
        },
        {
          breakpoint: "600px",
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: "480px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
    };
  },
  props: ["urunDetay", "keyList", "sliceFotoList", "depostock"],

  methods: {
    fotoGonder(event) {
      let filelist = [];
      for (let key in event.files) {
        filelist.push(event.files[key].name);
        digitalOceanService.fotoGonderMekmarUsa(event.files[key]);
      }

      depoService.fotoDataKayit(filelist).then((result) => {
        if (result) {
          setTimeout(() => {
            for (let key in event.files) {
              digitalOceanService.fotoGonderMekmarUsa(event.files[key]);
            }
            this.dataGuncelle();
          }, 5000);
        }
      });
    },
    urunGuncelle() {
      let anahtarlar = "";
      let uzunluk = this.keyLista.length;
      let indeks = 1;

      if (uzunluk > 0) {
        for (let key in this.keyLista) {
          anahtarlar += this.keyLista[key];

          indeks += 1;

          if (uzunluk >= indeks) {
            anahtarlar += ",";
          }
        }
      }

      // eslint-disable-next-line vue/no-mutating-props
      this.urunDetay.anahtarlar = anahtarlar;
      this.loading = true;
      depoService.urunGuncelle(this.urunDetay).then((data) => {
        if (data) {
          if (this.depostock) {
            depoService.getDepoUrunListesi().then((dpdata) => {
              this.$store.dispatch("depoUrunListesiYukle", dpdata);

              this.urunBilgiGuncelle();
            });
          }
          if (!this.depostock) {
            depoService.getTurkeyStockList().then((trdata) => {
              this.$store.dispatch("depoUrunListesiYukle", trdata);
              this.urunBilgiGuncelle();
            });
          }
        }
      });
    },
    urunSil() {
      alert(this.urunDetay.urunid);
    },
    urunBilgiGuncelle() {
      depoService.getUrunDetay(this.urunDetay.urunid).then((data) => {
        if (data.anahtarlar.length > 1) {
          this.keyLista = data.anahtarlar.split(",");
        }
        this.loading = false;
        alert("Ürün Bilgileri  Değiştirildi.");
      });
    },
    dataGuncelle() {
      depoService.getUrunDetay(this.urunDetay.urunid).then((data) => {
        console.log(data);

        this.urunDetay = data;
        this.sliceFotoList = [data.fotolar.slice(0, 10), []];

        this.loading = false;
      });
    },
    fotoDegisimEvent(event) {
      this.urunDetay = event;
      this.sliceFotoList = [event.fotolar.slice(0, 10), []];
      this.loading = false;
    },
  },
  created() {
    this.keyLista = this.keyList
    this.urunDetaya = this.urunDetay
  }
};
</script>
<style scoped>
.slide-image img {
  width: 100%;
  height: 370px;
}
.custom-tabs {
  margin-top: -65px;
}
</style>

<template>
  
  <TabView>
    
    <TabPanel header="Ürün">
      <br />
      <div class="columns">
        <div class="column">
          <span class="p-float-label">
            <InputText id="urun" type="text" v-model="urunDetay.urunadi_en" />
            <label for="urun">Ürün Adı</label>
          </span>
        </div>
        <div class="column">
          <span class="p-float-label">
            <InputText id="urunKod" type="text" v-model="urunDetay.urunkod" />
            <label for="urunKod">Kod</label>
          </span>
        </div>
        <div class="column">
          <InputSwitch v-model="urunDetay.yayinla" /> Yayinla
        </div>
      </div>
      <br />
      <div class="columns">
        <div classs="column is-6">
          <span class="p-float-label">
            <TextArea
              id="aciklama_en"
              type="text"
              v-model="urunDetay.aciklama_en"
              rows="7"
              cols="100"
            />
            <label for="aciklama_en">Açıklama</label>
          </span>
        </div>
        <div classs="column is-6">
          <span class="p-float-label">
            <Chips id="keys" v-model="keys" />
            <label for="keys">Anahtarlar</label>
          </span>
        </div>
      </div>
      <br />
      <div class="columns">
        <div class="column">
          <span class="p-float-label">
            <InputText id="sira" type="text" v-model="urunDetay.sira" />
            <label for="sira">Sira</label>
          </span>
        </div>
        <div class="column">
          <span class="p-float-label">
            <InputText id="birim" type="text" v-model="urunDetay.birim" />
            <label for="birim">Birim</label>
          </span>
        </div>
        <div class="column">
          <span class="p-float-label">
            <InputText
              id="tedarikciadi"
              type="text"
              v-model="urunDetay.tedarikciadi"
            />
            <label for="tedarikciadi">Tedarikçi</label>
          </span>
        </div>
        <div class="column">
          <Dropdown
            v-model="kategori"
            :options="kategoriList"
            optionLabel="kategoriadi_en"
            placeholder="Select a Kategory"
          />
        </div>
        <div class="column">
          <Dropdown
            v-model="renkEn"
            :options="enRenkListesi"
            optionLabel="name"
            placeholder="Select a Color"
          />
        </div>
        <div class="column">
          <Dropdown
            v-model="stoneType"
            :options="kategoriList"
            optionLabel="kategoriadi_en"
            placeholder="Select a StoneType"
          />
        </div>
      </div>

    </TabPanel>
    <TabPanel header="Ürün (Fransızca)">
      <br />
        <div class="columns">
          <div class="column">
            <span class="p-float-label">
              <InputText id="urun" type="text" v-model="urunDetay.urunadi_fr" />
              <label for="urun">Ürün Adı</label>
            </span>
          </div>
          <div class="column">
            <span class="p-float-label">
              <InputText id="urunKod" type="text" v-model="urunDetay.urunkod" />
              <label for="urunKod">Kod</label>
            </span>
          </div>
          <div class="column">
            <InputSwitch v-model="urunDetay.yayinla" /> Yayinla
          </div>
        </div>
        <br />
        <div class="columns">
          <div classs="column is-6">
            <span class="p-float-label">
              <TextArea id="aciklama_en" type="text" v-model="urunDetay.aciklama_fr" rows="7" cols="100" />
              <label for="aciklama_en">Açıklama</label>
            </span>
          </div>
          <div classs="column is-6">
            <span class="p-float-label">
              <Chips id="keys" v-model="keys_fr" />
              <label for="keys">Anahtarlar</label>
            </span>
          </div>
        </div>
        <br />
        <div class="columns">
          <div class="column">
            <span class="p-float-label">
              <InputText id="sira" type="text" v-model="urunDetay.sira" />
              <label for="sira">Sira</label>
            </span>
          </div>
          <div class="column">
            <span class="p-float-label">
              <InputText id="birim" type="text" v-model="urunDetay.birim" />
              <label for="birim">Birim</label>
            </span>
          </div>
          <div class="column">
            <span class="p-float-label">
              <InputText id="tedarikciadi" type="text" v-model="urunDetay.tedarikciadi" />
              <label for="tedarikciadi">Tedarikçi</label>
            </span>
          </div>

          <div class="column">
            <Dropdown v-model="renkFr" :options="frRenkListesi" optionLabel="name" placeholder="Select a Color (FR)" />
          </div>

        </div>
    </TabPanel>
    <TabPanel header="Ürün (İspanyolca)">
      <br />
      <div class="columns">
        <div class="column">
          <span class="p-float-label">
            <InputText id="urun" type="text" v-model="urunDetay.urunadi_es" />
            <label for="urun">Ürün Adı</label>
          </span>
        </div>
        <div class="column">
          <span class="p-float-label">
            <InputText id="urunKod" type="text" v-model="urunDetay.urunkod" />
            <label for="urunKod">Kod</label>
          </span>
        </div>
        <div class="column">
          <InputSwitch v-model="urunDetay.yayinla" /> Yayinla
        </div>
      </div>
      <br />
      <div class="columns">
        <div classs="column is-6">
          <span class="p-float-label">
            <TextArea id="aciklama_en" type="text" v-model="urunDetay.aciklama_es" rows="7" cols="100" />
            <label for="aciklama_en">Açıklama</label>
          </span>
        </div>
        <div classs="column is-6">
          <span class="p-float-label">
            <Chips id="keys" v-model="keys_es" />
            <label for="keys">Anahtarlar</label>
          </span>
        </div>
      </div>
      <br />
      <div class="columns">
        <div class="column">
          <span class="p-float-label">
            <InputText id="sira" type="text" v-model="urunDetay.sira" />
            <label for="sira">Sira</label>
          </span>
        </div>
        <div class="column">
          <span class="p-float-label">
            <InputText id="birim" type="text" v-model="urunDetay.birim" />
            <label for="birim">Birim</label>
          </span>
        </div>
        <div class="column">
          <span class="p-float-label">
            <InputText id="tedarikciadi" type="text" v-model="urunDetay.tedarikciadi" />
            <label for="tedarikciadi">Tedarikçi</label>
          </span>
        </div>
    
        <div class="column">
          <Dropdown v-model="renkEs" :options="esRenkListesi" optionLabel="name" placeholder="Select a Color (ES)" />
        </div>
    
      </div>
    </TabPanel>
    <TabPanel header="Diğer" >
      <br />
      <div class="columns">
        <div class="column">
            <div class="columns">
              <div class="column">
                <span class="p-float-label">
                  <AutoComplete id="kenar" v-model="kenarIslem" :suggestions="filterKenarIslemList" optionLabel="name"
                    @item-select="kenarIslemDegisim" />
            
                  <label for="kenar">Kenar İşlem</label>
                </span>
            
              </div>
              <div class="column">
                <Button @click="yuzeyKaydet" label="Ekle" class="p-button-success" :disabled="isyuzeyekle" />
              </div>
              <div class="column">
                <Button @click="yuzeySil" label="Sil" class="p-button-danger" :disabled="isyuzeysil" />
              </div>
            
            </div>
            <DataTable :value="urunDetay.kenarIslemList" dataKey="id" selectionMode="simple" v-model:selection="selectKenarIslem"
              @row-select="kenarIslemDegisim($event)">
              <template #header>
                <div class="columns is-multiline">
                  <div class="column is-12">
                    <span style="font-size: 15px"> EN-İŞLEM </span>
                  </div>
                </div>
              </template>
              <Column field="name" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.name }}
                </template>
              </Column>
            </DataTable>
        </div>
        <div class="column">
          <div class="columns">
            <div class="column">
              <span class="p-float-label">
                <AutoComplete id="ebat" v-model="ebat" :suggestions="filterEbatListesi" optionLabel="name"
                  @item-select="ebatDegisim" />
                
                <label for="ebat">Ebat Ekle</label>
              </span>
            </div>
            <div class="column">
              <span class="p-float-label">
                <InputNumber id="ebat" v-model="ebatFiyat" mode="currency" currency="USD" locale="jp-JP" />

            
                <label for="ebat">Fiyat</label>
              </span>
            </div>
            <div class="column">
              <Button class="p-button-success" @click="ebatKayitIslem" label="Ekle" :disabled="isebatekle"/>
            </div>
            <div class="column">
              <Button class="p-button-danger" @click="ebatSil" label="Sil" :disabled="isebatsil" />
            </div>
            <div class="column">
              <Button class="p-button-info" @click="ebatYenile" label="Yeni" :disabled="isebatyenile" />
            </div>
          </div>
          <DataTable
            :value="urunDetay.ebatlar"
            dataKey="id"
            selectionMode="simple"
            v-model:selection="selectEbat"
            @row-select="ebatDegisim($event)">
            <Column field="ebat" header="Ebat" bodyStyle="text-align:center">
              <template #body="slotProps">
                {{ slotProps.data.ebat }}
              </template>
            </Column>
            <Column field="fiyat" header="Fiyat" bodyStyle="text-align:center">
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.fiyat) }}
              </template>
            </Column>
          </DataTable>


        </div>


      </div>
      

    </TabPanel>
    
    <TabPanel header="Suggested" v-if="urunDetay.urunid!=null" >
        <OnerilenUrun :productlist="onerilernUrunlerList" :urunid="urunDetay.urunid" :kategori_id="urunDetay.kategori_id" />
    </TabPanel>
    <TabPanel header="Fotolar" >
      
      <br />
      <Carousel v-if="fotolist.length>0" :value="fotolist" :numVisible="1" :numScroll="1" orientation="vertical" verticalViewPortHeight="330px"
        :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
           
            <img width="350" height="400" :src="slotProps.data.nocdn" /> 

        </template>
      </Carousel>
      <div class="columns">
        <div class="column">
          <FileUpload mode="basic" @select="fotoGonder($event)" v-model="file" :maxFileSize="5000000" :multiple="true"  />

        </div>
        <div class="column">
        
        </div>
      </div>
    </TabPanel>
    <TabPanel header="Dosya İşlemler">
      <br />
      <div class="columns">
        <div class="column">
          <FileUpload mode="basic" :multiple="true" v-model="testfile" chooseLabel="Test Rapor Gönder" @select="testRaporGonder" />
        </div>
        <div class="column">
        <a ref="testRapor" style="display:none;" class="p-button-primary" :disabled="!urunDetay.testrapor" :href="this.urunDetay.testrapor"
          target="_blank">Görüntüle</a>
         <Button label="Test Rapor Görüntüle" class="p-button-primary" @click="this.$refs.testRapor.click()"/>
        </div>
      </div>
    </TabPanel>
  </TabView>

        <div class="columns">
          <div class="column">
            <Button label="Kaydet" @click="urunIslem" class="p-button-success" />
          </div>
          <div class="column">
            <Button label="Sil" @click="urunSil" class="p-button-danger" />
          </div>
        </div>
</template>
<script>
import mekmarService from "../../service/MekmarService";
import { mapGetters } from "vuex";
// import UrunFotoList from "../../components/mekmarcom/UrunFotoList";
import spaceService from "../../service/SpaceService";
import digitalOceanService from "../../service/DigitalOceanService";
import OnerilenUrun from "../../components/mekmarcom/OnerilenUrun";
import service from "../../service/MekmarPanelService";

export default {
  components: {
    // UrunFotoList,
    OnerilenUrun,
  },
  props: ["yeniurun", "kategoriList"],
  computed: {
    ...mapGetters([
      "urunDetay",
      "onerilenUrunler",
      "benzerUrunler",
      "keyList",
      "enRenkListesi",
      "frRenkListesi",
      "esRenkListesi",
      "ebatListesi",
      "kenarIslemList",
      "fotolist",
      "onerilernUrunlerList",
      "keyListFr",
    ]),
    filterEbatListesi() {
      return this.ebatListesi.filter((option) => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.ebat.toLowerCase()) >= 0
        );
      });
    },
    filterKategoriList() {
      return this.kategoriList.filter((option) => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.onkategori.toLowerCase()) >= 0
        );
      });
    },
    filterProducts() {
      return this.products.filter((option) => {
        return (
          option.urunadi_en
            .toString()
            .toLowerCase()
            .indexOf(this.product.toLowerCase()) >= 0
        );
      });
    },
    filterKenarIslemList() {
      return this.kenarIslemList.filter((option) => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.kenarIslem.toLowerCase()) >= 0
        );
      });
    },
  },
  data() {
    
    return {
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
        },
        {
          breakpoint: '600px',
          numVisible: 2,
          numScroll: 2
        },
        {
          breakpoint: '480px',
          numVisible: 1,
          numScroll: 1
        }
      ],
      stoneType: "",
      loading: false,
      file: null,
      testfile: null,
      kategori: "",
      renkEn: "",
      renkFr: "",
      renkEs: "",
      kenarIslem: "",
      selectKenarIslem: null,
      ebat: "",
      onkategori: "",
      selectEbat: null,
      ebatFiyat: null,
      isyuzeyekle: false,
      isyuzeysil: true,
      isebatekle: true,
      isebatsil: true,
      isfotolist: false,
      keys: null,
      keys_fr: null,
      products: null,
      product: "",
      isproduct: false,
      isebatyenile: false,
      urunKayit: false,
    };
  },
  created() {
    this.urunKayit = this.yeniurun;

    if (!this.yeniurun) {
      this.kategori = this.kategoriList.find(
        (x) => x.kategori_id == this.urunDetay.kategori_id
      ).kategoriadi_en;
      this.stoneType = this.kategoriList.find(
        (x) => x.kategori_id == this.urunDetay.stonetype
      ).kategoriadi_en;
    }

    this.keys = [];
    this.keys_fr = [];
    this.keys_es = [];

    if (this.keyList) {
      if (this.keyList.length > 0) this.keys = this.keyList;
    }
    if (this.keyListFr) {
      if (this.keyListFr.length > 0) this.keys_fr = this.keyListFr;
    }
    if (this.keyListEs) {
      if (this.keyListEs.length > 0) this.keys_es = this.keyListEs;
    }
    if (!this.urunKayit) {
      this.renkFr = this.urunDetay.renk_fr;

      this.renkEn = this.urunDetay.renk_en;
      this.renkEs = this.urunDetay.renk_es;
    }
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    fotoGonder(event) {
      let fotoList = [];
      for (let key in event.files) {
        fotoList.push(event.files[key].name);
      }
      //Foto Kayıt

      mekmarService.fotoKayit(fotoList).then((res) => {
        if (res) {
          setTimeout(() => {
            for (let key in event.files) {
              digitalOceanService.fotoGonder(event.files[key]);
            }
            service.getProductDetailData(this.urunDetay.urunid).then((data) => {
              this.$store.dispatch("loadUrun", data);
            });
          }, 6000);
        }
      });
    },
    fotoListGonder() {
      let fotoList = [];
      for (let key in this.file) {
        fotoList.push(this.file[key].name);

        digitalOceanService.fotoGonder(this.file[key]);
      }
    },
    fotoListAsync() {
      setTimeout(() => {
        this.fotoListGonder();
        alert("İşlem Tamamlandı.");
        this.loading = false;
      }, 5000);
    },
    onKategoriDegisim() {
      if (this.onkategori) {
        this.loading = true;
        mekmarService.getUrunKategoriList(this.onkategori).then((data) => {
          this.products = data.urunList;
          this.isproduct = true;
          this.loading = false;
        });
      }
    },
    testRaporGonder() {
      if (!this.testfile) {
        alert("Rapor seçmeniz gerekiyor.");
        return;
      }

      let formData = new FormData();

      formData.append("file", this.testfile);

      this.loading = true;
      spaceService.testRaporGonder(formData).then((res) => {
        if (res.status) {
          const product = {
            urunid: this.urunDetay.urunid,
            testrapor:
              "https://mekmar-image.fra1.digitaloceanspaces.com/test-reports/" +
              this.testfile.name,
          };

          mekmarService.testRaporDataGuncelle(product).then((data) => {
            if (data.status) {
              this.urunDetay.testrapor = product.testrapor;
              this.loading = false;
            }
          });
        }
      });
    },
    urunIslem() {
      if (this.urunKayit) this.urunKaydet();
      if (!this.urunKayit) this.urunGuncelle();
    },
    urunKaydet() {
      this.loading = true;

      this.anahtarAyarla();

      service.urunKayit(this.urunDetay).then((res) => {
        if (res.status) {
          this.$store.dispatch("setUrunBaslik", `ID : ${res.urunid} `);
          service.getProductDetailData(res.urunid).then((data) => {
            this.$store.dispatch("loadUrun", data);
            this.urunKayit = false;
            this.emitter.emit("urunBilgiGuncelleme");
            this.loading = false;
          });
        }
      });
    },
    urunGuncelle() {
      this.anahtarAyarla();

      this.loading = true;
      service.urunGuncelle(this.urunDetay).then((data) => {
        if (data.status) {
          alert("Ürün Bilgileri Değiştirildi.");
        }

        this.loading = false;
      });
    },
    urunSil() {
      let urunid = this.urunDetay.urunid;

      service.urunSil(urunid).then((data) => {
        if (data.status) {
          alert("Ürün Başarıyla Silindi.");
        }

        this.loading = false;
      });

      window.location.reload(false);
    },
    anahtarAyarla() {
      let anahtar_en = "";
      let anahtar_fr = "";
      let anahtar_es = "";
      if (this.keys) {
        let uzunluk = this.keys.length;
        let indeks = 1;

        if (uzunluk > 0) {
          for (let key in this.keys) {
            anahtar_en += this.keys[key];
            indeks += 1;

            if (uzunluk >= indeks) {
              anahtar_en += ",";
            }
          }
        }
      }
      if (this.keys_fr) {
        let uzunluk = this.keys_fr.length;
        let indeks = 1;

        if (uzunluk > 0) {
          for (let key in this.keys_fr) {
            anahtar_fr += this.keys_fr[key];
            indeks += 1;

            if (uzunluk >= indeks) {
              anahtar_fr += ",";
            }
          }
        }
      }
      if (this.keys_es) {
        let uzunluk = this.keys_es.length;
        let indeks = 1;

        if (uzunluk > 0) {
          for (let key in this.keys_es) {
            anahtar_es += this.keys_es[key];
            indeks += 1;

            if (uzunluk >= indeks) {
              anahtar_es += ",";
            }
          }
        }
      }

      this.urunDetay.kategori_id = this.kategoriList.find(
        (x) => x.kategoriadi_en === this.kategori
      ).kategori_id;
      this.urunDetay.stonetype = this.kategoriList.find(
        (x) => x.kategoriadi_en === this.stoneType
      ).kategori_id;
      this.urunDetay.renk_en = this.renkEn;
      this.urunDetay.renk_fr = this.renkFr;
      this.urunDetay.renk_es = this.renkEs;

      this.urunDetay.anahtarlar_en = anahtar_en;
      this.urunDetay.anahtarlar_fr = anahtar_fr;
      this.urunDetay.anahtarlar_es = anahtar_es;
    },

    kenarIslemDegisim(event) {
      this.kenarIslem = event.value.name;
      this.selectKenarIslem = event.value;
      this.isyuzeyekle = true;
      this.isyuzeysil = false;
    },
    ebatDegisim(event) {
      console.log("ebatDegisim",event)
      this.ebat = event.value.name;
      this.selectEbat = event.value;
      this.ebatFiyat = event.value.value;
      this.isebatekle = false;
      this.isebatsil = false;
    },
    getImgUrl(value) {
      let link = "";
      if (this.fotolist.length) link = this.fotolist[value].nocdn;

      return link;
    },
    ebatKayitIslem() {
      if (this.selectEbat) {
        this.ebatGuncelle();
      } else {
        this.ebatKaydet();
      }
    },
    ebatKaydet() {
      if (!this.ebat || !this.ebatFiyat) {
        alert("Ebat veya fiyatı boş geçemezsiniz.");
        return;
      }

      const ebatData = {
        urunid: this.urunDetay.urunid,
        ebat: this.ebat,
        fiyat: this.ebatFiyat,
        birim: this.urunDetay.birim,
      };
      this.loading = true;
      service.ebatKaydet(ebatData).then((data) => {
        this.urunDetay.ebatlar = data.ebatlist;
        this.ebat = "";
        this.ebatFiyat = null;
        this.isebatsil = true;
        this.isebatekle = true;
        this.isebatyenile = false;
        this.loading = false;
      });
    },
    ebatGuncelle() {
      const ebatData = {
        urunid: this.urunDetay.urunid,
        ebat: this.ebat,
        fiyat: this.ebatFiyat,
        birim: this.urunDetay.birim,
        id: this.selectEbat.id,
      };

      this.loading = true;
      service.ebatGuncelle(ebatData).then((data) => {
        this.urunDetay.ebatlar = data.ebatlist;
        this.ebat = "";
        this.ebatFiyat = null;
        this.isebatsil = true;
        this.isebatekle = true;
        this.isebatyenile = false;
        this.selectEbat = null;
        this.loading = false;
      });
    },
    ebatSil() {
      if (this.selectEbat) {
        this.loading = true;
        let model = {
          urunid: this.urunDetay.urunid,
          id: this.selectEbat.id,
        };
        service.ebatSil(model).then((data) => {
          this.isebatsil = true;
          this.isebatekle = false;

          this.urunDetay.ebatlar = data.ebatlist;
          this.selectEbat = null;
          this.isebatekle = true;
          this.ebat = "";
          this.ebatFiyat = null;
          this.loading = false;
        });
      }
    },
    ebatYenile() {
      this.isebatekle = false;
      this.isebatsil = true;
      this.selectEbat = null;
    },
    yuzeyKaydet() {
      if (!this.kenarIslem) {
        alert("Yüzey işlem seçiniz.");
        return;
      }

      const yuzeyData = {
        islemadi: this.kenarIslem,
        dil: "en",
        kategori_id: this.urunDetay.kategori_id,
        urunid: this.urunDetay.urunid,
      };
      this.loading = true;
      service.kenarIslemKaydet(yuzeyData).then((data) => {
        this.urunDetay.kenarIslemList = data.finishlist;
        this.kenarIslem = "";
        this.loading = false;
      });
    },
    yuzeySil() {
      if (this.selectKenarIslem) {
        this.loading = true;
        let model = {
          id: this.selectKenarIslem.id,
          urunid: this.urunDetay.urunid,
        };
        service.kenarIslemSil(model).then((data) => {
          this.urunDetay.kenarIslemList = data.finishlist;
          this.isyuzeyekle = false;
          this.isyuzeysil = true;
          this.selectKenarIslem = null;
          this.kenarIslem = "";
          this.loading = false;
        });
      }
    },
  },
};
</script>
<style scoped>
.slide-image img {
  width: 100%;
  height: 420px;
  border-radius: 25px;
}
input {
  text-align: center;
}
.kenar-button button {
  margin-top: 30px;
}
.list-image img {
  width: 250px;
  height: 100px;
}
</style>

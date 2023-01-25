<template>
  <div class="columns">
    <div class="column">
      <RadioButton name="city" value="Mekmer+Mekmoz" v-model="status" @change="changeStatus"/> Mekmer + Mekmoz

    </div>
    <div class="column">
      <RadioButton name="city" value="Dis" v-model="status" @change="changeStatus"/> Dışarda Olan Mekmer Kasaları
    </div>
    <div class="column">
      <RadioButton name="city" value="MekmerDis" v-model="status" @change="changeStatus" /> Mekmerde Olan Dış Kasalar
    </div>
  </div>
  <div> 
    <DataTable :value="uretimStok" responsiveLayout="scroll" @row-select="mekmerMekmozSelected($event)" v-if="status == 'Mekmer+Mekmoz'" v-model:selection="mekmerMekmozData" selectionMode="single">
      <Column field="en" header="En"></Column>
      <Column field="boy" header="Boy"></Column>
      <Column field="kenar" header="Kenar"></Column>
      <Column field="urunAdi" header="Ürün Adı"></Column>
      <Column field="yuzeyIslem" header="Yüzey İşlem"></Column>
      <Column field="kasaSayisi" header="Kasa Adedi">
        <template #footer>
          {{ formatDecimal(toplam_kasa_adedi) }}
        </template>
      </Column>
      <Column field="miktar" header="Miktar">
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.miktar) }}
        </template>
        <template #footer>
          {{ formatDecimal(toplam_miktar) }}
        </template>
      </Column>
      <Column field="price" header="Fiyat">
        <template #body="slotProps">
          <div v-if="slotProps.data.price == null">
          {{formatPrice(0) }}

          </div>
          <div v-else>
          {{formatPrice(slotProps.data.price) }}

          </div>
        </template>
      </Column>


    </DataTable>
    <DataTable :value="uretimStok" responsiveLayout="scroll" @row-select="disSelected($event)" v-model:selection="disData" selectionMode="single"
      v-else-if="status == 'Dis'">
      <Column field="en" header="En"></Column>
      <Column field="boy" header="Boy"></Column>
      <Column field="kenar" header="Kenar"></Column>
      <Column field="urunAdi" header="Ürün Adı"></Column>
      <Column field="yuzeyIslem" header="Yüzey İşlem"></Column>
      <Column field="kasaSayisi" header="Kasa Adedi">
        <template #footer>
          {{ formatDecimal(toplam_kasa_adedi) }}
        </template>
      </Column>
      <Column field="miktar" header="Miktar">
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.miktar) }}
        </template>
        <template #footer>
          {{ formatDecimal(toplam_miktar) }}
        </template>
      </Column>
      <Column field="price" header="Fiyat">
        <template #body="slotProps">
          <div v-if="slotProps.data.price == null">
            {{formatPrice(0) }}
    
          </div>
          <div v-else>
            {{formatPrice(slotProps.data.price) }}
    
          </div>
        </template>
      </Column>
    
    
    </DataTable>
    <DataTable :value="uretimStok" responsiveLayout="scroll" @row-select="disMekmerSelected($event)" v-model:selection="disMekmerData"
      selectionMode="single" v-else-if="status == 'MekmerDis'">
      <Column field="en" header="En"></Column>
      <Column field="boy" header="Boy"></Column>
      <Column field="kenar" header="Kenar"></Column>
      <Column field="urunAdi" header="Ürün Adı"></Column>
      <Column field="yuzeyIslem" header="Yüzey İşlem"></Column>
      <Column field="kasaSayisi" header="Kasa Adedi">
        <template #footer>
          {{ formatDecimal(toplam_kasa_adedi) }}
        </template>
      </Column>
      <Column field="miktar" header="Miktar">
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.miktar) }}
        </template>
        <template #footer>
          {{ formatDecimal(toplam_miktar) }}
        </template>
      </Column>
      <Column field="price" header="Fiyat">
        <template #body="slotProps">
          <div v-if="slotProps.data.price == null">
            {{formatPrice(0) }}
    
          </div>
          <div v-else>
            {{formatPrice(slotProps.data.price) }}
    
          </div>
        </template>
      </Column>
    
    
    </DataTable>

    <Dialog v-model:visible="mekmer_mekmoz_form" header="Mekmer + Mekmoz Ayrıntı" :modal="true">
      <Button @click="addPriceForm" class="p-button-info" label="Fiyat Gir" style="margin-left:10px;" />
      <DataTable :value="uretimStokAyrinti"
        responsiveLayout="scroll">
        <Column field="sira" header="Sıra"></Column>
        <Column field="kategoritop" header="Kategori"></Column>
        <Column field="tedarikci_aditop" header="Tedarikçi"></Column>
        <Column field="tarihtop" header="Tarih"></Column>
        <Column field="kasanotop" header="Kasa No"></Column>
        <Column field="urunaditop" header="Ürün Adı"></Column>
        <Column field="ocakaditop" header="Ocak Adı"></Column>
        <Column field="yuzeyislemtop" header="Yüzey"></Column>
        <Column field="entop" header="En"></Column>
        <Column field="boytop" header="Boy"></Column>
        <Column field="kenartop" header="Kenar"></Column>
        <Column field="kutuadettop" header="Kutu Adet">
          <template #footer>
            {{ formatDecimal(kutuAdetTop) }}
          </template>
        </Column>
        <Column field="adettop" header="Adet">
          <template #footer>
            {{ formatDecimal(adetTop) }}
          </template>
        </Column>
        <Column field="miktartop" header="Miktar">
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.miktartop) }}
          </template>
          <template #footer>
            {{ formatDecimal(miktarTop) }}
          </template>
        </Column>
        <Column field="birimaditop" header="Birim"></Column>
        <Column field="durum" header="Durum"></Column>






      </DataTable>
      <Dialog v-model:visible="add_price_form" header="Yeni Fiyat Gir" :modal="true">
        <br />
        <div class="columns">
          <div class="column">
            <span class="p-float-label">
              <InputNumber id="fiyat" v-model="addPrice.price" mode="currency" currency="USD" />
      
              <label for="fiyat">Fiyat</label>
            </span>
          </div>
          <div class="column">
            <Button class="p-button-success" @click="add_price" label="Ekle ve Güncelle" />
      
          </div>
      
        </div>
      </Dialog>
    </Dialog>


  </div>
</template>

<script>
// import store from "@/store";
// import { mapGetters } from "vuex";
import service from "../service/RaporService";

// import StokAyrintiListesi from "../components/stokraporu/StokAyrintiListesi";
// import { FilterMatchMode } from "primevue/api";
// import socket from "@/service/SocketService"
export default {
  data() {
    return {
      uretimStok: [],
      status: "",
      mekmerMekmozData: "",
      disData: "",
      disMekmerData:"",
      toplam_miktar:0,
      toplam_kasa_adedi: 0,
      uretimStokAyrinti: [],
      mekmer_mekmoz_form: false,
      adetTop : 0,
      miktarTop : 0,
      kutuAdetTop: 0,
      add_price_form: false,
      addPrice: {
        price: 0,
        productId: 0
      },
      urunid: 0,
      price:0
    }
  },
  created() {
    this.status = 'Mekmer+Mekmoz'
    this.$store.dispatch('fullscreenLoadingAct', true)

    service.stokRaporAnaListMekmerMekmoz().then(data => {
      this.uretimStok = data
      this.anaListToplami(data)
      this.$store.dispatch('fullscreenLoadingAct', false)

    })
  },
  methods: {
    addPriceForm() {
      this.add_price_form = true
      this.addPrice.price = this.price
    },
    add_price() {
      this.addPrice.productId = this.urunid
      service.setAddPrice(this.addPrice).then(data => {
        if (data) {
          this.$toast.add({ severity: 'success', summary: 'Fiyat Kaydetme', detail: 'Fiyat Kaydetme Başarılı', life: 2000 });
          this.add_price_form = false
          if (this.status == 'Mekmer+Mekmoz') {
            this.$store.dispatch('fullscreenLoadingAct', true)
            service.stokRaporAnaListMekmerMekmoz().then(data => {
              this.uretimStok = data
              this.anaListToplami(data)

              this.$store.dispatch('fullscreenLoadingAct', false)

            })
          } else if (this.status == 'Dis') {
            this.$store.dispatch('fullscreenLoadingAct', true)

            service.stokRaporAnaListDis().then(data => {
              this.uretimStok = data
              this.anaListToplami(data)

              this.$store.dispatch('fullscreenLoadingAct', false)

            })
          } else if (this.status == 'MekmerDis') {
            this.$store.dispatch('fullscreenLoadingAct', true)

            service.stokRaporAnaListDisMekmardaOlanlar().then(data => {
              this.uretimStok = data
              this.anaListToplami(data)
              this.$store.dispatch('fullscreenLoadingAct', false)

            })
          }

        } else {
          this.$toast.add({ severity: 'error', summary: 'Fiyat Kaydetme', detail: 'Fiyat Kaydetme Hata', life: 2000 });

        }
      })


    },
    disMekmerSelected(event) {
      this.price = event.data.price
      this.$store.dispatch('fullscreenLoadingAct', true)
      this.urunid = event.data.urunKartId
      service.stokRaporAnaListDisMekmardaOlanAyrinti(event.data.urunKartId).then(data => {
        this.uretimStokAyrinti = data
        this.ayrintiListToplami(data)

        this.mekmer_mekmoz_form = true
        this.$store.dispatch('fullscreenLoadingAct', false)

      })
    },
    mekmerMekmozSelected(event) {
      this.price = event.data.price
      this.$store.dispatch('fullscreenLoadingAct', true)
      
      this.urunid = event.data.urunKartId

      service.stokRaporAnaListMekmerMekmozAyrinti(event.data.urunKartId).then(data => {
        this.uretimStokAyrinti = data
        this.ayrintiListToplami(data)

        this.mekmer_mekmoz_form = true
        this.$store.dispatch('fullscreenLoadingAct', false)


      })
    },
    disSelected(event) {
      this.price = event.data.price
      this.$store.dispatch('fullscreenLoadingAct', true)
      this.urunid = event.data.urunKartId

      service.stokRaporAnaListDisAyrinti(event.data.urunKartId).then(data => {
        this.uretimStokAyrinti = data
        this.ayrintiListToplami(data)

        this.mekmer_mekmoz_form = true
        this.$store.dispatch('fullscreenLoadingAct', false)

      })

    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    anaListToplami(data) {
      this.toplam_miktar = 0;
      this.toplam_kasa_adedi = 0;
      for (let i of data) {
        this.toplam_miktar += i.miktar;
        this.toplam_kasa_adedi += i.kasaSayisi
      }
    },
    ayrintiListToplami(data) {
      this.adetTop = 0;
      this.miktarTop = 0;
      this.kutuAdetTop = 0;
      for (let i of data) {
        this.adetTop += i.adettop;
        this.miktarTop += i.miktartop;
        this.kutuAdetTop += i.kutuadettop;
      }
    },

    changeStatus() {
      if (this.status == 'Mekmer+Mekmoz') {
        this.$store.dispatch('fullscreenLoadingAct',true)
        service.stokRaporAnaListMekmerMekmoz().then(data => {
          this.uretimStok = data
          this.anaListToplami(data)

          this.$store.dispatch('fullscreenLoadingAct', false)

        })
      } else if (this.status == 'Dis') {
        this.$store.dispatch('fullscreenLoadingAct', true)

        service.stokRaporAnaListDis().then(data => {
          this.uretimStok = data
          this.anaListToplami(data)

          this.$store.dispatch('fullscreenLoadingAct', false)

        })
      } else if (this.status == 'MekmerDis') {
        this.$store.dispatch('fullscreenLoadingAct', true)

        service.stokRaporAnaListDisMekmardaOlanlar().then(data => {
          this.uretimStok = data
          this.anaListToplami(data)
          this.$store.dispatch('fullscreenLoadingAct', false)

        })
      }
    }
  }

}
</script>

<style scoped>

</style>
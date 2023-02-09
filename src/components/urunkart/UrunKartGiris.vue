<template>
  <br />
  <div class="grid">
    <div class="col"  v-if="seleksiyonKasaKontrol"
        style="background-color: red; color: white; text-align: center">
      {{ kontrolText }}
    </div>
  </div>
  <br/>
  <div class="grid">
    <div class="col-4" style="margin-top:10px;">
      <span class="p-float-label">
        <AutoComplete id="kategori" v-model="kategori" :suggestions="filterKategoriList" field="kategoriAdi" :dropdown="true"
          @complete="aramaKategori($event)" @item-select="kategoriDegisim"
          :class="{ 'p-invalid': v$.kategori.$invalid && submitted }" />
        <label for="kategori">Kategori Adı</label>
      </span>
    </div>
    <div class="col-4 " style="margin-top:10px;">
      <span class="p-float-label">
        <AutoComplete id="urun" v-model="urun" :suggestions="filterUrunList" field="urunAdi" :dropdown="true"
          @complete="aramaUrun($event)" @item-select="urunDegisim" :class="{ 'p-invalid': v$.urun.$invalid && submitted }" />
        <label for="urun">Ürün Adı</label>
      </span>
    </div>
    <div class="col-4" style="margin-top:10px;">
      <span class="p-float-label">
        <AutoComplete id="yuzey" v-model="yuzeyIslem" :suggestions="filterYuzeyIslemList" field="yuzeyIslemAdi"
          :dropdown="true" @complete="aramaYuzeyIslem($event)" @item-select="yuzeyIslemDegisim" @input="isYuzeyBosluk"
          :class="{ 'p-invalid': v$.yuzeyIslem.$invalid && submitted }" />
        <label for="yuzey">Yüzey İşlem</label>
      </span>
    </div>  
    <div class="col-4" style="margin-top:10px;">
      <span class="p-float-label">
        <AutoComplete id="en" v-model="en" :suggestions="filterEnList" field="en" :dropdown="true" @complete="aramaEn($event)"
          @input="isChangeEn" :class="{ 'p-invalid': v$.en.$invalid && submitted }" />
        <label for="en">En</label>
      </span>
    </div>
    <div class="col-4" style="margin-top:10px;">
      <span class="p-float-label">
        <AutoComplete id="boy" v-model="boy" :suggestions="filterBoyList" field="boy" @input="isChangeBoy" :dropdown="true"
          @complete="aramaBoy($event)" :class="{ 'p-invalid': v$.boy.$invalid && submitted }" />
        <label for="boy">Boy</label>
      </span>
    </div>
    <div class="col-4" style="margin-top:10px;">
      <span class="p-float-label">
        <AutoComplete id="kenar" v-model="kenar" :suggestions="filterKenarList" field="kenar" :dropdown="true"
          @complete="aramaKenar($event)" @input="isChangeKenar" :class="{ 'p-invalid': v$.kenar.$invalid && submitted }" />
        <label for="kenar">Kenar</label>
      </span>
    </div>

  </div>
  <div class="grid">
    <div class="col">
      <Button class="p-button-success" @click="urunKartKayitIslemi" label="Kaydet"/>

    </div>
  </div>
  <br/>
  <div class="grid">
    <div class="col">
      <DataTable v-model:value="musteriSatisListesi" :paginator="false" dataKey="id" :scrollable="true" scrollHeight="310px">
        <Column field="musteriAdi" header="Firma">
          <template #body="slotProps">
            {{ slotProps.data.musteriAdi }}
          </template>
        </Column>
        <Column field="siparisNo" header="Po" bodyStyle="text-align:center" headerStyle="width:100px;">
          <template #body="slotProps">
            {{ slotProps.data.siparisNo }}
          </template>
        </Column>
        <Column field="satisFiyati" header="Fiyat" bodyStyle="text-align:center" headerStyle="width:90px;">
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.satisFiyati) }}
          </template>
        </Column>
        <Column field="miktar" header="Miktar" bodyStyle="text-align:center" headerStyle="width:90px;">
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.miktar) }}
          </template>
        </Column>
        <Column field="tarih" header="Sevk Tarih" bodyStyle="text-align:center" headerStyle="width:120px;">
          <template #body="slotProps">
            {{ slotProps.data.tarih }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>


</template>
<script>
import urunKartService from "@/service/UrunKartService";
import socket from "@/service/SocketService";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      kategori: { required },
      urun: { required },
      en: { required },
      boy: { required },
      kenar: { required },
      yuzeyIslem: { required },
    };
  },
  created() {
    this.username = this.$store.getters.__getUsername;
    if (
      this.username == "Semih" ||
      this.username == "Gizem"
    ) {
      this.isVisible = true;

    }
  },
  data() {
    return {
      disKaydet:true,
      isVisible:false,
      disSil: true,
      submitted: false,
      kontrolText: "Bu ürün kartına ait kasa bulunmaktadır!",
      kategori: null,
      kategoriList: null,
      filterKategoriList: null,
      urunKart: null,
      musteriSatisListesi: null,
      urun: null,
      filterUrunList: null,
      urunList: null,
      en: null,
      filterEnList: null,
      enList: null,
      boy: null,
      filterBoyList: null,
      boyList: null,
      kenar: null,
      filterKenarList: null,
      kenarList: null,
      yuzeyIslem: null,
      filterYuzeyIslemList: null,
      yuzeyIslemList: null,
      seleksiyonKasaKontrol: false,
      username: null,
    };
  },
  props: {
    yeniKayit: {
      type: Boolean,
      default: true,
    },
    urunKartId: {
      type: Number,
      default: 0,
    },
    isMobile: {
      type: Number,
    },
  },
  methods: {
    urunKartSil() {
      if (confirm('Gerçekten Silmek İstediğinize Emin misiniz?')) {
        this.$store.dispatch('fullscreenLoadingAct', true)

        urunKartService.getSeleksiyonKasaKontrol(this.urunKartId).then((data) => {
          if (data) {
            this.$store.dispatch('fullscreenLoadingAct', false)

            alert("Bu ürün kartına ait kasa mevcut..");
          } else {
            this.$store.dispatch('fullscreenLoadingAct', true)

            urunKartService
              .setUrunKartSil(this.urunKartId, this.username)
              .then((data) => {
                if (data.status) {
                  socket.siparis.emit('urunKartiSilmeEvent')

                  socket.siparis.emit(
                    "anaSayfaDegisiklikEvent",
                    data.anaSayfaDegisiklik
                  );
                  this.$store.dispatch('fullscreenLoadingAct', false)

                  this.$toast.add({
                    severity: "error",
                    summary: "Uyarı Ekranı",
                    detail: "Urun Kartı Silindi",
                    life: 5000,
                  });

                }
                  this.emitter.emit('silme_dialog_disabled',false)
              });
          }
        });


      }
      
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    isChangeEn(event) {
      this.en = event.replace(".", ",").trim();
    },
    isChangeBoy(event) {
      this.boy = event.replace(".", ",").trim();
    },
    isChangeKenar(event) {
      this.kenar = event.replace(".", ",").trim();
    },
    isYuzeyBosluk(event) {
      this.yuzeyIslem = event.trim();
    },
    aramaKategori(event) {
      setTimeout(() => {
        let result;
        if (event.query.length == 0) result = this.kategoriList;
        else {
          result = this.kategoriList.filter((x) => {
            return x.kategoriAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }
        this.filterKategoriList = result;
      }, 250);
    },
    kategoriDegisim() {
      this.urunKart.kategoriId = this.kategori.id;
    },
    aramaUrun(event) {
      setTimeout(() => {
        let result;
        if (event.query.length == 0) result = [...this.urunList];
        else {
          result = this.urunList.filter((x) => {
            return x.urunAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }
        this.filterUrunList = result;
      }, 250);
    },
    urunDegisim() {
      this.urunKart.urunId = this.urun.id;
    },
    aramaEn(event) {
      setTimeout(() => {
        let result;
        if (event.query.length == 0) result = [...this.enList];
        else {
          result = this.enList.filter((x) => {
            return x.en.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
        this.filterEnList = result;
      }, 250);
    },
    aramaBoy(event) {
      setTimeout(() => {
        let result;
        if (event.query.length == 0) result = [...this.boyList];
        else {
          result = this.boyList.filter((x) => {
            return x.boy.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
        this.filterBoyList = result;
      }, 250);
    },
    aramaKenar(event) {
      setTimeout(() => {
        let result;
        if (event.query.length == 0) result = [...this.kenarList];
        else {
          result = this.kenarList.filter((x) => {
            return x.kenar.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
        this.filterKenarList = result;
      }, 250);
    },
   
    aramaYuzeyIslem(event) {
      setTimeout(() => {
        let result;
        if (event.query.length == 0) result = [...this.yuzeyIslemList];
        else {
          result = this.yuzeyIslemList.filter((x) => {
            return x.yuzeyIslemAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }
        this.filterYuzeyIslemList = result;
      }, 250);
    },
    yuzeyIslemDegisim() {
      this.urunKart.yuzeyId = this.yuzeyIslem.id;
    },
    urunKartKayitIslemi() {
      this.submitted = true;
      if (this.v$.$invalid) {
        this.$toast.add({
          severity: "error",
          summary: "Zorunlu Alanlar",
          detail: "Zorunlu alanları doldurunuz!",
          life: 3000,
        });
      } else {
        this.urunKart.en = this.en.en ? this.en.en : this.en;
        this.urunKart.boy = this.boy.boy ? this.boy.boy : this.boy;
        this.urunKart.kategoriAdi = this.kategori.kategoriAdi
          ? this.kategori.kategoriAdi
          : this.kategori;
        this.urunKart.yuzeyIslem = this.yuzeyIslem.yuzeyIslemAdi
          ? this.yuzeyIslem.yuzeyIslemAdi
          : this.yuzeyIslem;
        this.urunKart.urunAdi = this.urun.urunAdi
          ? this.urun.urunAdi
          : this.urun;
        if (this.kenar) {
          this.urunKart.kenar = this.kenar.kenar
            ? this.kenar.kenar
            : this.kenar;
        }
        if (this.yeniKayit) this.yeniKayitIslem();
        else this.guncellemeIslem();
      }
    },
    yeniKayitIslem() {
      this.urunKart.username = this.username;
      this.$store.dispatch('fullscreenLoadingAct', true)

      urunKartService.setUrunKaydet(this.urunKart).then((data) => {
        if (data.kayitDurum) {
          this.$store.dispatch('fullscreenLoadingAct', false)

          this.$toast.add({
            severity: "success",
            summary: "Bilgi Ekranı",
            detail: "Ürün Kartı Kaydedildi.",
            life: 5000,
          });
          socket.siparis.emit("urunkart_yeni_event", data.data);
          socket.siparis.emit(
            "anaSayfaDegisiklikEvent",
            data.anaSayfaDegisiklik
          );
          this.$store.dispatch('datatableLoadingEndAct')

        } else {
          let mesaj =
            "Sunucu Kayıt İşlemini Yapamadı . Sunucudan dönen hata : " +
            data.hataMesaj;
          this.$store.dispatch('fullscreenLoadingAct', false)

          this.$toast.add({
            severity: "error",
            summary: "Uyarı Ekranı",
            detail: mesaj,
            life: 5000,
          });
          

        }
      });
    },
    guncellemeIslem() {
      this.urunKart.username = this.username;
      this.$store.dispatch('fullscreenLoadingAct', true)


      urunKartService.setUrunGuncelle(this.urunKart).then((data) => {
        if (data.kayitDurum) {
          this.$store.dispatch('fullscreenLoadingAct', false)

          this.$toast.add({
            severity: "success",
            summary: "Bilgi Ekranı",
            detail: "Ürün Kartı Değiştirildi.",
            life: 5000,
          });
          socket.siparis.emit("urunkart_guncelleme_event", data.data);
          socket.siparis.emit(
            "anaSayfaDegisiklikEvent",
            data.anaSayfaDegisiklik
          );
          

        } else {
          let mesaj =
            "Sunucu Güncelleme İşlemini Yapamadı . Sunucudan dönen hata : " +
            data.hataMesaj;
          this.$store.dispatch('fullscreenLoadingAct', false)

          this.$toast.add({
            severity: "error",
            summary: "Uyarı Ekranı",
            detail: mesaj,
            life: 5000,
          });

        }
      });
    },
  },
  mounted() {
    
    this.username = this.$store.getters.__getUsername.toUpperCase();
    this.emitter.on("seleksiyonKasaKontrol", (data) => {
      this.seleksiyonKasaKontrol = data;
    });
    if (!this.yeniKayit) {
      urunKartService.getUrunKart(this.urunKartId).then((data) => {
        this.urunKart = data;
      });
      urunKartService.getUrunDetayList(this.urunKartId).then((data) => {
        this.kategoriList = data.kategoriList;
        this.musteriSatisListesi = data.musteriSatisList;
        this.urunList = data.urunList;
        this.yuzeyIslemList = data.yuzeyList;
        this.enList = [];
        this.boyList = [];
        this.kenarList = [];
        for (let key in data.olcuList) {
          const item = data.olcuList[key];
          let _en = this.enList.find((x) => x.en == item.en);
          let _boy = this.boyList.find((x) => x.boy == item.boy);
          let _kenar = this.kenarList.find((x) => x.kenar == item);
          if (_en == null) this.enList.push(item);
          if (_boy == null) this.boyList.push(item);
          if (_kenar == null) this.kenarList.push(item);
        }
        //ilgili alanların doldurulması
        this.kategori = this.kategoriList.find(
          (x) => x.id == this.urunKart.kategoriId
        );
        this.urun = this.urunList.find((x) => x.id == this.urunKart.urunId);
        this.en = this.enList.find((x) => x.id == this.urunKart.olcuId);
        this.boy = this.boyList.find((x) => x.id == this.urunKart.olcuId);
        this.kenar = this.kenarList.find((x) => x.id == this.urunKart.olcuId);
        if (this.en == null || this.boy == null) {
          this.en = this.kenar.en;
          this.boy = this.kenar.boy;
        }
        this.yuzeyIslem = this.yuzeyIslemList.find(
          (x) => x.id == this.urunKart.yuzeyId
        );
        this.disSil = false
        this.disKaydet = false
        this.$store.dispatch('fullscreenLoadingAct', false)


      });
    } else {
      urunKartService.getUrunKartModel().then((data) => {
        this.urunKart = data;
      });
      urunKartService.getUrunDetayListYeni().then((data) => {
        this.kategoriList = data.kategoriList;
        this.urunList = data.urunList;
        this.yuzeyIslemList = data.yuzeyList;
        this.enList = [];
        this.boyList = [];
        this.kenarList = [];
        for (let key in data.olcuList) {
          const item = data.olcuList[key];
          let _en = this.enList.find((x) => x.en == item.en);
          let _boy = this.boyList.find((x) => x.boy == item.boy);
          let _kenar = this.kenarList.find((x) => x.kenar == item);
          if (_en == null) this.enList.push(item);
          if (_boy == null) this.boyList.push(item);
          if (_kenar == null) this.kenarList.push(item);
        }
        this.disSil = false
        this.disKaydet = false

      });
    }
  },
};
</script>
<style scoped>
label {
  justify-content: center;
  display: flex;
  font-weight: bold;
}
</style>

<template>
  <section>
    <div class="columns is-multiline is-centered">
      <div class="column is-2">
        <div class="columns">
          <div class="column">
            <Calendar v-model="ilk_tarih" />
          </div>
          <div class="column">
            <Button
              class="p-button-secondary"
              label="Temizle"
              @click="ilk_tarih = null"
            />
          </div>
        </div>
      </div>
      <div class="column is-2">
        <div class="columns">
          <div class="column">
            <Calendar v-model="son_tarih" />
          </div>
          <div class="column">
            <Button
              class="p-button-secondary"
              label="Temizle"
              @click="son_tarih = null"
            />
          </div>
        </div>
      </div>
      <div class="column is-2">
        <Button
          class="p-button-secondary"
          @click="rapor_tarih_suz_click"
          label="İşlem Yap"
        />
      </div>
      <div class="column is-1">
        <Button
          class="p-button-secondary"
          @click="excel_cikti_click"
          label="Excell"
        />
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-12">
        <DataTable
          :value="uretim_rapor_list_all"
          :paginator="true"
          :rows="15"
          v-model:filters="filters"
          filterDisplay="menu"
          ref="uretim_tablo"
          @row-select="isUretimListSelected"
          selectionMode="single"
          dataKey="id"
          @filter="isUretimList"
          responsiveLayout="scroll"
        >
          <Column
            field="tarih"
            header="Tarih"
            headerStyle="width:11%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.tarih }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by Date"
              />
            </template>
          </Column>
          <Column
            field="kimden"
            header="Kimden"
            headerStyle="width:10%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.kimden }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by Representative"
              />
            </template>
          </Column>

          <Column
            field="urunKartID"
            header="Ürün Kart Id"
            headerStyle="width:10%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.urunKartID }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by Product Id"
              />
            </template>
          </Column>

          <Column
            field="kategori"
            header="Kategori"
            headerStyle="width:14%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.kategori }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by Category"
              />
            </template>
          </Column>
          <Column
            field="kasano"
            header="No"
            headerStyle="width:10%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.kasano }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by Crate No"
              />
            </template>
          </Column>
          <Column
            field="urunadi"
            header="Ürün"
            headerStyle="width:14%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.urunadi }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by Product"
              />
            </template>
          </Column>
          <Column
            field="ocakadi"
            header="Ocak"
            headerStyle="width:10%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.ocakadi }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by Quarry"
              />
            </template>
          </Column>
          <Column
            field="yuzeyadi"
            header="İşlem"
            headerStyle="width:27%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.yuzeyadi }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by Surface"
              />
            </template>
          </Column>
          <Column
            field="en"
            header="En"
            headerStyle="width:10%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.en }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by Width"
              />
            </template>
          </Column>
          <Column
            field="boy"
            header="Boy"
            headerStyle="width:10%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.boy }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by Height"
              />
            </template>
          </Column>
          <Column
            field="kenar"
            header="Kenar"
            headerStyle="width:10%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.kenar }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by Edge"
              />
            </template>
          </Column>
          <Column
            field="adet"
            header="K.Adet"
            headerStyle="width:10%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.adet }}
            </template>
          </Column>
          <Column
            field="miktar"
            header="Miktar"
            headerStyle="width:10%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.miktar) }}
            </template>

            <template #footer>
              {{ formatDecimal(uretim_toplami) }}
            </template>
          </Column>
          <Column
            field="birimadi"
            header="Birim"
            headerStyle="width:10%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.birimadi }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by Unit"
              />
            </template>
          </Column>
          <Column
            field="siparisno"
            header="Po"
            headerStyle="width:11%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.siparisno }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by PO"
              />
            </template>
          </Column>
          <Column
            field="aciklama"
            header="Not"
            headerStyle="width:11%"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              <div class="mobil">
                {{ slotProps.data.aciklama }}
              </div>
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by Description"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <div>
      <Dialog
        v-model:visible="is_uretim_form"
        header="Kasa Bilgisi Değiştirme"
        :modal="true"
        maximizable
        position="top"
      >
        <div style="text-align: center">
          {{ kasaNo }} Kasasına Ait Ürün Kart Id : {{ yeniUrunKartID }}
        </div>
        <div
          class="columns gridline"
          style="margin-top: 10px; margin-left: 70px"
        >
          <div class="column">
            <span class="p-float-label">
              <InputText
                id="kategori"
                type="text"
                v-model="kategori"
                :disabled="true"
              />
              <label for="kategori">Kategori</label>
            </span>
          </div>
          <div class="column">
            <span class="p-float-label">
              <InputText
                id="urunBilgisi"
                type="text"
                v-model="urunBilgisi"
                :disabled="true"
              />
              <label for="urunBilgisi">Ürün Bilgisi</label>
            </span>
          </div>
          <div class="column">
            <span class="p-float-label">
              <InputText
                id="yuzey"
                type="text"
                v-model="yuzey"
                :disabled="true"
              />
              <label for="yuzey">Yüzey</label>
            </span>
          </div>
          <div class="column">
            <span class="p-float-label">
              <InputText
                id="olcu"
                type="text"
                v-model="olcu"
                :disabled="true"
              />
              <label for="olcu">Ölçü</label>
            </span>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-2">
            <Button
              @click="showUrunKartList"
              label="Yeni Ürün Kartı Seç"
            ></Button>
          </div>
          <div class="column is-2">
            <Button
              class="p-button-warning"
              @click="guncelle"
              :disabled="urunKartGuncelleButtonForm"
              label="Ürün Kartını Güncelle"
            ></Button>
          </div>
        </div>
      </Dialog>
    </div>
    <UrunKartMenu @urunKartSelect="urunkart_change_event($event)" />
  </section>
</template>
<script>
import service from "../service/RaporService";
import LocalService from "../service/LocalService";
import UrunKartMenu from "../components/shared/UrunKartMenu";
import UrunKartService from "../service/UrunKartService";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    UrunKartMenu,
  },
  computed: {
    ...mapGetters(["uretim_rapor_list_all"]),
  },
  data() {
    return {
      isMobile: null,
      yeniUrunKartID: 0,
      urunKartGuncelleButtonForm: true,
      kasaNo: 0,
      kategori: "",
      urunBilgisi: "",
      yuzey: "",
      olcu: "",
      is_uretim_form: false,
      uretim_listesi: null,
      filter_uretim_listesi: null,
      is_filter_uretim: false,
      loading: false,
      uretim_toplami: 0,
      filters: {
        tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kimden: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunKartID: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kategori: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kasano: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ocakadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        yuzeyadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        birimadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparisno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        aciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      ilk_tarih: null,
      son_tarih: null,
      is_islem: true,
      select_yil: null,
      yil_listesi: [
        "2022",
        "2021",
        "2020",
        "2019",
        "2018",
        "2017",
        "2016",
        "2015",
        "2014",
        "2013",
        "2012",
      ],
      username: "",
    };
  },
  localService: null,
  created() {
    this.username = this.$store.getters.__getUsername;
    this.localService = new LocalService();
    this.getUretimRaporHepsi();
    UrunKartService.getUrunKartMenuList().then((data) => {
      this.$store.dispatch("isUrunKartLoad");
      this.$store.dispatch("urunKartMenuAct", data);
    });
  },
  methods: {
    isUretimList(event) {
      this.tablo_toplam_guncelle(event.filteredValue);
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getUretimRaporHepsi() {
      this.$store.dispatch("fullscreenLoadingAct",true);

      service.getUretimRaporuHepsi().then((data) => {
        this.$store.dispatch("uretim_rapor_list_load_act", data);
        this.is_islem = false;
        this.is_excel = false;
        this.is_form = false;
        this.tablo_toplam_guncelle(this.uretim_listesi);
        this.$store.dispatch("fullscreenLoadingAct",false);
      });
    },
    guncelle() {
      UrunKartService.setKasaYeniUrunKart(
        this.kasaNo,
        this.yeniUrunKartID,
        this.username
      ).then((data) => {
        if (data.status) {
          this.$toast.add({
            severity: "success",
            summary: "Bilgi Ekranı",
            detail: "Kasa Ürün Kartı Güncellendi.",
            life: 5000,
          });
          this.$store.dispatch("uretim_rapor_list_load_act", data.datas);
          this.is_uretim_form = false;
        } else {
          this.$toast.add({
            severity: "danger",
            summary: "Bilgi Ekranı",
            detail: "Kasa Ürün Kartı Güncelleme Hata.",
            life: 5000,
          });
        }
      });
      this.urunKartGuncelleButtonForm = true;
    },
    urunkart_change_event(event) {
      this.yeniUrunKartID = event;
      UrunKartService.getUrunKart(event).then((data) => {
        this.kategori = data.kategoriAdi;
        this.urunBilgisi = data.urunAdi;
        this.yuzey = data.yuzeyIslem;
        this.olcu = data.en + "x" + data.boy + "x" + data.kenar;
        this.urunKartGuncelleButtonForm = false;
      });
    },
    isUretimListSelected(event) {
      if (this.username == "Semih" || this.username == "Gizem") {
        this.kategori = event.data.kategori;
        this.urunBilgisi = event.data.urunadi;
        this.yuzey = event.data.yuzeyadi;
        this.olcu =
          event.data.en + "x" + event.data.boy + "x" + event.data.kenar;
        this.kasaNo = event.data.kasano;
        this.yeniUrunKartID = event.data.urunKartID;
        this.is_uretim_form = true;
      }
    },
    showUrunKartList() {
      this.emitter.emit("uretimRaporUrunKartShow");
    },
    excel_cikti_click() {
      this.$store.dispatch("fullscreenLoadingAct",true)

      this.is_excel = true;
      const data = this.uretim_rapor_list_all;
      service.getUretimRaporExcel(data).then((responce) => {
        if (responce.status) {
          const link = document.createElement("a");
          link.href =
            this.$store.getters.servis_adres +
            "raporlar/dosyalar/uretimRaporExcelListe";

          link.setAttribute("download", "uretim_rapor_listesi.xlsx");
          document.body.appendChild(link);
          link.click();
          this.is_excel = false;
          this.$store.dispatch("fullscreenLoadingAct",false)
        }
      });
    },

    tablo_toplam_guncelle(liste) {
      this.uretim_toplami = 0;

      for (let key in liste) {
        this.uretim_toplami += liste[key].miktar;
      }
    },
    uretim_tablo_filter_event(event) {
      this.tablo_toplam_guncelle(event.filterValue);
    },
    rapor_tarih_suz_click() {
      if (this.son_tarih && !this.ilk_tarih) {
        this.is_islem = true;
        let tarih = this.localService.getDateString(this.son_tarih);
        this.$store.dispatch("fullscreenLoadingAct",true)
        service.getUretimRaporTarih(tarih).then((data) => {
          this.$store.dispatch("uretim_rapor_list_load_act", data);
          

          this.is_filter_uretim = true;
          this.$refs.uretim_tablo.value = data;
          this.tablo_toplam_guncelle(data);
          this.is_islem = false;
          this.$store.dispatch("fullscreenLoadingAct", false)
        });
      }
      if (!this.son_tarih && !this.ilk_tarih) {
        this.is_filter_uretim = false;
        this.$refs.uretim_tablo.value = this.uretim_listesi;
        this.tablo_toplam_guncelle(this.uretim_listesi);
      }
      if (this.ilk_tarih && !this.son_tarih) {
        this.is_filter_uretim = false;
        this.$refs.uretim_tablo.value = this.uretim_listesi;
        this.tablo_toplam_guncelle(this.uretim_listesi);
      }
      if (this.ilk_tarih && this.son_tarih) {
        this.is_islem = true;

        let son_tarih = this.localService.getDateString(this.son_tarih);
        let ilk_tarih = this.localService.getDateString(this.ilk_tarih);
        this.$store.dispatch("fullscreenLoadingAct",true)

        service.getUretimRaporIkiTarih(ilk_tarih, son_tarih).then((data) => {
          this.is_filter_uretim = true;
          this.$store.dispatch("uretim_rapor_list_load_act", data);

          this.$refs.uretim_tablo.value = data;
          this.tablo_toplam_guncelle(data);
          this.is_islem = false;
          this.$store.dispatch("fullscreenLoadingAct", false)

        });
      }
    },
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 10px;
}
.p-column-filter {
  font-size: 10px;
}
.page-button {
  margin-top: 25px;
}
.page-button-excell {
  margin-left: -100px;
}
.mobil {
  text-align: left;
  word-break: break-all;
  font-size: 9px;
}
</style>

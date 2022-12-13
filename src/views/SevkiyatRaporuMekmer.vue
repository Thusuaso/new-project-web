<template>
  <section>
    <div class="columns is-multiline is-centered">
      <div class="column is-1">
        <span style="margin-right:10px;">Hepsi</span>
        <Checkbox v-model="isAll" @change="isAllSelected" :binary="true" />
      </div>
      <div class="column is-2">
        <Dropdown
          v-model="select_yil"
          @change="YilSecim(select_yil.yil)"
          :options="yil_listesi"
          optionLabel="yil"
          placeholder="Select a Year"
        />
      </div>

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
      <div class="column is-2">
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
          v-model:filters="filters"
          :value="stok_rapor_list_all"
          :paginator="true"
          :rows="15"
          ref="sevkiyat_tablo"
          @row-select="isSevkiyatListSelected"
          selectionMode="single"
          filterDisplay="menu"
          @filter="isSevkiyatList"
          :loading="$store.getters.datatableLoading"
        >
          <Column
            field="tarih"
            header="Tarih"
            bodyStyle="text-align:center"
            headerStyle="width:14%"
          >
            <template #body="slotProps">
              {{ slotProps.data.tarih }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Date"
              />
            </template>
          </Column>
          <Column field="musteriadi" header="Kime" headerStyle="width:15%">
            <template #body="slotProps">
              {{ slotProps.data.musteriadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Customer"
              />
            </template>
          </Column>
          <Column field="kimden" header="Kimden" headerStyle="width:14%">
            <template #body="slotProps">
              {{ slotProps.data.kimden }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Representative"
              />
            </template>
          </Column>

          <Column
            field="urunKartID"
            header="Ürün Kart Id"
            headerStyle="width:14%"
          >
            <template #body="slotProps">
              {{ slotProps.data.urunKartID }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Product Id"
              />
            </template>
          </Column>
          <Column field="kategori" header="Kategori" headerStyle="width:14%">
            <template #body="slotProps">
              {{ slotProps.data.kategori }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Category"
              />
            </template>
          </Column>
          <Column
            field="kasano"
            header="No"
            headerStyle="width:13%"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.kasano }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Crate"
              />
            </template>
          </Column>
          <Column field="urunadi" header="Ürün" headerStyle="width:15%">
            <template #body="slotProps">
              {{ slotProps.data.urunadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Product"
              />
            </template>
          </Column>
          <Column field="ocakadi" header="Ocak" headerStyle="width:15%">
            <template #body="slotProps">
              {{ slotProps.data.ocakadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Quarry"
              />
            </template>
          </Column>
          <Column field="yuzeyadi" header="İşlem" headerStyle="width:27%">
            <template #body="slotProps">
              {{ slotProps.data.yuzeyadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Surface"
              />
            </template>
          </Column>
          <Column
            field="en"
            header="E"
            bodyStyle="text-align:center"
            headerStyle="width:11%"
          >
            <template #body="slotProps">
              {{ slotProps.data.en }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Width"
              />
            </template>
          </Column>
          <Column
            field="boy"
            header="B"
            bodyStyle="text-align:center"
            headerStyle="width:11%"
          >
            <template #body="slotProps">
              {{ slotProps.data.boy }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Height"
              />
            </template>
          </Column>
          <Column
            field="kenar"
            header="K"
            bodyStyle="text-align:center"
            headerStyle="width:10%"
          >
            <template #body="slotProps">
              {{ slotProps.data.kenar }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Edge"
              />
            </template>
          </Column>
          <Column
            field="adet"
            header="K.Adet"
            bodyStyle="text-align:center"
            headerStyle="width:11%"
          >
            <template #body="slotProps">
              {{ slotProps.data.adet }}
            </template>
          </Column>

          <Column
            field="miktar"
            header="Miktar"
            bodyStyle="text-align:center"
            headerStyle="width:13%"
          >
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.miktar) }}
            </template>
            <template #footer>
              {{ formatDecimal(miktar_toplam) }}
            </template>
          </Column>
          <Column
            field="birimadi"
            header="Birim"
            bodyStyle="text-align:center"
            headerStyle="width:11%"
          >
            <template #body="slotProps">
              {{ slotProps.data.birimadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Unit"
              />
            </template>
          </Column>
          <Column field="siparisno" header="Po" headerStyle="width:15%">
            <template #body="slotProps">
              {{ slotProps.data.siparisno }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by PO"
              />
            </template>
          </Column>
          <Column field="birimfiyat" header="B.Fiyat" headerStyle="width:11%">
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.birimfiyat) }}
            </template>
          </Column>
          <Column field="toplam" header="Toplam" headerStyle="width:16%">
            <template #body="slotProps">
              {{ slotProps.data.toplam }}
            </template>
            <template #footer>
              {{ formatPrice(tutar_toplam) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <div>
      <Dialog
        v-model:visible="is_uretim_form"
        :modal="true"
        header="Kasa Bilgisi Değiştirme"
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
import { mapGetters } from "vuex";
import UrunKartMenu from "../components/shared/UrunKartMenu.vue";
import UrunKartService from "../service/UrunKartService";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    UrunKartMenu,
  },
  data() {
    return {
      yeniUrunKartID: 0,
      kasaNo: 0,
      is_uretim_form: false,
      urunKartGuncelleButtonForm: true,
      username: "",
      isAll: false,
      filters: {
        tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
      },
      sevkiyat_listesi: null,
      filter_sevkiyat_listesi: null,
      is_filter_sevkiyat: false,
      loading: false,
      ilk_tarih: null,
      son_tarih: null,
      is_form: true,
      is_excel: true,
      is_islem: true,
      miktar_toplam: 0,
      tutar_toplam: 0,
      select_yil: { yil: "2022" },
      yil_listesi: [
        { yil: "2022" },
        { yil: "2021" },
        { yil: "2020" },
        { yil: "2019" },
        { yil: "2018" },
        { yil: "2017" },
        { yil: "2016" },
        { yil: "2015" },
        { yil: "2014" },
        { yil: "2013" },
        { yil: "2012" },
      ],
      kategori: "",
      urunBilgisi: "",
      yuzey: "",
      olcu: "",
    };
  },
  computed: {
    ...mapGetters(["stok_rapor_list_all"]),
  },
  localService: null,
  created() {
    this.allThisYearFirstLoad();
    this.username = this.$store.getters.__getUsername;
    UrunKartService.getUrunKartMenuList().then((data) => {
      this.$store.dispatch("isUrunKartLoad");
      this.$store.dispatch("urunKartMenuAct", data);
    });
  },
  methods: {
    isSevkiyatList(event) {
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
          this.allThisYearFirstLoad();
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
    showUrunKartList() {
      this.emitter.emit("uretimRaporUrunKartShow");
    },
    isSevkiyatListSelected(event) {
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
    allThisYearFirstLoad() {
      this.isAll = false;
      this.localService = new LocalService();
      this.select_yil = "2022";
      this.$store.dispatch("loadingBeginAct");
      service.getSevkiyatRaporHepsiMekmer(this.select_yil).then((data) => {
        this.$store.dispatch("stok_rapor_list_load_act", data);
        this.ilk_tarih = false;
        this.son_tarih = false;
        this.is_excel = false;
        this.is_islem = false;
        this.is_form = false;
        this.tablo_toplam_guncelle(data);
        this.$store.dispatch("loadingEndAct");
      });
    },
    isAllSelected() {
      if (this.isAll == true) {
        this.$store.dispatch("datatableLoadingBeginAct")
        service.getYuklemeAllMekmer().then((data) => {
          this.$store.dispatch("stok_rapor_list_load_act", data);
          this.ilk_tarih = false;
          this.son_tarih = false;
          this.is_excel = false;
          this.is_islem = false;
          this.is_form = false;
          this.tablo_toplam_guncelle(data);
          this.$store.dispatch("datatableLoadingEndAct")
        });
      } else {
        this.allThisYearFirstLoad();
      }
    },
    excel_cikti_click() {
      this.$store.dispatch("datatableLoadingBeginAct")


      this.is_excel = true;
      const data = this.$refs.sevkiyat_tablo.value;
      service.getSevkiyatExcelCikti(data).then((responce) => {
        if (responce.status) {
          const link = document.createElement("a");
          link.href =
            this.$store.getters.servis_adres +
            "raporlar/dosyalar/sevkiyatRaporExcelListe";

          link.setAttribute("download", "sevkiyat_rapor_listesi.xlsx");
          document.body.appendChild(link);
          link.click();
          this.$store.dispatch("datatableLoadingEndAct")

          this.is_excel = false;
        }
      });
    },

    YilSecim(select_yil) {
      this.isAll = false;
      this.localService = new LocalService();
      this.$store.dispatch("datatableLoadingBeginAct")


      service.getSevkiyatRaporTekTarihMekmer(select_yil).then((data) => {
        this.$store.dispatch("stok_rapor_list_load_act", data);
        this.loading = false;
        this.ilk_tarih = false;
        this.son_tarih = false;
        this.is_excel = false;
        this.is_islem = false;
        this.is_form = false;
        this.tablo_toplam_guncelle(data);
        this.$store.dispatch("datatableLoadingEndAct")

      });
    },

    tablo_toplam_guncelle(liste) {
      this.miktar_toplam = 0;
      this.tutar_toplam = 0;

      for (let key in liste) {
        this.miktar_toplam += liste[key].miktar;
        this.tutar_toplam += liste[key].toplam;
      }
    },
    sevkiyat_tablo_filter_event(event) {
      this.tablo_toplam_guncelle(event.filterValue);
    },
    rapor_tarih_suz_click() {
      if (this.son_tarih && !this.ilk_tarih) {
        this.is_islem = true;
        let tarih = this.localService.getDateString(this.son_tarih);
        this.$store.dispatch("datatableLoadingBeginAct")


        service.getSevkiyatRaporTarihMekmer(tarih).then((data) => {
          this.$store.dispatch("stok_rapor_list_load_act", data);
          this.$store.dispatch("datatableLoadingEndAct")


          this.is_filter_sevkiyat = true;
          this.$refs.sevkiyat_tablo.value = data;
          this.tablo_toplam_guncelle(data);
          this.is_islem = false;
        });
      }
      if (!this.son_tarih && !this.ilk_tarih) {
        this.is_filter_sevkiyat = false;
        this.$refs.sevkiyat_tablo.value = this.sevkiyat_listesi;
        this.tablo_toplam_guncelle(this.sevkiyat_listesi);
      }
      if (this.ilk_tarih && !this.son_tarih) {
        this.is_filter_sevkiyat = false;
        this.$refs.sevkiyat_tablo.value = this.sevkiyat_listesi;
        this.tablo_toplam_guncelle(this.sevkiyat_listesi);
      }
      if (this.ilk_tarih && this.son_tarih) {
        this.loading = true;
        this.is_islem = true;

        let son_tarih = this.localService.getDateString(this.son_tarih);
        let ilk_tarih = this.localService.getDateString(this.ilk_tarih);
        this.$store.dispatch("datatableLoadingBeginAct")

        service
          .getSevkiyatRaporIkiTarihMekmer(ilk_tarih, son_tarih)
          .then((data) => {
            this.is_filter_sevkiyat = true;
            this.$store.dispatch("stok_rapor_list_load_act", data);
            this.$store.dispatch("datatableLoadingEndAct")

            this.$refs.sevkiyat_tablo.value = data;
            this.tablo_toplam_guncelle(data);
            this.loading = false;
            this.is_islem = false;
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
  margin-left: -5px;
  word-break: break-all;
  font-size: 9px;
}
</style>

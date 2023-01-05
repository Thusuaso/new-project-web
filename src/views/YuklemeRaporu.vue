<template>
  <div class="columns">
    <div class="column is-4">
      <Card>
        <template #content>
          <div class="columns">
            <div class="column is-6">
              <Dropdown
                v-model="select_yil"
                @change="yil_degisim_event"
                :options="yil_listesi"
                optionLabel="yil"
                placeholder="Select a Year"
              >
                <template #value="slotProps">
                  {{ slotProps.value }}
                </template>
              </Dropdown>
              <Dropdown
                v-model="select_aystr"
                @change="ay_degisim_event"
                :options="ay_listesi"
                optionLabel="ay_str"
                placeholder="Select a Month"
              >
                <template #value="slotProps">
                  {{ slotProps.value }}
                </template>
              </Dropdown>
            </div>
            <div class="column is-6">
              <RadioButton
                name="name"
                value="musteri"
                v-model="tur"
                @change="statuSecim"
              />
              Müşteri
              <RadioButton
                name="name"
                value="po"
                v-model="tur"
                @change="statuSecim"
              />
              PO
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div class="column is-4">
      <Card>
        <template #content>
          <div class="columns">
            <div class="column">
              <RadioButton
                name="name"
                value="Hepsi"
                v-model="marketing"
                @click="statuSecim2"
              />
              Hepsi
            </div>
            <div class="column">
              <RadioButton
                name="name"
                value="BD"
                v-model="marketing"
                @click="statuSecim2"
              />
              BD
            </div>
            <div class="column">
              <RadioButton
                name="name"
                value="SM"
                v-model="marketing"
                @click="statuSecim2"
              />
              SM
            </div>
            <div class="column">
              <RadioButton
                name="name"
                value="Ghana"
                v-model="marketing"
                @click="statuSecim2"
              />
              Ghana
            </div>
            <div class="column">
              <RadioButton
                name="name"
                value="İç Piyasa"
                v-model="marketing"
                @click="statuSecim2"
              />
              İç Piyasa
            </div>
            <div class="column">
              <RadioButton
                name="name"
                value="SU"
                v-model="marketing"
                @click="statuSecim2"
              />
              SU
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div class="column is-2">
      <Card>
        <template #content>
          <div class="columns">
            <div class="column">
              <RadioButton
                name="name"
                value="aylik"
                v-model="excelrapor"
                @change="statuSecim3"
              />
              Aylık <i class="pi pi-file-excel"></i>
            </div>
            <div class="column">
              <RadioButton
                name="name"
                value="yillik"
                v-model="excelrapor"
                @change="statuSecim3"
              />
              Yıllık <i class="pi pi-file-excel"></i>
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div class="column is-2">
      <Card>
        <template #content>
          <div class="columns">
            <div class="column">
              <RadioButton
                name="name"
                value="aylik"
                v-model="pdfrapor"
                @change="statuSecim4"
              />
              Aylık <i class="pi pi-file-pdf"></i>
            </div>
            <div class="column">
              <RadioButton
                name="name"
                value="yillik"
                v-model="pdfrapor"
                @change="statuSecim4"
              />
              Yıllık <i class="pi pi-file-pdf"></i>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <DataTable
        :value="aylik_liste"
        :scrollable="true"
        scrollHeight="420px"
        v-model:filters="filters"
        filterDisplay="menu"
        dataKey="id"
        :loading="$store.getters.datatableLoading"
        @filter="isFilteredValue($event)"
      >
        <template #header>
          <div class="columns is-multiline">
            <div class="column is-12">
              <span style="font-size: 15px">Aylık Toplam Yükleme </span>
            </div>
          </div>
        </template>
        <Column
          field="siparis_no"
          header="Sipariş Numarası"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.siparis_no }}
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
        <Column
          field="musteri_adii"
          header="Müşteri Adı"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.musteri_adii }}
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
        <Column field="fob" header="F" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.fob) }}
          </template>
          <template #footer>
            {{ formatPrice(fob_ay_top) }}
          </template>
        </Column>
        <Column field="dtp" header="C/D" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.dtp) }}
          </template>
          <template #footer>
            {{ formatPrice(dtp_ay_top) }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="column">
      <DataTable
        :value="yillik_liste"
        :scrollable="true"
        scrollHeight="390px"
        v-model:filters="filters3"
        filterDisplay="menu"
        dataKey="id"
        :loading="$store.getters.datatableLoading"
        @filter="isSumYear"
      >
        <template #header>
          <div class="columns is-multiline">
            <div class="column is-12">
              <span style="font-size: 15px"> Yıllık Toplam Yükleme </span>
            </div>
          </div>
        </template>

        <Column
          field="musteri_adi"
          header="Müşteri Adı"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.musteri_adi }}
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
        <Column field="fob" header="F" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.fob) }}
          </template>
          <template #footer>
            {{ formatPrice(fob_yil_top) }}
          </template>
        </Column>
        <Column field="dtp" header="C/D" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.dtp) }}
          </template>
          <template #footer>
            {{ formatPrice(dtp_yil_top) }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="column">
      <DataTable
        :value="yillik_sayim_listesi"
        :loading="$store.getters.datatableLoading"
        v-model:filters="filters2"
      >
        <template #header>
          <div class="columns is-multiline">
            <div class="column is-12">
              <span style="font-size: 15px">
                Pazarlama Bazında Toplam Yüklemeler
              </span>
            </div>
          </div>
        </template>
        <Column
          field="marketing"
          header="Pazarlama Tür"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.marketing }}
          </template>
        </Column>
        <Column
          field="yukleme_sayisiay"
          header="Ay"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.yukleme_sayisiay }}
          </template>
          <template #footer>
            {{ yukleme_ay_top }}
          </template>
        </Column>
        <Column
          field="yukleme_sayisi"
          header="Yıl"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            {{ slotProps.data.yukleme_sayisi }}
          </template>
          <template #footer>
            {{ yukleme_yil_top }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import service from "../service/RaporService";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {},
  data() {
    return {
      yil_listesi: null,
      ay_listesi: null,
      select_yil: 0,
      select_ay: 0,
      select_aystr: "",
      filters: {
        siparis_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        musteri_adii: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filters3: {
        musteri_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      aylik_yukleme_listesi: null,
      musteribazinda_aylik: null,
      yillik_yukleme_listesi: null,
      aylik_sayim_listesi: null,
      yillik_sayim_listesi: null,
      aylik_liste: null,
      yillik_liste: null,
      tur: "musteri",
      marketing: "null",
      excelrapor: null,
      siparis_no_durum: false,
      siparis_no: "",
      fob_ay_top: 0,
      dtp_ay_top: 0,
      fob_yil_top: 0,
      dtp_yil_top: 0,
      yukleme_ay_top: 0,
      yukleme_yil_top: 0,
      pdfrapor: null,
      ay_baslik: "",
      yil_baslik: "",
    };
  },

  computed: {
    ...mapGetters(["servis_adres"]),
  },

  created() {
    this.$store.dispatch("loadingBeginAct");
    service.getYuklemeYilListesi().then((yil_list) => {
      this.yil_listesi = yil_list;
      this.select_yil = yil_list[0].yil;
      this.yil_baslik = this.select_yil;

      service.getYuklemeAyListesi(this.select_yil).then((ay_list) => {
        this.ay_listesi = ay_list;

        this.select_ay = ay_list[0].ay;
        this.select_aystr = ay_list[0].ay_str;
        this.ay_baslik = this.select_aystr;
        this.yukleme_listesi_yukle();
      });
    });
    service.getYuklemeRapor(this.select_yil, this.select_ay).then((data) => {
      this.aylik_yukleme_listesi = data.aylik_yukleme_listesi;
      this.yillik_yukleme_listesi = data.yillik_yukleme_listesi;
      this.aylik_sayim_listesi = data.aylik_sayim_listesi;
      this.yillik_sayim_listesi = data.yillik_sayim_listesi;
      this.musteribazinda_aylik = data.musteribazinda_aylik;
      this.$store.dispatch("loadingEndAct");
    });
  },
  methods: {
    isSumYear(event) {
      this.fob_yil_top = 0;
      this.dtp_yil_top = 0;
      for (let i in event.filteredValue) {
        this.fob_yil_top += event.filteredValue[i].fob;
        this.dtp_yil_top += event.filteredValue[i].dtp;
      }
    },
    isFilteredValue(event) {
      this.fob_ay_top = 0;
      this.dtp_ay_top = 0;
      console.log(event);
      for (let item in event.filteredValue) {
        this.fob_ay_top += event.filteredValue[item].fob;
        this.dtp_ay_top += event.filteredValue[item].dtp;
      }
    },
    generatePdf() {
      //po bazında

      var doc = new jsPDF("p", "pt", "A4");

      doc.setLanguage("utf-8");
      const col = ["Customer", "Order No", "F", "C/D"];
      const rows = [];
      const itemNew = this.aylik_liste;

      itemNew.forEach((element) => {
        let val = (element.fob / 1).toFixed(2).replace(".", ","); //total fiyatın birim ayarı
        val = "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        let val1 = (element.dtp / 1).toFixed(2).replace(".", ","); //birim fiyatın birim ayarı
        val1 = "$" + val1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        const temp = [element.musteri_adii, element.siparis_no, val, val1];
        rows.push(temp);
      });
      let val6 = (this.fob_ay_top / 1).toFixed(2).replace(".", ","); //total birim ayarı
      val6 = "$" + val6.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      let val7 = (this.dtp_ay_top / 1).toFixed(2).replace(".", ","); //total birim ayarı
      val7 = "$" + val7.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      const top = ["", "", val6, val7];

      rows.push(top);

      doc.autoTable(col, rows, {
        margin: "auto",
        height: "auto",
        theme: "plain",
        startY: 60,
        styles: {
          // Defaul style
          lineWidth: 0.01,
          lineColor: 0,
          fillStyle: "DF",
          halign: "left",
          valign: "middle",
          columnWidth: "auto",
          overflow: "linebreak",
          fontSize: 8,
        },
        rowStyles: {
          0: {
            fillColor: 255,
            fontStyle: "bold",
            halign: "center",
          },
        },
      });

      doc.save("Aylık Po Bazında.pdf");
    },
    generateMusteriPdf() {
      //po bazında

      var doc = new jsPDF("p", "pt", "A4");

      doc.setLanguage("utf-8");
      const col = ["Customer", "F", "C/D"];
      const rows = [];
      const itemNew = this.aylik_liste;

      itemNew.forEach((element) => {
        let val = (element.fob / 1).toFixed(2).replace(".", ","); //total fiyatın birim ayarı
        val = "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        let val1 = (element.dtp / 1).toFixed(2).replace(".", ","); //birim fiyatın birim ayarı
        val1 = "$" + val1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        const temp = [element.musteri_adii, val, val1];
        rows.push(temp);
      });
      let val6 = (this.fob_ay_top / 1).toFixed(2).replace(".", ","); //total birim ayarı
      val6 = "$" + val6.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      let val7 = (this.dtp_ay_top / 1).toFixed(2).replace(".", ","); //total birim ayarı
      val7 = "$" + val7.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      const top = ["", val6, val7];

      rows.push(top);

      doc.autoTable(col, rows, {
        margin: "auto",
        height: "auto",
        theme: "plain",
        startY: 60,
        styles: {
          // Defaul style
          lineWidth: 0.01,
          lineColor: 0,
          fillStyle: "DF",
          halign: "left",
          valign: "middle",
          columnWidth: "auto",
          overflow: "linebreak",
          fontSize: 8,
        },
        rowStyles: {
          0: {
            fillColor: 255,
            fontStyle: "bold",
            halign: "center",
          },
        },
      });

      doc.save("Aylık Musteri Bazında.pdf");
    },
    generateYillikPdf() {
      //po bazında

      var doc = new jsPDF("p", "pt", "A4");

      doc.setLanguage("utf-8");
      const col = ["Customer", "F", "C/D"];
      const rows = [];
      const itemNew = this.yillik_liste;

      itemNew.forEach((element) => {
        let val = (element.fob / 1).toFixed(2).replace(".", ","); //total fiyatın birim ayarı
        val = "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        let val1 = (element.dtp / 1).toFixed(2).replace(".", ","); //birim fiyatın birim ayarı
        val1 = "$" + val1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        const temp = [element.musteri_adi, val, val1];
        rows.push(temp);
      });
      let val6 = (this.fob_yil_top / 1).toFixed(2).replace(".", ","); //total birim ayarı
      val6 = "$" + val6.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      let val7 = (this.dtp_yil_top / 1).toFixed(2).replace(".", ","); //total birim ayarı
      val7 = "$" + val7.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      const top = ["", val6, val7];

      rows.push(top);

      doc.autoTable(col, rows, {
        margin: "auto",
        height: "auto",
        theme: "plain",
        startY: 60,
        styles: {
          // Defaul style
          lineWidth: 0.01,
          lineColor: 0,
          fillStyle: "DF",
          halign: "left",
          valign: "middle",
          columnWidth: "auto",
          overflow: "linebreak",
          fontSize: 8,
        },
        rowStyles: {
          0: {
            fillColor: 255,
            fontStyle: "bold",
            halign: "center",
          },
        },
      });

      doc.save("Yıllık.pdf");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    toplam_ay(liste) {
      this.dtp_ay_top = 0;
      this.fob_ay_top = 0;

      for (let key in liste) {
        const item = liste[key];

        this.dtp_ay_top += item.dtp;
        this.fob_ay_top += item.fob;
      }
    },
    toplam_yil(liste) {
      this.dtp_yil_top = 0;
      this.fob_yil_top = 0;

      for (let key in liste) {
        const item = liste[key];

        this.dtp_yil_top += item.dtp;
        this.fob_yil_top += item.fob;
      }
    },

    toplam_yilsayimtablo(liste) {
      this.yukleme_yil_top = 0;
      this.yukleme_ay_top = 0;
      for (let key in liste) {
        const item = liste[key];

        this.yukleme_yil_top += item.yukleme_sayisi;
        this.yukleme_ay_top += item.yukleme_sayisiay;
      }
    },
    statuSecim() {
      //statü değişiminde
      if (this.tur) {
        let result;

        if (this.tur == "musteri") {
          result = this.musteribazinda_aylik;
        }
        if (this.tur != "musteri") {
          result = this.aylik_yukleme_listesi;
        }

        this.aylik_liste = result;
        this.toplam_ay(this.aylik_liste);
        this.toplam_yil(this.yillik_liste);
      }
    },
    statuSecim2() {
      //statü değişiminde
      if (this.marketing) {
        let result;
        let result1;
        if (this.marketing == "Hepsi") {
          result = this.aylik_yukleme_listesi;
          result1 = this.yillik_yukleme_listesi;
        }
        if (this.marketing != "Hepsi") {
          result = this.aylik_yukleme_listesi.filter(
            (x) => x.marketing === this.marketing
          );
          result1 = this.yillik_yukleme_listesi.filter(
            (x) => x.marketing === this.marketing
          );
        }

        this.aylik_liste = result;
        this.yillik_liste = result1;
        this.toplam_ay(this.aylik_liste);
        this.toplam_yil(this.yillik_liste);
      }
    },
    statuSecim3() {
      //statü değişiminde

      if (this.excelrapor) {
        let result;
        if (this.excelrapor == "aylik") {
          result = this.aylik_liste;
          this.siparis_no = result[0].siparis_no;

          if (this.siparis_no != "") this.excel_cikti_click(result);
          else this.excel_Musteri_click(result);
        }
        if (this.excelrapor == "yillik") {
          result = this.yillik_liste;

          this.excel_Yil_click(result);
        }
      }
    },
    statuSecim4() {
      //statü değişiminde

      if (this.pdfrapor) {
        let result;
        if (this.pdfrapor == "aylik") {
          result = this.aylik_liste;
          this.siparis_no = result[0].siparis_no;

          if (this.siparis_no != "") this.generatePdf(result);
          else this.generateMusteriPdf(result);
        }
        if (this.pdfrapor == "yillik") {
          result = this.yillik_liste;

          this.generateYillikPdf(result);
        }
      }
    },
    yil_degisim_event(event) {
      this.select_yil = this.yil_listesi.find(
        (x) => x.yil == event.value.yil
      ).yil;
      this.yil_baslik = event.value.yil;
      this.ay_listesi_yukle();
    },
    ay_listesi_yukle() {
      this.$store.dispatch("datatableLoadingBeginAct");
      service.getYuklemeAyListesi(this.select_yil).then((data) => {
        this.ay_listesi = data;
        this.select_ay = data[0].ay;
        this.select_aystr = data[0].ay_str;
        this.ay_baslik = this.select_aystr;
        this.yukleme_listesi_yukle();
        this.$store.dispatch("datatableLoadingEndAct");
      });
    },
    ay_degisim_event(event) {
      this.select_ay = this.ay_listesi.find(
        (x) => x.ay_str == event.value.ay_str
      ).ay;
      this.select_aystr = this.ay_listesi.find(
        (x) => x.ay_str == event.value.ay_str
      ).ay_str;
      this.ay_baslik = this.select_aystr;
      this.yukleme_listesi_yukle();
    },
    yukleme_listesi_yukle() {
      this.$store.dispatch("datatableLoadingBeginAct");

      service.getYuklemeRapor(this.select_yil, this.select_ay).then((data) => {
        this.aylik_yukleme_listesi = data.aylik_yukleme_listesi;
        this.yillik_yukleme_listesi = data.yillik_yukleme_listesi;
        this.aylik_sayim_listesi = data.aylik_sayim_listesi;
        this.yillik_sayim_listesi = data.yillik_sayim_listesi;
        this.musteribazinda_aylik = data.musteribazinda_aylik;
        this.aylik_liste = this.musteribazinda_aylik;
        this.yillik_liste = this.yillik_yukleme_listesi;
        this.marketing = null;
        this.toplam_ay(this.aylik_liste);
        this.toplam_yil(this.yillik_liste);

        this.toplam_yilsayimtablo(this.yillik_sayim_listesi);
        this.$store.dispatch("datatableLoadingEndAct");
      });
    },
    excel_cikti_click(data) {
      service.getYuklemePoExcelCikti(data).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "raporlar/listeler/yuklemepoExcelCikti";

          link.setAttribute("download", "yukleme_po_bazında.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
    excel_Musteri_click(data) {
      service.getYuklemeMuExcelCikti(data).then((response) => {
        if (response.status) {
          const link = document.createElement("a");

          link.href =
            this.servis_adres + "raporlar/listeler/yuklememusExcelCikti";

          link.setAttribute("download", "Yukleme-Musteri.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
    excel_Yil_click(data) {
      service.getYuklemeYilExcelCikti(data).then((response) => {
        if (response.status) {
          const link = document.createElement("a");

          link.href =
            this.servis_adres + "raporlar/listeler/yuklemeYilExcelCikti";

          link.setAttribute("download", "Yukleme-Yil.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 10px;
}

.p-column-filter {
  font-size: 9px;
}

.page-button-excell {
  margin-top: 30px;
}

.block {
  margin-top: 15px;
  margin-right: -25px;
}

.excel {
  margin-top: 15px;
}
</style>

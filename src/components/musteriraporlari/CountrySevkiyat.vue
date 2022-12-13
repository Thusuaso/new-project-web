<template>
  <div>
    <DataTable
      :value="countrySevkiyat"
      responsiveLayout="scroll"
      :scrollable="true"
      scrollHeight="350px"
      v-model:selection="selectedCountry"
      selectionMode="single"
      @row-select="countrySevkiyatSelect($event)"
      class="p-datatable-sm"
    >
      <Column
        field="ulkeid"
        header="Ülke Id"
        :sortable="true"
        bodyStyle="textAlign:center"
        headerStyle="width:150px;"
      >
      </Column>
      <Column
        field="ulkeadi"
        header="Ülke Adı"
        :sortable="true"
        bodyStyle="textAlign:left"
      ></Column>
      <Column
        field="toplamsevkiyat"
        header="Toplam Sevkiyat"
        :sortable="true"
        bodyStyle="textAlign:center"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.toplamsevkiyat) }}
        </template>
        <template #footer>
          {{ formatPrice(sevkiyatGenelToplam) }}
        </template>
      </Column>
    </DataTable>
    <Dialog
      v-model:visible="countrySevkiyatAyrintiForm"
      :header="countrySevkiyatAyrintiHeader"
      :modal="true"
      maximizable
    >
      <DataTable
        :value="countrySevkiyatAyrinti"
        responsiveLayout="scroll"
        class="p-datatable-sm"
      >
        <Column
          field="siparisNo"
          header="Sipariş No"
          bodyStyle="text-align:center;"
        ></Column>
        <Column
          field="fob"
          header="Fob ($)"
          bodyStyle="text-align:center;"
          footerStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.fob) }}
          </template>
          <template #footer>
            {{ formatPrice(fobToplam) }}
          </template>
        </Column>
        <Column
          field="navlun"
          header="Navlun ($)"
          bodyStyle="text-align:center;"
          footerStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.navlun) }}
          </template>
          <template #footer>
            {{ formatPrice(navlunToplam) }}
          </template>
        </Column>
        <Column
          field="detay1"
          header="Detay Tutar 1 ($)"
          bodyStyle="text-align:center;"
          footerStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.detay1) }}
          </template>
          <template #footer>
            {{ formatPrice(detay1Toplam) }}
          </template>
        </Column>
        <Column
          field="detay2"
          header="Detay Tutar 2 ($)"
          bodyStyle="text-align:center;"
          footerStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.detay2) }}
          </template>
          <template #footer>
            {{ formatPrice(detay2Toplam) }}
          </template>
        </Column>
        <Column
          field="detay3"
          header="Detay Tutar 3 ($)"
          bodyStyle="text-align:center;"
          footerStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.detay3) }}
          </template>
          <template #footer>
            {{ formatPrice(detay3Toplam) }}
          </template>
        </Column>
        <Column
          field="detay4"
          header="Detay Tutar 4 ($)"
          bodyStyle="text-align:center;"
          footerStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.detay4) }}
          </template>
          <template #footer>
            {{ formatPrice(detay4Toplam) }}
          </template>
        </Column>
        <Column
          field="ddp"
          header="Ddp ($)"
          bodyStyle="text-align:center;"
          footerStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.ddp) }}
          </template>
          <template #footer>
            {{ formatPrice(ddpToplam) }}
          </template>
        </Column>
      </DataTable>
    </Dialog>
  </div>
</template>
<script>
import service from "@/service/RaporService";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      selectedCountry: null,
      data: null,
      onceki_yil: 0,
      gecen_yil: 0,
      bu_yil: 0,
      year: "Hepsi",
      countrySevkiyat: null,
      countrySevkiyatYear: null,
      countrySevkiyatAyrinti: null,
      countrySevkiyatAyrintiForm: false,
      countrySevkiyatAyrintiHeader: "",
      sevkiyatGenelToplam: 0,
      isSelectedYear: false,
      filters: {
        ulkeid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ulkeadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      fobToplam: 0,
      navlunToplam: 0,
      detay1Toplam: 0,
      detay2Toplam: 0,
      detay3Toplam: 0,
      detay4Toplam: 0,
      ddpToplam: 0,
    };
  },
  created() {
    service.getUlkeBazindaSevkiyat().then((data) => {
      this.countrySevkiyat = data;
      this.sevkiyatToplam(data);
    });
    var tarih = new Date();
    this.onceki_yil = tarih.getFullYear() - 2;
    this.gecen_yil = tarih.getFullYear() - 1;
    this.bu_yil = tarih.getFullYear();
  },
  computed: {
    ...mapGetters(["servis_adres"]),
  },
  methods: {
    sevkiyatAyrintiToplam(event) {
      this.fobToplam = 0;
      this.navlunToplam = 0;
      this.detay1Toplam = 0;
      this.detay2Toplam = 0;
      this.detay3Toplam = 0;
      this.detay4Toplam = 0;
      this.ddpToplam = 0;
      for (let item of event) {
        this.fobToplam += item.fob;
        this.navlunToplam += item.navlun;
        this.detay1Toplam += item.detay1;
        this.detay2Toplam += item.detay2;
        this.detay3Toplam += item.detay3;
        this.detay4Toplam += item.detay4;
        this.ddpToplam += item.ddp;
      }
    },
    countrySevkiyatSelect(event) {
      service.getUlkeBazindaSevkiyatAyrinti(event.data.ulkeid).then((data) => {
        this.countrySevkiyatAyrinti = data;
        this.sevkiyatAyrintiToplam(data);
        this.countrySevkiyatAyrintiHeader = event.data.ulkeadi;
        this.countrySevkiyatAyrintiForm = true;
      });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    sevkiyatToplam(datas) {
      for (let i in datas) {
        this.sevkiyatGenelToplam += datas[i].toplamsevkiyat;
      }
    },
    get_ulke_bazinda_excell_cikti() {
      if (this.isSelectedYear == true) {
        this.data = this.countrySevkiyatYear;
      } else {
        this.data = this.countrySevkiyat;
      }

      service.get_ulk_sevk_top_excell_cikti(this.data).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href = this.servis_adres + "raporlar/musteri/ulkebzindaSevkiyat";
          //link.href = "http://localhost:5000/raporlar/musteri/musteriexcellCikti"
          link.setAttribute("download", "ulke_bazinda_sevkiyat.xlsx");
          document.body.appendChild(link);
          link.click();
          this.is_excel = false;
        }
      });
    },
    isSelected() {
      if (this.year == "Hepsi") {
        this.isSelectedYear = false;
        service.getUlkeBazindaSevkiyat().then((data) => {
          this.countrySevkiyat = data;
          this.sevkiyatToplam(data);
        });
      } else {
        this.isSelectedYear = true;
        service.getUlkeBazindaSevkiyatYear(this.year).then((data) => {
          this.countrySevkiyatYear = data;
        });
      }
    },
  },
};
</script>
<style scoped>
.yilradiobutton {
  margin-left: 5px;
  margin-right: 5px;
}
</style>

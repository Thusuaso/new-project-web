<template>
  <div>
    <br />
    <Button
      @click="get_excell_cikti"
      icon="fa-solid fa-file-excel fa-2xl"
      label="Excel"
    />
    <div class="columns">
      <div class="column is-6">
        <DataTable
          :value="byMarketingMonthLoadIcPiyasaList"
          responsiveLayout="scroll"
          :selection="selectedIcPiyasa"
          selectionMode="single"
          @row-select="isSelectedIcPiyasa"
        >
          <template #header>
            <div class="table-header">İç Piyasa Yükleme ({{ year }})</div>
          </template>
          <Column
            field="month"
            header="AY"
            bodyStyle="text-align:center"
          ></Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            footerStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
            <template #footer>
              {{ formatPrice(icPiyasaSumFob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            footerStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
            <template #footer>
              {{ formatPrice(icPiyasaSumDdp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="column is-6">
        <DataTable
          :value="byMarketingMonthLoadMekmerList"
          responsiveLayout="scroll"
          :selection="selectedMekmer"
          selectionMode="single"
          @row-select="isSelectedMekmer"
        >
          <template #header>
            <div class="table-header">Mekmer Yükleme ({{ year }})</div>
          </template>
          <Column
            field="month"
            header="AY"
            bodyStyle="text-align:center"
          ></Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            footerStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
            <template #footer>
              {{ formatPrice(mekmerSumFob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            footerStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
            <template #footer>
              {{ formatPrice(mekmerSumDdp) }}
            </template>
          </Column>
        </DataTable>
        <span style="color:red;">* Mekmer Marketing Altında Villo Home, Maya ve Atlanta SM Konteynır Yüklemeleri Bulunmaktadır.</span>

      </div>
    </div>
    <Dialog
      v-model:visible="isIcPiyasaForm"
      header="İç Piyasa Yükleme Ayrinti"
      :modal="true"
      maximizable
    >
      <Button
        label="Excel"
        @click="get_excell_cikti_ayrinti"
        icon="fa-solid fa-file-excel"
      />
      <DataTable :value="icPiyasaAyrinti" responsiveLayout="scroll">
        <Column
          field="siparisNo"
          header="Sipariş No"
          bodyStyle="text-align:center"
        ></Column>
        <Column field="fob" header="Fob" bodyStyle="text-align:center">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.fob) }}
          </template>
          <template #footer>
            {{ formatPrice(icPiyasaFobAyrintiSum) }}
          </template>
        </Column>
        <Column field="navlun" header="Navlun" bodyStyle="text-align:center">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.navlun) }}
          </template>
          <template #footer>
            {{ formatPrice(icPiyasaNavlunAyrintiSum) }}
          </template>
        </Column>
        <Column
          field="detay1"
          header="Detay Tutar 1"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.detay1) }}
          </template>
          <template #footer>
            {{ formatPrice(icPiyasaDetay1AyrintiSum) }}
          </template>
        </Column>
        <Column
          field="detay2"
          header="Detay Tutar 2"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.detay2) }}
          </template>
          <template #footer>
            {{ formatPrice(icPiyasaDetay2AyrintiSum) }}
          </template>
        </Column>
        <Column
          field="detay3"
          header="Detay Tutar 3"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.detay3) }}
          </template>
          <template #footer>
            {{ formatPrice(icPiyasaDetay3AyrintiSum) }}
          </template>
        </Column>
        <Column
          field="detay4"
          header="Detay Tutar 4"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.detay4) }}
          </template>
          <template #footer>
            {{ formatPrice(icPiyasaDetay4AyrintiSum) }}
          </template>
        </Column>

        <Column field="ddp" header="Ddp" bodyStyle="text-align:center">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.ddp) }}
          </template>
          <template #footer>
            {{ formatPrice(icPiyasaDdpAyrintiSum) }}
          </template>
        </Column>
      </DataTable>
    </Dialog>
    <Dialog
      v-model:visible="isMekmerForm"
      header="Mekmer Yükleme Ayrinti"
      :modal="true"
      maximizable
    >
      <Button
        label="Excel"
        @click="get_excell_cikti_ayrinti"
        icon="fa-solid fa-file-excel"
      />
      <DataTable :value="mekmerAyrinti" responsiveLayout="scroll">
        <Column
          field="siparisNo"
          header="Sipariş No"
          bodyStyle="text-align:center"
        >
        </Column>
        <Column field="fob" header="Fob" bodyStyle="text-align:center">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.fob) }}
          </template>
          <template #footer>
            {{ formatPrice(mekmerFobAyrintiSum) }}
          </template>
        </Column>
        <Column field="navlun" header="Navlun" bodyStyle="text-align:center">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.navlun) }}
          </template>
          <template #footer>
            {{ formatPrice(mekmerNavlunAyrintiSum) }}
          </template>
        </Column>
        <Column
          field="detay1"
          header="Detay Tutar 1"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.detay1) }}
          </template>
          <template #footer>
            {{ formatPrice(mekmerDetay1AyrintiSum) }}
          </template>
        </Column>
        <Column
          field="detay2"
          header="Detay Tutar 2"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.detay2) }}
          </template>
          <template #footer>
            {{ formatPrice(mekmerDetay2AyrintiSum) }}
          </template>
        </Column>
        <Column
          field="detay3"
          header="Detay Tutar 3"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.detay3) }}
          </template>
          <template #footer>
            {{ formatPrice(mekmerDetay3AyrintiSum) }}
          </template>
        </Column>
        <Column
          field="detay4"
          header="Detay Tutar 4"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.detay4) }}
          </template>
          <template #footer>
            {{ formatPrice(mekmerDetay4AyrintiSum) }}
          </template>
        </Column>
        <Column field="ddp" header="Ddp" bodyStyle="text-align:center">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.ddp) }}
          </template>
          <template #footer>
            {{ formatPrice(mekmerDdpAyrintiSum) }}
          </template>
        </Column>
      </DataTable>
    </Dialog>
  </div>
</template>

<script>
import service from "../../service/RaporService";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "byMarketingMonthLoadIcPiyasaList",
      "byMarketingMonthLoadMekmerList",
      "icPiyasaSumFob",
      "icPiyasaSumDdp",
      "mekmerSumFob",
      "mekmerSumDdp",
      "servis_adres",
    ]),
  },

  data() {
    return {
      selectedIcPiyasa: null,
      selectedMekmer: null,
      icPiyasaAyrinti: null,
      mekmerAyrinti: null,
      isIcPiyasaForm: false,
      isMekmerForm: false,
      icPiyasaFobAyrintiSum: 0,
      icPiyasaDdpAyrintiSum: 0,
      icPiyasaNavlunAyrintiSum: 0,
      icPiyasaDetay1AyrintiSum: 0,
      icPiyasaDetay2AyrintiSum: 0,
      icPiyasaDetay3AyrintiSum: 0,
      icPiyasaDetay4AyrintiSum: 0,

      mekmerFobAyrintiSum: 0,
      mekmerDdpAyrintiSum: 0,
      mekmerNavlunAyrintiSum: 0,
      mekmerDetay1AyrintiSum: 0,
      mekmerDetay2AyrintiSum: 0,
      mekmerDetay3AyrintiSum: 0,
      mekmerDetay4AyrintiSum: 0,

      year: null,
      ayrintiData: null,
    };
  },
  methods: {
    get_excell_cikti() {
      const data = {
        icPiyasa: this.byMarketingMonthLoadIcPiyasaList,
        mekmer: this.byMarketingMonthLoadMekmerList,
      };
      service.get_month_marketing_excell_cikti(data).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "raporlar/musteri/monthMarketingExcell";
          //link.href = "http://localhost:5000/raporlar/musteri/musteriexcellCikti"
          link.setAttribute("download", "aylik_marketing.xlsx");
          document.body.appendChild(link);
          link.click();
          this.is_excel = false;
        }
      });
    },
    get_excell_cikti_ayrinti() {
      if (this.icPiyasaAyrinti != null) {
        this.ayrintiData = this.icPiyasaAyrinti;
      } else if (this.mekmerAyrinti != null) {
        this.ayrintiData = this.mekmerAyrinti;
      }
      service
        .get_month_marketing_ayrinti_excell_cikti(this.ayrintiData)
        .then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            link.href =
              this.servis_adres +
              "raporlar/musteri/monthMarketingAyrintiExcell";
            //link.href = "http://localhost:5000/raporlar/musteri/musteriexcellCikti"
            link.setAttribute("download", "aylik_marketing.xlsx");
            document.body.appendChild(link);
            link.click();
            this.is_excel = false;
            this.$store.dispatch("loadEnd"); // loading sonlandırma png
            this.isIcPiyasaForm = false;
            this.isMekmerForm = false;
            this.icPiyasaAyrinti = null;
            this.mekmerAyrinti = null;
          }
        });
    },
    isSelectedIcPiyasa(event) {
      service
        .getAyBazindaMarketingIcPiyasaYuklemeler(event.data.monthNum)
        .then((data) => {
          this.icPiyasaAyrinti = data;
          this.icPiyasaFobAyrintiSum = 0;
          this.icPiyasaDdpAyrintiSum = 0;
          this.icPiyasaNavlunAyrintiSum = 0;
          this.icPiyasaDetay1AyrintiSum = 0;
          this.icPiyasaDetay2AyrintiSum = 0;
          this.icPiyasaDetay3AyrintiSum = 0;
          this.icPiyasaDetay4AyrintiSum = 0;
          for (let i of data) {
            this.icPiyasaFobAyrintiSum += i.fob;
            this.icPiyasaDdpAyrintiSum += i.ddp;
            this.icPiyasaDetay1AyrintiSum += i.detay1;
            this.icPiyasaDetay2AyrintiSum += i.detay2;
            this.icPiyasaDetay3AyrintiSum += i.detay3;
            this.icPiyasaDetay4AyrintiSum += i.detay4;
            this.icPiyasaNavlunAyrintiSum += i.navlun;
          }
          this.isIcPiyasaForm = true;
        });
    },
    isSelectedMekmer(event) {
      service
        .getAyBazindaMarketingMekmerYuklemeler(event.data.monthNum)
        .then((data) => {
          this.mekmerAyrinti = data;
          this.mekmerFobAyrintiSum = 0;
          this.mekmerDdpAyrintiSum = 0;
          this.mekmerNavlunAyrintiSum = 0;
          this.mekmerDetay1AyrintiSum = 0;
          this.mekmerDetay2AyrintiSum = 0;
          this.mekmerDetay3AyrintiSum = 0;
          this.mekmerDetay4AyrintiSum = 0;
          for (let i of data) {
            this.mekmerFobAyrintiSum += i.fob;
            this.mekmerDdpAyrintiSum += i.ddp;
            this.mekmerNavlunAyrintiSum += i.navlun;
            this.mekmerDetay1AyrintiSum += i.detay1;
            this.mekmerDetay2AyrintiSum += i.detay2;
            this.mekmerDetay3AyrintiSum += i.detay3;
            this.mekmerDetay4AyrintiSum += i.detay4;
          }
          this.isMekmerForm = true;
        });
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    icPiyasaTop(data) {
      this.icPiyasaSumFob = 0;
      for (let i of data) {
        this.icPiyasaSumFob += i.fob;
        this.icPiyasaSumDdp += i.ddp;
      }
    },
    mekmerTop(data) {
      this.mekmerSumFob = 0;
      for (let i of data) {
        this.mekmerSumFob += i.fob;
        this.mekmerSumDdp += i.ddp;
      }
    },
  },
  created() {
    const date = new Date();
    this.year = date.getFullYear();
    service.getAyBazindaMarketingYuklemeler().then((data) => {
      this.$store.dispatch("byMarketingLoadMonthListAct", data);
    });
  },
};
</script>

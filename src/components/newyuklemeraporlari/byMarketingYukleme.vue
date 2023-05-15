<template>
  <div>
    <Dropdown
              v-model="selectedYear"
              :options="years"
              optionLabel="year"
              @change="isYearChange"
              :scrollable="true"
              class="w-full md:w-14rem mt-3 mb-3 mr-3"
            />
    <Button
      icon="pi pi-file-excel"
      class="p-button-primary  mt-3 mb-3"
      label="Excel"
      @click="excel_cikti_click"
    />
    
    <div class="columns">
      <div class="column">
        

        <DataTable
          :value="byMarketingLoadMonth"
          responsiveLayout="scroll"
          :loading="isChangeLoading"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px"
                  >{{ selectedYear.year }} Marketing Yüklemeler</span
                >
              </div>
            </div>
          </template>
          <Column field="marketing" header="Marketing"></Column>
          <Column field="fobToplam" header="Fob">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fobToplam) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingYuklemeSumFob) }}
            </template>
          </Column>
          <Column field="cfrToplam" header="DDP">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.cfrToplam) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingYuklemeSumCfr) }}
            </template>
          </Column>
        </DataTable>
        <span style="color:red;">Mekmer Marketing Altında Villo Home, Maya ve Atlanta SM Konteynır Yüklemeleri Bulunmaktadır.</span>
      </div>
      
    </div>
    <div class="columns">
      <div class="column" v-if="byMarketingDetailImperialHomes.length > 0">
        <DataTable
          :value="byMarketingDetailImperialHomes"
          responsiveLayout="scroll"
          :loading="isChangeLoading"
        >
          <template #header>
            <div class="table-header" style="font-size: 15px">Imperial Homes</div>
          </template>
          <Column field="musteri" header="Müşteri"></Column>
          <Column field="toplamFob" header="FOB">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamFob) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingDetailImperialHomesFob) }}
            </template>
          </Column>
          <Column field="toplamCfr" header="DDP">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamCfr) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingDetailImperialHomesCfr) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="column" v-if="byMarketingDetailMekmar.length > 0">
        <DataTable
          :value="byMarketingDetailMekmar"
          responsiveLayout="scroll"
          :loading="isChangeLoading"
        >
          <template #header>
            <div class="table-header" style="font-size: 15px">Mekmar</div>
          </template>
          <Column field="musteri" header="Müşteri"></Column>
          <Column field="toplamFob" header="FOB">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamFob) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingDetailMekmarFob) }}
            </template>
          </Column>
          <Column field="toplamCfr" header="DDP">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamCfr) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingDetailMekmarCfr) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="column" v-if="byMarketingDetailMekmer.length > 0">
        <DataTable
          :value="byMarketingDetailMekmer"
          responsiveLayout="scroll"
          :loading="isChangeLoading"
        >
          <template #header>
            <div class="table-header" style="font-size: 15px">Mekmer</div>
          </template>
          <Column field="musteri" header="Müşteri"></Column>
          <Column field="toplamFob" header="FOB">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamFob) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingDetailMekmerFob) }}
            </template>
          </Column>
          <Column field="toplamCfr" header="DDP">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamCfr) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingDetailMekmerCfr) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="column" v-if="byMarketingDetailEfes.length > 0">
        <DataTable
          :value="byMarketingDetailEfes"
          responsiveLayout="scroll"
          :loading="isChangeLoading"
        >
          <template #header>
            <div class="table-header" style="font-size: 15px">Efes</div>
          </template>
          <Column field="musteri" header="Müşteri"></Column>
          <Column field="toplamFob" header="FOB">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamFob) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingDetailEfesFob) }}
            </template>
          </Column>
          <Column field="toplamCfr" header="DDP">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamCfr) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingDetailEfesCfr) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="column" v-if="byMarketingDetailIcPiyasa.length > 0">
        <DataTable
          :value="byMarketingDetailIcPiyasa"
          responsiveLayout="scroll"
          :loading="isChangeLoading"
        >
          <template #header>
            <div class="table-header" style="font-size: 15px">İç Piyasa</div>
          </template>
          <Column field="musteri" header="Müşteri"></Column>
          <Column field="toplamFob" header="FOB">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamFob) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingDetailIcPiyasaFob) }}
            </template>
          </Column>
          <Column field="toplamCfr" header="DDP">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamCfr) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingDetailIcPiyasaCfr) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import service from "../../service/RaporService";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "byMarketingLoadMonth",
      "servis_adres",
    ]),
  },
  data() {
    return {
      selectedYear: { 'year': 2023 },
      years: [
        { year: 2023 },
        { year: 2022 },
        { year: 2021 },
        { year: 2020 },
        { year: 2019 },
        { year: 2018 },
      ],
      byMarketingYukleme: [],
      byMarketingUretim: [],
      byMarketingDepo: [],
      isChangeLoading: false,
      byMarketingYuklemeSumCfr: 0,
      byMarketingYuklemeSumFob: 0,
      byMarketingUretimSumFob: 0,
      byMarketingUretimSumCfr: 0,
      byMarketingDepoSumFob: 0,
      byMarketingDepoSumCfr: 0,
      byMarketingDetailImperialHomes: [],
      byMarketingDetailMekmar: [],
      byMarketingDetailMekmer: [],
      byMarketingDetailEfes: [],
      byMarketingDetailIcPiyasa: [],

      byMarketingDetailImperialHomesFob: 0,
      byMarketingDetailImperialHomesCfr: 0,
      byMarketingDetailMekmarFob: 0,
      byMarketingDetailMekmarCfr: 0,
      byMarketingDetailMekmerFob: 0,
      byMarketingDetailMekmerCfr: 0,
      byMarketingDetailEfesFob: 0,
      byMarketingDetailEfesCfr: 0,
      byMarketingDetailIcPiyasaFob: 0,
      byMarketingDetailIcPiyasaCfr: 0,
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    isYearChange() {
      this.isChangeLoading = true;

      service.getByMarketingYukleme(this.selectedYear.year).then((data) => {
        this.$store.dispatch("byMarketingLoadMonthAct", data);
        this.byMarketingDetailImperialHomes =
          data.data.marketingYuklemeDetail.filter(
            (x) => x.marketing == "Imperial Homes"
          );
        this.byMarketingDetailMekmar = data.data.marketingYuklemeDetail.filter(
          (x) => x.marketing == "Mekmar"
        );
        this.byMarketingDetailMekmer = data.data.marketingYuklemeDetail.filter(
          (x) => x.marketing == "Mekmer"
        );
        this.byMarketingDetailEfes = data.data.marketingYuklemeDetail.filter(
          (x) => x.marketing == "Efes"
        );
        this.byMarketingDetailIcPiyasa =
          data.data.marketingYuklemeDetail.filter(
            (x) => x.marketing == "İç Piyasa"
          );

        this.byMarketingYuklemeGetSum(data.data.marketingYukleme);
        this.byMarketingUretimGetSum(data.data.marketingUretim);
        this.byMarketingDepoGetSum(data.data.marketingDepo);
        this.imperialHomesToplam(this.byMarketingDetailImperialHomes);
        this.mekmarToplam(this.byMarketingDetailMekmar);
        this.mekmerToplam(this.byMarketingDetailMekmer);
        this.efesToplam(this.byMarketingDetailEfes);
        this.icPiyasaToplam(this.byMarketingDetailIcPiyasa);
        this.isChangeLoading = false;
      });
    },
    byMarketingYuklemeGetSum(liste) {
      this.byMarketingYuklemeSumFob = 0;
      this.byMarketingYuklemeSumCfr = 0;
      for (let item of liste) {
        this.byMarketingYuklemeSumFob += item.fobToplam;
        this.byMarketingYuklemeSumCfr += item.cfrToplam;
      }
    },
    byMarketingUretimGetSum(liste) {
      this.byMarketingUretimSumFob = 0;
      this.byMarketingUretimSumCfr = 0;
      for (let item of liste) {
        this.byMarketingUretimSumFob += item.fobToplam;
        this.byMarketingUretimSumCfr += item.cfrToplam;
      }
    },
    byMarketingDepoGetSum(liste) {
      this.byMarketingDepoSumFob = 0;
      this.byMarketingDepoSumCfr = 0;
      for (let item of liste) {
        this.byMarketingDepoSumFob += item.fobToplam;
        this.byMarketingDepoSumCfr += item.cfrToplam;
      }
    },
    imperialHomesToplam(liste) {
      this.byMarketingDetailImperialHomesFob = 0;
      this.byMarketingDetailImperialHomesCfr = 0;
      for (let i of liste) {
        this.byMarketingDetailImperialHomesFob += i.toplamFob;
        this.byMarketingDetailImperialHomesCfr += i.toplamCfr;
      }
    },
    mekmarToplam(liste) {
      this.byMarketingDetailMekmarFob = 0;
      this.byMarketingDetailMekmarCfr = 0;
      for (let i of liste) {
        this.byMarketingDetailMekmarFob += i.toplamFob;
        this.byMarketingDetailMekmarCfr += i.toplamCfr;
      }
    },
    mekmerToplam(liste) {
      this.byMarketingDetailMekmerFob = 0;
      this.byMarketingDetailMekmerCfr = 0;
      for (let i of liste) {
        this.byMarketingDetailMekmerFob += i.toplamFob;
        this.byMarketingDetailMekmerCfr += i.toplamCfr;
      }
    },
    efesToplam(liste) {
      this.byMarketingDetailEfesFob = 0;
      this.byMarketingDetailEfesCfr = 0;
      for (let i of liste) {
        this.byMarketingDetailEfesFob += i.toplamFob;
        this.byMarketingDetailEfesCfr += i.toplamCfr;
      }
    },
    icPiyasaToplam(liste) {
      this.byMarketingDetailIcPiyasaFob = 0;
      this.byMarketingDetailIcPiyasaCfr = 0;
      for (let i of liste) {
        this.byMarketingDetailIcPiyasaFob += i.toplamFob;
        this.byMarketingDetailIcPiyasaCfr += i.toplamCfr;
      }
    },
    excel_cikti_click() {
      const data = {
        byMarketingLoadMonth: this.byMarketingLoadMonth,
        imperialHomes: this.byMarketingDetailImperialHomes,
        mekmar: this.byMarketingDetailMekmar,
        mekmer: this.byMarketingDetailMekmer,
        efes: this.byMarketingDetailEfes,
        icPiyasa: this.byMarketingDetailIcPiyasa,
      };
      service.getByMarketingDetailExcell(data).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres +
            "raporlar/dosyalar/byMarketingAyrintiExcellCikti";
          link.setAttribute("download", "Pazarlama_Bazında_Üretim_Raporu.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
  },
  created() {
    this.isChangeLoading = true;
    service.getByMarketingYukleme(this.selectedYear.year).then((data) => {
      this.$store.dispatch("byMarketingLoadMonthAct", data);
      this.byMarketingDetailImperialHomes =
        data.data.marketingYuklemeDetail.filter(
          (x) => x.marketing == "Imperial Homes"
        );
      this.byMarketingDetailMekmar = data.data.marketingYuklemeDetail.filter(
        (x) => x.marketing == "Mekmar"
      );
      this.byMarketingDetailMekmer = data.data.marketingYuklemeDetail.filter(
        (x) => x.marketing == "Mekmer"
      );
      this.byMarketingDetailEfes = data.data.marketingYuklemeDetail.filter(
        (x) => x.marketing == "Efes"
      );
      this.byMarketingDetailIcPiyasa = data.data.marketingYuklemeDetail.filter(
        (x) => x.marketing == "İç Piyasa"
      );
      this.byMarketingYuklemeGetSum(data.data.marketingYukleme);
      this.byMarketingUretimGetSum(data.data.marketingUretim);
      this.byMarketingDepoGetSum(data.data.marketingDepo);
      this.imperialHomesToplam(this.byMarketingDetailImperialHomes);
      this.mekmarToplam(this.byMarketingDetailMekmar);
      this.mekmerToplam(this.byMarketingDetailMekmer);
      this.efesToplam(this.byMarketingDetailEfes);
      this.icPiyasaToplam(this.byMarketingDetailIcPiyasa);
      this.isChangeLoading = false;
    });
  },
};
</script>

<style scoped>
  .p-datatable {
  font-size: 12px;
}
</style>

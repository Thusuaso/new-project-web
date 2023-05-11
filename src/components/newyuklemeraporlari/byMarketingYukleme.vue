<template>
  <div>
    <Button
      icon="pi pi-file-excel"
      class="p-button-primary"
      label="Excel"
      @click="excel_cikti_click"
    />

    <div class="columns">
      <div class="column">
        <Dropdown
          v-model="selectedMonth"
          :options="months"
          optionLabel="month"
          @change="isMonthChange"
          placeholder="Ay Seçiniz"
          style="width: 100%"
          :scrollable="true"
          scrollHeight="420px"
        />

        <DataTable
          :value="byMarketingLoadMonth"
          responsiveLayout="scroll"
          :loading="isChangeLoading"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px"
                  >{{ selectedMonth.month }} Marketing Yüklemeler</span
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
        <DataTable
          :value="byMarketingWarehouseLoad"
          responsiveLayout="scroll"
          :loading="isChangeLoading"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px"
                  >{{ selectedMonth.month }} Depo Kutu Yüklemeleri (Sadece
                  Ödemesi Gelmiş Olanlar)
                </span>
              </div>
            </div>
          </template>
          <Column field="marketing" header="Marketing"></Column>
          <Column field="fobToplam" header="Fob">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fobToplam) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingDepoSumFob) }}
            </template>
          </Column>
          <Column field="cfrToplam" header="DDP">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.cfrToplam) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingDepoSumCfr) }}
            </template>
          </Column>
        </DataTable>
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
      "byMarketingWarehouseLoad",
      "servis_adres",
    ]),
  },
  data() {
    return {
      selectedMonth: { id: 0, month: "Hepsi" },
      months: [{ id: 0, month: "Hepsi" }],
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
    __getMonth(month) {
      const monthName = [
        "",
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
      ];
      return monthName[month];
    },
    isMonthChange() {
      this.isChangeLoading = true;

      service.getByMarketingYukleme(this.selectedMonth.id).then((data) => {
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
        byMarketingWarehouseLoad: this.byMarketingWarehouseLoad,
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
    service.getByMarketingYukleme(this.selectedMonth.id).then((data) => {
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

    const date = new Date();
    const month = date.getMonth() + 1;
    for (let i = 1; i <= month; i++) {
      this.months.push({ id: i, month: this.__getMonth(i) });
    }
  },
};
</script>

<style scoped></style>

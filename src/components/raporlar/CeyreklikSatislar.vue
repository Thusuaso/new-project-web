<template>
  <div>
    <div class="columns is-centered">
      <div class="column">
        <Dropdown
          v-model="selectedYear"
          :options="years"
          optionLabel="year"
          @change="yearChange"
          placeholder="Select a Year"
        />
      </div>
      <div class="column">
        <Dropdown
          v-model="selectedQuarter"
          style="width: 150px"
          :options="quarters"
          optionLabel="quarter"
          @change="quarterChange"
          placeholder="Select a Quarter"
        />
      </div>
    </div>
        <h3 style="text-align:center;font-weight:bold;margin-bottom:10px;">Yüklemeler İstatistik</h3>
        <div class="columns">
          <div class="column is-8">
            <DataTable :value="ceyreklikYuklemelerList" responsiveLayout="scroll">
              <Column field="ayStr" header="Ay"></Column>
              <Column field="satisToplami" header="Yükleme Toplamı" bodyStyle="text-align:center;">
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.satisToplami) }}
                </template>
                <template #footer>
                  {{ formatPrice(satisToplamiSum) }}
                </template>
              </Column>
              <Column field="navlunSatis" header="Navlun Satış" bodyStyle="text-align:center;">
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.navlunSatis) }}
                </template>
                <template #footer>
                  {{ formatPrice(navlunSatisSum) }}
                </template>
              </Column>
              <Column field="navlunAlis" header="Navlun Alış" bodyStyle="text-align:center;">
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.navlunAlis) }}
                </template>
                <template #footer>
                  {{ formatPrice(navlunAlisSum) }}
                </template>
              </Column>
              <Column field="ekTutarlar" header="Ek Tutarlar" bodyStyle="text-align:center;">
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.ekTutarlar) }}
                </template>
                <template #footer>
                  {{ formatPrice(ekTutarlarSum) }}
                </template>
              </Column>
              <Column field="masraflar" header="Masraflar" bodyStyle="text-align:center;">
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.masraflar) }}
                </template>
                <template #footer>
                  {{ formatPrice(masraflarSum) }}
                </template>
              </Column>
              <Column field="genelToplam" header="Genel Toplam" bodyStyle="text-align:center;">
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.genelToplam) }}
                </template>
                <template #footer>
                  {{ formatPrice(genelToplamSum) }}
                </template>
              </Column>
            </DataTable>
          </div>
          <div class="column is-4">
            <Chart type="pie" :data="chartData" :options="lightOptions" />
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-12">
            <table style="width: 100%">
              <tr>
                <th>Çeyrekler</th>
                <th>Ortalama</th>
                <th>Varyans</th>
                <th>Standart Sapma</th>
                <th>Yükleme Yüzdesi (%)</th>
              </tr>
              <tr>
                <td>1. Çeyrek</td>
                <td>{{ formatDecimal(statisticsData[0].ortalamaOne) }}</td>
                <td>{{ formatDecimal(statisticsData[0].varyansOne) }}</td>
                <td>{{ formatDecimal(statisticsData[0].stdOne) }}</td>
                <td>% {{ formatDecimal(statisticsData[0].yuzdeOne) }}</td>
              </tr>
              <tr>
                <td>2. Çeyrek</td>
                <td>{{ formatDecimal(statisticsData[0].ortalamaTwo) }}</td>
                <td>{{ formatDecimal(statisticsData[0].varyansTwo) }}</td>
                <td>{{ formatDecimal(statisticsData[0].stdTwo) }}</td>
                <td>% {{ formatDecimal(statisticsData[0].yuzdeTwo) }}</td>
              </tr>
              <tr>
                <td>3. Çeyrek</td>
                <td>{{ formatDecimal(statisticsData[0].ortalamaThree) }}</td>
                <td>{{ formatDecimal(statisticsData[0].varyansThree) }}</td>
                <td>{{ formatDecimal(statisticsData[0].stdThree) }}</td>
                <td>% {{ formatDecimal(statisticsData[0].yuzdeThree) }}</td>
              </tr>
              <tr>
                <td>4. Çeyrek</td>
                <td>{{ formatDecimal(statisticsData[0].ortalamaFour) }}</td>
                <td>{{ formatDecimal(statisticsData[0].varyansFour) }}</td>
                <td>{{ formatDecimal(statisticsData[0].stdFour) }}</td>
                <td>% {{ formatDecimal(statisticsData[0].yuzdeFour) }}</td>
              </tr>
            </table>
          </div>
        </div>

          <h3 style="text-align:center;font-weight:bold;margin-bottom:10px;">Siparişler İstatistik</h3>
          <div class="columns">

          
            <div class="column is-8">
              <DataTable :value="ceyreklikSiparislerList" responsiveLayout="scroll">
                <Column field="ayStr" header="Ay"></Column>
                <Column field="satisToplami" header="Sipariş Toplamı" bodyStyle="text-align:center;">
                  <template #body="slotProps">
                    {{ formatPrice(slotProps.data.satisToplami) }}
                  </template>
                  <template #footer>
                    {{ formatPrice(satisToplamiSumSip) }}
                  </template>
                </Column>
                <Column field="navlunSatis" header="Navlun Satış" bodyStyle="text-align:center;">
                  <template #body="slotProps">
                    {{ formatPrice(slotProps.data.navlunSatis) }}
                  </template>
                  <template #footer>
                    {{ formatPrice(navlunSatisSumSip) }}
                  </template>
                </Column>
                <Column field="navlunAlis" header="Navlun Alış" bodyStyle="text-align:center;">
                  <template #body="slotProps">
                    {{ formatPrice(slotProps.data.navlunAlis) }}
                  </template>
                  <template #footer>
                    {{ formatPrice(navlunAlisSumSip) }}
                  </template>
                </Column>
                <Column field="ekTutarlar" header="Ek Tutarlar" bodyStyle="text-align:center;">
                  <template #body="slotProps">
                    {{ formatPrice(slotProps.data.ekTutarlar) }}
                  </template>
                  <template #footer>
                    {{ formatPrice(ekTutarlarSumSip) }}
                  </template>
                </Column>
                <Column field="masraflar" header="Masraflar" bodyStyle="text-align:center;">
                  <template #body="slotProps">
                    {{ formatPrice(slotProps.data.masraflar) }}
                  </template>
                  <template #footer>
                    {{ formatPrice(masraflarSumSip) }}
                  </template>
                </Column>
                <Column field="genelToplam" header="Genel Toplam" bodyStyle="text-align:center;">
                  <template #body="slotProps">
                    {{ formatPrice(slotProps.data.genelToplam) }}
                  </template>
                  <template #footer>
                    {{ formatPrice(genelToplamSumSip) }}
                  </template>
                </Column>
              </DataTable>
            </div>
            <div class="column is-4">
              <Chart type="pie" :data="chartDataSip" :options="lightOptions" />
            </div>
          </div>

          <div class="columns is-centered">
            <div class="column is-12">
              <table style="width: 100%">
                <tr>
                  <th>Çeyrekler</th>
                  <th>Ortalama</th>
                  <th>Varyans</th>
                  <th>Standart Sapma</th>
                  <th>Yükleme Yüzdesi (%)</th>
                </tr>
                <tr>
                  <td>1. Çeyrek</td>
                  <td>{{ formatDecimal(statisticsDataSip[0].ortalamaOne) }}</td>
                  <td>{{ formatDecimal(statisticsDataSip[0].varyansOne) }}</td>
                  <td>{{ formatDecimal(statisticsDataSip[0].stdOne) }}</td>
                  <td>% {{ formatDecimal(statisticsDataSip[0].yuzdeOne) }}</td>
                </tr>
                <tr>
                  <td>2. Çeyrek</td>
                  <td>{{ formatDecimal(statisticsDataSip[0].ortalamaTwo) }}</td>
                  <td>{{ formatDecimal(statisticsDataSip[0].varyansTwo) }}</td>
                  <td>{{ formatDecimal(statisticsDataSip[0].stdTwo) }}</td>
                  <td>% {{ formatDecimal(statisticsDataSip[0].yuzdeTwo) }}</td>
                </tr>
                <tr>
                  <td>3. Çeyrek</td>
                  <td>{{ formatDecimal(statisticsDataSip[0].ortalamaThree) }}</td>
                  <td>{{ formatDecimal(statisticsDataSip[0].varyansThree) }}</td>
                  <td>{{ formatDecimal(statisticsDataSip[0].stdThree) }}</td>
                  <td>% {{ formatDecimal(statisticsDataSip[0].yuzdeThree) }}</td>
                </tr>
                <tr>
                  <td>4. Çeyrek</td>
                  <td>{{ formatDecimal(statisticsDataSip[0].ortalamaFour) }}</td>
                  <td>{{ formatDecimal(statisticsDataSip[0].varyansFour) }}</td>
                  <td>{{ formatDecimal(statisticsDataSip[0].stdFour) }}</td>
                  <td>% {{ formatDecimal(statisticsDataSip[0].yuzdeFour) }}</td>
                </tr>
              </table>
            </div>
          </div>



          </div>

      
    
    
    <br />
</template>

<script>
import service from "../../service/CeyreklikSatislarService";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "ceyreklikYuklemelerList",
      "chartData",
      "statisticsData",
      "ceyreklikSiparislerList",
      "chartDataSip",
      "statisticsDataSip"

    ]),
  },
  data() {
    return {
      quarterSiparislerDatas:[],
      satisToplamiSum: 0,
      navlunSatisSum: 0,
      navlunAlisSum: 0,
      ekTutarlarSum: 0,
      masraflarSum: 0,
      genelToplamSum: 0,

      satisToplamiSumSip: 0,
      navlunSatisSumSip: 0,
      navlunAlisSumSip: 0,
      ekTutarlarSumSip: 0,
      masraflarSumSip: 0,
      genelToplamSumSip: 0,

      selectedQuarter: { id: 0, quarter: "Hepsi" },
      quarters: [],
      selectedYear: { year: new Date().getFullYear() },
      yearOld: 0,
      yearNow: 0,
      years: [],
      lightOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
      },
      quarterDatas: null,
    };
  },
  methods: {
    quarterChange(event) {
      if (event.value.id == 0) {
        this.$store.dispatch("ceyreklik_yuklemeler_load", this.quarterDatas);
        this.toplama(this.quarterDatas);
        this.$store.dispatch('ceyreklik_siparisler_load', this.quarterSiparislerDatas)
        this.toplamaSiparisler(this.quarterSiparislerDatas)
      } else if (event.value.id == 1) {
        const data = this.quarterDatas.filter((x) => x.ay <= 3);
        this.toplama(data);
        this.$store.dispatch("ceyreklik_yuklemeler_load", data);

        const data2 = this.quarterSiparislerDatas.filter((x) => x.ay <= 3);
        this.$store.dispatch('ceyreklik_siparisler_load', data2)
        this.toplamaSiparisler(data2)

      } else if (event.value.id == 2) {
        const data = this.quarterDatas.filter((x) => x.ay > 3 && x.ay <= 6);
        this.toplama(data);
        this.$store.dispatch("ceyreklik_yuklemeler_load", data);

        const data2 = this.quarterSiparislerDatas.filter((x) => x.ay > 3 && x.ay <= 6);
        this.$store.dispatch('ceyreklik_siparisler_load', data2)
        this.toplamaSiparisler(data2)
      } else if (event.value.id == 3) {
        const data = this.quarterDatas.filter((x) => x.ay > 6 && x.ay <= 9);
        this.toplama(data);
        this.$store.dispatch("ceyreklik_yuklemeler_load", data);

        const data2 = this.quarterSiparislerDatas.filter((x) => x.ay > 6 && x.ay <= 9);
        this.$store.dispatch('ceyreklik_siparisler_load', data2)
        this.toplamaSiparisler(data2)


      } else if (event.value.id == 4) {
        const data = this.quarterDatas.filter((x) => x.ay > 9 && x.ay <= 12);
        this.toplama(data);
        this.$store.dispatch("ceyreklik_yuklemeler_load", data);


        const data2 = this.quarterSiparislerDatas.filter((x) => x.ay > 9 && x.ay <= 12);
        this.$store.dispatch('ceyreklik_siparisler_load', data2)
        this.toplamaSiparisler(data2)
      }
    },
    yearChange(event) {
      service.getCeyreklikSatislar(event.value.year).then((data) => {
        this.quarterDatas = data.satislar;
        this.quarterSiparislerDatas = data.siparisler
        this.$store.dispatch("ceyreklik_yuklemeler_load", data.satislar);
        this.$store.dispatch("chart_data_load", data.chart);
        this.$store.dispatch("statistics_data_load", data.statistics);
        this.$store.dispatch('ceyreklik_siparisler_load', data.siparisler)
        this.$store.dispatch('chart_data_sip_load', data.siparislerChart)
        this.$store.dispatch('statistics_data_sip_load', data.siparislerStatistics)
        this.toplamaSiparisler(data.siparisler)
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        if (year == event.value.year) {
          this.quarters = [];
          if (month < 4) {
            this.quarters.push(
              { id: 0, quarter: "Hepsi" },
              { id: 1, quarter: "1. Çeyrek" }
            );
          } else if (month < 7) {
            this.quarters.push(
              { id: 0, quarter: "Hepsi" },
              { id: 1, quarter: "1. Çeyrek" },
              { id: 2, quarter: "2. Çeyrek" }
            );
          } else if (month < 10) {
            this.quarters.push(
              { id: 0, quarter: "Hepsi" },
              { id: 1, quarter: "1. Çeyrek" },
              { id: 2, quarter: "2. Çeyrek" },
              { id: 3, quarter: "3. Çeyrek" }
            );
          } else {
            this.quarters.push(
              { id: 0, quarter: "Hepsi" },
              { id: 1, quarter: "1. Çeyrek" },
              { id: 2, quarter: "2. Çeyrek" },
              { id: 3, quarter: "3. Çeyrek" },
              { id: 4, quarter: "4. Çeyrek" }
            );
          }
        } else {
          this.quarters = [];
          this.quarters.push(
            { id: 0, quarter: "Hepsi" },
            { id: 1, quarter: "1. Çeyrek" },
            { id: 2, quarter: "2. Çeyrek" },
            { id: 3, quarter: "3. Çeyrek" },
            { id: 4, quarter: "4. Çeyrek" }
          );
        }

        this.toplama(data.satislar);
      });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    toplama(data) {
      this.satisToplamiSum = 0;
      this.navlunSatisSum = 0;
      this.navlunAlisSum = 0;
      this.ekTutarlarSum = 0;
      this.masraflarSum = 0;
      this.genelToplamSum = 0;
      for (let i in data) {
        this.satisToplamiSum += data[i].satisToplami;
        this.navlunSatisSum += data[i].navlunSatis;
        this.navlunAlisSum += data[i].navlunAlis;
        this.ekTutarlarSum += data[i].ekTutarlar;
        this.masraflarSum += data[i].masraflar;
        this.genelToplamSum += data[i].genelToplam;
      }
    },
    toplamaSiparisler(data) {
      this.satisToplamiSumSip = 0;
      this.navlunSatisSumSip = 0;
      this.navlunAlisSumSip = 0;
      this.ekTutarlarSumSip = 0;
      this.masraflarSumSip = 0;
      this.genelToplamSumSip = 0;
      for (let i in data) {
        this.satisToplamiSumSip += data[i].satisToplami;
        this.navlunSatisSumSip += data[i].navlunSatis;
        this.navlunAlisSumSip += data[i].navlunAlis;
        this.ekTutarlarSumSip += data[i].ekTutarlar;
        this.masraflarSumSip += data[i].masraflar;
        this.genelToplamSumSip += data[i].genelToplam;
      }
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  created() {
    const month = new Date().getMonth();
    if (month < 4) {
      this.quarters.push(
        { id: 0, quarter: "Hepsi" },
        { id: 1, quarter: "1. Çeyrek" }
      );
    } else if (month < 7) {
      this.quarters.push(
        { id: 0, quarter: "Hepsi" },
        { id: 1, quarter: "1. Çeyrek" },
        { id: 2, quarter: "2. Çeyrek" }
      );
    } else if (month < 10) {
      this.quarters.push(
        { id: 0, quarter: "Hepsi" },
        { id: 1, quarter: "1. Çeyrek" },
        { id: 2, quarter: "2. Çeyrek" },
        { id: 3, quarter: "3. Çeyrek" }
      );
    } else {
      this.quarters.push(
        { id: 0, quarter: "Hepsi" },
        { id: 1, quarter: "1. Çeyrek" },
        { id: 2, quarter: "2. Çeyrek" },
        { id: 3, quarter: "3. Çeyrek" },
        { id: 4, quarter: "4. Çeyrek" }
      );
    }

    this.yearOld = new Date().getFullYear() - 5;
    this.yearNow = new Date().getFullYear();
    while (this.yearOld <= this.yearNow) {
      this.years.push({ year: this.yearOld });
      this.yearOld++;
    }
    service.getCeyreklikSatislar(new Date().getFullYear()).then((data) => {
      this.quarterDatas = data.satislar;
      this.quarterSiparislerDatas = data.siparisler
      this.$store.dispatch("ceyreklik_yuklemeler_load", data.satislar);
      this.$store.dispatch("chart_data_load", data.chart);
      this.$store.dispatch("statistics_data_load", data.statistics);
      this.toplama(data.satislar);

      this.$store.dispatch('ceyreklik_siparisler_load', data.siparisler)
      this.$store.dispatch('chart_data_sip_load', data.siparislerChart)
      this.$store.dispatch('statistics_data_sip_load', data.siparislerStatistics)
      this.toplamaSiparisler(data.siparisler)

    });
  },
};
</script>
<style scoped>
th,
td {
  padding: 15px;
  border: 1px solid #dfdfdf;
}
</style>

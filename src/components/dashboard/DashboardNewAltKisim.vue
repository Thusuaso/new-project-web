<template>
  <div>
    <Card>
      <template #header>
        <h1 style="text-align: center; font-size: 20px; font-weight: bold">
          R14 : Konteynır Takip Listesi
        </h1>
      </template>
      <template #content>
        <DataTable
          :value="dashboardSubData.konteynir"
          responsiveLayout="scroll"
          v-model:filters="filterKont"
          filterDisplay="row"
          dataKey="id"
          :paginator="true"
          :rows="5"
        >
          <Column
            field="firmaAdi"
            filterField="firmaAdi"
            header="Firma Adı"
            :showFilterMenu="false"
          >
            <template #body="{ data }">
              {{ data.firmaAdi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by country"
              />
            </template>
          </Column>
          <Column field="siparisNo" header="Sipariş No" :showFilterMenu="false">
            <template #body="{ data }">
              {{ data.siparisNo }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by country"
              />
            </template>
          </Column>
          <Column field="siparisTarihi" header="Sipariş Tarihi"></Column>
          <Column field="yuklemeTarihi" header="Yükleme Tarihi"></Column>
          <Column field="etaTarihi" header="Eta Tarihi"></Column>
          <Column field="konteynirNo" header="Konteynır No"></Column>
          <Column field="line" header="Line"></Column>
          <Column field="navlunFirma" header="Navlun Firma"></Column>
          <Column field="kalan" header="Kalan Ödeme">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.kalan) }}
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
    <hr />
    <!-- <Card>
      <template #header>
        <h1 style="text-align: center">R15: Finans Takip Listesi</h1>
      </template>
      <template #content>
        <DataTable :value="dashboardSubData.finans.filter((x) => x.kalanBedel >= 10) " responsiveLayout="scroll"
          v-model:filters="filterFinans" filterDisplay="row" :paginator="true" :rows="5">
          <Column field="musteriAdi" filterField="musteriAdi" header="Müşteri" :showFilterMenu="false">
            <template #body="{ data }">
              {{ data.musteriAdi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by country" />
            </template>
          </Column>
          <Column field="siparisNo" header="Sipariş No" :showFilterMenu="false">
            <template #body="{ data }">
              {{ data.siparisNo }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by country" />
            </template>
          </Column>
          <Column field="siparisDurum" header="Sipariş Durum"></Column>
          <Column field="siparisSahibi" header="Sipariş Sahibi"></Column>
          <Column field="operasyon" header="Operasyon"></Column>
          <Column field="satisToplami" header="Satış Toplamı">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.satisToplami) }}
            </template>
          </Column>
          <Column field="odenen" header="Ödenen">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.odenen) }}
            </template>
          </Column>
          <Column field="kalanBedel" header="Kalan Ödeme">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.kalanBedel) }}
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
    <hr /> -->
    <div class="columns">
      <div class="column">
        <Card>
          <template #header>
            <h2 style="text-align: center">
              R16: {{ year }} 'de Yapılan Sevkiyatın Üreticilere Göre Dağılımı (Mekmar)
            </h2>
          </template>
          <template #content>
            <DataTable
              :value="dashboardSubData.tedarikci"
              class="p-datatable-sm"
              responsiveLayout="scroll"
              scrollable
              scrollHeight="350px"
              v-model:filters="filters"
              @row-select="tedarikciAyrintiSelected"
              selectionMode="single"
              dataKey="id"
            >
              <Column field="tedarikci" header="Tedarikçi">
                <template #body="slotProps">
                  {{ slotProps.data.tedarikci }}
                </template>
              </Column>
              <Column field="satisToplam" header="Satış Toplam">
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.satisToplam) }}
                </template>
                <template #footer>
                  {{ formatPrice(tedarikciPriceSum) }}
                </template>
              </Column>
              <Column field="satisMiktar" header="Satış Miktarı">
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.satisMiktar) }}
                </template>
                <template #footer>
                  {{ formatDecimal(tedarikciProductSum) }}
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>
      <div class="column">
        <Card>
          <template #header>
            <h2 style="text-align: center">
              R17: {{ year }}'deki Ülkelere Göre Sevkiyat
            </h2>
          </template>
          <template #content>
            <countrySevkiyat></countrySevkiyat>
          </template>
        </Card>
      </div>
      <div class="column">
        <Card>
          <template #header>
            <h2 style="text-align: center">
              R18: {{ year }}'deki Mevcut Siparişlerin Müşterilere Göre Dağılımı
            </h2>
          </template>
          <template #content>
            <DataTable
              :value="dashboardSubData.musteriSiparisler"
              class="p-datatable-sm"
              responsiveLayout="scroll"
              scrollable
              scrollHeight="350px"
              v-model:filters="filters"
              @row-select="firmaBazindaAyrintiSelected"
              selectionMode="single"
              dataKey="id"
            >
              <Column field="tedarikci" header="Müşteri Adı">
                <template #body="slotProps">
                  {{ slotProps.data.tedarikci }}
                </template>
              </Column>
              <Column field="satisToplam" header="Satış Toplam">
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.satisToplam) }}
                </template>
                <template #footer>
                  {{ formatPrice(musteriPriceSum) }}
                </template>
              </Column>
              <Column field="satisMiktar" header="Satış Miktarı">
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.satisMiktar) }}
                </template>
                <template #footer>
                  {{ formatPrice(musteriPriceProductSum) }}
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <Card>
          <template #header>
            <h2 style="text-align: center">
              R19: Takipteki {{ month }} Ayına Ait Teklifler
            </h2>
          </template>
          <template #content>
            <DataTable
              :value="dashboardSubData.teklifler"
              responsiveLayout="scroll"
              v-model:filters="filterTeklifler"
              filterDisplay="row"
              dataKey="id"
              :paginator="true"
              :rows="5"
              @row-select="tekliflerAyrintiAylik"
              selectionMode="single"
            >
              <Column
                field="teklifSahibi"
                filterField="teklifSahibi"
                header="Teklif Sahibi"
                :showFilterMenu="false"
              >
                <template #body="{ data }">
                  {{ data.teklifSahibi }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText
                    type="text"
                    v-model="filterModel.value"
                    @input="filterCallback()"
                    class="p-column-filter"
                    placeholder="Search by country"
                  />
                </template>
              </Column>
              <Column field="teklifSayisi" header="Teklif Sayısı">
                <template #body="slotProps">
                  {{ slotProps.data.teklifSayisi }}
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
        <Card style="margin-top: 10px">
          <template #header>
            <h2 style="text-align: center">
              R20: {{ year }} Yılına Ait Tüm Teklifler
            </h2>
          </template>
          <template #content>
            <DataTable
              :value="dashboardSubData.tekliflerYillik"
              responsiveLayout="scroll"
              v-model:filters="filterTekliflerYil"
              filterDisplay="row"
              :paginator="true"
              :rows="5"
              @row-select="tekliflerAyrintiYillik"
              selectionMode="single"
            >
              <Column
                field="teklifSahibi"
                filterField="teklifSahibi"
                header="Teklif Sahibi"
                :showFilterMenu="false"
              >
                <template #body="{ data }">
                  {{ data.teklifSahibi }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText
                    type="text"
                    v-model="filterModel.value"
                    @input="filterCallback()"
                    class="p-column-filter"
                    placeholder="Search by country"
                  />
                </template>
              </Column>
              <Column field="teklifSayisi" header="Teklif Sayısı">
                <template #body="slotProps">
                  {{ slotProps.data.teklifSayisi }}
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>
      <div class="column">
        <Card>
          <template #header>
            <h2 style="text-align: center">
              R22: {{ year }} Yeni Eklenen Siparişler
            </h2>
          </template>
          <template #content>
            <DataTable
              :value="dashboardSubData.sonEklenenSiparisler"
              responsiveLayout="scroll"
              v-model:filters="filtersSonEklenenSip"
              filterDisplay="row"
              dataKey="id"
              :paginator="true"
              :rows="5"
            >
              <Column
                field="siparisNo"
                filterField="siparisNo"
                header="Sipariş No"
                :showFilterMenu="false"
              >
                <template #body="{ data }">
                  {{ data.siparisNo }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText
                    type="text"
                    v-model="filterModel.value"
                    @input="filterCallback()"
                    class="p-column-filter"
                    placeholder="Search by country"
                  />
                </template>
              </Column>
              <Column field="satisci" filterField="satisci" header="Satışçı">
                <template #body="slotProps">
                  {{ slotProps.data.satisci }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText
                    type="text"
                    v-model="filterModel.value"
                    @input="filterCallback()"
                    class="p-column-filter"
                    placeholder="Search by country"
                  />
                </template>
              </Column>
              <Column field="satisToplami" header="Satış Toplam(FOB)">
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.satisToplami) }}
                </template>
              </Column>
              <Column field="link" header="PI" bodyStyle="textAlign:center;">
                <template #body="slotProps">
                  <Button
                    type="button"
                    :disabled="!slotProps.data.evrakDurum"
                    @click="proformaDowload(slotProps.data.link)"
                    icon="fas fa-download"
                    style="margin-right: 0.5em"
                  />
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <Card>
          <template #header>
            <h2 style="text-align: center">R22: Son Yapılan Değişiklikler</h2>
          </template>
          <template #content>
            <DataTable
              :value="dashboardLogs"
              responsiveLayout="scroll"
              dataKey="id"
              :paginator="true"
              :rows="10"
            >
              <Column
                field="degisiklikTarihi"
                header="Degişiklik Tarihi"
              ></Column>
              <Column field="degisiklikYapan" header="Degişiklik Yapan">
              </Column>
              <Column
                field="yapilanDegisiklik"
                header="Yapılan Değişiklik"
              ></Column>
            </DataTable>
            <Button @click="anaSayfaDegisiklikAll" label="All"></Button>
          </template>
        </Card>
      </div>
    </div>
  </div>

  <Dialog
    header="Tüm Hareketler"
    v-model:visible="is_main_all_form"
    :modal="true"
    maximizable
    position="top"
  >
    <div class="card">
      <div class="columns">
        <div class="column is-4">
          <Calendar
            v-model="selectionDate"
            selectionMode="range"
            @hide="isSelectedYear"
          />
        </div>
      </div>
      <DataTable
        :value="dashboardLogsAll"
        :resizableColumns="true"
        columnResizeMode="fit"
        showGridlines
        responsiveLayout="scroll"
        :rows="20"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :paginator="true"
      >
        <Column field="degisiklikTarihi" header="Degişiklik Tarihi"></Column>
        <Column
          field="degisiklikYapan"
          header="Degişiklik Yapan"
          headerStyle="width:26%;"
          bodyStyle="text-align:center;"
        >
        </Column>
        <Column field="yapilanDegisiklik" header="Yapılan Değişiklik"></Column>
      </DataTable>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="is_tedarikci_ayrinti_form"
    header="Tedarikçi Ayrıntı Tablosu"
    :modal="true"
    maximizable
    position="top"
  >
    <div class="card">
      <DataTable
        :value="tedarikciAyrintiData"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <Column field="siparisNo" header="Sipariş No"></Column>
        <Column field="firmaAdi" header="Firma Adı"></Column>
        <Column field="satisMiktari" header="Satış Miktarı">
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.satisMiktari) }}
          </template>
          <template #footer>
            {{ formatDecimal(tedarikciAyrintiMikTop) }}
          </template>
        </Column>
        <Column field="satisToplami" header="Satış Toplamı ($)">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.satisToplami) }}
          </template>
          <template #footer>
            {{ formatDecimal(tedarikciAyrintiSipTop) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="is_tedarikci_ayrinti_form_all"
    header="Hali Hazırdaki Siparişlerin Tedarikçi Ayrıntı Tablosu"
    :modal="true"
    maximizable
    position="top"
  >
    <div class="card">
      <DataTable
        :value="tedarikciAyrintiDataAll"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <Column field="siparisNo" header="Sipariş No"></Column>
        <Column field="firmaAdi" header="Firma Adı"></Column>
        <Column field="satisMiktari" header="Satış Miktarı">
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.satisMiktari) }}
          </template>
          <template #footer>
            {{ formatDecimal(tedarikciAyrintiSipTopAll) }}
          </template>
        </Column>
        <Column field="satisToplami" header="Satış Toplamı ($)">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.satisToplami) }}
          </template>
          <template #footer>
            {{ formatDecimal(tedarikciAyrintiMikTopAll) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="is_firma_ayrinti_form"
    header="Firma Bazında Sipariş Ayrıntı"
    :modal="true"
    position="top"
  >
    <div class="card">
      <DataTable
        :value="firmaBazindaAyrintiData"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <Column field="siparisNo" header="Sipariş No"></Column>
        <Column field="satisMiktari" header="Satış Miktarı">
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.satisMiktari) }}
          </template>
          <template #footer>
            {{ formatDecimal(firmaBazindaAyrintiSipMiktari) }}
          </template>
        </Column>
        <Column field="satisToplami" header="Satış Toplamı ($)">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.satisToplami) }}
          </template>
          <template #footer>
            {{ formatPrice(firmaBazindaAyrintiSipTop) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="is_teklifler_ayrinti_form"
    header="Teklifler Ayrıntı"
    :modal="true"
    maximizable
    position="top"
  >
    <div class="card">
      <DataTable
        :value="tekliflerAylikData"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <Column field="tarih" header="Tarih"></Column>
        <Column field="musteri" header="Müşteri"></Column>
        <Column field="kaynakYeri" header="Kaynak Yeri"></Column>
        <Column field="aciklama" header="Aciklama"></Column>
      </DataTable>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="is_teklifler_ayrinti_form_yillik"
    header="Teklifler Ayrıntı"
    :modal="true"
    maximizable
    position="top"
  >
    <div class="card">
      <DataTable
        :value="tekliflerYillikData"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <Column field="tarih" header="Tarih"></Column>
        <Column field="musteri" header="Müşteri"></Column>
        <Column field="kaynakYeri" header="Kaynak Yeri"></Column>
        <Column field="aciklama" header="Aciklama"></Column>
      </DataTable>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="teklif_ulke_ayrinti_form"
    header="Ülkeye Göre Teklifler Ayrıntı"
    :modal="true"
    maximizable
    position="top"
  >
    <div class="card">
      <DataTable
        :value="teklifUlkeAyrintiData"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <Column field="teklifId" header="Teklif Id"></Column>
        <Column field="teklifNo" header="Teklif No"></Column>
        <Column field="tarih" header="Tarih"></Column>
        <Column field="kullaniciAdi" header="Teklif Sahibi"></Column>
        <Column field="musteriAdi" header="Müşteri"></Column>
      </DataTable>
    </div>
  </Dialog>
</template>

<script>
import { mapGetters } from "vuex";
import raporService from "../../service/RaporService";
import socket from "../../service/SocketService";
import { FilterMatchMode } from "primevue/api";
import countrySevkiyat from "../../components/musteriraporlari/CountrySevkiyat.vue";

export default {
  components: {
    countrySevkiyat
  },
  data() {
    return {
      isClickedSub: false,
      filterKont: {
        firmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filterFinans: {
        musteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filterTedarikci: {
        tedarikci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filterTedarikciSip: {
        tedarikci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filterMusteriSip: {
        tedarikci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filterTeklifler: {
        teklifSahibi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filterTekliflerYil: {
        teklifSahibi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filtersSonEklenenSip: {
        siparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        satisci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      // filterTeklifUlke: {
      //   ulkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      // },
      isMobile: null,
      teklif_ulke_ayrinti_form: false,
      topTeklifSum: 0,
      isLoadTeklifler: false,
      filtersTeklifler: {},
      selectedYear: { year: "2022" },
      years: [
        { year: "2022" },
        { year: "2021" },
        { year: "2020" },
        { year: "2019" },
        { year: "2018" },
      ],
      selectionDate: "",
      is_teklifler_ayrinti_form_yillik: false,
      tekliflerYillikData: null,

      is_teklifler_ayrinti_form: false,
      tekliflerAylikData: null,
      firmaBazindaAyrintiSipTop: null,
      firmaBazindaAyrintiSipMiktari: null,
      firmaBazindaAyrintiData: null,
      is_firma_ayrinti_form: false,
      tedarikciAyrintiMikTopAll: 0,
      tedarikciAyrintiSipTopAll: 0,
      tedarikciAyrintiDataAll: null,
      is_tedarikci_ayrinti_form_all: false,

      tedarikciAyrintiMikTop: 0,
      tedarikciAyrintiSipTop: 0,
      tedarikciAyrintiData: null,
      is_tedarikci_ayrinti_form: false,
      anaSayfaDegisiklikDataAllFilter: null,
      is_form_year: true,
      is_main_all_form: false,
      anaSayfaDegisiklikData: null,
      anaSayfaDegisiklikDataAll: null,

      year: 0,
      month: 0,
      months: {
        1: "Ocak",
        2: "Şubat",
        3: "Mart",
        4: "Nisan",
        5: "Mayıs",
        6: "Haziran",
        7: "Temmuz",
        8: "Ağustos",
        9: "Eylül",
        10: "Ekim",
        11: "Kasım",
        12: "Aralık",
      },
      teklifUlkeAyrintiData: null,
    };
  },
  computed: {
    ...mapGetters([
      'dashboardSubData',
      'dashboardLogsAll',
      'dashboardLogs',
      'dashboardUlkeyeGoreTeklif',
      'kontAlacakTop',
      'finansAlacakTop',
      'tedarikciPriceSum',
      'tedarikciProductSum',
      'musteriPriceSum',
      'musteriPriceProductSum'
    ]),
  },
  created() {
    this.$store.dispatch("dashboard_sub_data_load");
    const d = new Date();
    this.year = d.getFullYear();
    this.month = this.months[d.getMonth() + 1];
    this.degisiklikAnaSayfaList();
    raporService.getUlkeTeklifler(this.selectedYear.year).then((data) => {
      this.topUlkeTeklif(data);
      this.$store.dispatch("dashboard_ulkeye_gore_load", data);
    });
    this.isMobile = window.innerWidth;
  },
  mounted() {
    socket.siparis.on("anaSayfaDegisiklikEmit", (data) => {
      this.$store.dispatch("dashboard_logs_load", data);
    });
    this.emitter.on("isClickedAlt", (data) => {
      this.isClickedSub = data;
    });
  },
  methods: {
    isSelectedTeklifUlke(event) {
      raporService
        .getUlkeyeGoreTeklifAyrinti(this.selectedYear.year, event.data.ulkeId)
        .then((data) => {
          this.teklifUlkeAyrintiData = data;
          this.teklif_ulke_ayrinti_form = true;
        });
    },
    topUlkeTeklif(data) {
      this.topTeklifSum = 0;
      for (let item of data) {
        this.topTeklifSum += item.topTeklif;
      }
    },
    isSelectedUlkeTeklif(event) {
      raporService.getUlkeTeklifler(event.value.year).then((data) => {
        this.topUlkeTeklif(data);
        this.$store.dispatch("dashboard_ulkeye_gore_load", data);
        this.isLoadTeklifler = false;
      });
    },
    isSelectedYear() {
      let year1 = this.selectionDate[0].getFullYear();
      let year2 = this.selectionDate[1].getFullYear();
      let month1 = this.selectionDate[0].getMonth();
      let month2 = this.selectionDate[1].getMonth();
      let day1 = this.selectionDate[0].getDate();
      let day2 = this.selectionDate[1].getDate();
      let dates = {
        year1: year1,
        year2: year2,
        month1: month1 + 1,
        month2: month2 + 1,
        day1: day1,
        day2: day2,
      };
      raporService.postLogsAyrinti(dates).then((data) => {
        this.$store.dispatch("dashboard_logs_all_load", data);
      });
    },
    tekliflerAyrintiYillik(event) {
      raporService
        .getTekliflerAyrintiData(event.data.teklifSahibiId)
        .then((data) => {
          this.tekliflerYillikData = data.yillikTeklifler;
          this.is_teklifler_ayrinti_form_yillik = true;
        });
    },
    tekliflerAyrintiAylik(event) {
      raporService
        .getTekliflerAyrintiData(event.data.teklifSahibiId)
        .then((data) => {
          this.tekliflerAylikData = data.aylikTeklifler;
          this.is_teklifler_ayrinti_form = true;
        });
    },
    firmaBazindaAyrintiSelected(event) {
      this.firmaBazindaAyrintiSipTop = 0;
      this.firmaBazindaAyrintiSipMiktari = 0;
      raporService
        .getFirmaBazindaAyrintiData(event.data.firmaId)
        .then((data) => {
          this.firmaBazindaAyrintiData = data;
          for (let i of data) {
            this.firmaBazindaAyrintiSipTop += i.satisToplami;
            this.firmaBazindaAyrintiSipMiktari += i.satisMiktari;
          }
          this.is_firma_ayrinti_form = true;
        });
    },
    tedarikciAyrintiAllSelected(event) {
      this.tedarikciAyrintiMikTopAll = 0;
      this.tedarikciAyrintiSipTopAll = 0;
      raporService
        .getTedarikciAyrintiData(event.data.tedarikci_id)
        .then((data) => {
          this.tedarikciAyrintiDataAll = data.tedarikciAyrintiAll;
          for (let i of data.tedarikciAyrintiAll) {
            this.tedarikciAyrintiMikTopAll += i.satisToplami;
            this.tedarikciAyrintiSipTopAll += i.satisMiktari;
          }
          this.is_tedarikci_ayrinti_form_all = true;
        });
    },
    tedarikciAyrintiSelected(event) {
      this.tedarikciAyrintiMikTop = 0;
      this.tedarikciAyrintiSipTop = 0;
      raporService
        .getTedarikciAyrintiData(event.data.tedarikci_id)
        .then((data) => {
          this.tedarikciAyrintiData = data.tedarikciAyrinti;
          for (let i of data.tedarikciAyrinti) {
            this.tedarikciAyrintiSipTop += i.satisToplami;
            this.tedarikciAyrintiMikTop += i.satisMiktari;
          }
          this.is_tedarikci_ayrinti_form = true;
        });
    },
    evrak_indir(dosya_link, dosya_adi) {
      const link = document.createElement("a");
      link.href = dosya_link;
      link.setAttribute("download", `${dosya_adi}.pdf`);
      document.body.appendChild(link);
      link.click();
    },
    proformaDowload(link) {
      this.evrak_indir(link, "Proforma");
      /*
            for (var i=0; i < this.siparisler.length; i++)
            {
                if ( this.siparisler[i].siparisNo == siparis){
                        
                        console.log("this.siparisler[i].link",this.siparisler[i].link)
                        
                        this.evrak_indir(this.siparisler[i].link,'Proforma')
                        
                }
                    
            }*/
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    anaSayfaDegisiklikAll() {
      raporService.getAnaSayfaDegisiklikListAll().then((data) => {
        console.log(data);
        this.$store.dispatch("dashboard_logs_all_load", data);
      });
      this.is_main_all_form = true;
    },
    degisiklikAnaSayfaList() {
      raporService.getAnaSayfaDegisiklikList().then((data) => {
        this.$store.dispatch("dashboard_logs_load", data);
      });
    },
  },
};
</script>

<style scoped></style>

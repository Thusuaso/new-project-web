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
        <DataTable
          :value="byCustomersProduct"
          responsiveLayout="scroll"
          sortField="toplam"
          :sortOrder="-1"
        >
          <template #header>
            <div class="table-header" style="font-size: 15px">
              Güncel Tarihe Kadar Üretimdeki Sipariş Toplamları
            </div>
          </template>
          <Column field="musteriAdi" header="Müşteri Adı"></Column>
          <Column field="marketing" header="Marketing"></Column>
          <Column field="ulkeAdi" header="Ülke"></Column>

          <Column field="satisToplamiBuYil" header="2023">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.satisToplamiBuYil) }}
            </template>
            <template #footer>
              {{ formatPrice(uretimBuYilTop) }}
            </template>
          </Column>
          <Column field="satisToplamiGecenYil" header="2022">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.satisToplamiGecenYil) }}
            </template>
            <template #footer>
              {{ formatPrice(uretimGecenYilTop) }}
            </template>
          </Column>
          <Column field="satisToplamiOncekiYil" header="2021">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.satisToplamiOncekiYil) }}
            </template>
            <template #footer>
              {{ formatPrice(uretimOncekiYilTop) }}
            </template>
          </Column>
          <Column field="satisToplamiOnDokuzYil" header="2020">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.satisToplamiOnDokuzYil) }}
            </template>
            <template #footer>
              {{ formatPrice(uretimOnDokuzYilTop) }}
            </template>
          </Column>
          <Column field="satisToplamiOnSekizYil" header="2019">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.satisToplamiOnSekizYil) }}
            </template>
            <template #footer>
              {{ formatPrice(uretimOnSekizYilTop) }}
            </template>
          </Column>
          <Column field="toplam" header="Toplam (Fob)">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(toplam) }}
            </template>
          </Column>
          <Column field="toplamCfr" header="Toplam (DDP)">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamCfr) }}
            </template>
            <template #footer>
              {{ formatPrice(toplamCfr) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <div class="columns">
      <div class="column" v-if="imperialHomes.length > 0">
        <DataTable
          :value="imperialHomes"
          responsiveLayout="scroll"
          sortField="toplam"
          :sortOrder="-1"
        >
          <template #header>
            <div class="table-header" style="font-size: 15px">
              İmperial Homes
            </div>
          </template>
          <Column field="musteriAdi" header="Müşteri Adı"></Column>

          <Column field="satisToplamiBuYil" header="2022">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.satisToplamiBuYil) }}
            </template>
            <template #footer>
              {{ formatPrice(imperialHomesBuYilTop) }}
            </template>
          </Column>
          <Column field="toplam" header="Toplam (Fob)">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(imperialHomesTotalTopFob) }}
            </template>
          </Column>
          <Column field="toplamCfr" header="Toplam (DDP)">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamCfr) }}
            </template>
            <template #footer>
              {{ formatPrice(imperialHomesTotalTopCfr) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="column" v-if="mekmar.length > 0">
        <DataTable
          :value="mekmar"
          responsiveLayout="scroll"
          sortField="toplam"
          :sortOrder="-1"
        >
          <template #header>
            <div class="table-header" style="font-size: 15px">Mekmar</div>
          </template>
          <Column field="musteriAdi" header="Müşteri Adı"></Column>

          <Column field="satisToplamiBuYil" header="2022">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.satisToplamiBuYil) }}
            </template>
            <template #footer>
              {{ formatPrice(mekmarBuYilTop) }}
            </template>
          </Column>
          <Column field="toplam" header="Toplam (Fob)">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(mekmarTotalTopFob) }}
            </template>
          </Column>
          <Column field="toplamCfr" header="Toplam (DDP)">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamCfr) }}
            </template>
            <template #footer>
              {{ formatPrice(mekmarTotalTopCfr) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="column" v-if="icPiyasa.length > 0">
        <DataTable
          :value="icPiyasa"
          responsiveLayout="scroll"
          sortField="toplam"
          :sortOrder="-1"
        >
          <template #header>
            <div class="table-header" style="font-size: 15px">İç Piyasa</div>
          </template>
          <Column field="musteriAdi" header="Müşteri Adı"></Column>

          <Column field="satisToplamiBuYil" header="2022">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.satisToplamiBuYil) }}
            </template>
            <template #footer>
              {{ formatPrice(icPiyasaBuYilTop) }}
            </template>
          </Column>
          <Column field="toplam" header="Toplam (Fob)">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(icPiyasaTotalTopFob) }}
            </template>
          </Column>
          <Column field="toplamCfr" header="Toplam (DDP)">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamCfr) }}
            </template>
            <template #footer>
              {{ formatPrice(icPiyasaTotalTopCfr) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="column" v-if="mekmer.length > 0">
        <DataTable
          :value="mekmer"
          responsiveLayout="scroll"
          sortField="toplam"
          :sortOrder="-1"
        >
          <template #header>
            <div class="table-header" style="font-size: 15px">Mekmer</div>
          </template>
          <Column field="musteriAdi" header="Müşteri Adı"></Column>

          <Column field="satisToplamiBuYil" header="2022">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.satisToplamiBuYil) }}
            </template>
            <template #footer>
              {{ formatPrice(mekmerBuYilTop) }}
            </template>
          </Column>
          <Column field="toplam" header="Toplam (Fob)">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(mekmerTotalTopFob) }}
            </template>
          </Column>
          <Column field="toplamCfr" header="Toplam (DDP)">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplamCfr) }}
            </template>
            <template #footer>
              {{ formatPrice(mekmerTotalTopCfr) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <DataTable
          :value="byMarketingProduct"
          responsiveLayout="scroll"
          :loading="isChangeLoading"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px"
                  >Marketing Halihazırdaki Üretim
                </span>
              </div>
            </div>
          </template>
          <Column
            field="marketing"
            header="Marketing"
            bodyStyle="text-align:center"
          ></Column>
          <Column
            field="fobToplam"
            header="Fob"
            bodyStyle="text-align:center"
            footerStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fobToplam) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingProductFobSum) }}
            </template>
          </Column>
          <Column
            field="cfrToplam"
            header="DDP"
            bodyStyle="text-align:center"
            footerStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.cfrToplam) }}
            </template>
            <template #footer>
              {{ formatPrice(byMarketingProductCfrSum) }}
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
  data() {
    return {
      musteriUretimList: null,
      ozel_musteri: null,
      liste: null,
      filters: {},
      rapor: "Hepsi",
      uretimBuYilTop: 0,
      uretimGecenYilTop: 0,
      uretimOncekiYilTop: 0,
      uretimOnDokuzYilTop: 0,
      uretimOnSekizYilTop:0,
      toplam: 0,
      toplamCfr: 0,
      imperialHomes: [],
      mekmar: [],
      mekmer: [],
      icPiyasa: [],
      efes: [],
      imperialHomesBuYilTop: 0,
      imperialHomesTotalTopFob: 0,
      imperialHomesTotalTopCfr: 0,
      mekmarBuYilTop: 0,
      mekmarTotalTopFob: 0,
      mekmarTotalTopCfr: 0,
      mekmerBuYilTop: 0,
      mekmerTotalTopFob: 0,
      mekmerTotalTopCfr: 0,
      icPiyasaBuYilTop: 0,
      icPiyasaTotalTopFob: 0,
      icPiyasaTotalTopCfr: 0,
    };
  },
  computed: {
    ...mapGetters([
      "servis_adres",
      "byCustomersProduct",
      "byMarketingProduct",
      "byMarketingProductFobSum",
      "byMarketingProductCfrSum",
    ]),
  },
  created() {
    service.getMusteriListUretim().then((data) => {
      this.$store.dispatch("byCustomersProductAct", data);
      this.imperialHomes = data.filter((x) => x.marketing == "Imperial Homes");
      this.mekmar = data.filter((x) => x.marketing == "Mekmar");
      this.mekmer = data.filter((x) => x.marketing == "Mekmer");
      this.icPiyasa = data.filter((x) => x.marketing == "İç Piyasa");

      this.imperialHomesTotal(this.imperialHomes);
      this.mekmarTotal(this.mekmar);
      this.mekmerTotal(this.mekmer);
      this.icPiyasaTotal(this.icPiyasa);

      this.uretimToplam(data);
    });
  },
  methods: {
    excel_cikti_click() {
      const data = {
        byCustomersProduct: this.byCustomersProduct,
        byMarketingProduct: this.byMarketingProduct,
        imperialHomes: this.imperialHomes,
        mekmar: this.mekmar,
        mekmer: this.mekmer,
        icPiyasa: this.icPiyasa,
      };
      service.getCustomersExcell(data).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "raporlar/dosyalar/customersExcellCikti";
          link.setAttribute("download", "Müşteri_Bazında_Üretim_Raporu.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
    uretimToplam(liste) {
      this.uretimBuYilTop = 0;
      this.uretimGecenYilTop = 0;
      this.uretimOncekiYilTop = 0;
      this.uretimOnDokuzYilTop = 0;
      this.uretimOnSekizYilTop = 0;

      this.toplam = 0;
      this.toplamCfr = 0;
      for (let i in liste) {
        this.uretimBuYilTop += liste[i].satisToplamiBuYil;
        this.uretimGecenYilTop += liste[i].satisToplamiGecenYil;
        this.uretimOncekiYilTop += liste[i].satisToplamiOncekiYil;
        this.uretimOnDokuzYilTop += liste[i].satisToplamiOnDokuzYil;
        this.uretimOnSekizYilTop += liste[i].satisToplamiOnSekizYil
        this.toplam += liste[i].toplam;
        this.toplamCfr += liste[i].toplamCfr;
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    get_musteri_list_excell_cikti_btn() {
      const data = this.musteri_list;
      service.get_musteri_list_excell_cikti(data).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href = this.servis_adres + "raporlar/musteri/musteriexcellCikti";
          //link.href = "http://localhost:5000/raporlar/musteri/musteriexcellCikti"
          link.setAttribute("download", "musteri_listesi.xlsx");
          document.body.appendChild(link);
          link.click();
          this.is_excel = false;
        }
      });
    },
    statuSecim() {
      //statü değişiminde

      if (this.rapor) {
        let result;

        if (this.rapor == "Hepsi") {
          result = this.liste;
        }
        if (this.rapor == "Mekmar") {
          result = [...this.liste.filter((x) => x.marketing === this.rapor)];
        }

        if (this.rapor == "Ozel") {
          result = this.ozel_musteri;
        }

        this.musteri_list = result;
      }
    },
    imperialHomesTotal(liste) {
      this.imperialHomesBuYilTop = 0;
      this.imperialHomesTotalTopFob = 0;
      this.imperialHomesTotalTopCfr = 0;
      for (let i of liste) {
        this.imperialHomesBuYilTop += i.satisToplamiBuYil;
        this.imperialHomesTotalTopFob += i.toplam;
        this.imperialHomesTotalTopCfr += i.toplamCfr;
      }
    },
    mekmarTotal(liste) {
      this.mekmarBuYilTop = 0;
      this.mekmarTotalTopFob = 0;
      this.mekmarTotalTopCfr = 0;
      for (let i of liste) {
        this.mekmarBuYilTop += i.satisToplamiBuYil;
        this.mekmarTotalTopFob += i.toplam;
        this.mekmarTotalTopCfr += i.toplamCfr;
      }
    },
    mekmerTotal(liste) {
      this.mekmerBuYilTop = 0;
      this.mekmerTotalTopFob = 0;
      this.mekmerTotalTopCfr = 0;
      for (let i of liste) {
        this.mekmerBuYilTop += i.satisToplamiBuYil;
        this.mekmerTotalTopFob += i.toplam;
        this.mekmerTotalTopCfr += i.toplamCfr;
      }
    },
    icPiyasaTotal(liste) {
      this.icPiyasaBuYilTop = 0;
      this.icPiyasaTotalTopFob = 0;
      this.icPiyasaTotalTopCfr = 0;
      for (let i of liste) {
        this.icPiyasaBuYilTop += i.satisToplamiBuYil;
        this.icPiyasaTotalTopFob += i.toplam;
        this.icPiyasaTotalTopCfr += i.toplamCfr;
      }
    },
  },
};
</script>

<style scoped>
.p-datatable {
  font-size: 10px;
}
#statuSecim {
  font-size: 12px;
}
</style>

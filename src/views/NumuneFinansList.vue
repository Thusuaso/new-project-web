<template>
  <section>
    <div class="column is-12" style="margin-left: -11px">
      <Dropdown
        v-model="select_yil"
        :options="yil_listesi"
        @change="YilSecim(select_yil.yil)"
        optionLabel="yil"
        placeholder="Select a Year"
      >
        <template #value="slotProps">
          <div class="p-dropdown-car-value">
            <span>{{ slotProps.value.yil }}</span>
          </div>
        </template>
      </Dropdown>

      <Button type="text" label="Excell" class="btn btn-success" @click="excel_cikti"/>

    </div>
    <div class="columns is-multiline is-centered">
      <div class="column is-9 is-centered">
        <DataTable
          :value="liste"
          selectionMode="single"
          :sortOrder="-1"
          :scrollable="true"
          scrollHeight="490px"
          v-model:selection="select"
          v-model:filters="filters"
          filterDisplay="menu"
          dataKey="id"
          @row-select="depo_item_sec($event)"
          @filter="isNumuneFinans"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 14px"> Numune Alacak Listesi</span>
              </div>
            </div>
          </template>

          <Column
            field="musteriadi"
            header="Müşteri"
            headerStyle="font-size:10px;"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              <div class="isMobile">
                {{ slotProps.data.musteriadi }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Customer"
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>

          <Column
            field="kuryeAlis"
            header="USD-Alış"
            bodyStyle="text-align:center;"
            headerStyle="background-color:#EC7063 ;color:white"
          >
            <template #body="slotProps">
              <div class="isMobile">
                {{ formatPriceDolar(slotProps.data.kuryeAlis) }}
              </div>
            </template>

            <template #footer>
              <div class="isMobile">
                {{ formatPriceDolar(kuryeAlis_toplam) }}
              </div>
            </template>
          </Column>
          <Column
            field="kuryeSatis"
            header="USD-Satış"
            bodyStyle="text-align:center;"
            headerStyle="background-color:#45B39D ;color:white"
          >
            <template #body="slotProps">
              <div class="isMobile">
                {{ formatPriceDolar(slotProps.data.kuryeSatis) }}
              </div>
            </template>

            <template #footer>
              <div class="isMobile">
                {{ formatPriceDolar(kuryeSatis_toplam) }}
              </div>
            </template>
          </Column>
          <Column
            field="TL_Alis"
            header="TL-Alış"
            bodyStyle="text-align:center;"
            headerStyle="background-color:#EC7063 ;color:white"
          >
            <template #body="slotProps">
              <div class="isMobile">
                {{ formatPriceTL(slotProps.data.TL_Alis) }}
              </div>
            </template>
            <template #footer>
              <div class="isMobile">
                {{ formatPriceTL(TLAlis_Toplam) }}
              </div>
            </template>
          </Column>
          <Column
            field="TL_Satis"
            header="TL-Satış"
            bodyStyle="text-align:center;"
            headerStyle="background-color:#45B39D ;color:white"
          >
            <template #body="slotProps">
              <div class="isMobile">
                {{ formatPriceTL(slotProps.data.TL_Satis) }}
              </div>
            </template>

            <template #footer>
              <div class="isMobile">
                {{ formatPriceTL(TLSatis_Toplam) }}
              </div>
            </template>
          </Column>
          <Column
            field="Euro_Alis"
            header="EUR-Alış"
            bodyStyle="text-align:center;"
            headerStyle="background-color:#EC7063 ;color:white"
          >
            <template #body="slotProps">
              <div class="isMobile">
                {{ formatPriceEuro(slotProps.data.Euro_Alis) }}
              </div>
            </template>

            <template #footer>
              <div class="isMobile">
                {{ formatPriceEuro(EuroAlis_Toplam) }}
              </div>
            </template>
          </Column>
          <Column
            field="Euro_Satis"
            header="EUR-Satış"
            bodyStyle="text-align:center;"
            headerStyle="background-color:#45B39D ;color:white"
          >
            <template #body="slotProps">
              <div class="isMobile">
                {{ formatPriceEuro(slotProps.data.Euro_Satis) }}
              </div>
            </template>
            <template #footer>
              <div class="isMobile">
                {{ formatPriceEuro(EuroSatis_Toplam) }}
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="column is-3 is-centered">
        <DataTable
          :value="banka_list"
          :sortOrder="-1"
          :scrollable="true"
          scrollHeight="490px"
          v-model:selection="selectedBankAccount"
           selectionMode="single"
           @row-select="bank_account_selected($event)"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 14px"> Bankaya Gelen Ödeme Tutarı</span>
              </div>
            </div>
          </template>
          <Column field="banka" header="Banka" bodyStyle="text-align:center;">
            <template #body="slotProps">
              {{ slotProps.data.banka }}
            </template>
          </Column>
          <Column field="bedel" header="Total" bodyStyle="text-align:center;">
            <template #body="slotProps">
              {{ formatPriceDolar(slotProps.data.bedel) }}
            </template>
            <template #footer>
              {{ formatPriceDolar(banka_toplami) }}
            </template>
          </Column>
        </DataTable>

        <table>
          <tr>
            <th>Dolar Kar</th>
            <th>Euro Kar</th>
            <th>TL Kar</th>

          </tr>
          <tr>
            <td>
              ${{ dolar_fark }}
            </td>
            <td>
              €{{ euro_fark }}
            </td>
            <td>
              ₺{{ tl_fark }}
            </td>
          </tr>
          <tr>
            <td>
              %{{ dolar_yuzde }}
            </td>
            <td>
              %{{ euro_yuzde }}
            </td>
            <td>
              %{{ tl_yuzde }}
            </td>
          </tr>
        </table>
      </div>
      
      <Dialog
        v-model:visible="is_form"
        v-model:header="form_baslik"
        :modal="true"
        position="top"
        maximizable
        :breakpoints="{'960px': '75vw', '640px': '100vw'}" 
        :style="{width: '85vw'}"
      >
        <numuneMasraflar :select_depo="select_depo" />
      </Dialog>

      <Dialog
        v-model:visible="is_bank_ayrinti_form"
        :modal="true"

      >
        <DataTable
        
          :value="banka_gelen_bedel_list"

        >
        <Column
          field="bankaya_gelen_tarih"
          header="Bankaya Geldiği Tarih"
          bodyStyle="text-align:center;"
        
        >
        </Column>
        <Column field="numune_tarihi" header="Numune Tarihi" bodyStyle="text-align:center;">
        </Column>
        <Column field="banka_adi" header="Banka" bodyStyle="text-align:center;"></Column>
        <Column field="musteri_adi" header="Müşteri" bodyStyle="text-align:center;"></Column>
        <Column field="numune_no" header="Numune No" bodyStyle="text-align:center;"></Column>
        <Column field="bedel_dolar" header="Dolar ($)" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ formatPriceDolar(slotProps.data.bedel_dolar) }}
          </template>
          <template #footer>
            {{ formatPriceDolar(dolar_sum) }}
          </template>
        
        </Column>
        <Column field="bedel_euro" header="Euro (€)" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ formatPriceEuro(slotProps.data.bedel_euro) }}
          </template>
          <template #footer>
            {{ formatPriceEuro(euro_sum) }}
          </template>
        
        </Column>
        <Column field="bedel_tl" header="Tl (₺)" bodyStyle="text-align:center;">
        <template #body="slotProps">
          {{ formatPriceTL(slotProps.data.bedel_tl) }}
        </template>
          <template #footer>
            {{ formatPriceTL(tl_sum) }}
          </template>
        </Column>



        </DataTable>
      </Dialog>
    </div>
  </section>
</template>
<script>
import service from "../service/NumuneService";
import numuneMasraflar from "../components/numuneler/numuneMasraflar";
import { FilterMatchMode } from "primevue/api";
import raporService from '../service/RaporService';
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['servis_adres'])
  },
  components: {
    numuneMasraflar,
  },
  data() {
    return {
      dolar_sum: 0,
      euro_sum: 0,
      tl_sum:0,
      is_bank_ayrinti_form:false,
      selectedBankAccount:[],
      select_depo: 0,
      banka_toplami: 0,
      select: null,
      is_form: false,
      form_baslik: "",
      liste: {},
      banka_list: null,
      filters: {
        musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      kuryeSatis_toplam: 0,
      kuryeAlis_toplam: 0,
      TLAlis_Toplam: 0,
      TLSatis_Toplam: 0,
      EuroAlis_Toplam: 0,
      EuroSatis_Toplam: 0,
      yil_listesi: null,
      select_yil: null,
      yil_baslik: "",
      dolar_fark: 0,
      euro_fark: 0,
      tl_fark: 0,
      dolar_yuzde: 0,
      euro_yuzde: 0,
      tl_yuzde: 0,
      banka_gelen_bedel_list:[],
      
    };
  },

  created() {

    this.$store.dispatch("fullscreenLoadingAct",true);

    service.getNumuneYilListesi().then((data) => {
      this.yil_listesi = data.yil_listesi;
      this.select_yil = this.yil_listesi[0];

      service.getNumuneFinansListesi(this.select_yil.yil).then((data) => {
        this.liste = data.numune_list;
        this.banka_list = data.banka_list;
        this.genel_toplam(this.liste);
        this.banka_toplam(this.banka_list);
        this.$store.dispatch("fullscreenLoadingAct",false);
      });
    });
  },
  mounted() {},
  methods: {
    excel_cikti() {
      this.$store.dispatch("fullscreenLoadingAct", true);
      raporService.getNumunelerExcelCikti(this.liste).then((responce) => {
        if (responce.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "raporlar/listeler/numuneler/numuneExcellCikti";

          link.setAttribute("download", "numuneler_excel.xlsx");
          document.body.appendChild(link);
          link.click();
          this.$store.dispatch("fullscreenLoadingAct", false);

        }
      });

    },
    bank_account_detail_sum(data) {
      this.dolar_sum= 0
      this.euro_sum= 0
      this.tl_sum= 0
      for (let item of data) {
        this.dolar_sum += item.bedel_dolar
        this.euro_sum += item.bedel_euro
        this.tl_sum += item.bedel_tl
      }
    },
    bank_account_selected(event) {

      this.$store.dispatch("fullscreenLoadingAct", true);

      service.getNumuneBankayaGelenAyrinti(event.data.banka, this.select_yil.yil).then(data => {
        this.banka_gelen_bedel_list = data
        this.bank_account_detail_sum(data)
        this.is_bank_ayrinti_form = true
        this.$store.dispatch("fullscreenLoadingAct", false);

      })

    },
    isNumuneFinans(event) {
      this.genel_toplam(event.filteredValue);
    },
    banka_toplam(liste) {
      this.banka_toplami = 0;

      for (let key in liste) {
        const item = liste[key];

        this.banka_toplami += item.bedel;
      }
    },
    YilSecim(select_yil) {
      this.$store.dispatch("fullscreenLoadingAct",true);

      service.getNumuneFinansListesi(select_yil).then((data) => {
        this.liste = data.numune_list;
        this.banka_list = data.banka_list;
        this.genel_toplam(this.liste);
        this.banka_toplam(this.banka_list);
        this.$store.dispatch("fullscreenLoadingAct",false);
      });
    },
    genel_toplam(liste) {
      this.kuryeSatis_toplam = 0;
      this.kuryeAlis_toplam = 0;
      this.TLAlis_Toplam = 0;
      this.TLSatis_Toplam = 0;
      this.EuroAlis_Toplam = 0;
      this.EuroSatis_Toplam = 0;

      for (let key in liste) {
        const item = liste[key];

        this.kuryeSatis_toplam += item.kuryeSatis;
        this.kuryeAlis_toplam += item.kuryeAlis;
        this.TLAlis_Toplam += item.TL_Alis;
        this.TLSatis_Toplam += item.TL_Satis;
        this.EuroAlis_Toplam += item.Euro_Alis;
        this.EuroSatis_Toplam += item.Euro_Satis;
      }
      this.dolar_fark = Math.round(this.kuryeSatis_toplam - this.kuryeAlis_toplam)
      this.euro_fark = Math.round(this.EuroSatis_Toplam - this.EuroAlis_Toplam)
      this.tl_fark = Math.round(this.TLSatis_Toplam - this.TLAlis_Toplam)

      this.dolar_yuzde = Math.round((this.dolar_fark / this.kuryeSatis_toplam) * 100)
      if (this.dolar_yuzde.toString() == 'NaN' || this.dolar_yuzde.toString() == '-Infinity' || this.dolar_yuzde.toString() == 'Infinity'){
        this.dolar_yuzde = 0 
      }
      this.euro_yuzde = Math.round((this.euro_fark / this.EuroSatis_Toplam) * 100) 
      if (this.euro_yuzde.toString() == 'NaN' || this.euro_yuzde.toString() == '-Infinity' || this.euro_yuzde.toString() == 'Infinity') {
        this.euro_yuzde = 0
      }

      this.tl_yuzde = Math.round((this.tl_fark / this.TLSatis_Toplam) * 100) 
      if (this.tl_yuzde.toString() == 'NaN' || this.tl_yuzde.toString() == '-Infinity' || this.tl_yuzde.toString() == 'Infinity') {
        this.tl_yuzde = 0
      }


    },
    formatPriceDolar(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");

      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatPriceTL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");

      return "₺" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatPriceEuro(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");

      return "€" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    depo_item_sec(event) {
      this.select_depo = event.data.id;
      this.form_baslik = event.data.musteriadi;

      this.$store.dispatch("seleksiyonSelectItemActions");
      this.is_form = true;
    },
  },
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.p-datatable {
  font-size: 12px;
}
@media screen and (max-width: 576px) {
  .isMobile {
    font-size: 10px;
    word-break: break-all;
  }
}
</style>

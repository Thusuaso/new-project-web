<template>
  <Card>
    <template #content>
      <div class="columns">
        <div class="column">
          <Button
            @click="excel_cikti_click"
            label="Excel"
            class="p-button-primary"
          />
        </div>
        <div class="column">
          <RadioButton
            name="city"
            value="Mekmer"
            v-model="marketing"
            @change="changeMarketing"
          />Mekmer
          <RadioButton
            name="city"
            value="Mekmar"
            v-model="marketing"
            @change="changeMarketing"
          />Mekmar
          <RadioButton
            name="city"
            value="Hepsi"
            v-model="marketing"
            @change="changeMarketing"
          />Hepsi
        </div>
      </div>

      <div class="columns">
        <div class="column" style="background-color: #f44336">
          Hiç Üretilmemiş
        </div>
        <div class="column" style="background-color: #c6e2ff">
          Biraz Üretimi Mevcut
        </div>
        <div class="column" style="background-color: #66ff66">
          Üretimi Tamamlanmış
        </div>
        <div class="column" style="background-color: yellow">
          Üretim Fazlalığı Var
        </div>
      </div>
    </template>
  </Card>
  <DataTable
    :value="uretimUrunler"
    :paginator="true"
    :rows="20"
    selectionMode="single"
    dataKey="id"
    stateStorage="session"
    stateKey="dt-state-demo-session"
    responsiveLayout="scroll"
    v-model:filters="filters"
    filterDisplay="row"
    @filter="uretilecekUrunlerToplam($event)"
    ref="uretimUrunler"
    @row-select="isSelectUrun($event)"
    :loading="$store.getters.datatableLoading"
  >
    <Column
      field="kategori"
      header="Kategori"
      headerStyle="width:13%"
      :showFilterMenu="false"
    >
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
          v-tooltip.top.focus="'Filter as you type'"
        />
      </template>
    </Column>
    <Column
      field="urunAdi"
      header="Ürün Adı"
      headerStyle="width:17%"
      :showFilterMenu="false"
    >
      <template #body="slotProps">
        {{ slotProps.data.urunAdi }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          @input="filterCallback()"
          class="p-column-filter"
          placeholder="Search by Product Name"
          v-tooltip.top.focus="'Filter as you type'"
        />
      </template>
    </Column>
    <Column
      field="yuzey"
      header="Yüzey İşlem"
      headerStyle="width:17%"
      :showFilterMenu="false"
    >
      <template #body="slotProps">
        {{ slotProps.data.yuzey }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          @input="filterCallback()"
          class="p-column-filter"
          placeholder="Search by Surface"
          v-tooltip.top.focus="'Filter as you type'"
        />
      </template>
    </Column>
    <Column
      field="en"
      header="En"
      headerStyle="width:5%"
      :showFilterMenu="false"
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
          v-tooltip.top.focus="'Filter as you type'"
        />
      </template>
    </Column>
    <Column
      field="boy"
      header="Boy"
      headerStyle="width:5%"
      :showFilterMenu="false"
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
          v-tooltip.top.focus="'Filter as you type'"
        />
      </template>
    </Column>
    <Column
      field="kenar"
      header="Kenar"
      headerStyle="width:5%"
      :showFilterMenu="false"
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
          v-tooltip.top.focus="'Filter as you type'"
        />
      </template>
    </Column>
    <Column
      field="sipMiktari"
      header="Siparişler Miktarı"
      :sortable="true"
      headerStyle="width:10%"
    >
      <template #body="slotProps">
        {{ formatDecimal(slotProps.data.sipMiktari) }}
      </template>
      <template #footer>
        {{ formatDecimal(sipToplami) }}
      </template>
    </Column>
    <Column
      field="uretimMiktar"
      header="Üretilen Miktar"
      :sortable="true"
      headerStyle="width:10%"
    >
      <template #body="slotProps">
        {{ formatDecimal(slotProps.data.uretimMiktar) }}
      </template>
      <template #footer>
        {{ formatDecimal(uretimToplami) }}
      </template>
    </Column>
    <Column
      field="uretilmesiGereken"
      header="Üretilmesi Gereken"
      :sortable="true"
      headerStyle="width:10%"
    >
      <template #body="slotProps">
        <div :style="{ backgroundColor: slotProps.data.background }">
          {{ formatDecimal(slotProps.data.uretilmesiGereken) }}
        </div>
      </template>
    </Column>
  </DataTable>

  <Dialog
    v-model:visible="isUretilecekForm"
    :modal="true"
    header="Üretilecek Ürün Ayrıntı"
    position="top"
    maximizable
    :breakpoints="{'960px': '75vw', '640px': '100vw'}" 
    :style="{width: '100%'}"
  >
    <div class="columns">
      <div class="column is-12">
        <DataTable
          :value="uretimUrunlerAyrinti"
          dataKey="id"
          responsiveLayout="scroll"
        >
          <Column field="siparisNo" header="Sipariş No" headerStyle="width:13%">
            <template #body="slotProps">
              {{ slotProps.data.siparisNo }}
            </template>
          </Column>
          <Column field="kategori" header="Kategori" headerStyle="width:13%">
            <template #body="slotProps">
              {{ slotProps.data.kategori }}
            </template>
          </Column>
          <Column field="urunAdi" header="Ürün Adı" headerStyle="width:17%">
            <template #body="slotProps">
              {{ slotProps.data.urunAdi }}
            </template>
          </Column>
          <Column field="yuzey" header="Yüzey İşlem" headerStyle="width:17%">
            <template #body="slotProps">
              {{ slotProps.data.yuzey }}
            </template>
          </Column>
          <Column field="en" header="En" headerStyle="width:5%">
            <template #body="slotProps">
              {{ slotProps.data.en }}
            </template>
          </Column>
          <Column field="boy" header="Boy" headerStyle="width:5%">
            <template #body="slotProps">
              {{ slotProps.data.boy }}
            </template>
          </Column>
          <Column field="kenar" header="Kenar" headerStyle="width:5%">
            <template #body="slotProps">
              {{ slotProps.data.kenar }}
            </template>
          </Column>
          <Column
            field="sipMiktari"
            header="Siparişler Miktarı"
            headerStyle="width:10%"
          >
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.sipMiktari) }}
            </template>
            <template #footer>
              {{ formatDecimal(sipToplamiAyrinti) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </Dialog>
</template>
<script>
import raporService from "../service/RaporService";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      marketing: "Hepsi",
      isMobile: null,
      uretimUrunler: null,
      uretimUrunlerAyrinti: null,
      filters: {
        kategori: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        yuzey: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      sipToplami: 0,
      uretimToplami: 0,
      isUretilecekForm: false,
      sipToplamiAyrinti: 0,
    };
  },
  computed: {
    ...mapGetters(["servis_adres"]),
  },

  methods: {
    changeMarketing() {
      this.$store.dispatch("datatableLoadingBeginAct")
      if (this.marketing == "Hepsi") {
        raporService.getUrunlerUretimList().then((data) => {
          this.uretimUrunler = data;
          this.$store.dispatch("datatableLoadingEndAct")

        });
      } else if (this.marketing == "Mekmar") {
        raporService.getUrunlerUretimListMekmar().then((data) => {
          this.uretimUrunler = data;
          this.$store.dispatch("datatableLoadingEndAct")

        });
      } else if (this.marketing == "Mekmer") {
        raporService.getUrunlerUretimListMekmer().then((data) => {
          this.uretimUrunler = data;
          this.$store.dispatch("datatableLoadingEndAct")

        });
      }
    },
    isSelectUrun(event) {
      this.$store.dispatch("datatableLoadingBeginAct")

      if (this.marketing == "Hepsi") {
        raporService
          .getUrunlerUretimAyrintiList(event.data.urunKartId)
          .then((data) => {
            this.uretimUrunlerAyrinti = data;
            this.isUretilecekForm = true;
            this.sipToplamiAyrinti = 0;
            for (let item of data) {
              this.sipToplamiAyrinti += item.sipMiktari;
            }
            this.$store.dispatch("datatableLoadingEndAct")

          });
      } else if (this.marketing == "Mekmar") {
        raporService
          .getUrunlerUretimAyrintiListMekmar(event.data.urunKartId)
          .then((data) => {
            this.uretimUrunlerAyrinti = data;
            this.isUretilecekForm = true;
            this.sipToplamiAyrinti = 0;
            for (let item of data) {
              this.sipToplamiAyrinti += item.sipMiktari;
            }
            this.$store.dispatch("datatableLoadingEndAct")

          });
      } else if (this.marketing == "Mekmer") {
        raporService
          .getUrunlerUretimAyrintiListMekmer(event.data.urunKartId)
          .then((data) => {
            this.uretimUrunlerAyrinti = data;
            this.isUretilecekForm = true;
            this.sipToplamiAyrinti = 0;
            for (let item of data) {
              this.sipToplamiAyrinti += item.sipMiktari;
            }
            this.$store.dispatch("datatableLoadingEndAct")

          });
      }
    },
    excel_cikti_click() {
      raporService.getUretilenSipExcell(this.uretimUrunler).then((response) => {
        if (response.status) {
          this.musteri_loading = true;
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "raporlar/listeler/uretilenSipExcelListe";
          link.setAttribute("download", "UretilenSip.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    uretilecekUrunlerToplam(event) {
      this.toplam(event.filteredValue);
    },
    toplam(value) {
      this.sipToplami = 0;
      this.uretimToplami = 0;
      for (let i of value) {
        this.sipToplami += i.sipMiktari;
        this.uretimToplami += i.uretimMiktar;
      }
    },
  },
  created() {
    this.$store.dispatch("loadingBeginAct");
    raporService.getUrunlerUretimList().then((data) => {
      this.uretimUrunler = data;
      this.$store.dispatch("loadingEndAct");
    });
  },
  mounted() {},
};
</script>
<style scoped>
.uretimRenkBilgisi {
  display: inline-block;
  float: left;
}

.uretimRenkBilgisiAlt {
  display: inline-block;
  float: left;
  width: 100px;
}

.mobil {
  word-break: break-all;
  font-size: 8px;
  text-align: center;
}
</style>

<template>
  <section>
    <Dropdown
      v-model="selectedYear"
      :options="years"
      optionLabel="year"
      placeholder="Select a Year"
      @change="isSelectedYear"
    />
    <div class="columns">
      <div class="column is-12">
        <DataTable
          :value="tumtekliflist"
          :scrollable="true"
          scrollHeight="500px"
          v-model:filters="filters"
          filterDisplay="row"
          :paginator="true"
          :rows="10"
          selectionMode="single"
          v-model:selection="selectTeklif"
          @row-select="teklifSec($event)"
          :resizableColumns="true" 
          columnResizeMode="expand" 
          showGridlines
        >
          <Column
            field="teklifno"
            header="No"
            bodyStyle="text-align:left;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.teklifno }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Offer No"
                v-tooltip.top.focus="'Filter as you type'"
                style="width:80px;"
              />
            </template>
          </Column>
          <Column field="tarih" header="Tarih" :sortable="true" :showFilterMenu="false">
            <template #body="slotProps">
              {{ slotProps.data.tarih }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Date"
                v-tooltip.top.focus="'Filter as you type'"
                style="width:80px;"
              />
            </template>
          </Column>
          <Column field="kullaniciadi" header="Kimden" :showFilterMenu="false">
            <template #body="slotProps">
              {{ slotProps.data.kullaniciadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Username"
                v-tooltip.top.focus="'Filter as you type'"
                style="width:80px;"
              />
            </template>
          </Column>
          <Column field="musteriadi" header="Müşteri" :sortable="true" :showFilterMenu="false">
            <template #body="slotProps">
              {{ slotProps.data.musteriadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Customer"
                v-tooltip.top.focus="'Filter as you type'"
                style="width:80px;"
              />
            </template>
          </Column>
          <Column field="ulkeadi" header="Ülke" :sortable="true" :showFilterMenu="false">
            <template #body="slotProps">
              {{ slotProps.data.ulkeadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Country"
                v-tooltip.top.focus="'Filter as you type'"
                style="width:80px;"
              />
            </template>
          </Column>
          <Column field="kategoriadi" header="Kategori" :showFilterMenu="false">
            <template #body="slotProps">
              {{ slotProps.data.kategoriadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Category"
                v-tooltip.top.focus="'Filter as you type'"
                style="width:80px;"
              />
            </template>
          </Column>
          <Column field="urunadi" header="Ürün" :sortable="true" :showFilterMenu="false">
            <template #body="slotProps">
              {{ slotProps.data.urunadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Product"
                v-tooltip.top.focus="'Filter as you type'"
                style="width:80px;"
              />
            </template>
          </Column>
          <Column
            field="kalinlik"
            header="K"
            bodyStyle="text-align:center;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.kalinlik }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Edge"
                v-tooltip.top.focus="'Filter as you type'"
                style="width:80px;"
              />
            </template>
          </Column>
          <Column field="enboy" header="E" :showFilterMenu="false">
            <template #body="slotProps">
              {{ slotProps.data.enboy }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Dimension"
                v-tooltip.top.focus="'Filter as you type'"
                style="width:80px;"
              />
            </template>
          </Column>
          <Column field="islemadi" header="Yüzey İşlem" :showFilterMenu="false">
            <template #body="slotProps">
              {{ slotProps.data.islemadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Surface"
                v-tooltip.top.focus="'Filter as you type'"
                style="width:80px;"
              />
            </template>
          </Column>
          <Column
            field="fobfiyat"
            header="Fob"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fobfiyat) }}
            </template>
          </Column>
          <Column
            field="tekliffiyat"
            header="Teklif"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.tekliffiyat) }}
            </template>
          </Column>
          <Column
            field="birim"
            header="Birim"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ slotProps.data.birim }}
            </template>
          </Column>
        </DataTable>
        <Dialog
          v-model:visible="is_teklif_form"
          v-model:header="teklif_form_baslik"
          :modal="true"
          maximizable
          position="top"
        >
          <teklif-giris-form :yeniKayit="false" :teklifId="teklifid" />
        </Dialog>
      </div>
    </div>
  </section>
</template>
<script>
import TeklifGirisForm from "./TeklifGirisForm";
import { FilterMatchMode } from "primevue/api"
export default {
  components: {
    teklifGirisForm: TeklifGirisForm,
  },
  data() {
    return {
      isMobile: null,
      filters: {
        teklifno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kullaniciadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ulkeadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kategoriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kalinlik: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        enboy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        islemadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectTeklif: null,
      teklifid: null,
      teklif_form_baslik: "",
      is_teklif_form: false,
      years: [
        { year: "2022" },
        { year: "2021" },
        { year: "2020" },
        { year: "2019" },
        { year: "2018" },
      ],
      selectedYear: null,
      filterYear: {},
      tumTeklifList2: {},
    };
  },
  props: ["tumtekliflist"],
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    teklifSec(event) {
      this.selectTeklif = event.data;
      const teklif = this.selectTeklif;

      this.teklif_form_baslik =
        teklif.musteriadi + " " + teklif.teklifno + " Nolu Teklif Bilgileri";
      this.teklifid = teklif.teklifid;
      this.is_teklif_form = true;
    },
    isSelectedYear(event) {
      this.tumtekliflist = this.tumTeklifList2.filter(
        (x) => x.year == event.value.year
      );
    },
  },
  created() {
    this.tumTeklifList2 = this.tumtekliflist;
    this.isMobile = window.innerWidth;
  },
  mounted() {
    this.emitter.on('dialog_close', (data) => {
      this.is_teklif_form = data
    })
  }
};
</script>
<style scoped>
.isMobile {
  font-size: 9px;
  word-break: break-all;
}
</style>

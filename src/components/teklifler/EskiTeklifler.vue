<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <DataTable
          :value="eskitekliflist"
          v-model:filters="filters"
          filterDisplay="menu"
          :paginator="true"
          :rows="10"
          :resizableColumns="true" 
          columnResizeMode="expand" 
          showGridlines
        >
          <Column field="tarih" header="Tarih" :sortable="true">
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
              />
            </template>
          </Column>
          <Column field="teklifno" header="TNo">
            <template #body="slotProps">
              {{ slotProps.data.teklifno }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by No"
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column field="kullaniciadi" header="Kim">
            <template #body="slotProps">
              {{ slotProps.data.kullaniciadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by User"
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column field="ulkeadi" header="Ülke" :sortable="true">
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
              />
            </template>
          </Column>
          <Column field="musteriadi" header="Alıcı Adı" :sortable="true">
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
              />
            </template>
          </Column>
          <Column field="teklifdurum" header="Geçiş">
            <template #body="slotProps">
              {{ slotProps.data.teklifdurum }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Status"
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column field="fiyatveren" header="Fiy. Veren">
            <template #body="slotProps">
              {{ slotProps.data.fiyatveren }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Price Giver"
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column field="kategoriadi" header="Kategori">
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
              />
            </template>
          </Column>
          <Column field="urunadi" header="Ürün" :sortable="true">
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
              />
            </template>
          </Column>
          <Column field="islemadi" header="İşlem">
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
              />
            </template>
          </Column>
          <Column field="ebat" header="Ebat">
            <template #body="slotProps">
              {{ slotProps.data.ebat }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Dimension"
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column field="fiyat" header="Fiyat">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fiyat) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </section>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
export default {
  props: ["eskitekliflist"],
  data() {
    return {
      filters: {
        tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        teklifno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kullaniciadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ulkeadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        teklifdurum: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        fiyatveren: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kategoriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        islemadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ebat: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

      },
    };
  },
  created() {},
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style scoped>
.isMobile {
  font-size: 10px;
  word-break: break-all;
}
</style>

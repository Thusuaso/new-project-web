<template>
  <section>
    <div class="columns is-centered">
      <div class="column is-12">
        <h4 class="subtitle has-text-centered">{{ title }}</h4>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <DataTable
          class="p-datatable-responsive p-datatable-cars"
          :value="getDepoUrunListesi"
          v-model:filters="filters"
          filterDisplay="menu"
          selectionMode="simple"
          v-model:selection="selectDepoUrun"
          @row-select="depoUrunSecim($event)"
        >
          <Column field="skuno" header="Sku" headerStyle="width: 110px">
            <template #body="slotProps">
              {{ slotProps.data.skuno }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Sku"
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column field="urunadi" header="Ürün" headerStyle="width: 160px">
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
          <Column field="size" header="Ebat" headerStyle="width: 110px">
            <template #body="slotProps">
              {{ slotProps.data.size }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Size"
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column field="renk" header="Renk" headerStyle="width: 120px">
            <template #body="slotProps">
              {{ slotProps.data.renk }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Color"
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column field="dtpfiyat" header="D.Fiyat" headerStyle="width: 80px">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.dtpfiyat) }}
            </template>
          </Column>
          <Column field="fiyat" header="Ö.Fiyat" headerStyle="width: 80px">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fiyat) }}
            </template>
          </Column>
          <Column field="fotolar" header="Fotolar">
            <template #body="slotProps">
              <div class="columns">
                <div
                  v-for="item in slotProps.data.fotolar"
                  :key="item.id"
                  class="columnn"
                >
                  <img class="fotolar" :src="item.link" />
                </div>
              </div>
            </template>
          </Column>
        </DataTable>

        <Dialog
          v-model:visible="isUrunForm"
          v-model:header="urunFormBaslik"
          :modal="true"
          maximizable
          position="top"
        >
          <section class="section">
            <div class="container">
              <div class="columns">
                <div class="column is-12">
                  <DepoUrunForm
                    :depostock="depostock"
                    :urunDetay="urunDetay"
                    :keyList="keyList"
                    :sliceFotoList="sliceFotoList"
                  />
                </div>
              </div>
            </div>
          </section>
        </Dialog>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import DepoUrunForm from "./DepoUrunForm";
import depoService from "../../service/DepoService";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    DepoUrunForm,
  },
  computed: {
    ...mapGetters(["getDepoUrunListesi"]),
  },
  props: ["title", "depostock"],
  data() {
    return {
      filters: {
        skuno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        size: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        renk: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

      },
      selectDepoUrun: null,
      isUrunForm: false,
      urunFormBaslik: "",
      urunDetay: null,
      keyList: [],
      sliceFotoList: null,
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    depoUrunSecim(event) {
      if (event.data) {
        this.urunFormBaslik =
          event.data.urunid +
          " - " +
          event.data.skuno +
          " / " +
          event.data.urunadi;
        this.keyList = [];
        this.sliceFotoList = [];
        this.selectDepoUrun = event.data;
        depoService.getUrunDetay(event.data.urunid).then((data) => {
          this.sliceFotoList = [data.fotolar.slice(0, 10), []];

          if (data.anahtarlar.length > 1) {
            this.keyList = data.anahtarlar.split(",");
          }

          this.urunDetay = data;

          this.isUrunForm = true;
        });
      }
    },
  },
};
</script>

<style scoped>
.fotolar {
  width: 120px;
  height: 50px;
}
</style>

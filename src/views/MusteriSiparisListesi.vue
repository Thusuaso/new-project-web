<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <DataTable
          :value="musteri_data"
          v-model:filters="filters"
          filterDisplay="row"
          :paginator="true"
          :rows="15"
        >
          <Column field="year" header="Yıl" bodyStyle="text-align:left;" :showFilterMenu="false">
            <template #body="slotProps">
              {{ slotProps.data.year }}
            </template>
          </Column>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by Date"
            />
          </template>

          <Column
            field="firmaadi"
            header="Müşteri"
            bodyStyle="text-align:left;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.firmaadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Customer"
              />
            </template>
          </Column>
          <Column
            field="siparisno"
            header="Sipariş No"
            headerStyle="width:100px;"
            bodyStyle="text-align:left;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.siparisno }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                style="width:70px;"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by PO"
              />
            </template>
          </Column>
          <Column
            field="satisFiyati"
            header="Satış Fiyatı($)"
            headerStyle="width:100px;"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.satisFiyati) }}
            </template>
          </Column>
          <Column
            field="urunbirim"
            header="Ürün Birim"
            headerStyle="width:100px;"
            bodyStyle="text-align:left;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.urunbirim }}
            </template>
          </Column>

          <Column
            field="urunadi"
            header="Ürün Adı"
            bodyStyle="text-align:left;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.urunadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Product Name"
              />
            </template>
          </Column>
          <Column
            field="yuzeyadi"
            header="Yüzey Adı"
            bodyStyle="text-align:left;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.yuzeyadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Surface"
              />
            </template>
          </Column>
          <Column
            field="en"
            header="En"
            headerStyle="width:100px;"
            bodyStyle="text-align:left;"
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
              />
            </template>
          </Column>
          <Column
            field="boy"
            header="Boy"
            headerStyle="width:100px;"
            bodyStyle="text-align:left;"
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
              />
            </template>
          </Column>
          <Column
            field="kenar"
            header="Kenar"
            headerStyle="width:100px;"
            bodyStyle="text-align:left;"
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
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import service from "../service/MusteriIslemService";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {},
  computed: {
    ...mapGetters(["servis_adres"]),
  },
  created() {
    this.musteri_tablo_yukle();
  },
  data() {
    return {
      isMobile: null,
      musteri_loading: false,
      filters: {
        year: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        firmaadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparisno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        yuzeyadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },



      },
      is_musteri_form: false,
      musteri_form_baslik: "",
      select_musteri: null,
      is_musteri_yeni: false,
      is_detay_ac: true,
      is_excel: false,
      musteri_data: null,
    };
  },

  methods: {
    musteri_tablo_yukle() {
      this.$store.dispatch("fullscreenLoadingAct",true);
      service.getMusteriSiparisListesi().then((data) => {
        this.musteri_data = data;
        this.$store.dispatch("fullscreenLoadingAct",false);
      });
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    /**/
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 11px;
}

.mobil {
  word-break: break-all;
  font-size: 9px;
  text-align: left;
}
</style>

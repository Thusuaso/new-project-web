<template>

  <div class="grid">
    <div class="col">
      <Dropdown v-model="select_yil" :options="yil_listesi" optionLabel="yil" @change="yil_degisim_event"
        placeholder="Select a Year" :disabled="is_form">
        <template #value="slotProps">
          <div class="p-dropdown-car-value">
            <span>{{ slotProps.value }}</span>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="col">
      <Dropdown v-model="select_aystr" :options="ay_listesi" optionLabel="ay_str" @change="ay_degisim_event"
        placeholder="Select a Month" :disabled="is_form">
        <template #value="slotProps">
          <div class="p-dropdown-car-value">
            <span>{{ slotProps.value }}</span>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="col">
      <Button class="p-button-primary" @click="excel_cikti_click" label="Excel" />
    </div>
  </div>
  <div class="grid">
    <div class="col">
        <DataTable :value="odeme_listesi" :scrollable="true" scrollHeight="500px" :loading="loading" v-model:filters="filters"
          filterDisplay="row" @filter="isFilterChange($event)">
          <Column header="Ödeme Tarihi" :showFilterMenu="false" field="tarih" headerStyle="width:10%">
            <template #body="slotProps">
              {{ slotProps.data.tarih }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by" v-tooltip.top.focus="'Filter as you type'" />
            </template>
          </Column>
          <Column header="Müşteri Adı" headerStyle="width:25%" field="musteriadi" :showFilterMenu="false">
            <template #body="slotProps">
              {{ slotProps.data.musteriadi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by" v-tooltip.top.focus="'Filter as you type'" />
            </template>
          </Column>
          <Column header="Sipariş Numarası" :showFilterMenu="false" headerStyle="width:25%" field="po">
            <template #body="slotProps">
              <div :class="slotProps.data.status == 'Numune' ? 'genel_status' : ''">
                {{ slotProps.data.po }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by" v-tooltip.top.focus="'Filter as you type'" />
            </template>
          </Column>
          <Column header="Tutar" field="tutar" headerStyle="background-color:#7aa998;width:15%" sortable="true">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.tutar) }}
            </template>
            <template #footer>
              {{ formatPrice(odeme_toplam) }}
            </template>
          </Column>
        </DataTable>
    </div>
  </div>
</template>
<script>
import service from "../../service/FinansService";
import { FilterMatchMode } from "primevue/api";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["servis_adres"]),
  },
  data() {
    return {
      filters: {
        tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        po: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      yil_listesi: null,
      ay_listesi: null,
      odeme_listesi: null,
      loading: false,
      select_yil: "",
      select_aystr: "",
      select_ay: "",
      is_form: true,
      odeme_toplam: 0,
    };
  },
  created() {
    service.getMusteriOdemeYilListesi().then((yil_list) => {
      this.yil_listesi = yil_list;
      this.select_yil = yil_list[0].yil;
      this.loading = true;

      service.getMusteriOdemeAyListesi(this.select_yil).then((ay_list) => {
        this.ay_listesi = ay_list;
        this.select_aystr = ay_list[0].ay_str;
        this.select_ay = ay_list[0].ay;

        service
          .getMusteriOdemeListesi(this.select_yil, this.select_ay)
          .then((odeme_list) => {
            for (let key in odeme_list) {
              this.odeme_toplam += odeme_list[key].tutar;
            }
            this.odeme_listesi = odeme_list;
            this.loading = false;
            this.is_form = false;
          });
      });
    });
  },
  methods: {
    isFilterChange(event) {
      this.odemeListesiTopla(event.filteredValue);
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    yil_degisim_event() {
      this.loading = true;
      this.ay_listesi_yukle();
    },
    ay_degisim_event() {
      this.select_ay = this.ay_listesi.find(
        (x) => x.ay_str == this.select_aystr.ay_str
      ).ay;
      this.loading = true;
      this.odeme_listesi_yukle();
    },
    ay_listesi_yukle() {
      service.getMusteriOdemeAyListesi(this.select_yil.yil).then((data) => {
        this.ay_listesi = data;
        this.select_aystr = data[0].ay_str;
        this.select_ay = data[0].ay;
        this.odeme_listesi_yukle();
      });
    },
    odeme_listesi_yukle() {
      service
        .getMusteriOdemeListesi(this.select_yil.yil, this.select_ay)
        .then((data) => {
          this.odemeListesiTopla(data);
          this.odeme_listesi = data;
          this.loading = false;
        });
    },
    odemeListesiTopla(event) {
      this.odeme_toplam = 0;
      for (let key in event) {
        this.odeme_toplam += event[key].tutar;
      }
    },
    excel_cikti_click() {
      service.getOdemelerAyrintiTablosuExcel(this.odeme_listesi).then((res) => {
        if (res.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "finans/listeler/odemelerAyrintiListesiExcel";
          link.setAttribute("download", "odemeler_listesi.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
  },
};
</script>
<style scoped>
.genel_status {
  background-color: #98f5ff;
}
</style>

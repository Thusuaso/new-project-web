<template>

  <div class="grid">
    <div class="col-1">
      <Button label="Yeni" @click="isSelectNew" class="p-button-info" style="margin-right: 5px" />
    </div>
    <div class="col-1">
      <Button @click="excel_cikti_click_kasa_olculeri" class="p-button-warning" icon="pi pi-file-excel" />
    </div>
  </div>
  <div class="grid">
    <div class="col">
      <DataTable :value="kasa_ebatlari_list" responsiveLayout="scroll" @row-select="isKasaOlcuSelect" selectionMode="single"
        v-model:filters="filters" filterDisplay="row">
        <Column field="ebat" header="Taş Ebatları" :showFilterMenu="false">
          <template #body="slotProps">
            {{ slotProps.data.ebat }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by Date" />
          </template>
        </Column>
        <Column field="kasaOlculeri" header="Kasa Ölculeri" :showFilterMenu="false">
          <template #body="slotProps">
            {{ slotProps.data.kasaOlculeri }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by Date" />
          </template>
        </Column>
        <Column field="firmaadi" header="Firma Adı" :showFilterMenu="false">
          <template #body="slotProps">
            {{ slotProps.data.firmaadi }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by Date" />
          </template>
        </Column>
      </DataTable>

    </div>
  </div>

  <Dialog v-model:visible="is_select_chest" header="Kasa Ölçüleri Detay" :modal="true" position="top">
    <kasaDetayOlculeriDetay :kasaDatas="kasaDatas"></kasaDetayOlculeriDetay>
  </Dialog>
  
  <Dialog v-model:visible="is_select_new" header="Kasa Ölçüleri Yeni" :modal="true" position="top">
    <kasaDetayOlculeriYeni></kasaDetayOlculeriYeni>
  </Dialog>
</template>
<script>
import service from "../service/SeleksiyonService";
import { mapGetters } from "vuex";
import kasaDetayOlculeriDetay from "../components/kasadetay/kasaDetayOlculeriDetay.vue";
import kasaDetayOlculeriYeni from "../components/kasadetay/kasaDetayOlculeriYeni.vue";
import { FilterMatchMode } from "primevue/api";

export default {
  components: {
    kasaDetayOlculeriDetay: kasaDetayOlculeriDetay,
    kasaDetayOlculeriYeni: kasaDetayOlculeriYeni,
  },
  created() {
    this.$store.dispatch("fullscreenLoadingAct",true);

    service.getKasaDetayOlculeri().then((data) => {
      this.$store.dispatch("kasa_ebatlari_list_load", data);
      this.$store.dispatch("fullscreenLoadingAct",false);
    });
  },
  data() {
    return {
      kasaDetaylari: null,
      is_select_chest: false,
      kasaDatas: null,
      is_select_new: false,
      filters: {
        kasaOlculeri: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ebat: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        firmaadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  computed: {
    ...mapGetters(["servis_adres", "kasa_ebatlari_list"]),
  },
  methods: {
    kasaYukle() {
      service.getKasaDetayOlculeri().then((data) => {
        this.kasaDetaylari = data;
      });
    },
    isKasaOlcuSelect(event) {
      this.is_select_chest = true;
      this.kasaDatas = event;
    },
    //
    excel_cikti_click_kasa_olculeri() {
      //verileri flask tarafına gönderiyor

      service
        .getKasaOlculeriExcelListesi(this.kasa_ebatlari_list)
        .then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            console.log(this.servis_adres);
            link.href =
              this.servis_adres + "siparisler/dosyalar/kasaOlculeriExcelCikti";

            link.setAttribute("download", "kasadetay_listesi.xlsx");
            document.body.appendChild(link);
            link.click();
            this.is_excel = false;
          }
        });
    },
    isSelectNew() {
      this.is_select_new = true;
    },
    //
  },
  mounted() {},
};
</script>

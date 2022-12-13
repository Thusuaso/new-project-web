<template>
  <section>
    <div class="columns is-centered">
      <div class="column is-2">
        <Button
          :disabled="dis_detayac"
          class="p-button-secondary"
          @click="detayAc"
          label="Detay Aç"
        />
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <DataTable
          :value="takip_listesi"
          v-model:filters="filters"
          filterDisplay="row"
          dataKey="id"
          sortField="kalan_alacak"
          :sortOrder="-1"
          selectionMode="single"
          :scrollable="true"
          scrollHeight="510px"
          v-model:selection="select_takip"
          @row-select="takipSec($event)"
          :loading="$store.getters.datatableLoading"
        >
          <Column field="sira" header="#" headerStyle="width:2px">
            <template #body="slotProps">
              {{ slotProps.data.sira }}
            </template>
          </Column>
          <Column field="musteriadi" header="Müşteri" headerStyle="width:8px" :showFilterMenu="false">
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
              />
            </template>
          </Column>
          <Column field="siparisno" header="Po" headerStyle="width:8px" :showFilterMenu="false">
            <template #body="slotProps">
              {{ slotProps.data.siparisno }}
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
            field="sevk_tarihi"
            header="Sevk Tarihi"
            headerStyle="width:8px"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.sevk_tarihi }}
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
            field="konteynerno"
            header="Konteynır No"
            headerStyle="width:15px"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.konteynerno }}
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
          <Column field="eta" header="Eta" headerStyle="width:8px">
            <template #body="slotProps">
              {{ slotProps.data.eta }}
            </template>
          </Column>
          <Column
            field="kalan_sure"
            header="Kalan Sure"
            headerStyle="width:5px"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ slotProps.data.kalan_sure }}
            </template>
          </Column>
          <Column
            field="konsimento"
            header="Konşimento"
            headerStyle="width:8px"
          >
            <template #body="slotProps">
              <b-checkbox disabled v-model="slotProps.data.konsimento">
                {{ slotProps.data.konsimento ? "Gönderildi" : "Gönderilmedi" }}
              </b-checkbox>
            </template>
          </Column>
          <Column field="liman" header="Liman" headerStyle="width:10px">
            <template #body="slotProps">
              {{ slotProps.data.liman }}
            </template>
          </Column>
          <Column
            field="sorumlusu"
            header="Sorumlusu"
            headerStyle="width:7px"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ slotProps.data.sorumlusu }}
            </template>
          </Column>
          <Column
            field="pesinat"
            header="Pesinat"
            headerStyle="width:10px"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.pesinat) }}
            </template>
          </Column>
          <Column
            field="kalan_alacak"
            header="Kalan Alacak"
            headerStyle="width:10px"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.kalan_alacak) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <Dialog
      v-model:visible="is_takipform"
      :header="takip_form_baslik"
      :modal="true"
      position="top"
    >
      <div class="columns">
        <div class="column is-12">
          <SevkTakipForm @sevkTakipFormGuncelle="sevkTakipListGuncelle" />
        </div>
      </div>
    </Dialog>
  </section>
</template>
<script>
import service from "../service/OperasyonService";
import SevkTakipForm from "../components/sevktakip/SevkTakipForm";
import store from "@/store";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    SevkTakipForm,
  },
  data() {
    return {
      isMobile: null,
      takip_listesi: null,
      filters: {
        musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparisno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        sevk_tarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        konteynerno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      select_takip: null,
      is_takipform: false,
      dis_detayac: true,
      takip_form_baslik: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("datatableLoadingBeginAct");
    service.getSevkTakipDusenListesi().then((data) => {
      next((vm) => {
        vm.takip_listesi = data;
        store.dispatch("datatableLoadingEndAct");
      });
    });
  },
  created() {},
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    takipSec(event) {
      this.select_takip = event.data;
      this.dis_detayac = false;
    },
    detayAc() {
      service.getSevkTakipDetay(this.select_takip.id).then((data) => {
        this.$store.dispatch("takipFormLoadAct", data);
        this.takip_form_baslik =
          this.select_takip.musteriadi + "/" + this.select_takip.siparisno;
        this.is_takipform = true;
      });
    },
    sevkTakipListGuncelle() {
      service.getSevkTakipListesi().then((data) => {
        this.takip_listesi = data;
      });
    },
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 12px;
}

.solaYaslama {
  font-size: 9px;
  word-break: break-all;
}
</style>

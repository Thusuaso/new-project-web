<template>
  <section>
    <div class="columns is-multiline">
      <div class="column is-12 seleksiyon-list">
        <DataTable
          :value="nakliye_data_list"
          v-model:filters="filters"
          filterDisplay="row"
          :paginator="true"
          :rows="15"
          selectionMode="single"
          :selection="selectFatura"
          @row-select="FaturaSec($event)"
          :loading="$store.getters.datatableLoading"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 14px">Nakliye Fatura Listesi</span>
              </div>
            </div>
          </template>

          <Column
            field="tarih"
            header="Tarih"
            bodyStyle="text-align:center"
            headerStyle="width:10px;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.tarih }}
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
            field="siparis_no"
            header="Order"
            bodyStyle="text-align:center"
            headerStyle="width:10px;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.siparis_no }}
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
            field="firma_adi"
            header="Firma Adı"
            bodyStyle="text-align:left"
            headerStyle="width:50px;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.firma_adi }}
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
            field="faturaNo"
            header="Fatura Numarası"
            bodyStyle="text-align:left"
            headerStyle="width:20px;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.faturaNo }}
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
            field="Tutar_tl"
            header="Tutar (TRY)"
            bodyStyle="text-align:center"
            headerStyle="width:10px;"
            
          >
            <template #body="slotProps">
              {{ formatPriceTL(slotProps.data.Tutar_tl) }}
            </template>
          </Column>
          <Column
            field="kur"
            header="Kur"
            bodyStyle="text-align:center"
            headerStyle="width:10px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.kur }}
            </template>
          </Column>
          <Column
            field="Tutar_dolar"
            header="Tutar (Dolar)"
            bodyStyle="text-align:center"
            headerStyle="width:10px;"
          >
            <template #body="slotProps">
              {{ formatPriceDolar(slotProps.data.Tutar_dolar) }}
            </template>
          </Column>
          <Column
            header="İndir"
            headerStyle="width:10px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              <Button
                type="button"
                :disabled="slotProps.data.link.length > 0 ? false : true"
                @click="faturaDowload(slotProps.data.link)"
                icon="fas fa-file-invoice"
                class="p-button-rounded"
                style="margin-right: 0.5em"
              ></Button>
            </template>
          </Column>
        </DataTable>
      </div>

      <Dialog v-model:visible="is_form" header="Nakliye Form" :modal="true" position="top">
        <NakliyeFaturaDetay></NakliyeFaturaDetay>
      </Dialog>
    </div>
  </section>
</template>
<script>
import service from "../service/OperasyonService";
import NakliyeFaturaDetay from "../components/nakliyefatura/NakliyeFaturaDetay";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api"
export default {
  computed: {
    ...mapGetters(["nakliye_data_list"]),
  },
  data() {
    return {
      evrak_sil_button: true,
      isMobile: null,
      takip_listesi: null,
      filters: {
        tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparis_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        firma_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        faturaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

      },
      selectFatura: null,
      is_form: false,
      id: null,
      evrak_id: null,
      siparis_no: null,
    };
  },
  components: {
    NakliyeFaturaDetay,
  },
  created() {
    this.$store.dispatch("datatableLoadingBeginAct");

    service.getNakliyeListesi().then((data) => {
      this.$store.dispatch("nakliye_data_list_yukle_act", data);
      this.$store.dispatch("datatableLoadingEndAct");
    });
  },
  methods: {
    FaturaSec(event) {
      this.is_form = true;
      this.evrak_sil_button = false;
      this.evrak_id = event.data.faturaNo;
      this.siparis_no = event.data.siparis_no;
      console.log(event);
      service
        .getNakliyeFormIslem(
          event.data.Firma_id,
          event.data.faturaNo,
          event.data.siparis_no
        )
        .then((data) => {
          this.$store.dispatch("nakliye_yukle_act", data);

          this.is_takipform = true;
        });
    },

    formatPriceDolar(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatPriceTL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "₺" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    evrak_indir(dosya_link, dosya_adi) {
      const link = document.createElement("a");
      link.href = dosya_link;

      link.setAttribute("download", `${dosya_adi}.pdf`);
      document.body.appendChild(link);
      link.click();
    },

    faturaDowload(link) {
      this.evrak_indir(link, "Nakliye Faturası");
    },
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 12px;
}

.p-button-rounded {
  background-color: green;
}
</style>

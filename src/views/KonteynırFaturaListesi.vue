<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <DataTable
          v-model:filters="filters"
          filterDisplay="row"
          :value="konteyner_listesi"
          :scrollable="true"
          scrollHeight="600px"
          :rows="40"
          :paginator="true"
          selectionMode="single"
          :selection="selectFatura"
          @row-select="FaturaSec($event)"
          :loading="$store.getters.datatableLoading"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 14px">Konteynır Fatura Listesi</span>
              </div>
            </div>
          </template>
          <Column
            field="yukleme_tarihi"
            header="Yukleme Tarihi"
            headerStyle="width:20px"
            bodyStyle="text-align:center"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.yukleme_tarihi }}
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
            headerStyle="width:40px"
            bodyStyle="text-align:center"
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
            field="siparis_no"
            header="Sipariş Numarası"
            headerStyle="width:35px"
            bodyStyle="text-align:center"
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
            field="fatura_no"
            header="Fatura Numarası"
            headerStyle="width:35px"
            bodyStyle="text-align:center"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.fatura_no }}
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
            field="tur"
            header="Tür"
            headerStyle="width:20px"
            bodyStyle="text-align:center"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.tur }}
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
            field="kur"
            header="Kur"
            headerStyle="width:20px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.kur }}
            </template>
          </Column>

          <Column
            field="tutar"
            header="Tutar ($)"
            headerStyle="width:25px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ formatPrice_Dolar(slotProps.data.tutar) }}
            </template>
          </Column>
          <Column
            header="Tutar (₺)"
            headerStyle="width:25px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.tutar * slotProps.data.kur) }}
            </template>
          </Column>
          <Column header="İndir" headerStyle="width:10px;">
            <template #body="slotProps">
              <Button
                type="button"
                :disabled="slotProps.data.genel_link.length > 0 ? false : true"
                @click="faturaDowload(slotProps.data.genel_link)"
                icon="fas fa-chevron-circle-down"
                class="p-button"
                style="margin-right: 0.5em; background-color: #3cb371"
              ></Button>
            </template>
          </Column>
        </DataTable>
      </div>
      <Dialog
        v-model:visible="is_takipform"
        header="Konteynır Form"
        :modal="true"
        position="top"
      >
        <div class="columns">
          <div
            class="column is-12"
            :style="{ width: '1000px', height: '300px' }"
          >
            <KonteynerForm />
          </div>
        </div>
      </Dialog>
    </div>
  </section>
</template>
<script>
import service from "../service/OperasyonService";
import KonteynerForm from "../components/evrakgiris/KonteynerForm";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      isMobile: null,
      filters: {
        yukleme_tarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        firma_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparis_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        fatura_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        tur: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      konteyner_listesi: null,
      loading: false,
      select_konteyner: null,
      is_takipform: false,
      selectFatura: null,
    };
  },
  created() {
    this.$store.dispatch("datatableLoadingBeginAct");

    service.getKonteynerListesi().then((data) => {
      this.konteyner_listesi = data;
      this.$store.dispatch("datatableLoadingEndAct");
    });
  },

  components: {
    KonteynerForm: KonteynerForm,
  },
  methods: {
    FaturaSec(event) {
      service
        .getKonteynerFormIslem(event.data.id, event.data.evrak_id, event.data.siparis_no)
        .then((data) => {
          this.$store.dispatch("konteyner_yukle_act", data);

          this.is_takipform = true;
        });
    },
    evrak_indir(dosya_link, dosya_adi) {
      const link = document.createElement("a");
      link.href = dosya_link;

      link.setAttribute("download", `${dosya_adi}.pdf`);
      document.body.appendChild(link);
      link.click();
    },
    faturaDowload(genel_link) {
      this.evrak_indir(genel_link, "Teklif");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "₺" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatPrice_Dolar(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style scoped>
.p-datatable {
  font-size: 12px;
}
</style>

<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <h4 class="has-text-centered subtitle">Teklif Müşteri Listesi</h4>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-2">
        <Button
          class="p-button-secondary"
          label="Yeni"
          @click="yeniMusteriAc"
        />
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-8">
        <DataTable
          :value="musteriTeklifList"
          v-model:filters="filters"
          filterDisplay="row"
          :scrollable="true"
          scrollHeight="408px"
          selectionMode="single"
          @row-select="detayAc($event)"
        >
          <Column
            field="id"
            header="No"
            headerStyle="width : 40px"
            bodyStyle="text-align:center;vertical-align:middle;"
          >
            <template #body="slotProps">
              {{ slotProps.data.id }}
            </template>
          </Column>
          <Column
            field="musteriAdi"
            header="Müşteri"
            headerStyle="width : 150px"
            bodyStyle="text-align:center;vertical-align:middle;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteriAdi }}
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
          <Column field="ulke.ulkeAdi" header="Ülke" headerStyle="width : 80px">
            <template #body="slotProps">
              <div class="ulke">
                <span>{{ slotProps.data.ulke.ulkeAdi }}</span>
              </div>
            </template>
          </Column>
          <Column
            field="teklifSayisi"
            header="Teklif"
            headerStyle="width : 90px"
            bodyStyle="text-align:center;vertical-align:middle;"
          >
            <template #body="slotProps">
              {{ slotProps.data.teklifSayisi }}
            </template>
          </Column>
        </DataTable>
        <Dialog
          header="Teklif Müşteri Listesi Ayrıntı"
          v-model:visible="isMusteriForm"
          :modal="true"
          position="top"
          maximizable
        >
          <TeklifMusteriDetay
            :yeni_kayit="yeni_kayit"
            @musteriTeklifGuncelle="musteriKayitGuncelle($event)"
          />
        </Dialog>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import TeklifMusteriDetay from "../components/teklifler/TeklifMusteriDetay";
import teklifMusteriService from "../service/TeklifMusteriService";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    TeklifMusteriDetay,
  },
  data() {
    return {
      filters: {
        musteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

      },
      isdetayac: true,
      selectMusteri: null,
      isMusteriForm: false,
      yeni_kayit: false,
    };
  },
  computed: {
    ...mapGetters(["musteriTeklifList"]),
  },
  created() {
    this.$store.dispatch("fullscreenLoadingAct",true);

    teklifMusteriService.getMusteriList().then((data) => {
      this.$store.dispatch("loadTeklifMusteriList", data);
      this.$store.dispatch("fullscreenLoadingAct",false);
    });
  },
  methods: {
    detayAc(event) {
      this.selectMusteri = event.data;
      this.isdetayac = false;
      this.yeni_kayit = false;
      teklifMusteriService
        .getMusteriDetay(this.selectMusteri.id)
        .then((data) => {
          this.$store.dispatch("loadTeklifMusteri", data);
          this.isMusteriForm = true;
        });
    },
    musteriKayitGuncelle(event) {
      this.selectMusteri = event;
    },
    yeniMusteriAc() {
      teklifMusteriService.getYeniMusteriModel().then((data) => {
        this.$store.dispatch("loadTeklifYeniMusteriAct", data);
        this.yeni_kayit = true;
        this.isMusteriForm = true;
      });
    },
  },
};
</script>
<style scoped>
.ulke img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}

.ulke span {
  margin-left: 10px;
  vertical-align: middle;
}
</style>

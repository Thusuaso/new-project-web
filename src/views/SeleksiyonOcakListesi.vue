<template>
  <section>
    <div class="columns is-multiline">
      <div class="column is-1">
        <Button @click="excel_cikti_click" label="Excel" />
      </div>
    </div>
    <div class="columns is-multiline is-centered">
      <div class="column is-10">
        <div class="datatable-rowgroup-demo">
          <h2 class="has-text-centered has-text-weight-bold">
            Seleksiyon Stok Ocak Listesi Raporu
          </h2>
          <br />
          <DataTable
            :value="liste"
            dataKey="ocakAdi"
            selectionMode="single"
            v-model:selection="select_maliyet"
            @row-select="ocak_listesi_detay($event)"
            
          >
            <Column
              field="ocakAdi"
              header="Ocak Adı"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template style="display: sticky" #body="slotProps">
                {{ slotProps.data.ocakAdi }}
              </template>
            </Column>

            <Column
              field="mt2"
              header="Mt2"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template style="display: sticky" #body="slotProps">
                {{ slotProps.data.mt2 }}
              </template>
            </Column>

            <Column
              field="mt"
              header="Mt"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template style="display: sticky" #body="slotProps">
                {{ slotProps.data.mt }}
              </template>
            </Column>

            <Column
              field="adet"
              header="Adet"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template style="display: sticky" #body="slotProps">
                {{ slotProps.data.adet }}
              </template>
            </Column>

            <Column
              field="kasaSayisi"
              header="Kasa Sayısı"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template style="display: sticky" #body="slotProps">
                {{ slotProps.data.kasaSayisi }}
              </template>
            </Column>
          </DataTable>
        </div>

        <Dialog
          v-model:visible="is_maliyet_form"
          header="Ocak Listesi Ayrıntı"
          position="top"
          :modal="true"
          maximizable
          :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '100%'}"
        >

              <SeleksiyonOcakDetay />

        </Dialog>
      </div>
    </div>
  </section>
</template>
<script>
import service from "@/service/RaporService";
import { mapGetters } from "vuex";
import SeleksiyonOcakDetay from "../components/seleksiyonocaklistesi/SeleksiyonOcakListesiRaporuDetay";
export default {
  components: {
    SeleksiyonOcakDetay,
  },
  data() {
    return {
      liste: null,
      is_maliyet_form: false,
    };
  },

  localService: null,
  created() {
    this.$store.dispatch("loadingBeginAct");
    service.getOcakListesiRapor().then((data) => {
      this.liste = data;
      this.$store.dispatch("loadingEndAct");

    });
  },
  computed: {
    ...mapGetters(["servis_adres"]),
  },
  methods: {
    excel_cikti_click() {
      this.$store.dispatch("loadingBeginAct");

      service.getOcakListesiRaporExcell(this.liste).then((responce) => {
        if (responce.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "raporlar/listeler/ocakListesiRaporExcell";
          link.setAttribute("download", "ocak_listesi_raporu.xlsx");
          document.body.appendChild(link);
          link.click();
          this.is_excel = false;
          this.$store.dispatch("loadingEndAct");

        }
      });
    },

    ocak_listesi_detay(event) {
      this.$store.dispatch("ocak_data_yukle_act", event.data);

      this.is_maliyet_form = true;
    },
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 10px;
}

.p-column-filter {
  font-size: 10px;
}

.page-button {
  margin-top: 25px;
}

.page-button-excell {
  margin-left: -100px;
}
</style>

<template>
  <section>
    <Toast position="bottomright" />
    <TabView>
      <TabPanel header="Açık Siparişler">
        <Button
          class="p-button-primary"
          @click="cikti_al2"
          label="EXCELL ÇIKTI"
        />
        <DataTable
          :value="depo_odeme_ayrinti_list"
          :scrollable="true"
          scrollHeight="450px"
          v-model:filters="filters"
          filterDisplay="row"
          @filter="isFilterChange($event)"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px">
                  DOSYASI KAPANMAYAN SİPARİŞLER</span
                >
              </div>
            </div>
          </template>
          <Column
            field="orderno"
            header="Order Numara"
            bodyStyle="text-align:left;"
            headerStyle="width:150px;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.orderno }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by "
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column
            field="tarih"
            header="Sipariş Tarihi"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
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
                placeholder="Search by"
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column
            field="sevktarihi"
            header="Yüklenme Tarihi"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.sevktarihi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by"
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column
            field="status"
            header="Status"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              <div
                :class="slotProps.data.status == 'DEPO' ? 'depo' : 'konteyner'"
              >
                {{ slotProps.data.status }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by"
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>

          <Column
            field="notlar"
            header="Notlar"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
          >
            <template #body="slotProps">
              {{ slotProps.data.notlar }}
            </template>
          </Column>
          <Column
            field="toplam"
            header="TOTAL"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(depo_odenecek_satis) }}
            </template>
          </Column>

          <Column
            field="bakiye"
            header="KALAN"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
          >
            <template #body="slotProps">
              <div v-if="slotProps.data.bakiye == 0">
                {{ formatPrice(slotProps.data.toplam - slotProps.data.odenen) }}
              </div>
              <div v-else>
                {{ formatPrice(slotProps.data.bakiye) }}
              </div>
            </template>
            <template #footer>
              {{ formatPrice(depo_kalan) }}
            </template>
          </Column>
        </DataTable>
      </TabPanel>
      <TabPanel header="Kapalı Siparişler">
        <Button
          class="p-button-primary"
          @click="cikti_al"
          label="EXCELL ÇIKTI"
        />
        <DataTable
          :value="depo_ayrinti_list"
          :scrollable="true"
          scrollHeight="450px"
          v-model:filters="filters2"
          filterDisplay="row"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px"> DOSYASI KAPANAN SİPARİŞLER</span>
              </div>
            </div>
          </template>
          <Column
            field="orderno"
            header="Order Numara"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.orderno }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by "
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column
            field="tarih"
            header="Sipariş Tarihi"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
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
                placeholder="Search by "
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column
            field="sevktarihi"
            header="Sevk Tarihi"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.sevktarihi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by "
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column
            field="odemetarihi"
            header="Ödeme Tarihi"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.odemetarihi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by "
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column
            field="status"
            header="Status"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
            :showFilterMenu="false"
          >
            <template #body="slotProps">
              <div
                :class="slotProps.data.status == 'DEPO' ? 'depo' : 'konteyner'"
              >
                {{ slotProps.data.status }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by "
                v-tooltip.top.focus="'Filter as you type'"
              />
            </template>
          </Column>
          <Column
            field="notlar"
            header="Notlar"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
          >
            <template #body="slotProps">
              {{ slotProps.data.notlar }}
            </template>
          </Column>
          <Column
            field="toplam"
            header="TOTAL"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(depo_ayrinti_toplam_ciro) }}
            </template>
          </Column>
          <Column
            field="odenen"
            header="ÖDENEN"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.odenen) }}
            </template>
            <template #footer>
              {{ formatPrice(depo_ayrinti_toplam_odenen) }}
            </template>
          </Column>
          <Column
            field="bakiye"
            header="KALAN"
            bodyStyle="text-align:left;"
            headerStyle="width:15%;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.bakiye) }}
            </template>
            <template #footer>
              {{ formatPrice(depo_ayrinti_toplam_bakiye) }}
            </template>
          </Column>
        </DataTable>
      </TabPanel>
    </TabView>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import service from "../../service/FinansService";

//const servis_url = 'http://localhost:5000/'
//const servis_url = 'https://doktor-servis.mekmar.com/'
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      depo_odenecek_satis: 0,
      depo_kalan: 0,
      filters: {
        orderno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        sevktarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filters2: {
        orderno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        sevktarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        odemetarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },

  computed: {
    ...mapGetters([
      "depo_ayrinti_list",
      "depo_odeme_ayrinti_list",
      "depo_ayrinti_toplam_ciro",
      "depo_ayrinti_toplam_odenen",
      "depo_ayrinti_toplam_bakiye",
      "depo_ayrinti_baslik",
      "depo_ayrinti_musteriid",
      "servis_adres",
    ]),
  },
  created() {
    this.filterToplama(this.depo_odeme_ayrinti_list)
  },
  methods: {

    filterToplama(value) {
      this.depo_odenecek_satis = 0
      this.depo_kalan = 0
      for (let key in value) {
        const item = this.depo_odeme_ayrinti_list[key];
        this.depo_odenecek_satis += item.toplam;
        this.depo_kalan += item.toplam - item.odenen;
      }
    },
    isFilterChange(event) {
      this.filterToplama(event.filteredValue)
    },
    cikti_al() {
      service.getDepoAyrintiExcelListe(this.depo_ayrinti_list).then((res) => {
        if (res.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "finans/listeler/depoAyrintiExcellListe";

          link.setAttribute("download", "depo_ayrinti_listesi.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
    cikti_al2() {
      service
        .getDepoAyrintiExcelListe(this.depo_odeme_ayrinti_list)
        .then((res) => {
          if (res.status) {
            const link = document.createElement("a");
            link.href =
              this.servis_adres + "finans/listeler/depoAyrintiExcellListe";
            //link.href = 'localhost:5000/finans/listeler/depoAyrintiExcellListe'
            link.setAttribute("download", "depo_ayrinti_listesi.xlsx");
            document.body.appendChild(link);
            link.click();
          }
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style>
.depo {
  background-color: #d0f0c0;
  color: #049101;
  font-weight: bold;
}
.konteyner {
  background-color: #e6f7fd;
  color: #4411ee;
  font-weight: bold;
}
</style>

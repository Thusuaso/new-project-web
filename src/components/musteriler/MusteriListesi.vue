<template>
  <section>
    <div class="columns is-multiline is-centered">
      <div class="column is-2">
        <Button
          @click="yeni_musteri_click"
          class="p-button-secondary"
          label="Yeni Müşteri"
        />
      </div>
      <div class="column is-1">
        <Button
          :disabled="is_excel"
          @click="excel_cikti_al_click"
          icon="pi pi-file-excel"
        />
      </div>
      <div class="column is-1">
        <Checkbox
          v-model="show_all_customers"
          :binary="true"
          @change="is_change_all_customer(show_all_customers)"
        />
        <span style="margin-left: 10px">Hepsi</span>
      </div>
      <div class="column is-1">
        <Dropdown v-model="selectedYear" :options="yil_listesi" optionLabel="yil" class="w-full md:w-14rem" @change="yearSelected($event)"/>
      </div>



      <Dialog
        :header="musteri_form_baslik"
        v-model:visible="is_musteri_form"
        :modal="true"
        maximizable
        position="top"
      >

            <MusteriDetay :is_yeni="is_musteri_yeni" />

      </Dialog>
    </div>
    <DataTable
              v-model:value="musteri_listesi"
              v-model:filters="filters"
              filterDisplay="row"
              selectionMode="single"
              v-model:selection="select_musteri"
              @row-select="musteri_secim_event($event)"
              :scrollable="true" 
              scrollHeight="650px"
              sortField="musteri_sira"
              sortOrder="-1"
              @filter="musteriSelected($event)"
            >
              <template #header>
                Müşteri Sayısı {{ musteri_total_sum }}
              </template>
            <Column field="musteri_sira" header="#">
            
            </Column>
              <Column
                field="id"
                header="ID"
                headerStyle="width:55px"
                :showFilterMatchModes="false"
                :showClear="false"
                :showFilterMenu="false"
                :showClearButton="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.id }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  class="p-column-filter"
                  @input="filterCallback()"
              
                />
              </template>
              </Column>

              <Column
                field="musteriadi"
                header="Müşteri Adı"
                :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.musteriadi }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  class="p-column-filter"
                  @input="filterCallback()"
              
                />
              </template>
              </Column>
              <Column field="unvan" header="Firma Adi" 
                :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
                  style="min-width:150px;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.unvan }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                @input="filterCallback()"
              
              />
            </template>
              </Column>
              <Column
                field="adres"
                header="Adres"
                headerStyle="width:400px;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.adres }}
                </template>
              </Column>
              <Column
                field="marketing"
                header="Marketing"
                headerStyle="width:100px;"
                :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.marketing }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                @input="filterCallback()"
              
              />
            </template>
              </Column>
              <Column field="ulkeadi" header="Ülke Adı" 
                :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.ulkeadi }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                @input="filterCallback()"
              
              />
            </template>
              </Column>
              <Column field="logo" header="Logo">
                <template #body="slotProps">
                  <img
                    :src="
                      'https://cdn.mekmarimage.com/countryLogo/' +
                      slotProps.data.logo
                    "
                    width="50"
                    height="50"
                  />
                </template>
              </Column>
              <Column
                field="temsilci"
                header="Temsilci"
                headerStyle="width:100px;"
                :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.temsilci }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  class="p-column-filter"
                  @input="filterCallback()"
              
                />
              </template>
              </Column>
              <Column
                field="satisci"
                header="Satışçı"
                headerStyle="width:100px;"
                :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.satisci }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  class="p-column-filter"
                  @input="filterCallback()"
              
                />
              </template>
              </Column>
              <Column
                field="devir"
                header="Devir"
                headerStyle="width:50px;"
                boydStyle="text-align:center;"
              >
                <template #body="slotProps">
                  <Checkbox
                    v-model="slotProps.data.devir"
                    :disabled="true"
                    :binary="true"
                  />
                </template>
              </Column>
              <Column
                field="ozel"
                header="Özel"
                headerStyle="width:50px;"
                boydStyle="text-align:center;"
              >
                <template #body="slotProps">
                  <Checkbox
                    v-model="slotProps.data.ozel"
                    :disabled="true"
                    :binary="true"
                  />
                </template>
              </Column>
    </DataTable>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import service from "@/service/MusteriIslemService";
import MusteriDetay from "@/components/musteriler/MusteriDetay";
import socket from "@/service/SocketService";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    MusteriDetay,
  },
  computed: {
    ...mapGetters(["musteri_listesi", "servis_adres"]),
  },
  created() {
    const users = this.$store.getters.__getUsername;
    this.musteri_tablo_yukle(users);
    socket.siparis.on("musteri_kayitdegisim_emit", () => {
      const users = this.$store.getters.__getUsername;
      //yapılacak işlemler
      this.musteri_tablo_yukle(users);
    });
  },
  data() {
    return {
      musteri_total_sum:0,
      show_all_customers: false,
      filters: {
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        unvan: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        marketing: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ulkeadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        temsilci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        satisci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      is_musteri_form: false,
      musteri_form_baslik: "",
      select_musteri: null,
      is_musteri_yeni: false,
      is_detay_ac: true,
      is_excel: false,
      musteri_data: null,
      yil_listesi: [
      ],
      selectedYear:{'yil':'Hepsi'}

    };
  },

  methods: {
    musteriSelected(event) {
          this.musteri_total_list_sum(event.filteredValue);

    },
    yearSelected(event) {
      if (event.value.yil == 'Hepsi') {
        this.musteri_tablo_yukle(this.$store.getters.__getUsername);
      } else {
        this.$store.dispatch("fullscreenLoadingAct", true);
        service.getMusteriListesiYil(event.value.yil).then(data => {
          this.$store.dispatch("musteri_listesi_yukle_act", data);
          this.$store.dispatch("fullscreenLoadingAct", false);
          this.musteri_total_list_sum(data);


        })
      }
    },
    is_change_all_customer(event) {
      if (event) {
        service.getMusteriListesi().then((data) => {
          this.$store.dispatch("musteri_listesi_yukle_act", data);
        });
      } else {
        const users = this.$store.getters.__getUsername;
        this.musteri_tablo_yukle(users);
      }
    },
    musteri_total_list_sum(data) {
      this.musteri_total_sum = data.length;
    },
    musteri_tablo_yukle(users) {
      this.$store.dispatch("fullscreenLoadingAct", true);
      service.getMusteriYilList().then(data => {
        this.yil_listesi.push({ 'yil': 'Hepsi' });
        for (const item of data) {
          this.yil_listesi.push(item)
        }
      })
      service.getMusteriListesi().then((data) => {
        this.musteri_data = data;
        if (users == "Semih" || users == "Gizem" || users == "Fatih") {
          this.$store.dispatch("musteri_listesi_yukle_act", data);
          this.musteri_total_list_sum(data);
        } else {
          const result = data.filter((x) => x.temsilci == users);
          this.$store.dispatch("musteri_listesi_yukle_act", result);
          this.musteri_total_list_sum(data);

        }

        this.$store.dispatch("fullscreenLoadingAct",false);
      });
    },
    yeni_musteri_click() {
      service.getYeniMusteriModel().then((data) => {
        this.$store.dispatch("yeni_musteri_model_yukle_act", data);
        this.is_musteri_yeni = true;
        this.musteri_form_baslik = "Yeni Müşteri Girişi";
        this.is_musteri_form = true;
      });
    },
    detay_ac_click() {
      this.$store.dispatch('fullscreenLoadingAct', true)

      service.getMusteriDetay(this.select_musteri.id).then((data) => {
        this.$store.dispatch("musteri_detay_yukle_act", data);
        this.is_musteri_yeni = false;
        this.musteri_form_baslik = this.select_musteri.musteriadi;
        this.is_musteri_form = true;
      this.$store.dispatch('fullscreenLoadingAct', false)

      });
    },
    musteri_secim_event(event) {
      this.select_musteri = { ...event.data };
      this.is_detay_ac = false;
      this.detay_ac_click();
    },
    excel_cikti_al_click() {
      const data = this.musteri_data;
      this.$store.dispatch("fullscreenLoadingAct",true);

      service.getMusteriExcelListesi(data).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres +
            "musteriler/dosya_islemleri/excelMusterilerDetayListesi";

          link.setAttribute("download", "musteri_listesi.xlsx");
          document.body.appendChild(link);
          link.click();
          this.is_excel = false;
          this.$store.dispatch("fullscreenLoadingAct",false);

        }
      });
    },
  },
  mounted() {
    this.emitter.on("followingStatus", (data) => {
      this.is_musteri_form = data;
    });
    this.emitter.on("customer_form_close", () => {
      this.is_musteri_form = false
    })
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 11px;
}

@media screen and (max-width: 576px) {
  #isMobileButton {
    clear: both;
    margin-left: -200px;
  }
}
</style>

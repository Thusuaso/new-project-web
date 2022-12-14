<template>
  <div class="p-fluid">
    <Dialog
      v-model:visible="teklifFormvisible"
      v-model:header="teklifFormBaslik"
      :modal="true"
      maximizable
      position="top"
    >
      <teklif-giris-form :yeniKayit="false" :teklifId="teklifId" />
    </Dialog>

    <div class="p-grid">
      <div class="p-col-6" id="cards">
        <div class="card" id="cards">
          <div class="p-grid" id="cards">
            <DataTable
              class="p-datatable"
              :value="teklifListesi"
              :loading="teklifLoading"
              selectionMode="single"
              v-model:selection="selectTeklif"
              :scrollable="true"
              scrollHeight="400px"
              v-model:filters="filters"
              filterDisplay="row"
              @filter="teklifFilterEvent($event)"
              @row-select="teklifSec"
            >
              <template #header>
                <div class="columns is-multiline">
                  <div class="column is-12">
                    <span style="font-size: 15px"> Takipteki Teklifler </span>
                  </div>
                </div>
              </template>
              <Column
                field="tarih"
                header="Tarih"
                headerStyle="width:10%;"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.tarih }}
                </template>
              </Column>
              <Column
                field="sira"
                header="Teklif No"
                headerStyle="width:7%;"
                bodyStyle="text-align:center;"
                :showFilterMenu="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.sira }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'" />
                </template>
              </Column>
              <Column
                field="musteriAdi"
                header="Müşteri"
                headerStyle="width:12%;"
                :showFilterMenu="false"
              >
                <template #body="slotProps">
                  <div
                    :class="[
                      'teklif-goruldu',
                      { 'teklif-gorulmedi': !slotProps.data.goruldu },
                    ]"
                  >
                    {{ slotProps.data.musteriAdi }}
                  </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'" />
                </template>

                <template #footer>
                  {{ toplam_teklif_sayisi }}
                </template>
              </Column>
              <Column field="ulkeAdi" header="Ülke" headerStyle="width:12%;">
                <template #body="slotProps">
                  {{ slotProps.data.ulkeAdi }}
                </template>
              </Column>
              <Column
                field="temsilciAdi"
                header="T"
                headerStyle="width:6%;"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.temsilciAdi }}
                </template>
              </Column>
              <Column
                field="teklifOncelik"
                header="S"
                headerStyle="width:6%;"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.teklifOncelik }}
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
      <div class="p-col-6" id="cards">
        <h5>Takipteki Aylık Teklifler</h5>
        <Chart type="bar" :data="grafikData" />
      </div>
    </div>
    <div class="p-grid">
      <div class="p-col-6" id="cards">
        <div class="card">
          <div class="p-grid">
            <DataTable
              class="p-datatable"
              :value="teklifListesiBlist"
              :loading="teklifLoading"
              selectionMode="single"
              v-model:selection="selectTeklifBlist"
              :scrollable="true"
              scrollHeight="400px"
              v-model:filters="filtersBlist"
              filterDisplay="row"
              @filter="teklifBlistFilterEvent($event)"
              @row-select="teklifSecBlist"
            >
              <template #header>
                <div class="columns is-multiline">
                  <div class="column is-12">
                    <span style="font-size: 15px"> B Teklif Listesi </span>
                  </div>
                </div>
              </template>
              <Column
                field="tarih"
                header="Tarih"
                headerStyle="width:10%;"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.tarih }}
                </template>
              </Column>
              <Column
                field="sira"
                header="Teklif No"
                headerStyle="width:8%;"
                bodyStyle="text-align:center;"
                :showFilterMenu="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.sira }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'" />
                </template>
              </Column>
              <Column
                field="musteriAdi"
                header="Müşteri"
                headerStyle="width:12%;"
                :showFilterMenu="false"
              >
                <template #body="slotProps">
                  <div
                    :class="[
                      'teklif-goruldu',
                      { 'teklif-gorulmedi': !slotProps.data.goruldu },
                    ]"
                  >
                    {{ slotProps.data.musteriAdi }}
                  </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'" />
                </template>

                <template #footer>
                  {{ toplam_teklif_sayisi_blist }}
                </template>
              </Column>
              <Column field="ulkeAdi" header="Ülke" headerStyle="width:12%;">
                <template #body="slotProps">
                  {{ slotProps.data.ulkeAdi }}
                </template>
              </Column>
              <Column
                field="temsilciAdi"
                header="T"
                headerStyle="width:6%;"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.temsilciAdi }}
                </template>
              </Column>
              <Column
                field="teklifOncelik"
                header="S"
                headerStyle="width:6%;"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.teklifOncelik }}
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
      <div class="p-col-6" id="cards">
        <h5>Takipteki Tekliflerin Öncelik Verileri</h5>
        <Chart type="bar" :data="oncelik_grafikData" />
      </div>
    </div>
  </div>
</template>
<script>
import teklifService from "../../service/TeklifService";
import socket from "../../service/SocketService";
import TeklifGirisForm from "../../components/teklifler/TeklifGirisForm";
import { FilterMatchMode } from 'primevue/api'
export default {
  components: {
    teklifGirisForm: TeklifGirisForm,
  },
  props: ["kullaniciAdi"],
  data() {
    return {
      teklifListesi: null,
      selectTeklif: null,
      teklifLoading: false,
      teklifListesiBlist: null,
      selectTeklifBlist: null,
      toplam_teklif_sayisi: 0,
      toplam_teklif_sayisi_blist: 0,
      teklifFormvisible: false,
      teklifFormBaslik: "",
      teklifId: 0,
      filters: {
        'sira': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'musteriAdi': { value: null, matchMode: FilterMatchMode.STARTS_WITH }


      },
      filtersBlist: {
        'sira': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'musteriAdi': { value: null, matchMode: FilterMatchMode.STARTS_WITH }
      },
      grafikData: null,
      oncelik_grafikData: null,
      datakey: null,
      dataKeyBlist: null,
    };
  },
  created() {
    this.baslangicListeYukle();
    let username = this.$store.getters.__getUsername;

    socket.siparis.on("teklif_sil_emit", () => {
      this.baslangicListeYukle();
    });
    socket.siparis.on("teklif_guncelleme_emit", (value) => {
      if (username == value) {
        this.baslangicListeYukle();
      } else {
        this.baslangicListeYukle();

        // this.$toast.add({severity:'success', summary: 'Bilgi Ekranı', detail:`${value} Teklif Güncellemesi Yaptı`,  life: 5000});
      }
    });
  },
  methods: {
    teklifSec() {
      const teklif = this.selectTeklif;
      for (let key in this.teklifListesi) {
        if (this.teklifListesi[key].id == teklif.id) {
          this.datakey = key;
        }
      }
      this.teklifFormBaslik =
        teklif.musteriAdi + " " + teklif.sira + " Nolu Teklif Bilgileri";
      this.teklifId = teklif.id;
      this.teklifFormvisible = true;
    },
    teklifSecBlist() {
      const teklif = this.selectTeklifBlist;
      for (let key in this.teklifListesiBlist) {
        if (this.teklifListesiBlist[key].id == teklif.id) {
          this.datakeyBlist = key;
        }
      }
      this.teklifFormBaslik =
        teklif.musteriAdi + " " + teklif.sira + " Nolu Teklif Bilgileri";
      this.teklifId = teklif.id;
      this.teklifFormvisible = true;
    },
    baslangicListeYukle() {
      this.toplam_teklif_sayisi = 0;
      if (this.kullaniciAdi.length > 0) {
        this.teklifLoading = true;
        teklifService.getKullaniciTeklif(this.kullaniciAdi).then((data) => {
          this.teklifListesi = data.liste;
          this.teklifListesiBlist = data.blist;

          this.toplam_teklif_sayisi = this.teklifListesi.length;
          this.toplam_teklif_sayisi_blist = this.teklifListesiBlist.length;

          if (this.datakey) {
            this.selectTeklif = this.teklifListesi[this.datakey];
            this.datakey = null;
          }
          if (this.datakeyBlist) {
            this.selectTeklifBlist = this.teklifListesiBlist[this.datakey];
            this.datakeyBlist = null;
          }

          this.grafikListHepsiYukle();
        });
      } else {
        this.teklifLoading = true;

        teklifService.getKullaniciTeklifHepsi().then((data) => {
          this.teklifListesi = data.liste;
          this.teklifListesiBlist = data.blist;
          this.toplam_teklif_sayisi = this.teklifListesi.length;
          this.toplam_teklif_sayisi_blist = this.teklifListesiBlist.length;
          if (this.datakey) {
            this.selectTeklif = this.teklifListesi[this.datakey];
            this.datakey = null;
          }
          this.grafikListHepsiYukle();
        });
      }
    },
    teklifFilterEvent(event) {
      console.log("teklifFilterEvent",event)
      this.toplam_teklif_sayisi = event.filteredValue.length;
    },
    teklifBlistFilterEvent(event) {
      this.toplam_teklif_sayisi_blist = event.filteredValue.length;
    },
    grafikListHepsiYukle() {
      teklifService.teklifListeGrafikHepsi().then((data) => {
        const data_1 = {
          datasets: data.datasets,
          labels: data.labels,
        };

        const data_2 = {
          datasets: data.datasets_oncelik,
          labels: data.labels_oncelik,
        };
        this.grafikData = data_1;
        this.oncelik_grafikData = data_2;
        this.teklifLoading = false;
      });
    },
  },
  mounted() {
    this.emitter.on('teklif_yenileme', data => {
      if (data) {
        this.baslangicListeYukle()
      }
    })
  }
};
</script>
<style scoped>
.teklif-goruldu{
  background-color:transparent;
}
.teklif-gorulmedi {
  background-color:yellow;
}
</style>

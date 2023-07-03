<template>
    <div class="grid">
      <div class="col-6">
        <DataTable :value="finans_ayrinti_list" :scrollable="true" scrollHeight="420px" dataKey="id" selectionMode="single"
          v-model:selection="select_ayrinti" @row-select="select_ayrinti_sec($event)" v-model:filters="filters"
          filterDisplay="menu" @filter="isFinansAyrintiFilter">
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px">
                  Sipariş Ayrıntı Tablosu
                </span>
              </div>
            </div>
          </template>
          <Column field="siparisno" headerStyle="width:35px" bodyStyle="text-align:left;width:25px;">
            <template #body="slotProps">
              <div class="isMobile">
                {{ slotProps.data.siparisno }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'" />
            </template>
          </Column>
          <Column field="yuklemetarihi" headerStyle="width:20px" header="Yükleme Tarihi" bodyStyle="text-align:center;">
            <template #body="slotProps">
              <div class="isMobile">
                {{ slotProps.data.yuklemetarihi }}
              </div>
            </template>
          </Column>
          <Column field="tip" header="Status" headerStyle="width:20px" bodyStyle="text-align:center;">
            <template #body="slotProps">
              <div :class="
                                        slotProps.data.tip == 'Üretim' ? 'genel_status' : ''
                                      ">
                <div class="isMobile">
                  {{ slotProps.data.tip }}
                </div>
              </div>
            </template>
          </Column>
          <Column field="siparis_total" header="Sipariş Total" headerStyle="background-color:#7aa998;width:20px;"
            bodyStyle="text-align:center;">
            <template #body="slotProps">
              <div class="isMobile">
                {{ formatPrice(slotProps.data.siparis_total) }}
              </div>
            </template>
            <template #footer>
              <div class="isMobile">
                {{ formatPrice(finans_ayrinti_siparis_total) }}
              </div>
            </template>
          </Column>
        
          <Column field="odenen_tutar" header="Ödenen Tutar" headerStyle="background-color:#7aa998;width:20px;"
            bodyStyle="text-align:center;">
            <template #body="slotProps">
              <div class="isMobile">
                {{ formatPrice(slotProps.data.odenen_tutar) }}
              </div>
            </template>
            <template #footer>
              <div class="isMobile">
                {{ formatPrice(finans_ayrinti_siparis_odenen_tutar) }}
              </div>
            </template>
          </Column>
          <Column field="kalan" header="Kalan" headerStyle="background-color:#cc6666;width:20px;"
            bodyStyle="text-align:center;">
            <template #body="slotProps">
              <div :class="
                                        slotProps.data.kalan > 0
                                          ? 'kalan_borc'
                                          : '' || slotProps.data.kalan < 0
                                          ? 'odeme_kalan'
                                          : ''
                                      ">
                <div class="isMobile">
                  {{ formatPrice(slotProps.data.kalan) }}
                </div>
              </div>
            </template>
        
            <template #footer>
              <div class="isMobile">
                {{ formatPrice(finans_ayrinti_kalan_toplam) }}
              </div>
            </template>
          </Column>
          <Column field="vade" header="Vade" headerStyle="width:20px" bodyStyle="text-align:center;">
            <template #body="slotProps">
              <div class="isMobile">
                {{ slotProps.data.vade }}
              </div>
            </template>
          </Column>
        
          <Column field="tahmini_eta" header="Eta" headerStyle="width:20px" bodyStyle="text-align:center;">
            <template #body="slotProps">
              <div class="isMobile">
                {{ slotProps.data.tahmini_eta }}
              </div>
            </template>
          </Column>
        
        </DataTable>
      </div>
      <div class="col-4">
        <DataTable :value="finans_ayrinti_odeme_list" :scrollable="true" scrollHeight="420px" dataKey="id"
          selectionMode="single" v-model:selection="select_odeme" @row-select="odemeSecim($event)">
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px"> Gelen Ödemeler </span>
              </div>
            </div>
          </template>
          <Column field="id" header="#" headerStyle="width:8%" bodyStyle="text-align:center;">
            <template #body="slotProps">
              {{ slotProps.data.id }}
            </template>
          </Column>
          <Column field="tarih" header="Ödeme Tarihi" bodyStyle="text-align:center;">
            <template #body="slotProps">
              {{ slotProps.data.tarih }}
            </template>
          </Column>
          <Column field="tutar" header="Tutar" headerStyle="background-color:#7aa998" bodyStyle="text-align:center;">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.tutar) }}
            </template>
            <template #footer>
              {{ formatPrice(finans_ayrinti_odeme_toplam) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col-2">
        <div class="grid">
          <div class="col">
            <div class="grid">
              <div class="col">
                <RadioButton v-model="excel_cikti" value="ayrinti_listesi" /> Ayrıntı
              </div>
            </div>
            <div class="grid">
              <div class="col">
                <RadioButton v-model="excel_cikti" value="odeme_listesi" />Ödeme

              </div>
            </div>
          </div>
          <div class=col>
              <Button @click="excel_cikti_click" label="Excel" class="p-button-success" />

          </div>
        </div>
      </div>
    </div>
  <Dialog v-model:visible="is_ödeme_ayrinti_form" maximizable :modal="true" position="top">
    <FinansAyrintiMusteriOdeme />
  </Dialog>
  
  <Dialog v-model:visible="is_tahsilat_form" v-model:header="tahsilat_form_baslik" maximizable :modal="true">
    <Tahsilat />
  </Dialog>

  <div>
    <table class="table">
    <thead>
      <tr>
        <th scope="col">Toplam Sipariş</th>
        <th scope="col">Gelen Bedel</th>
        <th scope="col">Kalan</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ formatPrice(finans_ayrinti_siparis_total) }}</td>
        <td>{{ formatPrice(finans_ayrinti_odenen_total) }}</td>
        <td>{{ formatPrice(finans_ayrinti_siparis_total - finans_ayrinti_odenen_total) }}</td>
      </tr>
    </tbody>
  </table>
    
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import service from "../../service/FinansService";
import Tahsilat from "./Tahsilat";
import FinansAyrintiMusteriOdeme from "./FinansAyrintiMusteriOdeme";
import socket from "../../service/SocketService";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    Tahsilat,
    FinansAyrintiMusteriOdeme,
  },
  created() {
    
  },
  data() {
    return {
      filters: {
        siparisno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      select_ayrinti: null,
      select_odeme: null,
      secim_loading: false,
      is_tahsilat: true,
      ayrinti_loading: false,
      is_tahsilat_form: false,
      tahsilat_form_baslik: "",
      siparisno: "",
      odeme_loading: false,
      is_ödeme_ayrinti_form: false,
      excel_cikti: "ayrinti_listesi",
    };
  },
  computed: {
    ...mapGetters([
      "finans_ayrinti_list",
      "finans_ayrinti_kalan_toplam",
      "finans_ayrinti_odeme_list",
      "finans_ayrinti_siparis_pesinat",
      "finans_ayrinti_siparis_odenen_tutar",
      "finans_ayrinti_siparis_total",
      "finans_ayrinti_odeme_toplam",
      "finans_odeme_secim_toplam",
      "finans_odeme_secim_list",
      "servis_adres",
      "finans_ayrinti_odenen_total"
    ]),
  },
  methods: {
    isFinansAyrintiFilter(event) {
      console.log(event);
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    odemeSecim(event) {
      this.$store.dispatch('fullscreenLoadingAct', true)
      this.select_odeme = event.data;
      let tarih = event.data.tarih;
      let musteri_id = this.finans_ayrinti_list[0].musteri_id;
      this.secim_loading = true;
      service.getFinansOdemeSecimList(musteri_id, tarih).then((data) => {
        this.$store.dispatch("finansOdemeSecimListYukleAct", data);
        this.is_ödeme_ayrinti_form = true;
        this.secim_loading = false;
        this.$store.dispatch('fullscreenLoadingAct', false)
      });
    },
    select_ayrinti_sec(event) {
      this.select_ayrinti = event.data;
      this.is_tahsilat = false;
      this.siparisno = event.data.siparisno;
      this.tahsilat_form_ac();
    },
    tahsilat_form_ac() {
        this.$store.dispatch('fullscreenLoadingAct', true)

      this.ayrinti_loading = true;
      const item = this.finans_ayrinti_list[0];
      this.is_tahsilat = true;
      this.tahsilat_form_baslik = item.musteriadi;
      service
        .getMusteriTahsilatListe(item.musteri_id, this.siparisno)
        .then((data) => {
          const result_data = data;
          result_data.musteri_data.bakiye = this.select_ayrinti.kalan;
          this.$store.dispatch("tahsilatLoadAct", result_data);
          this.ayrinti_loading = false;
          this.is_tahsilat_form = true;
        this.$store.dispatch('fullscreenLoadingAct', false)

        });
    },
    excel_cikti_click() {
      if (this.excel_cikti == "ayrinti_listesi") {
        this.$store.dispatch('fullscreenLoadingAct', true)

        service
          .getKonteynerAyrintiListesi(this.finans_ayrinti_list)
          .then((res) => {
            //result status | True | False
            if (res.status) {
              this.is_excel = true;
              const link = document.createElement("a");
              link.href =
                this.servis_adres +
                "finans/dosyalar/konteynerAyrintiExcelListe";

              link.setAttribute("download", "konteyner_ayrinti_listesi.xlsx");
              document.body.appendChild(link);
              link.click();
              this.is_excel = false;
              this.$store.dispatch('fullscreenLoadingAct', false)

            }
          });
      } else {
        this.$store.dispatch('fullscreenLoadingAct', true)

        service
          .getKonteynerOdemeListesi(this.finans_ayrinti_odeme_list)
          .then((res) => {
            if (res.status) {
              this.is_excel = true;
              const link = document.createElement("a");
              link.href =
                this.servis_adres + "finans/dosyalar/konteynerOdemeExcelListe";

              link.setAttribute("download", "konteyner_odeme_listesi.xlsx");
              document.body.appendChild(link);
              link.click();
              this.is_excel = false;
        this.$store.dispatch('fullscreenLoadingAct', false)

            }
          });
      }
    },
  },
  mounted() {
    socket.siparis.on("tahsilat_kayitdegisim_emit", (musteriId) => {
      this.$store.dispatch('fullscreenLoadingAct', true)
      this.secim_loading = true;
      this.ayrinti_loading = true;
      this.odeme_loading = true;
      service.getFinansAyrintiListYukle(musteriId).then((data) => {
        this.$store.dispatch("finansAyrintiListYukleAct", data);

        this.secim_loading = false;
        this.ayrinti_loading = false;
        this.odeme_loading = false;
        this.$store.dispatch('fullscreenLoadingAct', false)

      });
    });
  }
};
</script>
<style scoped>
.p-datatable {
  font-size: 11px;
}
.genel_status {
  background-color: #98f5ff;
}
.kalan_borc {
  background-color: #7aa998;
  color: white;
  font-weight: bold;
}
.odeme_kalan {
  background-color: #cc6666;
  color: white;
  font-weight: bold;
}
@media screen and (max-width: 576px) {
  .isMobile {
    font-size: 10px;
    word-break: break-all;
  }
}
</style>

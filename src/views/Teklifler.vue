<template>
  <div class="columns">
    <div class="column is-3">
      <Card>
        <template #content>
          <div class="columns">
            <div class="column">
              <Button
                label="Hepsi"
                iconPos="left"
                icon="fas fa-list"
                class="hepsiButton"
                @click="kullaniciListeAc"
              />
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <DataTable
                class="p-datatable-responsive"
                :value="temsilciOzetList"
                :loading="temsilciLoading"
                dataKey="id"
                selectionMode="single"
                v-model:selection="selectOzetList"
                @row-select="selectOzetListSec"
              >
                <Column field="adi" header="Adi">
                  <template #body="slotProps">
                    <div>{{ slotProps.data.adi }}</div>
                  </template>
                </Column>
                <Column
                  field="teklifSayisi"
                  header="Teklif"
                  bodyStyle="text-align:center;"
                >
                  <template #body="slotProps">
                    {{ slotProps.data.teklifSayisi }}
                  </template>
                  <template #footer>
                    {{ toplam_temsilci_teklif }}
                  </template>
                </Column>
                <Column
                  field="proformaSayisi"
                  header="PI"
                  bodyStyle="text-align:center;"
                >
                  <template #body="slotProps">
                    {{ slotProps.data.proformaSayisi }}
                  </template>
                  <template #footer>
                    {{ toplam_temsilci_proforma }}
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <DataTable
                class="p-datatable-responsive"
                :value="hatirlatmaList"
                :loading="hatirlatmaLoading"
              >
                <Column field="tarih" header="Tarih">
                  <template #body="slotProps">
                    {{ slotProps.data.tarih }}
                  </template>
                </Column>
                <Column field="musteriAdi" header="Müşteri">
                  <template #body="slotProps">
                    {{ slotProps.data.musteriAdi }}
                  </template>
                  <template #footer>
                    {{ toplam_hatirlatma_sayisi }}
                  </template>
                </Column>
                <Column field="ulkeAdi" header="Ülke">
                  <template #body="slotProps">
                    {{ slotProps.data.ulkeAdi }}
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div class="column is-6">
      <Card>
        <template #content>
          <div class="columns">
            <div class="column">
              <Button
                label="Teklif Girişi"
                iconPos="left"
                icon="fas fa-file"
                class="teklifButton"
                @click="teklifFormAc"
              />
              <Button
                label="Eski Teklifler"
                iconPos="left"
                icon="fas fa-paste"
                class="p-button-warning"
                @click="eskiTeklifAc"
              />
              <Button
                @click="tumTekliflerAc"
                label="Teklifler"
                iconPos="left"
                icon="fas fa-list"
                class="p-button-danger"
              />
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <FullCalendar :options="calendarOptions" />
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div class="column is-3">
      <Card>
        <template #header>
          <div class="columns is-centered">
            <div class="column is-11">
              <DataTable
                class="p-datatable-responsive"
                :value="musteriOzetList"
                :loading="musteriOzetLoading"
                :scrollable="true"
                scrollHeight="408px"
              >
                <Column field="musteriAdi" header="Müşteri">
                  <template #body="slotProps">
                    {{ slotProps.data.musteriAdi }}
                  </template>
                </Column>
                <Column field="ulkeAdi" header="Ülke">
                  <template #body="slotProps">
                    {{ slotProps.data.ulkeAdi }}
                  </template>
                </Column>
                <Column
                  field="teklifSayisi"
                  header="T"
                  headerStyle="width:50px"
                  bodyStyle="text-align:center"
                >
                  <template #body="slotProps">
                    {{ slotProps.data.teklifSayisi }}
                  </template>
                  <template #footer>
                    {{ toplam_musteriOzet_teklif }}
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>

  <!--Dialogs-->
  <Dialog
    v-model:visible="kullaniciListeVisible"
    v-model:header="kullaniciListeBaslik"
    :modal="true"
    maximizable
    position="top"
    :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '65vw'}"
  >
    <kullanici-teklif-liste :kullaniciAdi="selectKullaniciAdi" />
  </Dialog>
  <Dialog
    v-model:visible.sync="teklifFormvisible"
    v-model:header="teklifFormBaslik"
    :modal="true"
    maximizable
    position="top"
  >
    <teklif-giris-form :yeniKayit="teklifYeniKayit" :teklifId="teklifId" />
  </Dialog>
  <Dialog
    v-model:visible="is_eskiteklifler"
    header="Eski Teklif Listesi"
    :modal="true"
    maximizable
    position="top"
    style="width:100%;"

  >
    <eskiTeklifler :eskitekliflist="eskitekliflist" />
  </Dialog>
  <Dialog
    v-model:visible="is_tumteklifler"
    header="Teklif Listesi"
    :modal="true"
    maximizable
    position="top"
    style="width:100%;"
  >
    <tumTeklifler :tumtekliflist="tumtekliflist" />
  </Dialog>
</template>
<script>
import teklifService from "../service/TeklifService";
import TeklifGirisForm from "../components/teklifler/TeklifGirisForm";
import KullaniciTeklifListe from "../components/teklifler/KullaniciTeklifListe";
// import socket from "@/service/SocketService";
import TumTeklifler from "../components/teklifler/TumTeklifler";
import EskiTeklifler from "../components/teklifler/EskiTeklifler";
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([]),
  },
  components: {
    TeklifGirisForm: TeklifGirisForm,
    kullaniciTeklifListe: KullaniciTeklifListe,
    tumTeklifler: TumTeklifler,
    eskiTeklifler: EskiTeklifler,
    FullCalendar,
  },
  data() {
    return {
      teklifFormvisible: false,
      temsilciOzetList: null,
      temsilciLoading: false,
      selectOzetList: null,
      toplam_temsilci_teklif: 0,
      toplam_temsilci_proforma: 0,
      hatirlatmaList: null,
      hatirlatmaLoading: false,
      toplam_hatirlatma_sayisi: 0,
      musteriOzetList: null,
      musteriOzetLoading: false,
      toplam_musteriOzet_teklif: 0,
      teklifFormBaslik: "Yeni Teklif Girişi",
      kullaniciListeVisible: false,
      is_tumteklifler: false,
      kullaniciListeBaslik: "",
      selectKullaniciAdi: "",
      visibleFull: false,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        events: [],
      },
      takvimList: null,
      selectDate: null,
      teklifYeniKayit: true,
      teklifId: null,
      tumtekliflist: null,
      eskitekliflist: null,
      is_eskiteklifler: false,
    };
  },
  created() {
    this.$store.dispatch("loadingBeginAct");

    teklifService.getTakvimList().then((data) => {
      console.log("hatirlatmaList", data.hatirlatmaList);

      const takvimData = [];
      for (var i in data.takvimList) {
        if (data.takvimList[i].hatirlatmaDurum == "True") {
          takvimData.push(data.takvimList[i]);
        }
      }

      for (let key in takvimData) {
        takvimData[key].classNames = ["eventColumn"];
      }
      setTimeout(() => {
        for (let item in data.hatirlatmaList) {
          const date = data.hatirlatmaList[item].tarih.split("-");
          const timaDate = date[2] + "-" + date[1] + "-" + date[0];

          this.calendarOptions.events.push({
            title: data.hatirlatmaList[item].musteriAdi,
            date: timaDate,
          });
        }
      }, 500);

      this.takvimList = takvimData;
      this.temsilciOzetList = data.temsilciOzetList;
      this.hatirlatmaList = data.hatirlatmaList;
      this.musteriOzetList = data.musteriOzetList;
      this.tabloToplariYenile();
      this.$store.dispatch("loadingEndAct");
    });

    // let username = this.$store.getters.__getUsername;
    // socket.siparis.on("teklif_sil_emit", () => {
    //   this.baslangicIslemler();
    // });
    // socket.siparis.on("teklif_yeni_emit", (value) => {
    //   if (username == value) {
    //     this.baslangicIslemler();
    //   } else {
    //     this.baslangicIslemler();

    //     this.$toast.add({
    //       severity: "success",
    //       summary: "Uyarı Ekranı",
    //       detail: `${value} Yeni Teklif Girişi Yaptı`,
    //       life: 5000,
    //     });
    //   }
    // });

    // socket.siparis.on("teklif_guncelleme_emit", (value) => {
    //   if (username == value) {
    //     this.baslangicIslemler();
    //   } else {
    //     this.baslangicIslemler();

    //     //this.$toast.add({severity:'success', summary: 'Bilgi Ekranı', detail:`value Teklif Güncellemesi Yaptı`,  life: 5000});
    //   }
    // });
  },
  methods: {
    takvimClick() {},
    tarihSec() {
      this.$refs.takvim.calendar.gotoDate(this.selectDate);
    },
    tabloToplariYenile() {
      this.toplam_temsilci_teklif = 0;
      this.toplam_temsilci_proforma = 0;
      this.toplam_hatirlatma_sayisi = 0;
      this.toplam_musteriOzet_teklif = 0;
      for (let key in this.temsilciOzetList) {
        const item = this.temsilciOzetList[key];

        this.toplam_temsilci_teklif += item.teklifSayisi;
        this.toplam_temsilci_proforma += item.proformaSayisi;
      }

      for (let key in this.musteriOzetList) {
        const item = this.musteriOzetList[key];

        this.toplam_musteriOzet_teklif += item.teklifSayisi;
      }

      this.toplam_hatirlatma_sayisi = this.hatirlatmaList.length;
    },
    teklifFormAc() {
      this.teklifYeniKayit = true;

      this.teklifFormvisible = true;
    },
    selectOzetListSec() {
      this.selectKullaniciAdi = this.selectOzetList.adi;

      this.kullaniciListeBaslik = this.selectOzetList.adi + " TEKLİF LİSTESİ";
      this.kullaniciListeVisible = true;
    },
    kullaniciListeAc() {
      this.selectKullaniciAdi = "";
      this.kullaniciListeBaslik = "TEKLİF LİSTESİ";
      this.kullaniciListeVisible = true;
    },
    teklifYeniUrunKaydiIslemi() {},
    tumTekliflerAc() {
      teklifService.getTumTeklifler().then((data) => {
        this.tumtekliflist = data;
        this.is_tumteklifler = true;
      });
    },
    eskiTeklifAc() {
      teklifService.getEskiTeklifList().then((data) => {
        this.eskitekliflist = data;
        this.is_eskiteklifler = true;
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.p-datatable {
  font-size: 10px;
}

.p-inputtext {
  justify-content: center;
  display: flex;
}

.p-calendar {
  text-align: center;
}

.eventColumn {
  font-size: 8px !important;
  color: yellow;
}

.teklifButton {
  background-color: #65b9a4;
  border: none;
}

.teklifButton:hover {
  background-color: #008261;
  border: none;
}

.hepsiButton {
  background-color: #65b9a4;
  border: none;
}

#takiptekiler {
  height: 280px;
}

#takiptekilerBottom {
  height: 450px;
}

@media screen and (max-width: 576px) {
  #takiptekiler {
    height: auto;
  }

  #takiptekilerBottom {
    display: none;
  }
}
</style>

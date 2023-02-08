<template>
  <section>
    <br />
    <div class="grid">
      <div class="col">
        <Button @click="yeniSiparisAc" label="Yeni" />
      </div>
      <div class="col">
        <Dropdown v-model="selectedOncelik" :options="oncelikler" optionLabel="oncelik" placeholder="Öncelik Seç"
          @change="isChangeOncelik" />
      </div>
      <div class="col">
        <div class="grid">
          <div class="col">
          <span>Takipten Çık</span>

          </div>
          <div class="col">
                      <InputSwitch v-model="checked" @click="isFollowingChange" />

          </div>
        </div>
      </div>
      <div class="col">
        <Button :label="satisciDurum + ' ' + 'Detay Aç'" @click="isClickDetayGoster" />
      </div>
    </div>
    <div class="grid">
      <div class="col">
        <DataTable :value="satisci_detay" :scrollable="true" scrollHeight="750px" v-model:selection="select_musteri"
          @row-select="musteri_sec($event)" selectionMode="single">
          <Column field="sira" header="#" headerStyle="width:1%" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.sira }}
            </template>
          </Column>
          <Column field="tarih_giris" header="Kayıt" headerStyle="width:2%" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.tarih_giris }}
            </template>
          </Column>
          <Column field="baslik" header="Başlık" headerStyle="width:3%" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.baslik }}
            </template>
          </Column>
        
          <Column field="aciklama" header="Açıklama Detayı" headerStyle="width:10% ;" bodyStyle="text-align:left">
            <template #body="slotProps">
              {{ slotProps.data.aciklama }}
            </template>
          </Column>
        
          <Column field="hatirlatmaTarihi" header="Hatırlatma T." headerStyle="width:3%" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.hatirlatmaTarihi }}
            </template>
          </Column>
        
          <Column field="hatirlatma_notu" header="Hatırlatma Notu" headerStyle="width:10%; " bodyStyle="text-align:left">
            <template #body="slotProps">
              {{ slotProps.data.hatirlatma_notu }}
            </template>
          </Column>
          <Column header="İndir" headerStyle="width:2%;" bodyStyle="text-align:center">
            <template #body="slotProps">
              <Button type="button" :disabled="slotProps.data.satisci_cloud > 0 ? false : true"
                @click="faturaDowload(slotProps.data)" icon="fas fa-chevron-circle-down" class="p-button"
                style="margin-right: 0.5em; background-color: #3cb371"></Button>
            </template>
          </Column>
          <Column field="temsilci" header="Temsilci" headerStyle="width:2%" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.temsilci }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="grid">
      <div class="col">
        <p label="Teklif Notları" v-if="musteri_teklifler.length > 0">
          <Textarea rows="5" cols="85" v-model="musteri_teklifler[0].aciklama"></Textarea>
        </p>
      </div>
    </div>
    

    <Dialog v-model:visible="is_musteri_form" :modal="true" header="Musteri Detay" maximizable position="top">
      <MusteriDetay :is_yeni="is_musteri_yeni"></MusteriDetay>
    </Dialog>
    <Dialog v-model:visible="is_teklif_form" :modal="true" header="Teklif Detay" maximizable position="top">
      <teklif-giris-form :yeniKayit="false" :teklifId="teklifId" />
    </Dialog>



    <Transition name="bounce">
      <Dialog
        v-model:visible="is_form1"
        v-model:header="siparisFormBaslik"
        maximizable
        position="top"
        :modal="true"
      >
        <div class="columns">
          <div class="column is-12">
            <CustomersIslem :yeniSiparis="false" />
          </div>
        </div>
      </Dialog>
    </Transition>
    <Transition name="bounce">
      <Dialog
        v-model:visible="is_form2"
        v-model:header="siparisFormBaslik"
        maximizable
        position="top"
        :modal="true"
      >
        <div class="columns">
          <div class="column is-12">
            <CustomersIslem
              :select_satisci="select_satisci"
              :yeniSiparis="true"
            />
          </div>
        </div>
      </Dialog>
    </Transition>
  </section>
</template>
<script>
import CustomersIslem from "./CustomersIslem";
import service from "../../service/Customers";
import { mapGetters } from "vuex";
import MusteriDetay from "../../components/musteriler/MusteriDetay";
import musteriService from "../../service/MusteriIslemService";
import TeklifGirisForm from "../../components/teklifler/TeklifGirisForm";
export default {
  computed: {
    ...mapGetters([
      "satisci_detay",
      "temsilciler_list",
      "musteri_teklifler",
      "musteri_model",
      "musteriAdi",
    ]),
  },
  components: {
    CustomersIslem,
    MusteriDetay,
    teklifGirisForm: TeklifGirisForm,
  },

  data() {
    return {
      is_teklif_form: false,
      is_musteri_form: false,
      is_musteri_yeni: false,
      isMobile: 0,
      temsilciChange: false,
      filter_temsilci_list: null,
      select_temsilci: "",
      checked: false,
      selectedOncelik: {},
      oncelikler: [{ oncelik: "A" }, { oncelik: "B" }, { oncelik: "C" }],
      is_form1: false,
      is_form2: false,

      select_musteri: null,
      siparisFormBaslik: "",
      yeniSiparis: true,
    };
  },
  props: {
    select_satisci: {
      type: String,
      required: false,
      default: "",
    },
    oncelik: {
      type: String,
      required: false,
    },
    select_musteri_id: {
      type: String,
      required: false,
    },
    satisciDurum: {
      type: String,
      required: false,
    },
    teklifId: {
      type: Number,
      required: false,
    },
  },
  created() {
    this.isMobile = window.innerWidth;
    this.siparisler = this.satisci_detay;
    const user = this.$store.getters.__getUsername;
    if (user == "Gizem") {
      this.temsilciChange = true;
    }
  },

  methods: {
    isClickDetayGoster() {
      if (this.satisciDurum == "Musteri") {
        musteriService.getMusteriDetay(this.select_musteri_id).then((data) => {
          this.$store.dispatch("musteri_detay_yukle_act", data);
          this.is_musteri_yeni = false;
          this.is_musteri_form = true;
        });
      } else {
        this.is_teklif_form = true;
      }
    },
    isTemsilciSelected(event) {
      service
        .setTemsilci(this.select_satisci.musteriadi, event.value.id)
        .then((data) => {
          if (data.status) {
            this.$toast.add({
              severity: "success",
              summary: "Temsilci",
              detail: "Temsilci Başarıyla Değiştirildi",
              life: 3000,
            });
            this.$store.dispatch("customers_yukle_act", data.customerData);
            this.$store.dispatch("customers_yukle_all_act", data.customerData);
            this.emmitter.emit("followStatus", false);
          } else {
            this.$toast.add({
              severity: "warning",
              summary: "Temsilci",
              detail: "Temsilci Değiştirme Hata",
              life: 3000,
            });
          }
        });
    },
    temsilci_complete_event(event) {
      this.filter_temsilci_list = this.temsilciler_list.filter((x) => {
        return (
          x.kullanici_adi
            .toString()
            .toLowerCase()
            .indexOf(event.query.toString().toLowerCase()) >= 0
        );
      });
    },
    isFollowingChange() {
      service
        .setFollowing(this.select_satisci.musteriadi, this.checked)
        .then((data) => {
          if (data.status) {
            this.$toast.add({
              severity: "success",
              summary: "Takip",
              detail: "Takip Başarıyla Değiştirildi",
              life: 3000,
            });
            this.$store.dispatch("customers_yukle_act", data.changeFollowing);
            this.$store.dispatch(
              "customers_yukle_all_act",
              data.changeFollowing
            );
            this.emmitter.emit("followStatus", false);
          } else {
            this.$toast.add({
              severity: "warning",
              summary: "Takip",
              detail: "Takip Değiştirme Hata",
              life: 3000,
            });
          }
        });
    },
    isChangeOncelik(event) {
      service
        .setCustomersPriority(
          this.select_satisci.musteriadi,
          event.value.oncelik
        )
        .then((data) => {
          if (data.status) {
            this.$toast.add({
              severity: "success",
              summary: "Öncelik",
              detail: "Öncelik Başarıyla Değiştirildi",
              life: 3000,
            });
            this.$store.dispatch("customers_yukle_act", data.changePriority);
            this.$store.dispatch(
              "customers_yukle_all_act",
              data.changePriority
            );
          } else {
            this.$toast.add({
              severity: "warning",
              summary: "Öncelik",
              detail: "Öncelik Değiştirme Hata",
              life: 3000,
            });
          }
        });
    },
    evrak_indir(dosya_link, dosya_id) {
      const link = document.createElement("a");
      link.href = `https://file-service.mekmar.com/file/download/satisci/satisciDosya/${dosya_id}/${dosya_link}`;

      link.setAttribute("download", `${dosya_link}.pdf`);
      document.body.appendChild(link);
      link.click();
    },
    faturaDowload(dosya) {
      this.evrak_indir(dosya.satisci_cloud_dosya, dosya.id, "Fatura");
    },
    yeniSiparisAc() {
      this.select_musteri = null;
      this.siparisFormBaslik = "Yeni Giriş";

      service.getSatisciModel().then((data) => {
        data.musteriadi = this.musteriAdi;

        this.$store.dispatch("satisciKayitLoadAct", data);
        this.is_form2 = true;
      });
    },
    musteri_sec(event) {
      this.select_musteri = event.data;

      service
        .getSatisciMusteriListe(event.data.musteriadi, event.data.id)
        .then((data) => {
          const result_data = data;
          this.siparisFormBaslik =
            event.data.id + " / " + event.data.musteriadi;

          this.$store.dispatch("satisciKayitLoadAct", result_data);
          this.is_form1 = true;

          this.select_musteri = null;
        });
    },
  },
  mounted() {

    this.selectedOncelik = { oncelik: this.oncelik };
    this.emitter.on('value-properties', data => {
      console.log(data)
    })
    this.emitter.on("hatirlatmaKaydet", (data) => {
      this.is_form1 = data;
      this.is_form2 = data;
    });
  },
};
</script>
<style scoped>
.isMobile {
  font-size: 9px;
  word-break: break-all;
}

.urunInput label {
  font-size: 12px;
}
.teklifInput label {
  font-size: 10px;
}
.p-datatable {
  font-size: 12px;
}
.card2 {
  margin-left: 15%;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>

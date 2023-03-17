<template>
  <br/>
  <div class="grid">
    <div class="col">
      <span class="p-float-label">
        <InputText id="tedarikciadi" type="text" v-model="thtedarikci.tedarikciadi" :disabled="is_form" />
        <label for="tedarikciadi">Tedarikci Adı</label>
      </span>
    </div>
    <div class="col">
      <Button :disabled="is_yeni" @click="yeni_click" class="p-button-secondary" label="Yeni" />
    </div>
    <div class="col">
      <Button class="p-button-success" :disabled="is_kaydet" @click="kaydet_click" label="Kaydet" />
    </div>
    <div class="col">
      <Button class="p-button-info" :disabled="is_degistir" @click="degistir_click" label="Degistir" />
    </div>
    <div class="col">
      <Button class="p-button-delete" :disabled="is_sil" @click="sil_click" label="Sil" />
    </div>
    <div class="col">
      <Button class="p-button-warning" :disabled="is_vazgec" @click="vazgec_click" label="Vazgeç" />
    </div>
  </div>
  <div class="grid">
    <div class="col"> 
      <DataTable :value="tedarikci_liste" :scrollable="true" scrollHeight="430px" v-model:filters="filters"
        filterDisplay="menu"  dataKey="id" selectionMode="single"
        v-model:selection="select_tedarikci" @row-select="tedarikci_secim($event)">
        <Column field="tedarikciadi" header="Tedarikçi Adı">
          <template #body="slotProps">
            {{ slotProps.data.tedarikciadi }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by Supplier" />
          </template>
        </Column>
        <Column field="siparis_sayisi" header="Sipariş Sayısı" headerStyle="width:150px;" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ slotProps.data.siparis_sayisi }}
          </template>
        </Column>
      </DataTable>

    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import service from "../service/TedarikciIslemService";
import socket from "../service/SocketService";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      is_form: true,
      is_yeni: false,
      is_kaydet: true,
      is_degistir: true,
      is_sil: true,
      is_vazgec: true,
      filters: {
        tedarikciadi: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      select_tedarikci: null,
      tedarikci_loading: false,
    };
  },
  computed: {
    ...mapGetters(["thtedarikci", "tedarikci_liste"]),
  },
  created() {
    this.tedarikci_tablo_yukle();
  },
  methods: {
    tedarikci_tablo_yukle() {
      this.$store.dispatch("fullscreenLoadingAct",true);
      service.getTedarikciListeYukle().then((data) => {
        this.$store.dispatch("tedarikci_liste_yukle_act", data);
        this.$store.dispatch("fullscreenLoadingAct",false);
      });
    },
    yeni_click() {
      this.is_yeni = true;
      this.is_kaydet = false;
      this.is_vazgec = false;
      this.is_form = false;
      this.$store.dispatch("tedarikci_model_sifirla_act");
    },
    vazgec_click() {
      this.is_yeni = false;
      this.is_kaydet = true;
      this.is_degistir = true;
      this.is_sil = true;
      this.is_vazgec = true;
      this.is_form = true;
      this.select_tedarikci = null;
      this.$store.dispatch("tedarikci_model_sifirla_act");
    },
    kaydet_click() {
      if (this.thtedarikci.tedarikciadi.length <= 0) {
        alert("Tedarikçi adı giriniz...");
        return;
      }
      this.is_kaydet = true;
      this.tedarikci_loading = true;

      service.tedarikciKaydet(this.thtedarikci).then((response) => {
        if (response.status) {
          socket.siparis.emit('tedarikci_degisim_event');
          this.vazgec_click();
        } else {
          alert("Şu an veri kaydedilemedi.");
          this.is_kaydet = false;
        }
      });
    },
    degistir_click() {
      if (this.thtedarikci.tedarikciadi.length <= 0) {
        alert("Tedarikçi adı giriniz...");
        return;
      }

      this.tedarikci_loading = true;
      this.is_degistir = true;
      service.tedarikciGuncelle(this.thtedarikci).then((response) => {
        if (response) {
          socket.siparis.emit('tedarikci_degisim_event');

          this.vazgec_click();
        } else {
          alert("Tedarikçi değiştirilemedi tekrar deneyiniz!");
          this.is_degistir = false;
        }
      });
    },
    sil_click() {
      this.is_sil = true;
      service.tedarikciSil(this.thtedarikci.id).then((response) => {
        if (response.status) {
          socket.siparis.emit('tedarikci_degisim_event')
          this.vazgec_click();
          alert("Tedarikçi silindi.");
        } else {
          alert("Tedarikçi kaydı silinemiyor kontrol ediniz!");
          this.is_sil = false;
        }
      });
    },
    tedarikci_secim(event) {
      this.select_tedarikci = { ...event.data };
      this.$store.dispatch("tedarikci_secim_act", this.select_tedarikci);
      this.is_form = false;
      this.is_yeni = true;
      this.is_degistir = false;
      this.is_sil = false;
      this.is_vazgec = false;
    },
  },
  mounted() {
    socket.siparis.on('tedarikci_list_emit', () => {
      this.$store.dispatch('fullscreenLoadingAct',true)
      service.getTedarikciListeYukle().then((data) => {
        this.$store.dispatch("tedarikci_liste_yukle_act", data);
        this.$store.dispatch('fullscreenLoadingAct',false)

      });
    })
  }
};
</script>

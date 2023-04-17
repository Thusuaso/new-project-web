<template>
  <div class="grid">
    <div class="col-1">
      <Button @click="yeniSiparisAc" label="Yeni" class="p-button-primary" />
    </div>
    <div class="col-1">
      <Dropdown v-model="select_yil" :options="yil_listesi" @change="YilSecim(select_yil.yil)" optionLabel="yil"
        placeholder="Select a Year" />
    </div>
    <div class="col-1">
            <Button type="text" label="Excell" class="btn btn-success" @click="excel_cikti"/>
    </div>
  </div>
  <div class="grid">
    <div class="col">
      <DataTable :value="numune_listesi" v-model:filters="filters" filterDisplay="menu" :paginator="true" :rows="15"
        rowGroupMode="rowspan" :groupRowsBy="groups" @row-select="numuneSec($event)" selectionMode="single" dataKey="id"
        @filter="isNumuneList" >
        <template #header>
          <div class="columns is-multiline">
            <div class="column is-12">
              <span style="font-size: 14px">Numune Listesi</span>
            </div>
          </div>
        </template>
        <Column field="tarih" header="Gönderilme Tarihi" headerStyle="width:3%;" bodyStyle="text-align:center">
          <template #body="slotProps">
            {{ slotProps.data.tarih }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by Date" v-tooltip.top.focus="'Filter as you type'" />
          </template>
        </Column>
        <Column field="temsilci" header="T" headerStyle="width:2%" bodyStyle="text-align:center">
          <template #body="slotProps">
            <img class="dairesel" :src="slotProps.data.link" bodyStyle="text-align:center" width="40" height="40" />
          </template>
        </Column>
        <Column field="musteriadi" header="Müşteri" headerStyle="width:3%;" bodyStyle="text-align:left">
          <template #body="slotProps">
            {{ slotProps.data.musteriadi }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by Customer" v-tooltip.top.focus="'Filter as you type'" />
          </template>
        </Column>
        <Column field="numuneNo" header="Po Numarası" headerStyle="width:5%;" bodyStyle="text-align:center">
          <template #body="slotProps">
            {{ slotProps.data.numuneNo }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by PO" v-tooltip.top.focus="'Filter as you type'" />
          </template>
        </Column>
        <Column field="kategori" header="Kategori Adı" headerStyle="width:5%;" bodyStyle="text-align:left">
          <template #body="slotProps">
            {{ slotProps.data.kategori }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by Category" v-tooltip.top.focus="'Filter as you type'" />
          </template>
        </Column>
        <Column field="miktar" header="Miktar" headerStyle="width:3%;" bodyStyle="text-align:center"
          footerStyle="text-align:center">
          <template #body="slotProps">
            {{ slotProps.data.miktar + " / " + slotProps.data.birim }}
          </template>
          <template #footer>
            {{ miktar_toplam }}
          </template>
        </Column>
        <Column field="gonderi_tipi" header="Gönderi Tipi" bodyStyle="text-align:center" footerStyle="text-align:center"
          headerStyle="width:3%;">
        </Column>
        <Column field="banka_secimi" header="Banka Seçimi" bodyStyle="text-align:center" footerStyle="text-align:center"
          headerStyle="width:3%;">
        </Column>
      </DataTable>
    </div>
  </div>
  <Dialog v-model:visible="is_numuneform" v-model:header="siparisFormBaslik" :modal="true" position="top" maximizable>
    <numuneForm :select_numune="select_numune" :yeniSiparis="false" />
  </Dialog>
  <Dialog v-model:visible="is_numuneform2" v-model:header="siparisFormBaslik" :modal="true" position="top" maximizable>
    <numuneForm :select_numune="select_numune" :yeniSiparis="true" />
  </Dialog>
</template>
<script>
import service from "../service/NumuneService";
import numuneForm from "../components/numuneler/numuneForm";
import { FilterMatchMode } from "primevue/api";
import socket from "../service/SocketService";
import { mapGetters } from "vuex";
import raporService from '../service/RaporService';

export default {
  computed: {
    ...mapGetters([
      'servis_adres'
    ])
  },
  data() {
    return {
      numune_listesi: null,
      filters: {
        tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        numuneNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kategori: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      satis_toplam: 0,
      miktar_toplam: 0,
      yeniSiparis: true,
      is_numuneform: false,
      is_numuneform2: false,
      yil_listesi: null,
      select_yil: null,
      groups: ["tarih", "musteriadi", "numuneNo"],
      select_numune: "",
      siparisFormBaslik: null,
    };
  },
  components: {
    numuneForm,
  },
  created() {
    this.$store.dispatch("fullscreenLoadingAct",true);
    service.getNumuneYilListesi().then((data) => {
      this.yil_listesi = data.yil_listesi2;

      this.select_yil = this.yil_listesi[0];

      service.getNumuneAnaListesi(this.select_yil.yil).then((data) => {
        this.numune_listesi = data.numune_list;

        this.genel_toplam(this.numune_listesi);
        this.$store.dispatch("fullscreenLoadingAct",false);
      });
    });
  },
  methods: {
    excel_cikti() {
      this.$store.dispatch("fullscreenLoadingAct", true);
      raporService.getNumunelerPoExcelCikti(this.numune_listesi).then((responce) => {
        if (responce.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "raporlar/listeler/numuneler/numunePoExcellCikti";

          link.setAttribute("download", "numuneler_po_excel.xlsx");
          document.body.appendChild(link);
          link.click();
          this.$store.dispatch("fullscreenLoadingAct", false);

        }
      });
    },
    isNumuneList(event) {
      this.genel_toplam(event.filteredValue);
    },
    YilSecim(select_yil) {
      this.$store.dispatch("fullscreenLoadingAct",true);

      service.getNumuneAnaListesi(select_yil).then((data) => {
        this.numune_listesi = data.numune_list;

        this.genel_toplam(this.numune_listesi);
        this.$store.dispatch("fullscreenLoadingAct",false);
      });
    },
    genel_toplam(liste) {
      this.satis_toplam = 0;
      this.miktar_toplam = 0;

      for (let key in liste) {
        const item = liste[key];

        this.satis_toplam += item.satisToplam;
        this.miktar_toplam += item.miktar;
      }
    },
    yeniSiparisAc() {
      this.selectedSiparis = null;
      this.select_numune = "";
      this.selectSiparis = true;
      this.siparisFormBaslik = "Yeni Numune Girişi";

      this.is_numuneform2 = true;
    },
    numuneSec(event) {
      this.$store.dispatch('fullscreenLoadingAct', true)

      this.select_numune = event.data.numuneNo;
      this.siparisFormBaslik =
        event.data.musteriadi + " - " + this.select_numune;

      this.$store.dispatch("seleksiyonSelectItemActions");
      this.is_numuneform = true;
    },
    formatPriceDolar(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

  },
  mounted() {
    socket.siparis.on('numunetahsilat_kayitdegisim_emit', () => {
      this.$store.dispatch('fullscreenLoadingAct',true);
      service.getNumuneYilListesi().then((data) => {
        this.yil_listesi = data.yil_listesi2;

        this.select_yil = this.yil_listesi[0];

        service.getNumuneAnaListesi(this.select_yil.yil).then((data) => {
          this.numune_listesi = data.numune_list;

          this.genel_toplam(this.numune_listesi);
          this.$store.dispatch('fullscreenLoadingAct',false);

        });
      });
    })
  }
};
</script>
<style scoped>
.p-datatable {
  font-size: 11px;
}

.dairesel {
  border-radius: 150px;

  -webkit-border-radius: 150px;

  -moz-border-radius: 150px;
}

.p-button-rounded {
  background-color: green;
}
</style>

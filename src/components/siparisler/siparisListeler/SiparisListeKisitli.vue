<template>
    <div class="card">
      <DataTable
        :value="siparisler"
        style="font-size: 50%"
        rowGroupMode="rowspan"
        :groupRowsBy="groups"
        sortMode="single"
        sortField="groups"
        :sortOrder="1"
        v-model:selection="selectedSiparis"
        selectionMode="single"
        @row-select="siparisSecim($event)"
        v-model:filters="filters"
        filterDisplay="row"
        :loading="datatableLoading"
        @filter="siparisFilterDegisim"
        :paginator="true"
         :rows="1099"
         :globalFilterFields="['musteriAdi', 'siparisNo', 'urunAdi', 'en', 'boy', 'kenar', 'tedarikciAdi','operasyon']"
         responsiveLayout="scroll" 
         showGridlines 
      >
      <template #header>
        <div class="grid">
          <div class="col">
            
          </div>
        </div>
        <div class="flex justify-content-between">

          <div class="field-checkbox">
            <Checkbox id="city3" v-model="detayli_form" :binary="true" style="margin-right:5px;" value="Detaylı" />
            <label for="city3">Detaylı</label>
          </div>
          <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined" @click="clearFilter1()" />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </span>
        </div>
      </template>
        <Column field="sira" header="S" v-if="detayli_form">
          <template #body="slotProps">
            <span class="p-column-title">S</span>
            {{ slotProps.data.sira }}
          </template>
        </Column>
        <Column
          tag="1"
          ref="ref_tarih"
          field="tarih"
          header="Tarih"
          :sortable="false"
        >
          <template #body="slotProps">
            <span class="p-column-title">Tarih</span>
            {{ slotProps.data.tarih }}
          </template>
        </Column>
        <Column field="temsilci" header="S.S" v-if="detayli_form" :showFilterMenu="false">
          <template #body="slotProps">
            {{ capitalize(slotProps.data.temsilci) }}
          </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Search by S.S" style="width:40px;" />
            </template>
        </Column>
        <Column field="operasyon" header="O" v-if="detayli_form" :showFilterMenu="false">
          <template #body="slotProps">
            {{ capitalize(slotProps.data.operasyon) }}
          </template>
          <template #filter="{ filterModel , filterCallback }">
            <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Search by O" style="width:40px;" />
          </template>
        </Column>
        <Column
          :key="1"
          field="musteriAdi"
          header="Kime"
          :showFilterMenu="false"
          :showFilterMatchModes="false"
          :showClear="false"
        >
          <template #body="slotProps">
            <span class="p-column-title">Kime</span>
            <div

              v-if="
                slotProps.data.temsilci == user ||
                slotProps.data.operasyon == user
              "
              :style="{ 'backgroundColor': arkaPlanRengi }"
            >
              {{ slotProps.data.musteriAdi }}
            </div>

            <div v-else>
              {{ slotProps.data.musteriAdi }}
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Search by Customers"
              @keydown.enter="filterCallback()"
              style="width:40px;"
              :showClear="false"
            />
          </template>
        </Column>
        <Column
          field="link"
          :header="siparisTur == 'sevk' ? 'CI' : 'PI'"
          bodyStyle="text-align:center;width:5px;"
          headerStyle="width:5px;"
          
        >
          <template #body="slotProps">
            <Button
              type="button"
              :disabled="
                siparisTur == 'üretim'
                  ? slotProps.data.evrak != 0
                    ? false
                    : true
                  : slotProps.data.evrakc != 0
                  ? false
                  : true
              "
              @click="proformaDowload(slotProps.data.siparisNo)"
              icon="fas fa-download"
              class=""
              style="margin-right: 0.5em"
            ></Button>
          </template>
        </Column>

        <Column
          field="siparisNo"
          header="Po"
          style="min-width: 30px"
          :showFilterMenu="false"
        >
          <template #body="slotProps">
            <span class="p-column-title"> Po</span>

            <div
              :style="{
                color: slotProps.data.faturaDurumRenk != 'transparent1',
              }"
            >
              {{ slotProps.data.siparisNo }}
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Search by Po"
              @keydown.enter="filterCallback()"
              style="width:40px;"
              
            />
          </template>
        </Column>
        <Column
          field="urunAdi"
          header="Ürün Adı"
          style="min-width: 35px"
          :showFilterMenu="false"
        >
          <template #body="slotProps">
            <span class="p-column-title">Ürün Adı</span>
            {{ slotProps.data.urunAdi }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Search by Product"
              @keydown.enter="filterCallback()"
              style="width:40px;"
            />
          </template>
        </Column>
        <Column
          field="icerik"
          header="İçerik"
          bodyStyle=""
          style="min-width: 350px"
        >
          <template #body="slotProps">
            <div>
              {{ slotProps.data.icerik }}
            </div>
          </template>
        </Column>
        <Column
          field="en"
          header="E"
          style="min-width: 50px"
          bodyStyle="text-align: left;font-size: 10px;"
          :showFilterMenu="false"
        >
          <template #body="slotProps">
            <span class="p-column-title">E</span>
            {{ slotProps.data.en }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Search by Width"
              @keydown.enter="filterCallback()"
              style="width:40px;"
              
            />
          </template>
        </Column>
        <Column
          field="boy"
          header="B"
          style="min-width: 50px"
          bodyStyle="text-align: left;font-size: 10px;"
          :showFilterMenu="false"
        >
          <template #body="slotProps">
            <span class="p-column-title">B</span>
            {{ slotProps.data.boy }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Search by Height"
              @keydown.enter="filterCallback()"
              style="width:40px;"
            />
          </template>
        </Column>
        <Column
          field="kenar"
          header="K"
          style="min-width: 50px"
          bodyStyle="text-align: left;font-size: 10px;"
          :showFilterMenu="false"
        >
          <template #body="slotProps">
            <span class="p-column-title">K</span>
            {{ slotProps.data.kenar }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Search by Edge"
              @keydown.enter="filterCallback()"
              style="width:40px;"
            />
          </template>
        </Column>
        <Column
          field="tedarikciAdi"
          header="Kimden"
          :showFilterMenu="false"
        >
          <template #body="slotProps">
            <span class="p-column-title">Kimden</span>
            <div
              :style="{
                backgroundColor: slotProps.data.urunDurumRenk,
                color:
                  slotProps.data.urunDurumRenk != 'transparent' &&
                  siparisTur == 'üretim'
                    ? 'white'
                    : 'black',
              }"
            >
              {{ slotProps.data.tedarikciAdi }}
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Search by Supplier"
              style="width:40px;"
              @keydown.enter="filterCallback()"
              
            />
          </template>
        </Column>
        <Column
          field="siparisMiktari"
          header="Miktar"
          style="min-width: 30px"
          bodyStyle=""
        >
          <template #body="slotProps">
            <span class="p-column-title">Miktar</span>
            {{ slotProps.data.siparisMiktari }}
          </template>
          <template #footer>
            {{ formatDecimal(siparisToplami) }}
          </template>
        </Column>
        <Column field="adet" header="Adet" v-if="detayli_form">
          <template #body="slotProps">
            {{ slotProps.data.adet }}
          </template>
          <template #footer>
            {{ formatDecimal(siparisToplamiAdet) }}
          </template>
        </Column>
        <Column field="mt2" header="M2" v-if="detayli_form">
          <template #body="slotProps">
              {{ slotProps.data.mt2 }}
            </template>
          <template #footer>
            {{ formatDecimal(siparisToplamiM2) }}
          </template>
        </Column>
        <Column field="birim" header="B" headerStyle="width: 5%" bodyStyle="">
          <template #body="slotProps">
            <span class="p-column-title">B</span>
            {{ slotProps.data.birim }}
          </template>
        </Column>
        <Column
          field="uretimMiktari"
          header="Üretim"
          style="min-width: 30px"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span class="p-column-title">Üretim</span>
            <div
              :style="{
                backgroundColor: slotProps.data.urunDurumRenk,
                color:
                  slotProps.data.urunDurumRenk != 'transparent' &&
                  siparisTur == 'üretim'
                    ? 'white'
                    : 'black',
              }"
            >
              {{ slotProps.data.uretimMiktari }}
            </div>
          </template>
          <template #footer>
            {{ formatDecimal(uretimToplami) }}
          </template>
        </Column>
        <Column field="ton" header="Ton" style="min-width: 20px" bodyStyle="">
          <template #body="slotProps">
            <span class="p-column-title">Ton</span>
            {{ slotProps.data.ton }}
          </template>
          <template #footer>
            {{ formatDecimal(tonToplami) }}
          </template>
        </Column>
        <Column
          field="birimFiyat"
          header="Satis"
          headerStyle="width: 7%"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span class="p-column-title">Satış</span>
            {{ formatPrice(slotProps.data.birimFiyat) }}
          </template>
        </Column>
        <Column
          field="satisToplam"
          header="Toplam"
          style="min-width: 30px"
          bodyStyle="text-align: center;"
        >
          <template #body="slotProps">
            <span class="p-column-title">Toplam</span>
            {{ formatPrice(slotProps.data.satisToplam) }}
          </template>
          <template #footer>
            {{ formatPrice(satisToplami) }}
          </template>
        </Column>
      </DataTable>

    </div>
</template>
<script>
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";

export default {

  data() {
    return {
      detayli_form: false,
      filters: {
        musteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        tedarikciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        temsilci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        operasyon: { value: null, matchMode: FilterMatchMode.STARTS_WITH }

      },
      selectedSiparis: null,
      dtSiparisler: null,
      yil_listesi: null,
      select_yil: 0,
      kontrol: 0,
      groups: ["sira", "siparisNo", "musteriAdi", "temsilci", "tarih", "link","operasyon"],
    };
  },
  props: [
    "siparisler",
    "loading",
    "siparisTur",
    "hasPage",
    "baslik",
    "arkaPlanRengi",
    "user",
    "desktop",
  ],

  computed: {
    ...mapGetters([
      "kasaToplami",
      "siparisToplami",
      "uretimToplami",
      "satisToplami",
      "tonToplami",
      "getMobilWidth",
      "datatableLoading",
      "siparisToplamiAdet",
      "siparisToplamiM2"
    ])
    
    
  },
  mounted() {},
  created() {

    this.$store.dispatch("datatableLoadingBeginAct");
    setTimeout(() => {
      this.$store.dispatch("datatableLoadingEndAct");

    }, 15000)
  },
  methods: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    onRowGroupExpand(event) {
      this.$toast.add({
        severity: "info",
        summary: "Row Group Expanded",
        detail: "Value: " + event.data,
        life: 3000,
      });
    },
    onRowGroupCollapse(event) {
      this.$toast.add({
        severity: "success",
        summary: "Row Group Collapsed",
        detail: "Value: " + event.data,
        life: 3000,
      });
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    evrak_indir(dosya_link, dosya_adi) {
      const link = document.createElement("a");
      link.href = dosya_link;
      link.setAttribute("download", `${dosya_adi}.pdf`);
      document.body.appendChild(link);
      link.click();
    },

    proformaDowload(siparis) {
      const result = this.siparisler.filter((x) => x.siparisNo == siparis);
      this.evrak_indir(result[0].link, "Proforma");
      /*
      for (var i=0; i < this.siparisler.length; i++)
      {
          if ( this.siparisler[i].siparisNo == siparis){
                  
                  console.log("this.siparisler[i].link",this.siparisler[i].link)
                  
                  this.evrak_indir(this.siparisler[i].link,'Proforma')
                  
          }
              
      }*/
    },

    siparisSecim(event) {
      //sipariş seçildiğinde
      this.$store.dispatch('fullscreenLoadingAct', true)
      this.$store.dispatch('masraflarResetAct')
      this.selectedSiparis = event.data;

      this.selectSiparis = true;
      if (this.selectedSiparis) {
        this.selectSiparis = false;
        this.$emit("kisitliSiparisSecim", event.data);
        this.$store.commit("is_new_form_click_reset_mut", false);
      }
    },
    siparisSecim2(event) {
      this.selectedSiparis = event.data;

      this.selectSiparis = true;
      if (this.selectedSiparis) {
        this.selectSiparis = false;
        this.$emit("kisitliSiparisSecim", event.data);
        this.$store.commit("is_new_form_click_reset_mut", false);
      }
    },
    siparisFilterDegisim(event) {
      this.toplamGuncelle(event.filteredValue);
    },
    toplamGuncelle(liste) {
      let kasaToplami = 0;
      let siparisToplami = 0;
      let uretimToplami = 0;
      let satisToplami = 0;
      let tonToplami = 0;
      let siparisToplamiAdet = 0;
      let siparisToplamiM2 = 0;

      for (let key in liste) {
        const data = liste[key];
        console.log(data)
        kasaToplami += data.kasa;
        siparisToplami += data.siparisMiktari;
        uretimToplami += data.uretimMiktari;
        satisToplami += data.satisToplam;
        tonToplami += data.ton;
        siparisToplamiAdet += data.adet;
        siparisToplamiM2 += data.mt2
      }

      const data = {
        kasaToplami: kasaToplami,
        siparisToplami: siparisToplami,
        uretimToplami: uretimToplami,
        satisToplami: satisToplami,
        tonToplami: tonToplami,
        siparisToplamiAdet: siparisToplamiAdet,
        siparisToplamiM2: siparisToplamiM2
      };

      this.$store.dispatch("loadToplamGuncelleAct", data);
    },
    gridGizlemeDegisim(event) {
      this.$emit("siparisKisitliEmit", event);
    },
    filterDegisim() {
      this.toplamGuncelle(this.$refs.siparisData.processedData);
      //this.servisMetotTest(this.$refs.siparisData.processedData)
    },
  },
};
</script>
<style>
.bodyStyle {
  float: left;
  font-size: 6px;
  text-align: left;
  vertical-align: top;
  word-break: break-all;
  margin: -5px;
}

.genel {
  border: 1px;
  border-style: solid;
  border-color: blue;
  width: 100%;
}

.rowBorder {
  border: 1px;
  border: solid;
  border-top-color: red;
  border-color: black;
}

.ui-datatable column {
  border: 1px;
  border-style: solid;
  border-color: blue;
}

.p-column-filter {
  margin-top: 1em;
}

.p-datatable-header {
  border: 0 none;

  text-align: left;
  font-size: 18px;
}

.p-paginator {
  border: 0 none;
  padding: 1em;
}

.p-datatable-thead > tr > th {
  border: 0 none;
  text-align: left;
}

.p-column-title {
  font-size: 10px;
}

.p-datatable-tbody > tr > td {
  border: 0 none;
}

span {
  margin-top: 0.125em;
}

.ciktiMenu Button {
  margin-left: 5px;
}

.p-datatable {
  font-size: 11px;
}

.custom-box {
  width: 100%;
  transition: 0.4s;
  box-shadow: 3px 3px 24px 5px rgba(0, 0, 0, 0.22),
    -3px -3px 24px 5px rgba(0, 0, 0, 0.18);
  margin-right: 20px;
}

.siparis-form {
  height: 1750px;
}

.tarih_hide {
  display: none;
}

.tarih_show {
  display: inline;
}

.dairesel {
  border-radius: 150px;

  -webkit-border-radius: 150px;

  -moz-border-radius: 150px;
}
</style>

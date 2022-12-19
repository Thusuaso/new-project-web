<template>

  <div class="columns">
    <div class="column">
      <Dropdown
        v-model="kategori"
        @change="kategoriDegisim"
        :options="kategoriList"
        optionLabel="kategoriadi_en"
        placeholder="Select a Category"
      />
    </div>
    <div class="column">
      <Button class="p-button-success" @click="yeniUrunAc" label="Yeni Ürün" />
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <DataTable
        class="p-datatable-responsive p-datatable-cars"
        :value="urunList"
        v-model:filters="filters"
        filterDisplay="row"
        selectionMode="simple"
        v-model:selection="selectUrun"
        @row-select="urunSecim($event)"
        
      >
        <Column field="urunid" header="Id" :showFilterMenu="false">
          <template #body="slotProps">
            {{ slotProps.data.urunid }}
          </template>
          <template #filter="{filterModel,filterCallback}">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by" v-tooltip.top.focus="'Filter as you type'" style="width:70px;" />
          </template>
        </Column>
        <Column field="renk_en" header="Renk" :showFilterMenu="false">
          <template #body="slotProps">
            {{ slotProps.data.renk_en }}
          </template>
          <template #filter="{filterModel,filterCallback}">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by country" v-tooltip.top.focus="'Filter as you type'" style="width:70px;" />
          </template>
        </Column>
        <Column field="urunkod" header="Kod" :showFilterMenu="false">
          <template #body="slotProps">
            {{ slotProps.data.urunkod }}
          </template>
          <template #filter="{filterModel,filterCallback}">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by country" v-tooltip.top.focus="'Filter as you type'" style="width:70px;" />
          </template>
        </Column>
        <Column field="urunadi_en" header="Ürün Adı" :showFilterMenu="false">
          <template #body="slotProps">
            {{ slotProps.data.urunadi_en }}
          </template>
          <template #filter="{filterModel,filterCallback}">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by country" v-tooltip.top.focus="'Filter as you type'" style="width:70px;" />
          </template>
        </Column>
        <Column field="tedarikciadi" header="Tedarikçi">
          <template #body="slotProps">
            {{ slotProps.data.tedarikciadi }}
          </template>
        </Column>

        <Column field="fotolar" header="Fotolar">
          <template #body="slotProps">
            <div style="overflow: scroll" class="columns">
              <div
                v-for="item in slotProps.data.fotolar"
                :key="item._id"
                class="column is-4"
              >
                <img :src="item.nocdn" />
              </div>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <Dialog
    v-model:visible="isUrunDetay"
    v-model:header="getUrunBaslik"
    :modal="true"
    maximizable
    position="top"
  >
    <MekmarUrunDetay
      :yeniurun="yeniUrun"
      :kategoriList="kategoriList"
      @urunFotoGuncelleme="kategoriDegisim"
      @urunBilgiGuncelleme="urunListeYenile"
    />
  </Dialog>
</template>
<script>
//import mekmarService from '../../service/MekmarService';
import MekmarUrunDetay from "../components/mekmarcom/MekmarUrunDetay";
import { mapGetters } from "vuex";
import service from "../service/MekmarPanelService";
import { FilterMatchMode } from 'primevue/api'
export default {
  components: {
    MekmarUrunDetay,
  },
  data() {
    return {
      isPublic: true,
      kategoriList: null,
      urunList: null,
      kategori: "Marble",
      filters: {
        urunid: { value:null, matchMode: FilterMatchMode.STARTS_WITH },
        renk_en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunkod: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunadi_en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },



      },
      selectUrun: null,
      isUrunDetay: false,
      urunDetayBaslik: "",
      yeniUrun: false,
    };
  },
  computed: {
    ...mapGetters(["getUrunBaslik"]),
  },
  created() {
    service.getKategoriList().then((data) => {
      this.kategoriList = data.kategorilist;

      this.urunList = data.productslist;
    });
  },
  methods: {
    kategoriDegisim() {
      console.log(this.kategori);
      service.getProductList(this.kategori.kategoriadi_en).then((data) => {
        this.urunList = data;
      });
    },
    urunListeYenile() {
      service.getKategoriList().then((data) => {
        //this.kategoriList = data.kategoriList;
        this.urunList = data.productslist;
      });
    },
    urunSecim(event) {
      this.$store.dispatch("setUrunBaslik", `ID : ${event.data.urunid}`);
      this.keyList = [];
      service.getProductDetailData(event.data.urunid).then((data) => {
        this.$store.dispatch("loadUrun", data);
        this.yeniUrun = false;
        this.isUrunDetay = true;
      });
    },
    yeniUrunAc() {
      this.$store.dispatch("setUrunBaslik", `Yeni Ürün Kaydı`);
      this.keyList = [];

      service.getNewProductDetail().then((data) => {
        this.$store.dispatch("loadUrun", data);
        this.yeniUrun = true;
        this.isUrunDetay = true;
      });
    },
  },
};
</script>
<style scoped>
.kategori {
  justify-content: center;
  display: flex;
}
.urun button {
  margin-top: 30px;
}
</style>

<template>
  <div class="grid">
    <div class="col">
      <Button label="Yeni Kart" iconPos="left" icon="fas fa-notes-medical" class="customButton" @click="yeniKartAc"
        :disabled="disYeni" />
    </div>
  </div>
  <div class="grid">
    <div class=col>
      <DataTable v-model:value="getUrunKartMenuList" v-model:selection="selectUrunKart" selectionMode="single"
        :paginator="true" :rows="10" v-model:filters="filters" @row-select="urunKartDetayAc" filterDisplay="row"
        >
        <Column field="id" header="No" headerStyle="width: 100px;" bodyStyle="text-align: center;" 
        :showFilterMenu="false"
        :showFilterOperator="false"
        :showClearButton="false"
        :showFilterMatchModes="false"
        :showApplyButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.id }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
          </template>
        </Column>
        <Column field="kategoriAdi" header="Kategori" headerStyle="width: 150px"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showFilterMatchModes="false"
          :showApplyButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.kategoriAdi }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
          </template>
        </Column>
        <Column field="urunAdi" header="Ürün"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showFilterMatchModes="false"
          :showApplyButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.urunAdi }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="yuzey_1" header="Y1"
          :showFilterMenu="false"
            :showFilterOperator="false"
            :showClearButton="false"
            :showFilterMatchModes="false"
            :showApplyButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.yuzey_1 }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="yuzey_2" header="Y2"
          :showFilterMenu="false"
            :showFilterOperator="false"
            :showClearButton="false"
            :showFilterMatchModes="false"
            :showApplyButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.yuzey_2 }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
                  <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
              </template>
        </Column>
        <Column field="yuzey_3" header="Y3"
          :showFilterMenu="false"
              :showFilterOperator="false"
              :showClearButton="false"
              :showFilterMatchModes="false"
              :showApplyButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.yuzey_3 }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
                  <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
              </template>
        </Column>
        <Column field="en" header="En" bodyStyle="text-align: center" headerStyle="width: 120px;"
          :showFilterMenu="false"
              :showFilterOperator="false"
              :showClearButton="false"
              :showFilterMatchModes="false"
              :showApplyButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.en }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
                </template>
        </Column>
        <Column field="boy" header="Boy" bodyStyle="text-align: center" headerStyle="width: 120px;"
          :showFilterMenu="false"
                :showFilterOperator="false"
                :showClearButton="false"
                :showFilterMatchModes="false"
                :showApplyButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.boy }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
                </template>
        </Column>
        <Column field="kenar" header="Kenar" bodyStyle="text-align: center" headerStyle="width: 120px;"
          :showFilterMenu="false"
                :showFilterOperator="false"
                :showClearButton="false"
                :showFilterMatchModes="false"
                :showApplyButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.kenar }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
                      <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
                  </template>
        </Column>
      </DataTable>
    </div>
  </div>



  <Dialog
    v-model:visible="urunKartVisible"
    header="Ürün Kart"
    :modal="true"
    position="top"
    maximizable
  >
    <UrunKartGiris
      :yeniKayit="kartKayitDurum"
      :urunKartId="urunKartId"
      :isMobile="isMobile"
    ></UrunKartGiris>
  </Dialog>
</template>
<script>
import UrunKartGiris from "../components/urunkart/UrunKartGiris";
import urunKartService from "../service/UrunKartService";
import socket from "../service/SocketService";
import { mapGetters } from "vuex";
// import store from "@/store";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      isMobile: null,
      selectUrunKart: null,
      filters: {
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        yuzey_1: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        yuzey_2: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        yuzey_3: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      disDetay: true,
      disYeni: true,
      urunKartVisible: false,
      kartKayitDurum: true,
      urunKartId: 0,
      
      isSeleksiyonControl: null,
      controlSeleksiyon: false,
      username: "",
    };
  },
  computed: {
    ...mapGetters(["getUrunKartMenuList"]),
  },
  methods: {
    urunKartSecim() {},
    urunKartDetayAc(event) {
      this.$store.dispatch('fullscreenLoadingAct', true)

      const user = this.$store.getters.__getUsername;
      if (user == "Semih" || user == "Gizem") {
        this.urunKartVisible = true;
        this.disSil = false;
      }
      if (event.data) {
        this.urunKartId = event.data.id;
      }
      this.kartKayitDurum = false;

      urunKartService.getSeleksiyonKasaKontrol(this.urunKartId).then((data) => {
        this.emitter.emit("seleksiyonKasaKontrol", data);

      });

    },
    yeniKartAc() {
      this.kartKayitDurum = true;
      this.urunKartVisible = true;
    },

    
  },
  components: {
    UrunKartGiris,
  },
  created() {
    this.isMobile = window.innerWidth;
    this.disYeni = true;
    this.disDetay = true;
    this.username = this.$store.getters.__getUsername;
    if (
      this.username == "Semih" ||
      this.username == "Gizem"
    ) {
      this.disYeni = false;
    }

    socket.siparis.on("urunkart_yeni_emit", (data) => {
      this.$store.dispatch("yeniKartEkleAct", data);
    });

    socket.siparis.on("urunkart_guncelleme_emit", (data) => {
      this.$store.dispatch("kartGuncellemeAct", data);

      const _filter = { ...this.filters };

      this.filters = null;
      this.filters = _filter;
    });
    socket.siparis.on("urunkart_silme_emit", () => {
      urunKartService.getUrunKartMenuList().then((data) => {
        this.$store.dispatch("urunKartMenuAct", data);
      });
    });
  },
  mounted() {
    this.emitter.on('silme_dialog_disabled', (data) => {
      this.urunKartVisible = data
    })
  }
};
</script>
<style scoped>
.p-dialog-titlebar {
  height: 40px;
}



#icDuzenleme {
  margin-left: -7px;
}
</style>

<template>
  <Dialog
    v-model:visible="dialogVisible"
    id="urunKartMenu"
    header="Card Details"
    :modal="true"
    maximizable
    position="top"
  >
    <div class="p-cardialog-content">
      <div class="p-grid p-fluid" v-if="getUrunKartMenuList">
        <DataTable
          v-model:value="getUrunKartMenuList"
          v-model:selection="selectUrunKart"
          selectionMode="single"
          :paginator="true"
          :rows="15"
          v-model:filters="filters2"
          filterDisplay="menu"
          :scrollable="true"
          scrollHeight="500px"
          @row-select="urunKartSec"
        >
          <Column field="id" header="Kart Id" headerStyle="width: 10%">
            <template #body="slotProps">
              <div class="isMobile">
                {{ slotProps.data.id }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Id"
              />
            </template>
          </Column>
          <Column
            field="kategoriAdi"
            header="Kategori"
            headerStyle="width: 15%"
          >
            <template #body="slotProps">
              <div class="isMobile">
                {{ slotProps.data.kategoriAdi }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Category"
              />
            </template>
          </Column>
          <Column field="urunAdi" header="Ürün" headerStyle="width: 15%">
            <template #body="slotProps">
              <div class="isMobile">
                {{ slotProps.data.urunAdi }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Product"
              />
            </template>
          </Column>
          <Column field="yuzey_1" header="Y1" headerStyle="width: 10%">
            <template #body="slotProps">
              <div class="isMobile">
                {{ slotProps.data.yuzey_1 }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Surface 1"
              />
            </template>
          </Column>
          <Column field="yuzey_2" header="Y2" headerStyle="width: 10%">
            <template #body="slotProps">
              <div class="isMobile">
                {{ slotProps.data.yuzey_2 }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Surface 2"
              />
            </template>
          </Column>
          <Column field="yuzey_3" header="Y3" headerStyle="width: 10%">
            <template #body="slotProps">
              <div class="isMobile">
                {{ slotProps.data.yuzey_3 }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Surface 3"
              />
            </template>
          </Column>
          <Column field="en" header="En" headerStyle="width: 10%">
            <template #body="slotProps" bodyStyle="text-align: center">
              <div class="isMobile">
                {{ slotProps.data.en }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Width"
              />
            </template>
          </Column>
          <Column field="boy" header="Boy" headerStyle="width: 10%">
            <template #body="slotProps">
              <div class="isMobile">
                {{ slotProps.data.boy }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Height"
              />
            </template>
          </Column>
          <Column field="kenar" header="Kenar" headerStyle="width: 10%">
            <template #body="slotProps">
              <div class="isMobile">
                {{ slotProps.data.kenar }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Edge"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { mapGetters } from "vuex";
import socket from "@/service/SocketService";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      car: {},
      dialogVisible: false,
      urunMenuList: null,
      selectUrunKart: null,
      filters2: {
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
      urunKartlar: null,
    };
  },

  methods: {
    setDialog() {
      this.dialogVisible = true;
    },
    props: ["is_seleksiyon"],
    urunKartSec() {
      this.dialogVisible = false;

      this.$emit("urunKartSelect", this.selectUrunKart.id);
      if (!this.is_seleksiyon) {
        this.selectUrunKart.ebat =
          this.selectUrunKart.en +
          "x" +
          this.selectUrunKart.boy +
          "x" +
          this.selectUrunKart.kenar;
        this.emitter.emit("urunKartSecim", this.selectUrunKart);
        this.$store.dispatch("siparisUrunKartAct", this.selectUrunKart);
      } else {
        this.selectUrunKart.ebat =
          this.selectUrunKart.en +
          "x" +
          this.selectUrunKart.boy +
          "x" +
          this.selectUrunKart.kenar;
        this.emitter.emit("urunKartSecim", this.selectUrunKart);
        this.$store.dispatch("siparisUrunKartAct", this.selectUrunKart);
      }
    },
  },
  created() {
    this.emitter.on("urunKartShow", this.setDialog);

    this.emitter.on("seleksiyonUrunKartShow", this.setDialog);
    this.emitter.on("uretimRaporUrunKartShow", this.setDialog);
    socket.siparis.on("urunkart_yeni_emit", (data) => {
      this.$store.dispatch("yeniKartEkleAct", data);
    });

    socket.siparis.on("urunkart_guncelleme_emit", (data) => {
      this.$store.dispatch("kartGuncellemeAct", data);

    });
  },
  mounted() { },
  computed: {
    ...mapGetters(["getUrunKartMenuList"]),
  },
};
</script>
<style scoped>
.dialogMenu {
  width: 1500px;
  height: 750px;
}
.p-datatable {
  font-size: 12px;
}
.p-dialog {
}
#urunKartMenu {
  width: 750px;
  margin-left: 800px;
}
@media screen and (max-width: 576px) {
  #urunKartMenu {
    width: auto;
    margin-left: 0px;
  }
  .isMobile {
    word-break: break-all;
    font-size: 9px;
    margin-left: -8px;
  }
}
</style>

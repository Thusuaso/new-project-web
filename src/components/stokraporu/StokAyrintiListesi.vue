<template>
  <section>
    <div class="columns is-multiline">
      <div class="column is-12">
        <DataTable
          :value="stok_top_ayrinti_list"
          :scrollable="true"
          scrollHeight="450px"
          :resizableColumns="true" 
          columnResizeMode="fit" 
          showGridlines 
          responsiveLayout="scroll"
        >
          <Column
            field="sira"
            header="#"
            headerStyle="width:5px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.sira }}
            </template>
          </Column>
          <Column
            field="tarihtop"
            header="Tarih"
            headerStyle="width:8px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.tarihtop }}
            </template>
          </Column>

          <Column
            field="kasanotop"
            header="Kasa"
            headerStyle="width:5px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.kasanotop }}
            </template>
          </Column>
          <Column
            field="tedarikci_aditop"
            header="Tedarikçi"
            headerStyle="width:10px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.tedarikci_aditop }}
            </template>
          </Column>
          <Column
            field="ocakaditop"
            header="Ocak"
            headerStyle="width:10px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.ocakaditop }}
            </template>
          </Column>
          <Column
            field="kategoritop"
            header="Kategori"
            headerStyle="width:10px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.kategoritop }}
            </template>
          </Column>
          <Column
            field="urunaditop"
            header="Ürün Adı"
            headerStyle="width:10px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.urunaditop }}
            </template>
          </Column>
          <Column
            field="yuzeyislemtop"
            header="Yüzey İşlem"
            headerStyle="width:12px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.yuzeyislemtop }}
            </template>
          </Column>
          <Column
            field="entop"
            header="En"
            headerStyle="width:5px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.entop }}
            </template>
          </Column>
          <Column
            field="boytop"
            header="Boy"
            headerStyle="width:5px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.boytop }}
            </template>
          </Column>
          <Column
            field="kenartop"
            header="Kenar"
            headerStyle="width:4px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.kenartop }}
            </template>
          </Column>
          <Column
            field="adettop"
            header="Adet"
            headerStyle="width:5px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.adettop }}
            </template>
          </Column>
          <Column
            field="miktartop"
            header="Miktar"
            headerStyle="width:7px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.miktartop }}
            </template>
            <template #footer>
              {{ formatDecimal(miktar_toplami) }}
            </template>
          </Column>
          <Column
            field="birimaditop"
            header="Birim"
            headerStyle="width:6px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.birimaditop }}
            </template>
          </Column>
          <Column
            field="durum"
            header="Status"
            headerStyle="width:6px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.durum }}
            </template>
          </Column>
          <Column
            field="aciklama"
            header="Not"
            headerStyle="width:6px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.aciklama }}
            </template>
          </Column>
          <div class="column is-3">
            <Button
              @click="excel_cikti_click"
              label="Excel"
              class="p-button-primary"
            />
          <Button @click="add_price_form = true" class="p-button-info" label="Fiyat Gir" style="margin-left:10px;" />

          </div>
             
        </DataTable>
        <Dialog v-model:visible="add_price_form" header="Yeni Fiyat Gir" :modal="true">
          <br/>
          <div class="columns">
            <div class="column">
              <span class="p-float-label">
                <InputNumber id="fiyat" v-model="addPrice.price" mode="currency" currency="USD"/>

                <label for="fiyat">Fiyat</label>
              </span>
            </div>
            <div class="column">
              <Button class="p-button-success" @click="add_price" label="Ekle ve Güncelle" />

            </div>

          </div>
        </Dialog>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import service from "../../service/RaporService";
import socket from "@/service/SocketService"
export default {
  data() {
    return {
      miktar_toplami: 0,
      add_price_form: false,
      addPrice: {
        price: 0,
        productId:0
      }
    };
  },

  computed: {
    ...mapGetters(["stok_top_ayrinti_list"]),
  },
  props: ["urunid","price"],

  methods: {
    add_price() {
      this.addPrice.productId = this.urunid
      service.setAddPrice(this.addPrice).then(data => {
        if (data) {
          this.$toast.add({ severity: 'success', summary: 'Fiyat Kaydetme', detail: 'Fiyat Kaydetme Başarılı', life: 2000 });
          socket.siparis.emit('stock_list_event')
          this.add_price_form = false
          
        } else {
          this.$toast.add({ severity: 'error', summary: 'Fiyat Kaydetme', detail: 'Fiyat Kaydetme Hata', life: 2000 });
          socket.siparis.emit('stock_list_event')

        }
      })


    },

    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    kasa_toplamı(liste) {
      this.miktar_toplami = 0;

      for (let key in liste) {
        const item = liste[key];

        this.miktar_toplami += item.miktartop;
      }

      this.$store.dispatch("loadToplamGuncelleAct", this.miktar_toplami);
    },

    excel_cikti_click() {
      service
        .getStokAyrintiExcelCikti(this.stok_top_ayrinti_list)
        .then((response) => {
          if (response.status) {
            this.musteri_loading = true;
            const link = document.createElement("a");
            link.href =
              this.$store.getters.servis_adres +
              "raporlar/listeler/stokRaporAyrintiExcelListe"; /*link.href kısmındaki linke dikkat */

            link.setAttribute("download", "Stok_listesi_ayrinti.xlsx");
            document.body.appendChild(link);
            link.click();
          }
        });
    },
  },
  mounted() {
    this.kasa_toplamı(this.stok_top_ayrinti_list);
    this.addPrice.price = this.price

    
  },
  created() {
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 10px;
}
.p-column-filter {
  font-size: 10px;
}
.page-button {
  margin-top: 25px;
}
.page-button-excell {
  margin-left: -100px;
}
.stok {
  background-color: "green";
}
.siparis {
  background-color: "red";
}
</style>

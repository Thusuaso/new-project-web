<template>
  <section>
    <div class="columns is-multiline">
      <div class="column is-12">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h2 class="has-text-centered has-text-weight-semibold">
              Ödeme Ayrıntı
            </h2>
          </div>
          <div class="column is-12">
            <DataTable
              :value="finans_odeme_secim_list"
              :scrollable="true"
              scrollHeight="350%"
              selectionMode="single"
              v-model:selection="selectedOdeme"
              @row-select="isSelectedOdeme($event)"
            >
              <Column
                field="sira"
                header="#"
                headerStyle="width:5%"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.sira }}
                </template>
              </Column>
              <Column
                field="siparisno"
                header="Sipariş No"
                headerStyle="width:13%"
              >
                <template #body="slotProps">
                  {{ slotProps.data.siparisno }}
                </template>
              </Column>
              <Column
                field="faturatur"
                header="Fatura Türü"
                headerStyle="width:10%"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.faturatur }}
                </template>
              </Column>
              <Column field="aciklama" header="Not" headerStyle="width:25%">
                <template #body="slotProps">
                  {{ slotProps.data.aciklama }}
                </template>
              </Column>
              <Column
                field="tutar"
                header="Tutar"
                headerStyle="background-color:#7aa998;width:10%"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.tutar) }}
                </template>
                <template #footer>
                  {{ formatPrice(finans_odeme_secim_toplam) }}
                </template>
              </Column>
              <Column
                field="masraf"
                header="Masraf"
                headerStyle="width:10%"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.masraf) }}
                </template>
              </Column>
              <Column
                field="kur"
                header="Kur"
                headerStyle="width:10%"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.kur }}
                </template>
              </Column>
            </DataTable>
          </div>
          <Dialog v-model:visible="is_change_form" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '55vw'}" >
              <br/>
              <br />

              <div class="columns is-centered" style="margin-left:75px;">
                <div class="column">
                  <span class="p-float-label">
                    <AutoComplete v-model="odeme.siparisno" :suggestions="filteredPoList" @complete="searchPo($event)"
                      optionLabel="siparisNo" />
                    <label for="sipNo">Sipariş No</label>
                  </span>
                </div>
                <div class="column">
                  <span class="p-float-label">
                    <InputNumber v-model="odeme.tutar" mode="currency" currency="USD" locale="en-US" @input="odeme.tutar = $event.value"/>
                    <label for="tutar">Tutar</label>
                  </span>
                </div>

              </div>
              <div class="columns" style="margin-left:65px;">
                <div class="column">
                  <div class="column">
                    <span class="p-float-label">
                      <Textarea v-model="odeme.aciklama" id="aciklama" row="10" cols="54"
                         />
                      <label for="aciklama">Açıklama</label>
                    </span>
                  </div>
                </div>
              </div>
              <br/>
              <Button class="p-button-primary" @click="save" label="Kaydet" style="width:100%;"/>
              <br/>
              <br />
              <br />
              <br />

              
              
          </Dialog>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import service from "../../service/FinansService";
import socket from "../../service/SocketService";
export default {
  created() {
    
  },
  data() {
    return {
      odeme: {

        siparisno: "",
        tutar: 0,
        odemeId: 0,
        aciklama: "",
        kullanici:this.$store.getters.__getUsername
      },
      filteredPoList:[],
      is_change_form:false,
      selectedOdeme:[],
      filters: {},
      select_ayrinti: null,
      select_odeme: null,
      secim_loading: false,
      is_tahsilat: true,
      ayrinti_loading: false,
      is_tahsilat_form: false,
      tahsilat_form_baslik: "",
      siparisno: "",
      odeme_loading: false,
      excel_cikti: "ayrinti_listesi",
    };
  },
  computed: {
    ...mapGetters([
      "finans_ayrinti_list",
      "finans_ayrinti_kalan_toplam",
      "finans_ayrinti_odeme_list",
      "finans_ayrinti_odeme_toplam",
      "finans_odeme_secim_toplam",
      "finans_odeme_secim_list",
      "servis_adres",
      "finans_po_list"
    ]),
  },
  methods: {

    save() { 

      this.odeme.odemeId = this.selectedOdeme.id
      service.setOdemelerAyrintiTablosu(this.odeme).then(data => { 
        if (data.status) {
          this.$toast.add({severity:'success',summary:'Odeme',detail:'Odeme Bilgisi Başarıyla Değiştirildi',life:3000})
        } else {
          this.$toast.add({ severity: 'error', summary: 'Odeme', detail: 'Odeme Bilgisi Değişim Hatası', life: 3000 })
        }

      })
    },
    searchPo(event) { 
        let result;
        if (event.query.length === 0) {
          result = [...this.finans_po_list];
        } else {
          result = this.finans_po_list.filter((ted) => {
            return ted.siparisNo
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filteredPoList = result;
    },
    isSelectedOdeme(event) { 
      console.log("isSelectedOdeme", event)
      this.is_change_form = true
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  mounted() {
    socket.siparis.on("tahsilat_kayitdegisim_emit", (musteriId) => {
      this.$store.dispatch('fullscreenLoadingAct', true)

      service.getFinansAyrintiListYukle(musteriId).then((data) => {
        this.$store.dispatch("finansAyrintiListYukleAct", data);

        this.$store.dispatch('fullscreenLoadingAct', false)


      });
      this.odeme = {

        siparisno: "",
        tutar: 0,
        odemeId: 0,
        aciklama: "",
        kullanici: this.$store.getters.__getUsername
      }
    });
  }
};
</script>
<style scoped>
.p-datatable {
  font-size: 10px;
}
</style>

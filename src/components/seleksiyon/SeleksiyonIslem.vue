<template>

    <div class="grid">
      <div class="col">
          <DataTable :value="seleksiyon_uretimozetlist">
            <Column field="tanim" header="Üretici" bodyStyle="text-align:center;">
              <template #body="slotProps">
                {{ slotProps.data.tanim }}
              </template>
              <template #footer>
                Toplam
                <p style="font-size: 10px">(Mekmar + Mekmoz)</p>
              </template>
            </Column>
            <Column field="gun" header="Bugün" bodyStyle="text-align:center;">
              <template #body="slotProps">
                {{ formatDecimal(slotProps.data.gun) }}
              </template>
              <template #footer>
                {{ formatDecimal(toplam_gun) }}
              </template>
            </Column>
            <Column field="ay" header="Ay" bodyStyle="text-align:center;">
              <template #body="slotProps">
                {{ formatDecimal(slotProps.data.ay) }}
              </template>
              <template #footer>
                {{ formatDecimal(toplam_ay) }} ({{ formatDecimal(toplam_m_mek) }})
              </template>
            </Column>
            <Column field="yil" header="Yıl" bodyStyle="text-align:center;">
              <template #body="slotProps">
                {{ formatDecimal(slotProps.data.yil) }}
              </template>
              <template #footer>
                {{ formatDecimal(toplam_yil) }}
              </template>
            </Column>
          </DataTable>
      </div>
      <div class="col">
        <div class="grid">
          <div class="col">
              <Button @click="btn_yeni_click" class="p-button-success" label="Yeni" />

          </div>
          <div class="col">
            <div class="grid">
              <div class="col">
                <Button :disabled="slk_enb_mekmar" @click="btn_mekmar_click" label="Mekmer" class="p-button-primary p-button-sm"
                  style="width: 100px" />
              </div>
            </div>
            <div class="grid">
              <div class="col">
                <Button :disabled="slk_enb_dis" @click="btn_dis_click" label="Dış" class="p-button-secondary p-button-sm"
                  style="width: 100px" />
              </div>
            </div>
            <div class="grid">
              <div class="col"> 
                <Button :disabled="slk_enb_mekmer_dis" @click="btn_mekmer_dis_click" label="Mekmer Dış"
                  class="p-button-info p-button-sm" style="width: 100px" />
              </div>

            </div>
            <div class="grid">
              <div class="col">
                  <Button label="Toplu Kasa" @click="getAllCrateDialog" style="width: 100px" />
              </div>
            </div>
          </div>
          <div class="col">
            <div class="grid">
              <div class="col">
                <Button @click="excel_cikti_click" label="Excel" class="p-button-dark" />

              </div>
            </div>
            <div class="grid">
              <div class="col">
                <Calendar size="is-small" icon="calendar-today" v-model="son_tarih" placeholder="Tarih Giriniz ! ">
                  <button class="button is-danger">
                    <span>Temizle</span>
                  </button>
                </Calendar>
              </div>
            </div>
            <div class="grid">
              <div class="col">
                <Button @click="etiket_cikti_click" label="Etiket Çıkart" class="p-button-info" />
              </div>
            </div>
          </div>
        </div>


      </div>
      <div class="col">
        <div class="grid" style="text-align:center;">
          <div class="col">
            <Dropdown v-model="codeSelected" style="width: 150px" :options="etiketlerVeikKutu" optionLabel="urun"
              @change="isDropDownChange" placeholder="Veik Kutu Etiketi" />
          </div>
          <div class="col">
            <Dropdown v-model="codeSelectedKasa" style="width: 150px" :options="etiketlerVeikKasa" optionLabel="urun"
              @change="isDropDownChangeTwo" placeholder="Veik Kasa Etiketi" />
          </div>
        </div>
        <div class="grid" style="text-align:center;">
          <div class="col">
            <Dropdown v-model="codeSelected" style="width: 150px" :options="etiketlerNovaKutu" optionLabel="urun"
              @change="isDropDownChangeThree" placeholder="Nova Kutu Etiketi" />
          </div>
          <div class="col">
            <Dropdown v-model="codeSelectedKasa" style="width: 150px" :options="etiketlerNovaKasa" optionLabel="urun"
              @change="isDropDownChangeFour" placeholder="Nova Kasa Etiketi" />
          </div>
        </div>
        <div class="grid" style="text-align:center;">
          <div class="col">
            <Button type="button" @click="etiketDowload()" icon="fas fa-download" label="Indir" />
          </div>  
        </div>
      </div>
    </div>






    

  <Dialog v-model:visible="is_uretimform" header="Seleksiyon Form" :modal="true" maximizable position="top"
    :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{ width: '100vw', height:'120vw' }">
    <section>
  
      <UretimForm :kayitstatu="true" :kasano="0" />
    </section>
  </Dialog>
  <Dialog v-model:visible="topluKasaForm" position="top" maximizable :modal="true">
    <div class="grid">
      <div class="col-2">
        <AutoComplete v-model="selectedPo" :dropdown="true" :suggestions="filteredOrders" @complete="poChangeEvent($event)"
          placeholder="Select a Order" field="siparisNo" @item-select="isSelectedPo" />
      </div>
      <div class="col-4">
        <Dropdown v-model="selectedProduct" :options="productList" optionLabel="product_full_name"
          placeholder="Select a Product" />
      </div>
      <div class="col-2">
        <Button @click="setCrateAll" label="Değiştir" class="p-button-primary" :disabled="crateAllDisabled" />
      </div>
    </div>
    <div class="grid">
      <div class="col">
        <DataTable ref="dt" :value="seleksiyon_uretimlist" v-model:selection="selectedProducts" :paginator="true" :rows="10"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          responsiveLayout="scroll" v-model:filters="filterTopuKasa" filterDisplay="row" style="margin-top:15px;">
          <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
          <Column field="kasa_no" header="Kasa No" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                :placeholder="`Search by - `" v-tooltip.top.focus="'Hit enter key to filter'" />
            </template>
          </Column>
          <Column field="kategori" header="Kategori" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                :placeholder="`Search by - `" v-tooltip.top.focus="'Hit enter key to filter'" />
            </template>
          </Column>
          <Column field="urunadi" header="Ürün Adı" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                :placeholder="`Search by - `" v-tooltip.top.focus="'Hit enter key to filter'" />
            </template>
          </Column>
          <Column field="kenarislem" header="Yüzey Adı" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                :placeholder="`Search by - `" v-tooltip.top.focus="'Hit enter key to filter'" />
            </template>
          </Column>
          <Column field="en" header="En" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                :placeholder="`Search by - `" v-tooltip.top.focus="'Hit enter key to filter'" />
            </template>
          </Column>
          <Column field="boy" header="Boy" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                :placeholder="`Search by - `" v-tooltip.top.focus="'Hit enter key to filter'" />
            </template>
          </Column>
          <Column field="kenar" header="Kenar" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                :placeholder="`Search by - `" v-tooltip.top.focus="'Hit enter key to filter'" />
            </template>
          </Column>
          <Column field="birim_id" header="Birim">
            <template #body="slotProps">
              {{ getBirim(slotProps.data.birim_id) }}
            </template>
          </Column>
        
          <Column field="miktar" header="Miktar" style="min-width: 12rem">
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.miktar) }}
            </template>
          </Column>
          <Column field="siparisaciklama" header="PO" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                :placeholder="`Search by - `" v-tooltip.top.focus="'Hit enter key to filter'" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>



    
    
    
    
  </Dialog>
</template>
<script>
import { mapGetters } from "vuex";
import UretimForm from "@/components/seleksiyon/UretimForm";
import socket from "@/service/SocketService";
import service from "@/service/SeleksiyonService";
import LocalService from "@/service/LocalService";
import Opservice from "@/service/OperasyonService";
import { FilterMatchMode } from "primevue/api";
import raporService from "@/service/RaporService";

export default {
  components: {
    UretimForm,
  },
  computed: {
    ...mapGetters([
      "slk_dis_yeni_btn",
      "slk_dis_kaydet_btn",
      "slk_dis_vazgec_btn",
      "slk_dis_guncelle_btn",
      "slk_dis_sil_btn",
      "slk_enb_mekmar",
      "slk_enb_dis",
      "slk_enb_mekmer_dis",
      "seleksiyon_uretimozetlist",
      "seleksiyon_mekmar_uretimlist",
      "seleksiyon_dis_uretimlist",
      "seleksiyon_mekmer_dis_uretimlist",
      "servis_adres",
      "getMobilWidth",
      "filterSeleksiyonList",
      "seleksiyon_uretimlist",
    ]),
  },
  data() {
    return {
      crateAllDisabled:true,
      productList:[],
      selectedProduct:null,
      selectedPo: null,
      orders:[],
      filteredOrders:[],
      filterTopuKasa: {
        kasa_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kategori: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kenarislem: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparisaciklama: {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
      },
      selectedProducts: [],
      topluKasaForm: false,
      seleksiyonData: null,
      etiketlerVeikKutu: [
        { code: "SNS01", urun: "MINA RUSTIC KENARI KIRIK (SNS01)" },
        { code: "SNS02", urun: "MINA RUSTIC DÜZ KENAR (SNS02)" },
        { code: "SBR01", urun: "SILVER RUSTIC KENARI KIRIK (SBR01)" },
        { code: "SBR02", urun: "SILVER RUSTIC DÜZ KENAR (SBR02)" },
        { code: "SBY01", urun: "ELA KENARI KIRIK (SBY01)" },
        { code: "SBY02", urun: "ELA DÜZ KENAR (SBY02)" },
        { code: "SBS01", urun: "PICASSO KENARI KIRIK (SBS01)" },
        { code: "SBS02", urun: "PICASSO DÜZ KENAR (SBS02)" },
        { code: "ST-450", urun: "MINA RUSTIC DÜZ KENAR (ST-450)" },
        { code: "ST-448", urun: "SILVER RUSTIC DÜZ KENAR (ST-448)" },
        { code: "VKGD-SNS", urun: "CLASSIC VEIN CUT DÜZ KENAR (VKGD-SNS)" },
        { code: "VKCS-FM01", urun: "GOLD (VKCS-FM01)" },
        { code: "VKCS-FM02", urun: "SILVER (VKCS-FM02)" },
        { code: "STS01", urun: "IVORY RUSTİC (STS01)" },
      ],

      etiketlerNovaKutu: [
        { code: "FP-01", urun: "SCABOS KENARI KIRIK (FP-01)" },
        { code: "FP-02", urun: "PICASSO KENARI KIRIK (FP-02)" },
        { code: "FP-03", urun: "IVORY RUSTIC KENARI KIRIK (FP-03)" },
        { code: "FP-04", urun: "CLASSIC MINA KENARI KIRIK (FP-04)" },
        { code: "FP-05", urun: "GOLDEN INK KENARI KIRIK (FP-05)" },
        { code: "FP-06", urun: "BAOMIX KENARI KIRIK (FP-06)" },
        { code: "FP-07", urun: "MINA RUSTIC KENARI KIRIK (FP-07)" },
        { code: "FP-08", urun: "VANILLA BEIGE KENARI KIRIK (FP-08)" },
        { code: "FP-09", urun: "ELA KENARI KIRIK (FP-09)" },
        { code: "FP-10", urun: "SILVER RUSTIC KENARI KIRIK (FP-10)" },
      ],

      etiketlerVeikKasa: [
        { code: "SNS-01-K", urun: "MINA RUSTIC KENARI KIRIK (SNS01)" },
        { code: "SNS-02-K", urun: "MINA RUSTIC DÜZ KENAR (SNS02)" },
        { code: "SBR-01-K", urun: "SILVER RUSTIC KENARI KIRIK (SBR01)" },
        { code: "SBR-02-K", urun: "SILVER RUSTIC DÜZ KENAR (SBR02)" },
        { code: "SBY-01-K", urun: "ELA KENARI KIRIK (SBY01)" },
        { code: "SBY-02-K", urun: "ELA DÜZ KENAR (SBY02)" },
        { code: "SBS-01-K", urun: "PICASSO KENARI KIRIK (SBS01)" },
        { code: "SBS-02-K", urun: "PICASSO DÜZ KENAR (SBS02)" },
        { code: "ST-450-K", urun: "MINA RUSTIC DÜZ KENAR (ST-450)" },
        { code: "ST-448-K", urun: "SILVER RUSTIC DÜZ KENAR (ST-448)" },
        { code: "VKGD-SNS-K", urun: "CLASSIC VEIN CUT DÜZ KENAR (VKGD-SNS)" },
        { code: "VKCS-FM01-K", urun: "GOLD (VKCS-FM01)" },
        { code: "VKCS-FM02-K", urun: "SILVER (VKCS-FM02)" },
        { code: "STS-01-K", urun: "IVORY RUSTIC (STS01)" },
      ],

      etiketlerNovaKasa: [
        { code: "FP-01-K", urun: "SCABOS KENARI KIRIK (FP-01)" },
        { code: "FP-02-K", urun: "PICASSO KENARI KIRIK (FP-02)" },
        { code: "FP-03-K", urun: "IVORY RUSTIC KENARI KIRIK (FP-03)" },
        { code: "FP-04-K", urun: "CLASSIC MINA KENARI KIRIK (FP-04)" },
        { code: "FP-05-K", urun: "GOLDEN INK KENARI KIRIK (FP-05)" },
        { code: "FP-06-K", urun: "BAOMIX KENARI KIRIK (FP-06)" },
        { code: "FP-07-K", urun: "MINA RUSTIC KENARI KIRIK (FP-07)" },
        { code: "FP-08-K", urun: "VANILLA BEIGE KENARI KIRIK (FP-08)" },
        { code: "FP-09-K", urun: "ELA KENARI KIRIK (FP-09)" },
        { code: "FP-10-K", urun: "SILVER RUSTIC KENARI KIRIK (FP-10)" },
      ],
      codeSelected: "",
      codeSelectedKasa: "",
      etiketKodu: "",
      etiketLink: "",
      code: "",
      uretim_tablo: "",
      toplam_gun: 0,
      toplam_ay: 0,
      toplam_t_m: 0,
      toplam_yil: 0,
      toplam_m_mek: 0,
      son_tarih: null,
      isDesktop: true,
      filter_uretim_listesi: null,
      columns: [
        {
          field: "tanim",
          label: "Üretici",
        },
        {
          field: "gun",
          label: "Bugün",
          numeric: true,
          centered: true,
        },
        {
          field: "ay",
          label: "Ay",
          numeric: true,
          centered: true,
        },
        {
          field: "yil",
          label: "Yıl",
          numeric: true,
          centered: true,
        },
      ],

      is_uretimform: false,
      selectedOrder: null,
      sipNo: [],
    };
  },
  localService: null,
  created() {
    if (this.getMobilWidth < 600) {
      this.isDesktop = false;
    }
    this.localService = new LocalService();
    socket.siparis.on("seleksiyon_kayitguncelle_emit", () => {
      service.getUretimOzetList().then((data) => {
        this.$store.dispatch(
          "seleksiyon_uretimozetlist_act",
          data.uretimozetlist
        );
        this.ozetlist_topla();
      });
    });

    if (this.seleksiyon_uretimozetlist) {
      this.ozetlist_topla();
    }

    service.getUretimSipListesi().then((data) => {
      for (var i in data) {
        this.sipNo.push({ name: data[i].sipNo });
      }
    });
  },
  methods: {
    // is_selected_product() {
    //   if (this.selectedProduct && this.selectedPo && this.selectedProducts) {
    //     this.crateAllDisabled = false
    //   }
    // },
    isSelectedPo() {
      service.getPoProductList(this.selectedPo.siparisNo).then(data => {
        this.productList = data.productList
      })
    },
    
    getAllCrateDialog() {
      this.selectedProduct = null
      this.selectedPo = null
      this.selectedProducts = []
      this.topluKasaForm = true
      this.crateAllDisabled = true
      
      raporService.getAllOrders().then((data) => {
        this.orders = data;
      });
    },
    poChangeEvent(event) {
      setTimeout(() => {
        let result;

        if (event.query.length == 0) result = [...this.orders];
        else {
          result = this.orders.filter((x) => {
            return x.siparisNo
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filteredOrders = result;
      }, 250);
    },
    setCrateAll() {
      if (this.selectedPo == null || this.selectedProducts.length<0) {
        alert("Lütfen po ve kasaları seçiniz!")
        return;
      }
      if (confirm("Kasaları gerçekten atamak istediğinize emin misiniz?")) {
        const data = {
          'po': this.selectedPo.siparisNo,
          'products': this.selectedProducts,
          'product_id': this.selectedProduct.product_id
        }
        service.setCrate(data).then(data => {
          if (data.status) {
            this.$store.dispatch("loadUretimList", data.data);
            this.$toast.add({ severity: 'success', summary: 'Kasa Değiştirme', detail: 'Kasalar başarıyla '+ this.selectedPo.siparisNo  + ' siparişine atandı' , life: 3000 });
          } else {
            this.$toast.add({ severity: 'error', summary: 'Kasa Değiştirme', detail: 'Kasalar '+ this.selectedPo.siparisNo  + ' siparişine atanamadı' , life: 3000 });

          }
        })
      }
      
    },
    getBirim(birimId) {
      if (birimId == 1) {
        return "M2";
      } else if (birimId == 2) {
        return "Adet";
      } else if (birimId == 3) {
        return "MT";
      }
    },
    isDropDownChange(event) {
      this.code = event.value.code;
    },
    isDropDownChangeTwo(event) {
      this.code = event.value.code;
    },
    isDropDownChangeThree(event) {
      this.code = event.value.code;
    },
    isDropDownChangeFour(event) {
      this.code = event.value.code;
    },
    etiketDowload() {
      Opservice.getEtiketKayit(this.code).then((data) => {
        this.evrak_indir(data, "Etiket");
        this.codeSelected = "";
        this.codeSelectedKasa = "";
        this.etiketKodu = "";
        this.etiketLink = "";
        this.code = "";
      });
    },
    evrak_indir(dosya_link, dosya_adi) {
      const link = document.createElement("a");
      link.href = dosya_link;
      link.setAttribute("download", `${dosya_adi}.doc`);
      document.body.appendChild(link);
      link.click();
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    etiket_cikti_click() {
      this.$store.dispatch("loadingBeginAct");

      let tarih = this.localService.getDateString(this.son_tarih);
      service.getSeleksiyonEtiketTarih(tarih).then((data) => {
        service.getSeleksiyonEtiketList(data).then((responce) => {
          if (responce.status) {
            const link = document.createElement("a");
            link.href =
              this.servis_adres + "siparisler/dosyalar/seleksiyonEtiketCikti";

            link.setAttribute("download", "Seleksiyon Üretim Etiket.xlsx");
            document.body.appendChild(link);
            link.click();
            this.$store.dispatch("loadingEndAct");
          }
        });
      });
    },
    excel_cikti_click() {
      if (this.filterSeleksiyonList != null) {
        this.seleksiyonData = this.filterSeleksiyonList;
      } else {
        if (this.slk_enb_mekmar == true) {
          this.seleksiyonData = this.seleksiyon_mekmar_uretimlist;
        } else if (this.slk_enb_mekmer_dis == true) {
          this.seleksiyonData = this.seleksiyon_mekmer_dis_uretimlist;
        } else if (this.slk_enb_dis == true) {
          this.seleksiyonData = this.seleksiyon_dis_uretimlist.disUretim;
        }
      }
      this.$store.dispatch("loadingBeginAct");

      service.getSeleksiyonExcelList(this.seleksiyonData).then((responce) => {
        if (responce.status) {
          const link = document.createElement("a");
          //link.href = 'localhost:5000/' + 'siparisler/dosyalar/seleksiyonExcelCikti'
          link.href =
            this.servis_adres + "siparisler/dosyalar/seleksiyonExcelCikti";

          link.setAttribute("download", "seleksiyon_listesi.xlsx");
          document.body.appendChild(link);
          link.click();
          this.$store.dispatch("loadingEndAct");
        }
      });
    },

    btn_yeni_click() {
      this.$store.dispatch("seleksiyonYeniClickActions");
      this.is_uretimform = true;
    },
    btn_kaydet_click() {
      this.$store.dispatch("seleksiyonKaydetClickActions");
    },
    btn_vazgec_click() {
      this.$store.dispatch("seleksiyonVazgecClickActions");
    },
    btn_guncelle_click() {
      this.$store.dispatch("seleksiyonGuncelleClickActions");
    },
    btn_sil_click() {
      this.$store.dispatch("seleksiyonSilClickActions");
    },
    btn_mekmar_click() {
      this.$store.dispatch("seleksiyonMekmarUretimSecActions");
    },
    btn_dis_click() {
      this.$store.dispatch("seleksiyonDisUretimSecActions");
    },
    btn_mekmer_dis_click() {
      this.$store.dispatch("seleksiyonMekmerDisUretimSecActions");
    },
    ozetlist_topla() {
      this.toplam_gun = 0;
      this.toplam_ay = 0;
      this.toplam_yil = 0;
      this.toplam_m_mek = 0;
      for (let key in this.seleksiyon_uretimozetlist) {

        const item = this.seleksiyon_uretimozetlist[key];

        this.toplam_gun += item.gun;
        this.toplam_ay += item.ay;
        this.toplam_yil += item.yil;
        if (
          this.seleksiyon_uretimozetlist[key].tanim == "Mekmer" ||
          this.seleksiyon_uretimozetlist[key].tanim == "Mek-Moz"
        ) {
          this.toplam_m_mek += this.seleksiyon_uretimozetlist[key].ay;
        }
      }
    },
  },
  mounted() {
    this.emitter.on('kaydet_emit', () => {
      this.ozetlist_topla()
    })
  },
  watch: {
    selectedProduct() {
      if (this.selectedProduct && this.selectedPo && this.selectedProducts.length >0) {
        this.crateAllDisabled = false
      } else {
        this.crateAllDisabled = true
      }
    },
    selectedPo() {
      if (this.selectedProduct && this.selectedPo && this.selectedProducts.length >0) {
        this.crateAllDisabled = false
      } else {
        this.crateAllDisabled = true
      }
    },
    selectedProducts() {
      console.log("selectedProducts",this.selectedProducts)
      if (this.selectedProduct && this.selectedPo && this.selectedProducts.length >0) {
        this.crateAllDisabled = false
      } else {
        this.crateAllDisabled = true
      }
    }
  }
};
</script>

<style scoped>
.yeniButton {
  background-color: #61b8a3;
  color: #fff;
}
.mekmarButton {
  background-color: #d2e02b;
  color: #fff;
}
.mekmarButton:disabled {
  color: #000;
}
.disButton {
  background-color: #3a6dc7;
  color: #fff;
}
.disButton:disabled {
  color: #000;
}
.disMekmerButton {
  background-color: #fa6e43;
  color: white;
}
.disMekmerButton {
  color: black;
}
</style>

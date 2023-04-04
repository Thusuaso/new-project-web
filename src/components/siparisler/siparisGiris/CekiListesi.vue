<template>
  <div class="p-grid">
    <div class="p-grid p-ai-start vertical-container">
      <div class="p-col-12 p-md-3 excel_button">
        <Button
          class="p-button-secondary"
          :disabled="is_excell"
          @click="excel_cikti_click"
          label="Excel Çıktı"
        />
      </div>
    </div>
    <div class="p-col-12 p-md-12">
      <DataTable
        class="p-datatable-responsive"
        v-model:value="cekiListesi"
        :selection="selectCeki"
      >
        <Column
          field="sira"
          header="#"
          headerStyle="width:2%;"
          bodyStyle="text-align:left;"
        >
          <template #body="slotProps">
            {{ slotProps.data.sira }}
          </template>
        </Column>

        <Column
          field="tedarikciAdi"
          header="Tedarikçi"
          headerStyle="width:6%;"
          bodyStyle="text-align:left;"
        >
          <template #body="slotProps">
            {{ slotProps.data.tedarikciAdi }}
          </template>
        </Column>
        <Column
          field="kategoriAdi"
          header="Kategori"
          headerStyle="width:12%;"
          bodyStyle="text-align:left;"
        >
          <template #body="slotProps">
            {{ slotProps.data.kategoriAdi }}
          </template>
        </Column>
        <Column
          field="kasaNo"
          header="KasaNo"
          headerStyle="width:4%;"
          bodyStyle="text-align:left;"
        >
          <template #body="slotProps">
            {{ slotProps.data.kasaNo }}
          </template>
        </Column>
        <Column
          field="yuzeyIslem"
          header="Yüzey İşlem"
          headerStyle="width:15%;"
          bodyStyle="text-align:left;"
        >
          <template #body="slotProps">
            {{ slotProps.data.yuzeyIslem }}
          </template>
        </Column>
        <Column
          field="urunAdi"
          header="Renk"
          headerStyle="width:7%;"
          bodyStyle="text-align:left;"
        >
          <template #body="slotProps">
            {{ slotProps.data.urunAdi }}
          </template>
        </Column>
        <Column
          field="kenar"
          header="K"
          headerStyle="width:3%;"
          bodyStyle="text-align:left;"
        >
          <template #body="slotProps">
            {{ slotProps.data.kenar }}
          </template>
        </Column>
        <Column
          field="en"
          header="E"
          headerStyle="width:3%;"
          bodyStyle="text-align:left;"
        >
          <template #body="slotProps">
            {{ slotProps.data.en }}
          </template>
        </Column>
        <Column
          field="boy"
          header="B"
          headerStyle="width:3%;"
          bodyStyle="text-align:left;"
        >
          <template #body="slotProps">
            {{ slotProps.data.boy }}
          </template>
        </Column>
        <Column
          field="adet"
          header="Adet"
          headerStyle="width:2%;"
          bodyStyle="text-align:left;"
        >
          <template #body="slotProps">
            {{ slotProps.data.adet }}
          </template>
        </Column>
        <Column
          field="kutuAdet"
          header="Kutu"
          headerStyle="width:2%;"
          bodyStyle="text-align:left;"
        >
          <template #body="slotProps">
            {{ slotProps.data.kutuAdet }}
          </template>
        </Column>
        <Column
          field="miktar"
          header="Miktar"
          headerStyle="width:5%;"
          bodyStyle="text-align:left;"
        >
          <template #body="slotProps">
            {{ slotProps.data.miktar }}
          </template>
          <template #footer>
            {{ formatDecimal(toplam_miktar) }}
          </template>
        </Column>
        <Column
          field="birimAdi"
          header="B"
          headerStyle="width:5%;"
          bodyStyle="text-align:left;"
        >
          <template #body="slotProps">
            {{ slotProps.data.birimAdi }}
          </template>
        </Column>
        <Column
            field="kasaOlcusu"
            header="Olcu"
            headerStyle="width:5%;"
            bodyStyle="text-align:left;"
          >
            <template #body="slotProps">
              {{ slotProps.data.kasaOlcusu }}
            </template>
          </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import siparisService from "../../../service/SiparisService";
import excelService from "../../../service/ExcelService";
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      selectCeki: null,
      cekiListesi: null,
      toplam_miktar: 0,
      is_excell: false,
      etiketKodu: null,
      isDisabled: true,
      selectedCode: null,
      etiketler: [
        { code: "SNS01", urun: "MINA RUSTIC (SNS01)" },
        { code: "SNS02", urun: "MINA RUSTIC (SNS02)" },
        { code: "SBR01", urun: "SILVER RUSTIC (SBR01)" },
        { code: "SBR02", urun: "SILVER RUSTIC (SBR02)" },
        { code: "SBY01", urun: "ELA (SBY01)" },
        { code: "SBY02", urun: "ELA (SBY02)" },
        { code: "SBS01", urun: "PICASSO (SBS01)" },
        { code: "SBS02", urun: "PICASSO (SBS02)" },
        { code: "ST-450", urun: "MINA RUSTIC (ST-450)" },
        { code: "ST-448", urun: "SILVER RUSTIC (ST-448)" },
        { code: "VKGD-SNS", urun: "CLASSIC VEIN CUT (VKGD-SNS)" },
        { code: "VKCS-FM01", urun: "GOLD (VKCS-FM01)" },
        { code: "VKCS-FM02", urun: "SILVER (VKCS-FM02)" },
      ],
      codeSelected: "",
    };
  },
  computed: {
    ...mapGetters(["servis_adres"]),
  },
  props: ["siparisNo", "yeniSiparis"],
  created() {
  },
  mounted() {
    if (!this.yeniSiparis) {
      siparisService.getCekiListesi(this.siparisNo).then((data) => {
        this.cekiListesi = data;

        for (let key in this.cekiListesi) {
          this.toplam_miktar += this.cekiListesi[key].miktar;
        }
      });
    }
  },
  methods: {
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    isChangeCode(event) {
      this.codeSelected = event.value.code;
    },

    excel_cikti_click() {

      excelService.getSiparisCekiListesi(this.cekiListesi).then((res) => {
        if (res.status) {
          const link = document.createElement("a");
          link.href = this.servis_adres + "excel/listeler/siparisCekiListesi";

          link.setAttribute("download", "ceki_listesi.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
  },
};
</script>
<style scoped>
.excel_button {
  padding-left: 500px;
  margin-top: 5px;
}

.p-datatable {
  font-size: 9px;
}
</style>

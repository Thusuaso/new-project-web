<template>
  <div class="p-fluid">
    <div class="p-grid">
      <div class="p-col-12">
        <DataTable
          :value="masraflarTopList"
          class="p-datatable-sm"
          responsiveLayout="scroll"
        >
          <template #header
            ><div style="text-align: center;font-size:15px;">Toplam Masraflar</div>
          </template>
          <Column
            field="masraf"
            bodyStyle="text-align:center;font-weight:bold;"
          >
            <template #body="slotProps">{{
              formatPrice(slotProps.data.masraf)
            }}</template>
          </Column>
        </DataTable>
        <Card>
          <template #content>
            <div
              class="columns"
              v-if="
                ilaclama.length > 0 || gumruk.length > 0 || navlun.length > 0
              "
            >
              <div class="column" v-if="ilaclama.length > 0">
                <DataTable v-model:value="ilaclama" class="p-datatable-sm">
                  <template #header>
                    <div class="columns is-multiline">
                      <div class="column is-12">
                        <span style="font-size: 15px"
                          >ilaclama Masraf Listesi</span
                        >
                      </div>
                    </div>
                  </template>
                  <Column field="tur" header="Fatura Adı">
                    <template #body="slotProps">
                      {{ slotProps.data.tur }}
                    </template>
                  </Column>
                  <Column
                    field="aciklama"
                    header="Fatura Açıklama"
                    headerStyle="width:180px;"
                    bodyStyle="word-break:break-word;"
                  >
                    <template #body="slotProps">
                      {{ slotProps.data.aciklama }}
                    </template>
                  </Column>
                  <Column
                    field="tutar"
                    header="Tutar"
                    bodyStyle="text-align:center;"
                    footerStyle="text-align:center;"
                  >
                    <template #body="slotProps">
                      {{ formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                      {{ formatPrice(ilaclamaToplam) }}
                    </template>
                  </Column>
                </DataTable>
              </div>
              <div class="column" v-if="gumruk.length > 0">
                <DataTable v-model:value="gumruk" class="p-datatable-sm">
                  <template #header>
                    <div class="columns is-multiline">
                      <div class="column is-12">
                        <span style="font-size: 15px"
                          >Gümrük Masraf Listesi</span
                        >
                      </div>
                    </div>
                  </template>
                  <Column field="tur" header="Fatura Adı">
                    <template #body="slotProps">
                      {{ slotProps.data.tur }}
                    </template>
                  </Column>
                  <Column
                    field="aciklama"
                    header="Fatura Açıklama"
                    headerStyle="width:180px;"
                    bodyStyle="word-break:break-word;"
                  >
                    <template #body="slotProps">
                      {{ slotProps.data.aciklama }}
                    </template>
                  </Column>
                  <Column
                    field="tutar"
                    header="Tutar"
                    bodyStyle="text-align:center;"
                    footerStyle="text-align:center;"
                  >
                    <template #body="slotProps">
                      {{ formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                      {{ formatPrice(gumrukToplam) }}
                    </template>
                  </Column>
                </DataTable>
              </div>
              <div class="column" v-if="navlun.length > 0">
                <DataTable v-model:value="navlun" class="p-datatable-sm">
                  <template #header>
                    <div class="columns is-multiline">
                      <div class="column is-12">
                        <span style="font-size: 15px"
                          >Navlun Masraf Listesi</span
                        >
                      </div>
                    </div>
                  </template>
                  <Column field="tur" header="Fatura Adı">
                    <template #body="slotProps">
                      {{ slotProps.data.tur }}
                    </template>
                  </Column>
                  <Column
                    field="aciklama"
                    header="Fatura Açıklama"
                    headerStyle="width:180px;"
                    bodyStyle="word-break:break-word;"
                  >
                    <template #body="slotProps">
                      {{ slotProps.data.aciklama }}
                    </template>
                  </Column>
                  <Column
                    field="tutar"
                    header="Tutar"
                    bodyStyle="text-align:center;"
                    footerStyle="text-align:center;"
                  >
                    <template #body="slotProps">
                      {{ formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                      {{ formatPrice(navlunToplam) }}
                    </template>
                  </Column>
                </DataTable>
              </div>
            </div>
            <div class="columns" v-if="liman.length > 0 || nakliye.length > 0">
              <div class="column" v-if="liman.length > 0">
                <DataTable v-model:value="liman" class="p-datatable-sm">
                  <template #header>
                    <div class="columns is-multiline">
                      <div class="column is-12">
                        <span style="font-size: 15px"
                          >Liman Masraf Listesi</span
                        >
                      </div>
                    </div>
                  </template>
                  <Column field="tur" header="Fatura Adı">
                    <template #body="slotProps">
                      {{ slotProps.data.tur }}
                    </template>
                  </Column>
                  <Column
                    field="aciklama"
                    header="Fatura Açıklama"
                    headerStyle="width:180px;"
                    bodyStyle="word-break:break-word;"
                  >
                    <template #body="slotProps">
                      {{ slotProps.data.aciklama }}
                    </template>
                  </Column>
                  <Column
                    field="tutar"
                    header="Tutar"
                    bodyStyle="text-align:center;"
                    footerStyle="text-align:center;"
                  >
                    <template #body="slotProps">
                      {{ formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                      {{ formatPrice(limanToplam) }}
                    </template>
                  </Column>
                </DataTable>
              </div>
              <div class="column" v-if="nakliye.length > 0">
                <DataTable v-model:value="nakliye" class="p-datatable-sm">
                  <template #header>
                    <div class="columns is-multiline">
                      <div class="column is-12">
                        <span style="font-size: 15px"
                          >Nakliye Masraf Listesi</span
                        >
                      </div>
                    </div>
                  </template>
                  <Column field="tur" header="Fatura Adı">
                    <template #body="slotProps">
                      {{ slotProps.data.tur }}
                    </template>
                  </Column>
                  <Column
                    field="aciklama"
                    header="Fatura Açıklama"
                    headerStyle="width:180px;"
                    bodyStyle="word-break:break-word;"
                  >
                    <template #body="slotProps">
                      {{ slotProps.data.aciklama }}
                    </template>
                  </Column>
                  <Column
                    field="tutar"
                    header="Tutar"
                    bodyStyle="text-align:center;"
                    footerStyle="text-align:center;"
                  >
                    <template #body="slotProps">
                      {{ formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                      {{ formatPrice(nakliyeToplam) }}
                    </template>
                  </Column>
                </DataTable>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import SiparisService from "../../../service/SiparisService";
export default {
  data() {
    return {
      selectMasraf: null,
      masrafListesi: null,
      masrafToplam: 0,
      ilaclama: [],
      gumruk: [],
      nakliye: [],
      navlun: [],
      liman: [],
      ilaclamaToplam: 0,
      gumrukToplam: 0,
      nakliyeToplam: 0,
      navlunToplam: 0,
      limanToplam: 0,
      masraflarTop: 0,
      masraflarTopList: [],
    };
  },
  props: ["siparisNo", "yeniSiparis"],
  siparisService: null,
  created() {
    this.siparisService = new SiparisService();
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    nakliyeTop(event) {
      this.nakliyeToplam = 0;
      for (let item of event) {
        this.nakliyeToplam += item.tutar;
      }
    },
    ilaclamaTop(event) {
      this.ilaclamaToplam = 0;
      for (let item of event) {
        this.ilaclamaToplam += item.tutar;
      }
    },
    gumrukTop(event) {
      this.gumrukToplam = 0;
      for (let item of event) {
        this.gumrukToplam += item.tutar;
      }
    },
    navlunTop(event) {
      this.navlunToplam = 0;
      for (let item of event) {
        this.navlunToplam += item.tutar;
      }
    },
    limanTop(event) {
      this.limanToplam = 0;
      for (let item of event) {
        this.limanToplam += item.tutar;
      }
    },
  },
  mounted() {
    if (!this.yeniSiparis) {
      this.siparisService.getMasrafListesi(this.siparisNo).then((data) => {
        console.log("getMasrafListesi", data);
        this.masrafListesi = data;
        this.masraflarTop = 0;
        for (let i of data) {
          this.masraflarTop += i.tutar;
        }
        this.masraflarTopList.push({ masraf: this.masraflarTop });
        this.ilaclama = data.filter((x) => x.tur == "İlaçlama Faturası");
        this.gumruk = data.filter((x) => x.tur == "Gümrük Faturası");
        this.nakliye = data.filter((x) => x.tur == "Nakliye Faturası");
        this.navlun = data.filter((x) => x.tur == "Navlun");
        this.liman = data.filter((x) => x.tur == "Liman Masrafı");
        this.ilaclamaTop(this.ilaclama);
        this.gumrukTop(this.gumruk);
        this.nakliyeTop(this.nakliye);
        this.navlunTop(this.navlun);
        this.limanTop(this.liman);
      });
    }
  },
};
</script>
<style scoped>
.p-card {
  min-height: 300px;
}
</style>

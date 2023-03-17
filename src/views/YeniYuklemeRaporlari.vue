<template>
  <section>
    <TabView>
      <TabPanel header="Aylık Yükleme Raporu">
        <Button
          icon="pi pi-file-excel"
          class="p-button-primary"
          label="Excel"
          @click="excel_cikti_click"
        />
        <div class="columns is-multiline is-centered">
          <div class="column is-4">
            <DataTable
              :value="mekmarLoadMonths"
              :scrollable="true"
              scrollHeight="420px"
              dataKey="id"
            >
              <template #header>
                <div class="columns is-multiline">
                  <div class="column is-12">
                    <span style="font-size: 15px"
                      >Aylık Toplam Yükleme (Bütün Pazarlamalar)
                    </span>
                  </div>
                </div>
              </template>
              <Column field="ay" header="Ay" bodyStyle="text-align:center;">
                <template #body="slotProps">
                  {{ slotProps.data.ay }}
                </template>
              </Column>
              <Column
                field="fobToplam"
                header="Fob"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.fobToplam) }}
                </template>
                <template #footer>
                  {{ formatPrice(totalYuklemeFob) }}
                </template>
              </Column>
              <Column
                field="cfrToplam"
                header="DDP"
                bodyStyle="text-align:center;"
              >
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.cfrToplam) }}
                </template>
                <template #footer>
                  {{ formatPrice(totalYuklemeCfr) }}
                </template>
              </Column>
            </DataTable>
          </div>
          <div class="column is-4">
            <DataTable
              :value="mekmarBdLoadMonths"
              responsiveLayout="scroll"
              :scrollable="true"
              scrollHeight="420px"
            >
              <template #header>
                <div class="table-header" style="font-size: 15px">
                  Kutu Bazında Depo Satışları
                </div>
              </template>
              <Column field="ay" header="Ay">
                <template #body="slotProps">
                  {{ slotProps.data.ay }}
                </template>
              </Column>
              <Column field="fobToplam" header="Fob">
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.fobToplam) }}
                </template>
                <template #footer>
                  {{ formatPrice(totalBdFob) }}
                </template>
              </Column>
              <Column field="cfrToplam" header="DDP">
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.cfrToplam) }}
                </template>
                <template #footer>
                  {{ formatPrice(totalBdCfr) }}
                </template>
              </Column>
            </DataTable>
          </div>
          <div class="column is-4">
            <DataTable
              :value="mekmarTotalLoadMonths"
              responsiveLayout="scroll"
              :scrollable="true"
              scrollHeight="420px"
            >
              <template #header>
                <div class="table-header" style="font-size: 15px">
                  Toplam
                </div>
              </template>
              <Column field="ay" header="Ay">
                <template #body="slotProps">
                  {{ slotProps.data.ay }}
                </template>
                <template #filter>
                  <InputText v-model="filters['ay']" class="p-column-filter" />
                </template>
              </Column>
              <Column field="fobToplam" header="Fob">
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.fobToplami) }}
                </template>
                <template #footer>
                  {{ formatPrice(toplamFob) }}
                </template>
              </Column>
              <Column field="cfrToplam" header="DDP">
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.cfrToplami) }}
                </template>
                <template #footer>
                  {{ formatPrice(toplamCfr) }}
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
        <p style="color: red">
          * Yükleme tarihleri ve tutarları baz alınmıştır.
        </p>
        <p style="color: red">
          * Depodan Bd kutu satışları baz alınmıştır. BD ödemesi DDP olarak
          gelirken FOB tutar, DDP' nin %70' i alınarak hesaplanır.
        </p>
      </TabPanel>
      <TabPanel header="Güncel Üretim Sipariş Raporu">
        <musteriBazindaUretim> </musteriBazindaUretim>
        <p style="color: red">
          * Siparişler üretim aşamasında olduğu için yükleme sonrası değerlerde
          farklılık görülebilir.
        </p>
      </TabPanel>
      <TabPanel header="Yükleme Raporu">
        <byMarketingYukleme></byMarketingYukleme>
      </TabPanel>
      <TabPanel header="Yıllık Yükleme Raporu">
        <ayBazindaMarketingYuklemeler></ayBazindaMarketingYuklemeler>
      </TabPanel>
    </TabView>
  </section>
</template>
<script>
import service from "../service/RaporService";
import musteriBazindaUretim from "../components/newyuklemeraporlari/musteriBazindaUretim";
import byMarketingYukleme from "../components/newyuklemeraporlari/byMarketingYukleme";
import ayBazindaMarketingYuklemeler from "../components/newyuklemeraporlari/ayBazindaMarketingYuklemeler";

import { mapGetters } from "vuex";

export default {
  components: {
    musteriBazindaUretim,
    byMarketingYukleme,
    ayBazindaMarketingYuklemeler
  },
  data() {
    return {
      toplamListe: [],
      toplamFob: 0,
      toplamCfr: 0,
      totalBdFob: 0,
      totalBdCfr: 0,
      totalYuklemeFob: null,
      totalYuklemeCfr: null,
      fobToplami: 0,
      cfrToplami: 0,
      yil_listesi: null,
      ay_listesi: null,
      select_yil: 0,
      select_ay: 0,
      select_aystr: "",
      filters: {},
      aylik_yukleme_listesi: null,
      musteribazinda_aylik: null,
      yillik_yukleme_listesi: null,
      aylik_sayim_listesi: null,
      yillik_sayim_listesi: null,
      aylik_liste: null,
      yillik_liste: null,
      tur: "musteri",
      marketing: "null",
      excelrapor: null,
      siparis_no_durum: false,
      siparis_no: "",
      fob_ay_top: 0,
      dtp_ay_top: 0,
      fob_yil_top: 0,
      dtp_yil_top: 0,
      yukleme_ay_top: 0,
      yukleme_yil_top: 0,
      pdfrapor: null,
      ay_baslik: "",
      yil_baslik: "",
    };
  },

  computed: {
    ...mapGetters([
      "servis_adres",
      "mekmarTotalLoadMonths",
      "mekmarLoadMonths",
      "mekmarBdLoadMonths",
      "byCustomersProduct",
      "byMarketingLoadMonth",
      "byMarketingProduct",
      "byMarketingWarehouseLoad",
    ]),
  },

  created() {
    this.$store.dispatch("fullscreenLoadingAct",true);
    service.getYuklemeYilListesi().then((yil_list) => {
      this.yil_listesi = yil_list;
      this.select_yil = yil_list[0].yil;
      this.yil_baslik = this.select_yil;

      service.getYuklemeAyListesi(this.select_yil).then((ay_list) => {
        this.ay_listesi = ay_list;

        this.select_ay = ay_list[0].ay;
        this.select_aystr = ay_list[0].ay_str;
        this.ay_baslik = this.select_aystr;
        this.yukleme_listesi_yukle();
      });
    });
    // service.getYuklemeRapor(this.select_yil, this.select_ay).then((data) => {
    //   this.aylik_yukleme_listesi = data.aylik_yukleme_listesi;
    //   this.yillik_yukleme_listesi = data.yillik_yukleme_listesi;
    //   this.aylik_sayim_listesi = data.aylik_sayim_listesi;
    //   this.yillik_sayim_listesi = data.yillik_sayim_listesi;
    //   this.musteribazinda_aylik = data.musteribazinda_aylik;

    // });
  },
  methods: {
    excel_cikti_click() {
      const data = {
        mekmarTotalLoadMonths: this.mekmarTotalLoadMonths,
        mekmarLoadMonths: this.mekmarLoadMonths,
        mekmarBdLoadMonths: this.mekmarBdLoadMonths,
      };
      service.getMarketingExcell(data).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "raporlar/dosyalar/marketingExcellCikti";
          link.setAttribute("download", "Yükleme_Raporu_(Fabrika+Depo).xlsx");

          document.body.appendChild(link);
          link.click();
        }
      });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    yukleme_listesi_yukle() {
      service.getMarketingRaporlari().then((data) => {
        this.$store.dispatch("mekmarLoadMonthsAct", data);
        this.tabloToplamAlma(
          data.data.marketingYuklemeAylik,
          data.data.marketingBd
        );
        this.$store.dispatch("mekmarTotalLoadMonthsAct", this.toplamListe);
        this.yuklemeToplamList(data.data.marketingYuklemeAylik);
        this.bdToplamList(data.data.marketingBd);
        this.$store.dispatch("fullscreenLoadingAct",false);
      });
    },
    yuklemeToplamList(liste) {
      this.totalYuklemeFob = 0;
      this.totalYuklemeCfr = 0;
      for (let i of liste) {
        this.totalYuklemeFob += i.fobToplam;
        this.totalYuklemeCfr += i.cfrToplam;
      }
    },
    bdToplamList(liste) {
      this.totalBdFob = 0;
      this.totalBdCfr = 0;
      for (let i of liste) {
        this.totalBdFob += i.fobToplam;
        this.totalBdCfr += i.cfrToplam;
      }
    },

    tabloToplamAlma(yuklemeListe, bdListe) {
      this.fobToplami = 0;
      this.cfrToplami = 0;
      for (let item of yuklemeListe) {
        this.fobToplami = item.fobToplam;
        this.cfrToplami = item.cfrToplam;
        const result = this.getTabloToplamBd(bdListe, item.ay)[0];
        if (result.length == 0) {
          this.fobToplami = item.fobToplam;
          this.cfrToplami = item.cfrToplam;
          this.toplamListe.push({
            ay: item.ay,
            fobToplami: this.fobToplami,
            cfrToplami: this.cfrToplami,
          });
        } else {
          this.fobToplami += result.fobToplam;
          this.cfrToplami += result.cfrToplam;
          this.toplamListe.push({
            ay: item.ay,
            fobToplami: this.fobToplami,
            cfrToplami: this.cfrToplami,
          });
        }
      }
      this.toplamFob = 0;
      this.toplamCfr = 0;
      for (let item of this.toplamListe) {
        this.toplamFob += item.fobToplami;
        this.toplamCfr += item.cfrToplami;
      }
    },
    getTabloToplamBd(bdListe, ay) {
      const result = bdListe.filter((x) => x.ay == ay);
      if (result.length > 0) {
        return result;
      } else {
        return [{ ay: ay, fobToplam: 0, cfrToplam: 0 }];
      }
    },
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 10px;
}

.p-column-filter {
  font-size: 9px;
}

.page-button-excell {
  margin-top: 30px;
}

.block {
  margin-top: 15px;
  margin-right: -25px;
}

.excel {
  margin-top: 15px;
}
</style>

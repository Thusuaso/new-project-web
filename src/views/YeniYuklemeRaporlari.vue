<template>
  <section>
    <TabView>
      <TabPanel header="Yıllık Po Bazında Siparişler">
        <yillikPoBazindaSiparisler/>
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
      <TabPanel header="Yükleme ve Sevkiyat Raporu">
          <yuklemeveSevkiyatRaporu />
      </TabPanel>
    </TabView>
  </section>
</template>
<script>
import service from "../service/RaporService";
import musteriBazindaUretim from "../components/newyuklemeraporlari/musteriBazindaUretim";
import byMarketingYukleme from "../components/newyuklemeraporlari/byMarketingYukleme";
import yuklemeveSevkiyatRaporu from '../components/newyuklemeraporlari/yuklemeveSevkiyatRaporu';
import yillikPoBazindaSiparisler from '../components/newyuklemeraporlari/yillikPoBazindaSiparisler';
import { mapGetters } from "vuex";

export default {
  components: {
    musteriBazindaUretim,
    byMarketingYukleme,
    yuklemeveSevkiyatRaporu,
    yillikPoBazindaSiparisler
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

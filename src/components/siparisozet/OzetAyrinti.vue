<template>
  <section>
    <div class="columns is-multiline">
      <div class="column is-5">
        <Button
          @click="excel_cikti_click"
          icon="fa-solid fa-file-excel fa-2xl"
        />
      </div>
      <div class="column is-5">
        <Button @click="generatePdf" icon="fa-solid fa-file-pdf fa-2xl" />
      </div>
      <div class="column is-12">
        <DataTable :value="siparis_ozet_ayrinti" :loading="loading">
          <Column
            field="tarih"
            header="Tarih"
            headerStyle="width:70px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.tarih }}
            </template>
          </Column>
          <Column
            field="musteri"
            header="Müşteri"
            headerStyle="width:70px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="siparisnumarasi"
            header="Sipariş Numarası"
            headerStyle="width:70px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.siparisnumarasi }}
            </template>
          </Column>
          <Column
            field="teslim"
            header="Teslim Şekli"
            headerStyle="width:70px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ slotProps.data.teslim }}
            </template>
          </Column>
          <Column
            field="satistoplam"
            header="Fob"
            headerStyle="width:70px; background-color:yellow"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.satistoplam) }}
            </template>
            <template #footer>
              <font title="Fob"> {{ formatPrice(SatisToplam) }}</font>
            </template>
          </Column>
          <Column
            field="navlun"
            header="Navlun"
            headerStyle="width:70px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.navlun) }}
            </template>
          </Column>
          <Column
            field="detay1"
            header="Detay 1"
            headerStyle="width:70px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.detay1) }}
            </template>
          </Column>

          <Column
            field="detay2"
            header="Detay 2"
            headerStyle="width:70px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.detay2) }}
            </template>
          </Column>
          <Column
            field="detay3"
            header="Detay 3"
            headerStyle="width:70px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.detay3) }}
            </template>
          </Column>
          <Column
            header="TOPLAM"
            headerStyle="width:70px"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              {{
                formatPrice(
                  slotProps.data.detay3 +
                    slotProps.data.detay2 +
                    slotProps.data.detay1 +
                    slotProps.data.satistoplam +
                    slotProps.data.navlun
                )
              }}
            </template>
            <template #footer>
              {{ formatPrice(TutarToplam) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import service from "../../service/RaporService";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  computed: {
    ...mapGetters(["siparis_ozet_ayrinti", "servis_adres"]),
  },
  data() {
    return {
      satishepsitoplam: 0,
      detay3top: 0,
      detay2top: 0,
      detay1top: 0,
      geneltop: 0,
      loading: false,
      TutarToplam: 0,
      SatisToplam:0
    };
  },
  mounted() {
    this.genel_toplam(this.siparisler);
  },
  created() {
    this.siparisler = this.siparis_ozet_ayrinti;
  },
  props: ["ay"],

  methods: {
    generatePdf() {
      var doc = new jsPDF("p", "pt", "A4");

      doc.setLanguage("tr-TR");
      const col = [
        "Tarih",
        "Musteri",
        "Po",
        "Teslim",
        "Fob",
        "Navlun",
        "Detay 1",
        "Detay 2",
        "Detay 3",
        "Toplam",
      ];

      const rows = [];
      const itemNew = this.siparisler;

      itemNew.forEach((element) => {
        let val = (element.satistoplam / 1).toFixed(1).replace(".", ","); //satistoplam  fiyatın birim ayarı
        val = "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        let val1 = (element.navlun / 1).toFixed(1).replace(".", ","); //navlun fiyatın birim ayarı
        val1 = "$" + val1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        let val2 = (element.detay1 / 1).toFixed(1).replace(".", ","); //detay1 fiyatın birim ayarı
        val2 = "$" + val2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        let val3 = (element.detay2 / 1).toFixed(1).replace(".", ","); //detay2 fiyatın birim ayarı
        val3 = "$" + val3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        let val4 = (element.detay3 / 1).toFixed(1).replace(".", ","); //detay3 fiyatın birim ayarı
        val4 = "$" + val4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        let val5 = (
          element.detay3 +
          element.detay2 +
          element.detay1 +
          element.navlun +
          element.satistoplam / 1
        )
          .toFixed(1)
          .replace(".", ","); //detay3 fiyatın birim ayarı
        val5 = "$" + val5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        const temp = [
          element.tarih,
          element.musteri,
          element.siparisnumarasi,
          element.teslim,
          val,
          val1,
          val2,
          val3,
          val4,
          val5,
        ];
        rows.push(temp);
      });
      let val6 = (this.SatisToplam / 1).toFixed(1).replace(".", ","); //total birim ayarı
      val6 = "$" + val6.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      let val7 = (this.TutarToplam / 1).toFixed(1).replace(".", ","); //total birim ayarı
      val7 = "$" + val7.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      const top = ["", "", "", "", val6, "", "", "", "", val7];

      rows.push(top);

      doc.text(210, 45, this.siparisler[0].yil + " Siparis Özet Formu");
      doc.setFontSize(8);
      doc.text(364, 60, Date());
      doc.setFontSize(8);

      doc.autoTable(col, rows, {
        margin: "auto",
        height: "auto",
        theme: "plain",
        startY: 75,
        styles: {
          // Defaul style
          lineWidth: 0.05,
          lineColor: 0,
          fillStyle: "DF",
          halign: "left",
          valign: "middle",
          CellWidth: "auto",
          overflow: "linebreak",
          fontSize: 8,
        },

        rowStyles: {
          0: {
            fillColor: 255,
            fontStyle: "bold",
            halign: "center",
          },
        },
      });

      doc.save("SiparisOzet.pdf");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    excel_cikti_click() {
      service
        .getSiparisOzetExcelCikti(this.siparis_ozet_ayrinti)
        .then((response) => {
          if (response.status) {
            console.log("response.status " + response.status);
            const link = document.createElement("a");
            link.href =
              this.servis_adres + "raporlar/listeler/siparisOzetExcelCikti";

            link.setAttribute("download", "SiparisOzet.xlsx");
            document.body.appendChild(link);
            link.click();
            this.is_excel = false;
          }
        });
    },
    genel_toplam(liste) {
      console.log(liste)
      this.TutarToplam = 0;
      this.SatisToplam = 0;

      for (let key in liste) {
        const item = liste[key];

        this.TutarToplam +=
          item.navlun +
          item.detay1 +
          item.detay2 +
          item.detay3 +
          item.satistoplam;
        this.SatisToplam += item.satistoplam;
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
  font-size: 10px;
}
.page-button {
  margin-top: 25px;
}
.page-button-excell {
  margin-left: -100px;
}
</style>

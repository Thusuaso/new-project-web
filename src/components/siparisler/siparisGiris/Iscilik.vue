<template>
  <div class="fluid">
    <div class="p-grid">
      <div class="p-col-12 p-md-4">
        <div class="p-col-12 p-md-12">
          <Calendar
            :disabled="dis_form"
            v-model="tarih"
            :showIcon="true"
            dateFormat="dd/mm/yy"
            @date-select="tarihDegisim"
          />
        </div>
        <div class="p-col-12 p-md-12">
          <AutoComplete
            :disabled="dis_form"
            v-model="gider"
            :suggestions="filterGiderList"
            field="giderTur"
            :dropdown="true"
            placeholder="Gider Seç"
            @complete="aramaGider"
            @item-select="giderTurDegisim"
          >
            <template #items="slotProps">
              <div class="p-clearfix p-autocomplete-brand-item">
                <div>{{ slotProps.giderTur }}</div>
              </div>
            </template>
          </AutoComplete>
        </div>
        <div class="p-col-12 p-md-12">
          <AutoComplete
            :disabled="dis_form"
            v-model="tedarikci"
            :suggestions="filterTedarikciList"
            field="firmaAdi"
            :dropdown="true"
            placeholder="Tedarikçi Seç"
            @complete="aramaTedarikci"
            @item-select="tedarikciDegisim"
          >
            <template #items="slotProps">
              <div class="p-clearfix p-autocomplete-brand-item">
                <div>{{ slotProps.firmaAdi }}</div>
              </div>
            </template>
          </AutoComplete>
        </div>
      </div>
      <div class="p-col-12 p-md-8">
        <Textarea
          :autoResize="true"
          rows="5"
          cols="30"
          :disabled="dis_form"
          v-model="giderModel.aciklama"
        />
        <div class="p-col-4 p-offset-8">
          <input-currency
            :value="giderModel.tutar"
            :disAktif="dis_form"
            @input="giderModel.tutar = $event"
          />
        </div>
      </div>
    </div>

    <div class="p-grid p-offset-2">
      <div class="p-col-2">
        <Button
          label="Yeni"
          class="p-button-rounded"
          icon="pi pi-file-o"
          iconPos="left"
          :disabled="dis_yeni"
          @click="btn_yeni_click"
        />
      </div>
      <div class="p-col-2">
        <Button
          label="İptal"
          class="p-button-rounded p-button-danger"
          icon="pi pi-times"
          iconPos="left"
          :disabled="dis_iptal"
          @click="btn_iptal_click"
        />
      </div>
      <div class="p-col-2">
        <Button
          label="Kaydet"
          class="p-button-rounded p-button-success"
          icon="pi pi-plus"
          iconPos="left"
          :disabled="dis_kaydet"
          @click="btn_kaydet_click"
        />
      </div>
      <div class="p-col-2">
        <Button
          label="Sil"
          class="p-button-rounded"
          style="background-color: yellow; color: black"
          icon="pi pi-times-circle"
          iconPos="left"
          :disabled="dis_sil"
          @click="btn_sil_click"
        />
      </div>
    </div>
    <div class="p-grid">
      <div class="p-col-12 p-md-12">
        <DataTable
          :value="giderListesi"
          class="p-datatable-responsive"
          :selection="selectGider"
          selectionMode="single"
          :paginator="false"
          @row-select="giderSecim"
          dataKey="id"
        >
          <Column field="tarih" header="Tarih" bodyStyle="text-align:center;">
            <template #body="slotProps">
              {{ slotProps.data.tarih }}
            </template>
          </Column>
          <Column
            field="tedarikciAdi"
            header="Tedarikci"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              {{ slotProps.data.tedarikciAdi }}
            </template>
          </Column>
          <Column field="aciklama" header="Açıklama">
            <template #body="slotProps">
              {{ slotProps.data.aciklama }}
            </template>
          </Column>
          <Column field="tutar" header="Tutar" bodyStyle="text-align:center;">
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.tutar) }}
            </template>
            <template #footer>
              {{ formatDecimal(giderToplam) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script>
import tedarikciService from "../../../service/TedarikciService";
import CurrencyInput from "../../../components/shared/CurrencyInput";
import siparisService from "../../../service/SiparisService";
import LocalService from "../../../service/LocalService";
import socket from "../../../service/SocketService";
export default {
  components: {
    inputCurrency: CurrencyInput,
  },
  data() {
    return {
      tarih: null,
      gider: null,
      giderList: null,
      filterGiderList: null,
      tedarikci: null,
      tedarikciList: null,
      filterTedarikciList: null,
      giderListesi: null,
      selectGider: null,
      giderToplam: 0,
      dis_yeni: false,
      dis_iptal: true,
      dis_kaydet: true,
      dis_sil: true,
      dis_form: true,
      dataGiderModel: null,
      giderModel: null,
    };
  },
  props: ["siparisNo", "urunKartId"],
  methods: {
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    aramaGider(event) {
      setTimeout(() => {
        let result;

        if (event.query.length === 0) result = [...this.giderList];
        else {
          result = this.giderList.filter((x) => {
            return x.giderTur
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterGiderList = result;
      }, 250);
    },
    aramaTedarikci(event) {
      setTimeout(() => {
        let result;

        if (event.query.length === 0) result = [...this.tedarikciList];
        else {
          result = this.tedarikciList.filter((x) => {
            return x.firmaAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterTedarikciList = result;
      }, 250);
    },
    btn_reset() {
      this.dis_yeni = false;
      this.dis_iptal = true;
      this.dis_kaydet = true;
      this.dis_sil = true;
      this.dis_form = true;
      this.giderModel = { ...this.dataGiderModel };
    },
    btn_yeni_click() {
      this.dis_yeni = true;
      this.dis_kaydet = false;
      this.dis_iptal = false;
      this.dis_form = false;
      this.dis_sil = true;

      this.giderModel = { ...this.dataGiderModel };
    },
    btn_iptal_click() {
      this.btn_reset();
    },
    btn_kaydet_click() {
      this.$store.dispatch("iscilik_add_act", this.giderModel.tutar);
      if (this.giderModel.id == null) {
        this.giderModel.siparisNo = this.siparisNo;
        this.giderModel.urunKartId = this.urunKartId;
        //data verisi geliyor true false
        siparisService.setIscilikKaydet(this.giderModel).then(() => {
          this.giderListYukle();
          this.btn_reset();
        });
      } else {
        siparisService.setIscilikGuncelle(this.giderModel).then(() => {
          this.giderListYukle();
          this.btn_reset();
        });
      }
    },
    btn_sil_click() {
      this.$store.dispatch("iscilik_delete_act", this.giderModel.tutar);
      siparisService.setIscilikSil(this.giderModel).then(() => {
        this.giderListYukle();
        this.btn_reset();
      });
    },
    giderListYukle() {
      this.giderToplam = 0;
      siparisService
        .getIscilikList(this.siparisNo, this.urunKartId)
        .then((data) => {
          this.giderListesi = data;

          for (let key in this.giderListesi) {
            this.giderToplam += this.giderListesi[key].tutar;
          }

          socket.siparis.emit("siparis_iscilik_event", {
            iscilikToplam: this.giderToplam,
          });
        });
    },
    giderSecim(event) {
      this.giderModel = { ...event.data };

      this.tarih = this.localService.getStringDate(this.giderModel.tarih);

      this.dis_yeni = true;
      this.dis_iptal = false;
      this.dis_kaydet = false;
      this.dis_sil = false;
      this.dis_form = false;
    },
    tarihDegisim() {
      this.giderModel.tarih = this.localService.getDateString(this.tarih);
    },
    giderTurDegisim() {
      this.giderModel.siparisEkstraGiderTurId = this.gider.id;
    },
    tedarikciDegisim() {
      this.giderModel.tedarikciId = this.tedarikci.id;
    },
  },
  localService: null,

  created() {
    this.localService = new LocalService();
  },
  mounted() {
    siparisService.getGiderModel().then((data) => {
      this.dataGiderModel = data;
      this.giderModel = { ...this.dataGiderModel };
    });
    tedarikciService.getTedarikciMenuList().then((data) => {
      this.tedarikciList = data;
    });

    this.giderListYukle();

    siparisService.getGiderList().then((data) => (this.giderList = data));
  },
};
</script>

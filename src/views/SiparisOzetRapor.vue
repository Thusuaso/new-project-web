<template>
  <section>
    <div class="columns">
      <div class="columun" style="padding-right: 5px">
        <!----2020 için sipariş özeti--->

        <DataTable
          v-model:value="siparis_list"
          selectionMode="single"
          v-model:selection="select_sip_oncekiyil"
          :scrollable="true"
          scrollHeight="380px"
          @row-select="sip_onceki_yil_sec($event)"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px"
                  >{{ gecen_yil - 1 }} Sipariş Özeti</span
                >
              </div>
            </div>
          </template>
          <Column field="ay_adi" header="Ay" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.ay_adi }}
            </template>
          </Column>
          <Column
            field="oncekiyil_mal_bedeli"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:37%; background-color:yellow"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.oncekiyil_mal_bedeli) }}
            </template>
            <template #footer>
              {{ formatPrice(siparis_oncekiyil_f_toplami) }}
            </template>
          </Column>
          <Column
            field="oncekiyil_toplam"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:36%;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.oncekiyil_toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(siparis_oncekiyil_toplami) }}
            </template>
          </Column>
        </DataTable>
      </div>

      <div class="columun" style="padding-right: 5px">
        <!----2021 için sipariş özeti--->

        <DataTable
          v-model:value="siparis_list"
          selectionMode="single"
          v-model:selection="select_sip_gecenyil"
          :scrollable="true"
          scrollHeight="380px"
          @row-select="sip_gecen_yil_sec($event)"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px"
                  >{{ gecen_yil }} Sipariş Özeti</span
                >
              </div>
            </div>
          </template>
          <Column field="ay_adi" header="Ay" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.ay_adi }}
            </template>
          </Column>
          <Column
            field="gecenyil_mal_bedeli"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:37%; background-color:yellow"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.gecenyil_mal_bedeli) }}
            </template>
            <template #footer>
              {{ formatPrice(siparis_gecenyil_f_toplami) }}
            </template>
          </Column>
          <Column
            field="gecenyil_toplam"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:36%;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.gecenyil_toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(siparis_gecenyil_toplami) }}
            </template>
          </Column>
        </DataTable>
      </div>

      <div class="columun" style="padding-right: 5px">
        <!----2022 için sipariş özeti--->

        <DataTable
          v-model:value="siparis_list"
          selectionMode="single"
          v-model:selection="select_sip_buyil"
          :scrollable="true"
          scrollHeight="380px"
          @row-select="sip_bu_yil_sec($event)"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px">{{ bu_yil }} Sipariş Özeti</span>
              </div>
            </div>
          </template>

          <Column field="ay_adi" header="Ay" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.ay_adi }}
            </template>
          </Column>
          <Column
            field="buyil_mal_bedeli"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="background-color:yellow;width:26%"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.buyil_mal_bedeli) }}
            </template>
            <template #footer>
              {{ formatPrice(siparis_buyil_f_toplami) }}
            </template>
          </Column>

          <Column
            field="buyil_toplam"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:26%"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.buyil_toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(siparis_buyil_toplami) }}
            </template>
          </Column>
          <Column
            field="fark"
            header="Fark (DDP)"
            bodyStyle="text-align:center"
            headerStyle="width:26%;font-size:9px;"
          >
            <template #body="slotProps">
              <div :class="slotProps.data.fark > 0 ? 'yesil' : 'red'">
                {{ formatYuzde(slotProps.data.fark) }}
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <div class="columun" style="padding-right: 5px">
        <DataTable
          v-model:value="siparis_kullanici_gecen"
          selectionMode="single"
          v-model:selection="kullanici_sip_gecen"
          :scrollable="true"
          scrollHeight="380px"
          :loading="loading"
          @row-select="sip_kullanici_gecen_sec($event)"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px">
                  {{ gecen_yil }} Satışçı Sipariş Özeti</span
                >
              </div>
            </div>
          </template>
          <Column field="ay_adi" header="Ay" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.ay_adi }}
            </template>
          </Column>
          <Column
            field="mal_bedeli"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:35%; background-color:yellow"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.gecenyil_mal_bedeli) }}
            </template>
            <template #footer>
              {{ formatPrice(siparis_kullanici_gecen_f_toplam) }}
            </template>
          </Column>
          <Column field="toplam" header="DDP" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.gecenyil_toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(siparis_kullanici_gecen_toplam) }}
            </template>
          </Column>
        </DataTable>
      </div>

      <div class="columun">
        <DataTable
          selectionMode="single"
          v-model:value="siparis_kullanici"
          v-model:selection="kullanici_sip"
          :scrollable="true"
          scrollHeight="380px"
          :loading="loading"
          @row-select="sip_kullanici_sec($event)"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px">
                  {{ bu_yil }} Satışçı Sipariş Özeti</span
                >
              </div>
            </div>
          </template>
          <Column field="ay_adi" header="Ay" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.ay_adi }}
            </template>
          </Column>
          <Column
            field="mal_bedeli"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="background-color:yellow"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.buyil_mal_bedeli) }}
            </template>
            <template #footer>
              {{ formatPrice(siparis_kullanici_f_toplam) }}
            </template>
          </Column>
          <Column field="toplam" header="DDP" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.buyil_toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(siparis_kullanici_toplam) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6 count">
        <span class="count">Fark : {{ formatPrice(siparis_fark) }}</span> &#160;
        &#160; &#160;
        <span :class="siparis_fark_yuzde > 0 ? 'yesil' : 'red'">{{
          formatYuzde(siparis_fark_yuzde)
        }}</span>
      </div>
    </div>
    <div class="columns">
      <div class="columun" style="width: 340px; padding-right: 5px">
        <DataTable
          v-model:value="sevk_list"
          selectionMode="single"
          v-model:selection="select_sev_oncekiyil"
          :scrollable="true"
          scrollHeight="380px"
          :loading="loading"
          @row-select="sev_onceki_yil_sec($event)"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px">
                  {{ gecen_yil - 1 }} Sevkiyat Özeti</span
                >
              </div>
            </div>
          </template>
          <Column field="ay_adi" header="Ay" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.ay_adi }}
            </template>
          </Column>
          <Column
            field="oncekiyil_mal_bedeli"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:37%; background-color:yellow"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.oncekiyil_mal_bedeli) }}
            </template>
            <template #footer>
              {{ formatPrice(sevkiyat_oncekiyil_fob_toplam) }}
            </template>
          </Column>
          <Column
            field="oncekiyil_toplam"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:36%;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.oncekiyil_toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(sevkiyat_oncekiyil_toplami) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="columun" style="width: 340px; padding-right: 5px">
        <DataTable
          v-model:value="sevk_list"
          selectionMode="single"
          v-model:selection="select_sev_gecenyil"
          :scrollable="true"
          scrollHeight="380px"
          :loading="loading"
          @row-select="sev_gecen_yil_sec($event)"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px">
                  {{ gecen_yil }} Sevkiyat Özeti</span
                >
              </div>
            </div>
          </template>
          <Column field="ay_adi" header="Ay" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.ay_adi }}
            </template>
          </Column>
          <Column
            field="gecenyil_mal_bedeli"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:37%; background-color:yellow"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.gecenyil_mal_bedeli) }}
            </template>
            <template #footer>
              {{ formatPrice(sevkiyat_gecenyil_fob_toplam) }}
            </template>
          </Column>
          <Column
            field="gecenyil_toplam"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:36%;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.gecenyil_toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(sevkiyat_gecenyil_toplami) }}
            </template>
          </Column>
        </DataTable>
      </div>

      <div class="columun" style="width: 340px; padding-right: 5px">
        <DataTable
          selectionMode="single"
          v-model:value="sevk_list"
          v-model:selection="select_sev_buyil"
          :scrollable="true"
          scrollHeight="380px"
          :loading="loading"
          @row-select="sev_bu_yil_sec($event)"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px">
                  {{ bu_yil }} Sevkiyat Özeti</span
                >
              </div>
            </div>
          </template>
          <Column field="ay_adi" header="Ay" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.ay_adi }}
            </template>
          </Column>
          <Column
            field="buyil_mal_bedeli"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:26%; background-color:yellow"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.buyil_mal_bedeli) }}
            </template>
            <template #footer>
              {{ formatPrice(sevkiyat_buyil_fob_toplam) }}
            </template>
          </Column>
          <Column
            field="buyil_toplam"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:26%; "
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.buyil_toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(sevkiyat_buyil_toplami) }}
            </template>
          </Column>
          <Column
            field="fark"
            header="Fark (DDP)"
            bodyStyle="text-align:center"
            headerStyle="font-size:9px;width:26%;"
          >
            <template #body="slotProps">
              <div :class="slotProps.data.fark > 0 ? 'yesil' : 'red'">
                {{ formatYuzde(slotProps.data.fark) }}
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="columun" style="width: 340px; padding-right: 5px">
        <DataTable
          v-model:value="sevkiyat_kullanici_gecen"
          selectionMode="single"
          v-model:selection="kullanici_sev_gecen"
          :scrollable="true"
          scrollHeight="380px"
          :loading="loading"
          @row-select="sev_kullanici_gecen_sec($event)"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px">
                  {{ gecen_yil }} Satışçı Sevkiyat Özeti</span
                >
              </div>
            </div>
          </template>
          <Column field="ay_adi" header="Ay" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.ay_adi }}
            </template>
          </Column>
          <Column
            field="mal_bedeli"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:35%; background-color:yellow"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.gecenyil_mal_bedeli) }}
            </template>
            <template #footer>
              {{ formatPrice(sevkiyat_kullanici_gecen_f_toplam) }}
            </template>
          </Column>
          <Column
            field="toplam"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:35%;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.gecenyil_toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(sevkiyat_kullanici_gecen_toplam) }}
            </template>
          </Column>
        </DataTable>
      </div>

      <div class="columun" style="width: 340px">
        <DataTable
          v-model:value="sevkiyat_kullanici"
          selectionMode="single"
          v-model:selection="kullanici_sev"
          :scrollable="true"
          scrollHeight="380px"
          :loading="loading"
          @row-select="sev_kullanici_sec($event)"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px">
                  {{ bu_yil }} Satışçı Sevkiyat Özeti</span
                >
              </div>
            </div>
          </template>
          <Column field="ay_adi" header="Ay" bodyStyle="text-align:center">
            <template #body="slotProps">
              {{ slotProps.data.ay_adi }}
            </template>
          </Column>
          <Column
            field="mal_bedeli"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:35%; background-color:yellow"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.buyil_mal_bedeli) }}
            </template>
            <template #footer>
              {{ formatPrice(sevkiyat_kullanici_f_toplam) }}
            </template>
          </Column>

          <Column
            field="toplam"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:35%;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.buyil_toplam) }}
            </template>
            <template #footer>
              {{ formatPrice(sevkiyat_kullanici_toplam) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6 count">
        <span> Fark : {{ formatPrice(sevkiyat_fark) }}</span> &#160; &#160;
        &#160; &#160;
        <span :class="sevkiyat_fark_yuzde > 0 ? 'yesil' : 'red'">
          {{ formatYuzde(sevkiyat_fark_yuzde) }}</span
        >
      </div>
    </div>
    <div class=columns>
      <div class="column">
          <ceyreklikSatislar></ceyreklikSatislar>
      </div>
    </div>
    <Dialog
      v-model:visible="is_form"
      header="Sipariş Özeti Ayrıntı"
      position="top"
      :modal="true"
      maximizable
    >
      <section>
        <div class="container">
          <div class="columns">
            <div class="column is-12">
              <OzetAyrinti />
            </div>
          </div>
        </div>
      </section>
    </Dialog>
  </section>
</template>
<script>
import service from "../service/RaporService";
import OzetAyrinti from "../components/siparisozet/OzetAyrinti";
import { mapGetters } from "vuex";
import ceyreklikSatislar from "../components/raporlar/CeyreklikSatislar"
export default {
  components: {
    OzetAyrinti,
    ceyreklikSatislar
  },
  computed: {
    ...mapGetters([ "siparis_ozet_ayrinti"]),
  },
  data() {
    return {
      sevk_list: null,
      siparis_list: null,
      siparis_kullanici: null,
      siparis_kullanici_gecen: null,

      siparis_gecenyil_toplami: 0,
      siparis_gecenyil_f_toplami: 0,
      siparis_oncekiyil_toplami: 0,
      siparis_oncekiyil_f_toplami: 0,
      siparis_buyil_toplami: 0,
      siparis_buyil_f_toplami: 0,

      siparis_kullanici_toplam: 0,
      siparis_kullanici_f_toplam: 0,
      siparis_kullanici_gecen_toplam: 0,
      siparis_kullanici_gecen_f_toplam: 0,

      sevkiyat_kullanici_toplam: 0,
      sevkiyat_kullanici_f_toplam: 0,
      sevkiyat_kullanici_gecen_toplam: 0,
      sevkiyat_kullanici_gecen_f_toplam: 0,

      sevkiyat_kullanici: null,
      sevkiyat_kullanici_gecen: null,

      sevkiyat_gecenyil_toplami: 0,
      sevkiyat_gecenyil_fob_toplam: 0,
      sevkiyat_oncekiyil_toplami: 0,
      sevkiyat_oncekiyil_fob_toplam: 0,
      sevkiyat_buyil_toplami: 0,
      sevkiyat_buyil_fob_toplam: 0,

      select_sev_buyil: null,
      select_sev_gecenyil: null,
      select_sev_oncekiyil: null,
      select_sip_gecenyil: null,
      select_sip_oncekiyil: null,
      select_musteri: null,
      select_sip_buyil: null,

      kullanici_sip: null,
      kullanici_sip_gecen: null,
      kullanici_sev: null,
      kullanici_sev_gecen: null,

      siparis_fark: 0,
      sevkiyat_fark: 0,
      siparis_fark_yuzde: 0,
      sevkiyat_fark_yuzde: 0,

      loading: false,
      is_form: false,

      yil: null,
      gecen_yil: null,
      bu_yil: null,
    };
  },
  mounted() {},
  created() {
    var tarih = new Date();

    this.gecen_yil = tarih.getFullYear() - 1;
    this.bu_yil = tarih.getFullYear();
    this.$store.dispatch("loadingBeginAct");
    service.getSiparisOzetRapor().then((data) => {
          

          this.siparis_list = data.siparis_list;
          this.sevk_list = data.sevk_list;

          this.toplam_siparis(data.siparis_list);
          this.toplam_sevkiyat(data.sevk_list);

          this.sevkiyat_fark_yuzde =
              (this.sevkiyat_buyil_toplami / this.sevkiyat_gecenyil_toplami) * 100 -
              100;
          this.sevkiyat_fark =
              this.sevkiyat_buyil_toplami - this.sevkiyat_gecenyil_toplami;
          this.siparis_fark_yuzde =
              (this.siparis_buyil_toplami / this.siparis_gecenyil_toplami) * 100 -
              100;
          this.siparis_fark =
              this.siparis_buyil_toplami - this.siparis_gecenyil_toplami;
      }),
          service.getKullaniciSiparisOzetRapor().then((data) => {
              this.siparis_kullanici = data.siparis_bu_yil_list;

              this.siparis_kullanici_gecen = data.siparis_gecen_yil_list;
              this.sevkiyat_kullanici = data.sevkiyat_bu_yil_list;
              this.sevkiyat_kullanici_gecen = data.sevkiyat_gecen_yil_list;
              this.satisci_toplam_gecen_siparis_guncelle(data.siparis_gecen_yil_list);
              this.satisci_toplam_buyil_siparis_guncelle(data.siparis_bu_yil_list);
              this.satisci_toplam_gecen_sevkiyat_guncelle(
                  data.sevkiyat_gecen_yil_list
              );
              this.satisci_toplam_buyil_sevkiyat_guncelle(data.sevkiyat_bu_yil_list);
             this.$store.dispatch("loadingEndAct");


          });
      
    },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatYuzde(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "%" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    toplam_siparis(liste) {
      for (let key in liste) {
        const item = liste[key];

        this.siparis_gecenyil_toplami += item.gecenyil_toplam; //2021 in ddp toplamı
        this.siparis_gecenyil_f_toplami += item.gecenyil_mal_bedeli; //2021 in fob toplamı

        this.siparis_oncekiyil_toplami += item.oncekiyil_toplam; //2020 in ddp toplamı
        this.siparis_oncekiyil_f_toplami += item.oncekiyil_mal_bedeli; //2020 in fob toplamı

        this.siparis_buyil_toplami += item.buyil_toplam; //2022 in ddp toplamı
        this.siparis_buyil_f_toplami += item.buyil_mal_bedeli; //2022 in fob toplamı
      }
    },
    toplam_sevkiyat(liste) {
      for (let key in liste) {
        const item = liste[key];

        this.sevkiyat_gecenyil_toplami += item.gecenyil_toplam; //2021 in ddp toplamı
        this.sevkiyat_gecenyil_fob_toplam += item.gecenyil_mal_bedeli; //2021 in fob toplamı

        this.sevkiyat_oncekiyil_toplami += item.oncekiyil_toplam; //2020 in ddp toplamı
        this.sevkiyat_oncekiyil_fob_toplam += item.oncekiyil_mal_bedeli; //2020 in fob toplamı

        this.sevkiyat_buyil_toplami += item.buyil_toplam; //2022 in ddp toplamı
        this.sevkiyat_buyil_fob_toplam += item.buyil_mal_bedeli; //2022 in fob toplamı
      }
    },

    sev_onceki_yil_sec(event) {

      this.select_sev_oncekiyil = event.data;

      service
        .getSevkiyatOncekiYilAyrintiListesiApi(this.select_sev_oncekiyil.ay)
        .then((data) => {
          this.$store.dispatch("siparis_ozet_ayrinti_act", data);

          this.is_form = true;
        });
    },
    sev_bu_yil_sec(event) {

      this.select_sev_buyil = event.data;

      service
        .getSevkiyatBuYilAyrintiListesiApi(this.select_sev_buyil.ay)
        .then((data) => {
          this.$store.dispatch("siparis_ozet_ayrinti_act", data);

          this.is_form = true;
        });
    },
    sev_kullanici_sec(event) {

      this.kullanici_sev = event.data;

      service
        .getKullaniciSiparisOzetAyrinti(this.kullanici_sev.ay)
        .then((data) => {
          this.$store.dispatch(
            "siparis_ozet_ayrinti_act",
            data.sevkiyat_bu_yil
          );

          this.is_form = true;
        });
    },
    sev_kullanici_gecen_sec(event) {

      this.kullanici_sev_gecen = event.data;

      service
        .getKullaniciSiparisOzetAyrinti(this.kullanici_sev_gecen.ay)
        .then((data) => {
          this.$store.dispatch(
            "siparis_ozet_ayrinti_act",
            data.sevkiyat_gecen_yil
          );

          this.is_form = true;
        });
    },
    sip_kullanici_gecen_sec(event) {

      this.kullanici_sip_gecen = event.data;

      service
        .getKullaniciSiparisOzetAyrinti(this.kullanici_sip_gecen.ay)
        .then((data) => {
          this.$store.dispatch(
            "siparis_ozet_ayrinti_act",
            data.siparis_gecen_yil
          );

          this.is_form = true;
        });
    },
    sip_kullanici_sec(event) {

      this.kullanici_sip = event.data;

      service
        .getKullaniciSiparisOzetAyrinti(this.kullanici_sip.ay)
        .then((data) => {
          this.$store.dispatch("siparis_ozet_ayrinti_act", data.siparis_bu_yil);

          this.is_form = true;
        });
    },
    sev_gecen_yil_sec(event) {
      this.select_sev_gecenyil = event.data;
      service
        .getSevkiyatGecenYilAyrintiListesiApi(this.select_sev_gecenyil.ay)
        .then((data) => {
          this.$store.dispatch("siparis_ozet_ayrinti_act", data);
          this.is_form = true;
        });
    },
    sip_gecen_yil_sec(event) {
      this.select_sip_gecenyil = event.data;
      service
        .getSiparisGecenYilAyrintiListesiApi(this.select_sip_gecenyil.ay)
        .then((data) => {
          this.$store.dispatch("siparis_ozet_ayrinti_act", data);
          this.is_form = true;
        });
    },
    sip_onceki_yil_sec(event) {
      this.select_sip_oncekiyil = event.data;
      service
        .getSiparisOncekiYilAyrintiListesiApi(this.select_sip_oncekiyil.ay)
        .then((data) => {
          this.$store.dispatch("siparis_ozet_ayrinti_act", data);
          this.is_form = true;
        });
    },
    sip_bu_yil_sec(event) {
      this.select_sip_buyil = event.data;
      service
        .getSiaprisBuYilAyrintiListesiApi(this.select_sip_buyil.ay)
        .then((data) => {
          this.$store.dispatch("siparis_ozet_ayrinti_act", data);
          this.is_form = true;
        });
    },
    satisci_toplam_gecen_siparis_guncelle(liste) {
      for (let key in liste) {
        const item = liste[key];
        this.siparis_kullanici_gecen_toplam += item.gecenyil_toplam;
        this.siparis_kullanici_gecen_f_toplam += item.gecenyil_mal_bedeli;
      }
    },
    satisci_toplam_buyil_siparis_guncelle(liste) {
      for (let key in liste) {
        const item = liste[key];
        this.siparis_kullanici_toplam += item.buyil_toplam;
        this.siparis_kullanici_f_toplam += item.buyil_mal_bedeli;
      }
    },
    satisci_toplam_gecen_sevkiyat_guncelle(liste) {
      for (let key in liste) {
        const item = liste[key];
        this.sevkiyat_kullanici_gecen_toplam += item.gecenyil_toplam;
        this.sevkiyat_kullanici_gecen_f_toplam += item.gecenyil_mal_bedeli;
      }
    },
    satisci_toplam_buyil_sevkiyat_guncelle(liste) {
      for (let key in liste) {
        const item = liste[key];
        this.sevkiyat_kullanici_toplam += item.buyil_toplam;
        this.sevkiyat_kullanici_f_toplam += item.buyil_mal_bedeli;
      }
    },
  },
};
</script>

<style scoped>
.p-datatable {
  font-size: 10px;
}
.yesil {
  color: #00a86b;
  font-weight: bold;
}
.red {
  color: #e06666;
  font-weight: bold;
}
.count {
  text-align: center;
  font-weight: bold;
  text-decoration: underline;
}

.container {
  column-width: 10%;
  column-rule: 1px solid rgb(75, 70, 74);
}
</style>

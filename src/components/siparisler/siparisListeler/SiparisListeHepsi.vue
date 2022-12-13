<template>
  <section>
    <div class="p-grid">
      <div class="p-col-12 p-xl-12">
        <div class="p-card" style="height: 25%">
          <div class="p-grid">
            <div class="">
              <DataTable
                ref="siparisData"
                style="font-size: 60%"
                :value.sync="siparisler"
                class="p-datatable-responsive p-datatable-cars"
                :selection.sync="selectedSiparis"
                selectionMode="multiple"
                dataKey="id"
                @row-select="siparisSecim($event)"
                :paginator="hasPage"
                :rows="25"
                rowGroupMode="rowspan"
                :groupRowsBy="groups"
                :scrollable="true"
                scrollHeight="380px"
                :filters.sync="filters"
                :loading="loading"
                @filter="siparisFilterDegisim($event)"
              >
                <template #header>
                  <div class="columns is-multiline">
                    <div class="column is-6">
                      {{ baslik }}
                    </div>
                    <div class="column is-2">
                      <b-checkbox @input="gridGizlemeDegisim($event)"
                        >Detaysız
                      </b-checkbox>
                    </div>

                    <div class="column is-2">
                      <InputText
                        v-model="filters['global']"
                        placeholder="Genel Arama"
                      />
                    </div>
                  </div>
                </template>
                <Column
                  headerStyle="width: 3%"
                  bodyStyle="text-align: center; border-style: solid; border-width: 1px; border-color: black; border-top-color: red;"
                  field="sira"
                  header="S"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">S</span>
                    {{ slotProps.data.sira }}
                  </template>
                </Column>

                <Column
                  tag="1"
                  ref="ref_tarih"
                  field="tarih"
                  header="Tarih"
                  headerStyle="width: 13%"
                  :sortable="false"
                  bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">Tarih</span>
                    {{ slotProps.data.tarih }}
                  </template>
                  <template #filter>
                    <InputText
                      type="text"
                      v-model="filters['tarih']"
                      class="p-column-filter"
                      placeholder="Tarih"
                      @keyup="filterDegisim"
                      filterMatchMode="startsWith"
                    />
                  </template>
                </Column>

                <Column field="temsilci" header="T" headerStyle="width:8%">
                  <template #body="slotProps">
                    <img
                      class="dairesel"
                      :src="slotProps.data.logo"
                      width="50"
                      height="50"
                    />
                  </template>
                </Column>

                <Column field="operasyon" header="O" headerStyle="width:8%">
                  <template #body="slotProps">
                    <img
                      class="dairesel"
                      :src="slotProps.data.operasyonlogo"
                      width="50"
                      height="50"
                    />
                  </template>
                </Column>

                <Column
                  :key="1"
                  field="musteriAdi"
                  header="Kime"
                  headerStyle="width: 15%"
                  bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">Kime</span>
                    {{ slotProps.data.musteriAdi }}
                  </template>
                  <template #filter>
                    <InputText
                      type="text"
                      v-model="filters['musteriAdi']"
                      class="p-column-filter"
                      placeholder="Müşteri"
                      filterMatchMode="startsWith"
                      @keyup="filterDegisim"
                    />
                  </template>
                </Column>
                <Column
                  field="link"
                  :header="siparisTur == 'sevk' ? 'CI' : 'PI'"
                  headerStyle="width: 8%"
                  bodyStyle="text-align:center"
                >
                  <template #body="slotProps">
                    <Button
                      type="button"
                      :disabled="
                        siparisTur == 'üretim'
                          ? slotProps.data.evrak != 0
                            ? false
                            : true
                          : slotProps.data.evrakc != 0
                          ? false
                          : true
                      "
                      @click="proformaDowload(slotProps.data.siparisNo)"
                      icon="fas fa-download"
                      class=""
                      v-greenButton:mousemove
                      style="margin-right: 0.5em"
                    ></Button>
                  </template>
                </Column>

                <Column
                  field="siparisNo"
                  header="Po"
                  headerStyle="width: 11%"
                  bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;"
                >
                  <template #body="slotProps">
                    <span class="p-column-title"> Po</span>

                    <div
                      v-color="slotProps.data.faturaDurumRenk"
                      :style="{
                        color: slotProps.data.faturaDurumRenk != 'transparent1',
                      }"
                    >
                      {{ slotProps.data.siparisNo }}
                    </div>
                  </template>

                  <template #filter>
                    <InputText
                      type="text"
                      v-model="filters['siparisNo']"
                      class="p-column-filter"
                      placeholder="Po"
                      @keyup="filterDegisim"
                    />
                  </template>
                </Column>
                <Column
                  field="urunAdi"
                  header="Ürün Adı"
                  headerStyle="width: 13%"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">Ürün Adı</span>
                    {{ slotProps.data.urunAdi }}
                  </template>
                  <template #filter>
                    <InputText
                      type="text"
                      v-model="filters['urunAdi']"
                      class="p-column-filter"
                      placeholder="Ürün"
                    />
                  </template>
                </Column>
                <Column
                  field="icerik"
                  header="İçerik"
                  headerStyle="width: 25%"
                  bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;"
                >
                  <template #body="slotProps">
                    <div>
                      <span class="p-column-title">İçerik</span>
                      {{ slotProps.data.icerik }}
                    </div>
                  </template>
                </Column>
                <Column
                  field="kenar"
                  header="K"
                  headerStyle="width: 7%"
                  bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;text-align: left;font-size: 13px;"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">K</span>
                    {{ slotProps.data.kenar }}
                  </template>
                  <template #filter>
                    <InputText
                      type="text"
                      v-model="filters['kenar']"
                      class="p-column-filter"
                      placeholder="Kenar"
                      @keyup="filterDegisim"
                    />
                  </template>
                </Column>
                <Column
                  field="en"
                  header="E"
                  headerStyle="width: 7%"
                  bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;text-align: left;font-size: 13px;"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">E</span>
                    {{ slotProps.data.en }}
                  </template>
                  <template #filter>
                    <InputText
                      type="text"
                      v-model="filters['en']"
                      class="p-column-filter"
                      placeholder="En"
                      @keyup="filterDegisim"
                    />
                  </template>
                </Column>
                <Column
                  field="boy"
                  header="B"
                  headerStyle="width: 8%"
                  bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;text-align: left;font-size: 13px;"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">B</span>
                    {{ slotProps.data.boy }}
                  </template>
                  <template #filter>
                    <InputText
                      type="text"
                      v-model="filters['boy']"
                      class="p-column-filter"
                      placeholder="Boy"
                      @keyup="filterDegisim"
                    />
                  </template>
                </Column>
                <Column
                  field="tedarikciAdi"
                  headerStyle="width: 11%"
                  header="Kimden"
                  bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">Kimden</span>
                    <div
                      v-color="slotProps.data.urunDurumRenk"
                      :style="{
                        color:
                          slotProps.data.urunDurumRenk != 'transparent' &&
                          siparisTur == 'üretim'
                            ? 'white'
                            : 'black',
                      }"
                    >
                      {{ slotProps.data.tedarikciAdi }}
                    </div>
                  </template>
                  <template #filter>
                    <InputText
                      type="text"
                      v-model="filters['tedarikciAdi']"
                      class="p-column-filter"
                    />
                  </template>
                </Column>

                <!-- <Column   field="iscilik" header="İşçilik" headerStyle="width: 50px;" bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;">
                    <template #body="slotProps" >
                         <span class="p-column-title">işçilik</span>
                        {{slotProps.data.iscilik}}
                    </template>
                </Column>-->

                <Column
                  field="kasa"
                  header="Kasa"
                  headerStyle="width: 5%"
                  bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">Kasa</span>
                    {{ slotProps.data.kasa }}
                  </template>
                  <template #footer>
                    {{ kasaToplami }}
                  </template>
                </Column>
                <Column
                  field="siparisMiktari"
                  header="Miktar"
                  headerStyle="width: 8%"
                  bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">Miktar</span>
                    {{ slotProps.data.siparisMiktari }}
                  </template>
                  <template #footer>
                    {{ formatDecimal(siparisToplami) }}
                  </template>
                  <template #filter>
                    <InputText
                      type="text"
                      v-model="filters['siparisMiktari']"
                      class="p-column-filter"
                    />
                  </template>
                </Column>

                <Column
                  field="birim"
                  header="B"
                  headerStyle="width: 5%"
                  bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">B</span>
                    {{ slotProps.data.birim }}
                  </template>
                  <template #filter>
                    <InputText
                      type="text"
                      v-model="filters['birim']"
                      class="p-column-filter"
                    />
                  </template>
                </Column>
                <Column
                  field="uretimMiktari"
                  header="Üretim"
                  headerStyle="width: 9%"
                  bodyStyle="text-align:center;border-style: solid; border-width: 1px; border-color: black; border-top-color: red;"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">Üretim</span>
                    <div
                      :style="{
                        background: slotProps.data.urunDurumRenk,
                        color:
                          slotProps.data.urunDurumRenk != 'transparent' &&
                          siparisTur == 'üretim'
                            ? 'white'
                            : 'black',
                      }"
                    >
                      {{ slotProps.data.uretimMiktari }}
                    </div>
                  </template>
                  <template #footer>
                    {{ formatDecimal(uretimToplami) }}
                  </template>
                </Column>
                <Column
                  field="ton"
                  header="Ton"
                  headerStyle="width: 8%"
                  bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">Ton</span>
                    {{ slotProps.data.ton }}
                  </template>
                  <template #footer>
                    {{ tonToplami }}
                  </template>
                </Column>
                <Column
                  field="birimFiyat"
                  header="Satis"
                  headerStyle="width: 7%"
                  bodyStyle="text-align:center;"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">Satış</span>
                    {{ formatPrice(slotProps.data.birimFiyat) }}
                  </template>
                </Column>

                <!-- <Column   field="sure" header="Süre" headerStyle="width: 50px;" bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;text-align: center;">
                    <template #body="slotProps"  >
                         <span class="p-column-title">Süre</span>
                        {{slotProps.data.sure}}
                    </template>
                </Column>-->

                <Column
                  field="satisToplam"
                  header="Toplam"
                  headerStyle="width: 10%"
                  bodyStyle="border-style: solid; border-width: 1px; border-color: black; border-top-color: red;text-align: center;"
                >
                  <template #body="slotProps">
                    <span class="p-column-title">Toplam</span>
                    {{ formatPrice(slotProps.data.satisToplam) }}
                  </template>
                  <template #footer>
                    {{ formatPrice(satisToplami) }}
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedSiparis: null,
      filters: {},
      groups: [
        "sira",
        "siparisNo",
        "musteriAdi",
        "tarih",
        "temsilci",
        "link",
        "operasyon",
      ],
    };
  },
  props: [
    "siparisler",
    "loading",
    "siparisTur",
    "hasPage",
    "baslik",
    "arkaPlanRengi",
  ],
  created() {
    this.satisToplami = this.pr_satistoplami;
  },
  mounted() {},
  computed: {
    ...mapGetters([
      "kasaToplami",
      "siparisToplami",
      "uretimToplami",
      "satisToplami",
      "tonToplami",
    ]),
  },
  methods: {
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    siparisSecim(event) {
      //sipariş seçildiğinde
      this.selectedSiparis = event.data;

      this.selectSiparis = true;
      if (this.selectedSiparis) {
        this.selectSiparis = false;
        this.emitter.emit("hepsiSiparisSecim", event.data);
      }
    },
    siparisFilterDegisim(event) {
      this.toplamGuncelle(event.filterValue);
    },
    toplamGuncelle(liste) {
      let kasaToplami = 0;
      let siparisToplami = 0;
      let uretimToplami = 0;
      let satisToplami = 0;
      let tonToplami = 0;
      for (let key in liste) {
        const data = liste[key];

        this.kasaToplami += data.kasa;
        this.siparisToplami += data.siparisMiktari;
        this.uretimToplami += data.uretimMiktari;
        this.satisToplami += data.satisToplam;
        this.tonToplami += data.ton;
      }

      const data = {
        kasaToplami: kasaToplami,
        siparisToplami: siparisToplami,
        uretimToplami: uretimToplami,
        satisToplami: satisToplami,
        tonToplami: tonToplami,
      };

      this.$store.dispatch("loadToplamGuncelleAct", data);
    },

    gridGizlemeDegisim(event) {
      this.emitter.emit("siparisHepsiEmit", event);
    },
    filterDegisim() {
      this.toplamGuncelle(this.$refs.siparisData.processedData);
      this.servisMetotTest(this.$refs.siparisData.processedData);
    },
  },
};
</script>
<style scoped>
.genel {
  border: 1px;
  border-style: solid;
  border-color: blue;
  width: 100%;
}
.rowBorder {
  border: 1px;
  border: solid;
  border-top-color: red;
  border-color: black;
}
.ui-datatable column {
  border: 1px;
  border-style: solid;
  border-color: blue;
}
.p-column-filter {
  margin-top: 1em;
}

.p-datatable-header {
  border: 0 none;

  text-align: left;
  font-size: 20px;
}

.dairesel {
  border-radius: 150px;

  -webkit-border-radius: 150px;

  -moz-border-radius: 150px;
}
.p-paginator {
  border: 0 none;
  padding: 1em;
}

.p-datatable-thead > tr > th {
  border: 0 none;
  text-align: left;
}

.p-column-title {
  font-size: 16px;
}

.p-datatable-tbody > tr > td {
  border: 0 none;
}
span {
  margin-top: 0.125em;
}
.ciktiMenu Button {
  margin-left: 5px;
}
.p-datatable {
  font-size: 11px;
}

.custom-box {
  width: 100%;
  transition: 0.4s;
  box-shadow: 3px 3px 24px 5px rgba(0, 0, 0, 0.22),
    -3px -3px 24px 5px rgba(0, 0, 0, 0.18);
  margin-right: 20px;
}
.siparis-form {
  height: 1750px;
}
.tarih_hide {
  display: none;
}
.tarih_show {
  display: inline;
}
</style>

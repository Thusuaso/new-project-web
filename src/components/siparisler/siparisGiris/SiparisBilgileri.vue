<template>
  <div class="columns">
    <div class="column is-6">
      <urun-kart-bilgi :dis_urun_giris="dis_urun_giris" />
      <Card>
        <template #content>
          <div class="columns is-gapless">
            <div class="column">
              <AutoComplete
                :disabled="dis_urun_giris"
                @click="sec"
                v-model="tedarikci"
                :suggestions="filterTedarikciList"
                @complete="aramaTedarikci($event)"
                field="firmaAdi"
                placeholder="Tedarikçi"
                :dropdown="true"
                :class="{ 'p-invalid': v$.tedarikci.$invalid && submitted }"
              >
              </AutoComplete>
                          </div>
            <div class="column">
              
              <MoneyInput @money_input_text_change="siparis.alisFiyati = $event" :text_value="siparis.alisFiyati"
                :disAktif="dis_urun_giris" label="Alış Fiyatı ($)" v-model="alis_Fiyati" />
            </div>
          </div>
          <div class="columns is-gapless">
            <div class="column">
              
              <MoneyInput @money_input_text_change="siparis.alisFiyati_TL = $event" :text_value="siparis.alisFiyati_TL"
                :disAktif="dis_urun_giris" :label="'Alış Fiyatı (TL)'" />
            </div>
            <div class="column">
             
              <MoneyInput @money_input_text_change="siparis.satisFiyati = $event" :text_value="siparis.satisFiyati"
                :disAktif="dis_urun_giris" :label="'Satış Fiyati ($)'" />
            </div>
          </div>
          <div class="columns" v-if="!yeniSiparis">
            <div class="column is-12">
              <Button
                label="Özel İşçilik"
                style="width: 100%"
                class="p-button-success p-button"
                :disabled="dis_ozelIscilik"
                @click="ozelIscilikFormAc"
              />
              <Dialog
                v-model:visible="dialogIscilik"
                maximizable
                position="top"
                header="Sipariş Ekstra Gider Girişi"
                :modal="true"
                :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}"
              >

                  <iscilik
                    :siparisNo="siparisNo"
                    :urunKartId="siparis.urunKartId"
                  />
              </Dialog>
            </div>
          </div>
        </template>
      </Card>
      <Card>
        <template #content>
          <div class="columns is-gapless">
            <div class="column is-4">
              <AutoComplete
                style="width: 120px"
                :disabled="dis_urun_giris"
                v-model="urunBirim"
                :suggestions="filterUrunBirimList"
                @complete="aramaBirim($event)"
                optionLabel="birimAdi"
                :dropdown="true"
                :class="{ 'p-invalid': v$.urunBirim.$invalid && submitted }"
              />
            </div>
            <div class="column is-2">
              <span class="p-float-label">
                <InputText
                  style="width: 60px"
                  class="p-inputtext-sm"
                  :disabled="dis_urun_giris"
                  @input="miktar_input_event(siparis.miktar)"
                  id="miktar"
                  v-model="siparis.miktar"
                  :class="{
                    'p-invalid': v$.siparis.miktar.$invalid && submitted,
                  }"
                />
                <label for="miktar">M</label>
              </span>
            </div>
            <div class="column is-2">
              <span class="p-float-label">
                <InputText
                  style="width: 60px"
                  class="p-inputtext-sm"
                  :disabled="dis_urun_giris"
                  id="kasaAdet"
                  v-model="siparis.kasaAdet"
                  :class="{
                    'p-invalid': v$.siparis.kasaAdet.$invalid && submitted,
                  }"
                />
                <label for="kasaAdet">Kasa</label>
              </span>
            </div>
            <div class="column is-2">
              <span class="p-float-label">
                <InputText
                  style="width: 60px"
                  class="p-inputtext-sm"
                  :disabled="dis_urun_giris"
                  id="siraNo"
                  v-model="siparis.siraNo"
                  :class="{
                    'p-invalid': v$.siparis.siraNo.$invalid && submitted,
                  }"
                />
                <label for="siraNo">Sıra</label>
              </span>
            </div>
            <div class="column is-2">
              <span class="p-float-label">
                <InputText
                  style="width: 60px"
                  class="p-inputtext-sm"
                  :disabled="dis_urun_giris"
                  id="ozelMiktar"
                  @input="ömiktar_input_event($event)"
                  v-model="siparis.ozelMiktar"
                  :class="{
                    'p-invalid': v$.siparis.ozelMiktar.$invalid && submitted,
                  }"
                />
                <label for="ozelMiktar">Ö.M2</label>
              </span>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <span class="p-float-label">
                <InputText
                  class="p-inputtext-sm"
                  style="width: 60px"
                  :disabled="dis_urun_giris"
                  id="ton"
                  @input="tmiktar_input_event($event)"
                  v-model="siparis.ton"
                  :class="{ 'p-invalid': v$.siparis.ton.$invalid && submitted }"
                />
                <label for="ton">Ton</label>
              </span>
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div class="column is-6">
      <div class="columns">
        <div class="column is-6">
          <Card>
            <template #content>
              <span class="p-float-label">
                <Textarea
                  :disabled="dis_urun_giris"
                  id="musteriAciklama"
                  v-model="siparis.musteriAciklama"
                  rows="7"
                  cols="25"
                  :class="{
                    'p-invalid':
                      v$.siparis.musteriAciklama.$invalid && submitted,
                  }"
                />
                <label for="musteriAciklama">En-Açıklama</label>
              </span>
            </template>
          </Card>
        </div>
        <div class="column is-6">
          <Card>
            <template #content>
              <span class="p-float-label">
                <Textarea
                  :disabled="dis_urun_giris"
                  id="uretimAciklama"
                  v-model="siparis.uretimAciklama"
                  rows="7"
                  cols="25"
                  :class="{
                    'p-invalid':
                      v$.siparis.uretimAciklama.$invalid && submitted,
                  }"
                />
                <label for="uretimAciklama">Tr-Açıklama</label>
              </span>
            </template>
          </Card>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <Card style="height: 213px"> </Card>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <Card>
            <template #content>
              <div class="columns">
                <div class="column">
                  <Button
                    :disabled="dis_yeni"
                    @click="btn_yeni_click"
                    class="p-button p-button-primary mr-2 mb-2"
                    label="Yeni"
                    icon="pi pi-file-o"
                    iconPos="left"
                    id="buttons"
                  />
                </div>
                <div class="column">
                  <Button
                    :disabled="dis_iptal"
                    @click="btn_iptal_click"
                    label="İptal"
                    class="p-button-secondary"
                  />
                </div>
                <div class="column">
                  <Button
                    :disabled="dis_ekle"
                    @click="btn_ekle_click"
                    label="Ekle"
                    class="p-button-info"
                  />
                </div>
                <div class="column">
                  <Button
                    :disabled="dis_degistir"
                    @click="btn_degistir_click"
                    label="Değiştir"
                    class="p-button-warning"
                  />
                </div>
                <div class="column">
                  <Button
                    :disabled="dis_sil"
                    @click="btn_sil_click"
                    id="buttons"
                    label="Sil"
                    class="p-button-danger"
                  />
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <DataTable
        class="p-datatable-responsive"
        :value="siparisUrunler"
        v-model:selection="selectUrun"
        selectionMode="multiple"
        @row-select="siparisUrunSec"
        dataKey="siraNo"
      >
        <Column
          field="siraNo"
          header="S"
          bodyStyle="text-align:left"
        >
          <template #body="slotProps">
            {{ slotProps.data.siraNo }}
          </template>
        </Column>
        <Column field="tedarikciAdi" header="Kimden">
          <template #body="slotProps">
            {{ slotProps.data.tedarikciAdi }}
          </template>
        </Column>
        <Column field="iscilik" header="İşçilik">
          <template #body="slotProps">
            {{ slotProps.data.iscilik }}
          </template>
        </Column>
        <Column field="urunAdi" header="Ürün Adı" headerStyle="width:120%">
          <template #body="slotProps">
            {{ slotProps.data.urunAdi }}
          </template>
        </Column>
        <Column
          field="en"
          header="E"
          headerStyle="width:85%;"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ slotProps.data.en }}
          </template>
        </Column>
        <Column
          field="boy"
          header="B"
          headerStyle="width:85%;"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ slotProps.data.boy }}
          </template>
        </Column>
        <Column
          field="kenar"
          header="K"
          headerStyle="width:80%;"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ slotProps.data.kenar }}
          </template>
        </Column>
        <Column field="yuzeyIslem" header="İşlem" headerStyle="width:190%">
          <template #body="slotProps">
            {{ slotProps.data.yuzeyIslem }}
          </template>
        </Column>
        <Column
          field="m2"
          header="M2"
          headerStyle="width:80%;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <div style="text-align: center">{{ slotProps.data.m2 }}</div>
          </template>
          <template #footer>
            <div>{{ formatDecimal(toplam_m2) }}</div>
          </template>
        </Column>
        <Column
          field="adet"
          header="Adet"
          headerStyle="width:80%;"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.adet) }}
          </template>
          <template #footer>
            <div>{{ formatDecimal(toplam_adet) }}</div>
          </template>
        </Column>
        <Column
          field="mt"
          header="Mt"
          headerStyle="width:80%;"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.mt) }}
          </template>
          <template #footer>
            <div>{{ formatDecimal(toplam_mt) }}</div>
          </template>
        </Column>
        <Column
          field="ton"
          header="Ton"
          headerStyle="width:80%;"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.ton) }}
          </template>
          <template #footer>
            <div>{{ formatDecimal(toplam_ton) }}</div>
          </template>
        </Column>
        <Column
          field="kasaAdet"
          header="Kasa"
          headerStyle="width:80%;"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ slotProps.data.kasaAdet }}
          </template>
          <template #footer>
            <div>{{ formatDecimal(toplam_kasa) }}</div>
          </template>
        </Column>
        <Column
          field="satisToplam"
          header="Tutar"
          headerStyle="width:110%"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.satisToplam) }}
          </template>
          <template #footer>
            <div>{{ formatPrice(toplam_tutar) }}</div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import UrunService from "../../../service/UrunService";
import store from "@/store";
import UrunKartBilgi from "./UrunKartBilgi";
import Iscilik from "./Iscilik";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import socket from "../../../service/SocketService";
import MoneyInput from "@/components/shared/moneyInput2"
import tedarikciService from "../../../service/TedarikciService";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      tedarikci: { required },
      urunBirim: { required },

      siparis: {
        alisFiyati: { required },
        satisFiyati: { required },
        miktar: { required },
        kasaAdet: { required },
        siraNo: { required },
        ozelMiktar: { required },
        ton: { required },
        musteriAciklama: { required },
        uretimAciklama: { required },
      },
    };
  },
  computed: {
    ...mapGetters(["tedarikciList", "isNewClicked"]),
  },
  components: {
    urunKartBilgi: UrunKartBilgi,
    //inputCurrency : CurrencyInput,
    iscilik: Iscilik,
    MoneyInput
  },
  methods: {
    is_satis(event) {
      this.siparis.satisFiyati = event.value
      this.satisFiyati = this.siparis.satisFiyati.replace('.',',')
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    sec() {},
    miktar_input_event(event) {
      



      if (event) {
        this.siparis.miktar = event.toString();
        this.siparis.miktar = this.siparis.miktar.replace(",", ".");
      }
      if (this.isNewClicked) {
        this.siparis.ozelMiktar = this.siparis.miktar;

        if (this.urunBirim.id == 1) {
          this.siparis.ozelMiktar = this.siparis.miktar;
          this.urunKartBilgisi.kenar = this.urunKartBilgisi.kenar.replace(
            ",",
            "."
          );
          if (
            this.urunKartBilgisi.en == "VAR" ||
            this.urunKartBilgisi.en == "Various"
          ) {
            this.siparis.ozelMiktar = 0;
            this.siparis.ton = 0;
          } else {
            this.siparis.ton =
              parseFloat(this.siparis.miktar) *
              parseFloat(this.urunKartBilgisi.kenar) *
              10 *
              this.stoneKatsayisi(this.urunKartBilgisi.kategoriAdi) *
              0.001;
          }
        } else if (this.urunBirim.id == 2) {
          if (this.urunKartBilgisi.en == "ANT") {
            this.siparis.ozelMiktar =
              parseFloat(this.siparis.miktar) * 0.1239102;
            this.urunKartBilgisi.kenar = this.urunKartBilgisi.kenar.replace(
              ",",
              "."
            );
            this.siparis.ton =
              parseFloat(this.siparis.ozelMiktar) *
              this.urunKartBilgisi.kenar *
              10 *
              this.stoneKatsayisi(this.urunKartBilgisi.kategoriAdi) *
              0.001;
          } else if (
            this.urunKartBilgisi.en == "VAR" ||
            this.urunKartBilgisi.en == "Various"
          ) {
            this.siparis.ozelMiktar = 0;
            this.siparis.ton = 0;
          } else {
            this.urunKartBilgisi.en = this.urunKartBilgisi.en.replace(",", ".");
            this.urunKartBilgisi.boy = this.urunKartBilgisi.boy.replace(
              ",",
              "."
            );

            this.siparis.ozelMiktar =
              (parseFloat(this.siparis.miktar) *
                parseFloat(this.urunKartBilgisi.en) *
                parseFloat(this.urunKartBilgisi.boy)) /
              10000;
            this.siparis.ton =
              parseFloat(this.siparis.ozelMiktar) *
              parseFloat(this.urunKartBilgisi.kenar) *
              10 *
              this.stoneKatsayisi(this.urunKartBilgisi.kategoriAdi) *
              0.001;
          }
        } else if (this.urunBirim.id == 3) {
          if (this.urunKartBilgisi.en == "ANT") {
            this.siparis.ozelMiktar = 0;
            this.urunKartBilgisi.kenar = this.urunKartBilgisi.kenar.replace(
              ",",
              "."
            );
            this.siparis.ton = 0;
          } else if (
            this.urunKartBilgisi.en == "VAR" ||
            this.urunKartBilgisi.en == "Various"
          ) {
            this.siparis.ozelMiktar = 0;
            this.siparis.ton = 0;
          } else {
            this.urunKartBilgisi.en = this.urunKartBilgisi.en.replace(",", ".");
            this.urunKartBilgisi.boy = this.urunKartBilgisi.boy.replace(
              ",",
              "."
            );

            this.siparis.ozelMiktar =
              (parseFloat(this.siparis.miktar) *
                parseFloat(this.urunKartBilgisi.en)) /
              100;
            this.siparis.ton =
              parseFloat(this.siparis.ozelMiktar) *
              parseFloat(this.urunKartBilgisi.kenar) *
              10 *
              this.stoneKatsayisi(this.urunKartBilgisi.kategoriAdi) *
              0.001;
          }
        }
      } else {

        this.siparis.ozelMiktar = this.siparis.miktar;

        this.kategoriAdi = this.siparis.musteriAciklama.split("-")[0].trim();
        if (this.urunBirim.birimAdi == "M2") {
          this.siparis.ozelMiktar = this.siparis.miktar;
          if (this.siparis.kenar == "") {
            this.urunKartBilgisi.kenar = this.urunKartBilgisi.kenar.replace(
              ",",
              "."
            );
          } else {
            this.siparis.kenar = this.siparis.kenar.replace(",", ".");
          }
          if (this.siparis.en == "VAR" || this.siparis.en == "Various") {
            this.siparis.ozelMiktar = 0;
            this.siparis.ton = 0;
          } else {
            if (this.urunKartBilgisi != null) {
              this.siparis.ton =
                parseFloat(this.siparis.miktar) *
                parseFloat(this.urunKartBilgisi.kenar) *
                10 *
                this.stoneKatsayisi(this.urunKartBilgisi.kategoriAdi) *
                0.001;
            } else {
              this.siparis.ton =
                parseFloat(this.siparis.miktar) *
                parseFloat(this.siparis.kenar) *
                10 *
                this.stoneKatsayisi(this.kategoriAdi) *
                0.001;
            }
          }
        } else if (this.urunBirim.birimAdi == "Adet") {
          if (this.siparis.en != "") {
            if (this.siparis.en == "ANT") {
              this.siparis.ozelMiktar =
                parseFloat(this.siparis.miktar) * 0.1239102;
              if (this.siparis.kenar != "") {
                this.siparis.kenar = this.siparis.kenar.replace(",", ".");
              } else {
                this.urunKartBilgisi.kenar = this.urunKartBilgisi.kenar.replace(
                  ",",
                  "."
                );
              }

              this.siparis.ton =
                parseFloat(this.siparis.ozelMiktar) *
                parseFloat(this.siparis.kenar) *
                10 *
                this.stoneKatsayisi(this.kategoriAdi) *
                0.001;
            } else if (this.siparis.en == "VAR") {
              this.siparis.ozelMiktar = 0;
              this.siparis.ton = 0;
            } else {
              this.siparis.en = this.siparis.en.replace(",", ".");
              this.siparis.boy = this.siparis.boy.replace(",", ".");
              this.siparis.kenar = this.siparis.kenar.replace(",", ".");
              this.siparis.ozelMiktar =
                (parseFloat(this.siparis.miktar) *
                  parseFloat(this.siparis.en) *
                  parseFloat(this.siparis.boy)) /
                10000;

              this.siparis.ton =
                parseFloat(this.siparis.ozelMiktar) *
                parseFloat(this.siparis.kenar) *
                10 *
                this.stoneKatsayisi(this.kategoriAdi) *
                0.001;
            }
          } else {
            if (this.urunKartBilgisi.en == "ANT") {
              this.siparis.ozelMiktar =
                parseFloat(this.siparis.miktar) * 0.1239102;

              this.urunKartBilgisi.kenar = this.urunKartBilgisi.kenar.replace(
                ",",
                "."
              );

              this.siparis.ton =
                parseFloat(this.siparis.ozelMiktar) *
                parseFloat(this.urunKartBilgisi.kenar) *
                10 *
                this.stoneKatsayisi(this.kategoriAdi) *
                0.001;
            } else if (this.urunKartBilgisi.en == "VAR") {
              this.siparis.ozelMiktar = 0;
              this.siparis.ton = 0;
            } else {
              this.urunKartBilgisi.en = this.urunKartBilgisi.en.replace(
                ",",
                "."
              );
              this.urunKartBilgisi.boy = this.urunKartBilgisi.boy.replace(
                ",",
                "."
              );
              this.urunKartBilgisi.kenar = this.urunKartBilgisi.kenar.replace(
                ",",
                "."
              );
              this.siparis.ozelMiktar =
                (parseFloat(this.siparis.miktar) *
                  parseFloat(this.urunKartBilgisi.en) *
                  parseFloat(this.urunKartBilgisi.boy)) /
                10000;

              this.siparis.ton =
                parseFloat(this.siparis.ozelMiktar) *
                parseFloat(this.urunKartBilgisi.kenar) *
                10 *
                this.stoneKatsayisi(this.urunKartBilgisi.kategoriAdi) *
                0.001;
            }
          }
        } else if (this.urunBirim.birimAdi == "Mt") {
          if (this.siparis.en != "") {
            if (this.siparis.en == "ANT") {
              this.siparis.ozelMiktar = 0;
              if (this.siparis.kenar != "") {
                this.siparis.kenar = this.siparis.kenar.replace(",", ".");
              } else {
                this.urunKartBilgisi.kenar = this.urunKartBilgisi.kenar.replace(
                  ",",
                  "."
                );
              }

              this.siparis.ton = 0;
            } else if (this.siparis.en == "VAR") {
              this.siparis.ozelMiktar = 0;
              this.siparis.ton = 0;
            } else {
              this.siparis.en = this.siparis.en.replace(",", ".");
              this.siparis.boy = this.siparis.boy.replace(",", ".");
              this.siparis.kenar = this.siparis.kenar.replace(",", ".");
              this.siparis.ozelMiktar =
                (parseFloat(this.siparis.miktar) *
                  parseFloat(this.siparis.en)) /
                100;

              this.siparis.ton =
                parseFloat(this.siparis.ozelMiktar) *
                parseFloat(this.siparis.kenar) *
                10 *
                this.stoneKatsayisi(this.kategoriAdi) *
                0.001;
            }
          } else {
            if (this.urunKartBilgisi.en == "ANT") {
              this.siparis.ozelMiktar = 0;

              this.urunKartBilgisi.kenar = this.urunKartBilgisi.kenar.replace(
                ",",
                "."
              );

              this.siparis.ton = 0;
            } else if (this.urunKartBilgisi.en == "VAR") {
              this.siparis.ozelMiktar = 0;
              this.siparis.ton = 0;
            } else {
              this.urunKartBilgisi.en = this.urunKartBilgisi.en.replace(
                ",",
                "."
              );
              this.urunKartBilgisi.boy = this.urunKartBilgisi.boy.replace(
                ",",
                "."
              );
              this.urunKartBilgisi.kenar = this.urunKartBilgisi.kenar.replace(
                ",",
                "."
              );
              this.siparis.ozelMiktar =
                (parseFloat(this.siparis.miktar) *
                  parseFloat(this.urunKartBilgisi.en)) /
                100;

              this.siparis.ton =
                parseFloat(this.siparis.ozelMiktar) *
                parseFloat(this.urunKartBilgisi.kenar) *
                10 *
                this.stoneKatsayisi(this.urunKartBilgisi.kategoriAdi) *
                0.001;
            }
          }
        }
      }
    },

    stoneKatsayisi(value) {
      if (
        value == "Travertine Tiles" ||
        value == "Travertine Risers" ||
        value == "Travertine Skirting" ||
        value == "Travertine Slabs" ||
        value == "Travertine Treads" ||
        value == "Travertine Sink" ||
        value == "Travertine Mosaic" ||
        value == "Travertine Coping" ||
        value == "Travertine Baseboard" ||
        value == "Travertine Moulding" ||
        value == "Travertine Stairs" ||
        value == "Travertine Block" ||
        value == "Travertine Facade" ||
        value == "Travertine Landing" ||
        value == "Travertine Copings" ||
        value == "Travertine Pavers" ||
        value == "Travertine Table Tops"
      ) {
        return 2.4;
      } else if (
        value == "Limestone Tile" ||
        value == "Limestone Tiles" ||
        value == "Limestone Mosaic" ||
        value == "Limestone Risers" ||
        value == "Limestone Stairs" ||
        value == "Limestone Coping" ||
        value == "Limestone Slabs" ||
        value == "Limestone Copings"
      ) {
        return 2.65;
      } else {
        return 2.8;
      }
    },
    ömiktar_input_event(event) {
      if (event) this.siparis.ozelMiktar = event.replace(",", ".");
    },
    tmiktar_input_event(event) {
      if (event) this.siparis.ton = event.replace(",", ".");
    },
    tmiktar_topla() {},
    aramaTedarikci(event) {
      setTimeout(() => {
        let result;
        if (event.query.length === 0) {
          result = [...this.tedarikciList];
        } else {
          result = this.tedarikciList.filter((ted) => {
            return ted.firmaAdi
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }

        this.filterTedarikciList = result;
      }, 250);
    },
    aramaBirim(event) {
      let result;
      if (event.query.length === 0) {
        result = [...this.urunBirimList];
      } else {
        result = this.urunBirimList.filter((ted) => {
          return ted.birimAdi
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }
      this.filterUrunBirimList = result;
    },
    idOlustur() {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (var i = 0; i < 8; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    indexBul(id, liste) {
      let index = -1;
      if (!liste != null) {
        for (let i = 0; i < liste.length; i++) {
          if (liste[i].id === id) {
            index = i;
            break;
          }
        }
      }

      return index;
    },
    diziUzunluk(liste) {
      let uzunluk = 0;

      for (let key in liste) {
        if (liste[key]) uzunluk = uzunluk + 1;
      }

      return uzunluk;
    },
    kayitKontrol() {
      const kontrol =
        this.diziUzunluk(this.urunler_yeni) +
        this.diziUzunluk(this.urunler_degisenler) +
        this.diziUzunluk(this.urunler_silinenler);
      let durum = true;
      if (kontrol > 0) durum = false;
      this.$emit("siparisBilgileriDegisim", durum);
    },
    urunIslemleri() {
      const urunKart = this.$store.getters.getSiparisUrunKart;

      this.siparis.urunAdi = urunKart.urunAdi;
      this.siparis.urunKartId = urunKart.id;
      this.siparis.en = urunKart.en;
      this.siparis.boy = urunKart.boy;
      this.siparis.kenar = urunKart.kenar;
      this.siparis.yuzeyIslem = urunKart.yuzeyIslem;
      this.siparis.tedarikciAdi = this.tedarikci.firmaAdi;
      this.siparis.tedarikciId = this.tedarikci.id;
      this.siparis.urunBirimId = this.urunBirim.id;

      this.siparis.m2 = 0;
      this.siparis.mt = 0;
      this.siparis.adet = 0;

      if (this.siparis.urunBirimId == 1) {
        this.siparis.m2 = this.siparis.miktar;
        this.siparis.urunbirimAdi = "M2";
      }
      if (this.siparis.urunBirimId == 2) {
        this.siparis.adet = this.siparis.miktar;
        this.siparis.urunbirimAdi = "Adet";
      }
      if (this.siparis.urunBirimId == 3) {
        this.siparis.mt = this.siparis.miktar;
        this.siparis.urunbirimAdi = "Mt";
      }

      this.siparis.miktar = this.siparis.miktar;
      this.siparis.satisToplam = this.siparis.satisFiyati * this.siparis.miktar;

      //id kontrol
      if (!this.siparis.id) {
        this.siparis.id = this.idOlustur();
      }
    },
    aciklamaAdd(urunKart) {
      // this.isfDelete(this.siparis.tedarikciId, this.siparisNo);
      this.siparis.musteriAciklama =
        urunKart.kategoriAdi +
        " - " +
        urunKart.urunAdi +
        " - " +
        urunKart.yuzeyIslem +
        " - " +
        urunKart.ebat;
      this.yuzeyOneTr(urunKart.yuzey_1);
      this.yuzeyTwoTr(urunKart.yuzey_2);
      this.yuzeyThreeTr(urunKart.yuzey_3);
      if (
        this.yuzeyOneTr(urunKart.yuzey_1) != "" &&
        this.yuzeyTwoTr(urunKart.yuzey_2) == "" &&
        this.yuzeyThreeTr(urunKart.yuzey_3) == ""
      ) {
        this.yuzey = this.yuzeyOneTr(urunKart.yuzey_1);
      } else if (
        this.yuzeyOneTr(urunKart.yuzey_1) != "" &&
        this.yuzeyTwoTr(urunKart.yuzey_2) != "" &&
        this.yuzeyThreeTr(urunKart.yuzey_3) == ""
      ) {
        this.yuzey =
          this.yuzeyOneTr(urunKart.yuzey_1) +
          "&" +
          this.yuzeyTwoTr(urunKart.yuzey_2);
      } else if (
        this.yuzeyOneTr(urunKart.yuzey_1) != "" &&
        this.yuzeyTwoTr(urunKart.yuzey_2) != "" &&
        this.yuzeyThreeTr(urunKart.yuzey_3) != ""
      ) {
        this.yuzey =
          this.yuzeyOneTr(urunKart.yuzey_1) +
          "&" +
          this.yuzeyTwoTr(urunKart.yuzey_2) +
          "&" +
          this.yuzeyThreeTr(urunKart.yuzey_3);
      }

      this.siparis.uretimAciklama =
        urunKart.kategoriAdi +
        " - " +
        urunKart.urunAdi +
        " - " +
        this.yuzey +
        " - " +
        urunKart.ebat;
    },
    yuzeyOneTr(yuzey) {
      if (yuzey == "Filled") {
        return "Dolgulu";
      } else if (yuzey == "Unfilled") {
        return "Dolgusuz";
      } else if (yuzey == "Tumbled") {
        return "Eskitme";
      } else if (yuzey == "Polished") {
        return "Cilalı";
      } else if (yuzey == "Honed") {
        return "Honlu";
      } else if (yuzey == "Bevelled") {
        return "Pahlı";
      } else if (yuzey == "Brushed") {
        return "Fırçalı";
      } else if (yuzey == "Sandblasted") {
        return "Kumlama";
      } else if (yuzey == "Bullnose") {
        return "Bulnoz";
      } else if (yuzey == "Grooved") {
        return "Oluklu";
      } else if (yuzey == "Splitface" || yuzey == "Split face") {
        return "Patlatma";
      } else {
        return "";
      }
    },
    yuzeyTwoTr(yuzey) {
      if (yuzey == "Filled") {
        return "Dolgulu";
      } else if (yuzey == "Honed") {
        return "Honlu";
      } else if (yuzey == "Tumbled") {
        return "Eskitme";
      } else if (yuzey == "Polished") {
        return "Cilalı";
      } else if (yuzey == "Semi Polished") {
        return "Yarı Cilalı";
      } else if (yuzey == "Semi Bullnose") {
        return "Yarı Bulnoz";
      } else if (yuzey == "Brushed") {
        return "Fırçalı";
      } else if (yuzey == "Sandblasted") {
        return "Kumlama";
      } else if (yuzey == "Bullnose") {
        return "Bulnoz";
      } else if (yuzey == "Grooved") {
        return "Oluklu";
      } else if (yuzey == "Chiseled") {
        return "Kenarı Kırık";
      } else if (yuzey == "Splitface" || yuzey == "Split face") {
        return "Patlatma";
      } else if (yuzey == "Unfilled") {
        return "Dolgusuz";
      } else {
        return "";
      }
    },
    yuzeyThreeTr(yuzey) {
      if (yuzey == "Filled") {
        return "Dolgulu";
      } else if (yuzey == "Unfilled") {
        return "Dolgusuz";
      } else if (yuzey == "Honed") {
        return "Honlu";
      } else if (yuzey == "Tumbled") {
        return "Eskitme";
      } else if (yuzey == "Polished") {
        return "Cilalı";
      } else if (yuzey == "Semi Polished") {
        return "Yarı Cilalı";
      } else if (yuzey == "Semi Bullnose") {
        return "Yarı Bulnoz";
      } else if (yuzey == "Brushed") {
        return "Fırçalı";
      } else if (yuzey == "Sandblasted") {
        return "Kumlama";
      } else if (yuzey == "Bullnose") {
        return "Bulnoz";
      } else if (yuzey == "Grooved") {
        return "Oluklu";
      } else if (yuzey == "Chiseled") {
        return "Kenarı Kırık";
      } else if (yuzey == "Splitface" || yuzey == "Split face") {
        return "Patlatma";
      } else if (yuzey == "Straight Edge") {
        return "Düz Kenar";
      } else {
        return "";
      }
    },
    form_btn_reset() {
      this.dis_yeni = false;
      this.dis_iptal = true;
      this.dis_ekle = true;
      this.dis_degistir = true;
      this.dis_urun_giris = true;
      this.dis_sil = true;
      this.dis_stokal = true;
      this.dis_ozelIscilik = true;
      this.urun = {};
      this.$store.dispatch("siparisUrunKartAct", {});
      this.selectUrun = null;
      this.siparis = null;
      this.tedarikci = null;
      this.siparis = {};
      this.urunBirim = null;
      this.alisFiyati = 0;
      this.satisFiyati = 0;
    },

    btn_yeni_click() {
      this.dis_yeni = true;
      this.dis_iptal = false;
      this.dis_ekle = false;
      this.dis_urun_giris = false;
      this.dis_ozelIscilik = true;

      this.siparis = { ...this.urunModel };
    },
    btn_iptal_click() {
      this.form_btn_reset();
    },
    btn_ekle_click() {
      this.submitted = true;
      if (this.v$.$invalid) {
        this.$toast.add({
          severity: "error",
          summary: "Uyarı Ekranı",
          detail: "Zorunlu Alanlar Eklenmeli",
          life: 3000,
        });
      } else {
        if (
          this.siparisUrunler.filter(
            (x) => parseInt(x.siraNo) === parseInt(this.siparis.siraNo)
          ).length > 0
        ) {
          if (
            confirm("Sıra numarası hatalı, Yinede kaydetmek ister misiniz?")
          ) {
            this.urunIslemleri();
            this.siparisUrunler.push({ ...this.siparis });
            this.isfDelete(this.siparis.tedarikciId, this.siparisNo);
            if (!this.yeniSiparis) this.yeni_urun_islem();
            this.dataSatirTopla(this.siparisUrunler);
            this.form_btn_reset();

            this.$toast.add({
              severity: "success",
              summary: "Bilgi Ekranı",
              detail: "Ürün Eklendi",
              life: 3000,
            });
            this.$emit("siparisUrunDegisim");
            this.emitter.emit("sipBilgileri", this.siparisUrunler);
          }
        } else {
          this.urunIslemleri();
          this.siparisUrunler.push({ ...this.siparis });
          // this.isfDelete(this.siparis.tedarikciId, this.siparisNo);
          if (!this.yeniSiparis) this.yeni_urun_islem();
          this.dataSatirTopla(this.siparisUrunler);
          this.form_btn_reset();

          this.$toast.add({
            severity: "success",
            summary: "Bilgi Ekranı",
            detail: "Ürün Eklendi",
            life: 3000,
          });
          this.$emit("siparisUrunDegisim");
          this.emitter.emit("sipBilgileri", this.siparisUrunler);
        }
      }
    },
    btn_degistir_click() {
      this.urunIslemleri();
      let index = this.indexBul(this.siparis.id, this.siparisUrunler);
      this.isfDelete(this.siparis.tedarikciId, this.siparisNo);
      this.siparisUrunler[index] = this.siparis;
      if (!this.yeniSiparis) this.degisen_urun_islem();
      this.dataSatirTopla(this.siparisUrunler);
      store.dispatch("tedarikci_als_fiyati_act", this.siparisUrunler);
      this.form_btn_reset();
      this.$toast.add({
        severity: "success",
        summary: "Bilgi Ekranı",
        detail: "Ürün Değiştirildi",
        life: 3000,
      });
      this.$emit("siparisUrunDegisim");
      this.emitter.emit("tedarikciler", this.siparisUrunler);
    },
    btn_sil_click() {
      let index = this.indexBul(this.siparis.id, this.siparisUrunler);
      this.isfDelete(this.siparis.tedarikciId, this.siparisNo);
      if (!this.yeniSiparis) this.silinen_urun_islem();
      this.siparisUrunler.splice(index, 1);
      this.dataSatirTopla(this.siparisUrunler);
      this.form_btn_reset();
      this.$toast.add({
        severity: "warn",
        summary: "Bilgi Ekranı",
        detail: "Ürün Silindi.",
        life: 3000,
      });
      this.$emit("siparisUrunDegisim");
    },
    isfDelete(tedarikciId, siparisNo) {
      if (tedarikciId != "" && siparisNo != "") {
        tedarikciService
          .getDeleteFormControl(tedarikciId, siparisNo)
          .then((status) => {
            if (status) {
              tedarikciService
                .getDeleteForm(tedarikciId, siparisNo)
                .then((data) => {
                  if (data.status) {
                    this.$toast.add({
                      severity: "error",
                      summary: "Iç Sipariş Form",
                      detail:
                        "Iç sipariş form silindi. Lütfen tekrar yükleyiniz.",
                      life: 3000,
                    });
                  }
                });
            }
          });
      }
    },
    siparisUrunSec(event) {
      this.dis_yeni = true;
      this.dis_degistir = false;
      this.dis_iptal = false;
      this.dis_sil = false;
      this.dis_urun_giris = false;
      this.dis_ozelIscilik = false;
      if (this.selectUrun) {
        this.siparis = { ...event.data };
        this.alisFiyati = this.siparis.alisFiyati;
        this.satisFiyati = this.siparis.satisFiyati;
        this.tedarikci = this.tedarikciList.filter(
          (x) => x.id == this.siparis.tedarikciId
        )[0];
        this.urunBirim = this.urunBirimList.filter(
          (x) => x.id == this.siparis.urunBirimId
        )[0];

        this.$store.dispatch(
          "siparisFormUrunGuncelleAct",
          this.siparis.urunKartId
        );
      }
    },
    dataSatirTopla(liste) {
      this.toplam_m2 = 0;
      this.toplam_mt = 0;
      this.toplam_adet = 0;
      this.toplam_ton = 0;
      this.toplam_kasa = 0;
      this.toplam_tutar = 0;

      for (let key in liste) {
        this.toplam_m2 += Number(liste[key].m2);
        this.toplam_mt += Number(liste[key].mt);
        this.toplam_adet += Number(liste[key].adet);
        this.toplam_ton += Number(liste[key].ton);

        if (liste[key].kasaAdet)
          this.toplam_kasa += Number(liste[key].kasaAdet);
        this.toplam_tutar += liste[key].satisToplam;
      }
    },
    yeni_urun_islem() {
      this.urunler_yeni.push({ ...this.siparis });

      this.kayitKontrol();
    },
    degisen_urun_islem() {
      if (this.diziUzunluk(this.urunler_yeni) > 0) {
        let yeniUrunKontrol = this.indexBul(this.siparis.id, this.urunler_yeni);

        if (yeniUrunKontrol != -1) {
          this.urunler_yeni[yeniUrunKontrol] = { ...this.siparis };
        } else {
          let index = this.indexBul(this.siparis.id, this.urunler_degisenler);

          if (index == -1) {
            this.urunler_degisenler.push({ ...this.siparis });
          } else this.urunler_degisenler[index] = { ...this.siparis };
        }
      } else {
        let index = this.indexBul(this.siparis.id, this.urunler_degisenler);
        if (index == -1) this.urunler_degisenler.push({ ...this.siparis });
        else this.urunler_degisenler[index] = { ...this.siparis };
      }
      this.kayitKontrol();
    },
    silinen_urun_islem() {
      let yeniUrun = this.indexBul(this.siparis.id, this.urunler_yeni);

      if (yeniUrun != -1) {
        this.urunler_yeni.splice(yeniUrun, 1);
      } else {
        this.urunler_silinenler.push({ ...this.siparis });
        let degisenUrun = this.indexBul(
          this.siparis.id,
          this.urunler_degisenler
        );

        if (degisenUrun != -1) {
          this.urunler_degisenler.splice(degisenUrun, 1);
        }
      }
      this.kayitKontrol();
    },
    ozelIscilikFormAc() {
      this.dialogIscilik = true;
    },
  },
  data() {
    return {
      submitted: false,
      kategoriAdi: "",
      urunKartBilgisi: null,
      yuzey: "",
      siparis: {},
      not: "",
      selectNot: {},
      tedarikci: null,
      filterTedarikciList: null,
      urunBirim: null,
      filterUrunBirimList: null,
      urunBirimList: null,
      urunler: null,
      selectUrun: null,
      filters: {},
      dis_yeni: false,
      dis_iptal: true,
      dis_ekle: true,
      dis_degistir: true,
      dis_stokal: true,
      dis_sil: true,
      dis_urun_giris: true,
      dis_ozelIscilik: true,
      dialogIscilik: false,
      toplam_m2: 0,
      toplam_mt: 0,
      toplam_adet: 0,
      toplam_ton: 0,
      toplam_kasa: 0,
      toplam_tutar: 0,
      satisFiyati: 0,
      alisFiyati: 0,
      alisFiyati_TL: 0,

      hatirlatmaColumns: [
        {
          field: "not",
          label: "not",
          width: 40,
        },
      ],
      siparisColumns: [
        {
          field: "siraNo",
          label: "S",
          numeric: true,
          centered: true,
        },
        {
          field: "tedarikciAdi",
          label: "Kimden",
          width: "80",
          searchable: true,
        },
        {
          field: "iscilik",
          label: "İşçilik",
        },
        {
          field: "urunAdi",
          label: "Ürün Adı",
          width: "90",
        },
        {
          field: "en",
          label: "E",
          width: "60",
          searchable: true,
        },
        {
          field: "boy",
          label: "B",
          width: "60",
          searchable: true,
        },
        {
          field: "kenar",
          label: "K",
          width: "60",
          searchable: true,
        },
        {
          field: "yuzeyIslem",
          label: "İşlem",
          width: "170",
        },
        {
          field: "m2",
          label: "M2",
          width: "60",
          numeric: true,
          centered: true,
        },
        {
          field: "adet",
          label: "Adet",
          width: "60",
          numeric: true,
          centered: true,
        },
        {
          field: "mt",
          label: "Mt",
          width: "60",
          numeric: true,
          centered: true,
        },
        {
          field: "ton",
          label: "Ton",
          width: "60",
          numeric: true,
          centered: true,
        },
        {
          field: "kasaAdet",
          label: "Kasa",
          width: "60",
          numeric: true,
          centered: true,
        },
        {
          field: "satisToplam",
          label: "Tutar",
          width: "60",
          numeric: true,
          centered: true,
        },
      ],
    };
  },
  props: {
    siparisUrunler: null,
    urunModel: null,
    siparisNo: null,
    siparisUrunLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    urunler_yeni: {
      type: Array,
      required: true,
    },
    urunler_degisenler: {
      type: Array,
      required: true,
    },
    urunler_silinenler: {
      type: Array,
      required: true,
    },
    yeniSiparis: {
      type: Boolean,
    },
  },

  urunService: null,
  created() {
    this.urunService = new UrunService();
    store.dispatch("tedarikci_als_fiyati_act", this.siparisUrunler);
    socket.siparis.on("tedarikciListesiEmit", (data) => {
      this.$store.dispatch("tedarikci_list_yukle_act", data);
    });
    this.urunService.getUrunBirimList().then((data) => {
      this.urunBirimList = data;
    });


  },

  mounted() {

    socket.siparis.on("tedarikciListesiEmit", (data) => {
      this.$store.dispatch("tedarikci_list_yukle_act", data);
    });

    this.dataSatirTopla(this.siparisUrunler);

    this.emitter.on("urunKartSecim", (data) => {
      if (this.$store.getters.__getUsername == 'Semih') {
        this.aciklamaAdd(data);

      }
      this.urunKartBilgisi = data;
    });
  },
  watch: {
    isNewClicked() {
      if (this.isNewClicked) {
        this.siparis = "";
        this.emitter.emit("urunKartAlanTemizleme", true);
      }
    },
    siparisUrunler(){
      this.dataSatirTopla(this.siparisUrunler);

    }
  },
};
</script>
<style scoped>
.cardTedarikci .p-inputtext {
  height: 20px;
  font-size: 5px;
}
.p-datatable {
  font-size: 11px;
}
.siparisMiktar {
  font-size: 10px;
}
.siparisMiktar input {
  font-size: 11px;
}
#buttons {
}
@media screen and (max-width: 596px) {
  #buttons {
  }
}
</style>

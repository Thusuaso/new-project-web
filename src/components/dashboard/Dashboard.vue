<template>
  <div>
    <!-- <div class="columns is-mobile is-gapless">
      <div class="column">
        <RadioButton
          id="rapor3"
          name="rapor3"
          value="Musterim"
          v-model="rapor"
        />
        <label for="rapor3" class="p-radiobutton-label">Müşterilerim</label>
      </div>
      <div class="column">
        <RadioButton
          id="rapor1"
          :disabled="dis_detay"
          name="rapor1"
          value="Mekmar"
          v-model="rapor"
        />
        <label for="rapor1" class="p-radiobutton-label">Mekmar</label>
      </div>
      <div class="column">
        <RadioButton
          id="rapor2"
          :disabled="dis_detay"
          name="rapor2"
          value="Hepsi"
          v-model="rapor"
        />
        <label for="rapor2" class="p-radiobutton-label">Hepsi</label>
      </div>
    </div> -->
    <Card >
      <template #header>
        <div class="columns" style="width:100%;">
          <div class="column">

            <div id="dashboardUstSol">
              <div style="display: block">
                <div class="columns" id="rapors">
                  <div class="column is-6">
                    <div class="columns">
                      <div
                        class="column"
                        id="ortalama"
                        style="font-weight: bold"
                      > 
                        {{ gelenSiparis.gelenSiparisAy }}
                      </div>
                      <div
                        class="column"
                        style="text-align: center; font-weight: bold"
                      >
                        <p>FOB</p>
                      </div>
                    </div>
                    <div
                      class="columns"
                      style="margin-top: -25px"
                      id="ortalama"
                    >
                      <div class="column">
                        <h6 class="ortala">R1: Gelen Sipariş</h6>
                      </div>
                      <div class="column">
                        <Button
                          :label="formatPrice(gelenSiparis.gelenSiparisFob)"
                          @click="isButtonClick"
                          class="gelenSiparis"
                        ></Button>
                        <a
                          ref="hrefSiparis"
                          href="https://goz.mekmar.com/raporlar/siparisOzetRapor"
                        ></a>
                      </div>
                    </div>
                  </div>
                  <div class="column is-6">
                    <div class="columns">
                      <div
                        class="column"
                        style="font-weight: bold"
                        id="ortalama"
                      >
                        {{ gelenSiparisYear.gelenSiparisYil }}
                        {{ gelenSiparisYear.gelenSiparisAy }}
                      </div>

                      <div class="column" style="text-align: center">
                        <h6 style="font-weight: bold">FOB</h6>
                      </div>
                    </div>
                    <div
                      class="columns"
                      style="margin-top: -25px"
                      id="ortalama"
                    >
                      <div class="column">
                        <h6 class="ortala">R2: Gelen Sipariş</h6>
                      </div>
                      <div class="column">
                        <Button
                          :label="
                            formatPrice(gelenSiparisYear.gelenSiparisFob)
                          "
                          @click="isButtonClick"
                          class="gelenSiparis"
                        ></Button>
                        <a
                          ref="href"
                          href="https://goz.mekmar.com/raporlar/siparisOzetRapor"
                        ></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns" id="rapors">
                  <div class="column is-6">
                    <div class="columns" id="ortalama">
                      <div class="column">
                        <h6 class="ortala">R3: Aylık Ortalama</h6>
                      </div>
                      <div class="column">
                        <Button
                          :label="
                            formatPrice(
                              gelenSiparisYear.gelenSiparisAylikOrtalama
                            )
                          "
                          @click="isButtonClick"
                          class="gelenSiparis"
                        ></Button>
                      </div>
                    </div>
                  </div>
                  <div class="column is-6">
                    <div class="columns" id="ortalama">
                      <div class="column">
                        <h6 class="ortala">R4: Yıl Sonu Tahmini</h6>
                      </div>
                      <div class="column">
                        <Button
                          :label="
                            formatPrice(
                              gelenSiparisYear.gelenSiparisYilSonuTahmini
                            )
                          "
                          @click="yilSonuTahminiAktiviteler"
                          class="gelenSiparis"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns" id="rapors">
                  <div class="column is-6">
                    <div class="columns">
                      <div
                        class="column"
                        style="font-weight: bold"
                        id="ortalama"
                      >
                        {{ gelenSiparis.gelenSiparisAy }}
                      </div>
                      <div class="column" style="font-weight: bold">
                        <p style="text-align: center">DDP</p>
                      </div>
                    </div>
                    <div class="columns" id="ortalama">
                      <div class="column">
                        <h6 class="ortala">R5: Yüklenen Sipariş</h6>
                      </div>
                      <div class="column">
                        <Button
                          :label="
                            formatPrice(gelenSiparisYuklenen.gelenSiparisFob)
                          "
                          @click="isButtonClick"
                          class="gelenSiparis"
                        ></Button>
                        <a
                          ref="href"
                          href="https://goz.mekmar.com/raporlar/yuklemeRapor"
                        ></a>
                      </div>
                    </div>
                  </div>
                  <div class="column is-6">
                    <div class="columns" id="ortalama">
                      <div
                        class="column"
                        style="font-weight: bold"
                      >
                        {{ gelenSiparisYearYuklenen.gelenSiparisYil }}
                        {{ gelenSiparisYearYuklenen.gelenSiparisAy }}
                      </div>
                      <div class="column" style="font-weight: bold">
                        <p style="text-align: center">DDP</p>
                      </div>
                    </div>
                    <div class="columns" id="ortalama">
                      <div class="column">
                        <h6 class="ortala">R6: Yüklenen Sipariş</h6>
                      </div>
                      <div class="column">
                        <Button
                          :label="
                            formatPrice(
                              gelenSiparisYearYuklenen.gelenSiparisFob
                            )
                          "
                          @click="isButtonClick"
                          class="gelenSiparis"
                        ></Button>
                        <a
                          ref="href"
                          href="https://goz.mekmar.com/raporlar/yuklemeRapor"
                        ></a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="columns" id="rapors">
                  <div class="column is-6">
                    <div class="columns" id="ortalama">
                      <div class="column">
                        <h6 class="ortala">R7: Aylık Ortalama</h6>
                      </div>
                      <div class="column">
                        <Button
                          :label="
                            formatPrice(
                              gelenSiparisYearYuklenen.gelenSiparisAylikOrtalama
                            )
                          "
                          @click="isButtonClick"
                          class="gelenSiparis"
                        ></Button>
                      </div>
                    </div>
                  </div>
                  <div class="column is-6">
                    <div class="columns" id="ortalama">
                      <div class="column">
                        <h6 class="ortala">R8: Yıl Sonu Tahmini</h6>
                      </div>
                      <div class="column">
                        <Button
                          :label="
                            formatPrice(
                              gelenSiparisYearYuklenen.gelenSiparisYilSonuTahmini
                            )
                          "
                          @click="isButtonClick"
                          class="gelenSiparis"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <div class="columns" id="rapors">
                  <div class="column is-6">
                    <div class="columns">
                      <div
                        class="column"
                        style="font-weight: bold"
                        id="ortalama"
                      >
                        {{ gelenSiparisEfes.gelenSiparisAy }}
                      </div>
                      <div class="column" style="font-weight: bold">
                        <p style="text-align: center">FOB</p>
                      </div>
                    </div>
                    <div class="columns" style="margin-top: -25px">
                      <div class="column">
                        <h5 class="ortala">R9: Efes Sipariş</h5>
                      </div>
                      <div class="column">
                        <Button
                          :label="
                            formatPrice(gelenSiparisEfes.gelenSiparisFob)
                          "
                          @click="isButtonClick"
                          class="efesSiparis"
                        ></Button>
                        <a
                          ref="href"
                          href="https://goz.mekmar.com/raporlar/siparisOzetRapor"
                        ></a>
                      </div>
                    </div>
                  </div>
                  <div class="column is-6">
                    <div class="columns">
                      <div
                        class="column"
                        style="font-weight: bold"
                        id="ortalama"
                      >
                        {{ gelenSiparisEfesYillik.gelenSiparisYil }}
                        {{ gelenSiparisEfesYillik.gelenSiparisAy }}
                      </div>
                      <div class="column" style="font-weight: bold">
                        <p style="text-align: center">FOB</p>
                      </div>
                    </div>
                    <div class="columns" style="margin-top: -25px">
                      <div class="column">
                        <h5 class="ortala">R10: Efes Gelen Sipariş</h5>
                      </div>
                      <div class="column">
                        <Button
                          :label="
                            formatPrice(
                              gelenSiparisEfesYillik.gelenSiparisFob
                            )
                          "
                          @click="isButtonClick"
                          class="efesSiparis"
                        ></Button>
                        <a
                          ref="href"
                          href="https://goz.mekmar.com/raporlar/siparisOzetRapor"
                        ></a>
                      </div>
                    </div>
                  </div>
                </div> -->

                <!-- <div class="columns" id="rapors">
                  <div class="column is-6">
                    <div class="columns">
                      <div
                        class="column"
                        style="font-weight: bold"
                        id="ortalama"
                      >
                        {{ gelenSiparisEfesYuklenen.gelenSiparisAy }}
                      </div>
                      <div class="column" style="font-weight: bold">
                        <p style="text-align: center">DDP</p>
                      </div>
                    </div>
                    <div class="columns" style="margin-top: -25px">
                      <div class="column">
                        <h5 class="ortala">R11: Efes Yüklenen</h5>
                      </div>
                      <div class="column">
                        <Button
                          :label="
                            formatPrice(
                              gelenSiparisEfesYuklenen.gelenSiparisFob
                            )
                          "
                          @click="isButtonClick"
                          class="efesYuklenen"
                        ></Button>
                        <a
                          ref="href"
                          href="https://goz.mekmar.com/raporlar/siparisOzetRapor"
                        ></a>
                      </div>
                    </div>
                  </div>
                  <div class="column is-6">
                    <div class="columns">
                      <div
                        class="column"
                        style="font-weight: bold"
                        id="ortalama"
                      >
                        {{ gelenSiparisEfesYillikYuklenen.gelenSiparisYil }}
                        {{ gelenSiparisEfesYillikYuklenen.gelenSiparisAy }}
                      </div>
                      <div class="column" style="font-weight: bold">
                        <p style="text-align: center">DDP</p>
                      </div>
                    </div>
                    <div class="columns" style="margin-top: -25px">
                      <div class="column">
                        <h5 class="ortala">R12: Efes Yüklenen Sipariş</h5>
                      </div>
                      <div class="column">
                        <Button
                          :label="
                            formatPrice(
                              gelenSiparisEfesYillikYuklenen.gelenSiparisFob
                            )
                          "
                          @click="isButtonClick"
                          class="efesYuklenen"
                        ></Button>
                        <a
                          ref="href"
                          href="https://goz.mekmar.com/raporlar/siparisOzetRapor"
                        ></a>
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>

          <div class="column">
            <div id="dashboardUstSag">
              <div>
                <h3>R13</h3>
              </div>
              <div class="table-responsive">
                <table table="class">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">2022</th>
                      <th scope="col">2023</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Yüklenen</th>
                      <td>
                        ${{
                           formatDecimal(
                            gelenSiparislerGrafikDataMekmar.gecenYilYukTop
                          )
                        }}
                      </td>
                      <td>
                        ${{
                          formatDecimal(
                            gelenSiparislerGrafikDataMekmar.buYilYukTop
                          )
                        }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Gelen Sipariş</th>
                      <td>
                        ${{
                          formatDecimal(
                            gelenSiparislerGrafikDataMekmar.gecenYilSipTop
                          )
                        }}
                      </td>
                      <td>
                        ${{
                          formatDecimal(
                            gelenSiparislerGrafikDataMekmar.buYilSipTop
                          )
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="columns">
                <div class="column is-12" id="chart">
                  <Chart type="bar" :data="gelenSiparislerGrafik" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <br />
    <Button
      @click="is_form_dashboard = !is_form_dashboard"
      label="Daha Fazlasını Göster"
      class="subButton"
    ></Button>
    <hr />
    <!-- <component :is="altComponent"> </component> -->
    <DashboardNewAltKisim v-if="is_form_dashboard"/>
    <Dialog
      v-model:visible="tahmini_form"
      maximizable
      header="Değişiklikler"
      :modal="true"
      position="top"
    >
      <div>
        <DataTable
          :value="tahminiDegisiklik"
          responsiveLayout="scroll"
          :paginator="true"
          :rows="30"
          v-model:filters="filters"
          filterDisplay="row"
        >
          <Column
            field="siparis_no"
            header="Po"
            headerStyle="width:10%;"
            bodyStyle="text-align:center;"
            :showFilterMenu="false"
            :showFilterOperator="false"
            :showClearButton="false"
            :showApplyButton="false"
            :showFilterMatchModes="false"
          >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
          </Column>
          <Column
            field="info"
            header="Bilgi"
            headerStyle="width:50%;"
            bodyStyle="text-align:center;"
                        :showFilterMenu="false"
              :showFilterOperator="false"
              :showClearButton="false"
              :showApplyButton="false"
              :showFilterMatchModes="false"
          >
          
        </Column>
          <Column
            field="gun"
            header="Gün"
            headerStyle="width:10%;"
            bodyStyle="text-align:center;"
                        :showFilterMenu="false"
              :showFilterOperator="false"
              :showClearButton="false"
              :showApplyButton="false"
              :showFilterMatchModes="false"
          >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
          </Column>
          <Column
            field="ay"
            header="Ay"
            headerStyle="width:10%;"
            bodyStyle="text-align:center;"
                        :showFilterMenu="false"
              :showFilterOperator="false"
              :showClearButton="false"
              :showApplyButton="false"
              :showFilterMatchModes="false"
          >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
          </Column>
          <Column
            field="yil"
            header="Yıl"
            headerStyle="width:10%;"
            bodyStyle="text-align:center;"
                        :showFilterMenu="false"
              :showFilterOperator="false"
              :showClearButton="false"
              :showApplyButton="false"
              :showFilterMatchModes="false"
          >
          <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
          </Column>
          <Column
            field="kayit_kisi"
            header="Kayıt Kişi"
            headerStyle="width:10%;"
            bodyStyle="text-align:center;"
                        :showFilterMenu="false"
              :showFilterOperator="false"
              :showClearButton="false"
              :showApplyButton="false"
              :showFilterMatchModes="false"
          >
          <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
          </Column>
          <Column field="yuklenen_bu_ay_sip" header="Bu Ay Hariç(Yüklenen)">
                  <template #body="slotProps"> 
                      {{ formatPrice(slotProps.data.yuklenen_bu_ay_sip) }}
                  </template>
              </Column>
              <Column field="yuklenen_yil_sonu_tahmin" header="Yüklenen Yıl Sonu Tahmin">
                      <template #body="slotProps"> 
                          {{ formatPrice(slotProps.data.yuklenen_yil_sonu_tahmin) }}
                      </template>
                  </Column>
                  <Column field="siparis_bu_ay" header="Bu Ay Hariç(Sipariş)">
                      <template #body="slotProps"> 
                          {{ formatPrice(slotProps.data.siparis_bu_ay) }}
                      </template>
                  </Column>
                  <Column field="siparis_yil_sonu_tahmin" header="Sipariş Yıl Sonu Tahmin">
                      <template #body="slotProps"> 
                          {{ formatPrice(slotProps.data.siparis_yil_sonu_tahmin) }}
                      </template>
                  </Column>
        </DataTable>
      </div>
    </Dialog>
  </div>
  
</template>

<script>
import { mapGetters } from "vuex";
import service from "@/service/AnasayfaRapor";
import { defineAsyncComponent } from "vue";
import { FilterMatchMode } from 'primevue/api';

export default {
  components: {
    DashboardNewAltKisim: defineAsyncComponent(() => import("./DashboardNewAltKisim"))
  },
  computed: {
    ...mapGetters([
      "gelenSiparis",
      "gelenSiparisYear",
      "gelenSiparisYuklenen",
      "gelenSiparisYearYuklenen",
      "gelenSiparisEfes",
      "gelenSiparisEfesYillik",
      "gelenSiparisEfesYuklenen",
      "gelenSiparisEfesYillikYuklenen",
      "gelenSiparislerGrafik",
      "gelenSiparislerGrafikDataMekmar",
      "tahminiDegisiklik",
    ]),
  },

  data() {
    return {
      is_form_dashboard:false,
      rapor: "Mekmar",
      dis_detay: false,
      altComponent: "",
      is_click_form: true,
      tahmini_form: false,
      filters: {
        siparis_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH  },
        gun: { value: null, matchMode: FilterMatchMode.STARTS_WITH  },
        ay: { value: null, matchMode: FilterMatchMode.STARTS_WITH  },
        yil: { value: null, matchMode: FilterMatchMode.STARTS_WITH  },
        kayit_kisi: { value: null, matchMode: FilterMatchMode.STARTS_WITH  },


      },

    };
  },
  created() {
    service.getEtaSuresiControl();
    
  },

  watch: {
    rapor() {
      if (this.rapor == "Musterim") {
        this.$store.dispatch("gelen_siparis_satisci_load");
      } else if (this.rapor == "Mekmar") {
        this.$store.dispatch("gelen_siparis_mekmar_load");
        this.$store.dispatch("gelen_siparis_grafik_load");
      } else if (this.rapor == "Hepsi") {
        this.$store.dispatch("gelen_siparis_all_load");
        this.$store.dispatch("gelen_siparis_grafik_hepsi_load");
      }
    },
  },
  methods: {

    yilSonuTahminiAktiviteler() {
      service.getLogsMaliyet(new Date().getFullYear()).then((data) => {
        console.log(data);
        this.$store.dispatch("tahmini_degisiklik_load", data.maliyet);
        this.tahmini_form = true;
      });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    isButtonClick() {
      this.$refs.hrefSiparis.click();
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  mounted() {},
};
</script>

<style scoped>
.topTosub-enter {
  opacity: 0;
  transition: opacity 1s linear;
}

.topTosub-enter-active {
  opacity: 1;
}

.subButton {
  width: 100%;
  text-align: center;
  margin-top: 5px;
  border-radius: 3px;
}

.subButton:hover {
  animation: identifier 1s ease-in-out infinite;
}

@keyframes identifier {
  from {
    background-color: #7b95a3;
  }

  to {
    background-color: #50585c;
  }
}

.ortala {
  line-height: 35px;
}

#rapors {
  margin-bottom: -35px;
  font-size: 12px;
  margin-left: -25px;
  margin-top: 25px;
}

.dashboard .summary .title {
  font-size: 11px;
}

.dashboard .summary .count {
  font-size: 13px;
}

.p-datatable {
  font-size: 10px;
}

.p-datatable-responsive {
  font-size: 10px;
}

.box {
  background-color: black;
}

.yesil {
  color: #527f62;
  background-color: #c8fdda;
  font-weight: bold;
  font-size: 11px;
}

.kirmizi {
  background-color: #f59c9c;
  color: #f23a3a;
  font-weight: bold;
  font-size: 11px;
}

.devamButonu {
  background-color: #484444;
  transition: all 1.2s 0s cubic-bezier(0, 1.69, 0.12, -0.76);
}

.devamButonu:hover {
  background-color: #63d4b9;
}





table {
  width: 100%;
}

.gelenSiparis {
  border: 2px solid yellow;
  background-color: #414141;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
}

.yuklenenSiparis {
  border: 2px solid #6aa84f;
  background-color: #414141;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
}

.efesSiparis {
  border: 2px solid #741b47;
  background-color: #414141;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
}

.efesYuklenen {
  border: 2px solid #f44336;
  background-color: #414141;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
}

#dashboardUstSol {
  width: 90%;
  margin-left: 35px;
  margin-top:90px;
}

#dashboardUstSag {
  width: 90%;
  margin-left: 35px;
}

@media screen and (max-width: 576px) {
  #dashboardUstSol {
    display: block;
    width: 100%;
    height: auto;
  }

  #dashboardUstSag {
    display: block;
    width: 100%;
    height: auto;
    text-align:center;
  }


  #ortalama {
    text-align: center;
    width:100%;

  }
  .gelenSiparis{
    width:250px;
  }
  #chart{
    margin-left:-35px;
  }
  
}

</style>

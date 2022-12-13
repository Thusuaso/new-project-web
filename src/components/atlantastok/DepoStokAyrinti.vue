<template>
  <section>
    <br />
    <TabView>
      <TabPanel header="Inbound">
        <div class="columns">
          <div class="column is-6">
            <DataTable
              :value="stok_list"
              :scrollable="true"
              scrollHeight="450px"
            >
              <template #header>
                <div
                  class="columns is-multiline"
                  style="background-color: #8fbc8f; font-weight: bold"
                >
                  <div
                    class="column is-12"
                    style="background-color: #8fbc8f; font-weight: bold"
                  >
                    <span style="font-size: 15px; font-weight: bold">
                      STOCK LIST
                    </span>
                  </div>
                </div>
              </template>
              <Column
                field="order_no"
                header="Order"
                headerStyle="width:9px; "
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.order_no }}
                </template>
              </Column>
              <Column
                field="yukleme_tarihi"
                header="Yükleme Tarihi"
                headerStyle="width:7px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.yukleme_tarihi }}
                </template>
              </Column>
              <Column
                field="inbound_date"
                header="Depoya varış"
                headerStyle="width:7px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.inbound_date }}
                </template>
              </Column>
              <Column
                field="konteyner_no"
                header="Konteyner No"
                headerStyle="width:7px"
                bodyStyle="text-align:left"
              >
                <template #body="slotProps">
                  {{ slotProps.data.konteyner_no }}
                </template>
              </Column>
              <Column
                field="masraf"
                header="Depo Masraf"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.masraf) }}
                </template>
              </Column>
              <Column
                field="box"
                header="Kutu"
                headerStyle="width:3px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.box }}
                </template>
                <template #footer>
                  {{ stok_kutu }}
                </template>
              </Column>
              <Column
                field="m2"
                header="m2"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.m2) }}
                </template>
                <template #footer>
                  {{ formatDecimal(stok_m2) }}
                </template>
              </Column>
              <Column
                field="sqft"
                header="sqft"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.sqft) }}
                </template>
                <template #footer>
                  {{ formatDecimal(stok_sqft) }}
                </template>
              </Column>
            </DataTable>
          </div>
          <div class="column is-6">
            <DataTable
              :value="sea_list"
              :scrollable="true"
              scrollHeight="450px"
            >
              <template #header>
                <div
                  class="columns is-multiline"
                  style="background-color: #00bfff"
                >
                  <div class="column is-12" style="background-color: #00bfff">
                    <span style="font-size: 15px; font-weight: bold">
                      SEA LIST</span
                    >
                  </div>
                </div>
              </template>
              <Column
                field="order_no"
                header="Order"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.order_no }}
                </template>
              </Column>
              <Column
                field="yukleme_tarihi"
                header="Yükleme Tarihi"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.yukleme_tarihi }}
                </template>
              </Column>
              <Column
                field="eta"
                header="Eta"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.eta }}
                </template>
              </Column>
              <Column
                field="konteyner_no"
                header="Konteyner No"
                headerStyle="width:5px"
                bodyStyle="text-align:left"
              >
                <template #body="slotProps">
                  {{ slotProps.data.konteyner_no }}
                </template>
              </Column>
              <Column
                field="masraf"
                header="Depo Masraf"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.masraf) }}
                </template>
              </Column>
              <Column
                field="box"
                header="Kutu"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.box }}
                </template>
                <template #footer>
                  {{ su_kutu }}
                </template>
              </Column>
              <Column
                field="m2"
                header="m2"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.m2) }}
                </template>
                <template #footer>
                  {{ formatDecimal(su_m2) }}
                </template>
              </Column>
              <Column
                field="sqft"
                header="sqft"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.sqft) }}
                </template>
                <template #footer>
                  {{ formatDecimal(su_sqft) }}
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Sales">
        <div class="columns">
          <div class="column" style="margin-top: 5px">
            <DataTable
              :value="satis_list"
              :scrollable="true"
              scrollHeight="450px"
            >
              <template #header>
                <div class="columns is-multiline">
                  <div class="column is-12">
                    <span style="font-size: 15px; font-weight: bold">
                      SALES LIST</span
                    >
                  </div>
                </div>
              </template>
              <Column
                field="musteriAdi"
                header="Müşteri"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.musteriAdi }}
                </template>
              </Column>
              <Column
                field="orderNo"
                header="Order No"
                headerStyle="width:5px"
                bodyStyle="text-align:left"
              >
                <template #body="slotProps">
                  {{ slotProps.data.orderNo }}
                </template>
              </Column>
              <Column
                field="satisTarihi"
                header="Satis Tarihi"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.satisTarihi }}
                </template>
              </Column>
              <Column
                field="sevkTarihi"
                header="Sevk Tarihi"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.sevkTarihi }}
                </template>
              </Column>

              <Column
                field="rof"
                header="ROF"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.rof }}
                </template>
              </Column>
              <Column
                field="kutu"
                header="Kutu"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ slotProps.data.kutu }}
                </template>
                <template #footer>
                  {{ satis_kutu }}
                </template>
              </Column>

              <Column
                field="m2"
                header="m2"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.m2) }}
                </template>
                <template #footer>
                  {{ formatDecimal(satis_m2) }}
                </template>
              </Column>
              <Column
                field="sqft"
                header="sqft"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.sqft) }}
                </template>
                <template #footer>
                  {{ formatDecimal(satis_sqft) }}
                </template>
              </Column>
              <Column
                field="birimFiyat"
                header="Price / sqft"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.birimFiyat) }}
                </template>
                <template #footer>
                  {{ formatPrice(satis_price) }}
                </template>
              </Column>
              <Column
                field="toplamFiyat"
                header="Total"
                headerStyle="width:5px"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.toplamFiyat) }}
                </template>
                <template #footer>
                  {{ formatPrice(satis_total) }}
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Cost">
        <div class="columns">
          <div class="column" style="margin-top: 5px">
            <DataTable
              :value="maliyet_list"
              :scrollable="true"
              scrollHeight="450px"
            >
              <template #header>
                <div class="columns is-multiline">
                  <div class="column is-12">
                    <span style="font-size: 18px; font-weight: bold">
                      COST LIST</span
                    >
                  </div>
                </div>
              </template>
              <Column
                field="uretici"
                header="Üretici"
                headerStyle="width:5px;font-size:12px;"
                bodyStyle="text-align:center;font-size:13px; font-weight: bold;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.uretici }}
                </template>
              </Column>
              <Column
                field="uretici_fiyat"
                header="Üretici Fiyat"
                headerStyle="width:5px;font-size:12px;"
                bodyStyle="text-align:center;font-size:13px; font-weight: bold;"
              >
                <template #body="slotProps">
                  <div style="background-color: #ff7f7f">
                    {{ formatPrice(slotProps.data.uretici_fiyat) }}
                  </div>
                </template>
              </Column>
              <Column
                field="transport"
                header="Transport"
                headerStyle="width:5px;font-size:12px;"
                bodyStyle="text-align:center;font-size:13px; font-weight: bold;"
              >
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.transport) }}
                </template>
              </Column>
              <Column
                field="max_payload"
                header="Max Yükleme"
                headerStyle="width:5px;font-size:12px;"
                bodyStyle="text-align:center;font-size:13px;  font-weight: bold;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.max_payload + " / m2" }}
                </template>
              </Column>
              <Column
                field="mekus_kira"
                header="Launch Cost"
                headerStyle="width:5px;font-size:12px;"
                bodyStyle="text-align:center;font-size:13px;  font-weight: bold;"
              >
                <template #body="slotProps">
                  <div style="background-color: #ff7f7f">
                    {{
                      formatPrice(
                        slotProps.data.transport / slotProps.data.max_payload
                      ) + " / m2"
                    }}
                  </div>
                </template>
              </Column>

              <Column
                field="mekus_kira"
                header="Mekus Handling"
                headerStyle="width:5px;font-size:12px;"
                bodyStyle="text-align:center;font-size:13px;  font-weight: bold;"
              >
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.mekus_kira) }}
                </template>
              </Column>
              <Column
                header="Total Maliyet "
                headerStyle="width:5px;font-size:12px;"
                bodyStyle="text-align:center;font-size:13px;  font-weight: bold;"
              >
                <template #body="slotProps">
                  <div style="background-color: #ff7f7f">
                    {{
                      formatPrice(
                        slotProps.data.transport / slotProps.data.max_payload +
                          slotProps.data.mekus_kira +
                          slotProps.data.uretici_fiyat
                      ) + " / m2"
                    }}
                  </div>
                </template>
              </Column>
              <Column
                field="mekus_kira"
                header="Mekus sqm"
                headerStyle="width:5px;font-size:12px;"
                bodyStyle="text-align:center;font-size:13px;  font-weight: bold;"
              >
                <template #body="slotProps">
                  <div style="background-color: #90ee90">
                    {{
                      formatPrice(
                        (slotProps.data.transport / slotProps.data.max_payload +
                          slotProps.data.mekus_kira +
                          slotProps.data.uretici_fiyat) *
                          kar
                      )
                    }}
                  </div>
                </template>
              </Column>
              <Column
                field="mekus_kira"
                header="Mekus sqft"
                headerStyle="width:5px;font-size:12px;"
                bodyStyle="text-align:center;font-size:13px;  font-weight: bold;"
              >
                <template #body="slotProps">
                  <div style="background-color: #90ee90">
                    {{
                      formatPrice(
                        ((slotProps.data.transport /
                          slotProps.data.max_payload +
                          slotProps.data.mekus_kira +
                          slotProps.data.uretici_fiyat) *
                          kar) /
                          10.76
                      )
                    }}
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </TabPanel>
    </TabView>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      satis_kutu: 0,
      satis_m2: 0,
      satis_sqft: 0,
      satis_price: 0,
      satis_total: 0,
      su_kutu: 0,
      su_m2: 0,
      su_sqft: 0,
      stok_kutu: 0,
      stok_m2: 0,
      stok_sqft: 0,
      kar: 1.35,
    };
  },

  computed: {
    ...mapGetters(["stok_list", "sea_list", "satis_list", "maliyet_list"]),
  },

  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  created() {
    for (let key in this.satis_list) {
      const item = this.satis_list[key];
      this.satis_kutu += item.kutu;
      this.satis_m2 += item.m2;
      this.satis_sqft += item.sqft;
      this.satis_price += item.birimFiyat;
      this.satis_total += item.toplamFiyat;
    }
    for (let key in this.stok_list) {
      const item = this.stok_list[key];

      this.stok_kutu += item.box;
      this.stok_m2 += item.m2;
      this.stok_sqft += item.sqft;
    }
    for (let key in this.sea_list) {
      const item = this.sea_list[key];

      this.su_kutu += item.box;
      this.su_m2 += item.m2;
      this.su_sqft += item.sqft;
    }
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

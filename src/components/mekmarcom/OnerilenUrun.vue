<template>
  <section>
    <div class="columns is-multiline">
      <div class="column is-5">
        <div class="columns is-multiline is-centered">
          <div class="column is-12">
            <h4 class="has-text-center">Products List</h4>
          </div>
          <div class="column is-4">
            <Button
              class="p-button-primary"
              :disabled="disekle"
              @click="urunEkle"
              label="Ekle"
            />
          </div>
          <div class="column is-12">
            <DataTable
              class="p-datatable-responsive"
              :value="productlist"
              selectionMode="single"
              v-model:selection="product"
              v-model:filters="filters"
              @row-select="urunSec($event)"
              :scrollable="true"
              scrollHeight="450px"
            >
              <Column
                field="urunid"
                header="Id"
                headerStyle="width:60px;"
                bodyStyle="text-align:center;vertical-align:middle;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.urunid }}
                </template>

              </Column>
              <Column
                field="urunadi_en"
                header="Ürün"
                bodyStyle="text-align:center;vertical-align:middle;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.urunadi_en }}
                </template>

              </Column>
              <Column
                field="foto"
                header="Foto"
                headerStyle="width:120px;"
                bodyStyle="text-align:center;vertical-align:middle;"
              >
                <template #body="slotProps">
                  <img :src="slotProps.data.foto" width="100" height="100" />
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
      <div class="column is-5">
        <div class="columns is-multiline is-centered">
          <div class="column is-12">
            <h4>Suggested List</h4>
          </div>
          <div class="column is-4">
            <Button
              class="p-button-danger"
              :disabled="dissil"
              @click="urunSil"
              label="Sil"
            />
             
          </div>
          <div class="column is-12">
            <DataTable
              class="p-datatable-responsive"
              :value="onerilenUrunList"
              @row-select="onerilenUrunSec($event)"
              dataKey="onerilenurunid"
              selectionMode="simple"
              v-model:selection="onerilenUrun"
              :scrollable="true"
              scrollHeight="450px"
            >
              <Column
                field="onerilenurunid"
                header="Id"
                headerStyle="width:60px;"
                bodyStyle="text-align:center;vertical-align:middle;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.onerilenurunid }}
                </template>
              </Column>
              <Column
                field="urunadi_en"
                header="Ürün"
                bodyStyle="text-align:center;vertical-align:middle;"
              >
                <template #body="slotProps">
                  {{ slotProps.data.urunadi_en }}
                </template>
              </Column>
              <Column
                field="foto"
                header="Foto"
                headerStyle="width:150px;"
                bodyStyle="text-align:center;vertical-align:middle;"
              >
                <template #body="slotProps">
                  <img :src="slotProps.data.nocdn" width="100" height="100" />
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
      <div class="column is-2" style="margin-top: 50px">
        <Button
          class="p-button-success"
          @click="urunKaydet"
          :disabled="diskayit"
          label="Kaydet"
        />
      </div>
    </div>
  </section>
</template>
<script>
//import { mapGetters } from 'vuex';
//import mekmarService from '../../service/MekmarService';
import service from "../../service/MekmarPanelService";

export default {
  props: ["productlist", "urunid", "kategori_id"],

  data() {
    return {
      filters: {},
      product: null,
      loading: false,
      disekle: true,
      dissil: true,
      onerilenUrun: null,
      silinenler: [],
      eklenenler: [],
      diskayit: true,
      onerilenUrunList: null,
    };
  },
  methods: {
    urunSec(event) {
      this.product = event.data;
      this.disekle = false;
    },
    onerilenUrunSec(event) {
      this.onerilenUrun = event.data;
      this.dissil = false;
    },
    urunEkle() {
      if (this.product) {
        let kontrol = this.onerilenUrunList.find(
          (x) => x.urunid == this.product.urunid
        );

        if (!kontrol) {
          const data = this.product;

          this.onerilenUrunList.push({
            ...data,
            nocdn: data.foto,
            onerilenurunid: data.urunid,
            urunid: this.urunid,
          });

          const customData = {
            urunid: this.urunid,
            benzerurunid: data.urunid,
            kategori_id: this.kategori_id,
          };

          this.eklenenler.push(customData);

          this.product = null;
          this.disekle = true;
        }

        this.urunDegisiklikDurum();
      }
    },
    urunSil() {
      if (this.onerilenUrun) {
        const data = {
          ...this.onerilenUrun,
          benzerurunid: this.onerilenUrun.onerilenurunid,
        };
        //eklenen ürünler de varsa silinmesi

        for (let key in this.eklenenler) {
          if (this.eklenenler[key].benzerurunid == this.onerilenUrun.urunid) {
            this.eklenenler.splice(key, 1);
          }
        }

        //silinen ürünlere eklenmesi
        const customData = {
          urunid: this.urunid,
          onerilenurunid: data.onerilenurunid,
          kategori_id: this.kategori_id,
        };
        for (let key in this.onerilenUrunList) {
          if (
            this.onerilenUrunList[key].onerilenurunid ==
            customData.onerilenurunid
          ) {
            this.onerilenUrunList.splice(key, 1);
          }
        }
        this.silinenler.push(customData);
        this.onerilenUrunler = null;

        this.urunDegisiklikDurum();
      }
    },
    urunDegisiklikDurum() {
      this.diskayit = true;
      if (this.eklenenler.length > 0 || this.silinenler.length > 0)
        this.diskayit = false;
    },
    urunKaydet() {
      const data = {
        eklenenler: this.eklenenler,
        silinenler: this.silinenler,
      };

      this.diskayit = true;

      service.onerilenUrunKayitIslem(data).then((res) => {
        if (res) {
          alert("Önerilen Ürün Kaydı Yapıldı.");
          this.eklenenler = [];
          this.silinenler = [];
        } else {
          this.diskayit = false;
        }
      });
    },
  },

  created() {
    this.onerilenUrunList = this.$store.getters.onerilenUrunler;
    },
};
</script>

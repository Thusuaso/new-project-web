<!-- eslint-disable prettier/prettier -->
<template>
  <section>
    <br />
      <div class="columns">
        <div class="column">
          <Calendar icon="calendar-today" @date-select="kurSecim" v-model="tarih" :disabled="is_form" />
        </div>
        <div class="column">
          <span class="p-float-label">
            <InputText id="siparis_no" v-model="pesinat_model.siparis_no" :disabled="true" />
            <label for="siparis_no">Sipariş No</label>
          </span>
        </div>
        <div class="column">
          <span class="p-float-label">
            <InputText id="tutar" v-model="pesinat_model.tutar" :disabled="is_form" />
            <label for="tutar">Tutar</label>
          </span>
        </div>
        <div class="column">
          <span class="p-float-label">
            <InputText id="kur" v-model="pesinat_model.kur" :disabled="is_form" />
            <label for="kur">Kur</label>
          </span>
        </div>
        <div class="column">
          <span class="p-float-label">
            <InputText id="masraf" v-model="pesinat_model.masraf" :disabled="is_form" />
            <label for="masraf">Masraf</label>
          </span>
        </div>
        <div class="column">
          <span class="p-float-label">
            <InputText id="not" type="text" v-model="pesinat_model.aciklama" />
            <label for="not">Not</label>
          </span>
        </div>
      </div>
    <div class="columns is-multiline is-centered">
      <div class="column is-2">
        <Button
          class="p-button-success"
          :disabled="is_kaydet"
          @click="kaydet_click_event"
          label="Kaydet"
        />
      </div>
      <div class="column is-2">
        <Button
          class="p-button-info"
          :disabled="is_vazgec"
          @click="vazgec_click_event"
          label="Vazgeç"
        />
      </div>
    </div>
    <div class="columns">
      <div class="column is-10">
        <!-- <b-table
          :data="pesinat_islem_listesi"
          v-model:selected="select_pesinat"
          :loading="loading_pesinat"
          @select="tahsilat_select_event($event)"
        >
          <template slot-scope="props">
            <b-table-column field="musteri_adi" label="Müşteri Adı">
              {{ props.row.musteri_adi }}
            </b-table-column>
            <b-table-column field="siparis_no" label="Sipariş No">
              {{ props.row.siparis_no }}
            </b-table-column>
            <b-table-column field="tutar" label="Tutar" centered>
              {{ formatPrice(props.row.tutar) }}
            </b-table-column>
          </template>
          <template slot="footer">
            <th></th>
            <th></th>
            <th>
              {{ pesinat_islem_liste_toplam }}
            </th>
          </template>
        </b-table> -->
        <DataTable
          :value="pesinat_islem_listesi"
          @row-select="tahsilat_select_event($event)"
          v-model:selection="select_pesinat"
          selectionMode="single"
        >
          <Column field="musteri_adi" header="Müşteri Adı"> </Column>
          <Column field="siparis_no" header="Sipariş No"> </Column>
          <Column field="tutar" header="Tutar">
            <template #body="slotProps">
              {{ slotProps.data.tutar }}
            </template>
            <template #footer>
              {{ pesinat_islem_liste_toplam }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import service from "../../service/FinansService";
import LocalService from "../../service/LocalService";
import socket from "../../service/SocketService";

export default {
  computed: {
    ...mapGetters([
      "pesinat_islem_listesi",
      "pesinat_islem_liste_toplam",
      "pesinat_model",
    ]),
  },
  data() {
    return {
      select_pesinat: null,
      loading_pesinat: false,
      is_form: true,
      tarih: new Date(),
      is_kaydet: true,
      is_vazgec: true,
    };
  },
  localService: null,
  created() {
    this.localService = new LocalService();
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    kurSecim() {
      const d = this.tarih;

      const year = d.getFullYear(); // 2021
      const mount = d.getMonth();
      const day = d.getDate();

      service.getGuncelKur(year, mount + 1, day).then((data) => {
        this.pesinat_model.kur = data.result;
      });
    },
    tahsilat_select_event(event) {
      this.select_pesinat = event.data;

      this.loading_pesinat = true;
      console.log(event)
      this.$store.dispatch("select_pesinat_model_act", {
        ...this.select_pesinat,
      });
      this.is_vazgec = false;
      this.is_kaydet = false;
      this.is_form = false;
      this.loading_pesinat = false;
    },
    vazgec_click_event() {
      this.$store.dispatch("new_pesinat_model_act");

      this.is_kaydet = true;
      this.is_vazgec = true;
    },

    kaydet_click_event() {
      this.is_kaydet = true;
      this.is_vazgec = true;

      this.loading_pesinat = true;

      const store_data = {
        pesinat_model: this.pesinat_model,
        tarih: this.localService.getDateString(this.tarih),
      };
      const users = this.$store.getters.__getUsername
      store_data.kullaniciadi = users;

      service
        .finansPesinatKaydet(store_data)
        .then((res) => {
          if (res.status) {
            service.getPesinatIslemListesi().then((data) => {
              socket.siparis.emit(
                "tahsilat_kayitdegisim_event",
                this.pesinat_model.siparis_no
              );
              this.$store.dispatch("new_pesinat_model_act");
              this.$store.dispatch("pesinat_listesi_yukle_act", data);
              this.loading_pesinat = false;
            });
          } else {
            this.is_kaydet = false;
            this.is_vazgec = false;
          }
        })
        .catch(() => {
          alert("Beklenmeyen Bir Hata Oluştu.");
          this.loading_pesinat = false;
          this.is_kaydet = false;
          this.is_vazgec = false;
        });
    },
  },
};
</script>

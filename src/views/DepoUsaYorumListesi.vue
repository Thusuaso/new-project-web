<template>
  <section>
    <div class="columns is-multiline is-centered">
      <div class="column is-3">
        <Button
          :disabled="!dis_hepsi_liste"
          :class="!dis_hepsi_liste ? 'p-button-success' : 'p-button-primary'"
          @click="hepsi_liste_click"
          label="Hepsi"
        />
      </div>
      <div class="column is-3">
        <Button
          :disabled="!dis_pasif_liste"
          :class="!dis_pasif_liste ? 'p-button-success' : 'p-button-primary'"
          @click="pasif_liste_click"
          label="Pasif Yorumlar"
        />
      </div>
      <div class="column is-3">
        <Button
          :disabled="dis_aktif_yap"
          class="p-button-secondary"
          @click="aktif_click"
          label="Aktif Yap"
        />
      </div>
      <div class="column is-3">
        <Button
          :disabled="dis_vazgec"
          class="p-button-secondary"
          @click="vazgec_click"
          label="Vazgeç"
        />
      </div>
    </div>
    <div class="columns is-centered">
      <DataTable
        :value="!dis_hepsi_liste ? datalist : pasiflist"
        v-model:filters="filters"
        selectionMode="single"
        v-model:selection="select_yorum"
        @row-select="yorumSec($event)"
      >
        <Column field="skuno" header="Sku">
          <template #body="slotprops">
            {{ slotprops.data.skuno }}
          </template>
        </Column>
        <Column field="urunadi" header="Ürün">
          <template #body="slotprops">
            {{ slotprops.data.urunadi }}
          </template>
        </Column>
        <Column field="date" header="Date">
          <template #body="slotprops">
            {{ slotprops.data.date }}
          </template>
        </Column>
        <Column field="rate" header="Rate">
          <template #body="slotprops">
            <Rating
              v-model="slotprops.data.rate"
              :cancel="false"
              :disabled="true"
            />
          </template>
        </Column>
        <Column field="name" header="Name">
          <template #body="slotprops">
            {{ slotprops.data.name }}
          </template>
        </Column>
        <Column field="email" header="Email">
          <template #body="slotprops">
            {{ slotprops.data.email }}
          </template>
        </Column>
        <Column field="review" header="Review">
          <template #body="slotprops">
            {{ slotprops.data.review }}
          </template>
        </Column>
      </DataTable>
    </div>
  </section>
</template>
<script>
import service from "../service/DepoService";

export default {
  data() {
    return {
      datalist: null,
      pasiflist: null,
      select_yorum: null,
      filters: {},
      dis_hepsi_liste: false,
      dis_pasif_liste: true,
      dis_aktif_yap: true,
      loading: false,
      dis_vazgec: true,
    };
  },
  created() {
    this.data_list_yukle();
  },
  methods: {
    data_list_yukle() {
      service.getYorumList().then((data) => {
        this.datalist = data;
        this.pasiflist = data.filter((x) => x.show == false);
      });
    },
    yorumSec(event) {
      this.select_yorum = event.data;
      this.dis_aktif_yap = false;
      this.dis_vazgec = false;
    },
    hepsi_liste_click() {
      this.dis_hepsi_liste = false;
      this.dis_pasif_liste = true;
    },
    pasif_liste_click() {
      this.dis_hepsi_liste = true;
      this.dis_pasif_liste = false;
    },
    vazgec_click() {
      this.dis_vazgec = true;
      this.dis_aktif_yap = true;
      this.select_yorum = null;
    },
    aktif_click() {
      const data = { ...this.select_yorum };

      data.show = true;

      service.urunYorumAktifYap(data).then((status) => {
        if (status) {
          this.dis_vazgec = true;
          this.dis_aktif_yap = true;
          this.select_yorum = null;
          this.data_list_yukle();
        }
      });
    },
  },
};
</script>

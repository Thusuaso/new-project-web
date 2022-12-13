<template>
  <section>
    <br />
    <div class="columns">
      <div class="column">
        <Rating v-model="model.rate" :cancel="false" :disabled="dis_form" />
        <br />
        <span class="p-float-label">
          <InputText
            id="name"
            type="text"
            v-model="model.name"
            :disabled="dis_form"
          />
          <label for="name">Name</label>
        </span>
        <br />

        <span class="p-float-label">
          <InputText
            id="email"
            type="text"
            v-model="model.email"
            :disabled="dis_form"
          />
          <label for="email">Email</label>
        </span>
      </div>
      <div class="column">
        <span class="p-float-label">
          <TextArea
            id="review"
            type="text"
            v-model="model.review"
            :disabled="dis_form"
            rows="8"
            cols="40"
          />
          <label for="review">Review</label>
        </span>
      </div>
      <div class="column">
        <span class="p-float-label">
          <Calendar id="date" v-model="tarih" :disabled="dis_form" />

          <label for="date">Date</label>
        </span>
        <Checkbox
          v-model="model.show"
          :binary="true"
          :disabled="dis_form"
        />Show
      </div>
    </div>
    <br />
    <div class="columns">
      <div class="column is-3">
        <Button
          class="p-button-primary"
          :disabled="dis_yeni"
          label="Yeni"
          @click="btn_yeni_click"
        />
      </div>
      <div class="column is-3">
        <Button
          class="p-button-success"
          :disabled="dis_kaydet"
          label="Ekle"
          @click="btn_kaydet_click"
        />
      </div>
      <div class="column is-3">
        <Button
          class="p-button-warning"
          :disabled="dis_vazgec"
          label="Vazgeç"
          @click="btn_vazgec_click"
        />
      </div>
      <div class="column is-3">
        <Button
          class="p-button-danger"
          :disabled="dis_sil"
          label="Sil"
          @click="btn_sil_click"
        />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <DataTable
          :value="yorumlist"
          dataKey="id"
          selectionMode="single"
          v-model:selection="select_yorum"
          :loading="loading"
          @row-select="select_item($event)"
        >
          <Column field="rate" header="Rating">
            <template #body="slotProps">
              <Rating
                v-model="slotProps.data.rate"
                :cancel="false"
                :disabled="true"
              />
            </template>
          </Column>
          <Column field="date" header="Date">
            <template #body="slotProps">
              {{ slotProps.data.date }}
            </template>
          </Column>
          <Column field="name" header="Name">
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column field="email" header="Email">
            <template #body="slotProps">
              {{ slotProps.data.email }}
            </template>
          </Column>
          <Column field="review" header="Review">
            <template #body="slotProps">
              {{ slotProps.data.review }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </section>
</template>
<script>
import service from "../../service/DepoService";
import LocalService from "../../service/LocalService";
export default {
  data() {
    return {
      model: {
        rate: "",
        email: "",
        review: 0,
      },
      yorumlist: null,
      dis_yeni: false,
      dis_kaydet: true,
      dis_vazgec: true,
      dis_sil: true,
      dis_form: true,
      tarih: new Date(),
      select_yorum: null,
      new_model: null,
      loading: false,
    };
  },
  localService: null,
  props: ["urunid"],
  created() {
    this.loading = true;
    service.getUrunYorumModel().then((data) => {
      this.new_model = data;
      this.model = this.new_model;
    });

    this.yorum_liste_yukle();

    this.localService = new LocalService();
  },
  methods: {
    btn_yeni_click() {
      this.dis_sil = true;
      this.dis_yeni = true;
      this.dis_vazgec = false;
      this.dis_kaydet = false;
      this.dis_form = false;
      this.model = { ...this.new_model };
    },
    btn_vazgec_click() {
      this.dis_sil = true;
      this.dis_yeni = false;
      this.dis_vazgec = true;
      this.dis_kaydet = true;
      this.dis_form = true;
      this.model = { ...this.new_model };
      this.tarih = new Date();
      this.select_yorum = null;
    },
    btn_kaydet_click() {
      this.model.date = this.localService.getDateString(this.tarih);
      this.model.urunid = this.urunid;
      this.loading = true;
      service.urunYorumKaydet(this.model).then((data) => {
        this.model = data;

        this.dis_sil = true;
        this.dis_yeni = false;
        this.dis_vazgec = true;
        this.dis_kaydet = true;
        this.dis_form = true;
        this.model = { ...this.new_model };
        this.tarih = new Date();
        this.select_yorum = null;
        this.yorum_liste_yukle();
      });
    },
    btn_sil_click() {
      this.loading = true;
      service.urunYorumSil(this.model.id).then((status) => {
        if (status) {
          this.dis_sil = true;
          this.dis_yeni = false;
          this.dis_vazgec = true;
          this.dis_kaydet = true;
          this.dis_form = true;
          this.model = { ...this.new_model };
          this.yorum_liste_yukle();
        }
      });
    },
    select_item(event) {
      this.select_yorum = event.data;
      this.tarih = new Date(this.select_yorum.date);

      this.model = { ...this.select_yorum };

      this.dis_yeni = true;
      this.dis_vazgec = false;
      this.dis_kaydet = false;
      this.dis_sil = false;
      this.dis_form = false;
    },
    yorum_liste_yukle() {
      service.getUrunYorumList(this.urunid).then((data) => {
        this.yorumlist = data;
        this.loading = false;
      });
    },
  },
};
</script>

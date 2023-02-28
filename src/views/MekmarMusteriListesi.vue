<template>

  <Card>
    <template #content>
      <div class="columns">
        <div class="column">
          <span class="p-float-label">
            <InputText
              id="username"
              :disabled="dis_form"
              type="text"
              v-model="musteri_detay.kullaniciadi"
            />
            <label for="username">Username</label>
          </span>
        </div>
        <div class="column">
          <span class="p-float-label">
            <InputText
              id="name"
              type="text"
              :disabled="dis_form"
              v-model="musteri_detay.adi"
            />
            <label for="name">Adı</label>
          </span>
        </div>
        <div class="column">
          <span class="p-float-label">
            <InputText
              id="mailadres"
              :disabled="dis_form"
              type="text"
              v-model="musteri_detay.mailadres"
            />
            <label for="mailadres">Mail Adresi</label>
          </span>
        </div>
        <div class="column">
          <span class="p-float-label">
            <InputText
              id="telefon"
              :disabled="dis_form"
              type="text"
              v-model="musteri_detay.telefon"
            />
            <label for="telefon">Telefon</label>
          </span>
        </div>
        <div class="column">
          <Button
            class="p-button-primary"
            :disabled="dis_yeni"
            label="Yeni"
            @click="btn_yeni_click"
          />
        </div>
        <div class="column">
          <Button
            class="p-button-warning"
            :disabled="dis_vazgec"
            label="Vazgeç"
            @click="btn_vazgec_click"
          />
        </div>
        <div class="column">
          <Button
            class="p-button-success"
            :disabled="dis_kaydet"
            label="Kaydet"
            @click="btn_kaydet_click"
          />
        </div>
        <div class="column">
          <Button
            class="p-button-danger"
            :disabled="dis_sil"
            label="Sil"
            @click="btn_sil_click"
          />
        </div>
      </div>
    </template>
  </Card>
  <Card>
    <template #content>
      <div class="columns">
        <div class="column">
          <DataTable
            :value="musteri_listesi"
            v-model:filters="filters"
            filterDisplay="row"
            selectionMode="single"
            v-model:selection="select_musteri"
            @row-select="musteriSec($event)"
          >
            <Column
              field="id"
              header="ID"
              headerStyle="width:80px;"
              bodyStyle="text-align:center;"
            >
              <template #body="slotProps">
                {{ slotProps.data.id }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                    <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'"/>
                </template>
            </Column>
            <Column field="kullaniciadi" header="Kullanıcı Adı">
              <template #body="slotProps">
                {{ slotProps.data.kullaniciadi }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                      <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'"/>
                  </template>
            </Column>
            <Column field="adi" header="Adı">
              <template #body="slotProps">
                {{ slotProps.data.adi }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                      <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'"/>
                  </template>
            </Column>
            <Column field="mailadres" header="Mail">
              <template #body="slotProps">
                {{ slotProps.data.mailadres }}
              </template>
            </Column>
            <Column field="telefon" header="Telefon">
              <template #body="slotProps">
                {{ slotProps.data.telefon }}
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </template>
  </Card>
</template>
<script>
import service from "../service/MekmarDoktorService";
// import store from "@/store";
import { FilterMatchMode } from 'primevue/api';
export default {
  data() {
    return {
      filters: {
        'id': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'kullaniciadi': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'adi': { value: null, matchMode: FilterMatchMode.STARTS_WITH }

        
      },
      musteri_listesi: null,
      select_musteri: null,
      dis_yeni: false,
      dis_vazgec: true,
      dis_kaydet: true,
      dis_sil: true,
      dis_form: true,
      musteri_detay: {
        kullaniciadi: "",
        adi: "",
        mailadres: "",
        telefon: "",
      },
    };
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    service.getMusteriListesi().then((data) => {
      next((vm) => {
        vm.musteri_listesi = data.musteri_listesi;
        vm.musteri_detay = data.musteri_model;
      });
    });
  },
  methods: {
    musteriSec(event) {
      this.select_musteri = event.data;

      this.musteri_detay = this.select_musteri;
      this.dis_yeni = true;
      this.dis_vazgec = false;
      this.dis_kaydet = false;
      this.dis_sil = false;
      this.dis_form = false;
    },
    btn_yeni_click() {
      this.dis_yeni = true;
      this.dis_vazgec = false;
      this.dis_kaydet = false;
      this.dis_sil = true;
      this.dis_form = false;

      this.yeniMusteriDetay();
      this.select_musteri = null;
    },
    btn_vazgec_click() {
      this.dis_yeni = false;
      this.dis_vazgec = true;
      this.dis_kaydet = true;
      this.dis_sil = true;
      this.dis_form = true;
      this.yeniMusteriDetay();
      this.select_musteri = null;
    },
    btn_sil_click() {

      service.musteriSil(this.musteri_detay.id).then((status) => {
        if (status) {
          this.yeniMusteriDetay();
          this.dis_yeni = false;
          this.dis_kaydet = true;
          this.dis_vazgec = true;
          this.dis_sil = true;
          this.dis_form = true;
          this.select_musteri = null;
          this.listeYukle();
          this.$toast.add({ severity: 'success', summary: 'Username Silme', detail: 'Username Başarıyla Silindi.', life: 3000 });

        } else {
          this.$toast.add({ severity: 'error', summary: 'Username Silme', detail: 'Username Silme Başarısız.', life: 3000 });

        }
      });
    },

    btn_kaydet_click() {
      if (this.musteri_detay.kullaniciadi == "") {
        alert("Kullanıcı Adı Boş Geçilemez.");

        return;
      }

      if (this.select_musteri == null) {
        this.musteriKaydet();
      } else {
        //müşteri güncelleme
        this.musteriGuncelle();
      }
    },
    listeYukle() {
      service.getMusteriListesi().then((data) => {
        this.musteri_listesi = data.musteri_listesi;
      });
    },
    yeniMusteriDetay() {
      service.getYeniMusteriDetay().then((data) => {
        this.musteri_detay = data;
      });
    },
    musteriKaydet() {
      service.yeniMusteriKaydet(this.musteri_detay).then((status) => {
        if (status) {
          this.dis_yeni = false;
          this.dis_vazgec = true;
          this.dis_kaydet = true;
          this.dis_form = true;
          this.dis_sil = true;
          this.listeYukle();
          this.yeniMusteriDetay();
          this.select_musteri = null;
          this.$toast.add({ severity: 'success', summary: 'Username Kayıt', detail: 'Username Başarıyla Kaydedildi.', life: 3000 });
        } else {
          this.$toast.add({ severity: 'error', summary: 'Username Kayıt', detail: 'Username Kayıt Başarısız', life: 3000 });

        }
      });
    },
    musteriGuncelle() {
      service.musteriGuncelle(this.musteri_detay).then((status) => {
        if (status) {
          this.dis_yeni = false;
          this.dis_vazgec = true;
          this.dis_kaydet = true;
          this.dis_form = true;
          this.dis_sil = true;
          this.listeYukle();
          this.yeniMusteriDetay();
          this.select_musteri = null;
          this.$toast.add({ severity: 'success', summary: 'Username Güncelleme', detail: 'Username Başarıyla Güncellendi.', life: 3000 });

        } else {
          this.$toast.add({ severity: 'error', summary: 'Username Güncelleme', detail: 'Username Güncelleme Hata', life: 3000 });

        }
      });
    },
  },
};
</script>

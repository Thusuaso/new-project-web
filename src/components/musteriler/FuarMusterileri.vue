<template>
  <div>
    <Button class="p-button-primary" @click="newCust" label="Yeni"></Button>
    <DataTable
      v-model:value="fuarMusteri"
      v-if="fuarMusteri.length > 0"
      v-model:filters="filters"
      filterDisplay="row"
      selectionMode="single"
      v-model:selection="select_fuar_musteri"
      @row-select="fuar_musteri_secim_event($event)"
      :scrollable="true"
      scrollHeight="400px"
      :resizableColumns="true" 
      columnResizeMode="expand" 
      showGridlines
    >
      <Column field="customer" header="Müşteri Adı">
        <template #filter="{ filterModel, filterCallback }">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
            placeholder="Search by -" v-tooltip.top.focus="'Filter as you type'" />
        </template>
      </Column>
      <Column field="company" header="Şirket"></Column>
      <Column field="email" header="Mail"></Column>
      <Column field="phone" header="Telefon"></Column>
      <Column field="adress" header="Adres"></Column>
      <Column field="satisci" header="Satışçı">
        <template #body="slotProps">
          {{ slotProps.data.satisci.toUpperCase() }}
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="fuarCustForm"
      header="Fuar Müşteri Ayrıntı"
      :modal="true"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="{ width: '65vw' }"
    >
      <br />
      <div class="columns">
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="musteri"
              type="text"
              v-model="fuarMusteriAyrinti.customer"
            />
            <label for="musteri">Müşteri Adı</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="company"
              type="text"
              v-model="fuarMusteriAyrinti.company"
            />
            <label for="company">Şirket</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
              <AutoComplete
              id="ulkeAdi"
                v-model="select_ulke"
                :suggestions="filter_ulke_list"
                @complete="ulke_complete_event($event)"
                field="ulkeAdi"
              />
            <label for="ulkeAdi">Ülke</label>

          </span>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="email"
              type="text"
              v-model="fuarMusteriAyrinti.email"
            />
            <label for="email">Email</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="phone"
              type="text"
              v-model="fuarMusteriAyrinti.phone"
            />
            <label for="phone">Telefon</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <Textarea
              id="address"
              type="text"
              rows="5"
              cols="30"
              v-model="fuarMusteriAyrinti.adress"
            />
            <label for="address">Adres</label>
          </span>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <span class="p-float-label">
            <InputText
              id="satisci"
              type="text"
              v-model="fuarMusteriAyrinti.satisci"
              @input="fuarMusteriAyrinti.satisci = fuarMusteriAyrinti.satisci.toUpperCase()"
            />
            <label for="satisci">Satışçı</label>
          </span>
        </div>
        <div class="column">
          <fileUpload v-if="fuarMusteriAyrinti.linkOn != null" :baslik="'Ön Yüz'" @sunucuDosyaYolla="fuarDosyaGonder($event)">
          </fileUpload>
          <fileUpload v-if="fuarMusteriAyrinti.linkArka != null" :baslik="'Arka Yüz'"
            @sunucuDosyaYolla="fuarDosyaGonder2($event)"></fileUpload>
        </div>
      </div>
      
      <div class="columns">
        <div class="column is-6">
          <img id="onYuz" :src="fuarMusteriAyrinti.linkOn" />
        </div>
        <div class="column is-6">
          <img id="arkaYuz" :src="fuarMusteriAyrinti.linkArka" />
        </div>
      </div>
      <Button class="p-button-info" @click="update" label="Güncelle"></Button>
      <Button
        class="p-button-danger"
        @click="deleteMust(fuarMusteriAyrinti.id)"
        label="Sil"
      ></Button>
    </Dialog>

    <Dialog
      v-model:visible="newCustForm"
      header="Fuar Yeni Müşteri Kayıt"
      :modal="true"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="{ width: '65vw' }"
    >
      <br />

      <div class="columns">
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="musteri"
              type="text"
              v-model="newFuarMusteri.customer"
            />
            <label for="musteri">Müşteri Adı</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="company"
              type="text"
              v-model="newFuarMusteri.company"
            />
            <label for="company">Şirket</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <span class="p-float-label">
              <AutoComplete
                v-model="select_ulke"
                :suggestions="filter_ulke_list"
                @complete="ulke_complete_event($event)"
                field="ulkeAdi"
              />
              <label for="ulkeAdi">Ülke</label>
            </span>
          </span>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <span class="p-float-label">
            <InputText id="email" type="text" v-model="newFuarMusteri.email" />
            <label for="email">Email</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <InputText id="phone" type="text" v-model="newFuarMusteri.phone" />
            <label for="phone">Telefon</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <Textarea
              id="address"
              type="text"
              rows="5"
              cols="30"
              v-model="newFuarMusteri.adress"
            />
            <label for="address">Adres</label>
          </span>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <span class="p-float-label">
            <InputText
              id="satisci"
              type="text"
              v-model="newFuarMusteri.orderer"
              @input="newFuarMusteri.orderer = newFuarMusteri.orderer.toUpperCase()"
            />
            <label for="satisci">Satışçı</label>
          </span>
        </div>
        <div class="column">
          <fileUpload
            :baslik="'Ön Yüz'"
            @sunucuDosyaYolla="fuarDosyaGonder($event)"
          ></fileUpload>
          <fileUpload
            :baslik="'Arka Yüz'"
            @sunucuDosyaYolla="fuarDosyaGonder2($event)"
          ></fileUpload>
        </div>
      </div>
      <Button
        class="p-button-info"
        @click="save"
        label="Kaydet"
      ></Button>
    </Dialog>
  </div>
</template>

<script>
import siparisService from "@/service/SiparisService";
import KullaniciService from "@/service/KullaniciService";

import service from "@/service/MusteriIslemService";
import fileUpload from "@/components/shared/CustomInputFile";
import { mapGetters } from "vuex";
import digitalOcean from "@/service/DigitalOceanService";

import { FilterMatchMode } from 'primevue/api'
export default {
  components: {
    fileUpload,
  },
  computed: {
    ...mapGetters(["fuarMusteri"]),
  },
  data() {
    return {
      filters: {
        customer:{ value: null, matchMode: FilterMatchMode.STARTS_WITH}
      },
      fuarCustForm: false,
      fuarList: [],
      select_ulke: "",
      newCustForm: false,
      newFuarMusteri: {
        customer: "",
        company: "",
        email: "",
        phone: "",
        country: 0,
        user: 0,
        adress: "",
        orderer: "",
        linkArka: "",
        linkOn: "",
      },
      filter_ulke_list: [],
      musteri_ulke_list: [],
      fuarMusteriAyrinti: [],
      userId: null,
      select_fuar_musteri:[]
    };
  },
  created() {
    service.getFuarMusterilerList().then((data) => {
      this.$store.dispatch("fuar_musteri_load_act", data);
    });

    this.kullaniciService = new KullaniciService();
    siparisService.getUlkeList().then((data) => {
      this.musteri_ulke_list = data;
    });
    this.kullaniciService.getKullaniciList().then((data) => {
      this.kullaniciList = data;
    });
    this.userId = this.$store.getters.__getUserId;
  },
  methods: {
    resetData() {
      this.newFuarMusteri= {
        customer: "",
        company: "",
        email: "",
        phone: "",
        country: 0,
        user: 0,
        adress: "",
        orderer: "",
        linkArka: "",
        linkOn: ""
      }
    },
    fuarDosyaGonder(event) {
      if (this.newFuarMusteri != "") {
        digitalOcean.fotoGonderFuar(event, this.newFuarMusteri.customer);

      } else {
        digitalOcean.fotoGonderFuar(event, this.fuarMusteriAyrinti.customer);

      }
      
      this.newFuarMusteri.linkOn = `https://mekmar-image.fra1.digitaloceanspaces.com/fuar/${
        this.newFuarMusteri.customer + " " + event.name

        }`;
      this.fuarMusteriAyrinti.linkOn = `https://mekmar-image.fra1.digitaloceanspaces.com/fuar/${this.fuarMusteriAyrinti.customer + " " + event.name

        }`;
      alert('Başarıyla Yüklendi')

    },
    fuarDosyaGonder2(event) {
      if (this.newFuarMusteri != "") {
        digitalOcean.fotoGonderFuar(event, this.newFuarMusteri.customer);

      } else {
        digitalOcean.fotoGonderFuar(event, this.fuarMusteriAyrinti.customer);

      }
      digitalOcean.fotoGonderFuar(event, this.newFuarMusteri.customer);
      this.newFuarMusteri.linkArka = `https://mekmar-image.fra1.digitaloceanspaces.com/fuar/${
        this.newFuarMusteri.customer + " " + event.name
        }`;
      this.fuarMusteriAyrinti.linkArka = `https://mekmar-image.fra1.digitaloceanspaces.com/fuar/${this.fuarMusteriAyrinti.customer + " " + event.name

        }`;
        alert('Başarıyla Yüklendi')
    },
    deleteMust(event) {
      service.setNewFuarMusterileSil(event).then((data) => {
        if (data.status) {
          this.$toast.add({
            severity: "success",
            summary: "Sil",
            detail: "Silme İşlemi Başarılı",
            life: 3000,
          });
          this.$store.dispatch("fuar_musteri_load_act", data.liste);

          this.fuarCustForm = false;
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Sil",
            detail: "Silme İşlemi Hatalı",
            life: 3000,
          });
        }
      });
    },
    newCust() {
      this.newCustForm = true;
      this.select_ulke = "";
    },
    fuar_musteri_secim_event(event) {
      service.getFuarMusterilerListAyrinti(event.data.id).then((data) => {
        this.fuarMusteriAyrinti = data[0];
        this.select_ulke = this.musteri_ulke_list.filter(
          (x) => x.id == this.fuarMusteriAyrinti.country
        )[0];

        this.fuarCustForm = true;
      });
    },
    ulke_complete_event(event) {
      this.filter_ulke_list = this.musteri_ulke_list.filter((x) => {
        return (
          x.ulkeAdi
            .toString()
            .toLowerCase()
            .indexOf(event.query.toString().toLowerCase()) >= 0
        );
      });
    },
    save() {
      this.newFuarMusteri.country = this.select_ulke.id;
      this.newFuarMusteri.user = this.userId;
      service.setNewFuarMusteriler(this.newFuarMusteri).then((data) => {
        if (data.status) {
          this.$toast.add({
            severity: "success",
            summary: "Kayıt",
            detail: "Kayıt İşlemi Başarılı",
            life: 3000,
          });
          this.$store.dispatch("fuar_musteri_load_act", data.liste);
          this.resetData()
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Kayıt",
            detail: "Kayıt İşlemi Hatalı",
            life: 3000,
          });
        }
      });
    },
    update() {
      this.fuarMusteriAyrinti.country = this.select_ulke.id;
      service
        .setNewFuarMusterilerGuncelle(this.fuarMusteriAyrinti)
        .then((data) => {
          if (data.status) {
            this.$toast.add({
              severity: "success",
              summary: "Güncelleme",
              detail: "Güncelleme İşlemi Başarılı",
              life: 3000,
            });
            this.$store.dispatch("fuar_musteri_load_act", data.liste);
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Güncelleme",
              detail: "Güncelleme İşlemi Hatalı",
              life: 3000,
            });
          }
        });
    },
  },
};
</script>

<style scoped></style>

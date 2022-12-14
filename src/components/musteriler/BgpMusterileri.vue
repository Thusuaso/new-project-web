<template>
  <div>
    <Button class="p-button-primary" @click="newCust" label="Yeni"></Button>
    <DataTable
      :value="bgpMusteri"
      v-if="bgpMusteri.length > 0"
      responsiveLayout="scroll"
      v-model:filters="filters"
      filterDisplay="row"
      selectionMode="single"
      v-model:selection="select_bgp_musteri"
      @row-select="bgp_musteri_secim_event($event)"
      :scrollable="true" 
      scrollHeight="400px"
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
      <Column field="country" header="Ülke"></Column>
    </DataTable>

    <Dialog
      v-model:visible="bgpCustForm"
      header="Bgp Müşteri Ayrıntı"
      :modal="true"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="{ width: '60vw' }"
    >
      <br />
      <div class="columns">
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="musteri"
              type="text"
              v-model="bgpMusteriAyrinti.customer"
            />
            <label for="musteri">Müşteri Adı</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="company"
              type="text"
              v-model="bgpMusteriAyrinti.company"
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
              v-model="bgpMusteriAyrinti.email"
            />
            <label for="email">Email</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="phone"
              type="text"
              v-model="bgpMusteriAyrinti.phone"
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
              v-model="bgpMusteriAyrinti.adress"
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
              v-model="bgpMusteriAyrinti.satisci"
            />
            <label for="satisci">Satışçı</label>
          </span>
        </div>
      </div>
      <Button class="p-button-info" @click="update" label="Güncelle"></Button>
      <Button
        class="p-button-danger"
        @click="deleteMust(bgpMusteriAyrinti.id)"
        label="Sil"
      ></Button>
    </Dialog>

    <Dialog
      v-model:visible="newCustForm"
      header="Bgp Yeni Müşteri Kayıt"
      :modal="true"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="{ width: '60vw' }"
    >
      <br />

      <div class="columns">
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="musteri"
              type="text"
              v-model="newBgpMusteri.customer"
            />
            <label for="musteri">Müşteri Adı</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="company"
              type="text"
              v-model="newBgpMusteri.company"
            />
            <label for="company">Şirket</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <AutoComplete
              id="ulke"
              v-model="select_ulke"
              :suggestions="filter_ulke_list"
              @complete="ulke_complete_event($event)"
              field="ulkeAdi"
            />
            <label for="ulke">Ülke</label>
          </span>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <span class="p-float-label">
            <InputText id="email" type="text" v-model="newBgpMusteri.email" />
            <label for="email">Email</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <InputText id="phone" type="text" v-model="newBgpMusteri.phone" />
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
              v-model="newBgpMusteri.adress"
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
              v-model="newBgpMusteri.satisci"
            />
            <label for="satisci">Satışçı</label>
          </span>
        </div>
      </div>
      <Button class="p-button-info" @click="save" label="Kaydet"></Button>
    </Dialog>
  </div>
</template>

<script>
import siparisService from "@/service/SiparisService";
import KullaniciService from "@/service/KullaniciService";

import service from "@/service/MusteriIslemService";
import { mapGetters } from "vuex";
import { FilterMatchMode } from 'primevue/api'

export default {
  components: {},
  computed: {
    ...mapGetters(["bgpMusteri"]),
  },
  data() {
    return {
      filters: {
        customer:{ value: null, matchMode: FilterMatchMode.STARTS_WITH}
      },
      bgpCustForm: false,
      bgpList: [],
      select_ulke: "",
      newCustForm: false,
      newBgpMusteri: {
        customer: "",
        company: "",
        email: "",
        phone: "",
        country: 0,
        user: 0,
        adress: "",
        orderer: "",
      },
      filter_ulke_list: [],
      musteri_ulke_list: [],
      bgpMusteriAyrinti: [],
      userId: null,
      select_bgp_musteri: [],
    };
  },
  created() {
    this.userId = this.$store.getters.__getUserId;

    service.getBgpMusterilerList().then((data) => {
      if (this.userId == 10 || this.userId == 47 || this.userId == 13) {
        this.$store.dispatch("bgp_musteri_load_act", data);
      } else {
        const result = data.filter((x) => x.user == this.userId);
        this.$store.dispatch("bgp_musteri_load_act", result);
      }
    });

    this.kullaniciService = new KullaniciService();
    siparisService.getUlkeList().then((data) => {
      this.musteri_ulke_list = data;
    });
    this.kullaniciService.getKullaniciList().then((data) => {
      this.kullaniciList = data;
    });
  },
  methods: {
    resetData() {
      this.newBgpMusteri= {
      customer: "",
      company: "",
      email: "",
      phone: "",
      country: 0,
      user: 0,
      adress: "",
      orderer: "",
      }
    },
    deleteMust(event) {
      service.setNewBgpMusterileSil(event).then((data) => {
        if (data.status) {
          this.$toast.add({
            severity: "success",
            summary: "Sil",
            detail: "Silme İşlemi Başarılı",
            life: 3000,
          });
          if (this.userId == 10 || this.userId == 47 || this.userId == 13) {
            this.$store.dispatch("bgp_musteri_load_act", data.liste);
          } else {
            const result = data.liste.filter((x) => x.user == this.userId);
            this.$store.dispatch("bgp_musteri_load_act", result);
          }
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
    bgp_musteri_secim_event(event) {
      service.getBgpMusterilerListAyrinti(event.data.id).then((data) => {
        this.bgpMusteriAyrinti = data[0];
        this.select_ulke = this.musteri_ulke_list.filter(
          (x) => x.ulkeAdi == this.bgpMusteriAyrinti.country
        )[0];

        this.bgpCustForm = true;
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
      this.newBgpMusteri.country = this.select_ulke.ulkeAdi;
      this.newBgpMusteri.user = this.userId;
      service.setNewBgpMusteriler(this.newBgpMusteri).then((data) => {
        if (data.status) {
          this.$toast.add({
            severity: "success",
            summary: "Kayıt",
            detail: "Kayıt İşlemi Başarılı",
            life: 3000,
          });
          this.resetData()
          if (this.userId == 10 || this.userId == 47 || this.userId == 13) {
            this.$store.dispatch("bgp_musteri_load_act", data.liste);
          } else {
            const result = data.liste.filter((x) => x.user == this.userId);
            this.$store.dispatch("bgp_musteri_load_act", result);
          }
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
      this.bgpMusteriAyrinti.country = this.select_ulke.ulkeAdi;
      service
        .setNewBgpMusterilerGuncelle(this.bgpMusteriAyrinti)
        .then((data) => {
          if (data.status) {
            this.$toast.add({
              severity: "success",
              summary: "Güncelleme",
              detail: "Güncelleme İşlemi Başarılı",
              life: 3000,
            });
            if (this.userId == 10 || this.userId == 47 || this.userId == 13) {
              this.$store.dispatch("bgp_musteri_load_act", data.liste);
            } else {
              const result = data.liste.filter((x) => x.user == this.userId);
              this.$store.dispatch("bgp_musteri_load_act", result);
            }
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

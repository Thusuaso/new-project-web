<template>
  <div>
    <Button class="p-button-primary" @click="isNew" label="Yeni"></Button>

    <DataTable
      :value="teklifMusteri"
      responsiveLayout="scroll"
      v-model:filters="filters"
      filterDisplay="row"
      selectionMode="single"
      v-model:selection="select_teklif_musteri"
      @row-select="teklif_musteri_secim_event($event)"
      columnResizeMode="expand" showGridlines 

    >
      <Column field="customer" header="Müşteri Adı" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by -"
            v-tooltip.top.focus="'Filter as you type'"
          />
        </template>
      </Column>
      <Column field="company" header="Şirket"></Column>
      <Column field="email" header="Mail"></Column>
      <Column field="phone" header="Telefon"></Column>
      <Column field="adress" header="Adres"></Column>
      <Column field="countryName" header="Ülke" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
            placeholder="Search by -" v-tooltip.top.focus="'Filter as you type'" style="width:50px;" />
        </template>
      </Column>
      <Column field="username" header="Satışçı" :showFilterMenu="false">

        <template #filter="{ filterModel, filterCallback }">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
            placeholder="Search by -" v-tooltip.top.focus="'Filter as you type'" style="width:50px;" />
        </template>
      </Column>
    </DataTable>
    <Dialog
      v-model:visible="teklifMusteriForm"
      header="Teklif Müşteriler Ayrıntı"
      :modal="true"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="{ width: '55vw' }"
    >
      <br />
      <div class="columns">
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="musteri"
              type="text"
              v-model="teklifMusteriAyrinti.customer"
            />
            <label for="musteri">Müşteri Adı</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="company"
              type="text"
              v-model="teklifMusteriAyrinti.company"
            />
            <label for="company">Şirket</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <AutoComplete
              v-model="select_ulke"
              :suggestions="filter_ulke_list"
              @complete="ulke_complete_event($event)"
              field="ulkeAdi"
            />
            <label for="ulkeAdi">ÜLKE</label>
          </span>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="email"
              type="text"
              v-model="teklifMusteriAyrinti.email"
            />
            <label for="email">Email</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="phone"
              type="text"
              v-model="teklifMusteriAyrinti.phone"
            />
            <label for="phone">Telefon</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <Textarea
              id="adress"
              type="text"
              rows="5"
              cols="30"
              v-model="teklifMusteriAyrinti.adress"
            />
            <label for="adress">Adress</label>
          </span>
        </div>
      </div>

      <div class="columns">
        <div class="column is-3">
          <Button
            class="p-button-info"
            @click="update"
            label="Güncelle"
          ></Button>
        </div>
        <div class="column is-3">
          <Button
            class="p-button-danger"
            @click="deleteMust(teklifMusteriAyrinti.id)"
            label="Sil"
          ></Button>
        </div>
        <div class="column is-3">
          <Button class="p-button-primary" @click="copyToCustomers" label="Müşterilere Kopyala" />
        </div> 
      </div>
    </Dialog>
    <Dialog
      v-model:visible="teklifMusteriFormNew"
      header="Teklif Müşteriler Yeni"
      :modal="true"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="{ width: '55vw' }"
    >
      <br />
      <div class="columns">
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="musteri"
              type="text"
              v-model="newTeklifMusteri.customer"
            />
            <label for="musteri">Müşteri Adı</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="company"
              type="text"
              v-model="newTeklifMusteri.company"
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
              v-model="newTeklifMusteri.email"
            />
            <label for="email">Email</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <InputText
              id="phone"
              type="text"
              v-model="newTeklifMusteri.phone"
            />
            <label for="phone">Telefon</label>
          </span>
        </div>
        <div class="column is-4">
          <span class="p-float-label">
            <Textarea
              id="adress"
              type="text"
              rows="5"
              cols="30"
              v-model="newTeklifMusteri.adress"
            />
            <label for="adress">Adress</label>
          </span>
        </div>
      </div>
      <Button class="p-button-info" @click="save" label="Kaydet"></Button>
    </Dialog>
  </div>
</template>
<script>
import service from "@/service/MusteriIslemService";
import { mapGetters } from "vuex";
import siparisService from "@/service/SiparisService";
import KullaniciService from "@/service/KullaniciService";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      filters: {
        customer: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        countryName: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
      },
      select_teklif_musteri: null,
      teklifMusteriForm: false,
      select_ulke: "",
      newTeklifMusteri: {
        customer: "",
        company: "",
        email: "",
        phone: "",
        country: 0,
        adress: "",
        user: 0,
      },
      teklifMusteriFormNew: false,
      filter_ulke_list: [],
      serviceSip: null,
      musteri_ulke_list: [],
      kullaniciService: null,
      kullaniciList: null,
      userId: null,
    };
  },
  computed: {
    ...mapGetters(["teklifMusteri", "teklifMusteriAyrinti"]),
  },

  created() {
    this.userId = this.$store.getters.__getUserId;

    service.getTeklifMusteriler().then((data) => {
      if (this.userId == 10 || this.userId == 47 || this.userId == 13) {
        this.$store.dispatch("teklif_musteri_load_act", data)
      } else {
        const result = data.filter((x) => x.user == this.userId);
        this.$store.dispatch("teklif_musteri_load_act", result)
      }
    }),
    this.kullaniciService = new KullaniciService();
    siparisService.getUlkeList().then((data) => {
      this.musteri_ulke_list = data;
    });
    this.kullaniciService.getKullaniciList().then((data) => {
      this.kullaniciList = data;
    });
  },
  methods: {
    copyToCustomers() {
      if (confirm('Müşterilere kopyalamak istediğinize emin misiniz ?')) {

      service.setCustomersCopyTo(this.teklifMusteriAyrinti).then(data => {
        if (data) {
            this.$toast.add({ severity: 'success', summary: 'Kopyalama', detail: 'Müşterilere Başarıyla Kopayalandı', life: 3000 })

        }
      })
      }

    },
    resetData() {
      this.newTeklifMusteri= {
        customer: "",
        company: "",
        email: "",
        phone: "",
        country: 0,
        adress: "",
        user: 0,
      }
    },
    isNew() {
      this.teklifMusteriFormNew = true;
      this.select_ulke = "";
      
    },
    deleteMust(event) {
      service.setTeklifMusterilerSil(event).then((data) => {
        if (data.status) {
          this.$toast.add({
            severity: "success",
            summary: "Sil",
            detail: "Silme İşlemi Başarılı",
            life: 3000,
          });
          if (this.userId == 10 || this.userId == 47 || this.userId == 13) {
            this.$store.dispatch("teklif_musteri_load_act", data.result)
            
          } else {
            const result = data.result.filter((x) => x.user == this.userId);
            this.$store.dispatch("teklif_musteri_load_act", result)
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
      this.newTeklifMusteri.country = this.select_ulke.id;
      this.newTeklifMusteri.user = this.userId;
      service.setNewTeklifMusteriler(this.newTeklifMusteri).then((data) => {
        if (data.status) {
          this.$toast.add({
            severity: "success",
            summary: "Kayıt",
            detail: "Kayıt İşlemi Başarılı",
            life: 3000,
            
          });
          this.resetData()
          if (this.userId == 10 || this.userId == 47 || this.userId == 13) {
            this.$store.dispatch("teklif_musteri_load_act", data.result)
          } else {
            const result = data.result.filter((x) => x.user == this.userId);
            this.$store.dispatch("teklif_musteri_load_act", result)
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
    newCust() {
      service.setNewTeklifMusteriler(this.newTeklifMusteri).then((data) => {
        console.log("setNewTeklifMusteriler", data);
      });
    },
    teklif_musteri_secim_event(event) {
      service.getTeklifMusterilerAyrinti(event.data.id).then((data) => {
        this.$store.dispatch("teklif_musteri_ayrinti_load_act", data);
        this.select_ulke = this.musteri_ulke_list.filter(
          (x) => x.id == this.teklifMusteriAyrinti.country
        )[0];

        this.teklifMusteriForm = true;
      });
    },
    update() {
      this.teklifMusteriAyrinti.country = this.select_ulke.id;
      this.teklifMusteriAyrinti.user = this.userId;

      service.setTeklifMusteriler(this.teklifMusteriAyrinti).then((data) => {
        if (data.status) {
          this.$toast.add({
            severity: "success",
            summary: "Güncelleme",
            detail: "Güncelleme İşlemi Başarılı",
            life: 3000,
          });
          
          if (this.userId == 10 || this.userId == 47 || this.userId == 13) {
            this.$store.dispatch("teklif_musteri_load_act", data.result)
          } else {
            const result = data.result.filter((x) => x.user == this.userId);
            this.$store.dispatch("teklif_musteri_load_act", result)
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
  mounted() {},
};
</script>

<style scoped></style>

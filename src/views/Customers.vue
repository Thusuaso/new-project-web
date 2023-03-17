<template>
  <div>
    <div
      class="card"
      v-for="item in satisci_a"
      :key="item"
      style="margin-bottom: 50px; height: 200px"
    >
      <header class="card-header">
        <p class="card-header-title">{{ item.musteriadi }}</p>
        <img
          width="50"
          height="50"
          :src="'https://cdn.mekmarimage.com/countryLogo/' + item.flag"
        />
        <p style="margin-right: 30px; margin-left: 30px; margin-top: 10px">
          {{ item.oncelik }}
        </p>
      </header>
      <div class="card-content" style="height: 100px">
        <div class="content">
          {{ item.aciklama }}

          <br />
          <time datetime="2016-1-1">{{ item.mail }}</time>
        </div>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">{{ item.temsilci }}</p>
        <Button
          class="card-footer-item"
          @click="musteri_sec(item, 'A')"
          label="Detay Aç"
          style="font-family: 'Sarabun'"
        />
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
    <div
      class="card"
      v-for="item in satisci_b"
      :key="item"
      style="margin-bottom: 50px; height: 200px"
    >
      <header class="card-header">
        <p class="card-header-title">{{ item.musteriadi }}</p>
        <p style="margin-right: 20px; margin-top: 10px">{{ item.oncelik }}</p>
      </header>
      <div class="card-content" style="height: 100px">
        <div class="content">
          {{ item.aciklama }}

          <br />
          <time datetime="2016-1-1">{{ item.mail }}</time>
        </div>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">{{ item.temsilci }}</p>
        <Button
          class="card-footer-item"
          @click="musteri_sec(item, 'B')"
          label="Detay Aç"
          style="font-family: 'Sarabun'"
        />
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
    <div
      class="card"
      v-for="item in satisci_c"
      :key="item"
      style="margin-bottom: 50px; height: 200px"
    >
      <header class="card-header">
        <p class="card-header-title">{{ item.musteriadi }}</p>
        <p style="margin-right: 20px; margin-top: 10px">{{ item.oncelik }}</p>
      </header>
      <div class="card-content" style="height: 100px">
        <div class="content">
          {{ item.aciklama }}

          <br />
          <time datetime="2016-1-1">{{ item.mail }}</time>
        </div>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">{{ item.temsilci }}</p>
        <Button
          class="card-footer-item"
          @click="musteri_sec(item, 'C')"
          label="Detay Aç"
          style="font-family: 'Sarabun'"
        />
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
  <!--Dialogs-->
  <Transition name="bounce">
    <Dialog
      v-model:visible="is_satisform"
      position="top"
      header="Ayrıntı Listesi"
      :modal="true"
    >
      <section>
        <div class="columns">
          <div class="column is-12">
            <CustomersDetay
              :select_satisci="select_satisci"
              :select_musteri_id="select_musteri_id"
              :oncelik="oncelik"
              :satisciDurum="satisciDurum"
              :teklifId="teklifId"
            />
          </div>
        </div>
      </section>
    </Dialog>
  </Transition>
</template>
<script>
import service from "../service/Customers";
import { mapGetters } from "vuex";
import CustomersDetay from "../components/customers/CustomersDetay";
export default {
  components: {
    CustomersDetay,
  },
  computed: {
    ...mapGetters([
      "servis_adres",
      "satisci_a",
      "satisci_b",
      "satisci_c",
      "customers_all",
    ]),
  },
  created() {
    this.users = this.$store.getters.__getUsername;
    this.usersId = this.$store.getters.__getUserId;

    this.allDataLoad(this.users, this.usersId);
  },
  data() {
    return {
      usersId:null,
      users: null,
      is_satisform: false,
      select_musteri: null,
      oncelik: null,
      select_musteri_id: null,
      satisciDurum: null,
      teklifId: null,
      select_satisci: null,
    };
  },

  methods: {
    allDataLoad(users, usersId) {
      this.$store.dispatch("fullscreenLoadingAct",true);
      if (users == "Semih") {
        service.getCustomersListAll().then((data) => {
          this.$store.dispatch("customers_yukle_all_act", data);
          this.$store.dispatch("customers_yukle_act", data);
          this.$store.dispatch("fullscreenLoadingAct", false);

        });
      } else {
        service.getCustomersListe(usersId).then((data) => {
          this.$store.dispatch("customers_yukle_all_act", data);
          this.$store.dispatch("customers_yukle_act", data);
          this.$store.dispatch("fullscreenLoadingAct", false);
        });
      }
    },
    musteri_sec(event, oncelik) {
      this.$store.dispatch('fullscreenLoadingAct', true)

      this.oncelik = oncelik;
      this.select_musteri = event.musteriadi;
      this.select_musteri_id = event.id;
      this.satisciDurum = event.satisciDurum;
      this.teklifId = event.teklifSira;
      this.$store.dispatch("customers_musteriAdi_yukle_act", event.musteriadi);
      service.getCustomersDetayListe(event.musteriadi).then((data) => {
        this.select_satisci = event;
        this.$store.dispatch("musteri_ayrinti_yukle_act", data.musteriDetay);
        this.$store.dispatch(
          "musteri_teklifler_ayrinti_yukle_act",
          data.tekliflermusteriDetay
        );
        this.$store.dispatch('fullscreenLoadingAct', false)


        this.is_satisform = true;

      });
    },
  },
  mounted() {
    this.emitter.on("satisciMusteri", (data) => {
      this.musteri_sec(data);
    });
    this.emitter.on("followStatus", (data) => {
      this.is_satisform = data;
      this.searchUlke = null;
      this.search = null;
      this.isSearchCountry = false;
      this.isSearchCustomers = false;
    });
    this.emitter.on("isSearch", (data) => {
      if (data) {
        this.search = null;
        this.searchUlke = null;
        this.isSearchCountry = false;
        this.isSearchCustomers = false;
      }
    });
  },
};
</script>
<style scoped>
.card{
  margin-top:25px;
}
.card-footer-item{
  display: inline-block;
  float:left;
  text-align:center;
  border:none;
  text-decoration: none;
}
footer{
  background-color:#f8f8f8;
  border:1px solid #e5e5e5;
}
.satisciAlanFlag {
  width: 50px;
  height: 50px;
}

.card {
  display: inline-block;
  width: calc(33.33% - 50px);
  float: left;
  margin-left: 35px;
  height: 150px;
  border-radius: 10px;
  font-family: "Sarabun";
}

#button {
  float: right;
  width: 150px;
}

@media screen and (max-width: 576px) {
  .card {
    display: block;
    width: 100%;
    margin-left: 0px;
    margin-top: 10px;
  }

  #button {
    position: relative;
    left: 50px;
    top: 0px;
    margin: 0px;
    padding: 0px;
  }
}

.oncelika {
  width: 40px;
  height: 40px;
  border: 2px solid gray;
  border-radius: 100%;
  text-align: center;
  line-height: 35px;
  background-color: #7c95a4;
  border: 2px solid;
  color: white;
  font-family: "Sarabun";
}

.oncelikb {
  width: 40px;
  height: 40px;
  border: 2px solid gray;
  border-radius: 100%;
  text-align: center;
  line-height: 35px;
  background-color: #7c95a4;
  color: white;
  font-family: "Sarabun";
  border: 2px solid;
}

.oncelikc {
  width: 40px;
  height: 40px;
  border: 2px solid gray;
  border-radius: 100%;
  text-align: center;
  line-height: 35px;
  background-color: #7c95a4;
  color: white;
  font-family: "Sarabun";
  border: 2px solid;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

.inputText {
  margin-top: -50px;
  margin-bottom: 15px;
  margin-left: 40px;
  width: 350px;
}

@media screen and (max-width: 576px) {
  .inputText {
    margin-top: -50px;
    margin-bottom: 15px;
    margin-left: 40px;
    width: 250px;
  }
}

@import url("https://fonts.googleapis.com/css?family=Sarabun");
</style>

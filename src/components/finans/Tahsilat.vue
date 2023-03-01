<template>
  <br/>
  <div class="grid">
    <div class="col">
      <div class="grid">
        <br/>
        <div class="col-6">
          <span class="p-float-label">
            <InputText id="musteriadi" type="text" :disabled="true" v-model="thmusteri.musteriadi" />
            <label for="musteriadi">Müşteri Adı</label>
          </span>
        </div>
        <br />


        <div class="col-6" style="margin-top:10px;">
          <span class="p-float-label">
            <InputText id="siparisno" type="text" :disabled="true" v-model="thmusteri.siparisno" />
            <label for="siparisno">Sipariş No</label>
          </span>
        </div>
        <br />
        <div class="col-6" style="margin-top:10px;">
        <span class="p-float-label">
          <Calendar @date-select="kurSecim" id="date" type="text" :disabled="is_form" v-model="date" />
          <label for="date">Tarih</label>
        </span>
        </div>
        <br />

        <div class="col-6" style="margin-top:10px;">
        <span class="p-float-label">
          <InputText id="bakiye" type="text" :disabled="true" v-model="thmusteri.bakiye" />
          <label for="bakiye">Bakiye</label>
        </span>
        </div>
        <br />

        <div class="col-6" style="margin-top:10px;">
        <span class="p-float-label">
          <InputText id="bakiye" type="text" :disabled="is_form" v-model="thmusteri.tutar" @input="thmusteri.tutar = thmusteri.tutar.replace(',', '.')" />
          <label for="bakiye">Bakiye</label>
        </span>
        </div>
        <br />

        <div class="col-6" style="margin-top:10px;">
        <span class="p-float-label">
          <InputText id="masraf" type="text" :disabled="is_form" v-model="thmusteri.masraf" @input="thmusteri.masraf = thmusteri.masraf.replace(',', '.')" />
          <label for="masraf">Masraf</label>
        </span>
        </div>
        <br />

        <div class="col-6" style="margin-top:10px;">
        <span class="p-float-label">
          <InputText id="kur" type="text" :disabled="is_form" v-model="thmusteri.kur" />
          <label for="kur">Kur</label>
        </span>
        </div>
        <br />

        <div class="col-6" style="margin-top:10px;">
          <span class="p-float-label">
            <InputText id="not" type="text" :disabled="is_form" v-model="thmusteri.aciklama" />
            <label for="not">Not</label>
          </span>
        </div>
      </div>
    </div>
    <div class="col">
      <DataTable :value="thmusteri_list" selectionMode="single" :selection="select_list" @row-select="tahsilat_secim($event)"
        :scrollable="true" scrollHeight="600px">
        <Column field="tarih" header="Tarih" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ slotProps.data.tarih }}
          </template>
        </Column>
        <Column field="siparisno" header="Sipariş No" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ slotProps.data.siparisno }}
          </template>
        </Column>
        <Column field="tutar" header="Tutar" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.tutar) }}
          </template>
          <template #footer>
            {{ formatPrice(thmusteri_list_toplam_tutar) }}
          </template>
        </Column>
        <Column field="masraf" header="Masraf" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.masraf) }}
          </template>
          <template #footer>
            {{ formatPrice(thmusteri_list_toplam_masraf) }}
          </template>
        </Column>
        <Column field="kur" header="Kur" bodyStyle="text-align:center;">
          <template #body="slotProps">
            {{ slotProps.data.kur }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <div class="grid">
    <div class="col">
      <Button :disabled="is_kaydet" class="p-button-success" @click="kaydet_click" label="Kaydet" />
    </div>
    <div class="col">
      <Button :disabled="is_degistir" @click="degistir_click" class="p-button-info" label="Değiştir" />
    </div>
    <div class="col">
      <Button :disabled="is_sil" class="p-button-danger" label="Sil" @click="sil_click" />
    </div>
  </div>



</template>
<script>
import { mapGetters } from "vuex";
import LocalService from "../../service/LocalService";
import socket from "../../service/SocketService";
import service from "../../service/FinansService";
export default {
  data() {
    return {
      masraf: 0,
      tutar:0,
      is_form: false,
      date: new Date(),
      is_kaydet: false,
      is_sil: true,
      is_degistir: true,
      select_list: null,
      is_loading: false,
      yil: "",
      ay: "",
      gun: "",
    };
  },
  localService: null,

  created() {
    this.localService = new LocalService();
  },
  computed: {
    ...mapGetters([
      "thmusteri_list_toplam_masraf",
      "thmusteri_list_toplam_tutar",
      "thmusteri_list",
      "thmusteri",
    ]),
  },
  methods: {

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    tahsilat_secim(event) {
      this.select_list = event.data;

      this.date = this.localService.getStringDate(event.data.tarih);

      this.$store.dispatch("tahsilatSecimAct", event.data);
      this.is_kaydet = true;
      this.is_degistir = false;
      this.is_sil = false;
    },
    kurSecim() {
      const d = this.date;

      const year = d.getFullYear(); // 2021
      const mount = d.getMonth();
      const day = d.getDate();

      service.getGuncelKur(year, mount + 1, day).then((data) => {
        this.thmusteri.kur = data.result;
      });
    },
    default_data() {
      service
        .getMusteriTahsilatListe(
          this.thmusteri.musteri_id,
          this.thmusteri.siparisno
        )
        .then((data) => {
          this.$store.dispatch("tahsilatLoadAct", data);
          this.is_loading = false;
          this.is_form = false;
          this.date = new Date();
          this.is_kaydet = false;
          this.is_sil = true;
          this.is_degistir = true;
        });
    },
    kaydet_click() {
      if (!this.date) {
        alert("Tarih Seçiniz..");
        return;
      }

      this.is_loading = true;
      const data = this.thmusteri;

      data.tarih = this.localService.getDateString(this.date);

      // const users = JSON.parse(localStorage.getItem("user"));
      const users = this.$store.getters.__getUsername;

      data.kullaniciadi = users;
      service.tahsilatKaydetme(data).then((res) => {
        if (res.status) {
          socket.siparis.emit("tahsilat_kayitdegisim_event", data.siparisno);
          socket.siparis.emit(
            "anaSayfaDegisiklikEvent",
            res.anaSayfaDegisiklikList
          );
          this.default_data();

        }
      });
    },
    degistir_click() {
      if (!this.date) {
        alert("Tarih Seçiniz..");
        return;
      }
      const data = this.thmusteri;

      data.tarih = this.localService.getDateString(this.date);

      // const users = JSON.parse(localStorage.getItem("user"));
      const users = this.$store.getters.__getUsername;

      data.kullaniciadi = users;


      service.tahsilatGuncelleme(data).then((res) => {
        if (res.status) {
          socket.siparis.emit("tahsilat_kayitdegisim_event", data.siparisno);
          socket.siparis.emit(
            "anaSayfaDegisiklikEvent",
            res.anaSayfaDegisiklikList
          );
          this.default_data();


        }
      });
    },
    sil_click() {
      if (!this.date) {
        alert("Tarih Seçiniz..");
        return;
      }
      const id = this.thmusteri.id;


      service.tahsilatSilme(id).then((res) => {
        if (res) {
          socket.siparis.emit(
            "tahsilat_kayitdegisim_event",
            this.thmusteri.siparisno
          );
          this.default_data();


        }
      });
    },
  },
};
</script>
<style scoped>
.input-style {
  text-align: center;
}
</style>

<template>
  <div class="card" style="background-color: white; height: auto">
    <form ref="form" @submit.prevent="sendEmail">
      <table class="table">
        <thead>
          <h1 style="text-align: center; font-weight: bold">Takım Üyeleri</h1>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                class="dairesel"
                :src="'https://mekmar-image.fra1.digitaloceanspaces.com/personel/avatar4.png'"
                bodyStyle="text-align:center"
                width="50"
                height="50"
              />
            </td>
            <td>Mehmet Dere</td>
            <td>
              <Textarea
                rows="2"
                @change="veridegisim(2)"
                v-model="metin_md"
                cols="65"
              />
            </td>
            <td>
              <Button
                type="button"
                :disabled="buton_md"
                label="Gönder"
                icon="far fa-envelope"
                @click="mailGonder(2)"
                class="p-button-success p-button-rounded"
                badge=""
                badgeClass="p-badge-info"
              />
            </td>
          </tr>

          <!-- <tr>
            <td>
              <img
                class="dairesel"
                :src="'https://mekmar-image.fra1.digitaloceanspaces.com/personel/fatih.jpeg'"
                bodyStyle="text-align:center"
                width="50"
                height="50"
              />
            </td>
            <td>Fatih Sarıtaş</td>
            <td>
              <Textarea
                rows="2"
                cols="65"
                @change="veridegisim(1)"
                @input="deneme()"
                v-model="metin_fs"
              />
            </td>
            <td>
              <Button
                type="button"
                :disabled="buton_fs"
                label="Gönder"
                icon="far fa-envelope"
                @click="mailGonder(1)"
                class="p-button-success p-button-rounded"
                badge="8"
                badgeClass="p-badge-info"
              />
            </td>
          </tr> -->
          <tr>
            <td>
              <img
                class="dairesel"
                bodyStyle="text-align:center"
                width="50"
                height="50"
                :src="'https://mekmar-image.fra1.digitaloceanspaces.com/personel/avatar3.png'"
              />
            </td>
            <td>Hüseyin Özen</td>
            <td>
              <Textarea
                rows="2"
                @change="veridegisim(3)"
                v-model="metin_ho"
                cols="65"
              />
            </td>
            <td>
              <Button
                type="button"
                :disabled="buton_ho"
                label="Gönder"
                icon="far fa-envelope"
                @click="mailGonder(3)"
                class="p-button-success p-button-rounded"
                badge=""
                badgeClass="p-badge-info"
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                class="dairesel"
                :src="'https://mekmar-image.fra1.digitaloceanspaces.com/personel/avatar6.png'"
                bodyStyle="text-align:center"
                width="50"
                height="50"
              />
            </td>
            <td>Gizem Ülker</td>
            <td>
              <Textarea
                rows="2"
                @change="veridegisim(4)"
                v-model="metin_gu"
                cols="65"
              />
            </td>
            <td>
              <Button
                type="button"
                :disabled="buton_gu"
                label="Gönder"
                icon="far fa-envelope"
                @click="mailGonder(4)"
                class="p-button-success p-button-rounded"
                badge=""
                badgeClass="p-badge-info"
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                class="dairesel"
                :src="'https://mekmar-image.fra1.digitaloceanspaces.com/personel/avatar5.png'"
                bodyStyle="text-align:center"
                width="50"
                height="50"
              />
            </td>
            <td>Özlem Okut</td>
            <td>
              <Textarea
                rows="2"
                @change="veridegisim(5)"
                v-model="metin_oo"
                cols="65"
              />
            </td>
            <td>
              <Button
                type="button"
                :disabled="buton_oo"
                label="Gönder"
                icon="far fa-envelope"
                @click="mailGonder(5)"
                class="p-button-success p-button-rounded"
                badge=""
                badgeClass="p-badge-info"
              />
            </td>
          </tr>

          <tr>
            <td>
              <img
                class="dairesel"
                :src="'https://mekmar-image.fra1.digitaloceanspaces.com/personel/avatar2.png'"
                bodyStyle="text-align:center"
                width="50"
                height="50"
              />
            </td>
            <td>Hakan Kan</td>
            <td>
              <Textarea
                rows="2"
                @change="veridegisim(8)"
                v-model="metin_hk"
                cols="65"
              />
            </td>
            <td>
              <Button
                type="button"
                :disabled="buton_hk"
                label="Gönder"
                icon="far fa-envelope"
                @click="mailGonder(8)"
                class="p-button-success p-button-rounded"
                badge=""
                badgeClass="p-badge-info"
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                class="dairesel"
                bodyStyle="text-align:center"
                width="50"
                height="50"
                :src="'https://mekmar-image.fra1.digitaloceanspaces.com/personel/avatar1.png'"
              />
            </td>
            <td>Semih Demir</td>
            <td>
              <Textarea
                rows="2"
                @change="veridegisim(9)"
                v-model="metin_sm"
                cols="65"
              />
            </td>
            <td>
              <Button
                type="button"
                :disabled="buton_sm"
                label="Gönder"
                icon="far fa-envelope"
                @click="mailGonder(9)"
                class="p-button-success p-button-rounded"
                badge=""
                badgeClass="p-badge-info"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>
<script>
import Opservice from "../../../service/OperasyonService";

export default {
  data() {
    return {
      kullaniciList: null,
      metin: "Mesaj Yazınız ...",
      metin_fs: "",
      metin_md: "",
      metin_gu: "",
      metin_ho: "",
      metin_oo: "",
      metin_fy: "",
      metin_ak: "",
      metin_hk: "",
      metin_sm: "",
      buton_fs: true,
      buton_md: true,
      buton_gu: true,
      buton_ho: true,
      buton_oo: true,
      buton_fy: true,
      buton_ak: true,
      buton_hk: true,
      buton_sm: true,
      alici: "",
      veri: [],
    };
  },
  computed: {},
  props: ["siparisNo", "yeniSiparis"],
  created() {
    Opservice.getSonGorusmeList(this.siparisNo).then((data) => {
      for (let key in data) {
        if (data[key].alici == "bilgiislem@mekmar.com") {
          this.metin_ak = data[key].mesaj;
        } else if (data[key].alici == "fatih@mekmar.com") {
          this.metin_fs = data[key].mesaj;
        } else if (data[key].alici == "mehmet@mekmer.com") {
          this.metin_md = data[key].mesaj;
        } else if (data[key].alici == "huseyin@mekmarmarble.com") {
          this.metin_ho = data[key].mesaj;
        } else if (data[key].alici == "gizem@mekmarmarble.com") {
          this.metin_gu = data[key].mesaj;
        } else if (data[key].alici == "export1@mekmar.com") {
          this.metin_oo = data[key].mesaj;
        } else if (data[key].alici == "export2@mekmar.com") {
          this.metin_fy = data[key].mesaj;
        } else if (data[key].alici == "export3@mekmar.com") {
          this.metin_hk = data[key].mesaj;
        }
      }
    });
  },
  mounted() {},
  methods: {
    veridegisim(kim) {
      if (kim == 1) {
        this.buton_fs = this.veriControl(kim);
      } else if (kim == 2) {
        this.buton_md = this.veriControl(kim);
      } else if (kim == 3) {
        this.buton_ho = this.veriControl(kim);
      } else if (kim == 4) {
        this.buton_gu = this.veriControl(kim);
      } else if (kim == 5) {
        this.buton_oo = this.veriControl(kim);
      } else if (kim == 6) {
        this.buton_fy = this.veriControl(kim);
      } else if (kim == 7) {
        this.buton_ak = this.veriControl(kim);
      } else if (kim == 8) {
        this.buton_hk = this.veriControl(kim);
      } else if (kim == 9) {
        this.buton_sm = this.veriControl(kim);
      }
    },
    veriControl(kim) {
      if (kim == 1) {
        if (this.metin_fs.length > 0) {
          return false;
        } else {
          return true;
        }
      } else if (kim == 2) {
        if (this.metin_md.length > 0) {
          return false;
        } else {
          return true;
        }
      } else if (kim == 3) {
        if (this.metin_ho.length > 0) {
          return false;
        } else {
          return true;
        }
      } else if (kim == 4) {
        if (this.metin_gu.length > 0) {
          return false;
        } else {
          return true;
        }
      } else if (kim == 5) {
        if (this.metin_oo.length > 0) {
          return false;
        } else {
          return true;
        }
      } else if (kim == 6) {
        if (this.metin_fy.length > 0) {
          return false;
        } else {
          return true;
        }
      } else if (kim == 7) {
        if (this.metin_ak.length > 0) {
          return false;
        } else {
          return true;
        }
      } else if (kim == 8) {
        if (this.metin_hk.length > 0) {
          return false;
        } else {
          return true;
        }
      } else if (kim == 9) {
        if (this.metin_sm.length > 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    mailGonder(kim) {
      if (kim == 1) {
        this.alici = "fatih@mekmar.com";
        this.metin = this.metin_fs;
      } else if (kim == 2) {
        this.alici = "mehmet@mekmer.com";
        this.metin = this.metin_md;
      } else if (kim == 3) {
        this.alici = "huseyin@mekmarmarble.com";
        this.metin = this.metin_ho;
      } else if (kim == 4) {
        this.alici = "export@mekmar.com";
        this.metin = this.metin_gu;
      } else if (kim == 5) {
        this.alici = "export1@mekmar.com";
        this.metin = this.metin_oo;
      } else if (kim == 6) {
        this.alici = "export2@mekmar.com";
        this.metin = this.metin_fy;
      } else if (kim == 7) {
        this.alici = "bilgiislem@mekmar.com";
        this.metin = this.metin_ak;
      } else if (kim == 8) {
        this.alici = "export3@mekmar.com";
        this.metin = this.metin_hk;
      } else if (kim == 9) {
        this.alici = "bilgiislem@mekmar.com";
        this.metin = this.metin_sm;
      }

      const veri = {
        alici: this.alici,
        metin: this.metin,
        gonderen:
          JSON.parse(localStorage.getItem("user")).kullaniciAdi +
          "  " +
          JSON.parse(localStorage.getItem("user")).kullaniciSoyAd,
        po: this.siparisNo,
      };

      Opservice.setChatMailIslem(veri).then((data) => {
        if (data.Status) {
          alert("Mailiniz başarılı şekilde iletilmiştir.");
        } else {
          alert("Ops! Tekrar Deneyiniz.");
        }
      });
    },
    deneme() {},
  },
};
</script>
<style scoped>
.dairesel {
  border-radius: 150px;

  -webkit-border-radius: 150px;

  -moz-border-radius: 150px;
}
.table {
  width: 90%;
  font-family: "Abril Fatface";
  font-size: 19px;
}

@media screen and (max-width: 576px) {
  .table {
    width: 30%;
    font-family: "Abril Fatface";
    font-size: 13px;
  }
}
</style>

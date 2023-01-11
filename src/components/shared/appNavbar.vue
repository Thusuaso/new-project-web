<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div>
        <div style="position: fixed;top:0px;left:0px; z-index: 99; width: 100%">
            <el-menu class="el-menu-demo" mode="horizontal" style="position:sticky;top:0px;left:0px;z-index:99;">
                <router-link class="navbar-item" to="/">
                    <el-menu-item index="1" style="width:10px;">
                        <i class="pi pi-home"></i>
                    </el-menu-item>
                </router-link>
        
        
        
                <el-sub-menu index="2" v-if="is_h">
                    <template #title>Satışçı</template>
                    <router-link to="/satisci">
                        <el-menu-item index="2-1"> Takip </el-menu-item>
                    </router-link>
                    <router-link to="/bgpNetwork">
                        <el-menu-item index="2-2"> Bgp Project </el-menu-item>
                    </router-link>
                </el-sub-menu>
                <el-sub-menu index="3">
                    <template #title>Siparişler</template>
                    <router-link to="/siparisler/uretim">
                        <el-menu-item index="3-1"> Üretim </el-menu-item>
                    </router-link>
                    <router-link to="/siparisler/sevk">
                        <el-menu-item index="3-2"> Sevk </el-menu-item>
                    </router-link>
                    <router-link to="/siparisler/bekleyen">
                        <el-menu-item index="3-3"> Bekleyen </el-menu-item>
                    </router-link>
                </el-sub-menu>
                <el-sub-menu index="4" v-if="is_h">
                    <template #title>Seleksiyon</template>
                    <router-link to="/seleksiyon/seleksiyonGiris">
                        <el-menu-item index="4-1"> Seleksiyon Giriş </el-menu-item>
                    </router-link>
                    <router-link to="/seleksiyon/kasaDetayOlculeri">
                        <el-menu-item index="4-2"> Kasa Detay </el-menu-item>
                    </router-link>
                </el-sub-menu>
                <el-sub-menu index="5">
                    <template #title>Finans</template>
                    <router-link to="/finans/finansAnaListe">
                        <el-menu-item index="5-1"> Finans Ana Liste </el-menu-item>
                    </router-link>
                    <!-- <router-link to="/finans/efesAnaListe">
                                <el-menu-item index="5-1"> Efes Ana Liste </el-menu-item>
                            </router-link> -->
                    <!-- <router-link to="/finans/odemelerfinansAnaListesi">
                                <el-menu-item index="5-2"> Ödemeler Listesi </el-menu-item>
                            </router-link> -->
                </el-sub-menu>
                <el-sub-menu index="7">
                    <template #title>Operasyon</template>
                    <router-link to="/urunKartListesi">
                        <el-menu-item index="7-1"> Ürün Kart Listesi </el-menu-item>
                    </router-link>
                    <router-link to="/operasyon/tedarikciListe">
                        <el-menu-item index="7-2"> Tedarikçi Listesi </el-menu-item>
                    </router-link>
                    <router-link to="/operasyon/sevkiyatForm">
                        <el-menu-item index="7-3"> Sevkiyat </el-menu-item>
                    </router-link>
                    <router-link to="/evrakYukleme">
                        <el-menu-item index="7-4"> Yükleme Formu </el-menu-item>
                    </router-link>
                    <router-link to="/operasyon/sevkTakipListesi">
                        <el-menu-item index="7-5"> Konteynır Takip </el-menu-item>
                    </router-link>
                    <router-link to="/operasyon/sevkTakipDusenListesi">
                        <el-menu-item index="7-6"> Konteynır Takipten Düşen </el-menu-item>
                    </router-link>
                    <el-sub-menu index="7-7">
                        <template #title>Faturalar</template>
        
                        <router-link to="/operasyon/mekmerdisfatura">
                            <el-menu-item index="7-7-1"> İç Piyasa Fatura Giriş </el-menu-item>
                        </router-link>
                        <router-link to="/operasyon/nakliyeFaturaGiris">
                            <el-menu-item index="7-7-2"> Nakliye Fatura Giriş </el-menu-item>
                        </router-link>
                        <router-link to="/operasyon/nakliyeFaturaListesi">
                            <el-menu-item index="7-7-3"> Nakliye Fatura Listesi </el-menu-item>
                        </router-link>
                        <router-link to="/operasyon/konteynerFaturaGiris">
                            <el-menu-item index="7-7-4"> Konteynır Fatura Girişi </el-menu-item>
                        </router-link>
                        <router-link to="/operasyon/konteynerFaturaListesi">
                            <el-menu-item index="7-7-5"> Konteynır Fatura Listesi </el-menu-item>
                        </router-link>
                    </el-sub-menu>
                </el-sub-menu>
                <el-sub-menu index="8">
                    <template #title>Müşteriler</template>
                    <router-link to="/musteriler/musteriListesi">
                        <el-menu-item index="8-1"> Müşteri Listesi </el-menu-item>
                    </router-link>
                    <router-link to="/musteriler/teklifMusterileri">
                        <el-menu-item index="8-2"> Teklif Müşteri Listesi </el-menu-item>
                    </router-link>
                    <router-link to="/musteriler/bgpMusterileri">
                        <el-menu-item index="8-3"> Bgp Müşteri Listesi </el-menu-item>
                    </router-link>
                    <router-link to="/musteriler/fuarMusterileri">
                        <el-menu-item index="8-4"> Fuar Müşteri Listesi </el-menu-item>
                    </router-link>
                    <router-link to="/musteriler/musteriSiparisListesi">
                        <el-menu-item index="8-5"> Müşteri Sipariş Listesi </el-menu-item>
                    </router-link>
                    <router-link to="/musteriler/ulkeyeGoreMusteriler">
                        <el-menu-item index="8-6"> Ülkeye Göre Müşteriler </el-menu-item>
                    </router-link>
                    <router-link to="/musteriler/seleksiyonaGoreMusteriler">
                        <el-menu-item index="8-7"> Seleksiyon Müşterileri </el-menu-item>
                    </router-link>
                </el-sub-menu>
                <el-sub-menu index="9" v-if="isOthers" v-show="is_h">
                    <template #title>Atlanta SM</template>
                    <router-link to="/atlanta/stokListesi">
                        <el-menu-item index="9-1"> Stok </el-menu-item>
                    </router-link>
                </el-sub-menu>
                <el-sub-menu index="10" v-if="is_h">
                    <template #title>Raporlar</template>
        
        
                    <el-sub-menu index="10-10">
                        <template #title>Mekmer Raporları</template>
                        <router-link to="/raporlar/uretimRaporu">
                            <el-menu-item index="10-10-1"> Üretim Raporu </el-menu-item>
                        </router-link>
                        <!-- <router-link to="/raporlar/sevkiyatRaporuMekmer">
                            <el-menu-item index="10-10-2"> Sevkiyat Raporu </el-menu-item>
                        </router-link> -->
                        
                        <router-link to="/raporlar/stokRaporu">
                            <el-menu-item index="10-10-4"> Stok Raporu </el-menu-item>
                        </router-link>
                        <router-link to="/raporlar/ocakListesi">
                            <el-menu-item index="10-10-5"> Ocak Listesi Raporu </el-menu-item>
                        </router-link>
                        <router-link to="/raporlar/uretilecekUrunler">
                            <el-menu-item index="10-10-6"> Üretilecek Ürünler </el-menu-item>
                        </router-link>
                    </el-sub-menu>
                    <el-sub-menu index="10-11">
                        <template #title>Mekmar Raporları</template>
                        <router-link to="/maliyet/maliyetRaporu">
                            <el-menu-item index="10-11-1"> Ayo Raporu </el-menu-item>
                        </router-link>
                        <router-link to="/raporlar/yeniYuklemeRaporlari">
                            <el-menu-item index="10-11-2"> MK Raporu </el-menu-item>
                        </router-link>
                        <router-link to="/raporlar/yuklemeRapor">
                            <el-menu-item index="10-11-3"> Yükleme Raporu </el-menu-item>
                        </router-link>
                        <!-- <router-link to="/raporlar/sevkiyatRaporuMekmar">
                            <el-menu-item index="10-11-4"> Sevkiyat Raporu </el-menu-item>
                        </router-link> -->
                        <router-link to="/raporlar/sevkiyatRaporuAll">
                            <el-menu-item index="10-11-4"> Sevkiyat Raporu </el-menu-item>
                        </router-link>
                        <router-link to="/raporlar/siparisOzetRapor">
                            <el-menu-item index="10-11-5"> Sipariş Özet Raporu </el-menu-item>
                        </router-link>
                        <router-link to="/raporlar/mekusMasraflari">
                            <el-menu-item index="10-11-6"> Mekus Masrafları </el-menu-item>
                        </router-link>
                    </el-sub-menu>
                </el-sub-menu>
        
        
                <el-sub-menu index="11" v-if="is_h">
                    <template #title>Numuneler</template>
                    <router-link to="/numune/numuneList">
                        <el-menu-item index="11-1"> Takip Listesi </el-menu-item>
                    </router-link>
                    <router-link to="/numune/finansList">
                        <el-menu-item index="11-2"> Finans Listesi </el-menu-item>
                    </router-link>
                </el-sub-menu>
                <!-- <el-sub-menu index="12" v-if="is_h">
                    <router-link to="/teklif/musteriListesi">
                                            <el-menu-item index="12-2"> Müşteri Listesi </el-menu-item>
                                        </router-link>
                    </el-sub-menu> -->

                        <el-menu-item index="12" style="margin-top:8px;"> 

                            <router-link  to="/teklifListesi" v-if="is_h">
                                Teklif Listesi
                            </router-link>

                        </el-menu-item>
                    
                    
                    
                
                <el-sub-menu index="13" v-if="is_" v-show="is_h">
                    <template #title>Mekmar USA</template>
                    <router-link to="/panel/mekmarusa/depoUrunList">
                        <el-menu-item index="13-1"> Ürün Listesi </el-menu-item>
                    </router-link>
                    <router-link to="/panel/mekmarusa/urunYorumListesi">
                        <el-menu-item index="13-2"> Depo Ürün Yorumları </el-menu-item>
                    </router-link>
                    <router-link to="/panel/mekmarusa/depoTurkeyUrunList">
                        <el-menu-item index="13-3"> Mekmar Ürün Listesi </el-menu-item>
                    </router-link>
                </el-sub-menu>
                <el-sub-menu index="14" v-if="is_" v-show="is_h">
                    <template #title>Mekmar Panel</template>
                    <router-link to="/panel/mekmarcom/urunListesi">
                        <el-menu-item index="14-1"> Ürün Listesi </el-menu-item>
                    </router-link>
                    <router-link to="/panel/mekmarcom/urunSiraListesi">
                        <el-menu-item index="14-2"> Ürün Sırası Değiştir </el-menu-item>
                    </router-link>
                    <router-link to="/panel/mekmarcom/musteriListesi">
                        <el-menu-item index="14-3"> Username </el-menu-item>
                    </router-link>
                </el-sub-menu>
        
                <a class="button is-primary" style="margin-top: 20px;width:30px;height:30px;" @click="logout"
                    v-if="$store.getters.__isAuthentication">
                    <strong><i class="pi pi-sign-out"></i></strong>
                </a>
                
                <OverlayPanel ref="op" style="background-color:#FFD373;">
                    <div class="main-container" v-for="item in notificationData" :key="item" v-show="notificationData.length > 0">
                        <div class="cards">
                            <div class="card card-1">
                                <div class="card__icon"
                                    style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;padding-left:5px;font-size:18px;">
                                    {{ item.baslik }}</div>
                                <h2 class="card__title">{{ item.hatirlatma_notu }}</h2>
                                <p class="card__apply">
                                <p class="card__link" style="margin-bottom:5px;">{{ item.hatirlatmaTarihi }} <i
                                        class="fas fa-arrow-right"></i></p>
                                </p>
                                <Button @click="isRowSelected(item)" label="Show" id="isBorderButton">
        
                                </Button>
        
                            </div>
                        </div>
                    </div>
                    <div class="main-container" v-for="item in hatirlatmaTrueDatas" :key="item"
                        v-show="hatirlatmaTrueDatas.length > 0">
        
                        <div class="cards">
                            <div class="card card-1">
                                <div class="card__icon"
                                    style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; padding-left:10px;font-size:18px;">
                                    {{ item.title }}</div>
                                <h2 class="card__title">{{ item.hatirlatmaAciklama }}</h2>
                                <p class="card__apply">
                                <p class="card__link" style="margin-bottom:5px;">{{ item.end }} <i
                                        class="fas fa-arrow-right"></i>
                                </p>
                                </p>
                                <Button @click="isTeklifHatirlatmaSelected(item.id)" label="Show" id="isBorderButton">
        
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div class="main-container" v-for="item in bgpHatirlatmaList" :key="item"
                        v-show="bgpHatirlatmaList.length > 0">
        
                        <div class="cards">
                            <div class="card card-1">
                                <div class="card__icon"
                                    style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; padding-left:10px;font-size:18px;">
                                    {{
                                            item.firmaAdi
                                    }}</div>
                                <h2 class="card__title">{{ item.hatirlatmaAciklama }}</h2>
                                <p class="card__apply">
                                <p class="card__link" style="margin-bottom:5px;">{{ item.hatirlatmaTarihi }} <i
                                        class="fas fa-arrow-right"></i></p>
                                </p>
                                <Button @click="isBgpHatirlatmaSelected(item.id)" label="Show" id="isBorderButton">
        
                                </Button>
                            </div>
                        </div>
                    </div>
                </OverlayPanel>
                <Button type="button" class="notificationButton" v-if="isNotification > 0" :label="isNotification" @click="toggle" />
            </el-menu>
        </div>
        
        
        
        <Dialog v-model:visible="is_satisform" style="z-index:99;" header="Ayrıntı Listesi" :modal="true" position="top">
            <section>
                <div class="columns">
                    <div class="column is-12">
                        <CustomersDetay :select_satisci="select_satisci" :satisciDurum="satisciDurum" :select_musteri_id="select_musteri_id "/>
                    </div>
                </div>
            </section>
        </Dialog>
        
        
        <Dialog v-model:visible="is_tekliform" style="z-index:99;" header="Teklif Listesi" :modal="true" position="top">
            <TeklifGirisForm :yeniKayit="teklifYeniKayit" :teklifId="teklifId"></TeklifGirisForm>
        </Dialog>
        <Dialog v-model:visible="is_bgpform" style="z-index:99;" header="Bgp Listesi" :modal="true" position="top">
            <BgpNetworkDetailForm ></BgpNetworkDetailForm>
        </Dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import service from "../../service/Customers";
import CustomersDetay from "../../components/customers/CustomersDetay";
import teklifService from "../../service/TeklifService";
import TeklifGirisForm from "../../components/teklifler/TeklifGirisForm";
import socket from "@/service/SocketService";
import bgpService from "@/service/BgpProjectService";
import BgpNetworkDetailForm from "@/components/bgpproject/bgpNetworkDetailForm"
export default {
    components: {
        CustomersDetay,
        TeklifGirisForm,
        BgpNetworkDetailForm
    },
  computed: {
      ...mapGetters(["__getUserId","bgpHatirlatmaList"]),
  },
  data() {
      return {
      satisciDurum:"Musteri",
      teklifId:0,
      isOthers: true,
      is_: true,
      is_h: true,
      isNotification: 0,
      notificationData: [],
      takvimdata: [],
      hatirlatmaTrueDatas: [],
      is_satisform: false,
      select_satisci: "",
          is_tekliform: false,
          is_bgpform:false,
      teklifYeniKayit: false,
    };
  },
  created() {
    if (
      this.__getUserId == 47 ||
      this.__getUserId == 10 ||
      this.__getUserId == 13
    ) {
      this.is_ = false;
    } else if (this.__getUserId == 12) {
      this.is_h == false;
    } else {
      this.isOthers = false;
    }
      service.getCustomersHatirlatmaListe(this.__getUserId).then((data) => {
      this.isNotification = data.length;
        this.notificationData = data;
        this.takvimDataList();
        this.bgpProjectHatirlatmaList(this.__getUserId)

    //   if (this.isNotification > 0 || this.hatirlatmadurumu.durum) {
    //     setTimeout(() => {
    //       this.$toast.add({
    //         severity: "success",
    //         summary: "Satışçı Takip Bildirimi",
    //         detail: this.isNotification + " " + "Yeni Bildiriminiz Var",
    //         life:2000
    //       });
    //     }, 8000);
    //   }
    // });
    // this.takvimDataList();

    // service.getBgpProjectsHatirlatma(this.__getUserId).then((data) => {
    //   this.$store.dispatch("bgp_projects_hatirlatma_list_load", data.result);
    //   this.isNotification += data.result.length;


    });
  },
    methods: {
        bgpProjectHatirlatmaList(users) {
            service.getBgpProjectsHatirlatma(users).then(data => {
                this.$store.dispatch('bgp_projects_hatirlatma_list_load', data.result)
                this.isNotification += data.result.length
                
            })
        }
        ,
        isBgpHatirlatmaSelected(id) {
            bgpService.getBgpProjectDetailForm(id).then((data) => {
                this.$store.dispatch("bgp_project_ayrinti_form_load", data[0]);
                this.is_bgpform = true;
            });
        },
        isTeklifHatirlatmaSelected(event) {
            this.teklifId = event
            this.is_tekliform = true
        },
        isRowSelected(event) {
            this.select_satisci = event.musteriadi
            this.select_musteri_id = event.id
            service.getCustomersDetayListe(event.musteriadi).then(data => {
                this.$store.dispatch('musteri_ayrinti_yukle_act', data.musteriDetay)
                this.$store.dispatch('musteri_teklifler_ayrinti_yukle_act', data.tekliflermusteriDetay)
                this.is_satisform = true
            })
        },
    takvimDataList() {
      teklifService.getTakvimList().then((data) => {
        this.takvimdata = data.takvimList;
        var date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
        this.month = this.month.toString();
        this.day = this.day.toString();
        if (this.day.length == 1) {
          this.day = "0" + this.day;
        }
        if (this.month.length == 1) {
          this.month = "0" + this.month;
        }
          var fulldate = this.year + "-" + this.month + "-" + this.day;


          for (let i in data.takvimList) {
              if (data.takvimList[i].hatirlatmaDurum == 'True') {
                  const takvimSplit = data.takvimList[i].end.split("-")
                  const takvimDay = takvimSplit[2]
                  const takvimMonth = takvimSplit[1]
                  const takvimYear = takvimSplit[0]
                  if (parseInt(this.year) == parseInt(takvimYear)) {
                      if (parseInt(this.month) == parseInt(takvimMonth) ) {
                          if (parseInt(this.day) <= parseInt(takvimDay)) {
                              this.hatirlatmaTrueDatas.push(data.takvimList[i])

                          } else {
                              continue;
                          }
                    
                      } else if (parseInt(this.month) < parseInt(takvimMonth)) {
                          this.hatirlatmaTrueDatas.push(data.takvimList[i])

                    }
                  } else {
                      continue;
                  }
              }
          }
          this.isNotification += this.hatirlatmaTrueDatas.length
          for (let j in this.hatirlatmaTrueDatas) {

              if (this.hatirlatmaTrueDatas[j].end == fulldate) {

                  const veri = {
                      id: this.hatirlatmaTrueDatas[j].id,
                      isFalse: false
                  }

                  teklifService.setHatirlatilmaDurum(veri).then(data =>
                      console.log(data)
                  )
              }
          }
          
      });
    },
    toggle(event) {
      this.$refs.op.toggle(event);
    },

    logout() {
      localStorage.removeItem("userId");
      localStorage.removeItem("username");

      this.$router.push("/login");
    },
    },
    mounted() {
        socket.siparis.on('bildirimler_update_emit', () => {
            service.getCustomersHatirlatmaListe(this.__getUserId).then((data) => {
                this.isNotification = data.length;
                this.notificationData = data;
                this.takvimDataList();
                this.bgpProjectHatirlatmaList(this.__getUserId)
            });
        })
  }
};
</script>
<style scoped>
.notificationButton{
    width: 30px;
    height: 30px;
    padding: 10px;
    margin-top:20px;
    margin-left:20px;
    background-color: #0e0e0e;
    border-radius:5px;
}
.notificationButton:hover {
    width: 30px;
    height: 30px;
    padding: 10px;
    margin-top: 20px;
    margin-left: 20px;
    background-color: black;
    transition:all 2s 0s linear;
    transform:scale(1.1);
    
}

.main-container {
  padding: 30px;
  transform:scale(0.8);
}

/* HEADING */

.heading {
  text-align: center;
}

.heading__title {
  font-weight: 600;
}

.heading__credits {
  margin: 10px 0px;
  color: #888888;
  font-size: 25px;
  transition: all 0.5s;
}

.heading__link {
  text-decoration: none;
}

.heading__credits .heading__link {
  color: inherit;
}

/* CARDS */

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card {
  margin: -20px;
  padding: -20px;
  width: 350px;
  min-height: 20px;
  display: grid;
  grid-template-rows: 20px 50px 1fr 50px;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;
}

.card:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  transform: scale(1.01);
}

.card__link,
.card__exit,
.card__icon {
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom:8px;
}

.card__link::after {
  position: absolute;
  top: 25px;
  left: 0;
  content: "";
  width: 0%;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.6);
  transition: all 0.5s;
}
#isBorderButton{
    background-color:#9cabd6;
    border: 1px solid gray;
    line-height:1px;
        
}
#isBorderButton:hover{
    border:1px solid #1d3170;
}
.card__link:hover::after {
  width: 100%;
}

.card__exit {
  grid-row: 1/2;
  justify-self: end;
}

.card__icon {
  grid-row: 2/3;
  font-size: 30px;
}

.card__title {
  grid-row: 3/4;
  font-weight: 400;
  color: #ffffff;
  margin-top:15px;
  padding-left:10px;
}

.card__apply {
  grid-row: 4/5;
  align-self: center;
}

/* CARD BACKGROUNDS */

.card-1 {
  background: radial-gradient(#586DAC, #586DAC);
}

.card-2 {
  background: radial-gradient(#fbc1cc, #fa99b2);
}

.card-3 {
  background: radial-gradient(#76b2fe, #b69efe);
}

.card-4 {
  background: radial-gradient(#60efbc, #58d5c9);
}

.card-5 {
  background: radial-gradient(#f588d8, #c0a3e5);
}

/* RESPONSIVE */

@media (max-width: 1600px) {
  .cards {
    justify-content: center;
  }
}

.navbarMain {
  width: 100%;
  height: 50px;
  background-color: #ccc;
}
.navbarResponsive {
  width: 100%;
  height: 50px;
  background-color: #ccc;
  padding-top: 60px;
  padding-left: 25px;
}
</style>

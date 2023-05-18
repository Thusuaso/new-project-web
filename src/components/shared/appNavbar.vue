<!-- eslint-disable vue/no-parsing-error -->
<template>

        <div class="card flex justify-content-center">
            <Sidebar v-model:visible="visible" class="p-sidebar-md">
                <Accordion >
                    <AccordionTab header="Kişiler">
                        <Listbox v-model="selectedMessageUser" :options="users" filter optionLabel="user" style="width:100%;" @change="is_input_disabled = false "/>

                    </AccordionTab>
                </Accordion>
                <br/>
                <div v-if="!is_input_disabled">
                    <span>
                                <InputText v-model="message_text" placeholder="Lütfen Mesajınızı Yazınız" style="margin-right:4px;width:89%;" :disabled="is_input_disabled"/>
                        </span>
                        <span>
                            <Button class="pi pi-send" style="height:40px;width:10%;" @click="sendMessage" :disabled="message_text ? false : true"/>
                        </span>
                </div>
                    <br/>
                    <CommentBar v-for="item of anlikNotificationData" :key="item" :item="item"/>
            </Sidebar>
        </div>
        <div class="card flex justify-content-center">
                <Sidebar v-model:visible="visible2" class="p-sidebar-lg">
                    <yapilacaklar/>
                </Sidebar>
            </div>
        
    <br/>
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top" >
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav" style="width:90%;float:left;">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item dropdown" v-if="is_h">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Satışçı
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/satisci">Takip</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="/bgpNetwork">Bgp Project</a></li>
                <li><hr class="dropdown-divider"></li>

                <li><a class="dropdown-item" href="/uretimSatisci">Üretim</a></li>

              </ul>
            </li>
            <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Siparişler
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/siparisler/uretim">Üretim</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/siparisler/sevk">Sevk</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/siparisler/bekleyen">Bekleyen</a></li>

                  </ul>
            </li>
            <li class="nav-item dropdown" v-if="is_h">
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Seleksiyon
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/seleksiyon/seleksiyonGiris">Seleksiyon Giriş</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="/seleksiyon/kasaDetayOlculeri">Kasa Detay</a></li>

                      </ul>
            </li>
            <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="/finans/finansAnaListe">Finans Ana Liste</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Operasyon
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/urunKartListesi">Ürün Kart</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/operasyon/tedarikciListe">Tedarikçi</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/operasyon/sevkiyatForm">Sevkiyat</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/evrakYukleme">Yükleme Formu</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/operasyon/sevkTakipListesi">Konteynır Takip</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/operasyon/sevkTakipDusenListesi">Konteynır Takip Düşen</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/operasyon/nakliyeFaturaGiris">Nakliye Giriş</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/operasyon/nakliyeFaturaListesi">Nakliye Fatura</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/operasyon/konteynerFaturaGiris">Konteynır Giriş</a></li>
                        <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/operasyon/konteynerFaturaListesi">Konteynır Fatura</a></li> 


                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Müşteriler
                </a>
                <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/musteriler/musteriListesi">Müşteri Listesi</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="/musteriler/teklifMusterileri">Teklif Müşterileri</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="/musteriler/bgpMusterileri">Bgp Müşterileri</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="/musteriler/fuarMusterileri">Fuar Müşterileri</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="/musteriler/musteriSiparisListesi">Ülke Müşterileri</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="/musteriler/seleksiyonaGoreMusteriler">Seleksiyon Müşterileri</a></li>

                </ul>
            </li>
            <li class="nav-item dropdown" v-if="is_h">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Mekmer Raporları
                    </a>
                    <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/raporlar/uretimRaporu">Üretim</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/raporlar/stokRaporu">Stok</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/raporlar/stokRaporuFiyatli">Stok Fiyatlı</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/raporlar/ocakListesi">Ocak</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/raporlar/uretilecekUrunler">Üretilecek</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/atlanta/stokListesi">Atlanta</a></li>
                    </ul>
            </li>
            <li class="nav-item dropdown" v-if="is_h">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Mekmar Raporları
                        </a>
                        <ul class="dropdown-menu">
                            <li v-if="is_m_g"><a class="dropdown-item" href="/maliyet/maliyetRaporu">Ayo</a></li>
                            <li v-if="is_m_g"><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="/raporlar/yeniYuklemeRaporlari">MK Raporu</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="/raporlar/guRaporlari">GU Raporu</a></li>
                                <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="/raporlar/yuklemeRapor">Yükleme</a></li>
                            <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="/raporlar/sevkiyatRaporuAll">Sevkiyat</a></li>
                                <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="/raporlar/siparisOzetRapor">Sipariş Özet</a></li>

                        </ul>
            </li>
            <li class="nav-item dropdown" v-if="is_h">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Numuneler
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/numune/numuneList">Takip</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/numune/finansList">Finans</a></li>
                    
                </ul>
            </li>
            <li class="nav-item" v-if="is_h">
                <a class="nav-link" aria-current="page" href="/teklifListesi">Teklifler</a>
            </li>
            <li class="nav-item dropdown" v-if="is_" v-show="is_h">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                USA
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/panel/mekmarusa/depoUrunList">Ürünler</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/panel/mekmarusa/urunYorumListesi">Yorumlar</a></li>
                    <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="/panel/mekmarusa/depoTurkeyUrunList">Mekmar Ürünler</a></li>
                
                </ul>
                
            </li>
            <li class="nav-item dropdown" v-if="is_" v-show="is_h">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Panel
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/panel/mekmarcom/urunListesi">Ürünler</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/panel/mekmarcom/urunSiraListesi">Sıra Değiştir</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/panel/mekmarcom/musteriListesi">Kullanıcılar</a></li>
                </ul>
            </li>
          </ul>
          <ul class="navbar-nav"  style="width:10%;float:right">
            <!-- <li class="navbar-item">
                <a class="nav-link"  @click="visible = true">
                    <i v-badge.danger  class="pi pi-envelope p-overlay-badge" style="font-size: 1rem" v-if="follow_is_true"/>
                    <i v-badge  class="pi pi-envelope p-overlay-badge" style="font-size: 1rem" v-else/>
                </a>
            </li> -->
            <li class="navbar-item">
                <a class="nav-link"  @click="visible2 = true">
                    <i v-badge.danger="yapilacaklarCount" class="pi pi-calendar p-overlay-badge" style="font-size: 2rem" />

                </a>
            </li>
            <li class="nav-item">
                <Button type="button" class="notificationButton" v-if="isNotification > 0" :label="isNotification" @click="toggle" />
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
            </li>
          </ul>

        </div>
      </div>
    </nav>
    <Dialog v-model:visible="is_satisform" style="z-index:99;" header="Ayrıntı Listesi" :modal="true" position="top">
            <section>
                <div class="columns">
                    <div class="column is-12">
                        <CustomersDetay :select_satisci="select_satisci" :satisciDurum="satisciDurum" :select_musteri_id="select_musteri_id"/>
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
import notificationService from "@/service/AnlikBildirimService"
import CommentBar from "@/components/shared/commentBar";
import Yapilacaklar from "@/views/Yapilacaklar.vue";
export default {
    components: {
        CustomersDetay,
        TeklifGirisForm,
        BgpNetworkDetailForm,
        CommentBar,
        Yapilacaklar
    },
  computed: {
      ...mapGetters(["__getUserId","bgpHatirlatmaList",'yapilacaklarCount']),
  },
  data() {
      return {
        follow_is_true:false,
        visible:false,
        anlikNotificationData:[],
        is_input_disabled:true,
          message_text:"",
          selectedMessageUser: {},
          users: [
            
             ],
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
          is_m_g: false,
      visible2:false,
    };
  },
    created() {

        if (this.__getUserId == 47) {
            this.users = [
                { 'id': 44, 'user': 'Hakan' },
                { 'id': 10, 'user': 'Gizem' },
                { 'id': 19, 'user': 'Özlem' },
                { 'id': 12, 'user': 'Hüseyin' },
            ]
        } else if (this.__getUserId == 44) {
            this.users = [
                { 'id': 47, 'user': 'Semih' },
                { 'id': 10, 'user': 'Gizem' },
                { 'id': 19, 'user': 'Özlem' },
                { 'id': 12, 'user': 'Hüseyin' },
            ]
        } else if (this.__getUserId == 10) {
            this.users = [
                { 'id': 47, 'user': 'Semih' },
                { 'id': 44, 'user': 'Hakan' },
                { 'id': 19, 'user': 'Özlem' },
                { 'id': 12, 'user': 'Hüseyin' },
            ]
        } else if (this.__getUserId == 19) {
            this.users = [
                { 'id': 47, 'user': 'Semih' },
                { 'id': 44, 'user': 'Hakan' },
                { 'id': 10, 'user': 'Gizem' },
                { 'id': 12, 'user': 'Hüseyin' },
            ]
        } else if (this.__getUserId == 12) {
            this.users = [
                { 'id': 47, 'user': 'Semih' },
                { 'id': 44, 'user': 'Hakan' },
                { 'id': 10, 'user': 'Gizem' },
                { 'id': 19, 'user': 'Özlem' },
            ]
        }
        notificationService.getNotification(this.__getUserId).then(data => {
            this.anlikNotificationData = data.liste
            
            for (let item of data.liste) {
                if (item.data.follow==true) {
                    this.follow_is_true = true
                    break
                }
            }
            for (let item of data.liste) {
                for (let item2 of item.children) {
                    if (item2.data.follow == true) {
                        this.follow_is_true = true
                        break
                    }
                }
                
            }
        })

        
    if (
      this.__getUserId == 10 ||
      this.__getUserId == 13
    ) {
      this.is_ = false;
    } else if (this.__getUserId == 12) {
      this.is_h == false;
    } else {
      this.isOthers = false;
      }
      if (this.__getUserId == 10 || this.__getUserId == 13 || this.__getUserId == 47) {
          this.is_m_g = true
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
        sendMessage() {
            let who_send_id = this.$store.getters.__getUserId
            let who_send_name = this.$store.getters.__getUsername
            let data = {
                'message': this.message_text,
                'userId': this.selectedMessageUser.id,
                'userName': this.selectedMessageUser.user,
                'whoSendId': who_send_id,
                'whoSendName': who_send_name
            }
            data.getUserId = this.getUserId
            notificationService.setNotificationSave(data).then(status => {
                if (status) {
                this.$toast.add({ severity: 'success', summary: 'Bildirim Durum', detail: 'Mesajınız Başarıyla Gönderildi', life: 3500 })
                    socket.siparis.emit('get_notification_list_event', data)
                socket.siparis.emit('get_notification_list_follow_event')

                } else {
                this.$toast.add({ severity: 'danger', summary: 'Bildirim Durum', detail: 'Mesajınız Gönderimi Başarısız', life: 3500 })

                }
            })
        },
        overlayPanelEvent(event) {
            this.$refs.notifOp.toggle(event);
        },
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

                  teklifService.setHatirlatilmaDurum(veri)
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
        socket.siparis.on('get_notification_list_emit', (datas) => {
            notificationService.getNotification(this.__getUserId).then(data => {
                this.anlikNotificationData = data.liste
                if (datas.userId == this.__getUserId) {
                    this.$toast.add({severity:'success',summary:datas.userName + ' bir mesaj gönderdi.', detail: datas.message })
                }
            })
        })
        socket.siparis.on('get_notification_list_second_emit', datas => {
            notificationService.getNotification(this.__getUserId).then(data => {
                this.anlikNotificationData = data.liste

                if (datas.data.receiver_id == this.__getUserId) {
                    this.$toast.add({ severity: 'success', summary: datas.data.user_name + ' bir mesaj gönderdi.', detail: datas.data.newMessage })
                }
            })
        })
        socket.siparis.on('get_notification_list_answered_third_emit', datas => {
            notificationService.getNotification(this.__getUserId).then(data => {
                this.anlikNotificationData = data.liste

                if (datas.data.receiver_id == this.__getUserId) {
                    this.$toast.add({ severity: 'success', summary: datas.data.user_name + ' bir mesaj gönderdi.', detail: datas.data.newMessage })
                }
            })
        })

        socket.siparis.on('get_notification_list_follow_emit', () => {
            notificationService.getNotification(this.__getUserId).then(data => {
                for (let item of data.liste) {
                    if (item.data.follow == true) {
                        this.follow_is_true = true
                        break
                    } else {
                        this.follow_is_true = false
                    }
                }
                for (let item of data.liste) {
                    for (let item2 of item.children) {
                        if (item2.data.follow == true) {
                            this.follow_is_true = true
                            break
                        } else {
                            this.follow_is_true = false
                        }
                    }

                }
            })
        })
        
        

    }
};
</script>
<style scoped>

.notificationButton{
    margin-left:10px;
    margin-right:10px;
    padding: 10px;
    background-color: #0e0e0e;
    border-radius:5px;
}
.notificationButton:hover {
    padding: 10px;
    margin-left: 10px;
    margin-right:10px;

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

import { createRouter, createWebHistory } from 'vue-router'
import store from "../store";
import service from "../service/Customers";
import urunKartService from "../service/UrunKartService";
import depoService from "../service/DepoService";
import tedarikciService from "../service/TedarikciService";
import siparisService from "../service/SiparisService";
import raporService from "@/service/RaporService";

const routes = [
  {
    path: "/maliyetAnalizi",
    component:() =>import("@/components/maliyetraporlari/MaliyetRaporuKar.vue")
  },
  {
    path: "/login",
    component: () => import("@/views/Login"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        store.dispatch("setServisAdresAct");
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/",
    component: () => import("@/views/Home"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        store.dispatch("loadingBeginAct");

        service.getTemsilciList().then((data) => {
          store.dispatch("customers_temsilci_yukle_act", data);
          
        });
        raporService.getDashboardGrafikData().then((data) => {
          store.dispatch("gelen_siparis_grafik_mekmar_data_load",data);
        });
        raporService.getDashboardSatislarTamami().then((data) => {
          store.dispatch("gelen_siparis_mekmar_load",data);
        });
        raporService.getDashboardSatislarGrafik().then((data) => {
          store.dispatch("gelen_siparis_grafik_load", data);
          store.dispatch("loadingEndAct");
          store.dispatch("setServisAdresAct");
          next();
          

          });
        
        
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/satisci",
    component: () => import("@/views/Customers"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/bgpNetwork",
    component: () => import("@/views/BgpProject"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/seleksiyon/seleksiyonGiris",
    component: () => import("@/views/Seleksiyon"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/seleksiyon/kasaDetayOlculeri",
    component: () => import("@/views/KasaDetay"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/finans/finansAnaListe",
    component: () => import("@/views/FinansAnaSayfa"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/urunKartListesi",
    component: () => import("@/views/UrunKart"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        store.dispatch("loadingBeginAct");

        urunKartService.getUrunKartMenuList().then((data) => {
          store.dispatch("isUrunKartLoad");
          store.dispatch("urunKartMenuAct", data);
          store.dispatch("loadingEndAct");

          next();
        });
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/operasyon/tedarikciListe",
    component: () => import("@/views/Tedarikci"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/operasyon/sevkiyatForm",
    component: () => import("@/views/Sevkiyat"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/evrakYukleme",
    component: () => import("@/views/EvrakGiris"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/operasyon/sevkTakipListesi",
    component: () => import("@/views/SevkTakip"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/operasyon/sevkTakipDusenListesi",
    component: () => import("@/views/SevkTakiptenDusen"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
			path: '/operasyon/mekmerdisfatura',
			name: 'mekmer_dis_fatura',
			component: () => import("@/views/MekmerDisFatura"),
			beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/operasyon/nakliyeFaturaGiris",
    component: () => import("@/views/NakliyeFaturaGiris"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/operasyon/nakliyeFaturaListesi",
    component: () => import("@/views/NakliyeFaturaListesi"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/operasyon/konteynerFaturaGiris",
    component: () => import("@/views/KonteynırDigerFaturaGiris"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/operasyon/konteynerFaturaListesi",
    component: () => import("@/views/KonteynırFaturaListesi"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/musteriler/musteriListesi",
    component: () => import("@/views/Musteriler"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/musteriler/teklifMusterileri",
    component: () => import("@/views/TeklifMusterileri"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/musteriler/bgpMusterileri",
    component: () => import("@/views/BgpMusterileri"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/musteriler/fuarMusterileri",
    component: () => import("@/views/FuarMusterileri"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/musteriler/musteriSiparisListesi",
    component: () => import("@/views/MusteriSiparisListesi"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/musteriler/ulkeyeGoreMusteriler",
    component: () => import("@/views/UlkeyeGoreMusteriler"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/atlanta/stokListesi",
    component: () => import("@/views/AtlantaStok"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/raporlar/uretimRaporu",
    component: () => import("@/views/UretimRaporu"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
			path : '/raporlar/sevkiyatRaporuMekmer',
			name : 'sevkiyat_listesi_mekmer',
			component :()=>import("@/views/SevkiyatRaporuMekmer"),
			beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
	{
			path : '/raporlar/sevkiyatRaporuMekmar',
			name : 'sevkiyat_listesi_mekmar',
			component :()=>import("@/views/SevkiyatRaporuMekmar"),
			beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
			path : '/raporlar/sevkiyatRaporuAll',
			name : 'sevkiyat_listesi_mekmar_mekmer',
			component :()=>import("@/views/SevkiyatRaporuMekmerMekmar"),
			beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/raporlar/stokRaporu",
    component: () => import("@/views/StokRaporu"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/raporlar/stokRaporuFiyatli",
    component: () => import("@/views/StokRaporuFiyatli"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/raporlar/ocakListesi",
    component: () => import("@/views/SeleksiyonOcakListesi"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/raporlar/siparisOzetRapor",
    component: () => import("@/views/SiparisOzetRapor"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/raporlar/uretilecekUrunler",
    component: () => import("@/views/UretilecekUrunlerRaporu"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/maliyet/maliyetRaporu",
    component: () => import("@/views/MaliyetRaporu"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        if (store.getters.__getUserId == 10 || store.getters.__getUserId == 13 || store.getters.__getUserId == 47) {
          next();

        } else {
          alert('Bu rapora erişiminiz bulunmamaktadır.')
          next('/')
        }
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/raporlar/yeniYuklemeRaporlari",
    component: () => import("@/views/YeniYuklemeRaporlari"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/raporlar/yuklemeRapor",
    component: () => import("@/views/YuklemeRaporu"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
			path : '/raporlar/mekusMasraflari',
			name : 'mekusMasraflari',
			component :()=>import("@/components/musteriraporlari/mekusMasraflar"),
			beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/numune/numuneList",
    component: () => import("@/views/NumunelerSevkListesi"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/numune/finansList",
    component: () => import("@/views/NumuneFinansList"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/teklifListesi",
    component: () => import("@/views/Teklifler"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/teklif/musteriListesi",
    component: () => import("@/views/TeklifMusteriListesi"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/panel/mekmarusa/depoUrunList",
    component: () => import("@/views/DepoUsa"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        store.dispatch("loadingBeginAct");

        depoService.getDepoUrunListesi().then((data) => {
          store.dispatch("depoUrunListesiYukle", data);
          store.dispatch("loadingEndAct");

          next();
        });
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/panel/mekmarusa/urunYorumListesi",
    component: () => import("@/views/DepoUsaYorumListesi"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/panel/mekmarusa/depoTurkeyUrunList",
    component: () => import("@/views/DepoTurkeyUrunList"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        store.dispatch("loadingBeginAct");

        depoService.getTurkeyStockList().then((data) => {
          store.dispatch("depoUrunListesiYukle", data);
          store.dispatch("loadingEndAct");

          next();
        });
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/panel/mekmarcom/urunListesi",
    name: "mekmarusa_mekmarurunlist",
    component: () => import("@/views/MekmarUrunListesi"),
    beforeEnter: (to, from, next) => {
      if (store.getters.__isAuthentication) {
        store.dispatch("loadingBeginAct");

        depoService.getTurkeyStockList().then((data) => {
          store.dispatch("depoUrunListesiYukle", data);
          store.dispatch("loadingEndAct");

          next();
        });
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/panel/mekmarcom/urunSiraListesi",
    component: () => import("@/views/UrunSira"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/panel/mekmarcom/musteriListesi",
    component: () => import("@/views/MekmarMusteriListesi"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/siparisler/uretim",
    component: () => import("@/views/siparisler/Uretim"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        urunKartService.getUrunKartMenuList().then((data) => {
          store.dispatch("isUrunKartLoad");
          store.dispatch("urunKartMenuAct", data);
        });
        tedarikciService.getTedarikciMenuList().then((data) => {
          store.dispatch("tedarikci_list_yukle_act", data);
        });
        siparisService.getTeslimTurList().then(data => {
          store.dispatch("teslim_tur_load_act",data)
        })
        siparisService.getOdemeTurList().then(data => {
          store.dispatch("odeme_tur_load_act",data)
        })
        siparisService.getFaturaKesimTurList().then(data => {
          store.dispatch("fatura_tur_load_act",data)
        })
        siparisService.getUlkeList().then(data => {
          store.dispatch("ulke_tur_load_act",data)
        })
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/siparisler/sevk",
    component: () => import("@/views/siparisler/Sevk"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        urunKartService.getUrunKartMenuList().then((data) => {
          store.dispatch("isUrunKartLoad");
          store.dispatch("urunKartMenuAct", data);
        });
        tedarikciService.getTedarikciMenuList().then((data) => {
          store.dispatch("tedarikci_list_yukle_act", data);
        });
        siparisService.getTeslimTurList().then(data => {
          store.dispatch("teslim_tur_load_act",data)
        })
        siparisService.getOdemeTurList().then(data => {
          store.dispatch("odeme_tur_load_act",data)
        })
        siparisService.getFaturaKesimTurList().then(data => {
          store.dispatch("fatura_tur_load_act",data)
        })
        siparisService.getUlkeList().then(data => {
          store.dispatch("ulke_tur_load_act",data)
        })
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/siparisler/bekleyen",
    component: () => import("@/views/siparisler/Bekleyen"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        urunKartService.getUrunKartMenuList().then((data) => {
          store.dispatch("isUrunKartLoad");
          store.dispatch("urunKartMenuAct", data);
        });
        tedarikciService.getTedarikciMenuList().then((data) => {
          store.dispatch("tedarikci_list_yukle_act", data);
        });
        siparisService.getTeslimTurList().then(data => {
          store.dispatch("teslim_tur_load_act",data)
        })
        siparisService.getOdemeTurList().then(data => {
          store.dispatch("odeme_tur_load_act",data)
        })
        siparisService.getFaturaKesimTurList().then(data => {
          store.dispatch("fatura_tur_load_act",data)
        })
        siparisService.getUlkeList().then(data => {
          store.dispatch("ulke_tur_load_act",data)
        })
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/musteriler/seleksiyonaGoreMusteriler",
    component: () => import("@/views/SeleksiyonMusterileri"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/raporlar/mekmarRaporlari",
    component: () => import("@/views/MekmarRaporlari"),
    beforeEnter(to, from, next) {
      if (store.getters.__isAuthentication) {

        next();
      } else {
        next("/login");
      }
    },
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  store.commit("_setUserId", userId);
  store.commit("_setUsername", username);
  store.dispatch("setServisAdresAct");

  if (userId != "") {
    next();
  }
});

export default router

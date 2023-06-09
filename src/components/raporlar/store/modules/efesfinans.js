const state = {

    ekonteyner_ana_list_all : [],
    ekonteyner_ana_list_filter : [],
    efinans_toplam_devir : 0,
    efinans_toplam_ciro : 0,
    efinans_toplam_odenen : 0, 
    efinans_toplam_bakiye : 0,
    efinans_toplam_pesinat : 0,
    efinans_toplam_eski_pesinat : 0,
    efinans_toplam_genel_bakiye : 0,
    efinans_ayrinti_list : null,
    efinans_ayrinti_kalan_toplam : 0,
    efinans_ayrinti_siparis_total : 0,
    efinans_ayrinti_siparis_pesinat : 0,
    efinans_ayrinti_siparis_odenen_tutar : 0,
    efinans_ayrinti_odeme_list : null,
    efinans_ayrinti_odeme_toplam : 0,
    efinans_odeme_secim_list : null,
    efinans_odeme_secim_toplam: 0,
    efinans_gelen_sip_bilgileri: null,
    efinans_gelen_sip_bilgileri_ayrinti: null,
    efinans_gelen_sip_bilgileri_ayrinti_sip_mik_top: 0,
    efinans_gelen_sip_bilgileri_ayrinti_miktar_top:0
    

}

const actions = {

    efesfinansAnaListeYukleAct({commit},data){

        commit('efesfinansAnaListeYukleMut',data)
    },
    efesfinansAnaListe_hepsiAct({commit},data){

        commit('efesfinansAnaListe_hepsiMut',data)
    },
    efesfinansAnaListe_filterAct({commit},data){

        commit('efesfinansAnaListe_filterMut',data)
    },
    efesfinansAyrintiListYukleAct({commit},data){

        commit('efesfinansAyrintiListYukleMut',data)
    },
    efesfinansOdemeSecimListYukleAct({commit},data){

        commit('efesfinansOdemeSecimListYukleMut',data)
    },
    
    efinans_ayrinti_siparis_pesinat(state){

        return state.efinans_ayrinti_siparis_pesinat
    },
    efinans_ayrinti_siparis_odenen_tutar(state){
        return state.efinans_ayrinti_siparis_odenen_tutar
    },
    efinans_ayrinti_siparis_total(state){

        return state.efinans_ayrinti_siparis_total
    },
    efinans_gelen_sip_bilgileri_load({commit},data) {
        commit('efinans_gelen_sip_bilgileri_mut',data)
    },
    efinans_gelen_sip_bilgileri_ayrinti_load({ commit }, data) {
        
        commit('efinans_gelen_sip_bilgileri_ayrinti_mut',data)
    }
}

const mutations = {

    efesfinansAnaListeYukleMut(state,data){

        state.ekonteyner_ana_list_all = data.konteyner_list

        state.ekonteyner_ana_list_filter = []

        state.efinans_toplam_devir = 0
        state.efinans_toplam_ciro = 0
        state.efinans_toplam_odenen = 0
        state.efinans_toplam_bakiye = 0
        state.efinans_toplam_pesinat = 0
        state.efinans_toplam_genel_bakiye = 0
        state.efinans_toplam_eski_pesinat = 0
        
        for(let key in data.konteyner_list){

            const item = data.konteyner_list[key]

            if(item.genel_bakiye >8){

                state.ekonteyner_ana_list_filter.push(item)
            }
            if(item.genel_bakiye < -8){

                state.ekonteyner_ana_list_filter.push(item)
            }
        }

        for(let key in state.ekonteyner_ana_list_filter){

            const item = state.ekonteyner_ana_list_filter[key]

            state.efinans_toplam_devir += Number(item.devir)
            state.efinans_toplam_ciro += Number(item.ciro)
            state.efinans_toplam_odenen += Number(item.odenen)
            state.efinans_toplam_bakiye += Number(item.bakiye)
            state.efinans_toplam_pesinat += Number(item.pesinat)
            state.efinans_toplam_genel_bakiye += Number(item.genel_bakiye)
            state.efinans_toplam_eski_pesinat += Number(item.eski_pesinat)
        }

     
    },
    efesfinansAnaListe_hepsiMut(state,data){

        state.efinans_toplam_devir = 0
        state.efinans_toplam_ciro = 0
        state.efinans_toplam_odenen = 0
        state.efinans_toplam_bakiye = 0
        state.efinans_toplam_pesinat = 0
        state.efinans_toplam_genel_bakiye = 0
        state.efinans_toplam_eski_pesinat = 0

        state.ekonteyner_ana_list_all = []
        state.ekonteyner_ana_list_all = data

        for(let key in state.ekonteyner_ana_list_all){

            const item = state.ekonteyner_ana_list_all[key]
            
            state.efinans_toplam_devir += Number(item.devir)
            state.efinans_toplam_ciro += Number(item.ciro)
            state.efinans_toplam_odenen += Number(item.odenen)
            state.efinans_toplam_bakiye += Number(item.bakiye)
            state.efinans_toplam_pesinat += Number(item.pesinat)
            state.efinans_toplam_genel_bakiye += Number(item.genel_bakiye)
            state.efinans_toplam_eski_pesinat += Number(item.eski_pesinat)
            
        }
    },
    efesfinansAnaListe_filterMut(state,data){

        state.efinans_toplam_devir = 0
        state.efinans_toplam_ciro = 0
        state.efinans_toplam_odenen = 0
        state.efinans_toplam_bakiye = 0
        state.efinans_toplam_pesinat = 0
        state.efinans_toplam_genel_bakiye = 0
        state.efinans_toplam_eski_pesinat = 0

        state.ekonteyner_ana_list_filter = []

        state.ekonteyner_ana_list_filter = data

        for(let key in state.ekonteyner_ana_list_filter){

            const item = state.ekonteyner_ana_list_filter[key]
            
            state.efinans_toplam_devir += Number(item.devir)
            state.efinans_toplam_ciro += Number(item.ciro)
            state.efinans_toplam_odenen += Number(item.odenen)
            state.efinans_toplam_bakiye += Number(item.bakiye)
            state.efinans_toplam_pesinat += Number(item.pesinat)
            state.efinans_toplam_genel_bakiye += Number(item.genel_bakiye)
            state.efinans_toplam_eski_pesinat += Number(item.eski_pesinat)
            
        }

        console.log('store state.finans_toplam_ciro : ',state.efinans_toplam_ciro)
    },
    efesfinansAyrintiListYukleMut(state,data){

        state.efinans_ayrinti_list = data.ayrinti_list
        state.efinans_ayrinti_odeme_list = data.odeme_liste
        state.efinans_ayrinti_kalan_toplam = 0
        state.efinans_ayrinti_odeme_toplam = 0
        state.efinans_ayrinti_siparis_total = 0
        state.efinans_ayrinti_siparis_pesinat = 0
        state.efinans_ayrinti_siparis_odenen_tutar = 0
        
        for(let key in state.efinans_ayrinti_list){

            const item = state.efinans_ayrinti_list[key]

           
              state.efinans_ayrinti_siparis_total += item.siparis_total
              state.efinans_ayrinti_siparis_pesinat += item.pesinat
              state.efinans_ayrinti_kalan_toplam += item.kalan
              state.efinans_ayrinti_siparis_odenen_tutar += item.odenen_tutar
        }

        // ödeme listesi

        for (let key in state.efinans_ayrinti_odeme_list){

            const item = state.efinans_ayrinti_odeme_list[key]

            state.efinans_ayrinti_odeme_toplam += item.tutar

        }
    },
    efesfinansOdemeSecimListYukleMut(state,data){

        state.efinans_odeme_secim_list = data

        state.efinans_odeme_secim_toplam = 0

        for(let key in state.efinans_odeme_secim_list){

            const item = state.efinans_odeme_secim_list[key]

            state.efinans_odeme_secim_toplam += item.tutar
        }
    },
    efinans_gelen_sip_bilgileri_mut(state, data) {
        state.efinans_gelen_sip_bilgileri = data
    },
    efinans_gelen_sip_bilgileri_ayrinti_mut(state, data) {
        state.efinans_gelen_sip_bilgileri_ayrinti_sip_mik_top = 0
        state.efinans_gelen_sip_bilgileri_ayrinti_miktar_top =0
        for (let item in data) {
                state.efinans_gelen_sip_bilgileri_ayrinti_sip_mik_top+= data[item].satisToplami
                state.efinans_gelen_sip_bilgileri_ayrinti_miktar_top += data[item].miktar
        }
        state.efinans_gelen_sip_bilgileri_ayrinti = data
    }
}

const getters = {

    ekonteyner_ana_list_all(state){

        return state.ekonteyner_ana_list_all
    },
    ekonteyner_ana_list_filter(state){

        return state.ekonteyner_ana_list_filter
    },
    efinans_toplam_devir(state){

        return state.efinans_toplam_devir
    },
    efinans_toplam_ciro(state){

        return state.efinans_toplam_ciro
    },
    efinans_toplam_odenen(state){

        return state.efinans_toplam_odenen
    },
    efinans_toplam_bakiye(state){

        return state.efinans_toplam_bakiye
    },
    efinans_toplam_pesinat(state){

        return state.efinans_toplam_pesinat
    },
    efinans_toplam_genel_bakiye(state){

        return state.efinans_toplam_genel_bakiye
    },
    efinans_ayrinti_list(state){

        return state.efinans_ayrinti_list
    },
    efinans_ayrinti_kalan_toplam(state){

        return state.efinans_ayrinti_kalan_toplam
    },
    efinans_ayrinti_odeme_toplam(state){

        return state.efinans_ayrinti_odeme_toplam
    },
    efinans_ayrinti_odeme_list(state){

        return state.efinans_ayrinti_odeme_list
    },
    efinans_odeme_secim_list(state){

        return state.efinans_odeme_secim_list
    },
    efinans_odeme_secim_toplam(state){

        return state.efinans_odeme_secim_toplam
    },
    efinans_toplam_eski_pesinat(state){

        return state.efinans_toplam_eski_pesinat
    },
    efinans_gelen_sip_bilgileri(state) {
        return state.efinans_gelen_sip_bilgileri
    },
    efinans_gelen_sip_bilgileri_ayrinti(state) {
        return state.efinans_gelen_sip_bilgileri_ayrinti
    },
    efinans_gelen_sip_bilgileri_ayrinti_sip_mik_top(state) {
        return state.efinans_gelen_sip_bilgileri_ayrinti_sip_mik_top
    },
    efinans_gelen_sip_bilgileri_ayrinti_miktar_top(state) {
        return state.efinans_gelen_sip_bilgileri_ayrinti_miktar_top
    }
}


export default {

    state,
    actions,
    mutations,
    getters
}
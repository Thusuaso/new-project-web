const state = {

    epesinat_islem_listesi : [],
    epesinat_islem_liste_toplam : 0,
    epesinat_model : null,
}

const actions = {

    epesinat_listesi_yukle_act({commit},data){

        commit('epesinat_listesi_yukle_mut',data)
    },
    enew_pesinat_model_act({commit}){

        commit('enew_pesinat_model_mut')
    },
    eselect_pesinat_model_act({commit},data){

        commit('eselect_pesinat_model_mut',data)
    }
}

const mutations = {

    epesinat_listesi_yukle_mut(state,data){

        state.epesinat_islem_listesi = data

        state.epesinat_islem_liste_toplam = 0

        for(let key in state.epesinat_islem_listesi){

            state.epesinat_islem_liste_toplam = state.epesinat_islem_listesi[key].tutar
        }
    },
    enew_pesinat_model_mut(state){
        state.epesinat_model = {}
        state.epesinat_model.id = null 
        state.epesinat_model.musteri_id = null 
        state.epesinat_model.siparis_no = "" 
        state.epesinat_model.tarih = null 
        state.epesinat_model.tutar = 0
        state.epesinat_model.masraf = 0
    },
    eselect_pesinat_model_mut(state,data){

        state.epesinat_model = data

    }
}

const getters = {

    epesinat_islem_listesi(state){

        return state.epesinat_islem_listesi
    },
    epesinat_islem_liste_toplam(state){

        return state.epesinat_islem_liste_toplam
    },
    epesinat_model(state){

        return state.epesinat_model
    }
}

export default {

    state,
    actions,
    mutations,
    getters
}
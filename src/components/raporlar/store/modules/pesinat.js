const state = {
  pesinat_islem_listesi: [],
    pesinat_islem_liste_toplam : 0,
    pesinat_model : null,
}

const actions = {

    pesinat_listesi_yukle_act({commit},data){

        commit('pesinat_listesi_yukle_mut',data)
    },
    new_pesinat_model_act({commit}){

        commit('new_pesinat_model_mut')
    },
    select_pesinat_model_act({commit},data){

        commit('select_pesinat_model_mut',data)
    }
}

const mutations = {

    pesinat_listesi_yukle_mut(state,data){

        state.pesinat_islem_listesi = data

        state.pesinat_islem_liste_toplam = 0

        for(let key in state.pesinat_islem_listesi){

            state.pesinat_islem_liste_toplam = state.pesinat_islem_listesi[key].tutar
        }
    },
    new_pesinat_model_mut(state){
        state.pesinat_model = {}
        state.pesinat_model.id = null 
        state.pesinat_model.musteri_id = null 
        state.pesinat_model.siparis_no = "" 
        state.pesinat_model.tarih = null 
        state.pesinat_model.tutar = 0
        state.pesinat_model.masraf = 0
        state.pesinat_model.aciklama = ""
    },
    select_pesinat_model_mut(state,data){

        state.pesinat_model = data

    }
}

const getters = {

    pesinat_islem_listesi(state){

        return state.pesinat_islem_listesi
    },
    pesinat_islem_liste_toplam(state){

        return state.pesinat_islem_liste_toplam
    },
    pesinat_model(state){

        return state.pesinat_model
    }
}

export default {

    state,
    actions,
    mutations,
    getters
}
const state = {

    depo_ana_list : null,
    depo_ana_toplam_ciro : 0,
    depo_ana_toplam_odenen : 0,
    depo_ana_toplam_bakiye : 0,
    depo_ayrinti_list : null,
    depo_odeme_ayrinti_list : null,
    depo_ayrinti_toplam_ciro : 0,
    depo_ayrinti_toplam_odenen : 0,
    depo_ayrinti_toplam_bakiye : 0,
    depo_ayrinti_baslik : "",
    depo_ayrinti_musteriid : null
}

const actions = {

    depo_ana_list_yukle_act({commit},data){

        commit('depo_ana_liste_yukle_mut',data)
    },
    depo_ayrinti_list_yukle_act({commit},data){

        commit('depo_ayrinti_list_yukle_mut',data)
    },
    depo_ayrinti_baslik_act({commit},data){

        commit('depo_ayrinti_baslik_mut',data)
    }
}

const mutations = {

    depo_ana_liste_yukle_mut(state,data){

        state.depo_ana_list = data.depo_list

        state.depo_ana_toplam_ciro = 0
        state.depo_ana_toplam_odenen = 0
        state.depo_ana_toplam_bakiye = 0
        for(let key in state.depo_ana_list){

            const item = state.depo_ana_list[key]

            state.depo_ana_toplam_ciro += item.ciro
            state.depo_ana_toplam_odenen += item.odenen
            state.depo_ana_toplam_bakiye += item.bakiye
        }
    },
    depo_ayrinti_list_yukle_mut(state,data){

        state.depo_ayrinti_list = data.ayrinti_list
        state.depo_odeme_ayrinti_list = data.odeme_ayrinti_list
        state.depo_ayrinti_musteriid = data.musteriid

        state.depo_ayrinti_toplam_ciro = 0
        state.depo_ayrinti_toplam_odenen = 0
        state.depo_ayrinti_toplam_bakiye = 0

        for(let key in state.depo_ayrinti_list){

            const item = state.depo_ayrinti_list[key]
            
            state.depo_ayrinti_toplam_ciro += item.toplam
            state.depo_ayrinti_toplam_odenen += item.odenen
            state.depo_ayrinti_toplam_bakiye += item.bakiye
        }
    },
    depo_ayrinti_baslik_mut(state,data){

        state.depo_ayrinti_baslik = data
    }
}

const getters = {

    depo_ana_list(state){

        return state.depo_ana_list
    },
    depo_ana_toplam_ciro(state){

        return state.depo_ana_toplam_ciro
    },
    depo_ana_toplam_odenen(state){

        return state.depo_ana_toplam_odenen
    },
    depo_ana_toplam_bakiye(state){

        return state.depo_ana_toplam_bakiye
    },
    depo_ayrinti_list(state){

        return state.depo_ayrinti_list
    },
    depo_odeme_ayrinti_list(state){

        return state.depo_odeme_ayrinti_list
    },
    depo_ayrinti_toplam_ciro(state){

        return state.depo_ayrinti_toplam_ciro
    },
    depo_ayrinti_toplam_odenen(state){

        return state.depo_ayrinti_toplam_odenen
    },
    depo_ayrinti_toplam_bakiye(state){

        return state.depo_ayrinti_toplam_bakiye
    },
    depo_ayrinti_baslik(state){

        return state.depo_ayrinti_baslik
    },
    depo_ayrinti_musteriid(state){

        return state.depo_ayrinti_musteriid
    }
}


export default {

    state,
    actions,
    mutations,
    getters
}
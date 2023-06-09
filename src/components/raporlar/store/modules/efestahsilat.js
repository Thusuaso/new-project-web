const state = {

    ethmusteri : null,
    ethmusteri_list : null,
    ethmusteri_list_toplam_tutar : 0,
    ethmusteri_list_toplam_masraf : 0
}

const actions = {

    efestahsilatLoadAct({commit},data){

        commit('efestahsilatLoadMut',data)
    },
    efestahsilatSecimAct({commit},data){

        commit('efestahsilatSecimMut',data)
    }
}

const mutations = {

    efestahsilatLoadMut(state,data){

        state.ethmusteri = data.musteri_data
        state.ethmusteri_list = data.musteri_list

        state.ethmusteri_list_toplam_tutar = 0
        state.ethmusteri_list_toplam_masraf = 0

        for(let key in state.thmusteri_list){

            const item = state.ethmusteri_list[key]

            state.ethmusteri_list_toplam_tutar += item.tutar
            state.ethmusteri_list_toplam_masraf += item.masraf
        }
    },
    efestahsilatSecimMut(state,data){
        
        state.ethmusteri = data
    }
}

const getters = {

    ethmusteri(state){

        return state.ethmusteri
    },
    ethmusteri_list(state){

        return state.ethmusteri_list
    },
    ethmusteri_list_toplam_tutar(state){

        return state.ethmusteri_list_toplam_tutar
    },
    ethmusteri_list_toplam_masraf(state){

        return state.ethmusteri_list_toplam_masraf
    }
}


export default {

    state,
    actions,
    mutations,
    getters
}
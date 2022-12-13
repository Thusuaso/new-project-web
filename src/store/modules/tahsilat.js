const state = {

    thmusteri : null,
    thmusteri_list : null,
    thmusteri_list_toplam_tutar : 0,
    thmusteri_list_toplam_masraf : 0
}

const actions = {

    tahsilatLoadAct({commit},data){

        commit('tahsilatLoadMut',data)
    },
    tahsilatSecimAct({commit},data){

        commit('tahsilatSecimMut',data)
    }
}

const mutations = {

    tahsilatLoadMut(state,data){

        state.thmusteri = data.musteri_data
        state.thmusteri_list = data.musteri_list

        state.thmusteri_list_toplam_tutar = 0
        state.thmusteri_list_toplam_masraf = 0

        for(let key in state.thmusteri_list){

            const item = state.thmusteri_list[key]

            state.thmusteri_list_toplam_tutar += item.tutar
            state.thmusteri_list_toplam_masraf += item.masraf
        }
    },
    tahsilatSecimMut(state,data){
        
        state.thmusteri = data
    }
}

const getters = {

    thmusteri(state){

        return state.thmusteri
    },
    thmusteri_list(state){

        return state.thmusteri_list
    },
    thmusteri_list_toplam_tutar(state){

        return state.thmusteri_list_toplam_tutar
    },
    thmusteri_list_toplam_masraf(state){

        return state.thmusteri_list_toplam_masraf
    }
}


export default {

    state,
    actions,
    mutations,
    getters
}
const state = {

    kayit_kontrol_degeri: true,
    navlun_ilk_deger:[]
    
}

const actions = {

    kayit_kontrol_degeri_act({commit},data){

        commit('kayit_kontrol_degeri_mut',data)
    },
    navlun_ilk_degeri_act({commit},data){

        commit('navlun_ilk_degeri_mut',data)
    },

}

const mutations = {

    kayit_kontrol_degeri_mut(state,data){

        state.kayit_kontrol_degeri = data
    },
    navlun_ilk_degeri_mut(state,data){

        state.navlun_ilk_deger = data
    },
    
}

const getters = {

    kayit_kontrol_degeri(state){

        return state.kayit_kontrol_degeri
    },
    navlun_ilk_deger(state){

        return state.navlun_ilk_deger
    },

}

export default {

    state,
    actions,
    mutations,
    getters
}
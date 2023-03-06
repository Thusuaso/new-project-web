const state = {
    masraflar: {
        navlun_satis:0,
        navlun_alis: 0,
        detay_tutar1: 0,
        detay_tutar2: 0,
        detay_tutar3: 0,
        mekus_masrafi: 0,
        detay_alis1: 0,
        detay_alis2: 0,
        detay_alis3: 0,
        komisyon: 0,
        evrak_gideri: 0,
        satis_fiyati:0
    },
    data: [
        {'navlun':0,'tutar':0}
    ]
    
}

const actions = {
    navlun_satis_change_act({ commit }) {
        commit('navlun_satis_change_mut')
    },
    navlun_alis_change_act({ commit }) {
        commit('navlun_alis_change_mut')
    },
    detay_tutar1_change_act({ commit }) {
        commit('detay_tutar1_change_mut')
    },
    detay_tutar2_change_act({ commit }) {
        commit('detay_tutar2_change_mut')
    },
    detay_tutar3_change_act({ commit }) {
        commit('detay_tutar3_change_mut')
    },
    mekus_masrafi_change_act({ commit }) {
        commit('mekus_masrafi_change_mut')
    },
    detay_alis1_change_act({ commit }) {
        commit('detay_alis1_change_mut')
    },
    detay_alis2_change_act({ commit }) {
        commit('detay_alis2_change_mut')
    },
    detay_alis3_change_act({ commit }) {
        commit('detay_alis3_change_mut')
    },
    komisyon_change_act({ commit }) {
        commit('komisyon_change_mut')
    },
    evrak_gideri_change_act({ commit }) {
        commit('evrak_gideri_change_mut')
    },
    satis_fiyati_change_act({ commit }) {
        commit('satis_fiyati_change_mut')
    }
}

const mutations = {
    navlun_satis_change_mut(state) {
        state.masraflar.navlun_satis += 1
    },
    navlun_alis_change_mut(state) {
        state.masraflar.navlun_alis += 1
    },
    detay_tutar1_change_mut(state) {
        state.masraflar.detay_tutar1 += 1
    },
    detay_tutar2_change_mut(state) {
        state.masraflar.detay_tutar2 += 1
    },
    detay_tutar3_change_mut(state) {
        state.masraflar.detay_tutar3 += 1
    },
    mekus_masrafi_change_mut(state) {
        state.masraflar.mekus_masrafi += 1
    },
    detay_alis1_change_mut(state) {
        state.masraflar.detay_alis1 += 1
    },
    detay_alis2_change_mut(state) {
        state.masraflar.detay_alis2 += 1
    },
    detay_alis3_change_mut(state) {
        state.masraflar.detay_alis3 += 1
    },
    komisyon_change_mut(state) {
        state.masraflar.komisyon += 1
    },
    evrak_gideri_change_mut(state) {
        state.masraflar.evrak_gideri +=1
    },
    satis_fiyati_change_mut(state) {
        state.masraflar.satis_fiyati += 1
    }


}
const getters = {

}

export default {
    state,actions,mutations,getters
}
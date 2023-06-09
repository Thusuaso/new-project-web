const state = {
    fobMasraf: 0,
    uretici: 0,
    iscilik: 0,
    navlun: 0,
    komisyon: 0,
    digerTutar: 0,
    mekus_masraf: 0,
    genelToplam:0
}

const actions = {
    genel_toplam_act({ commit }) {
      commit('genel_toplam_mut')  
    },
    iscilik_add_act({ commit }, data) {
        commit('iscilik_add_mut', data)
        commit('genel_toplam_mut')
    },
    iscilik_delete_act({ commit }, data) {
        commit('iscilik_delete_mut', data)
        commit('genel_toplam_mut')
    },
    uretici_act({ commit }, data) {
        commit('uretici_mut',data)
    },
    fob_masraf_act({ commit }, data) {
        commit('fob_masraf_mut',data)
    },
    navlun_act({ commit }, data) {
        commit('navlun_mut', data)
        commit('genel_toplam_mut')
        
    },
    komisyon_act({ commit }, data) {
        commit('komisyon_mut',data)
    },
    diger_tutar_act({ commit }, data) {
        commit('diger_tutar_mut',data)
    },
    iscilik_act({ commit }, data) {
        commit('iscilik_mut',data)
    },
    mekus_masraf_act({ commit }, data) {
        commit('mekus_masraf_mut',data)
    }
}

const mutations = {
    fob_masraf_mut(state, fobMasraf) {
        state.fobMasraf = parseFloat(fobMasraf)
    },
    uretici_mut(state, uretici) {
        state.uretici = parseFloat(uretici)
    },
    iscilik_mut(state, iscilik) {
      state.iscilik = iscilik
    },
    iscilik_add_mut(state, iscilik) {
        state.iscilik += parseFloat(iscilik)
    },
    iscilik_delete_mut(state, iscilik) {
      state.iscilik -= parseFloat(iscilik)  
    },
    navlun_mut(state, navlun) {
        state.navlun = parseFloat(navlun)
    },
    komisyon_mut(state, komisyon) {
        state.komisyon = parseFloat(komisyon)
    },
    diger_tutar_mut(state, digerTutar) {
        state.digerTutar = parseFloat(digerTutar)
    },
    mekus_masraf_mut(state, mekus_masraf) {
        state.mekus_masraf = parseFloat(mekus_masraf)
    },
    genel_toplam_mut(state) {
        state.genelToplam = 0
        state.genelToplam = parseFloat(state.fobMasraf) +
            parseFloat(state.uretici) +
            parseFloat(state.iscilik) +
            parseFloat(state.navlun) +
            parseFloat(state.komisyon) +
            parseFloat(state.digerTutar) +
            parseFloat(state.mekus_masraf)
    }
}

const getters = {
    fobMasraf(state) {
        return state.fobMasraf
    },uretici(state) {
        return state.uretici
    }, iscilik(state) {
        return state.iscilik
    },navlun(state) {
        return state.navlun
    },komisyon(state) {
        return state.komisyon
    },digerTutar(state) {
        return state.digerTutar
    },mekus_masraf(state) {
        return state.mekus_masraf
    }, genelToplam(state) {
        return state.genelToplam
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
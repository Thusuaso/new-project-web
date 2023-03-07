const state = {
    masraflar: [
        { navlun_satis: 0, navlun_satis_tutar: 0 },
        {navlun_alis:0,navlun_alis_tutar:0},
        {detay_tutar1:0,detay_tutar1_tutar:0},
        {detay_tutar2:0,detay_tutar2_tutar:0},
        {detay_tutar3:0,detay_tutar3_tutar:0},
        {mekus_masrafi:0,mekus_masrafi_tutar:0},
        {detay_alis1:0,detay_alis1_tutar:0},
        {detay_alis2:0,detay_alis2_tutar:0},
        { detay_alis3: 0, detay_alis3_tutar: 0 },
        {komisyon:0,komisyon_tutar:0},
        {evrak_gideri:0,evrak_gideritutar:0},
        { satis_fiyati: 0, satis_fiyati_tutar: 0 },
        {miktar:0,miktar_sayisi:0}
    ],    
}

const actions = {
    navlun_satis_change_act({ commit },data) {
        commit('navlun_satis_change_mut',data)
    },
    navlun_alis_change_act({ commit },data) {
        commit('navlun_alis_change_mut',data)
    },
    detay_tutar1_change_act({ commit },data) {
        commit('detay_tutar1_change_mut',data)
    },
    detay_tutar2_change_act({ commit },data) {
        commit('detay_tutar2_change_mut',data)
    },
    detay_tutar3_change_act({ commit },data) {
        commit('detay_tutar3_change_mut',data)
    },
    mekus_masrafi_change_act({ commit },data) {
        commit('mekus_masrafi_change_mut',data)
    },
    detay_alis1_change_act({ commit },data) {
        commit('detay_alis1_change_mut',data)
    },
    detay_alis2_change_act({ commit },data) {
        commit('detay_alis2_change_mut',data)
    },
    detay_alis3_change_act({ commit },data) {
        commit('detay_alis3_change_mut',data)
    },
    komisyon_change_act({ commit },data) {
        commit('komisyon_change_mut',data)
    },
    evrak_gideri_change_act({ commit },data) {
        commit('evrak_gideri_change_mut',data)
    },
    satis_fiyati_change_act({ commit },data) {
        commit('satis_fiyati_change_mut',data)
    },
    miktar_change_act({ commit }, data) {
        commit('miktar_change_mut',data)
    }
}

const mutations = {
    navlun_satis_change_mut(state, data) {
        state.masraflar[0].navlun_satis += 1
        state.masraflar[0].navlun_satis_tutar = data

    },
    navlun_alis_change_mut(state,data) {
        state.masraflar[1].navlun_alis += 1
        state.masraflar[1].navlun_alis_tutar = data

    },
    detay_tutar1_change_mut(state,data) {
        state.masraflar[2].detay_tutar1 += 1
        state.masraflar[2].detay_tutar1_tutar = data

    },
    detay_tutar2_change_mut(state,data) {
        state.masraflar[3].detay_tutar2 += 1
        state.masraflar[3].detay_tutar2_tutar = data

    },
    detay_tutar3_change_mut(state,data) {
        state.masraflar[4].detay_tutar3 += 1
        state.masraflar[4].detay_tutar3_tutar = data

    },
    mekus_masrafi_change_mut(state,data) {
        state.masraflar[5].mekus_masrafi += 1
        state.masraflar[5].mekus_masrafi_tutar = data

    },
    detay_alis1_change_mut(state,data) {
        state.masraflar[6].detay_alis1 += 1
        state.masraflar[6].detay_alis1_tutar = data

    },
    detay_alis2_change_mut(state,data) {
        state.masraflar[7].detay_alis2 += 1
        state.masraflar[7].detay_alis2_tutar = data

    },
    detay_alis3_change_mut(state,data) {
        state.masraflar[8].detay_alis3 += 1
        state.masraflar[8].detay_alis3_tutar = data

    },
    komisyon_change_mut(state,data) {
        state.masraflar[9].komisyon += 1
        state.masraflar[9].komisyon_tutar = data

    },
    evrak_gideri_change_mut(state,data) {
        state.masraflar[10].evrak_gideri += 1
        state.masraflar[10].evrak_gideritutar = data
        
    },
    satis_fiyati_change_mut(state,data) {
        state.masraflar[11].satis_fiyati += 1
        state.masraflar[11].satis_fiyati_tutar = data

    },
    miktar_change_mut(state, data) {
        state.masraflar[12].miktar += 1
        state.masraflar[12].miktar_sayisi = data
    }


}
const getters = {
    masraflar(state) {
        console.log("masraflar",state.masraflar)
    }
}

export default {
    state,actions,mutations,getters
}
const state = {
    masraflar: [
        { isChange:0,label:'Navlun Satış', navlun_satis_tutar: 0 },
        {isChange:0,label:'Navlun Alış',navlun_alis_tutar:0},
        {isChange:0,label:'Detay Satış 1',detay_tutar1_tutar:0},
        {isChange:0,label:'Detay Satış 2',detay_tutar2_tutar:0},
        {isChange:0,label:'Detay Satış 3',detay_tutar3_tutar:0},
        {isChange:0,label:'Mekus Masrafı',mekus_masrafi_tutar:0},
        {isChange:0,label:'Detay Alış 1',detay_alis1_tutar:0},
        {isChange:0,label:'Detay Alış 2',detay_alis2_tutar:0},
        {isChange:0, label:'Detay Alış 3', detay_alis3_tutar: 0 },
        {isChange:0,label:'Komisyon',komisyon_tutar:0},
        {isChange:0,label:'Evrak Gideri',evrak_gideritutar:0},
        {isChange:0, label:'Sigorta Satış', sigorta_satis_tutar: 0 },
        {isChange:0,label:'Sigorta Alış',sigorta_alis_tutar:0},
        
    ],    
}

const actions = {
    masraflarResetAct({ commit }) {
        commit('masraflarResetMut')
    },
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

    sigorta_satis_change_act({ commit }, data) {
        commit('sigorta_satis_change_mut',data)
    },
    sigorta_alis_change_act({ commit }, data) {
        commit('sigorta_alis_change_mut',data)
    }
}

const mutations = {
    masraflarResetMut(state) {
      state.masraflar =  [
            { isChange:0,label:'Navlun Satış', navlun_satis_tutar: 0 },
            {isChange:0,label:'Navlun Alış',navlun_alis_tutar:0},
            {isChange:0,label:'Detay Satış 1',detay_tutar1_tutar:0},
            {isChange:0,label:'Detay Satış 2',detay_tutar2_tutar:0},
            {isChange:0,label:'Detay Satış 3',detay_tutar3_tutar:0},
            {isChange:0,label:'Mekus Masrafı',mekus_masrafi_tutar:0},
            {isChange:0,label:'Detay Alış 1',detay_alis1_tutar:0},
            {isChange:0,label:'Detay Alış 2',detay_alis2_tutar:0},
            {isChange:0, label:'Detay Alış 3', detay_alis3_tutar: 0 },
            {isChange:0,label:'Komisyon',komisyon_tutar:0},
            {isChange:0,label:'Evrak Gideri',evrak_gideritutar:0},
            {isChange:0, label:'Sigorta Satış', sigorta_satis_tutar: 0 },
            {isChange:0,label:'Sigorta Alış',sigorta_alis_tutar:0},
        
        ] 
    },
    navlun_satis_change_mut(state, data) {
        state.masraflar[0].isChange = 1
        state.masraflar[0].navlun_satis_tutar = data
    },
    navlun_alis_change_mut(state,data) {
        state.masraflar[1].isChange = 1
        state.masraflar[1].navlun_alis_tutar = data
        console.log(state.masraflar)


    },
    detay_tutar1_change_mut(state,data) {
        state.masraflar[2].isChange = 1
        state.masraflar[2].detay_tutar1_tutar = data

    },
    detay_tutar2_change_mut(state,data) {
        state.masraflar[3].isChange = 1
        state.masraflar[3].detay_tutar2_tutar = data

    },
    detay_tutar3_change_mut(state,data) {
        state.masraflar[4].isChange = 1
        state.masraflar[4].detay_tutar3_tutar = data

    },
    mekus_masrafi_change_mut(state,data) {
        state.masraflar[5].isChange = 1
        state.masraflar[5].mekus_masrafi_tutar = data

    },
    detay_alis1_change_mut(state,data) {
        state.masraflar[6].isChange = 1
        state.masraflar[6].detay_alis1_tutar = data

    },
    detay_alis2_change_mut(state,data) {
        state.masraflar[7].isChange = 1
        state.masraflar[7].detay_alis2_tutar = data

    },
    detay_alis3_change_mut(state,data) {
        state.masraflar[8].isChange = 1
        state.masraflar[8].detay_alis3_tutar = data

    },
    komisyon_change_mut(state,data) {
        state.masraflar[9].isChange = 1
        state.masraflar[9].komisyon_tutar = data

    },
    evrak_gideri_change_mut(state,data) {
        state.masraflar[10].isChange = 1
        state.masraflar[10].evrak_gideritutar = data
        
    },

    sigorta_satis_change_mut(state, data) {
        state.masraflar[11].isChange = 1
        state.masraflar[11].sigorta_satis_tutar = data
    },
    sigorta_alis_change_mut(state, data) {
        state.masraflar[12].isChange = 1
        state.masraflar[12].sigorta_alis_tutar = data
    }


}
const getters = {
    masraflar(state) {
        return state.masraflar
    }
}

export default {
    state,actions,mutations,getters
}
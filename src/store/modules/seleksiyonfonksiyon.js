const state = {

    slk_dis_yeni_btn : false,
    slk_dis_vazgec_btn : true,
    slk_dis_kaydet_btn : true,
    slk_dis_guncelle_btn : true,
    slk_dis_sil_btn : true,
    slk_enb_mekmar: true,
    slk_enb_dis: false,
    slk_enb_mekmer_dis:false,
    slk_form : false,
   
}

const actions = {

     seleksiyonKaydetClickActions({commit}){

        commit('seleksiyonKaydetMut')
     },
     seleksiyonYeniClickActions({commit}){

        commit('seleksiyonYeniClickMut')
     },
     seleksiyonVazgecClickActions({commit}){

        commit('seleksiyonVazgecClickMut')
     },
     seleksiyonGuncelleClickActions({commit}){

        commit('seleksiyonGuncelleClickMut')
     },
     seleksiyonSilClickActions({commit}){

        commit('seleksiyonSilClickMut')
     },
     seleksiyonSelectItemActions({commit}){

        commit('seleksiyonSelectItemMut')
     },
     seleksiyonMekmarUretimSecActions({commit}){

        commit('seleksiyonMekmarUretimSecMut')
     },
     seleksiyonDisUretimSecActions({commit}){

        commit('seleksiyonDisUretimSecMut')
    },
    seleksiyonMekmerDisUretimSecActions({ commit }) {
       commit('seleksiyonMekmerDisUretimSecMut')  
     },
     seleksiyonFormAcActions({commit}){
         commit('seleksiyonFormAcMut')
     },
     seleksiyonFormKapatActions({commit}){

        commit('seleksiyonFormKapatMut')
     }
}

const mutations = {

    seleksiyonKaydetMut(state){

        state.slk_dis_yeni_btn = false
        state.slk_dis_kaydet_btn = true
        state.slk_dis_vazgec_btn = true;
        state.slk_dis_guncelle_btn = true;
        state.slk_dis_sil_btn = true; 
        state.slk_form = true
    },
    seleksiyonYeniClickMut(state){

        state.slk_dis_yeni_btn = true
        state.slk_dis_kaydet_btn = false
        state.slk_dis_vazgec_btn = false;
        state.slk_dis_guncelle_btn = true;
        state.slk_dis_sil_btn = true; 
        state.slk_form = false
    },
    seleksiyonVazgecClickMut(state){

        state.slk_dis_yeni_btn = false
        state.slk_dis_kaydet_btn = true
        state.slk_dis_vazgec_btn = true;
        state.slk_dis_guncelle_btn = true;
        state.slk_dis_sil_btn = true; 
        state.slk_form = true
    },
    seleksiyonGuncelleClickMut(state){

        state.slk_dis_yeni_btn = false
        state.slk_dis_kaydet_btn = true
        state.slk_dis_vazgec_btn = true;
        state.slk_dis_guncelle_btn = true;
        state.slk_dis_sil_btn = true; 
        state.slk_form = true
    },
    seleksiyonSilClickMut(state){

        state.slk_dis_yeni_btn = false
        state.slk_dis_kaydet_btn = true
        state.slk_dis_vazgec_btn = true;
        state.slk_dis_guncelle_btn = true;
        state.slk_dis_sil_btn = true; 
        state.slk_form = true
    },
    seleksiyonSelectItemMut(state){

        state.slk_dis_yeni_btn = true
        state.slk_dis_kaydet_btn = true
        state.slk_dis_vazgec_btn = false;
        state.slk_dis_guncelle_btn = false;
        state.slk_dis_sil_btn = false; 
        state.slk_form = false
    },
    seleksiyonMekmarUretimSecMut(state){

        state.slk_enb_mekmar = true;
        state.slk_enb_dis = false;
        state.slk_enb_mekmer_dis = false;
    },
    seleksiyonDisUretimSecMut(state){
        state.slk_enb_dis = true
        state.slk_enb_mekmar = false;
        state.slk_enb_mekmer_dis = false;
    },
    seleksiyonMekmerDisUretimSecMut(state) {
        state.slk_enb_dis = false
        state.slk_enb_mekmar = false;
        state.slk_enb_mekmer_dis = true;
    },
    seleksiyonFormAcMut(state){

        state.slk_form = true;
    },
    seleksiyonFormKapatMut(state){

        state.slk_form = false;
    }
}

const getters = {

    slk_dis_yeni_btn(state){

        return state.slk_dis_yeni_btn
    },
    slk_dis_kaydet_btn(state){

        return state.slk_dis_kaydet_btn
    },
    slk_dis_vazgec_btn(state){

        return state.slk_dis_vazgec_btn
    },
    slk_dis_guncelle_btn(state){

        return state.slk_dis_guncelle_btn
    },
    slk_dis_sil_btn(state){

        return state.slk_dis_sil_btn
    },
    slk_enb_mekmar(state){

        return state.slk_enb_mekmar
    },
    slk_enb_dis(state){

        return state.slk_enb_dis
    },
    slk_enb_mekmer_dis(state) {
      return state.slk_enb_mekmer_dis  
    },
    slk_form(state){

        return state.slk_form
    }
}

export default {


    state,
    actions,
    mutations,
    getters
}
const state = {

    thtedarikci : null,
    tedarikci_liste : null,
}

const actions = {

    tedarikci_liste_yukle_act({commit},data){

        commit('tedarikci_liste_yukle_mut',data)
    },
    tedarikci_secim_act({commit},data){

        commit('tedarikci_secim_mut',data)
    },
    tedarikci_model_sifirla_act({commit}){

        commit('tedarikci_model_sifirla_mut')
    }
}

const mutations = {

    tedarikci_liste_yukle_mut(state,data){

        state.thtedarikci = data.tedarikci_model
        state.tedarikci_liste = data.tedarikci_liste
    },
    tedarikci_secim_mut(state,data){

        state.thtedarikci = data
    },
    tedarikci_model_sifirla_mut(state){

        state.thtedarikci.id = null
        state.thtedarikci.tedarikciadi = ""
        state.thtedarikci.siparis_sayisi = 0
    }

}

const getters = {

    thtedarikci(state){

        return state.thtedarikci
    },
    tedarikci_liste(state){

        return state.tedarikci_liste
    }
}


export default {

    state,
    actions,
    mutations,
    getters
}
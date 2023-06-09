const state = {
    maliyet_hata_list: [],
    maliyet_hata_model: [],
    maliyet_hata_new_button:false,
}
const actions = {
    maliyet_hata_list_load_act({commit},data) {
        commit('maliyet_hata_list_load_mut', data);
    },
    maliyet_hata_model_list_load_act({ commit }, data) {
        commit('maliyet_hata_model_list_load_mut', data);
    },
    maliyet_hata_new_button_load_act({ commit }, data) {
        commit('maliyet_hata_new_button_load_mut', data);
    }
}
const mutations = {
    maliyet_hata_list_load_mut(state,data) {
        state.maliyet_hata_list = data;
    },
    maliyet_hata_model_list_load_mut(state,data) {
        state.maliyet_hata_model = data;
    },
    maliyet_hata_new_button_load_mut(state,data) {
        state.maliyet_hata_new_button = data;

    }
}
const getters = {
    maliyet_hata_list(state) {
        return state.maliyet_hata_list;
    },
    maliyet_hata_model(state) {
        return state.maliyet_hata_model;
    },
    maliyet_hata_new_button(state) {
        return state.maliyet_hata_new_button;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
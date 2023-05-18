const state = {
    yapilacaklarModel:{},
    yapilacaklarYapilmadiList: [],
    yapilacaklarYapildiList:[],
    yapilacaklarUserList: [],
    yapilacaklarYeniButtonForm: false,
    yapilacaklarCount:0,
    
}
const actions =  {
    yapilacaklar_model_load_act({ commit },data) {
        commit('yapilacaklar_model_load_mut', data);
    },
    yapilacaklar_list_load_act({ commit },data) {
        commit('yapilacaklar_list_load_mut', data);
    },
    yapilacaklar_users_list_load_act({ commit }, data) {
        commit('yapilacaklar_users_list_load_mut', data);
    },
    yapilacaklar_yeni_button_form_load_act({ commit }, data) {
        commit('yapilacaklar_yeni_button_form_load_mut',data)
    }
}
const mutations= {
    yapilacaklar_model_load_mut(state, data) {
        state.yapilacaklarModel = data;
    },
    yapilacaklar_list_load_mut(state, data) {
        state.yapilacaklarYapilmadiList = data.yapilmadi;
        state.yapilacaklarCount = data.yapilmadi.length;
        state.yapilacaklarYapildiList = data.yapildi;

    },
    yapilacaklar_users_list_load_mut(state, data) {
        state.yapilacaklarUserList = data;
    },
    yapilacaklar_yeni_button_form_load_mut(state, data) {
        state.yapilacaklarYeniButtonForm = data;
    }
}
const getters = {
    yapilacaklarModel(state) {
        return state.yapilacaklarModel;
    },
    yapilacaklarYapilmadiList(state) {
        return state.yapilacaklarYapilmadiList;
    },
    yapilacaklarYapildiList(state) {
        return state.yapilacaklarYapildiList;
    },
    yapilacaklarUserList(state) {
        return state.yapilacaklarUserList;
    },
    yapilacaklarYeniButtonForm(state) {
        return state.yapilacaklarYeniButtonForm;
    },
    yapilacaklarCount(state) {
        return state.yapilacaklarCount;
    }
}

export default {
    state,
    actions,
    mutations,
    getters,
}
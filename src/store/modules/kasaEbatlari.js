const state = {
    kasa_ebatlari_list: null
}
const actions = {
    kasa_ebatlari_list_load({ commit }, data) {
        commit('kasa_ebatlari_list_mut',data)
    }
}

const mutations = {
    kasa_ebatlari_list_mut(state, data) {
        state.kasa_ebatlari_list = data
    }
}

const getters = {
    kasa_ebatlari_list(state) {
        return state.kasa_ebatlari_list
    }
}

export default {
    state,
    actions, 
    mutations,
    getters
}
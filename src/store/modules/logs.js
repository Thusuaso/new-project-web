const state=  {
    logs_maliyet: [],
    logs_degisimler: [],
    yil_list: [],
    yil:{}
}
const actions = {
    logs_load_act({ commit }, data) {
        commit('logs_load_mut',data)
    },
    logs_degisimler_load_act({ commit }, data) {
        commit('logs_degisimler_load_mut',data)
    },
    logs_yil_list_load_act({ commit }, data) {
        commit('logs_yil_list_load_mut', data)
        commit('selected_yil_load_mut',data[0])
    },
    selected_yil_load_act({ commit }, data) {
        commit('selected_yil_load_mut',data)
    }
}
const mutations = {
    logs_load_mut(state, data) {
        state.logs_maliyet = data
    },
    logs_degisimler_load_mut(state, data) {
        state.logs_degisimler = data
    },
    logs_yil_list_load_mut(state, data) {
        state.yil_list = data
    },
    selected_yil_load_mut(state, data) {
        state.yil = data
    }
}

const getters = {
    logs_maliyet(state) {
        return state.logs_maliyet
    },
    logs_degisimler(state) {
        return state.logs_degisimler
    },
    yil_list(state) {
        return state.yil_list
    },
    yil(state) {
        return state.yil
    }
}

export default {
    state,actions,mutations,getters
}
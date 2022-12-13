const state = {
    getWidth:null
}

const actions = {

    mobilWidthLoad({ commit },data) {
        commit('mobilWidthMut',data)
    }
}

const mutations = {
    mobilWidthMut(state,data) {
        state.getWidth = data
    }
}

const getters = {
    getMobilWidth(state) {
        return state.getWidth
    }
}


export default{

    state,
    actions,
    mutations,
    getters
}
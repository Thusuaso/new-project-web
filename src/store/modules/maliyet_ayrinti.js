const state = {

    maliyet_data: null,
}

const actions = {

    maliyet_data_yukle_act({commit},data){

        commit('maliyet_data_yukle_mut',data)
    },

}

const mutations = {

    maliyet_data_yukle_mut(state,data)
    {

        state.maliyet_data = data
    },

}

const getters = {

    maliyet_data(state){

        return state.maliyet_data
    },

}

export default {

    state,
    actions,
    mutations,
    getters
}


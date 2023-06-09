const state = {

    ocak_data:null
}

const actions = {

    ocak_data_yukle_act({commit},data){

        commit('ocak_data_yukle_mut',data)
    }
}

const mutations = {

    ocak_data_yukle_mut(state,data)
    {

        state.ocak_data = data
    }
}

const getters = {

    ocak_data(state){

        return state.ocak_data
    }
}

export default {

    state,
    actions,
    mutations,
    getters
}


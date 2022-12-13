const state = {

     takip_form : null
}

const actions = {

    takipFormLoadAct({commit},data){

        commit('takipFormLoadMut',data)
    }
}

const mutations = {

    takipFormLoadMut(state,data){

        state.takip_form = data
    }
}

const getters = {

    takip_form(state){

        return state.takip_form
    }
}

export default {

    state,
    actions,
    mutations,
    getters
}
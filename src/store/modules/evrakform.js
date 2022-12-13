const state = {

   
    SiparisEvrakList : null,
    SiparisEvrakList1 : null
    
}

const actions = {

    loadEvrakForm({commit},data){

        commit('loadEvrakFormMut',data)
    },
    loadEvrakForm1({commit},data){

        commit('loadEvrakFormMut1',data)
    }

}

const mutations = {

    loadEvrakFormMut(state,data){
        
       
        state.SiparisEvrakList = data
 
        
 },
 loadEvrakFormMut1(state,data){
        
       
    state.SiparisEvrakList1 = data

    
}
    
}

const getters = {

 
    SiparisEvrakList(state){

        return state.SiparisEvrakList
    },
    SiparisEvrakList1(state){
        return state.SiparisEvrakList1
    }
}

export default {

    state,
    actions,
    mutations,
    getters
}
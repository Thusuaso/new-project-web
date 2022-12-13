const state = {

    stok_list : null,
    sea_list : null,
    satis_list :null,
    maliyet_list : null
    
}

const actions = {

    AtlantaStatusLoadAct({commit},data){

        commit('AtlantaStatusLoadMut',data)
        
    },
    AtlantaStatusLoadSeaAct({commit},data){

        commit('AtlantaStatusLoadSeaMut',data)
      
        
    },
    AtlantaSatisAct({commit},data){

        commit('AtlantaSatisMut',data)
      
        
    },
    AtlantaMaliyetAct({commit},data){

        commit('AtlantaMaliyetMut',data)
      
        
    },
   
}

const mutations = {

    AtlantaStatusLoadMut(state,data){
     
        state.stok_list = data
     },
     AtlantaStatusLoadSeaMut(state,data){
      
        
        state.sea_list = data
    },
    AtlantaSatisMut(state,data){
      
        
        state.satis_list = data
    },
    AtlantaMaliyetMut(state,data){
      
        
        state.maliyet_list = data
    },
   
}

const getters = {

    stok_list(state){
        
        return state.stok_list
    },
    sea_list(state){
        
        return state.sea_list
    },
    satis_list(state){
        
        return state.satis_list
    },
    maliyet_list(state){
        
        return state.maliyet_list
    },
}


export default {

    state,
    actions,
    mutations,
    getters
}
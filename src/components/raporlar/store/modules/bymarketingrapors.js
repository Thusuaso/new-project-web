const state = {
    mekmarLoadMonths: [],
    mekmarBdLoadMonths: [],
    mekmarTotalLoadMonths:[],
    byCustomersProduct: [],
    byMarketingLoadMonth: [],
    byMarketingProduct: [],
    byMarketingWarehouseLoad: [],
    byMarketingLoadMonthDetail: [],
    byMarketingMonthLoadIcPiyasaList: [],
    byMarketingMonthLoadMekmerList: [],
    icPiyasaSumFob: 0,
    icPiyasaSumDdp: 0,
    mekmerSumFob: 0,
    mekmerSumDdp: 0,
    byMarketingProductFobSum: 0,
    byMarketingProductCfrSum: 0,
    byMarketingUretimList2: [],
    byMarketingUretimList: [],
    
}

const actions = {
    mekmarLoadMonthsAct({ commit }, data) {
        commit("mekmarLoadMonthsMut",data)
    },
    mekmarTotalLoadMonthsAct({ commit }, data) {
        commit("mekmarTotalLoadMonthsMut",data)
    },
    byCustomersProductAct({ commit }, data) {
        commit('byCustomersProductMut',data)
    },
    byMarketingLoadMonthAct({ commit }, data) {
        commit('byMarketingLoadMonthMut',data)
    },
    byMarketingLoadMonthListAct({ commit }, data) {
        commit('byMarketingLoadMonthListMut',data)
    },
    byMarketingUretimLoadListAct({ commit }, data) {
        commit('byMarketingUretimLoadListMut', data);
    },
    byMarketingHaliHazirUretimLoadListAct({ commit }, data) {
        commit('byMarketingHaliHazirUretimLoadListMut',data)
    }
}

const mutations = {
    byMarketingHaliHazirUretimLoadListMut(state, data) {
        state.byMarketingUretimList = data;
    },
    byMarketingUretimLoadListMut(state, data) {
        state.byMarketingUretimList2 = data;
    },
    mekmarLoadMonthsMut(state, data) {
        state.mekmarBdLoadMonths = data.data.marketingBd
        state.mekmarLoadMonths = data.data.marketingYuklemeAylik
    },
    mekmarTotalLoadMonthsMut(state, data) {
        state.mekmarTotalLoadMonths = data
    },
    byCustomersProductMut(state, data) {
        state.byCustomersProduct = data
    },
    byMarketingLoadMonthMut(state, data) {
        state.byMarketingLoadMonth = data.data.marketingYukleme
        state.byMarketingProduct = data.data.marketingUretim
        state.byMarketingProductFobSum= 0
        state.byMarketingProductCfrSum=0
        for (let item of data.data.marketingUretim) {
            state.byMarketingProductFobSum += item.fobToplam
            state.byMarketingProductCfrSum += item.cfrToplam
        }
        state.byMarketingWarehouseLoad = data.data.marketingDepo
        state.byMarketingLoadMonthDetail = data.data.marketingYuklemeDetail
    },
    byMarketingLoadMonthListMut(state, data) {
        state.icPiyasaSumFob =  0
        state.icPiyasaSumDdp = 0
        state.mekmerSumFob =  0
        state.mekmerSumDdp =  0
        state.byMarketingMonthLoadIcPiyasaList = data.icPiyasa
        for (let item of data.icPiyasa) {
            state.icPiyasaSumFob +=  item.fob
            state.icPiyasaSumDdp +=  item.ddp
        }
        state.byMarketingMonthLoadMekmerList = data.mekmer
        for (let item of data.mekmer) {
            state.mekmerSumFob +=  item.fob
            state.mekmerSumDdp +=  item.ddp
        }
    }
    
}

const getters = {
    byMarketingUretimList2(state) {
        return state.byMarketingUretimList2;  
    },
    byMarketingUretimList(state) {
        return state.byMarketingUretimList;
    },
    mekmarLoadMonths(state) {
        return state.mekmarLoadMonths
    },
    mekmarBdLoadMonths(state) {
        return state.mekmarBdLoadMonths
    },
    mekmarTotalLoadMonths(state) {
        return state.mekmarTotalLoadMonths
    },
    byCustomersProduct(state) {
        return state.byCustomersProduct
    },
    byMarketingLoadMonth(state) {
        return state.byMarketingLoadMonth
    },
    byMarketingProduct(state) {
        return state.byMarketingProduct
    },
    byMarketingWarehouseLoad(state) {
        return state.byMarketingWarehouseLoad
    },
    byMarketingLoadMonthDetail(state) {
        return state.byMarketingLoadMonthDetail
    },
    byMarketingMonthLoadIcPiyasaList(state) {
        return state.byMarketingMonthLoadIcPiyasaList
    },
    byMarketingMonthLoadMekmerList(state) {
        return state.byMarketingMonthLoadMekmerList
    },
    icPiyasaSumFob(state) {
        return state.icPiyasaSumFob
    },
    icPiyasaSumDdp(state) {
        return state.icPiyasaSumDdp
    }
    ,
    mekmerSumFob(state) {
        return state.mekmerSumFob
    },
    mekmerSumDdp(state) {
        return state.mekmerSumDdp
    },
    byMarketingProductFobSum(state) {
        return state.byMarketingProductFobSum
    },
    byMarketingProductCfrSum(state) {
        return state.byMarketingProductCfrSum
    }

}

export default {
    state,
    actions,
    mutations,
    getters
}
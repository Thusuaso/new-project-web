
const state = {

    musteri_listesi: null,
    musteri_siparis_listesi:null,
    siparis_ozet : null , 
    siparis_ozet_ayrinti : null,
    musteri_model : null,
    musteri_ulke_list : null,
    musteri_temsilci_list: null,
    ulkeye_gore_musteriler: null,
    ulkeye_gore_musteriler_ayrinti_sip: null,
    ulkeye_gore_musteriler_ayrinti_yuk: null,
    customer_product_detail_list: null,
    teklifMusteri: [],
    teklifMusteriAyrinti: [],
    fuarMusteri: [],
    fuarMusteriAyrinti: [],
    bgpMusteri: [],
    customerSurfaceList: [],
    surfaceList: [],
    customerSurfaceListA:[]
    
}

const actions = {


    musteri_listesi_yukle_act({commit},data){

        commit('musteri_listesi_yukle_mut',data)
    },
    musteri_siparis_listesi_yukle_act({commit},data){

        commit('musteri_siparis_listesi_yukle_act',data)
    },
    yeni_musteri_model_yukle_act({commit},data){

        commit('yeni_musteri_model_yukle_mut',data)
    },
    musteri_detay_yukle_act({commit},data){

        commit('musteri_detay_yukle_mut',data)
    }
    ,
    musteri_siparis_yukle_act({commit},data){

        commit('musteri_siparis_yukle_mut',data)
    },
    siparis_ozet_ayrinti_act({commit},data){

        commit('siparis_ozet_ayrinti_mut',data)
    },
    ulkeye_gore_musteriler_act({ commit }, data) {
        commit('ulkeye_gore_musteriler_mut',data)
    },
    ulkeye_gore_musteriler_ayrinti_act({ commit }, data) {
        commit('ulkeye_gore_musteriler_ayrinti_mut',data)
    },
    customer_product_detail_list_act({ commit }, data) {
        commit('customer_product_detail_list_mut',data)
    },
    teklif_musteri_load_act({ commit }, data) {
        commit("teklif_musteiri_load_mut",data)
    },
    teklif_musteri_ayrinti_load_act({ commit }, data) {
        commit("teklif_musteri_ayrinti_load_mut",data)
    },
    fuar_musteri_load_act({ commit }, data) {
        commit("fuar_musteri_load_mut",data)
    },
    bgp_musteri_load_act({ commit }, data) {
        commit("bgp_musteri_load_mut",data)
    },
    customers_surface_list_load_act({ commit }, data) {
        commit('customers_surface_list_load_mut',data)
    }
}

const mutations = {
    customers_surface_list_load_mut(state, data) {
        state.customerSurfaceList = data.customersList
        state.surfaceList = data.surfaceList
        state.customerSurfaceListA = []
        for (let i of data.surfaceList) {
            state.customerSurfaceListA.push({ surfaceName:i.surface ,dataList:data.customersList.filter(x => x.surfaceId == i.id) })
        }


    },

    musteri_listesi_yukle_mut(state,data){

        state.musteri_listesi = data
    },
    musteri_siparis_listesi_yukle_mut(state,data){

        state.musteri_siparis_listesi = data
    },
    siparis_ozet_ayrinti_mut(state,data){

        state.siparis_ozet_ayrinti = data
    },
    yeni_musteri_model_yukle_mut(state,data){

        state.musteri_model = data.musteri_model
        state.siparis_ozet = data.siparis_ozet
        state.musteri_ulke_list = data.ulke_list
        state.musteri_temsilci_list = data.temsilci_list
    },
    musteri_detay_yukle_mut(state,data){
        state.musteri_model = data.musteri_detay
        state.siparis_ozet = data.siparis_ozet
        state.musteri_ulke_list = data.ulke_list
        state.musteri_temsilci_list = data.temsilci_list
    },
    ulkeye_gore_musteriler_mut(state, data) {
        state.ulkeye_gore_musteriler = data
    },
    ulkeye_gore_musteriler_ayrinti_mut(state, data) {
        state.ulkeye_gore_musteriler_ayrinti_sip = data.sip
        state.ulkeye_gore_musteriler_ayrinti_yuk = data.yuk
    },
    customer_product_detail_list_mut(state, data) {
        state.customer_product_detail_list = data
    },
    teklif_musteiri_load_mut(state, data) {
        state.teklifMusteri = data
    },
    teklif_musteri_ayrinti_load_mut(state, data) {
        state.teklifMusteriAyrinti = data[0]
    },
    fuar_musteri_load_mut(state, data) {
        state.fuarMusteri = data
    },
    bgp_musteri_load_mut(state, data) {
        state.bgpMusteri = data
    }
}

const getters = {
    customerSurfaceList(state) {
        return state.customerSurfaceList
    },
    surfaceList(state) {
        return state.surfaceList
    },
    musteri_listesi(state){

        return state.musteri_listesi
    },
    musteri_siparis_listesi(state){

        return state.musteri_siparis_listesi
    },
    musteri_model(state){

        return state.musteri_model
    },
    siparis_ozet(state){

        return state.siparis_ozet
    },
    siparis_ozet_ayrinti(state){

        return state.siparis_ozet_ayrinti
    },
    musteri_ulke_list(state){

        return state.musteri_ulke_list
    },
    musteri_temsilci_list(state){

        return state.musteri_temsilci_list
    },
    ulkeye_gore_musteriler(state) {
        return state.ulkeye_gore_musteriler
    },
    ulkeye_gore_musteriler_ayrinti_sip(state) {
        return state.ulkeye_gore_musteriler_ayrinti_sip
    },
    ulkeye_gore_musteriler_ayrinti_yuk(state) {
        return state.ulkeye_gore_musteriler_ayrinti_yuk

    },
    customer_product_detail_list(state) {
        return state.customer_product_detail_list
    },
    teklifMusteri(state) {
        return state.teklifMusteri
    },
    teklifMusteriAyrinti(state) {
        return state.teklifMusteriAyrinti
    },
    fuarMusteri(state) {
        return state.fuarMusteri
    },
    bgpMusteri(state) {
        return state.bgpMusteri
    },
    customerSurfaceListA(state) {
        return state.customerSurfaceListA
    }
}

export default {

    state,
    actions,
    mutations,
    getters
}
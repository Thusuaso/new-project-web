const state = {
  satisci_detay: null,
  satisci_a: null,
  satisci_b: null,
  satisci_c: null,
  temsilciler_list: null,
  customers_all: null,
  musteri_teklifler: null,
  musteriAdi:""
};

const actions = {
  musteri_ayrinti_yukle_act({ commit }, data) {
    commit("musteri_ayrinti_yukle_mut", data);
  },
  musteri_teklifler_ayrinti_yukle_act({ commit }, data) {
    commit("musteri_teklifler_ayrinti_yukle_mut", data);
  },
  customers_yukle_act({ commit }, data) {
    commit("customers_yukle_mut", data);
  },
  customers_temsilci_yukle_act({ commit }, data) {
    commit("customers_temsilci_yukle_mut", data);
  },
  customers_yukle_all_act({ commit }, data) {
    commit("customers_temsilci_all_yukle_mut", data);
  },
  customers_musteriAdi_yukle_act({ commit }, data) {
    commit("customers_musteriAdi_yukle_mut",data)
  }
};

const mutations = {
  musteri_ayrinti_yukle_mut(state, data) {
    state.satisci_detay = data;
  },
  customers_yukle_mut(state, data) {
    state.satisci_a = data.filter((x) => x.oncelik === "A");
    state.satisci_b = data.filter((x) => x.oncelik === "B");
    state.satisci_c = data.filter((x) => x.oncelik == "C");
  },
  customers_temsilci_yukle_mut(state, data) {
    state.temsilciler_list = data;
  },
  customers_temsilci_all_yukle_mut(state, data) {
    state.customers_all = data;
  },
  musteri_teklifler_ayrinti_yukle_mut(state, data) {
    state.musteri_teklifler = data;
  },
  customers_musteriAdi_yukle_mut(state, data) {
    state.musteriAdi = data
  }
};

const getters = {
  satisci_detay(state) {
    return state.satisci_detay;
  },
  satisci_a(state) {
    return state.satisci_a;
  },
  satisci_b(state) {
    return state.satisci_b;
  },
  satisci_c(state) {
    return state.satisci_c;
  },
  temsilciler_list(state) {
    return state.temsilciler_list;
  },
  customers_all(state) {
    return state.customers_all;
  },
  musteri_teklifler(state) {
    return state.musteri_teklifler;
  },
  musteriAdi(state) {
    return state.musteriAdi
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
};

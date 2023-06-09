const state = {
  kasaToplami: 0,
  siparisToplami: 0,
  uretimToplami: 0,
  satisToplami: 0,
  tonToplami: 0,
  siparisToplamiAdet: 0,
  siparisToplamiM2:0
};

const actions = {
  loadToplamGuncelleAct({ commit }, data) {
    commit("loadToplamGuncelleMut", data);
  },
};

const mutations = {
  loadToplamGuncelleMut(state, data) {
    state.kasaToplami = data.kasaToplami;
    state.siparisToplami = data.siparisToplami;
    state.uretimToplami = data.uretimToplami;
    state.satisToplami = data.satisToplami;
    state.tonToplami = data.tonToplami;
    state.siparisToplamiAdet = data.siparisToplamiAdet
    state.siparisToplamiM2 = data.siparisToplamiM2
  },
};

const getters = {
  kasaToplami(state) {
    return state.kasaToplami;
  },
  siparisToplami(state) {
    return state.siparisToplami;
  },
  uretimToplami(state) {
    return state.uretimToplami;
  },

  satisToplami(state) {
    return state.satisToplami;
  },
  tonToplami(state) {
    return state.tonToplami;
  },
  siparisToplamiAdet(state) {
    return state.siparisToplamiAdet
  },
  siparisToplamiM2(state) {
    return state.siparisToplamiM2
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
};

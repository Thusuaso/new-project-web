const state = {
  urunKartMenuList: null,
  isUrunKart: false,
  select_seleksiyon_kart: {},
  selectSiparisKart: {},
};

const actions = {
  urunKartMenuAct({ commit }, data) {
    commit("urunKartMenuMut", data);
  },
  isUrunKartLoad({ commit }) {
    commit("isUrunKartLoadMut");
  },
  siparisUrunKartAct({ commit }, data) {
    if (data) {
      commit("siparisUrunKartMut", data);
    }
  },
  seleksiyonUrunKartAct({ commit }, data) {
    if (data) {
      commit("seleksiyonUrunKartMut");
    }
  },
  siparisFormUrunGuncelleAct({ commit }, urunKartId) {
    commit("siparisFormUrunGuncelleMut", urunKartId);
  },
  yeniKartEkleAct({ commit }, data) {
    commit("yeniKartEkleMut", data);
  },
  kartGuncellemeAct({ commit }, data) {
    commit("kartGuncellemeMut", data);
  },
  kartSilmeAct({ commit }, data) {
    commit("kartsilmeMut", data);
  },
};

const mutations = {
  urunKartMenuMut(state, data) {
    state.urunKartMenuList = data;
  },
  siparisUrunKartMut(state, data) {
    state.selectSiparisKart = data;
  },
  seleksiyonUrunKartMut(state, data) {
    state.select_seleksiyon_kart = data;
  },
  siparisFormUrunGuncelleMut(state, urunKartId) {
    state.selectSiparisKart = state.urunKartMenuList.find(
      (x) => x.id == urunKartId
    );
  },
  yeniKartEkleMut(state, data) {
    let kontrol = true;

    for (let key in state.urunKartMenuList) {
      const item = state.urunKartMenuList[key];

      if (
        item.urunAdi == data.urunAdi &&
        item.kategoriAdi == data.kategoriAdi &&
        item.ebat == data.ebat &&
        item.yuzeyIslem == data.yuzeyIslem
      ) {
        kontrol = false;
      }
    }

    if (kontrol) state.urunKartMenuList.push(data);
  },
  kartGuncellemeMut(state, data) {
    for (let key in state.urunKartMenuList) {
      const item = state.urunKartMenuList[key];

      if (item.id == data.id) {
        state.urunKartMenuList[key] = data;
      }
    }
  },
  isUrunKartLoadMut(state) {
    state.isUrunKart = true;
  },
  kartSilmeMut(state, data) {
    state.urunKartMenuList = data;
  },
};

const getters = {
  getUrunKartMenuList(state) {
    return state.urunKartMenuList;
  },
  getSiparisUrunKart(state) {
    return state.selectSiparisKart;
  },
  isUrunKart(state) {
    return state.isUrunKart;
  },
  select_seleksiyon_kart(state) {
    return state.select_seleksiyon_kart;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

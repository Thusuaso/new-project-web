const state = {
  urunDetay:null,
  onerilenUrunler: null,
  benzerUrunler: null,
  keyList: null,
  keyListFr: null,
  enRenkListesi: null,
  frRenkListesi: null,
  esRenkListesi: null,
  ebatListesi: null,
  ebatListNormal:null,
  kenarIslemList: null,
  urunList: null,
  pickfotolist: null,
  onerilernUrunlerList: null,
  fotolist: null,
  galleriPhotosList:[]
};

const actions = {
  loadUrun({ commit }, data) {
    commit("loadUrunMut", data);
  },
  loadUrunList({ commit }, data) {
    commit("loadUrunListMut", data);
  },
  load_mekmar_galleria_photos_act({ commit }, data) {
    commit('load_mekmar_galleria_photos_mut',data)
  }
};

const mutations = {
  loadUrunMut(state, data) {
    state.keyList = [];
    state.keyListFr = [];
    state.urunDetay = data.productdetail;
    state.onerilenUrunler = data.onerilernUrunlerList;
    state.onerilernUrunlerList = data.onerilenUrunList;
    //state.benzerUrunler = data.benzerUrunler;
    state.enRenkListesi = data.renkenlist;
    state.frRenkListesi = data.renkfrlist;
    state.esRenkListesi = data.renkeslist;

    state.ebatListesi = data.ebatlist;
    state.kenarIslemList = data.finishlist;
    state.fotolist = data.fotolist;
    state.ebatListNormal = data.ebatListNormal
    if (state.fotolist.length)
      state.pickfotolist = [state.fotolist.slice(0, 10), []];

    if (state.urunDetay.anahtarlar_en.length > 1) {
      state.keyList = state.urunDetay.anahtarlar_en.split(",");
    }

    if (state.urunDetay.anahtarlar_fr.length > 1) {
      state.keyListFr = state.urunDetay.anahtarlar_fr.split(",");
    }
  },
  loadUrunListMut(state, data) {
    state.urunList = data;
  },
  load_mekmar_galleria_photos_mut(state, data) {
    state.galleriPhotosList = data
  }
};
const getters = {
  urunDetay(state) {
    return state.urunDetay;
  },
  keyList(state) {
    return state.keyList;
  },
  keyListFr(state) {
    return state.keyListFr;
  },
  onerilenUrunler(state) {
    return state.onerilenUrunler;
  },
  benzerUrunler(state) {
    return state.benzerUrunler;
  },
  enRenkListesi(state) {
    return state.enRenkListesi;
  },
  frRenkListesi(state) {
    return state.frRenkListesi;
  },
  esRenkListesi(state) {
    return state.esRenkListesi;
  },
  ebatListesi(state) {
    return state.ebatListesi;
  },
  kenarIslemList(state) {
    return state.kenarIslemList;
  },
  urunList(state) {
    return state.urunList;
  },
  pickfotolist(state) {
    return state.pickfotolist;
  },
  fotolist(state) {
    return state.fotolist;
  },
  onerilernUrunlerList(state) {
    return state.onerilernUrunlerList;
  },
  ebatListNormal(state) {
    return state.ebatListNormal
  },
  galleriPhotosList(state) {
    return state.galleriPhotosList
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
};

const state = {
  seleksiyon_uretimlist: null,
  seleksiyon_siparislist: null,
  seleksiyon_siparisdetaylist: null,
  seleksiyon_siparisdetay: null,
  seleksiyon_item: null,
  seleksiyon_ocaklist: null,
  seleksiyon_tedarikcilist: null,
  seleksiyon_urunbirimlist: null,
  seleksiyon_uretimozetlist: null,
};

const actions = {
  loadUretimList({ commit }, data) {
    commit("loadUretimListMut", data);
  },
  loadSiparisDetay({ commit }, data) {
    commit("loadSiparisDetayMut", data);
  },
  seleksiyonItemSecActions({ commit }, data) {
    commit("seleksiyonItemSecMut", data);
  },
  seleksiyon_yenikayit_act({ commit }, data) {
    commit("seleksiyon_yenikayit_mut", data);
  },
  seleksiyon_guncelle_act({ commit }, data) {
    commit("seleksiyon_guncelle_mut", data);
  },
  seleksiyon_kayitsil_act({ commit }, kasa_id) {
    commit("seleksiyon_kayitsil_mut", kasa_id);
  },
  seleksiyon_coklukayit_act({ commit }, kasa_list) {
    commit("seleksiyon_coklukayit_mut", kasa_list);
  },
  seleksiyon_uretimozetlist_act({ commit }, data) {
    commit("seleksiyon_uretimozetlist_mut", data);
  },
};

const mutations = {
  loadUretimListMut(state, data) {
    state.seleksiyon_uretimlist = data.uretimlist;
    state.seleksiyon_siparislist = data.siparislist;
    state.seleksiyon_siparisdetaylist = data.siparis_ayrintilist;
    state.seleksiyon_ocaklist = data.ocaklist;
    state.seleksiyon_tedarikcilist = data.tedarikcilist;
    state.seleksiyon_urunbirimlist = data.urunbirimlist;
    state.seleksiyon_uretimozetlist = data.uretimozetlist;
  },
  loadSiparisDetayMut(state, data) {
    state.seleksiyon_siparisdetay = [];
    const liste = [];

    for (let key in data) {
      liste.push(data[key]);
    }

    state.seleksiyon_siparisdetay = liste;
  },
  seleksiyonItemSecMut(state, data) {
    state.seleksiyon_item = data;
  },
  seleksiyon_yenikayit_mut(state, data) {
    const yeni_list = [];

    yeni_list.push(data);

    for (let key in state.seleksiyon_uretimlist) {
      yeni_list.push(state.seleksiyon_uretimlist[key]);
    }

    state.seleksiyon_uretimlist = null;
    state.seleksiyon_uretimlist = yeni_list;
  },

  seleksiyon_guncelle_mut(state, data) {
    const yeni_list = [...state.seleksiyon_uretimlist];

    for (let key in yeni_list) {
      if (yeni_list[key].id == data.id) {
        yeni_list[key] = data;
      }
    }

    state.seleksiyon_uretimlist = null;
    state.seleksiyon_uretimlist = yeni_list;
  },
  seleksiyon_kayitsil_mut(state, kasa_id) {
    const yeni_list = [...state.seleksiyon_uretimlist];

    for (let key in yeni_list) {
      if (yeni_list[key].id == kasa_id) {
        yeni_list.splice(key, 1);
      }
    }

    state.seleksiyon_uretimlist = null;
    state.seleksiyon_uretimlist = yeni_list;
  },
  seleksiyon_coklukayit_mut(state, kasa_list) {
    const yeni_list = [];

    for (let key in kasa_list) {
      yeni_list.push(kasa_list[key]);
    }

    for (let key in state.seleksiyon_uretimlist) {
      yeni_list.push(state.seleksiyon_uretimlist[key]);
    }

    state.seleksiyon_uretimlist = null;

    state.seleksiyon_uretimlist = yeni_list;
  },
  seleksiyon_uretimozetlist_mut(state, data) {
    state.seleksiyon_uretimozetlist = data;
  },
};

const getters = {
  seleksiyon_uretimlist(state) {
    return state.seleksiyon_uretimlist;
  },
  seleksiyon_mekmar_uretimlist(state) {
    return state.seleksiyon_uretimlist
      .filter((x) => ((x.tedarikci_id == 1) || (x.tedarikci_id == 123)) && x.bulunamayan != 1 )
      .sort((a, b) => {
        return a.kasano - b.kasano;
      });
  },
  seleksiyon_dis_uretimlist(state) {
    const data = state.seleksiyon_uretimlist.filter(
      (x) =>
        !(
          (x.tedarikci_id == 1) ||
          (x.tedarikci_id == 123)

        ) && (x.disarda == true) && x.bulunamayan != 1
    );
    const slk_dis_kasa_top = data.length;
    const values = {
      disUretim: data,
      slk_dis_kasa_top: slk_dis_kasa_top,
    };
    return values;
  },
  seleksiyon_mekmer_dis_uretimlist(state) {
    return state.seleksiyon_uretimlist.filter(
      (x) =>
        !((x.tedarikci_id == 1) | (x.tedarikci_id == 123) || x.disarda == true) && x.bulunamayan != 1
    );
  },
  seleksiyon_mekmer_bulunamayan_uretimlist(state) {
    return state.seleksiyon_uretimlist.filter(x=>x.bulunamayan == 1)
  },
  seleksiyon_dis_top_kasa(state) {
    return state.seleksiyon_dis_top_kasa;
  },
  seleksiyon_siparislist(state) {
    return state.seleksiyon_siparislist;
  },
  seleksiyon_siparisdetaylist(state) {
    return state.seleksiyon_siparisdetaylist;
  },
  seleksiyon_siparisdetay(state) {
    return state.seleksiyon_siparisdetay;
  },
  seleksiyon_item(state) {
    return state.seleksiyon_item;
  },
  seleksiyon_ocaklist(state) {
    return state.seleksiyon_ocaklist;
  },
  seleksiyon_tedarikcilist(state) {
    return state.seleksiyon_tedarikcilist;
  },
  seleksiyon_urunbirimlist(state) {
    return state.seleksiyon_urunbirimlist;
  },
  seleksiyon_uretimozetlist(state) {
    return state.seleksiyon_uretimozetlist;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

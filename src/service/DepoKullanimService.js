import axios from "@/helpers/panel_axios";

const DepoKullanimService = {
  getKullanimList(urunid) {
    return axios
      .get("panel/mekmarusa/listeler/urunKullanimList/" + urunid)
      .then((res) => res.data);
  },
  dataKayitIslem(data) {
    return axios
      .put("panel/mekmarusa/dataIslem/kullanimAlanKayit", data)
      .then((res) => res.data);
  },
};

export default DepoKullanimService;

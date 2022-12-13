import axios from "@/helpers/custom_axios";

const ExcelService = {
  getSiparisCekiListesi(data_list) {
    return axios
      .post("excel/listeler/siparisCekiListesi", data_list)
      .then((res) => res.data);
  },
  getSiparisEtiketListesi(etiketAdi) {
    return axios
      .get("excel/listeler/siparisEtiketListesi/" + etiketAdi)
      .then((res) => res.data);
  },
};

export default ExcelService;

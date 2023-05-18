import axios from "@/helpers/custom_axios";
const yapilacaklarService = {
    getYapilacaklarModel() {
        return axios.get('/yapilacaklar/model').then(res => res.data);
    },
    getYapilacaklarList(userId) {
        return axios.get(`/yapilacaklar/list/${userId}`).then(res => res.data);
    },
    getYapilacaklarListGorevVeren(userId) {
        return axios.get(`/yapilacaklar/list/gorevveren/${userId}`).then(res => res.data);
    },
    getYapilacaklarKullanicilarList() {
        return axios.get('/yapilacaklar/kullaniclar/list').then(res => res.data);
    },
    save(data) {
        return axios.post('/yapilacaklar/save', data).then(res => res.data);
    },
    update(data) {
        return axios.put('/yapilacaklar/update', data).then(res => res.data);
    },
    setYapildiStatus(data) {
        return axios.post('/yapilacaklar/yapildi',data).then(res => res.data);
    },
    delete(id) {
        return axios.get(`/yapilacaklar/delete/${id}`).then(res => res.data);
    }

}
export default yapilacaklarService;
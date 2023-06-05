import axios from "@/helpers/custom_axios";

const maliyetHataRaporService = {
    getList() {
        return axios.get('/raporlar/maliyet/hatalar').then(res => res.data);
    },
    getModel() {
        return axios.get('/raporlar/maliyet/hatalar/model').then(res => res.data);
    },
    save(data) {
        return axios.post('/raporlar/maliyet/hatalar', data).then(res => res.data);
    },
    update(data) {
        return axios.put('/raporlar/maliyet/hatalar', data).then(res => res.data);
    },
    delete(id) {
        return axios.delete(`/raporlar/maliyet/hatalar/delete/${id}`).then(res => res.data);
    }
}

export default maliyetHataRaporService;
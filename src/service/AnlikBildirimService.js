import axios from "@/helpers/custom_axios"

const notification = {
    setNotificationSave(data) {
        return axios.post('/notification/islemler',data).then(res=>res.data)
    },
    setNotificationUpdate(data) {
      return axios.put('/notification/islemler',data).then(res=>res.data)  
    },
    getNotification(userId) {
        return axios.get(`/notification/getList/${userId}`).then(res=>res.data)
    },
    setNotificationSaveSub(data) {
        return axios.post('/notification/islemler/ansered',data).then(res=>res.data)
    },
    setNotificationFollow(data) {
        return axios.post('/notification/islemler/follow',data).then(res=>res.data)
    },
    setNotificationFollowAnswered(data) {
        return axios.post('/notification/islemler/follow/answered',data).then(res=>res.data)
    },
    getNotificationEtaControl() {
        return axios.get('/eta/yaklasan/bildirim/list').then(res => res.data);
    },
    setEtaControlStatus(po,etaSure) {
        return axios.get(`/eta/yaklasan/bildirim/status/${po}/${etaSure}`).then(res => res.data);
    }
}

export default notification
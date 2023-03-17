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
    }
}

export default notification